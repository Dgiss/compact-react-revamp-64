import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CacheDebugPanelProps {
  onClearCache?: () => void;
  onForceRefresh?: () => void;
}

export const CacheDebugPanel: React.FC<CacheDebugPanelProps> = ({
  onClearCache,
  onForceRefresh
}) => {
  const { toast } = useToast();
  
  const getCacheInfo = () => {
    try {
      const cacheKey = 'companyVehicleDeviceData';
      const timestampKey = cacheKey + '_timestamp';
      
      const cacheData = localStorage.getItem(cacheKey);
      const timestamp = localStorage.getItem(timestampKey);
      
      if (!cacheData) {
        return { exists: false, size: 0, age: 0, items: 0 };
      }
      
      const data = JSON.parse(cacheData);
      const size = new Blob([cacheData]).size;
      const age = timestamp ? Date.now() - parseInt(timestamp) : 0;
      const items = data.vehicles?.length || 0;
      const devices = data.vehicles?.filter((v: any) => v.type === 'device').length || 0;
      const vehicles = data.vehicles?.filter((v: any) => v.type === 'vehicle').length || 0;
      
      return { 
        exists: true, 
        size, 
        age, 
        items, 
        devices, 
        vehicles,
        timestamp: timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'Unknown'
      };
    } catch (error) {
      console.error('Error reading cache info:', error);
      return { exists: false, size: 0, age: 0, items: 0 };
    }
  };

  const clearCache = () => {
    try {
      const cacheKey = 'companyVehicleDeviceData';
      const timestampKey = cacheKey + '_timestamp';
      
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(timestampKey);
      
      // Clear global reference
      if ((window as any).allDataCache) {
        (window as any).allDataCache = null;
      }
      
      toast({
        title: "Cache vidé",
        description: "Le cache local a été supprimé"
      });
      
      onClearCache?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de vider le cache",
        variant: "destructive"
      });
    }
  };

  const forceRefresh = () => {
    onForceRefresh?.();
    toast({
      title: "Actualisation forcée",
      description: "Rechargement complet des données..."
    });
  };

  const searchSpecificImei = () => {
    const imei = prompt("Entrez l'IMEI à rechercher pour debug:");
    if (!imei) return;
    
    const cache = getCacheInfo();
    if (!cache.exists) {
      toast({
        title: "Pas de cache",
        description: "Aucun cache trouvé",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const cacheData = JSON.parse(localStorage.getItem('companyVehicleDeviceData') || '{}');
      const found = cacheData.vehicles?.filter((v: any) => 
        v.imei && v.imei.toString().includes(imei)
      ) || [];
      
      console.log(`🔍 DEBUG: Found ${found.length} items for IMEI ${imei}:`, found);
      
      toast({
        title: `Debug IMEI ${imei}`,
        description: `${found.length} résultat(s) trouvé(s) - voir console`
      });
    } catch (error) {
      toast({
        title: "Erreur debug",
        description: "Erreur lors de la recherche debug",
        variant: "destructive"
      });
    }
  };

  const cacheInfo = getCacheInfo();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Cache Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Status:</span>
            <Badge variant={cacheInfo.exists ? "default" : "destructive"}>
              {cacheInfo.exists ? "Actif" : "Vide"}
            </Badge>
          </div>
          
          {cacheInfo.exists && (
            <>
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{cacheInfo.items}</span>
              </div>
              <div className="flex justify-between">
                <span>Devices:</span>
                <span>{cacheInfo.devices}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicles:</span>
                <span>{cacheInfo.vehicles}</span>
              </div>
              <div className="flex justify-between">
                <span>Taille:</span>
                <span>{Math.round(cacheInfo.size / 1024)}KB</span>
              </div>
              <div className="flex justify-between">
                <span>Âge:</span>
                <span>{Math.round(cacheInfo.age / 1000)}s</span>
              </div>
              <div className="text-xs text-gray-500">
                {cacheInfo.timestamp}
              </div>
            </>
          )}
        </div>
        
        <div className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={clearCache}
            className="w-full text-xs"
          >
            Vider Cache
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={forceRefresh}
            className="w-full text-xs"
          >
            Forcer Refresh
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={searchSpecificImei}
            className="w-full text-xs"
          >
            Debug IMEI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};