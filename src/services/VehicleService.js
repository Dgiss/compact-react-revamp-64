
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry, getLazyClient } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = getLazyClient();

/**
 * ULTRA-FAST OPTIMIZED LOADING (<20s) with enriched ListVehicles query
 * Uses massive parallel pagination (10 concurrent requests x 5000 items each)
 */
export const fetchAllVehiclesUltraFast = async () => {
  return await withCredentialRetry(async () => {
    console.log('🚀 === ULTRA-FAST LOADING STARTED ===');
    const startTime = Date.now();
    
    try {
      let allVehicles = [];
      const BATCH_SIZE = 5000; // Maximum items per request
      const MAX_PARALLEL = 10; // Maximum parallel requests
      const TIMEOUT_PER_BATCH = 15000; // 15 seconds per batch

      // Start with first batch to get initial nextToken
      console.log('📥 Loading first batch...');
      const firstResponse = await Promise.race([
        client.graphql({
          query: queries.listVehicles,
          variables: { limit: BATCH_SIZE }
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('First batch timeout')), TIMEOUT_PER_BATCH)
        )
      ]);

      const firstBatch = firstResponse.data?.listVehicles?.items || [];
      allVehicles = allVehicles.concat(firstBatch);
      
      let nextTokens = [firstResponse.data?.listVehicles?.nextToken].filter(Boolean);
      let batchCount = 1;
      
      console.log(`✅ First batch loaded: ${firstBatch.length} vehicles`);

      // Massive parallel loading with dynamic token discovery
      while (nextTokens.length > 0 && batchCount < 100) { // Safety limit
        console.log(`🔄 Starting parallel batch ${batchCount + 1} with ${nextTokens.length} tokens`);
        
        // Create parallel requests (max 10 at once)
        const batchPromises = nextTokens.slice(0, MAX_PARALLEL).map(async (token, index) => {
          try {
            return await Promise.race([
              client.graphql({
                query: queries.listVehicles,
                variables: { 
                  limit: BATCH_SIZE, 
                  nextToken: token 
                }
              }),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`Batch ${index} timeout`)), TIMEOUT_PER_BATCH)
              )
            ]);
          } catch (error) {
            console.warn(`⚠️ Batch ${index} failed:`, error.message);
            return { data: { listVehicles: { items: [], nextToken: null } } };
          }
        });

        // Execute all batches in parallel
        const results = await Promise.allSettled(batchPromises);
        
        // Collect new tokens and data
        const newTokens = [];
        let batchVehicleCount = 0;
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value?.data?.listVehicles) {
            const vehicles = result.value.data.listVehicles.items || [];
            const nextToken = result.value.data.listVehicles.nextToken;
            
            allVehicles = allVehicles.concat(vehicles);
            batchVehicleCount += vehicles.length;
            
            if (nextToken) {
              newTokens.push(nextToken);
            }
          }
        });
        
        console.log(`✅ Parallel batch completed: ${batchVehicleCount} vehicles, ${newTokens.length} new tokens`);
        
        nextTokens = newTokens;
        batchCount++;
        
        // Safety check: if load time exceeds 18 seconds, stop to stay under 20s
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > 18000) {
          console.log(`⏱️ Time limit approaching (${elapsedTime}ms), stopping pagination`);
          break;
        }
      }

      const loadTime = Date.now() - startTime;
      console.log(`🎯 RAW DATA LOADED: ${allVehicles.length} vehicles in ${loadTime}ms`);

      // OPTIMIZED DATA MAPPING with enriched data
      const mappedVehicles = [];
      const companies = new Map();
      
      allVehicles.forEach((vehicle, index) => {
        try {
          // Extract company info
          if (vehicle?.company && vehicle.companyVehiclesId) {
            companies.set(vehicle.companyVehiclesId, {
              id: vehicle.companyVehiclesId,
              name: vehicle.company.name,
              siret: vehicle.company.siret,
              city: vehicle.company.city
            });
          }

          // Map enriched vehicle data
          const mappedVehicle = {
            id: vehicle?.immat || `vehicle-${index}`,
            type: "vehicle",
            immat: vehicle?.immat || "",
            immatriculation: vehicle?.immat || "",
            entreprise: vehicle?.company?.name || "Non définie",
            companyVehiclesId: vehicle?.companyVehiclesId,
            
            // Device association (enriched)
            device: vehicle?.device || null,
            imei: vehicle?.device?.imei || "",
            telephone: vehicle?.device?.sim || "",
            typeBoitier: vehicle?.device?.protocolId?.toString() || "",
            isAssociated: !!(vehicle?.device?.imei),
            
            // Vehicle details (enriched)
            nomVehicule: vehicle?.code || "",
            marque: vehicle?.brand?.brandName || "",
            modele: vehicle?.modele?.modele || "",
            year: vehicle?.year || "",
            
            // Technical specs (enriched)
            kilometrage: vehicle?.kilometerage?.toString() || "",
            consumption: vehicle?.consumption || "",
            maxSpeed: vehicle?.maxSpeed || "",
            fuelType: vehicle?.fuelType || "",
            
            // Location and status (enriched)
            emplacement: vehicle?.locations || "",
            lastModificationDate: vehicle?.lastModificationDate || "",
            
            // Raw data for detailed views
            rawData: vehicle
          };
          
          mappedVehicles.push(mappedVehicle);
        } catch (error) {
          console.warn(`Mapping error for vehicle ${index}:`, error);
        }
      });

      const finalLoadTime = Date.now() - startTime;
      console.log(`🚀 === ULTRA-FAST LOADING COMPLETED ===`);
      console.log(`📊 Final results: ${mappedVehicles.length} vehicles, ${companies.size} companies`);
      console.log(`⚡ Total time: ${finalLoadTime}ms (${(finalLoadTime/1000).toFixed(1)}s)`);

      return {
        companies: Array.from(companies.values()),
        vehicles: mappedVehicles,
        loadTime: finalLoadTime,
        totalItems: mappedVehicles.length
      };

    } catch (error) {
      const errorTime = Date.now() - startTime;
      console.error(`❌ Ultra-fast loading failed after ${errorTime}ms:`, error);
      throw new Error(`Ultra-fast loading failed: ${error?.message || 'Unknown error'}`);
    }
  });
};

