
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING COMPANIES WITH VEHICLES ===');
    let allCompanies = [];
    let allVehicles = [];
    let allDevices = [];
    let nextToken = null;
    
    // Fetch companies with vehicles
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      console.log('Fetching companies batch with variables:', variables);
      
      const companyList = await client.graphql({
        query: queries.listCompanies,
        variables: variables
      });
      
      const data = companyList.data.listCompanies;
      console.log('Companies batch received:', data.items.length);
      console.log('Sample company:', data.items[0]);
      
      allCompanies = allCompanies.concat(data.items);
      nextToken = data.nextToken;
      
    } while (nextToken);
    
    console.log('Total companies fetched:', allCompanies.length);
    console.log('Companies with vehicles:', allCompanies.filter(c => c.vehicles?.items?.length > 0).length);
  
    // Fetch all devices
    const devices = await fetchAllDevices();
    console.log('=== DEVICE DEBUG INFO ===');
    console.log('Total devices fetched:', devices.length);
    
    // Create a map of devices by IMEI for quick lookup
    const deviceMap = {};
    devices.forEach(device => {
      if (device.imei) {
        deviceMap[device.imei] = device;
      }
    });
    
    console.log('Device map created with', Object.keys(deviceMap).length, 'devices');
    
    // Extract all vehicles from companies and enrich with device data
    let totalVehiclesFromCompanies = 0;
    allCompanies.forEach(company => {
      if (company.vehicles && company.vehicles.items && company.vehicles.items.length > 0) {
        console.log(`=== PROCESSING COMPANY: ${company.name} ===`);
        console.log('Company vehicles count:', company.vehicles.items.length);
        
        const companyVehicles = company.vehicles.items.map(vehicle => {
          console.log(`Processing vehicle: ${vehicle.immat}`);
          
          // Use the @hasOne relation with Device from GraphQL
          const associatedDevice = vehicle.device;
          
          const mappedVehicle = {
            ...vehicle,
            entreprise: company.name || company.nom || "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || "",
            nomVehicule: vehicle.nomVehicule || vehicle.code || "",
            imei: associatedDevice?.imei || "",
            typeBoitier: associatedDevice ? associatedDevice.protocolId?.toString() : "",
            marque: vehicle.marque || vehicle.brand?.brandName || "",
            modele: vehicle.modele_id || vehicle.modele?.modele || "",
            kilometrage: vehicle.kilometerage?.toString() || "",
            telephone: associatedDevice?.sim || "",
            emplacement: vehicle.locations || "",
            deviceData: associatedDevice || null,
            isAssociated: !!associatedDevice,
            // Additional fields
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
      }
    });
    
    console.log('Total vehicles processed from companies:', totalVehiclesFromCompanies);
    
    // Find devices that are not associated with any vehicle
    const associatedDeviceImeis = new Set(allVehicles.map(v => v.deviceData?.imei).filter(Boolean));
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
    
    allDevices = [...allVehicles, ...unassociatedDevices];
    
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

export const updateVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
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
