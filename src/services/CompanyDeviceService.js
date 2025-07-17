import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { cleanDataForGraphQL } from '@/lib/utils';

const client = generateClient();

/**
 * Associate a device to a company (logical association for reserving devices)
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
    // Check if association already exists
    const existingAssociation = await getCompanyDeviceAssociation(deviceImei);
    if (existingAssociation && existingAssociation.isActive) {
      throw new Error(`Device ${deviceImei} is already associated with company ${existingAssociation.company?.name}`);
    }
    
    const associationData = {
      companyID: companyId,
      deviceIMEI: deviceImei,
      associationDate: new Date().toISOString(),
      isActive: true
    };
    
    const result = await client.graphql({
      query: mutations.createCompanyDevice,
      variables: {
        input: associationData
      }
    });
    
    console.log('Device-Company association created successfully:', result.data?.createCompanyDevice);
    
    return { 
      success: true, 
      association: result.data?.createCompanyDevice,
      status: 'reserved' // Device is now reserved for the company
    };
  } catch (error) {
    console.error('Error associating device to company:', error);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};

/**
 * Dissociate a device from a company (logical dissociation)
 * @param {string} deviceImei - Device IMEI
 * @param {string} companyId - Company ID (optional for validation)
 * @returns {Promise<Object>} Dissociation result
 */
export const dissociateDeviceFromCompany = async (deviceImei, companyId = null) => {
  await waitForAmplifyConfig();
  
  console.log('=== DISSOCIATING DEVICE FROM COMPANY ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Company ID:', companyId);
  
  try {
    // Find the active association
    const association = await getCompanyDeviceAssociation(deviceImei);
    if (!association || !association.isActive) {
      throw new Error(`No active association found for device ${deviceImei}`);
    }
    
    // Optional validation: check if company matches
    if (companyId && association.companyID !== companyId) {
      throw new Error(`Device ${deviceImei} is not associated with the specified company`);
    }
    
    // Logical dissociation: set isActive to false and add dissociationDate
    const updateData = {
      id: association.id,
      isActive: false,
      dissociationDate: new Date().toISOString()
    };
    
    const result = await client.graphql({
      query: mutations.updateCompanyDevice,
      variables: {
        input: updateData
      }
    });
    
    console.log('Device-Company dissociation successful:', result.data?.updateCompanyDevice);
    
    return { 
      success: true, 
      association: result.data?.updateCompanyDevice,
      status: 'free' // Device is now free
    };
  } catch (error) {
    console.error('Error dissociating device from company:', error);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};

/**
 * Get company-device association for a specific device
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object|null>} Association data or null
 */
export const getCompanyDeviceAssociation = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    const result = await client.graphql({
      query: queries.companyDevicesByDeviceIMEIAndAssociationDate,
      variables: {
        deviceIMEI: deviceImei,
        filter: {
          isActive: { eq: true }
        },
        limit: 1
      }
    });
    
    const associations = result.data?.companyDevicesByDeviceIMEIAndAssociationDate?.items || [];
    return associations.length > 0 ? associations[0] : null;
  } catch (error) {
    console.error('Error getting company device association:', error);
    return null;
  }
};

/**
 * Get all devices associated with a company
 * @param {string} companyId - Company ID
 * @param {boolean} activeOnly - Only return active associations
 * @returns {Promise<Array>} Array of devices
 */
export const getDevicesByCompany = async (companyId, activeOnly = true) => {
  await waitForAmplifyConfig();
  
  try {
    const filter = activeOnly ? { isActive: { eq: true } } : {};
    
    const result = await client.graphql({
      query: queries.companyDevicesByCompanyIDAndAssociationDate,
      variables: {
        companyID: companyId,
        filter,
        limit: 1000
      }
    });
    
    const associations = result.data?.companyDevicesByCompanyIDAndAssociationDate?.items || [];
    
    // Return devices with their association status
    return associations.map(association => ({
      ...association.device,
      associationData: {
        id: association.id,
        associationDate: association.associationDate,
        dissociationDate: association.dissociationDate,
        isActive: association.isActive
      },
      status: getDeviceStatus(association)
    }));
  } catch (error) {
    console.error('Error getting devices by company:', error);
    throw error;
  }
};

