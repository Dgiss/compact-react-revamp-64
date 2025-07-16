
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';
import { addDeviceToFlespi } from './FlespiService.js';

const client = generateClient();

export const fetchAllDevices = async () => {
  await waitForAmplifyConfig();
  let allDevices = [];
  let nextToken = null;
  
  do {
    const variables = {
      limit: 2000, // Increased limit for fewer round trips
      nextToken: nextToken
    };
    
    const deviceList = await client.graphql({
      query: queries.listDevices,
      variables: variables
    });
    
    const data = deviceList.data.listDevices;
    allDevices = allDevices.concat(data.items);
    nextToken = data.nextToken;
    
  } while (nextToken);
  
  return allDevices;
};

/**
 * Create a new device with automatic Flespi integration
 * @param {Object} deviceData - Device data including IMEI, SIM, etc.
 * @returns {Promise<Object>} Created device
 */
export const createDevice = async (deviceData) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('=== CREATING DEVICE ===');
    console.log('Input data:', deviceData);
    
    // Validate required fields
    if (!deviceData.imei) {
      throw new Error('IMEI is required for device creation');
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
    console.error('Full error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};

/**
 * Update an existing device
 * @param {Object} deviceData - Updated device data
 * @returns {Promise<Object>} Updated device
 */
export const updateDevice = async (deviceData) => {
  await waitForAmplifyConfig();
  
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
};

/**
 * Delete a device
 * @param {Object} deviceData - Device data with IMEI
 * @returns {Promise<boolean>} Success status
 */
export const deleteDevice = async (deviceData) => {
  await waitForAmplifyConfig();
  
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
