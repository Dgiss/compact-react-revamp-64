import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Associate a device to a vehicle using vehicleDeviceImei field - CORRECTED
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  await waitForAmplifyConfig();
  
  console.log('=== ASSOCIATING DEVICE TO VEHICLE (CORRECTED) ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Vehicle immat:', vehicleImmat);
  
  try {
    // FIXED: Update vehicle with device IMEI using the existing vehicleDeviceImei field
    const vehicleUpdate = await client.graphql({
      query: mutations.updateVehicle,
      variables: {
        input: {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei
        }
      }
    });
    
    console.log('Vehicle association successful:', vehicleUpdate.data?.updateVehicle);
    console.log('Device associated successfully to vehicle');
    
    return { success: true, vehicleUpdate: vehicleUpdate.data?.updateVehicle };
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
 * Get free devices from cache (devices not associated with vehicles) - CORRECTED
 * @param {Array} cachedVehicles - Cached vehicles data
 * @returns {Array} Free devices
 */
export const getFreeDevicesFromCache = (cachedVehicles) => {
  if (!cachedVehicles) return [];
  
  // FIXED: Correctly identify free devices using vehicleDeviceImei absence
  const freeDevices = cachedVehicles.filter(item => 
    item.type === "device" && 
    !item.isAssociated &&
    (item.entreprise === "Boîtier libre" || !item.vehicleDeviceImei)
  );
  
  console.log('Free devices found in cache:', freeDevices.length);
  return freeDevices;
};

/**
 * Get vehicles available for association from cache (vehicles without deviceImei) - CORRECTED
 * @param {Array} cachedVehicles - Cached vehicles data
 * @param {string} companyId - Company ID
 * @returns {Array} Available vehicles
 */
export const getAvailableVehiclesFromCache = (cachedVehicles, companyId) => {
  if (!cachedVehicles) return [];
  
  // FIXED: Use consistent vehicleDeviceImei field check
  const availableVehicles = cachedVehicles.filter(item => 
    item.type === "vehicle" && 
    item.companyVehiclesId === companyId &&
    (!item.vehicleDeviceImei || item.vehicleDeviceImei === "")
  );
  
  console.log('Available vehicles found in cache for company:', companyId, 'Count:', availableVehicles.length);
  return availableVehicles;
};