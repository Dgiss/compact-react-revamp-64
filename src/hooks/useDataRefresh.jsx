import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for managing data refresh after operations
 */
export const useDataRefresh = (loadAllData, setDevices, searchDevices, currentFilters) => {
  
  const refreshAfterAssociation = useCallback(async (message = "Association réussie") => {
    try {
      // Show success message
      toast({
        title: "Succès",
        description: message,
      });
      
      // Immediately refresh data for better user experience
      console.log('Refreshing data after association...');
      
      // Refresh data based on current state
      if (currentFilters && Object.keys(currentFilters).length > 0) {
        // If there are active filters, refresh search results
        console.log('Refreshing with current filters:', currentFilters);
        const refreshedResults = await searchDevices(currentFilters);
        setDevices(refreshedResults);
      } else {
        // Otherwise, reload all data
        console.log('Reloading all data...');
        await loadAllData();
      }
      
      console.log('Data refresh completed successfully');
      
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
