import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for managing data refresh after operations
 */
export const useDataRefresh = (loadAllData, setDevices, searchDevices, currentFilters) => {
  
  const refreshAfterAssociation = useCallback(async (message = "Association réussie", updatedItem = null) => {
    try {
      // Show success message
      toast({
        title: "Succès",
        description: message,
      });
      
      // Optimized refresh: update only modified item instead of reloading all data
      console.log('🔄 Optimized refresh after association...');
      console.log('🔄 Updated item received:', updatedItem);
      console.log('🔄 Current filters:', currentFilters);
      
      if (updatedItem) {
        // Update only the specific item in local state
        console.log('🔄 Updating specific item in local state:', updatedItem);
        setDevices(prevDevices => {
          console.log('🔄 Previous devices count:', prevDevices.length);
          const updatedDevices = [...prevDevices];
          const index = updatedDevices.findIndex(item => 
            (item.imei && item.imei === updatedItem.imei) || 
            (item.immat && item.immat === updatedItem.immat) ||
            (item.immatriculation && item.immatriculation === updatedItem.immat)
          );
          console.log('🔄 Found item index to update:', index);
          
          if (index !== -1) {
            const currentItem = updatedDevices[index];
            console.log('🔄 Current item before update:', currentItem);
            
            // Check if we're in a "vehicles without IMEI" search and the vehicle now has an IMEI
            const wasVehicleWithoutImei = currentItem.type === 'vehicle' && (!currentItem.imei || currentItem.imei === '');
            const nowHasImei = updatedItem.vehicleDeviceImei || updatedItem.imei;
            
            if (wasVehicleWithoutImei && nowHasImei) {
              // Remove the vehicle from the list since it no longer matches "vehicles without IMEI"
              console.log('🔄 Removing vehicle from "vehicles without IMEI" list since it now has an IMEI');
              updatedDevices.splice(index, 1);
            } else {
              // Update the item normally
              updatedDevices[index] = { ...currentItem, ...updatedItem };
              console.log('🔄 Updated item in array:', updatedDevices[index]);
            }
          } else {
            console.log('🔄 Item not found in current list');
          }
          
          console.log('🔄 New devices count:', updatedDevices.length);
          return updatedDevices;
        });
        console.log('🔄 Local state updated successfully - avoiding full data reload');
      } else {
        // Fallback: refresh data based on current state (only when necessary)
        console.log('🔄 No updated item provided, doing full refresh...');
        if (currentFilters && Object.keys(currentFilters).length > 0) {
          console.log('🔄 Refreshing with current filters:', currentFilters);
          const refreshedResults = await searchDevices(currentFilters);
          setDevices(refreshedResults);
        } else {
          // Last resort: reload all data (avoid this when possible)
          console.log('🔄 Fallback: reloading all data...');
          await loadAllData();
        }
      }
      
      console.log('🔄 Optimized refresh completed successfully');
      
    } catch (error) {
      console.error('🔄 Error refreshing data:', error);
      toast({
        title: "Attention",
        description: "Association réussie, mais la liste pourrait ne pas être à jour. Veuillez actualiser manuellement.",
        variant: "destructive"
      });
    }
  }, [loadAllData, setDevices, searchDevices, currentFilters]);
  
  const refreshAfterDissociation = useCallback(async (message = "Dissociation réussie") => {
    return refreshAfterAssociation(message);
  }, [refreshAfterAssociation]);
  
  const refreshAfterDeletion = useCallback(async (message = "Suppression réussie") => {
    return refreshAfterAssociation(message);
  }, [refreshAfterAssociation]);
  
  return {
    refreshAfterAssociation,
    refreshAfterDissociation,
    refreshAfterDeletion
  };
};
