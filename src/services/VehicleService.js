
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
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      
      const firstResponse = await client.graphql({
        query: `query FirstPage {
          listVehicles(limit: 1000) {
            items {
              immat
              immatriculation
              nomVehicule
              companyVehiclesId
              vehicleDeviceImei
              marque
              modele
              kilometrage
            }
            nextToken
          }
        }`
      });

      console.log('First page vehicles response:', {
        hasData: !!firstResponse.data,
        hasVehicles: !!firstResponse.data?.listVehicles,
        vehicleCount: firstResponse.data?.listVehicles?.items?.length || 0,
        hasNextToken: !!firstResponse.data?.listVehicles?.nextToken
      });

      const firstPageVehicles = firstResponse.data?.listVehicles?.items || [];
      allVehicles = allVehicles.concat(firstPageVehicles);
      nextToken = firstResponse.data?.listVehicles?.nextToken;
      pageCount = 1;

      while (nextToken && pageCount < 100) {
        pageCount++;
        
        try {
          const response = await client.graphql({
            query: `query NextPage($nextToken: String!) {
              listVehicles(limit: 1000, nextToken: $nextToken) {
                items {
                  immat
                  immatriculation
                  nomVehicule
                  companyVehiclesId
                  vehicleDeviceImei
                  marque
                  modele
                  kilometrage
                }
                nextToken
              }
            }`,
            variables: { nextToken }
          });

          if (response.errors && !response.data?.listVehicles?.items) {
            break;
          }

          const pageVehicles = response.data?.listVehicles?.items || [];
          allVehicles = allVehicles.concat(pageVehicles);
          nextToken = response.data?.listVehicles?.nextToken;
          
        } catch (pageError) {
          if (pageError?.data?.listVehicles?.items) {
            const partialVehicles = pageError.data.listVehicles.items || [];
            allVehicles = allVehicles.concat(partialVehicles);
            nextToken = pageError.data.listVehicles.nextToken;
          } else {
            break;
          }
        }
      }

      const mappedVehicles = allVehicles.map((vehicle, index) => {
        try {
          return {
            id: vehicle?.immat || vehicle?.immatriculation || `vehicle-${index}`,
            type: "vehicle",
            immatriculation: vehicle?.immat || vehicle?.immatriculation || "",
            entreprise: vehicle?.companyVehiclesId || "Non définie",
            imei: vehicle?.vehicleDeviceImei || "",
            nomVehicule: vehicle?.nomVehicule || "",
            telephone: "",
            typeBoitier: "",
            isAssociated: !!vehicle?.vehicleDeviceImei,
            companyVehiclesId: vehicle?.companyVehiclesId,
            vehicleDeviceImei: vehicle?.vehicleDeviceImei,
            deviceData: null,
            marque: vehicle?.marque || "",
            modele: vehicle?.modele || "",
            kilometrage: vehicle?.kilometrage || "",
            emplacement: ""
          };
        } catch {
          return null;
        }
      }).filter(Boolean);

      // We'll handle company loading separately since we removed relationships
      const companies = [];
      
      console.log('Vehicles loaded successfully:', mappedVehicles.length);

      return {
        companies,
        vehicles: mappedVehicles
      };

    } catch (error) {
      console.error('VehicleService.fetchAllVehiclesOptimized - DETAILED ERROR:', {
        message: error.message,
        code: error.code,
        name: error.name,
        errors: error.errors,
        stack: error.stack,
        fullError: error
      });
      
      // Instead of returning empty data, let's try a fallback approach
      console.warn('Attempting fallback: trying to fetch vehicles without company optimization...');
      
      try {
        // Fallback: try basic vehicle fetch without company/device relationships
        const fallbackResult = await withCredentialRetry(async () => {
          const vehiclesResponse = await client.graphql({
            query: `query FallbackVehicles {
              listVehicles(limit: 1000) {
                items {
                  immat
                  immatriculation
                  nomVehicule
                  companyVehiclesId
                  vehicleDeviceImei
                  marque
                  modele
                  kilometrage
                }
                nextToken
              }
            }`
          });
          
          const vehicles = vehiclesResponse.data?.listVehicles?.items || [];
          console.log('Fallback vehicles loaded:', vehicles.length);
          
          return {
            companies: [], // We'll load companies separately if needed
            vehicles: vehicles.map(vehicle => ({
              id: vehicle.immat,
              entreprise: vehicle.companyVehiclesId || "Entreprise inconnue",
              type: "vehicle",
              immatriculation: vehicle.immat,
              nomVehicule: vehicle.nomVehicule || "",
              imei: vehicle.vehicleDeviceImei || "",
              typeBoitier: "",
              marque: vehicle.marque || "",
              modele: vehicle.modele || "",
              kilometrage: vehicle.kilometrage || "",
              telephone: "",
              emplacement: "",
              vehicleData: vehicle,
              isAssociated: !!vehicle.vehicleDeviceImei
            }))
          };
        });
        
        console.log('Fallback successful, returning partial data');
        return fallbackResult;
        
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        return {
          companies: [],
          vehicles: []
        };
      }
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