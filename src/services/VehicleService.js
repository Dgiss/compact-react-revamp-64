import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = generateClient();

export const fetchAllVehiclesOptimized = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== SIMPLE QUERY: listVehicles ===');
    
    try {
      // Appel ultra-simple qui marche toujours
      const response = await client.graphql({
        query: `query ListVehicles {
          listVehicles {
            items {
              immat
              immatriculation
              companyVehiclesId
              vehicleDeviceImei
              company {
                name
              }
              device {
                name
                imei
                sim
                device_type_id
              }
            }
          }
        }`
      });

      const vehicles = response.data.listVehicles.items || [];
      console.log('Véhicules récupérés:', vehicles.length);

      // Transformation simple
      const mappedVehicles = vehicles.map((vehicle, index) => ({
        id: vehicle.immat || vehicle.immatriculation || `vehicle-${index}`,
        type: "vehicle",
        immatriculation: vehicle.immat || vehicle.immatriculation || "",
        entreprise: vehicle.company?.name || "Non définie",
        imei: vehicle.device?.imei || vehicle.vehicleDeviceImei || "",
        nomVehicule: vehicle.device?.name || "",
        telephone: vehicle.device?.sim || "",
        typeBoitier: vehicle.device?.device_type_id?.toString() || "",
        isAssociated: !!(vehicle.device?.imei || vehicle.vehicleDeviceImei),
        companyVehiclesId: vehicle.companyVehiclesId,
        vehicleDeviceImei: vehicle.vehicleDeviceImei,
        deviceData: vehicle.device || null,
        marque: "",
        modele: "",
        kilometrage: "",
        emplacement: ""
      }));

      // Extraction des companies
      const companies = [];
      const seenCompanies = new Set();
      vehicles.forEach(vehicle => {
        if (vehicle.company && vehicle.companyVehiclesId && !seenCompanies.has(vehicle.companyVehiclesId)) {
          companies.push({
            id: vehicle.companyVehiclesId,
            name: vehicle.company.name
          });
          seenCompanies.add(vehicle.companyVehiclesId);
        }
      });

      console.log('=== RÉSULTAT SIMPLE ===');
      console.log('Véhicules:', mappedVehicles.length);
      console.log('Entreprises:', companies.length);

      return {
        companies,
        vehicles: mappedVehicles
      };

    } catch (error) {
      console.error('Erreur requête simple:', error.message);
      throw new Error(`Erreur listVehicles: ${error.message}`);
    }
  });
};

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING COMPANIES WITH VEHICLES ===');
    let allCompanies = [];
    let allVehicles = [];
    let nextToken = null;
    
    // First, fetch all companies to get the list
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      console.log('Fetching companies batch with variables:', variables);
      
      try {
        const companyList = await client.graphql({
          query: queries.listCompanies,
          variables: variables
        });
        
        const data = companyList.data.listCompanies;
        console.log('Companies batch received:', data.items.length);
        
        allCompanies = allCompanies.concat(data.items);
        nextToken = data.nextToken;
        
      } catch (error) {
        console.error('Error fetching companies:', error);
        if (error.errors) {
          console.error('GraphQL errors:', error.errors);
        }
        throw new Error(`Failed to fetch companies: ${error.message}`);
      }
      
    } while (nextToken);
    
    console.log('Total companies fetched:', allCompanies.length);
    
    // Fetch all devices for unassociated device handling
    const devices = await fetchAllDevices();
    console.log('=== DEVICE DEBUG INFO ===');
    console.log('Total devices fetched:', devices.length);
    
    // Now fetch vehicles for each company using vehiclesByCompanyVehiclesId
    let totalVehiclesFromCompanies = 0;
    for (const company of allCompanies) {
      console.log(`=== PROCESSING COMPANY: ${company.name} (ID: ${company.id}) ===`);
      
      try {
        let companyNextToken = null;
        do {
          const vehiclesResult = await client.graphql({
            query: queries.vehiclesByCompanyVehiclesId,
            variables: {
              companyVehiclesId: company.id,
              limit: 1000,
              nextToken: companyNextToken
            }
          });
          
          const vehiclesData = vehiclesResult.data.vehiclesByCompanyVehiclesId;
          console.log(`Company ${company.name} vehicles batch:`, vehiclesData.items.length);
          
          if (vehiclesData.items.length > 0) {
            console.log('Sample vehicle with relations:', JSON.stringify(vehiclesData.items[0], null, 2));
          }
          
          const companyVehicles = vehiclesData.items.map(vehicle => {
            console.log(`Processing vehicle: ${vehicle.immat}`);
            console.log('Vehicle company:', vehicle.company?.name);
            console.log('Vehicle device:', vehicle.device?.imei, 'SIM:', vehicle.device?.sim);
            
            const mappedVehicle = {
              ...vehicle,
              entreprise: vehicle.company?.name || company.name || "Non définie",
              type: "vehicle",
              immatriculation: vehicle.immat || "",
              nomVehicule: vehicle.nomVehicule || vehicle.code || "",
              imei: vehicle.vehicleDeviceImei || vehicle.device?.imei || "",
              typeBoitier: vehicle.device?.protocolId?.toString() || "",
              marque: vehicle.marque || vehicle.brand?.brandName || "",
              modele: vehicle.modele_id || vehicle.modele?.modele || "",
              kilometrage: vehicle.kilometerage?.toString() || "",
              telephone: vehicle.device?.sim || "",
              emplacement: vehicle.locations || "",
              deviceData: vehicle.device || null,
              // Use vehicleDeviceImei for association detection
              isAssociated: !!(vehicle.vehicleDeviceImei || vehicle.device?.imei),
              // Additional fields
              AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
              energie: vehicle.energie || "",
              puissanceFiscale: vehicle.puissanceFiscale || "",
              couleur: vehicle.couleur || "",
              dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
              VIN: vehicle.VIN || vehicle.AWN_VIN || ""
            };
            
            console.log(`Mapped vehicle ${vehicle.immat}: entreprise="${mappedVehicle.entreprise}", telephone="${mappedVehicle.telephone}"`);
            totalVehiclesFromCompanies++;
            return mappedVehicle;
          });
          
          allVehicles = allVehicles.concat(companyVehicles);
          companyNextToken = vehiclesData.nextToken;
          
        } while (companyNextToken);
        
      } catch (error) {
        console.error(`Error fetching vehicles for company ${company.name}:`, error);
      }
    }
    
    console.log('Total vehicles processed from companies:', totalVehiclesFromCompanies);
    
    // Find devices associated with vehicles (both via vehicleDeviceImei and device relation)
    const associatedDeviceImeis = new Set(
      allVehicles
        .map(v => v.vehicleDeviceImei || v.deviceData?.imei)
        .filter(Boolean)
    );
    
    const unassociatedDevices = devices
      .filter(device => device.imei && !associatedDeviceImeis.has(device.imei))
      .map(device => ({
        id: device.imei,
        entreprise: "Boîtier libre",
        type: "device",
        immatriculation: "",
        nomVehicule: "",
        imei: device.imei,
        typeBoitier: device.protocolId?.toString() || "",
        marque: "",
        modele: "",
        kilometrage: "",
        telephone: device.sim || "",
        emplacement: "",
        deviceData: device,
        isAssociated: false
      }));
    
    console.log('Unassociated devices count:', unassociatedDevices.length);
    
    const allDevices = [...allVehicles, ...unassociatedDevices];
    
    console.log('=== FINAL RESULT SUMMARY ===');
    console.log('Total companies:', allCompanies.length);
    console.log('Total vehicles:', allVehicles.length);
    console.log('Total unassociated devices:', unassociatedDevices.length);
    console.log('Total combined data:', allDevices.length);
    
    // Debug company names for search
    const companyNames = [...new Set(allDevices.map(item => item.entreprise).filter(Boolean))];
    console.log('Available company names for search:', companyNames);
    
    return { companies: allCompanies, vehicles: allDevices };
  });
};

