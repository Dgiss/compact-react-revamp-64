import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry, getLazyClient } from '@/config/aws-config.js';
import { toast } from '@/hooks/use-toast';

const client = getLazyClient();

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
    
    // FIXED: Check for association success by verifying key fields
    const vehicleData = updateResult.data?.updateVehicle;
    if (!vehicleData || !vehicleData.vehicleDeviceImei) {
      console.error('Association failed - no vehicleDeviceImei in response');
      throw new Error('Association échouée - véhicule non mis à jour');
    }

    // Log success but ignore nullable field errors
    if (updateResult.errors && updateResult.errors.length > 0) {
      console.log('GraphQL nullable field errors (ignored):', updateResult.errors.map(e => e.message));
    }
    
    // Return only simple serializable data
    const cleanVehicleData = {
      immat: vehicleData.immat || vehicleImmat,
      vehicleDeviceImei: vehicleData.vehicleDeviceImei || deviceImei,
      isAssociated: true,
      type: 'vehicle'
    };
    
    console.log('Association successful:', cleanVehicleData);
    
    return { 
      success: true, 
      vehicleUpdate: cleanVehicleData,
      message: `Boîtier ${deviceImei} associé avec succès au véhicule ${vehicleImmat}`
    };
    
  } catch (error) {
    console.error('Error associating device to vehicle:', error);
    // Don't show toast here - let the calling hook handle user feedback
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
      query: `
        query ListVehiclesMinimal($filter: ModelVehicleFilterInput) {
          listVehicles(filter: $filter) {
            items {
              immat
              companyVehiclesId
              vehicleDeviceImei
            }
          }
        }
      `,
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
    
    // FIXED: Get device details to return complete dissociation info
    let deviceData = null;
    try {
      const deviceResponse = await client.graphql({
        query: queries.getDevice,
        variables: { imei: deviceImei }
      });
      deviceData = deviceResponse.data?.getDevice;
    } catch (deviceError) {
      console.warn('Could not fetch device details after dissociation:', deviceError);
    }
    
    // Return dissociated device information for cache update
    const dissociatedDevice = {
      imei: deviceImei,
      isAssociated: false,
      vehicleImmat: null,
      type: 'device',
      // Include any other device fields available
      ...(deviceData && {
        sim: deviceData.sim,
        protocolId: deviceData.protocolId,
        typeBoitier: deviceData.protocolId?.toString() || ""
      })
    };
    
    console.log('🔄 Dissociation completed, returning device info:', dissociatedDevice);
    
    return { 
      success: true, 
      message: `Boîtier ${deviceImei} dissocié avec succès`,
      dissociatedDevice: dissociatedDevice
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