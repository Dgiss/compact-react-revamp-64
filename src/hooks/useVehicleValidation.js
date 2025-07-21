
import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import { withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

/**
 * Custom hook for vehicle validation
 */
export const useVehicleValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(null);

  /**
   * Check if a vehicle with the given immatriculation already exists
   * @param {string} immat - Vehicle immatriculation to check
   * @returns {Promise<{exists: boolean, vehicle?: Object}>}
   */
  const checkImmatriculation = useCallback(async (immat) => {
    if (!immat || immat.trim() === '') {
      return { exists: false };
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      // Clean and normalize immatriculation
      const cleanImmat = immat.trim().toUpperCase();
      
      const result = await withCredentialRetry(async () => {
        return await client.graphql({
          query: queries.getVehicle,
          variables: { immat: cleanImmat }
        });
      });

      const vehicle = result.data.getVehicle;
      return { 
        exists: !!vehicle, 
        vehicle: vehicle 
      };
    } catch (error) {
      // If error is "not found", vehicle doesn't exist
      if (error.message && error.message.includes('not found')) {
        return { exists: false };
      }
      
      console.error('Error checking immatriculation:', error);
      setValidationError('Erreur lors de la vérification de l\'immatriculation');
      return { exists: false };
    } finally {
      setIsValidating(false);
    }
  }, []);

  /**
   * Validate and clean immatriculation format
   * @param {string} immat - Raw immatriculation
   * @returns {Object} Validation result
   */
  const validateImmatFormat = useCallback((immat) => {
    if (!immat || immat.trim() === '') {
      return { isValid: false, error: 'L\'immatriculation est obligatoire' };
    }

    const cleanImmat = immat.trim().toUpperCase();
    
    // Basic validation - at least 2 characters
    if (cleanImmat.length < 2) {
      return { isValid: false, error: 'L\'immatriculation doit contenir au moins 2 caractères' };
    }

    // Check for valid characters (letters, numbers, hyphens)
    const validPattern = /^[A-Z0-9-]+$/;
    if (!validPattern.test(cleanImmat)) {
      return { isValid: false, error: 'L\'immatriculation contient des caractères non valides' };
    }

    return { isValid: true, cleanImmat };
  }, []);

  const clearValidationError = useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    isValidating,
    validationError,
    checkImmatriculation,
    validateImmatFormat,
    clearValidationError
  };
};

export default useVehicleValidation;
