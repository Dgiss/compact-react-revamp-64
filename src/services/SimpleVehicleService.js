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
 * Validate required fields for vehicle creation
 * @param {Object} vehicleData - Vehicle data to validate
 * @throws {Error} If required fields are missing
 */
const validateRequiredFields = (vehicleData) => {
  console.log('=== VALIDATING REQUIRED FIELDS ===');
  console.log('Vehicle data to validate:', vehicleData);
  
  const immat = vehicleData.immatriculation || vehicleData.immat;
  if (!immat) {
    throw new Error('Immatriculation is required');
  }
  
  if (!vehicleData.companyVehiclesId) {
    throw new Error('Company ID (companyVehiclesId) is required');
  }
  
  console.log('Required fields validation passed');
};

/**
 * Clean vehicle input data - preserve required fields even if empty
 * @param {Object} vehicleInput - Raw vehicle input
 * @returns {Object} Cleaned vehicle input
 */
const cleanVehicleInput = (vehicleInput) => {
  console.log('=== CLEANING VEHICLE INPUT ===');
  console.log('Raw input:', vehicleInput);
  
  const cleaned = { ...vehicleInput };
  
  // Required fields that should not be removed even if empty
  const requiredFields = ['immat', 'companyVehiclesId'];
  
  // Remove undefined values and empty strings, but preserve required fields
  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];
    
    if (requiredFields.includes(key)) {
      // Keep required fields even if empty, but convert empty string to meaningful value if needed
      if (value === '') {
        // For immat, empty string is not acceptable
        if (key === 'immat') {
          console.warn('Warning: immat is empty, this may cause issues');
        }
      }
    } else {
      // For non-required fields, remove undefined and empty values
      if (value === undefined || value === '' || value === null) {
        delete cleaned[key];
      }
    }
  });
  
  console.log('Cleaned input:', cleaned);
  return cleaned;
};

/**
 * Create vehicle with enhanced error handling
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created vehicle
 */
export const createVehicleSimple = async (vehicleData) => {
  console.log('=== CREATING VEHICLE SIMPLE (ENHANCED) ===');
  console.log('Vehicle data:', vehicleData);
  
  try {
    // Validate required fields first
    validateRequiredFields(vehicleData);
    
    // Map form data to GraphQL schema
    const vehicleInput = {
      immat: vehicleData.immatriculation || vehicleData.immat,
      companyVehiclesId: vehicleData.companyVehiclesId,
      code: vehicleData.code || null,
      nomVehicule: vehicleData.nomVehicule || null,
      kilometerage: vehicleData.kilometrage ? parseInt(vehicleData.kilometrage) : null,
      locations: vehicleData.emplacement || null,
      marque: vehicleData.marque || null,
      modele_id: vehicleData.modele || null,
      energie: vehicleData.energie || null,
      couleur: vehicleData.couleur || null,
      dateMiseEnCirculation: vehicleData.dateMiseEnCirculation || null,
      VIN: vehicleData.VIN || null,
      AWN_nom_commercial: vehicleData.AWN_nom_commercial || null,
      puissanceFiscale: vehicleData.puissanceFiscale ? parseInt(vehicleData.puissanceFiscale) : null,
      lastModificationDate: new Date().toISOString(),
      vehicleDeviceImei: vehicleData.vehicleDeviceImei || vehicleData.imei || null
    };
    
    // Clean the input
    const cleanedInput = cleanVehicleInput(vehicleInput);
    
    console.log('Calling createVehicle mutation with:', cleanedInput);
    
    const result = await withCredentialRetry(async () => {
      try {
        return await client.graphql({
          query: mutations.createVehicle,
          variables: { input: cleanedInput }
        });
      } catch (graphqlError) {
        console.error('=== GRAPHQL ERROR DETAILS ===');
        console.error('Full error object:', graphqlError);
        console.error('Error data:', graphqlError.data);
        console.error('Error errors:', graphqlError.errors);
        console.error('Error message:', graphqlError.message);
        
        if (graphqlError.errors) {
          graphqlError.errors.forEach((err, index) => {
            console.error(`Error ${index + 1}:`, {
              message: err.message,
              path: err.path,
              locations: err.locations,
              errorType: err.errorType
            });
          });
        }
        
        // Re-throw with more context
        throw new Error(`GraphQL createVehicle failed: ${graphqlError.message || 'Unknown error'}`);
      }
    });
    
    console.log('Vehicle created successfully:', result.data.createVehicle);
    return result.data.createVehicle;
    
  } catch (error) {
    console.error('=== CREATE VEHICLE ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('required')) {
      throw new Error(`Validation failed: ${error.message}`);
    } else if (error.message.includes('GraphQL')) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error(`Vehicle creation failed: ${error.message || 'Unknown error'}`);
    }
  }
};

