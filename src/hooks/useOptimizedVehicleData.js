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
    gcTime: STALE_TIME * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    onError: (error) => {
      console.error('Query error:', error);
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
    if (!data?.vehicles || !imei) return [];
    const searchTerm = imei.toString().toLowerCase();
    return data.vehicles.filter(vehicle => 
      vehicle.imei?.toString().toLowerCase().includes(searchTerm)
    );
  };

  const searchBySim = (sim) => {
    if (!data?.vehicles || !sim) return [];
    const searchTerm = sim.toString().toLowerCase();
    return data.vehicles.filter(vehicle => 
      vehicle.telephone?.toString().toLowerCase().includes(searchTerm)
    );
  };

  const searchByCompany = (company) => {
    if (!data?.vehicles || !company) return [];
    const searchTerm = company.toString().toLowerCase();
    return data.vehicles.filter(vehicle => 
      vehicle.entreprise?.toString().toLowerCase().includes(searchTerm)
    );
  };

  const searchByVehicle = (vehicle) => {
    if (!data?.vehicles || !vehicle) return [];
    const searchTerm = vehicle.toString().toLowerCase();
    return data.vehicles.filter(v => 
      v.immatriculation?.toString().toLowerCase().includes(searchTerm) ||
      v.nomVehicule?.toString().toLowerCase().includes(searchTerm)
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