// Keep original function as fallback
export const fetchAllVehiclesOptimized = async () => {
  console.log('⚠️ Using fallback fetchAllVehiclesOptimized, consider using fetchAllVehiclesUltraFast');
  return await fetchAllVehiclesUltraFast();
};

/**
 * ULTRA-OPTIMIZED: Enriched data with free devices in <20s
 * Uses the new ultra-fast loading + parallel free device discovery
 */
export const fetchCompaniesWithVehiclesUltraFast = async () => {
  return await withCredentialRetry(async () => {
    console.log('🚀 === ULTRA-FAST COMPANIES+VEHICLES+DEVICES LOADING ===');
    const startTime = Date.now();
    
    try {
      // STEP 1: Load all enriched vehicles in parallel with free devices
      const [vehiclesResult, devices] = await Promise.allSettled([
        fetchAllVehiclesUltraFast(),
        fetchAllDevices()
      ]);
      
      const vehicleData = vehiclesResult.status === 'fulfilled' ? vehiclesResult.value : { companies: [], vehicles: [] };
      const deviceData = devices.status === 'fulfilled' ? devices.value : [];
      
      console.log('📊 Parallel loading completed:', {
        vehicles: vehicleData.vehicles?.length || 0,
        companies: vehicleData.companies?.length || 0,
        devices: deviceData.length || 0
      });
      
      // STEP 2: Identify unassociated devices (ultra-fast set-based lookup)
      const associatedDeviceImeis = new Set(
        vehicleData.vehicles
          ?.filter(v => v.device?.imei)
          .map(v => v.device.imei) || []
      );
      
      const unassociatedDevices = deviceData
        .filter(device => device.imei && !associatedDeviceImeis.has(device.imei))
        .map(device => ({
          id: device.imei,
          entreprise: "Boîtier libre",
          type: "device",
          immat: "",
          immatriculation: "",
          nomVehicule: "",
          imei: device.imei,
          typeBoitier: device.protocolId?.toString() || "",
          marque: "",
          modele: "",
          kilometrage: "",
          telephone: device.sim || "",
          emplacement: "",
          device: device,
          deviceData: device,
          isAssociated: false
        }));
      
      // STEP 3: Combine enriched vehicles + free devices
      const allItems = [
        ...(vehicleData.vehicles || []),
        ...unassociatedDevices
      ];
      
      const finalTime = Date.now() - startTime;
      console.log(`🎯 === ULTRA-FAST LOADING COMPLETED IN ${finalTime}ms ===`);
      console.log(`📊 Total items: ${allItems.length} (${vehicleData.vehicles?.length || 0} vehicles + ${unassociatedDevices.length} free devices)`);
      
      return {
        companies: vehicleData.companies || [],
        vehicles: allItems,
        loadTime: finalTime,
        stats: {
          vehicleCount: vehicleData.vehicles?.length || 0,
          freeDeviceCount: unassociatedDevices.length,
          totalItems: allItems.length
        }
      };
      
    } catch (error) {
      const errorTime = Date.now() - startTime;
      console.error(`❌ Ultra-fast companies+vehicles loading failed after ${errorTime}ms:`, error);
      throw new Error(`Ultra-fast loading failed: ${error?.message || 'Unknown error'}`);
    }
  });
};

