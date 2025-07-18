import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { addDeviceToFlespi } from './FlespiService.js';
import { hasFlespiApiKey } from './ApiConfigService';
import { checkImeiAvailable, createDeviceSimple, associateDeviceToVehicleSimple } from './SimpleDeviceService.js';

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
 * Create a new device using simplified logic
 * @param {Object} deviceData - Device data including IMEI, SIM, etc.
 * @returns {Promise<Object>} Created device
 */
export const createDevice = async (deviceData) => {
  console.log('=== CREATING DEVICE (SIMPLIFIED) ===');
  console.log('Input data:', deviceData);
  
  // Use the new simplified device creation
  return await createDeviceSimple(deviceData);
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
  const isAvailable = await checkImeiAvailable(imei);
  return !isAvailable; // checkImeiAvailable returns true if available (doesn't exist)
};

/**
 * Create device with immediate vehicle association - CORRECTED ORDER
 * @param {Object} data - Complete data for device and vehicle creation
 * @returns {Promise<Object>} Creation results
 */
export const createDeviceWithVehicleAssociation = async (data) => {
  return await withCredentialRetry(async () => {
    console.log('=== CREATING DEVICE WITH VEHICLE ASSOCIATION (CORRECTED ORDER) ===');
    console.log('Input data:', data);

    try {
      // Step 1: Validate IMEI availability
      const imeiList = data.imeiList || [data.imei];
      const validImeis = [];
      const errors = [];

      for (const imei of imeiList) {
        if (!imei?.trim()) continue;
        
        const isAvailable = await checkImeiAvailable(imei.trim());
        if (isAvailable) {
          validImeis.push(imei.trim());
        } else {
          errors.push(`${imei} (déjà existant)`);
        }
      }

      if (validImeis.length === 0) {
        throw new Error('Aucun IMEI disponible');
      }

      // Step 2: Create vehicle FIRST (this was the problem - devices were created before vehicles)
      const { createVehicleSimple } = await import('./SimpleVehicleService.js');
      
      const createdVehicle = await createVehicleSimple({
        immatriculation: data.immatriculation,
        categorie: data.categorie,
        marque: data.brand,
        modele: data.modele,
        companyVehiclesId: data.companyVehiclesId,
        nomVehicule: data.nomVehicule,
        emplacement: data.emplacement,
        kilometrage: data.kilometrage
      });
      
      console.log('Vehicle created successfully:', createdVehicle.immat);

      // Step 3: Create devices AFTER vehicle exists
      const successfulDevices = [];
      
      for (const imei of validImeis) {
        try {
          const device = await createDeviceSimple({
            imei: imei,
            sim: data.sim,
            protocolId: data.protocolId,
            constructor: data.constructor
          });
          
          console.log('Device created successfully:', device.imei);
          
          // Step 4: Associate device to vehicle
          await associateDeviceToVehicleSimple(data.immatriculation, imei);
          console.log('Device associated to vehicle successfully');
          
          successfulDevices.push({
            imei: device.imei,
            sim: device.sim || '',
            deviceVehicleImmat: data.immatriculation,
            id: device.imei,
            vehicle: { company: { name: data.company?.name || '' } }
          });
        } catch (deviceError) {
          console.error(`Error creating/associating device ${imei}:`, deviceError);
          errors.push(`${imei} (${deviceError.message})`);
        }
      }

      return {
        success: successfulDevices.length > 0,
        successCount: successfulDevices.length,
        errorCount: errors.length,
        devices: successfulDevices,
        errors: errors,
        vehicle: createdVehicle
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

// Export the new simplified functions and the main function
export { 
  checkImeiAvailable, 
  createDeviceSimple, 
  associateDeviceToVehicleSimple,
  createDeviceWithVehicleAssociation
};
