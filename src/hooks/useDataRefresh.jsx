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
      console.log('Optimized refresh after association...');
      
      if (updatedItem) {
        // Update only the specific item in local state
        console.log('Updating specific item in local state:', updatedItem);
        setDevices(prevDevices => {
          const updatedDevices = [...prevDevices];
          const index = updatedDevices.findIndex(item => 
            item.imei === updatedItem.imei || item.immat === updatedItem.immat
          );
          if (index !== -1) {
            updatedDevices[index] = { ...updatedDevices[index], ...updatedItem };
          }
          return updatedDevices;
        });
        console.log('Local state updated successfully - avoiding full data reload');
      } else {
        // Fallback: refresh data based on current state (only when necessary)
        if (currentFilters && Object.keys(currentFilters).length > 0) {
          console.log('Refreshing with current filters:', currentFilters);
          const refreshedResults = await searchDevices(currentFilters);
          setDevices(refreshedResults);
        } else {
          // Last resort: reload all data (avoid this when possible)
          console.log('Fallback: reloading all data...');
          await loadAllData();
        }
      }
      
      console.log('Optimized refresh completed successfully');
      
    } catch (error) {
      console.error('Error refreshing data:', error);
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
