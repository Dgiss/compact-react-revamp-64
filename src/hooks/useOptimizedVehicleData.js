import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCompaniesWithVehicles, invalidateCache } from '../services/VehicleService';
import { toast } from '@/components/ui/use-toast';

const QUERY_KEY = ['vehicles-companies'];
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const useOptimizedVehicleData = () => {
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchCompaniesWithVehicles,
    staleTime: STALE_TIME,
    cacheTime: STALE_TIME * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    onError: (error) => {
      toast({
        title: "Erreur de chargement",
        description: `Erreur lors du chargement des données: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Invalidate cache and refetch
  const invalidateAndRefetch = () => {
    invalidateCache();
    queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    return refetch();
  };

  // Search functions with client-side filtering for better performance
  const searchByImei = (imei) => {
    if (!data?.vehicles) return [];
    return data.vehicles.filter(vehicle => 
      vehicle.imei?.toLowerCase().includes(imei.toLowerCase())
    );
  };

  const searchBySim = (sim) => {
    if (!data?.vehicles) return [];
    return data.vehicles.filter(vehicle => 
      vehicle.telephone?.toLowerCase().includes(sim.toLowerCase())
    );
  };

  const searchByCompany = (company) => {
    if (!data?.vehicles) return [];
    return data.vehicles.filter(vehicle => 
      vehicle.entreprise?.toLowerCase().includes(company.toLowerCase())
    );
  };

  const searchByVehicle = (vehicle) => {
    if (!data?.vehicles) return [];
    return data.vehicles.filter(v => 
      v.immatriculation?.toLowerCase().includes(vehicle.toLowerCase()) ||
      v.nomVehicule?.toLowerCase().includes(vehicle.toLowerCase())
    );
  };

  return {
    // Data
    companies: data?.companies || [],
    vehicles: data?.vehicles || [],
    
    // State
    isLoading,
    error,
    
    // Actions
    refetch: invalidateAndRefetch,
    searchByImei,
    searchBySim,
    searchByCompany,
    searchByVehicle,
    
    // Utils
    totalVehicles: data?.vehicles?.length || 0,
    totalCompanies: data?.companies?.length || 0
  };
};