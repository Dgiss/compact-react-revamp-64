
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { addDeviceToFlespi } from './FlespiService.js';

const client = generateClient();

export const fetchAllDevices = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING ALL DEVICES ===');
    
    let allDevices = [];
    let nextToken = null;
    
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      console.log('Fetching devices batch with variables:', variables);
      
      try {
        const deviceList = await client.graphql({
          query: queries.listDevices,
          variables: variables
        });
        
        const data = deviceList.data.listDevices;
        console.log('Devices batch received:', data.items.length);
        
        allDevices = allDevices.concat(data.items);
        nextToken = data.nextToken;
        
      } catch (error) {
        console.error('Error fetching devices:', error);
        if (error.errors) {
          console.error('GraphQL errors:', error.errors);
        }
        throw new Error(`Failed to fetch devices: ${error.message}`);
      }
      
    } while (nextToken);
    
    console.log('Total devices fetched:', allDevices.length);
    return allDevices;
  });
};

/**
 * Create a new device with automatic Flespi integration
 * @param {Object} deviceData - Device data including IMEI, SIM, etc.
 * @returns {Promise<Object>} Created device
 */
export const createDevice = async (deviceData) => {
  return await withCredentialRetry(async () => {
  
  try {
    console.log('=== CREATING DEVICE ===');
    console.log('Input data:', deviceData);
    
    // Validate required fields
    if (!deviceData.imei) {
      throw new Error('IMEI is required for device creation');
    }
    
    // Check if device already exists first
    try {
      const existingDevice = await client.graphql({
        query: queries.getDevice,
        variables: {
          imei: deviceData.imei
        }
      });
      
      if (existingDevice.data.getDevice) {
        console.log('Device already exists:', existingDevice.data.getDevice);
        return existingDevice.data.getDevice;
      }
    } catch (getError) {
      // Device doesn't exist, continue with creation
      console.log('Device does not exist, proceeding with creation');
    }
    
    // First, add device to Flespi (optional, continue if it fails)
    let flespiDeviceId = null;
    try {
      flespiDeviceId = await addDeviceToFlespi({
        imei: deviceData.imei,
        constructor: deviceData.constructor || deviceData.imei
      });
      console.log('Device added to Flespi with ID:', flespiDeviceId);
    } catch (flespiError) {
      console.warn('Failed to add device to Flespi, continuing with GraphQL creation:', flespiError.message);
    }
    
    // Prepare device details for GraphQL - ensure proper types
    const deviceDetails = {
      imei: String(deviceData.imei),
      sim: deviceData.sim ? String(deviceData.sim) : null,
      protocolId: deviceData.protocolId ? Number(deviceData.protocolId) : null,
      flespiDeviceId: flespiDeviceId ? Number(flespiDeviceId) : null,
      deviceVehicleImmat: deviceData.deviceVehicleImmat ? String(deviceData.deviceVehicleImmat) : null,
      name: deviceData.name ? String(deviceData.name) : null,
      enabled: deviceData.enabled !== undefined ? Boolean(deviceData.enabled) : true // Default to enabled
    };
    
    // Remove null/undefined values to avoid GraphQL errors
    Object.keys(deviceDetails).forEach(key => {
      if (deviceDetails[key] === null || deviceDetails[key] === undefined) {
        delete deviceDetails[key];
      }
    });
    
    console.log('Creating device in GraphQL with cleaned data:', deviceDetails);
    
    const response = await client.graphql({
      query: mutations.createDevice,
      variables: {
        input: deviceDetails
      }
    });
    
    console.log('Device created successfully:', response.data.createDevice);
    return response.data.createDevice;
    
  } catch (error) {
    console.error('Error creating device:', error);
    
    // Handle DynamoDB conditional check failures (device already exists)
    if (error.errors?.some(err => 
      err.message?.includes('ConditionalCheckFailedException') ||
      err.message?.includes('already exists') ||
      err.message?.includes('duplicate')
    )) {
      console.log('Device already exists, fetching existing device');
      try {
        const existingDevice = await client.graphql({
          query: queries.getDevice,
          variables: {
            imei: deviceData.imei
          }
        });
        return existingDevice.data.getDevice;
      } catch (fetchError) {
        console.error('Failed to fetch existing device:', fetchError);
      }
    }
    
    console.error('Full error details:', JSON.stringify(error, null, 2));
    throw error;
  }
  });
};

/**
 * Update an existing device
 * @param {Object} deviceData - Updated device data
 * @returns {Promise<Object>} Updated device
 */
export const updateDevice = async (deviceData) => {
  return await withCredentialRetry(async () => {
  
  const deviceDetails = {
    imei: deviceData.imei,
    sim: deviceData.sim,
    protocolId: deviceData.protocolId || deviceData.typeBoitier,
    deviceVehicleImmat: deviceData.deviceVehicleImmat
  };
  
  // Remove undefined values to avoid GraphQL errors
  Object.keys(deviceDetails).forEach(key => {
    if (deviceDetails[key] === undefined) {
      delete deviceDetails[key];
    }
  });
  
  try {
    const response = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: deviceDetails
      }
    });
    
    console.log('Device updated successfully:', response.data.updateDevice);
    return response.data.updateDevice;
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
  });
};

/**
 * Delete a device
 * @param {Object} deviceData - Device data with IMEI
 * @returns {Promise<boolean>} Success status
 */
