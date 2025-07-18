
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

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