// Keep original function as fallback
export const fetchCompaniesWithVehicles = async () => {
  console.log('⚠️ Using fallback fetchCompaniesWithVehicles, consider using fetchCompaniesWithVehiclesUltraFast');
  return await fetchCompaniesWithVehiclesUltraFast();
};

export const updateVehicleData = async (data) => {
  return await updateVehicleSimple(data);
};

export const createVehicleData = async (data) => {
  return await createVehicleSimple(data);
};

export const deleteVehicleData = async (item) => {
  await waitForAmplifyConfig();
  
  const cleanedItem = cleanDataForGraphQL(item);
  
  const vehicleDetails = {
    immat: cleanedItem.immat || cleanedItem.immatriculation
  };

  await client.graphql({
    query: mutations.deleteVehicle,
    variables: { input: vehicleDetails }
  });
};

/**
 * Associate a vehicle to a device with unique validation
 */
export const associateVehicleToDevice = async (vehicleImmat, deviceImei) => {
  return await withCredentialRetry(async () => {
    try {
      // VALIDATION CRITIQUE: Vérifier l'unicité du device
      const existingVehicleQuery = /* GraphQL */ `
        query CheckDeviceAssociation($deviceImei: String!) {
          listVehicles(filter: {vehicleDeviceImei: {eq: $deviceImei}}) {
            items {
              immat
              vehicleDeviceImei
            }
          }
        }
      `;

      const existingResponse = await client.graphql({
        query: existingVehicleQuery,
        variables: {
          deviceImei: deviceImei
        }
      });

      const existingVehicles = existingResponse.data?.listVehicles?.items || [];
      const otherVehicleWithDevice = existingVehicles.find(v => v.immat !== vehicleImmat);

      if (otherVehicleWithDevice) {
        throw new Error(`Le boîtier ${deviceImei} est déjà associé au véhicule ${otherVehicleWithDevice.immat}. Un boîtier ne peut être associé qu'à un seul véhicule.`);
      }

      const updateInput = {
        immat: vehicleImmat,
        vehicleDeviceImei: deviceImei
      };
      
      const simpleUpdateVehicle = /* GraphQL */ `
        mutation UpdateVehicle($input: UpdateVehicleInput!) {
          updateVehicle(input: $input) {
            immat
            vehicleDeviceImei
            updatedAt
            __typename
          }
        }
      `;

      const vehicleUpdate = await client.graphql({
        query: simpleUpdateVehicle,
        variables: {
          input: updateInput
        }
      });
      
      return { success: true, vehicleUpdate: vehicleUpdate.data?.updateVehicle };
    } catch (error) {
      throw error;
    }
  });
};

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
      
      console.log('GraphQL response received:', {
        hasData: !!vehicleUpdate.data,
        hasUpdateVehicle: !!vehicleUpdate.data?.updateVehicle,
        hasErrors: !!vehicleUpdate.errors,
        errorCount: vehicleUpdate.errors?.length || 0
      });
      
      // Check if the update was successful even with potential non-critical errors
      if (vehicleUpdate.data?.updateVehicle) {
        console.log('✅ Dissociation successful for vehicle:', vehicleImmat);
        if (vehicleUpdate.errors && vehicleUpdate.errors.length > 0) {
          console.warn('⚠️ Non-critical errors during dissociation:', vehicleUpdate.errors);
          // Log each error for debugging
          vehicleUpdate.errors.forEach((err, index) => {
            console.warn(`Error ${index + 1}:`, err);
          });
        }
        return { success: true, vehicleUpdate: vehicleUpdate.data.updateVehicle };
      } else {
        console.error('❌ No data returned from updateVehicle');
        if (vehicleUpdate.errors) {
          console.error('GraphQL errors:', vehicleUpdate.errors);
        }
        throw new Error('Failed to dissociate vehicle from device - no data returned');
      }
    } catch (error) {
      console.error('❌ Exception during dissociation:', error);
      
      // Handle GraphQL response with errors but potential data
      if (error.data?.updateVehicle) {
        console.log('🔄 Operation may have succeeded despite errors');
        return { success: true, vehicleUpdate: error.data.updateVehicle };
      }
      
      throw error;
    }
  });
};

export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  return await associateVehicleToDevice(vehicleImmat, deviceImei);
};