/**
 * Update vehicle data using simplified approach
 */
export const updateVehicleData = async (data) => {
  console.log('=== UPDATING VEHICLE DATA (SIMPLIFIED) ===');
  console.log('Input data:', data);
  
  return await updateVehicleSimple(data);
};

/**
 * Create vehicle data using simplified approach
 */
export const createVehicleData = async (data) => {
  console.log('=== CREATING VEHICLE DATA (SIMPLIFIED) ===');
  console.log('Input data:', data);
  
  return await createVehicleSimple(data);
};

export const deleteVehicleData = async (item) => {
  await waitForAmplifyConfig();
  
  // Clean data before sending to GraphQL
  const cleanedItem = cleanDataForGraphQL(item);
  
  const vehicleDetails = {
    immat: cleanedItem.immat || cleanedItem.immatriculation
  };

  console.log('Cleaned delete data for GraphQL:', vehicleDetails);

  await client.graphql({
    query: mutations.deleteVehicle,
    variables: { input: vehicleDetails }
  });
};

/**
 * Associate a vehicle to a device using vehicleDeviceImei field - SIMPLIFIED
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Association result
 */
export const associateVehicleToDevice = async (vehicleImmat, deviceImei) => {
  return await withCredentialRetry(async () => {
    console.log('=== ASSOCIATING VEHICLE TO DEVICE (SIMPLIFIED) ===');
    console.log('Vehicle immat:', vehicleImmat);
    console.log('Device IMEI:', deviceImei);
    
    try {
      const vehicleUpdate = await client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: {
            immat: vehicleImmat,
            vehicleDeviceImei: deviceImei
          }
        }
      });
      
      console.log('Vehicle-device association successful:', vehicleUpdate.data?.updateVehicle);
      
      return { success: true, vehicleUpdate: vehicleUpdate.data?.updateVehicle };
    } catch (error) {
      console.error('Error associating vehicle to device:', error);
      console.error('Error details:', error.message);
      if (error.errors) {
        console.error('GraphQL errors:', error.errors);
      }
      throw error;
    }
  });
};

/**
 * Dissociate a vehicle from a device by removing vehicleDeviceImei
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Dissociation result
 */
export const dissociateVehicleFromDevice = async (vehicleImmat) => {
  return await withCredentialRetry(async () => {
    console.log('=== DISSOCIATING VEHICLE FROM DEVICE ===');
    console.log('Vehicle immat:', vehicleImmat);
    
    try {
      const vehicleUpdate = await client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: {
            immat: vehicleImmat,
            vehicleDeviceImei: null
          }
        }
      });
      
      console.log('Vehicle-device dissociation successful:', vehicleUpdate.data?.updateVehicle);
      
      return { success: true, vehicleUpdate: vehicleUpdate.data?.updateVehicle };
    } catch (error) {
      console.error('Error dissociating vehicle from device:', error);
      console.error('Error details:', error.message);
      if (error.errors) {
        console.error('GraphQL errors:', error.errors);
      }
      throw error;
    }
  });
};

/**
 * Associate a device to a vehicle using GraphQL relations (LEGACY - kept for compatibility)
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  // Use new method
  return await associateVehicleToDevice(vehicleImmat, deviceImei);
};
