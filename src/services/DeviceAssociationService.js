import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Associate a device to a vehicle using CORRECT GraphQL relations
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  await waitForAmplifyConfig();
  
  
  try {
    // CRITICAL FIX: Use the CORRECT GraphQL relation - update Device to link to Vehicle
    // The schema shows: Vehicle @hasOne Device and Device @belongsTo Vehicle
    const deviceUpdate = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          deviceVehicleImmat: vehicleImmat // Fixed GraphQL field name
        }
      }
    });
    
    
    return { success: true, deviceUpdate: deviceUpdate.data?.updateDevice };
  } catch (error) {
    throw error;
  }
};

/**
 * Get free devices from cache (devices not associated with vehicles) - FIXED GRAPHQL
 * @param {Array} cachedVehicles - Cached vehicles data
 * @returns {Array} Free devices
 */
export const getFreeDevicesFromCache = (cachedVehicles) => {
  if (!cachedVehicles) return [];
  
  // FIXED: Use GraphQL relations - devices without vehicleImmat
  const freeDevices = cachedVehicles.filter(item => 
    item.type === "device" && 
    !item.isAssociated &&
    !item.vehicleImmat // GraphQL relation field
  );
  
  
  return freeDevices;
};

/**
 * Get vehicles available for association from cache (vehicles without device) - FIXED GRAPHQL
 * @param {Array} cachedVehicles - Cached vehicles data
 * @param {string} companyId - Company ID
 * @returns {Array} Available vehicles
 */
export const getAvailableVehiclesFromCache = (cachedVehicles, companyId) => {
  if (!cachedVehicles) return [];
  
  // FIXED: Use GraphQL relations - vehicles without device
  const availableVehicles = cachedVehicles.filter(item => 
    item.type === "vehicle" && 
    item.companyVehiclesId === companyId &&
    !item.device?.imei // GraphQL relation check
  );
  
  
  return availableVehicles;
};