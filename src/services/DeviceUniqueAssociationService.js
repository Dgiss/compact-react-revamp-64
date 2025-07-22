import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Check if a device is already associated with another vehicle
 * @param {string} deviceImei - Device IMEI
 * @param {string} excludeVehicleImmat - Vehicle to exclude from check (for updates)
 * @returns {Promise<{isAssociated: boolean, vehicle?: Object}>}
 */
export const checkDeviceVehicleUniqueness = async (deviceImei, excludeVehicleImmat = null) => {
  await waitForAmplifyConfig();
  
  try {
    // Get device and check its vehicle association
    const deviceResponse = await client.graphql({
      query: queries.getDevice,
      variables: { imei: deviceImei }
    });
    
    const device = deviceResponse.data?.getDevice;
    if (!device) {
      return { isAssociated: false };
    }
    
    // Check if device has a vehicle association
    const associatedVehicleImmat = device.deviceVehicleImmat;
    if (!associatedVehicleImmat) {
      return { isAssociated: false };
    }
    
    // If excluding a specific vehicle (for updates), check if it's different
    if (excludeVehicleImmat && associatedVehicleImmat === excludeVehicleImmat) {
      return { isAssociated: false };
    }
    
    // Get vehicle details
    const vehicleResponse = await client.graphql({
      query: queries.getVehicle,
      variables: { immat: associatedVehicleImmat }
    });
    
    return {
      isAssociated: true,
      vehicle: vehicleResponse.data?.getVehicle,
      vehicleImmat: associatedVehicleImmat
    };
    
  } catch (error) {
    throw error;
  }
};

/**
 * Associate device to vehicle with uniqueness validation
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @param {boolean} forceAssociation - Force association even if device is already associated
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicleUnique = async (deviceImei, vehicleImmat, forceAssociation = false) => {
  await waitForAmplifyConfig();
  
  try {
    // Check if device is already associated
    const uniquenessCheck = await checkDeviceVehicleUniqueness(deviceImei, vehicleImmat);
    
    if (uniquenessCheck.isAssociated && !forceAssociation) {
      throw new Error(
        `Le boîtier ${deviceImei} est déjà associé au véhicule ${uniquenessCheck.vehicleImmat}. ` +
        `Un boîtier ne peut être associé qu'à un seul véhicule à la fois.`
      );
    }
    
    // If already associated to another vehicle and force is enabled, dissociate first
    if (uniquenessCheck.isAssociated && forceAssociation) {
      await dissociateDeviceFromVehicle(deviceImei);
    }
    
    // Proceed with association
    const updateResult = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          deviceVehicleImmat: vehicleImmat
        }
      }
    });
    
    return { 
      success: true, 
      deviceUpdate: updateResult.data?.updateDevice,
      message: `Boîtier ${deviceImei} associé avec succès au véhicule ${vehicleImmat}`
    };
    
  } catch (error) {
    throw error;
  }
};

/**
 * Dissociate device from vehicle
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Dissociation result
 */
export const dissociateDeviceFromVehicle = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    const updateResult = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          deviceVehicleImmat: null
        }
      }
    });
    
    return { 
      success: true, 
      deviceUpdate: updateResult.data?.updateDevice,
      message: `Boîtier ${deviceImei} dissocié avec succès`
    };
    
  } catch (error) {
    throw error;
  }
};

/**
 * Get free devices (not associated with any vehicle)
 * @returns {Promise<Array>} Array of free devices
 */
export const getFreeDevices = async () => {
  await waitForAmplifyConfig();
  
  try {
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: {
          deviceVehicleImmat: { attributeExists: false }
        },
        limit: 1000
      }
    });
    
    return response.data?.listDevices?.items || [];
  } catch (error) {
    throw error;
  }
};