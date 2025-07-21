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
    console.log('=== OPTIMIZED: FETCHING ALL VEHICLES - DEBUGGING MODE ===');
    
    try {
      // Test with minimal fields first to identify the issue
      console.log('Testing basic vehicle query...');
      
      const testResponse = await client.graphql({
        query: `query TestBasicVehicles {
          listVehicles(limit: 10) {
            items {
              immat
              immatriculation
            }
            nextToken
          }
        }`
      });

      console.log('Basic test successful:', testResponse.data.listVehicles.items.length, 'vehicles');

      // Now try the full query
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;

      do {
        pageCount++;
        console.log(`Fetching vehicles page ${pageCount}${nextToken ? ` (has token)` : ''}`);
        
        try {
          const vehiclesResponse = await client.graphql({
            query: `query ListAllVehicles($nextToken: String) {
              listVehicles(nextToken: $nextToken, limit: 100) {
                items {
                  companyVehiclesId
                  immatriculation
                  immat
                  vehicleDeviceImei
                }
                nextToken
              }
            }`,
            variables: { nextToken }
          });

          // Enhanced error checking
          if (vehiclesResponse.errors && vehiclesResponse.errors.length > 0) {
            console.error('=== GRAPHQL ERRORS DETECTED ===');
            vehiclesResponse.errors.forEach((error, index) => {
              console.error(`Error ${index + 1}:`, {
                message: error.message,
                locations: error.locations,
                path: error.path,
                extensions: error.extensions
              });
            });
            
            // If we have partial data, continue; otherwise throw
            if (!vehiclesResponse.data || !vehiclesResponse.data.listVehicles) {
              throw new Error(`GraphQL Error: ${vehiclesResponse.errors[0].message}`);
            }
          }

          const pageVehicles = vehiclesResponse.data.listVehicles.items.filter(Boolean);
          console.log(`Page ${pageCount}: ${pageVehicles.length} vehicles received`);
          
          allVehicles = allVehicles.concat(pageVehicles);
          nextToken = vehiclesResponse.data.listVehicles.nextToken;
          
        } catch (pageError) {
          console.error(`Error on page ${pageCount}:`, pageError);
          if (pageError.errors) {
            pageError.errors.forEach((error, index) => {
              console.error(`Page ${pageCount} GraphQL Error ${index + 1}:`, error.message);
            });
          }
          break; // Stop pagination on error
        }
        
      } while (nextToken && pageCount < 50); // Safety limit

      console.log(`=== PAGINATION COMPLETE: ${pageCount} pages, ${allVehicles.length} total vehicles ===`);

      // Skip devices for now to isolate the issue
      console.log('Skipping devices query to focus on vehicles issue');

      // Map vehicles to expected format with minimal data
      const mappedVehicles = allVehicles.map(vehicle => ({
        id: vehicle.immat || vehicle.immatriculation || `vehicle-${Math.random()}`,
        entreprise: "Non définie",
        type: "vehicle",
        immatriculation: vehicle.immat || vehicle.immatriculation || "",
        nomVehicule: "",
        imei: vehicle.vehicleDeviceImei || "",
        typeBoitier: "",
        marque: "",
        modele: "",
        kilometrage: "",
        telephone: "",
        emplacement: "",
        deviceData: null,
        isAssociated: !!vehicle.vehicleDeviceImei,
        companyVehiclesId: vehicle.companyVehiclesId,
        vehicleDeviceImei: vehicle.vehicleDeviceImei
      }));

      // Minimal companies for now
      const companies = [{
        id: "test-company",
        name: "Entreprise Test"
      }];

      console.log('=== SIMPLIFIED RESULT ===');
      console.log('Total vehicles:', mappedVehicles.length);
      console.log('Sample vehicle:', mappedVehicles[0]);

      return {
        companies,
        vehicles: mappedVehicles
      };

    } catch (error) {
      console.error('=== COMPREHENSIVE ERROR ANALYSIS ===');
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', error);
      
      if (error.errors) {
        console.error('GraphQL errors array:', error.errors);
        error.errors.forEach((gqlError, index) => {
          console.error(`GraphQL Error ${index + 1} details:`, {
            message: gqlError.message,
            locations: gqlError.locations,
            path: gqlError.path,
            extensions: gqlError.extensions
          });
        });
      }
      
      if (error.data) {
        console.error('Partial data received:', error.data);
      }
      
      const errorMessage = error.message || 'Unknown error occurred';
      console.error('Final error message:', errorMessage);
      
      throw new Error(`Failed to fetch vehicles: ${errorMessage}`);
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
