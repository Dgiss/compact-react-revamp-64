
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Check if vehicle exists by immatriculation
 * @param {string} immat - Vehicle immatriculation
 * @returns {Promise<boolean>} True if vehicle exists
 */
export const checkVehicleExists = async (immat) => {
  return await withCredentialRetry(async () => {
    try {
      const result = await client.graphql({
        query: queries.getVehicle,
        variables: { immat: immat }
      });
      
      return !!result.data.getVehicle;
    } catch (error) {
      // If error (vehicle not found), vehicle doesn't exist
      console.log('Vehicle does not exist:', immat);
      return false;
    }
  });
};

/**
 * Create vehicle with simple logic using direct mutation
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created vehicle
 */
export const createVehicleSimple = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    console.log('=== CREATING VEHICLE SIMPLE ===');
    console.log('Vehicle data:', vehicleData);
    
    // Validate required fields
    if (!vehicleData.immatriculation && !vehicleData.immat) {
      throw new Error('Immatriculation is required');
    }
    
    if (!vehicleData.companyVehiclesId) {
      throw new Error('Company ID is required');
    }
    
    // Map form data to GraphQL schema
    const vehicleInput = {
      immat: vehicleData.immatriculation || vehicleData.immat,
      companyVehiclesId: vehicleData.companyVehiclesId,
      code: vehicleData.code,
      nomVehicule: vehicleData.nomVehicule,
      kilometerage: vehicleData.kilometrage ? parseInt(vehicleData.kilometrage) : undefined,
      locations: vehicleData.emplacement,
      marque: vehicleData.marque,
      modele_id: vehicleData.modele,
      energie: vehicleData.energie,
      couleur: vehicleData.couleur,
      dateMiseEnCirculation: vehicleData.dateMiseEnCirculation,
      VIN: vehicleData.VIN,
      AWN_nom_commercial: vehicleData.AWN_nom_commercial,
      puissanceFiscale: vehicleData.puissanceFiscale ? parseInt(vehicleData.puissanceFiscale) : undefined,
      lastModificationDate: new Date().toISOString(),
      vehicleDeviceImei: vehicleData.vehicleDeviceImei || vehicleData.imei
    };
    
    // Remove undefined values
    Object.keys(vehicleInput).forEach(key => {
      if (vehicleInput[key] === undefined || vehicleInput[key] === '') {
        delete vehicleInput[key];
      }
    });
    
    console.log('Creating vehicle with input:', vehicleInput);
    
    const result = await client.graphql({
      query: mutations.createVehicle,
      variables: { input: vehicleInput }
    });
    
    console.log('Vehicle created:', result.data.createVehicle);
    return result.data.createVehicle;
  });
};

/**
 * Update vehicle with simple logic using direct mutation
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Updated vehicle
 */
export const updateVehicleSimple = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    console.log('=== UPDATING VEHICLE SIMPLE ===');
    console.log('Vehicle data:', vehicleData);
    
    const immat = vehicleData.immatriculation || vehicleData.immat;
    if (!immat) {
      throw new Error('Immatriculation is required for update');
    }
    
    // Check if vehicle exists first
    const vehicleExists = await checkVehicleExists(immat);
    if (!vehicleExists) {
      console.log('Vehicle does not exist, creating instead of updating');
      return await createVehicleSimple(vehicleData);
    }
    
    // Map form data to GraphQL schema
    const vehicleInput = {
      immat: immat,
      companyVehiclesId: vehicleData.companyVehiclesId,
      code: vehicleData.code,
      nomVehicule: vehicleData.nomVehicule,
      kilometerage: vehicleData.kilometrage ? parseInt(vehicleData.kilometrage) : undefined,
      locations: vehicleData.emplacement,
      marque: vehicleData.marque,
      modele_id: vehicleData.modele,
      energie: vehicleData.energie,
      couleur: vehicleData.couleur,
      dateMiseEnCirculation: vehicleData.dateMiseEnCirculation,
      VIN: vehicleData.VIN,
      AWN_nom_commercial: vehicleData.AWN_nom_commercial,
      puissanceFiscale: vehicleData.puissanceFiscale ? parseInt(vehicleData.puissanceFiscale) : undefined,
      lastModificationDate: new Date().toISOString(),
      vehicleDeviceImei: vehicleData.vehicleDeviceImei || vehicleData.imei
    };
    
    // Remove undefined values
    Object.keys(vehicleInput).forEach(key => {
      if (vehicleInput[key] === undefined) {
        delete vehicleInput[key];
      }
    });
    
    console.log('Updating vehicle with input:', vehicleInput);
    
    const result = await client.graphql({
      query: mutations.updateVehicle,
      variables: { input: vehicleInput }
    });
    
    console.log('Vehicle updated:', result.data.updateVehicle);
    return result.data.updateVehicle;
  });
};

/**
 * Create or update vehicle with automatic detection
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created or updated vehicle
 */
export const createOrUpdateVehicleSimple = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    console.log('=== CREATE OR UPDATE VEHICLE SIMPLE ===');
    console.log('Vehicle data:', vehicleData);
    
    const immat = vehicleData.immatriculation || vehicleData.immat;
    if (!immat) {
      throw new Error('Immatriculation is required');
    }
    
    // Check if vehicle exists
    const vehicleExists = await checkVehicleExists(immat);
    
    if (vehicleExists) {
      console.log('Vehicle exists, updating...');
      return await updateVehicleSimple(vehicleData);
    } else {
      console.log('Vehicle does not exist, creating...');
      return await createVehicleSimple(vehicleData);
    }
  });
};
