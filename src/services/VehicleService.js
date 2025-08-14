
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry, getLazyClient } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = getLazyClient();

export const fetchAllVehiclesOptimized = async () => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🚀 Starting ULTRA-FAST vehicle fetch with massive parallel loading...');
      const startTime = performance.now();
      
      let allVehicles = [];
      const batchPromises = [];
      
      // Strategy: Launch 10 massive parallel requests immediately
      const initialBatchSize = 5000;
      const maxConcurrentBatches = 10;
      
      // First batch to get initial data and discover pagination
      const firstBatch = client.graphql({
        query: queries.listVehicles,
        variables: { limit: initialBatchSize }
      });
      
      const firstResponse = await firstBatch;
      const firstPageVehicles = firstResponse.data?.listVehicles?.items || [];
      allVehicles = allVehicles.concat(firstPageVehicles);
      
      console.log(`⚡ First massive batch: ${firstPageVehicles.length} vehicles`);
      
      let nextToken = firstResponse.data?.listVehicles?.nextToken;
      
      // If we have more data, process dynamically with massive parallel loading
      if (nextToken) {
        console.log('🚀 Dynamic massive parallel loading...');
        
        // Continue loading until all data is fetched
        while (nextToken) {
          const currentPromises = [];
          
          // Launch up to 5 parallel requests at once
          for (let i = 0; i < 5 && nextToken; i++) {
            const currentToken = nextToken;
            
            const promise = client.graphql({
              query: queries.listVehicles,
              variables: { 
                limit: initialBatchSize,
                nextToken: currentToken
              }
            }).then(response => {
              const vehicles = response.data?.listVehicles?.items || [];
              return {
                vehicles,
                nextToken: response.data?.listVehicles?.nextToken
              };
            }).catch(error => {
              console.warn(`⚠️ Batch failed:`, error);
              return { vehicles: [], nextToken: null };
            });
            
            currentPromises.push(promise);
            nextToken = null; // Will be updated after this batch completes
          }
          
          // Execute current batch and collect results
          const results = await Promise.all(currentPromises);
          
          let hasMoreData = false;
          results.forEach(result => {
            if (result.vehicles.length > 0) {
              allVehicles = allVehicles.concat(result.vehicles);
              console.log(`⚡ Batch: ${result.vehicles.length} vehicles (total: ${allVehicles.length})`);
            }
            if (result.nextToken && !hasMoreData) {
              nextToken = result.nextToken;
              hasMoreData = true;
            }
          });
          
          if (!hasMoreData) {
            break;
          }
        }
      }
      
      const loadTime = performance.now() - startTime;
      console.log(`🎯 ULTRA-FAST loading completed: ${allVehicles.length} vehicles in ${loadTime.toFixed(0)}ms`);
      console.log(`⚡ Loading rate: ${(allVehicles.length / (loadTime / 1000)).toFixed(0)} vehicles/second`);

      console.log(`✅ Total vehicles loaded: ${allVehicles.length}`);

      const mappedVehicles = allVehicles.map((vehicle, index) => {
        try {
          return {
            id: vehicle?.immat || `vehicle-${index}`,
            type: "vehicle",
            immatriculation: vehicle?.immat || "",
            entreprise: vehicle?.company?.name || "Non définie", 
            imei: vehicle?.device?.imei || "",
            nomVehicule: vehicle?.code || "",
            telephone: vehicle?.device?.sim || "",
            typeBoitier: vehicle?.device?.protocolId?.toString() || "",
            isAssociated: !!(vehicle?.device?.imei),
            companyVehiclesId: vehicle?.companyVehiclesId,
            vehicleDeviceImei: vehicle?.vehicleDeviceImei,
            deviceData: vehicle?.device || null,
            marque: vehicle?.brand?.brandName || "",
            modele: vehicle?.modele?.modele || "",
            kilometrage: vehicle?.kilometerage?.toString() || "",
            emplacement: vehicle?.locations || "",
            // Enhanced data from the enriched query
            year: vehicle?.year,
            fuelType: vehicle?.fuelType,
            consumption: vehicle?.consumption,
            maxSpeed: vehicle?.maxSpeed,
            seatCount: vehicle?.seatCount,
            tankCapacity: vehicle?.tankCapacity,
            co2: vehicle?.co2
          };
        } catch (error) {
          console.warn(`Error mapping vehicle ${index}:`, error);
          return null;
        }
      }).filter(Boolean);

      const companies = [];
      const seenCompanies = new Set();
      
      allVehicles.forEach((vehicle) => {
        try {
          if (vehicle?.company?.name && vehicle?.companyVehiclesId && !seenCompanies.has(vehicle.companyVehiclesId)) {
            companies.push({
              id: vehicle.companyVehiclesId,
              name: vehicle.company.name,
              siret: vehicle.company.siret,
              address: vehicle.company.address,
              city: vehicle.company.city
            });
            seenCompanies.add(vehicle.companyVehiclesId);
          }
        } catch {
          // Ignore errors
        }
      });

      console.log(`✅ Extracted ${companies.length} unique companies`);

      return {
        companies,
        vehicles: mappedVehicles
      };

    } catch (error) {
      console.error('Error in fetchAllVehiclesOptimized:', error);
      throw new Error(`Erreur pagination: ${error?.message || 'Erreur inconnue'}`);
    }
  });
};

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    let allCompanies = [];
    let allVehicles = [];
    let nextToken = null;
    
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      try {
        const companyList = await client.graphql({
          query: queries.listCompanies,
          variables: variables
        });
        
        const data = companyList.data.listCompanies;
        allCompanies = allCompanies.concat(data.items);
        nextToken = data.nextToken;
        
      } catch (error) {
        throw new Error(`Failed to fetch companies: ${error.message}`);
      }
      
    } while (nextToken);
    
    const devices = await fetchAllDevices();
    
    let totalVehiclesFromCompanies = 0;
    for (const company of allCompanies) {
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
          
          const companyVehicles = vehiclesData.items.map(vehicle => {
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
              isAssociated: !!(vehicle.vehicleDeviceImei || vehicle.device?.imei),
              AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
              energie: vehicle.energie || "",
              puissanceFiscale: vehicle.puissanceFiscale || "",
              couleur: vehicle.couleur || "",
              dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
              VIN: vehicle.VIN || vehicle.AWN_VIN || ""
            };
            
            totalVehiclesFromCompanies++;
            return mappedVehicle;
          });
          
          allVehicles = allVehicles.concat(companyVehicles);
          companyNextToken = vehiclesData.nextToken;
          
        } while (companyNextToken);
        
      } catch (error) {
        // Log error but continue processing other companies
      }
    }
    
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
    
    const allDevices = [...allVehicles, ...unassociatedDevices];
    
    return { companies: allCompanies, vehicles: allDevices };
  });
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