
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';

const client = generateClient();

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let dataCache = null;
let cacheTimestamp = null;

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    // Check cache first
    if (dataCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      console.log('Returning cached data');
      return dataCache;
    }

    const startTime = Date.now();
    console.log('=== OPTIMIZED FETCH START ===');
    
    // Parallelize initial requests
    const [companiesResponse, devicesResponse] = await Promise.all([
      // Fetch companies with higher limit
      client.graphql({
        query: queries.listCompanies,
        variables: { limit: 2000 }
      }),
      // Fetch devices in parallel
      fetchAllDevices()
    ]);

    const allCompanies = companiesResponse.data.listCompanies.items;
    const devices = devicesResponse;
    
    console.log(`Initial fetch: ${allCompanies.length} companies, ${devices.length} devices in ${Date.now() - startTime}ms`);
    
    // Process companies in batches of 10 for parallel requests
    const BATCH_SIZE = 10;
    let allVehicles = [];
    const associatedDeviceImeis = new Set();
    
    for (let i = 0; i < allCompanies.length; i += BATCH_SIZE) {
      const batch = allCompanies.slice(i, i + BATCH_SIZE);
      
      // Parallel vehicle fetching for batch
      const vehiclePromises = batch.map(async (company) => {
        try {
          const vehiclesResult = await client.graphql({
            query: queries.vehiclesByCompanyVehiclesId,
            variables: {
              companyVehiclesId: company.id,
              limit: 2000 // Increased limit
            }
          });
          
          return {
            company,
            vehicles: vehiclesResult.data.vehiclesByCompanyVehiclesId.items
          };
        } catch (error) {
          console.error(`Error fetching vehicles for company ${company.name}:`, error);
          return { company, vehicles: [] };
        }
      });
      
      const batchResults = await Promise.all(vehiclePromises);
      
      // Process batch results
      for (const { company, vehicles } of batchResults) {
        const mappedVehicles = vehicles.map(vehicle => {
          const deviceImei = vehicle.device?.imei;
          if (deviceImei) associatedDeviceImeis.add(deviceImei);
          
          return {
            ...vehicle,
            entreprise: vehicle.company?.name || company.name || "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || "",
            nomVehicule: vehicle.nomVehicule || vehicle.code || "",
            imei: deviceImei || "",
            typeBoitier: vehicle.device?.protocolId?.toString() || "",
            marque: vehicle.marque || vehicle.brand?.brandName || "",
            modele: vehicle.modele_id || vehicle.modele?.modele || "",
            kilometrage: vehicle.kilometerage?.toString() || "",
            telephone: vehicle.device?.sim || "",
            emplacement: vehicle.locations || "",
            deviceData: vehicle.device || null,
            isAssociated: !!vehicle.device,
            AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
            energie: vehicle.energie || "",
            puissanceFiscale: vehicle.puissanceFiscale || "",
            couleur: vehicle.couleur || "",
            dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
            VIN: vehicle.VIN || vehicle.AWN_VIN || ""
          };
        });
        
        allVehicles = allVehicles.concat(mappedVehicles);
      }
    }
    
    // Optimize unassociated devices lookup
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
    
    const allDevices = [...allVehicles, ...unassociatedDevices];
    const result = { companies: allCompanies, vehicles: allDevices };
    
    // Cache the result
    dataCache = result;
    cacheTimestamp = Date.now();
    
    const totalTime = Date.now() - startTime;
    console.log(`=== OPTIMIZED FETCH COMPLETE ===`);
    console.log(`Total time: ${totalTime}ms`);
    console.log(`Companies: ${allCompanies.length}, Vehicles: ${allVehicles.length}, Free devices: ${unassociatedDevices.length}`);
    
    return result;
  });
};

// Cache invalidation function
export const invalidateCache = () => {
  dataCache = null;
  cacheTimestamp = null;
};

