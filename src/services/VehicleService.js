import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = generateClient();

/**
 * OPTIMIZED: Fetch all vehicles using single GraphQL query - simplified for performance
 */
export const fetchAllVehiclesOptimized = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== OPTIMIZED: FETCHING ALL VEHICLES ===');
    
    try {
      // Single query to get all vehicles with devices and companies
      const vehiclesResponse = await client.graphql({
        query: `query ListAllVehicles {
          listVehicles {
            items {
              companyVehiclesId
              device {
                cid
                name
                sim
                imei
                flespi_id
                device_type_id
              }
              immatriculation
              immat
              company {
                name
              }
              vehicleDeviceImei
            }
          }
        }`
      });

      const vehicles = vehiclesResponse.data.listVehicles.items.filter(Boolean);
      console.log('Total vehicles fetched:', vehicles.length);

      // Get all devices for unassociated ones
      const devicesResponse = await client.graphql({
        query: `query ListDevicesWithoutVehicle {
          listDevices(filter: {
            deviceVehicleImmat: {attributeExists: false}
          }) {
            items {
              imei
              name
              sim
              cid
              protocolId
              flespi_id
              device_type_id
            }
          }
        }`
      });

      const unassociatedDevices = devicesResponse.data.listDevices.items.filter(Boolean);
      console.log('Unassociated devices found:', unassociatedDevices.length);

      // Map vehicles to expected format
      const mappedVehicles = vehicles.map(vehicle => {
        const deviceImei = vehicle.device?.imei || vehicle.vehicleDeviceImei;
        const isAssociated = !!deviceImei;

        return {
          ...vehicle,
          id: vehicle.immat || vehicle.immatriculation,
          entreprise: vehicle.company?.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || vehicle.immatriculation || "",
          nomVehicule: vehicle.device?.name || "",
          imei: deviceImei || "",
          typeBoitier: vehicle.device?.protocolId?.toString() || "",
          marque: "",
          modele: "",
          kilometrage: "",
          telephone: vehicle.device?.sim || "",
          emplacement: "",
          deviceData: vehicle.device || null,
          isAssociated,
          AWN_nom_commercial: "",
          energie: "",
          puissanceFiscale: "",
          couleur: "",
          dateMiseEnCirculation: "",
          VIN: ""
        };
      });

      // Map unassociated devices
      const mappedDevices = unassociatedDevices.map(device => ({
        id: device.imei,
        entreprise: "Boîtier libre",
        type: "device",
        immatriculation: "",
        nomVehicule: device.name || "",
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

      // Extract companies
      const companies = [...new Set(mappedVehicles.map(v => v.company).filter(Boolean))]
        .map(company => ({
          id: company.id || `company-${company.name}`,
          name: company.name
        }));

      console.log('=== OPTIMIZED RESULT SUMMARY ===');
      console.log('Total vehicles:', mappedVehicles.length);
      console.log('Total unassociated devices:', mappedDevices.length);
      console.log('Total companies:', companies.length);

      return {
        companies,
        vehicles: [...mappedVehicles, ...mappedDevices]
      };

    } catch (error) {
      console.error('Error in optimized vehicle fetch:', error);
      throw new Error(`Failed to fetch vehicles optimized: ${error.message}`);
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
