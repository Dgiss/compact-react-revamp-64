
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry } from '@/config/aws-config.js';
import { addDeviceToFlespi } from './FlespiService.js';
import { hasFlespiApiKey } from './ApiConfigService';

const client = generateClient();

/**
 * Check if IMEI is available (doesn't exist in database)
 * @param {string} imei - IMEI to check
 * @returns {Promise<boolean>} True if available, false if exists
 */
export const checkImeiAvailable = async (imei) => {
  return await withCredentialRetry(async () => {
    try {
      const result = await client.graphql({
        query: queries.getDevice,
        variables: { imei: imei }
      });
      
      // If device exists, IMEI is not available
      return !result.data.getDevice;
    } catch (error) {
      // If error (device not found), IMEI is available
      console.log('IMEI is available:', imei);
      return true;
    }
  });
};

/**
 * Create device with simple logic: check availability, create in DB and Flespi
 * @param {Object} deviceData - Device data
 * @returns {Promise<Object>} Created device or existing device
 */
export const createDeviceSimple = async (deviceData) => {
  return await withCredentialRetry(async () => {
    console.log('=== CREATING DEVICE SIMPLE ===');
    console.log('Device data:', deviceData);
    
    // Validate required fields
    if (!deviceData.imei) {
      throw new Error('IMEI is required');
    }
    
    // Step 1: Check if IMEI is available
    const isAvailable = await checkImeiAvailable(deviceData.imei);
    if (!isAvailable) {
      console.log('IMEI already exists, fetching existing device');
      const existingDevice = await client.graphql({
        query: queries.getDevice,
        variables: { imei: deviceData.imei }
      });
      return existingDevice.data.getDevice;
    }
    
    // Step 2: Create in database using direct mutation
    const deviceInput = {
      imei: String(deviceData.imei),
      sim: deviceData.sim ? String(deviceData.sim) : undefined,
      protocolId: deviceData.protocolId ? Number(deviceData.protocolId) : undefined,
      name: deviceData.name ? String(deviceData.name) : undefined,
      enabled: deviceData.enabled !== undefined ? Boolean(deviceData.enabled) : true
    };
    
    // Remove undefined values
    Object.keys(deviceInput).forEach(key => {
      if (deviceInput[key] === undefined) {
        delete deviceInput[key];
      }
    });
    
    console.log('Creating device in database:', deviceInput);
    
    const dbResult = await client.graphql({
      query: mutations.createDevice,
      variables: { input: deviceInput }
    });
    
    const createdDevice = dbResult.data.createDevice;
    console.log('Device created in database:', createdDevice);
    
    // Step 3: Create in Flespi (optional, don't fail if it doesn't work)
    try {
      if (hasFlespiApiKey()) {
        const flespiId = await addDeviceToFlespi({
          imei: deviceData.imei,
          constructor: deviceData.constructor || deviceData.imei
        });
        
        if (flespiId) {
          // Update device with Flespi ID
          await client.graphql({
            query: mutations.updateDevice,
            variables: {
              input: {
                imei: deviceData.imei,
                flespiDeviceId: Number(flespiId)
              }
            }
          });
          console.log('Device updated with Flespi ID:', flespiId);
        }
      } else {
        console.warn('Flespi API key not configured, skipping Flespi creation');
      }
    } catch (flespiError) {
      console.warn('Flespi creation failed but continuing:', flespiError.message);
    }
    
    return createdDevice;
  });
};

/**
 * Associate device to vehicle using vehicleDeviceImei field
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Updated vehicle
 */
export const associateDeviceToVehicleSimple = async (vehicleImmat, deviceImei) => {
  return await withCredentialRetry(async () => {
    console.log('=== ASSOCIATING DEVICE TO VEHICLE SIMPLE ===');
    console.log('Vehicle:', vehicleImmat, 'Device:', deviceImei);
    
    const result = await client.graphql({
      query: mutations.updateVehicle,
      variables: {
        input: {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei
        }
      }
    });
    
    console.log('Association completed:', result.data.updateVehicle);
    return result.data.updateVehicle;
  });
};