/**
 * Update vehicle with enhanced error handling
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Updated vehicle
 */
export const updateVehicleSimple = async (vehicleData) => {
  console.log('=== UPDATING VEHICLE SIMPLE (ENHANCED) ===');
  console.log('Vehicle data:', vehicleData);
  
  try {
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
      code: vehicleData.code || null,
      nomVehicule: vehicleData.nomVehicule || null,
      kilometerage: vehicleData.kilometrage ? parseInt(vehicleData.kilometrage) : null,
      locations: vehicleData.emplacement || null,
      marque: vehicleData.marque || null,
      modele_id: vehicleData.modele || null,
      energie: vehicleData.energie || null,
      couleur: vehicleData.couleur || null,
      dateMiseEnCirculation: vehicleData.dateMiseEnCirculation || null,
      VIN: vehicleData.VIN || null,
      AWN_nom_commercial: vehicleData.AWN_nom_commercial || null,
      puissanceFiscale: vehicleData.puissanceFiscale ? parseInt(vehicleData.puissanceFiscale) : null,
      lastModificationDate: new Date().toISOString(),
      vehicleDeviceImei: vehicleData.vehicleDeviceImei || vehicleData.imei || null
    };
    
    // Clean the input but be more permissive for updates
    const cleanedInput = {};
    Object.keys(vehicleInput).forEach(key => {
      if (vehicleInput[key] !== undefined) {
        cleanedInput[key] = vehicleInput[key];
      }
    });
    
    console.log('Calling updateVehicle mutation with:', cleanedInput);
    
    const result = await withCredentialRetry(async () => {
      try {
        return await client.graphql({
          query: mutations.updateVehicle,
          variables: { input: cleanedInput }
        });
      } catch (graphqlError) {
        console.error('=== UPDATE GRAPHQL ERROR DETAILS ===');
        console.error('Full error object:', graphqlError);
        console.error('Error data:', graphqlError.data);
        console.error('Error errors:', graphqlError.errors);
        
        if (graphqlError.errors) {
          graphqlError.errors.forEach((err, index) => {
            console.error(`Update Error ${index + 1}:`, {
              message: err.message,
              path: err.path,
              errorType: err.errorType
            });
          });
        }
        
        throw new Error(`GraphQL updateVehicle failed: ${graphqlError.message || 'Unknown error'}`);
      }
    });
    
    console.log('Vehicle updated successfully:', result.data.updateVehicle);
    return result.data.updateVehicle;
    
  } catch (error) {
    console.error('=== UPDATE VEHICLE ERROR ===');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    throw new Error(`Vehicle update failed: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Create or update vehicle with automatic detection and enhanced error handling
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created or updated vehicle
 */
export const createOrUpdateVehicleSimple = async (vehicleData) => {
  console.log('=== CREATE OR UPDATE VEHICLE SIMPLE (ENHANCED) ===');
  console.log('Vehicle data:', vehicleData);
  
  try {
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
  } catch (error) {
    console.error('=== CREATE OR UPDATE VEHICLE ERROR ===');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
