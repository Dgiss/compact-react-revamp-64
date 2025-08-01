import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Check if a device is already associated with another vehicle
 * @param {string} deviceImei - Device IMEI
 * @param {string} excludeVehicleImmat - Vehicle to exclude from check (for updates)
 * @returns {Promise<{isAssociated: boolean, vehicle?: Object}>}
 */
export const checkDeviceVehicleUniqueness = async (deviceImei, excludeVehicleImmat = null) => {
  try {
    // Ensure Amplify is properly configured with retry
    await withCredentialRetry(async () => {
      await waitForAmplifyConfig();
      return true;
    });
    
    console.log(`🔍 Checking uniqueness for device ${deviceImei} (exclude: ${excludeVehicleImmat})`);
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
    const associatedVehicle = device.vehicle;
    if (!associatedVehicle) {
      return { isAssociated: false };
    }
    
    const associatedVehicleImmat = associatedVehicle.immat;
    
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
  try {
    // Ensure Amplify is properly configured with retry
    await withCredentialRetry(async () => {
      await waitForAmplifyConfig();
      return true;
    });
    
    console.log(`🔄 Associating device ${deviceImei} to vehicle ${vehicleImmat}`);
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
    
    // Proceed with association by updating the vehicle's vehicleDeviceImei field
    const updateResult = await client.graphql({
      query: mutations.updateVehicle,
      variables: {
        input: {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei
        }
      }
    });
    
    // Return only serializable data to avoid DataCloneError
    const vehicleData = updateResult.data?.updateVehicle;
    const cleanVehicleData = {
      immat: vehicleData?.immat || vehicleImmat,
      vehicleDeviceImei: vehicleData?.vehicleDeviceImei || deviceImei,
      immatriculation: vehicleData?.immatriculation || vehicleImmat,
      nomVehicule: vehicleData?.nomVehicule,
      isAssociated: true,
      type: 'vehicle'
    };
    
    return { 
      success: true, 
      vehicleUpdate: cleanVehicleData,
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
  try {
    // Ensure Amplify is properly configured with retry
    await withCredentialRetry(async () => {
      await waitForAmplifyConfig();
      return true;
    });
    
    console.log(`🔄 Dissociating device ${deviceImei}`);
    // Find the vehicle associated with this device first
    const vehiclesResponse = await client.graphql({
      query: queries.listVehicles,
      variables: {
        filter: {
          vehicleDeviceImei: { eq: deviceImei }
        }
      }
    });
    
    const associatedVehicles = vehiclesResponse.data?.listVehicles?.items || [];
    
    // Dissociate from all vehicles (should be only one due to uniqueness)
    const updatePromises = associatedVehicles.map(vehicle => 
      client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: {
            immat: vehicle.immat,
            vehicleDeviceImei: null
          }
        }
      })
    );
    
    await Promise.all(updatePromises);
    
    return { 
      success: true, 
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
  try {
    // Ensure Amplify is properly configured with retry
    await withCredentialRetry(async () => {
      await waitForAmplifyConfig();
      return true;
    });
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        limit: 1000
      }
    });
    
    const allDevices = response.data?.listDevices?.items || [];
    
    // Filter devices that don't have a vehicle association
    const freeDevices = allDevices.filter(device => !device.vehicle);
    
    return freeDevices;
  } catch (error) {
    throw error;
  }
};