export const deleteDevice = async (deviceData) => {
  return await withCredentialRetry(async () => {
  
  try {
    await client.graphql({
      query: mutations.deleteDevice,
      variables: {
        input: { imei: deviceData.imei }
      }
    });
    
    console.log('Device deleted successfully:', deviceData.imei);
    return true;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
  });
};

/**
 * Check if a device exists by IMEI
 * @param {string} imei - Device IMEI to check
 * @returns {Promise<boolean>} True if device exists
 */
export const checkDeviceExists = async (imei) => {
  return await withCredentialRetry(async () => {
    try {
      const result = await client.graphql({
        query: queries.getDevice,
        variables: { imei }
      });
      return !!result.data.getDevice;
    } catch (error) {
      console.log('Device does not exist:', imei);
      return false;
    }
  });
};

/**
 * Toast utility function
 */
const showToast = (severity, summary, detail) => {
  // This will be handled by the UI component calling this service
  console.log(`[${severity.toUpperCase()}] ${summary}: ${detail}`);
};

/**
 * Validate and get valid IMEIs
 * @param {string} imei - Single IMEI to validate
 * @param {Array} imeiList - List of IMEIs if multiple
 * @returns {Promise<Array>} Array of valid IMEIs
 */
const getValidImeis = async (imei, imeiList = []) => {
  if (imeiList.length > 0) return imeiList;

  const trimmed = imei.trim();
  if (!trimmed) {
    throw new Error('Veuillez ajouter au moins un IMEI');
  }

  const exists = await checkDeviceExists(trimmed);
  if (exists) {
    throw new Error('IMEI déjà existant');
  }

  return [trimmed];
};

/**
 * Process device creation with Flespi integration
 * @param {Array} imeis - Array of IMEIs to process
 * @param {Object} deviceInfo - Device information (constructor, etc.)
 * @param {Object} vehicleInfo - Vehicle information for association
 * @returns {Promise<Object>} Results object with success and error counts
 */
const processDevices = async (imeis, deviceInfo, vehicleInfo) => {
  const successfulDevices = [];
  const errors = [];

  for (const imei of imeis) {
    try {
      const exists = await checkDeviceExists(imei);
      if (exists) {
        errors.push(`${imei} (existe déjà)`);
        continue;
      }

      // Add to Flespi
      const flespiId = await addDeviceToFlespi({
        imei,
        constructor: deviceInfo.constructor
      });

      // Add to database
      await createDevice({ 
        imei,
        sim: deviceInfo.sim,
        protocolId: deviceInfo.protocolId,
        deviceVehicleImmat: vehicleInfo.immatriculation // Direct association
      });

      successfulDevices.push({
        imei,
        sim: deviceInfo.sim || '',
        deviceVehicleImmat: vehicleInfo.immatriculation,
        id: imei,
        vehicle: { company: { name: vehicleInfo.company?.name || '' } }
      });

    } catch (err) {
      errors.push(`${imei} (${err.message || 'Erreur inconnue'})`);
    }
  }

  return { successfulDevices, errors };
};

/**
 * Create device with immediate vehicle association - orchestrator function
 * @param {Object} data - Complete data for device and vehicle creation
 * @returns {Promise<Object>} Creation results
 */
export const createDeviceWithVehicleAssociation = async (data) => {
  return await withCredentialRetry(async () => {
    console.log('=== CREATING DEVICE WITH VEHICLE ASSOCIATION ===');
    console.log('Input data:', data);

    try {
      // Validate IMEIs
      const validImeis = await getValidImeis(data.imei, data.imeiList);
      if (validImeis.length === 0) {
        throw new Error('Aucun IMEI valide fourni');
      }

      // Process devices
      const results = await processDevices(validImeis, {
        constructor: data.constructor,
        sim: data.sim,
        protocolId: data.protocolId
      }, {
        immatriculation: data.immatriculation,
        company: data.company
      });

      // Import createVehicleData here to avoid circular dependency
      const { createVehicleData } = await import('./VehicleService.js');

      // Create vehicle with device association for successful devices
      if (results.successfulDevices.length > 0) {
        await createVehicleData({
          immatriculation: data.immatriculation,
          categorie: data.categorie,
          brand: data.brand,
          modele: data.modele,
          companyVehiclesId: data.companyVehiclesId,
          vehicleDeviceImei: validImeis[0], // Associate with first successful device
          nomVehicule: data.nomVehicule,
          emplacement: data.emplacement,
          kilometrage: data.kilometrage
        });
      }

      return {
        success: results.successfulDevices.length > 0,
        successCount: results.successfulDevices.length,
        errorCount: results.errors.length,
        devices: results.successfulDevices,
        errors: results.errors
      };

    } catch (error) {
      console.error('Error in createDeviceWithVehicleAssociation:', error);
      throw error;
    }
  });
};

// Helper function to determine device type/name from protocolId
export const getDeviceTypeName = (protocolId) => {
  const deviceTypeMap = {
    '1': 'Tracker GPS Standard',
    '2': 'Tracker GPS Avancé',
    '3': 'Boîtier Teltonika',
    '4': 'Dispositif OBD',
    '5': 'Tracker Magnétique',
    // Add more mappings as needed
  };
  
  return deviceTypeMap[protocolId] || 'GPS Tracker';
};
