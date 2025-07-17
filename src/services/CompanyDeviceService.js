import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { waitForAmplifyConfig } from '@/config/aws-config.js';
import { createDevice } from './DeviceService.js';

const client = generateClient();

/**
 * Ensure device exists in the database, create if it doesn't
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Device object
 */
const ensureDeviceExists = async (deviceImei) => {
  console.log('=== ENSURING DEVICE EXISTS ===');
  console.log('Device IMEI to check:', deviceImei);
  
  try {
    // Try to get the device first
    console.log('Checking if device exists...');
    const deviceResponse = await client.graphql({
      query: queries.getDevice,
      variables: { imei: deviceImei }
    });
    
    if (deviceResponse.data?.getDevice) {
      console.log('✅ Device already exists:', deviceResponse.data.getDevice);
      return deviceResponse.data.getDevice;
    }
    console.log('❌ Device not found in database');
  } catch (error) {
    console.log('❌ Error checking device existence:', error.message);
  }
  
  // Device doesn't exist, create it with minimal data
  console.log('🔨 Creating new device with IMEI:', deviceImei);
  try {
    const newDevice = await createDevice({
      imei: deviceImei,
      enabled: true
    });
    
    console.log('✅ Device created successfully:', newDevice);
    
    // Wait a bit for consistency
    console.log('⏳ Waiting 500ms for database consistency...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify the device was created
    const verifyResponse = await client.graphql({
      query: queries.getDevice,
      variables: { imei: deviceImei }
    });
    
    if (verifyResponse.data?.getDevice) {
      console.log('✅ Device verified in database:', verifyResponse.data.getDevice);
      return verifyResponse.data.getDevice;
    } else {
      console.log('⚠️ Device not found after creation - consistency issue');
      return newDevice;
    }
  } catch (createError) {
    console.error('❌ Error creating device:', createError);
    throw createError;
  }
};

/**
 * Associate a device to a company using CompanyDevice table
 * @param {string} deviceImei - Device IMEI
 * @param {string} companyId - Company ID
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToCompany = async (deviceImei, companyId) => {
  await waitForAmplifyConfig();
  
  console.log('=== ASSOCIATING DEVICE TO COMPANY ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Company ID:', companyId);
  
  try {
    // Ensure the device exists before creating the association
    await ensureDeviceExists(deviceImei);
    
    const associationDate = new Date().toISOString();
    
    const companyDeviceCreate = await client.graphql({
      query: mutations.createCompanyDevice,
      variables: {
        input: {
          companyID: companyId,
          deviceIMEI: deviceImei,
          associationDate: associationDate,
          isActive: true
        }
      }
    });
    
    console.log('Company device association successful:', companyDeviceCreate.data?.createCompanyDevice);
    
    return { success: true, companyDevice: companyDeviceCreate.data?.createCompanyDevice };
  } catch (error) {
    console.error('Error associating device to company:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};

/**
 * Dissociate a device from a company (set isActive to false and add dissociationDate)
 * @param {string} deviceImei - Device IMEI
 * @param {string} companyId - Company ID (optional, will find active association if not provided)
 * @returns {Promise<Object>} Dissociation result
 */
export const dissociateDeviceFromCompany = async (deviceImei, companyId = null) => {
  await waitForAmplifyConfig();
  
  console.log('=== DISSOCIATING DEVICE FROM COMPANY ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Company ID:', companyId);
  
  try {
    // Find active association if companyId not provided
    let activeAssociation;
    if (!companyId) {
      activeAssociation = await getActiveCompanyDeviceAssociation(deviceImei);
      if (!activeAssociation) {
        throw new Error('No active company association found for this device');
      }
    } else {
      // Get association by company and device
      const associations = await client.graphql({
        query: queries.companyDevicesByDeviceIMEIAndAssociationDate,
        variables: {
          deviceIMEI: deviceImei,
          filter: {
            companyID: { eq: companyId },
            isActive: { eq: true }
          }
        }
      });
      activeAssociation = associations.data?.companyDevicesByDeviceIMEIAndAssociationDate?.items?.[0];
    }
    
    if (!activeAssociation) {
      throw new Error('No active association found to dissociate');
    }
    
    const dissociationDate = new Date().toISOString();
    
    const companyDeviceUpdate = await client.graphql({
      query: mutations.updateCompanyDevice,
      variables: {
        input: {
          id: activeAssociation.id,
          dissociationDate: dissociationDate,
          isActive: false
        }
      }
    });
    
    console.log('Company device dissociation successful:', companyDeviceUpdate.data?.updateCompanyDevice);
    
    return { success: true, companyDevice: companyDeviceUpdate.data?.updateCompanyDevice };
  } catch (error) {
    console.error('Error dissociating device from company:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};

/**
 * Get active company-device association for a device
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object|null>} Active association or null
 */
export const getActiveCompanyDeviceAssociation = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    const response = await client.graphql({
      query: queries.companyDevicesByDeviceIMEIAndAssociationDate,
      variables: {
        deviceIMEI: deviceImei,
        filter: {
          isActive: { eq: true }
        }
      }
    });
    
    const associations = response.data?.companyDevicesByDeviceIMEIAndAssociationDate?.items || [];
    return associations.length > 0 ? associations[0] : null;
  } catch (error) {
    console.error('Error getting active company device association:', error);
    throw error;
  }
};

/**
 * Get devices associated with a company
 * @param {string} companyId - Company ID
 * @param {boolean} activeOnly - Whether to return only active associations
 * @returns {Promise<Array>} Array of company device associations
 */
export const getDevicesByCompany = async (companyId, activeOnly = true) => {
  await waitForAmplifyConfig();
  
  try {
    const filter = activeOnly ? { isActive: { eq: true } } : {};
    
    const response = await client.graphql({
      query: queries.companyDevicesByCompanyIDAndAssociationDate,
      variables: {
        companyID: companyId,
        filter: filter
      }
    });
    
    return response.data?.companyDevicesByCompanyIDAndAssociationDate?.items || [];
  } catch (error) {
    console.error('Error getting devices by company:', error);
    throw error;
  }
};

/**
 * Get company device association history for a device
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Array>} Array of all associations for the device
 */
export const getCompanyDeviceHistory = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    const response = await client.graphql({
      query: queries.companyDevicesByDeviceIMEIAndAssociationDate,
      variables: {
        deviceIMEI: deviceImei
      }
    });
    
    return response.data?.companyDevicesByDeviceIMEIAndAssociationDate?.items || [];
  } catch (error) {
    console.error('Error getting company device history:', error);
    throw error;
  }
};

