import { useState, useCallback } from 'react';
import { associateDeviceToVehicle } from '@/services/DeviceAssociationService';
import { toast } from '@/hooks/use-toast';

/**
 * Custom hook for managing vehicle-device association
 * Provides consistent state management and error handling
 */
export const useVehicleAssociation = () => {
  const [isAssociating, setIsAssociating] = useState(false);
  const [associationError, setAssociationError] = useState(null);

  const performAssociation = useCallback(async (deviceImei, vehicleImmat) => {
    setIsAssociating(true);
    setAssociationError(null);

    try {

      // Validate inputs
      if (!deviceImei || !vehicleImmat) {
        throw new Error('IMEI et immatriculation sont requis');
      }

      // Perform association using the corrected service
      const result = await associateDeviceToVehicle(deviceImei, vehicleImmat);

      if (result.success) {
        toast({
          title: "Association réussie",
          description: `Boîtier ${deviceImei} associé au véhicule ${vehicleImmat}`,
        });
        
        // Force a small delay to ensure backend consistency before refresh
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return simplified data to avoid serialization issues
        const cleanData = {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei,
          isAssociated: true,
          type: 'vehicle'
        };
        
        return { success: true, data: cleanData, needsRefresh: true };
      } else {
        throw new Error('Association failed');
      }
    } catch (error) {
      
      setAssociationError(error.message);
      
      toast({
        title: "Erreur d'association",
        description: error.message || "Erreur lors de l'association",
        variant: "destructive",
      });
      
      return { success: false, error: error.message };
    } finally {
      setIsAssociating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setAssociationError(null);
  }, []);

  return {
    isAssociating,
    associationError,
    performAssociation,
    clearError
  };
};

export default useVehicleAssociation;