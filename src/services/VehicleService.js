
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    let allCompanies = [];
    let allVehicles = [];
    let allDevices = [];
    let nextToken = null;
    
    // Fetch companies with vehicles (nouvelle relation)
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      const companyList = await client.graphql({
        query: queries.listCompanies,
        variables: variables
      });
      
      const data = companyList.data.listCompanies;
      allCompanies = allCompanies.concat(data.items);
      nextToken = data.nextToken;
      
    } while (nextToken);
  
  // Fetch all devices
  const devices = await fetchAllDevices();
  console.log('=== DEVICE DEBUG INFO ===');
  console.log('Total devices fetched:', devices.length);
  console.log('First device sample:', devices[0]);
  console.log('Device structure sample:', {
    imei: devices[0]?.imei,
    protocolId: devices[0]?.protocolId,
    sim: devices[0]?.sim
  });
  
  // Create a map of devices by IMEI for quick lookup
  const deviceMap = {};
  devices.forEach(device => {
    if (device.imei) {
      deviceMap[device.imei] = device;
    }
  });
  
  console.log('Device map keys (IMEIs):', Object.keys(deviceMap));
  console.log('Device map sample entry:', deviceMap[Object.keys(deviceMap)[0]]);
  
  // Extract all vehicles from companies and enrich with device data
  allCompanies.forEach(company => {
    if (company.vehicles && company.vehicles.items) {
      const companyVehicles = company.vehicles.items.map(vehicle => {
        console.log(`=== VEHICLE DEBUG: ${vehicle.immat} ===`);
        console.log('Vehicle device relation:', vehicle.device);
        
        // Use the @hasOne relation with Device from GraphQL
        const associatedDevice = vehicle.device;
        console.log('Associated device found:', !!associatedDevice);
        
        if (associatedDevice) {
          console.log('Device data:', {
            imei: associatedDevice.imei,
            protocolId: associatedDevice.protocolId,
            sim: associatedDevice.sim
          });
        } else {
          console.log('No device found for vehicle:', vehicle.immat);
        }
        
        return {
          ...vehicle,
          entreprise: company.name || "Non définie",
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
          isAssociated: true,
          // Nouveaux champs du schéma enrichi
          AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
          energie: vehicle.energie || "",
          puissanceFiscale: vehicle.puissanceFiscale || "",
          couleur: vehicle.couleur || "",
          dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
          VIN: vehicle.VIN || vehicle.AWN_VIN || ""
        };
      });
      allVehicles = allVehicles.concat(companyVehicles);
    }
  });
  
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
  
  allDevices = [...allVehicles, ...unassociatedDevices];
  
    console.log('=== FINAL RESULT SAMPLE ===');
    console.log('Sample vehicle with device data:', allDevices.find(d => d.type === 'vehicle'));
    console.log('Sample unassociated device:', allDevices.find(d => d.type === 'device'));
    
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
