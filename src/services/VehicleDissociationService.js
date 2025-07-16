import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Dissociate a device from a vehicle by removing the vehicleDeviceImei
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Dissociation result
 */
export const dissociateDeviceFromVehicle = async (vehicleImmat) => {
  await waitForAmplifyConfig();
  
  console.log('=== DISSOCIATING DEVICE FROM VEHICLE ===');
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
    
    console.log('Vehicle dissociation result:', vehicleUpdate);
    console.log('Device dissociated successfully from vehicle:', vehicleImmat);
    
    return { success: true, vehicleUpdate };
  } catch (error) {
    console.error('Error dissociating device from vehicle:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};

/**
 * Dissociate multiple devices from vehicles
 * @param {string[]} vehicleImmats - Array of vehicle immatriculations
 * @returns {Promise<Object>} Bulk dissociation result
 */
export const bulkDissociateDevicesFromVehicles = async (vehicleImmats) => {
  await waitForAmplifyConfig();
  
  console.log('=== BULK DISSOCIATING DEVICES FROM VEHICLES ===');
  console.log('Vehicle immats:', vehicleImmats);
  
  const results = [];
  const errors = [];
  
  for (const immat of vehicleImmats) {
    try {
      const result = await dissociateDeviceFromVehicle(immat);
      results.push({ immat, ...result });
    } catch (error) {
      errors.push({ immat, error: error.message });
    }
  }
  
  console.log('Bulk dissociation completed:', {
    successful: results.length,
    failed: errors.length
  });
  
  return {
    success: errors.length === 0,
    results,
    errors,
    total: vehicleImmats.length,
    successful: results.length,
    failed: errors.length
  };
};