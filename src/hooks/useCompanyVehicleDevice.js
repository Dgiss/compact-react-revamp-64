import { useState, useEffect, useCallback } from 'react';
import * as CompanyVehicleDeviceService from '@/services/CompanyVehicleDeviceService';
import { toast } from '@/components/ui/use-toast';

/**
 * Custom hook for managing company-vehicle-device data
 * Provides unified state management and loading states
 */
export const useCompanyVehicleDevice = () => {
  const [companies, setCompanies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [devices, setDevices] = useState([]);
  const [freeDevices, setFreeDevices] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all data
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await CompanyVehicleDeviceService.fetchCompaniesWithVehiclesAndDevices();
      setCompanies(data.companies);
      setVehicles(data.vehicles);
      setDevices(data.devices);
      setFreeDevices(data.freeDevices);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement des données: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Search with filters
  const searchDevices = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await CompanyVehicleDeviceService.searchDevicesAndVehicles(filters);
      setDevices(results);
      
      toast({
        title: "Recherche réussie",
        description: `${results.length} résultat(s) trouvé(s)`,
      });
      
      return results;
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get vehicles for specific company
  const getVehiclesByCompany = useCallback(async (companyId) => {
    console.log('=== LOADING VEHICLES FOR COMPANY ===', companyId);
    setLoading(true);
    setError(null);
    
    try {
      const companyVehicles = await CompanyVehicleDeviceService.fetchVehiclesByCompany(companyId);
      console.log('Vehicles found for company:', companyVehicles);
      
      // Filter for vehicles without an associated device (available for association)
      const availableVehicles = companyVehicles.filter(vehicle => 
        !vehicle.imei || vehicle.imei === "" || !vehicle.deviceData
      );
      
      console.log('Available vehicles (no device):', availableVehicles);
      return availableVehicles;
    } catch (err) {
      console.error('Error getting vehicles by company:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la récupération des véhicules: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get device status
  const getDeviceStatus = useCallback(async (imei) => {
    try {
      return await CompanyVehicleDeviceService.getDeviceStatus(imei);
    } catch (err) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la vérification du device: ${err.message}`,
        variant: "destructive",
      });
      return { found: false, message: err.message };
    }
  }, []);

  // Load companies for select components
  const loadCompaniesForSelect = useCallback(async () => {
    console.log('=== LOADING COMPANIES FOR SELECT ===');
    try {
      const loadedCompanies = await CompanyVehicleDeviceService.fetchCompaniesForSelect();
      console.log('Companies loaded for select:', loadedCompanies);
      setCompanies(loadedCompanies); // Update the state!
      return loadedCompanies;
    } catch (err) {
      console.error('Error in loadCompaniesForSelect:', err);
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement des entreprises: ${err.message}`,
        variant: "destructive",
      });
      return [];
    }
  }, []);

  // Specific search functions for single criteria
  const searchByImei = useCallback(async (imei) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await CompanyVehicleDeviceService.searchByImei(imei);
      setDevices(results);
      
      toast({
        title: "Recherche par IMEI",
        description: `${results.length} résultat(s) trouvé(s)`,
      });
      
      return results;
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche par IMEI: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchBySim = useCallback(async (sim) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await CompanyVehicleDeviceService.searchBySim(sim);
      setDevices(results);
      
      toast({
        title: "Recherche par SIM",
        description: `${results.length} résultat(s) trouvé(s)`,
      });
      
      return results;
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche par SIM: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByVehicle = useCallback(async (vehicle) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await CompanyVehicleDeviceService.searchByVehicle(vehicle);
      setDevices(results);
      
      toast({
        title: "Recherche par véhicule",
        description: `${results.length} résultat(s) trouvé(s)`,
      });
      
      return results;
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche par véhicule: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCompany = useCallback(async (company) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use cached data if available for better performance
      const cachedVehicles = devices.length > 0 ? devices : null;
      const cachedCompanies = companies.length > 0 ? companies : null;
      
      console.log('searchByCompany - using cached data:', !!cachedVehicles);
      console.log('searchByCompany - cached vehicles count:', cachedVehicles?.length || 0);
      console.log('searchByCompany - cached companies count:', cachedCompanies?.length || 0);
      
      const results = await CompanyVehicleDeviceService.searchByCompany(
        company, 
        cachedVehicles, 
        cachedCompanies
      );
      
      setDevices(results);
      
      if (results.length === 0) {
        toast({
          title: "Aucun résultat",
          description: `Aucune entreprise trouvée pour "${company}". Vérifiez l'orthographe ou consultez la console pour voir les entreprises disponibles.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Recherche par entreprise",
          description: `${results.length} résultat(s) trouvé(s) pour "${company}"`,
        });
      }
      
      return results;
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche par entreprise: ${err.message}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [devices, companies]);

  // Reset to empty state (no automatic loading)
  const resetFilters = useCallback(() => {
    setDevices([]);
    setCompanies([]);
    setVehicles([]);
    setFreeDevices([]);
    setStats({});
  }, []);

  return {
    // Data
    companies,
    vehicles,
    devices,
    freeDevices,
    stats,
    
    // State
    loading,
    error,
    
    // Actions
    loadAllData,
    searchDevices,
    searchByImei,
    searchBySim,
    searchByVehicle,
    searchByCompany,
    getVehiclesByCompany,
    getDeviceStatus,
    loadCompaniesForSelect,
    resetFilters,
    
    // Utilities
    isFiltered: devices.length !== stats.totalDevices,
    totalResults: devices.length
  };
};

export default useCompanyVehicleDevice;