/**
 * Get devices that are not associated with any company (truly free devices)
 * @returns {Promise<Array>} Array of free devices
 */
export const getUnassignedDevices = async () => {
  await waitForAmplifyConfig();
  
  try {
    // Get all devices
    const { fetchAllDevices } = await import('./DeviceService.js');
    const allDevices = await fetchAllDevices();
    
    // Get all active associations
    const result = await client.graphql({
      query: queries.listCompanyDevices,
      variables: {
        filter: {
          isActive: { eq: true }
        },
        limit: 10000
      }
    });
    
    const activeAssociations = result.data?.listCompanyDevices?.items || [];
    const associatedDeviceImeis = new Set(activeAssociations.map(a => a.deviceIMEI));
    
    // Filter devices that are not in any active association
    const unassignedDevices = allDevices.filter(device => 
      !associatedDeviceImeis.has(device.imei)
    );
    
    return unassignedDevices.map(device => ({
      ...device,
      status: 'free',
      associationData: null
    }));
  } catch (error) {
    console.error('Error getting unassigned devices:', error);
    throw error;
  }
};

/**
 * Get historical associations for a device
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Array>} Array of historical associations
 */
export const getCompanyDeviceHistory = async (deviceImei) => {
  await waitForAmplifyConfig();
  
  try {
    const result = await client.graphql({
      query: queries.companyDevicesByDeviceIMEIAndAssociationDate,
      variables: {
        deviceIMEI: deviceImei,
        sortDirection: 'DESC', // Most recent first
        limit: 100
      }
    });
    
    return result.data?.companyDevicesByDeviceIMEIAndAssociationDate?.items || [];
  } catch (error) {
    console.error('Error getting company device history:', error);
    throw error;
  }
};

/**
 * Transfer device from one company to another
 * @param {string} deviceImei - Device IMEI
 * @param {string} fromCompanyId - Source company ID
 * @param {string} toCompanyId - Target company ID
 * @returns {Promise<Object>} Transfer result
 */
export const transferDeviceBetweenCompanies = async (deviceImei, fromCompanyId, toCompanyId) => {
  await waitForAmplifyConfig();
  
  try {
    // First dissociate from the current company
    await dissociateDeviceFromCompany(deviceImei, fromCompanyId);
    
    // Then associate with the new company
    const result = await associateDeviceToCompany(deviceImei, toCompanyId);
    
    return {
      success: true,
      message: `Device ${deviceImei} transferred successfully`,
      newAssociation: result.association
    };
  } catch (error) {
    console.error('Error transferring device between companies:', error);
    throw error;
  }
};

/**
 * Helper function to determine device status based on association and vehicle data
 * @param {Object} association - CompanyDevice association
 * @returns {string} Device status
 */
const getDeviceStatus = (association) => {
  if (!association.isActive) {
    return 'dissociated';
  }
  
  // Check if device is also associated with a vehicle
  if (association.device?.vehicle?.immat) {
    return 'vehicle_associated';
  }
  
  return 'company_reserved';
};

/**
 * Get device status with company and vehicle information
 * @param {string} deviceImei - Device IMEI
 * @returns {Promise<Object>} Device status information
 */
export const getDeviceStatusInfo = async (deviceImei) => {
  try {
    // Get company association
    const companyAssociation = await getCompanyDeviceAssociation(deviceImei);
    
    // Get device info from DeviceService
    const { fetchAllDevices } = await import('./DeviceService.js');
    const allDevices = await fetchAllDevices();
    const device = allDevices.find(d => d.imei === deviceImei);
    
    if (!device) {
      return { found: false, message: 'Device not found' };
    }
    
    let status = 'free';
    let statusInfo = {};
    
    if (companyAssociation && companyAssociation.isActive) {
      status = 'company_reserved';
      statusInfo.company = companyAssociation.company;
      statusInfo.associationDate = companyAssociation.associationDate;
      
      // Check if also associated with vehicle
      if (device.vehicle?.immat) {
        status = 'vehicle_associated';
        statusInfo.vehicle = device.vehicle;
      }
    }
    
    return {
      found: true,
      device,
      status,
      statusInfo,
      companyAssociation
    };
  } catch (error) {
    console.error('Error getting device status info:', error);
    return { found: false, message: 'Error retrieving device status' };
  }
};