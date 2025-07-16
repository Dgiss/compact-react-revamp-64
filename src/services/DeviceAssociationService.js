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
  
  console.log('=== ASSOCIATING DEVICE TO VEHICLE (FIXED GRAPHQL) ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Vehicle immat:', vehicleImmat);
  
  try {
    // CRITICAL FIX: Use the CORRECT GraphQL relation - update Device to link to Vehicle
    // The schema shows: Vehicle @hasOne Device and Device @belongsTo Vehicle
    const deviceUpdate = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          vehicleImmat: vehicleImmat // This creates the @belongsTo relation
        }
      }
    });
    
    console.log('Device association successful:', deviceUpdate.data?.updateDevice);
    console.log('Device associated successfully to vehicle via GraphQL relation');
    
    return { success: true, deviceUpdate: deviceUpdate.data?.updateDevice };
  } catch (error) {
    console.error('Error associating device to vehicle:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
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
  
  console.log('Free devices found in cache:', freeDevices.length);
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
  
  console.log('Available vehicles found in cache for company:', companyId, 'Count:', availableVehicles.length);
  return availableVehicles;
};