/**
 * Transfer a device between companies
 * @param {string} deviceImei - Device IMEI
 * @param {string} fromCompanyId - Source company ID
 * @param {string} toCompanyId - Target company ID
 * @returns {Promise<Object>} Transfer result
 */
export const transferDeviceBetweenCompanies = async (deviceImei, fromCompanyId, toCompanyId) => {
  await waitForAmplifyConfig();
  
  console.log('=== TRANSFERRING DEVICE BETWEEN COMPANIES ===');
  console.log('Device IMEI:', deviceImei);
  console.log('From Company:', fromCompanyId);
  console.log('To Company:', toCompanyId);
  
  try {
    // Dissociate from current company
    await dissociateDeviceFromCompany(deviceImei, fromCompanyId);
    
    // Associate with new company
    const association = await associateDeviceToCompany(deviceImei, toCompanyId);
    
    console.log('Device transfer successful');
    
    return { success: true, newAssociation: association.companyDevice };
  } catch (error) {
    console.error('Error transferring device between companies:', error);
    throw error;
  }
};

/**
 * Get device status information (company and vehicle associations)
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Device status information
 */
export const getDeviceStatusInfo = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    // Get company association
    const companyAssociation = await getActiveCompanyDeviceAssociation(deviceImei);
    
    // Get device info to check vehicle association
    const deviceResponse = await client.graphql({
      query: queries.getDevice,
      variables: { imei: deviceImei }
    });
    
    const device = deviceResponse.data?.getDevice;
    
    return {
      deviceImei,
      companyAssociation,
      vehicleAssociation: device?.deviceVehicleImmat || null,
      vehicle: device?.vehicle || null,
      status: determineDeviceStatus(companyAssociation, device?.deviceVehicleImmat)
    };
  } catch (error) {
    console.error('Error getting device status info:', error);
    throw error;
  }
};

/**
 * Get unassigned devices (devices not associated with any company OR vehicle)
 * @returns {Promise<Array>} Array of unassigned devices
 */
export const getUnassignedDevices = async () => {
  await waitForAmplifyConfig();
  
  try {
    console.log('=== GETTING UNASSIGNED DEVICES ===');
    
    // Get all devices
    const devicesResponse = await client.graphql({
      query: queries.listDevices
    });
    
    const allDevices = devicesResponse.data?.listDevices?.items || [];
    console.log('Total devices found:', allDevices.length);
    
    // Get all active company device associations
    const associationsResponse = await client.graphql({
      query: queries.listCompanyDevices,
      variables: {
        filter: {
          isActive: { eq: true }
        }
      }
    });
    
    const activeAssociations = associationsResponse.data?.listCompanyDevices?.items || [];
    const companyAssociatedImeis = new Set(activeAssociations.map(assoc => assoc.deviceIMEI));
    console.log('Company associated devices:', Array.from(companyAssociatedImeis));
    
    // Get all vehicles to check for vehicleDeviceImei associations
    const vehiclesResponse = await client.graphql({
      query: queries.listVehicles
    });
    
    const allVehicles = vehiclesResponse.data?.listVehicles?.items || [];
    const vehicleAssociatedImeis = new Set(
      allVehicles
        .map(v => v.vehicleDeviceImei)
        .filter(Boolean)
    );
    console.log('Vehicle associated devices:', Array.from(vehicleAssociatedImeis));
    
    // Filter out devices that are associated with companies OR vehicles
    const unassignedDevices = allDevices.filter(device => 
      !companyAssociatedImeis.has(device.imei) && !vehicleAssociatedImeis.has(device.imei)
    );
    
    console.log('Total devices:', allDevices.length);
    console.log('Company associated:', companyAssociatedImeis.size);
    console.log('Vehicle associated:', vehicleAssociatedImeis.size);
    console.log('Unassigned devices found:', unassignedDevices.length);
    console.log('Unassigned device IMEIs:', unassignedDevices.map(d => d.imei));
    
    return unassignedDevices;
  } catch (error) {
    console.error('Error getting unassigned devices:', error);
    throw error;
  }
};

/**
 * Determine device status based on associations
 * @param {Object|null} companyAssociation - Company association object
 * @param {string|null} vehicleImmat - Vehicle immatriculation
 * @returns {string} Device status
 */
export const determineDeviceStatus = (companyAssociation, vehicleImmat) => {
  if (!companyAssociation || !companyAssociation.isActive) {
    return 'Libre';
  }
  
  if (vehicleImmat) {
    return 'Associé véhicule';
  }
  
  return 'Réservé client';
};