export const updateVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
  // Invalidate cache on data modification
  invalidateCache();
  
  // Clean and adapt data for GraphQL - remove non-serializable properties
  const cleanedData = cleanDataForGraphQL(data);
  
  // Adapter aux nouveaux champs du schéma
  const vehicleDetails = {
    immat: cleanedData.immat || cleanedData.immatriculation,
    code: cleanedData.code,
    nomVehicule: cleanedData.nomVehicule,
    kilometerage: cleanedData.kilometerage ? parseInt(cleanedData.kilometerage) : undefined,
    kilometerageStart: cleanedData.kilometerageStart ? parseInt(cleanedData.kilometerageStart) : undefined,
    locations: cleanedData.locations || cleanedData.emplacement,
    marque: cleanedData.marque,
    modele_id: cleanedData.modele_id || cleanedData.modele,
    energie: cleanedData.energie,
    couleur: cleanedData.couleur,
    dateMiseEnCirculation: cleanedData.dateMiseEnCirculation,
    VIN: cleanedData.VIN,
    AWN_nom_commercial: cleanedData.AWN_nom_commercial,
    puissanceFiscale: cleanedData.puissanceFiscale ? parseInt(cleanedData.puissanceFiscale) : undefined,
    lastModificationDate: new Date().toISOString(),
    // Relation avec l'entreprise (nouvelle structure)
    companyVehiclesId: cleanedData.companyVehiclesId
  };

  // Remove undefined values to avoid GraphQL errors
  Object.keys(vehicleDetails).forEach(key => {
    if (vehicleDetails[key] === undefined) {
      delete vehicleDetails[key];
    }
  });

  console.log('Cleaned vehicle data for GraphQL:', vehicleDetails);

  await client.graphql({
    query: mutations.updateVehicle,
    variables: {
      input: vehicleDetails
    }
  });
};

export const deleteVehicleData = async (item) => {
  await waitForAmplifyConfig();
  
  // Invalidate cache on data modification
  invalidateCache();
  
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
 * Create a new vehicle
 */
export const createVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
  // Invalidate cache on data modification
  invalidateCache();
  
  // Clean and adapt data for GraphQL - remove non-serializable properties
  const cleanedData = cleanDataForGraphQL(data);
  
  const vehicleDetails = {
    immat: cleanedData.immatriculation,
    code: cleanedData.code,
    nomVehicule: cleanedData.nomVehicule,
    kilometerage: cleanedData.kilometrage ? parseInt(cleanedData.kilometrage) : undefined,
    locations: cleanedData.emplacement,
    marque: cleanedData.marque,
    modele_id: cleanedData.modele,
    energie: cleanedData.energie,
    couleur: cleanedData.couleur,
    dateMiseEnCirculation: cleanedData.dateMiseEnCirculation,
    VIN: cleanedData.VIN,
    AWN_nom_commercial: cleanedData.AWN_nom_commercial,
    puissanceFiscale: cleanedData.puissanceFiscale ? parseInt(cleanedData.puissanceFiscale) : undefined,
    lastModificationDate: new Date().toISOString(),
    companyVehiclesId: cleanedData.companyVehiclesId
  };

  // Remove undefined values to avoid GraphQL errors
  Object.keys(vehicleDetails).forEach(key => {
    if (vehicleDetails[key] === undefined) {
      delete vehicleDetails[key];
    }
  });

  console.log('Cleaned vehicle creation data for GraphQL:', vehicleDetails);

  const result = await client.graphql({
    query: mutations.createVehicle,
    variables: {
      input: vehicleDetails
    }
  });

  return result;
};

/**
 * Associate a device to a vehicle
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  await waitForAmplifyConfig();
  
  console.log('=== ASSOCIATING DEVICE TO VEHICLE ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Vehicle immat:', vehicleImmat);
  
  try {
    // First, update the device to associate it with the vehicle
    console.log('Updating device...');
    const deviceUpdate = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          deviceVehicleImmat: vehicleImmat
        }
      }
    });
    console.log('Device update result:', deviceUpdate);

    // Then, update the vehicle to reference the device
    console.log('Updating vehicle...');
    const vehicleUpdate = await client.graphql({
      query: mutations.updateVehicle,
      variables: {
        input: {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei
        }
      }
    });
    console.log('Vehicle update result:', vehicleUpdate);

    console.log('Device associated successfully:', { deviceImei, vehicleImmat });
    return { success: true, deviceUpdate, vehicleUpdate };
  } catch (error) {
    console.error('Error associating device to vehicle:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};
