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
      
      // Wait a moment for backend consistency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refresh data
      if (currentFilters && Object.keys(currentFilters).length > 0) {
        // If there are active filters, refresh search results
        const refreshedResults = await searchDevices(currentFilters);
        setDevices(refreshedResults);
      } else {
        // Otherwise, reload all data
        await loadAllData();
      }
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: "Attention",
        description: "Données mises à jour, mais la liste pourrait ne pas être à jour. Veuillez actualiser manuellement.",
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
