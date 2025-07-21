import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = generateClient();

/**
 * OPTIMIZED: Fetch all vehicles with devices using single GraphQL query with complete pagination
 */
export const fetchAllVehiclesOptimized = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== OPTIMIZED: FETCHING ALL VEHICLES WITH COMPLETE PAGINATION ===');
    
    try {
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      
      // Iterate through all pages using pagination
      do {
        pageCount++;
        console.log(`Fetching vehicles page ${pageCount}${nextToken ? ` (nextToken: ${nextToken.substring(0, 50)}...)` : ''}`);
        
        const response = await client.graphql({
          query: `query MyQuery($nextToken: String) {
            listVehicles(nextToken: $nextToken, limit: 1000) {
              items {
                companyVehiclesId
                device {
                  cid
                  name
                  protocolId
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
              nextToken
            }
          }`,
          variables: { nextToken }
        });

        const pageVehicles = response.data.listVehicles.items;
        allVehicles = allVehicles.concat(pageVehicles);
        nextToken = response.data.listVehicles.nextToken;
        
        console.log(`Page ${pageCount}: ${pageVehicles.length} vehicles fetched, Total so far: ${allVehicles.length}`);
        
      } while (nextToken);

      console.log(`=== PAGINATION COMPLETE: ${pageCount} pages, ${allVehicles.length} total vehicles ===`);

      // Map vehicles to the expected format using available fields only
      const mappedVehicles = allVehicles.map(vehicle => {
        const deviceImei = vehicle.device?.imei || vehicle.vehicleDeviceImei;
        const isAssociated = !!deviceImei;

        return {
          ...vehicle,
          id: vehicle.immat || vehicle.immatriculation,
          entreprise: vehicle.company?.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || vehicle.immatriculation || "",
          nomVehicule: vehicle.device?.name || "", // Use device name as fallback
          imei: deviceImei || "",
          typeBoitier: vehicle.device?.protocolId?.toString() || "",
          marque: "", // Not available in schema, set empty
          modele: "", // Not available in schema, set empty
          kilometrage: "", // Not available in schema, set empty
          telephone: vehicle.device?.sim || "",
          emplacement: "", // Not available in schema, set empty
          deviceData: vehicle.device || null,
          isAssociated,
          // Additional fields - set to empty since not in schema
          AWN_nom_commercial: "",
          energie: "",
          puissanceFiscale: "",
          couleur: "",
          dateMiseEnCirculation: "",
          VIN: ""
        };
      });

      // Get all devices to find unassociated ones
      const allDevices = await fetchAllDevices();
      
      // Find devices not associated with any vehicle
      const associatedDeviceImeis = new Set(
        mappedVehicles
          .map(v => v.imei)
          .filter(Boolean)
      );

      const unassociatedDevices = allDevices
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

      // Extract unique companies from vehicles
      const companies = [...new Set(mappedVehicles.map(v => v.company).filter(Boolean))]
        .map(company => ({
          id: company.id || `company-${company.name}`,
          name: company.name
        }));

      console.log('=== OPTIMIZED RESULT SUMMARY (WITH COMPLETE PAGINATION) ===');
      console.log('Total vehicles:', mappedVehicles.length);
      console.log('Total unassociated devices:', unassociatedDevices.length);
      console.log('Total companies extracted:', companies.length);
      console.log('Pages processed:', pageCount);

      return {
        companies,
        vehicles: [...mappedVehicles, ...unassociatedDevices]
      };

    } catch (error) {
      console.error('Error in optimized vehicle fetch with pagination:', error);
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
