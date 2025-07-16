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
  
  // Cache for all data - single source of truth
  const [allDataCache, setAllDataCache] = useState(null);
  const [isCacheReady, setIsCacheReady] = useState(false);

  // Load all data - SINGLE API CALL
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Single call to fetch all data
      const data = await CompanyVehicleDeviceService.fetchCompaniesWithVehiclesAndDevices();
      
      // Cache all data for client-side operations
      setAllDataCache(data);
      setIsCacheReady(true);
      
      // Set state
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

  // Search with filters - CLIENT-SIDE using cached data
  const searchDevices = useCallback(async (filters) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      // Client-side filtering using cached data
      const results = CompanyVehicleDeviceService.filterDevicesLocal(allDataCache.devices, filters);
      
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
    }
  }, [allDataCache, loadAllData]);

  // Get vehicles for specific company - CLIENT-SIDE using cached data
  const getVehiclesByCompany = useCallback(async (companyId) => {
    if (!isCacheReady || !allDataCache) {
      console.log('Cache not ready for getVehiclesByCompany, cache ready:', isCacheReady);
      return [];
    }
    
    try {
      // Client-side filtering using cached data
      const companyVehicles = CompanyVehicleDeviceService.filterVehiclesByCompanyLocal(
        allDataCache.vehicles, 
        companyId, 
        allDataCache.companies
      );
      
      console.log('Raw company vehicles found:', companyVehicles);
      console.log('Company vehicles count:', companyVehicles.length);
      
      // Filter for vehicles without an associated device (available for association)
      const availableVehicles = companyVehicles.filter(vehicle => {
        const hasImei = vehicle.imei && vehicle.imei !== "";
        const hasDeviceImei = vehicle.vehicleDeviceImei && vehicle.vehicleDeviceImei !== "";
        const hasDeviceData = vehicle.deviceData && vehicle.deviceData.imei;
        
        console.log(`Vehicle ${vehicle.immat || vehicle.immatriculation}:`, {
          hasImei,
          hasDeviceImei, 
          hasDeviceData,
          available: !hasImei && !hasDeviceImei && !hasDeviceData
        });
        
        return !hasImei && !hasDeviceImei && !hasDeviceData;
      });
      
      console.log('Available vehicles for association:', availableVehicles);
      console.log('Available vehicles count:', availableVehicles.length);
      
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
    }
  }, [allDataCache, isCacheReady]);

  // Get ALL vehicles for specific company (including those with IMEI) - fallback function
  const getAllVehiclesByCompany = useCallback(async (companyId) => {
    if (!isCacheReady || !allDataCache) {
      console.log('Cache not ready for getAllVehiclesByCompany, cache ready:', isCacheReady);
      return [];
    }
    
    try {
      // Client-side filtering using cached data - returns ALL vehicles
      const companyVehicles = CompanyVehicleDeviceService.filterVehiclesByCompanyLocal(
        allDataCache.vehicles, 
        companyId, 
        allDataCache.companies
      );
      
      console.log('ALL company vehicles (including those with IMEI):', companyVehicles);
      
      // Add status indicator for each vehicle
      const vehiclesWithStatus = companyVehicles.map(vehicle => {
        const hasImei = vehicle.imei && vehicle.imei !== "";
        const hasDeviceImei = vehicle.vehicleDeviceImei && vehicle.vehicleDeviceImei !== "";
        const hasDeviceData = vehicle.deviceData && vehicle.deviceData.imei;
        const isAssociated = hasImei || hasDeviceImei || hasDeviceData;
        
        return {
          ...vehicle,
          isAssociated,
          associatedDevice: hasImei ? vehicle.imei : (hasDeviceImei ? vehicle.vehicleDeviceImei : (hasDeviceData ? vehicle.deviceData.imei : null))
        };
      });
      
      return vehiclesWithStatus;
    } catch (err) {
      console.error('Error getting all vehicles by company:', err);
      setError(err.message);
      return [];
    }
  }, [allDataCache, isCacheReady]);

  // Get device status - CLIENT-SIDE using cached data
  const getDeviceStatus = useCallback(async (imei) => {
    if (!allDataCache) {
      await loadAllData();
      return { found: false, message: 'No data available' };
    }
    
    try {
      return CompanyVehicleDeviceService.getDeviceStatusLocal(allDataCache.devices, imei);
    } catch (err) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la vérification du device: ${err.message}`,
        variant: "destructive",
      });
      return { found: false, message: err.message };
    }
  }, [allDataCache, loadAllData]);

  // Load companies for select components - use cached data ONLY
  const loadCompaniesForSelect = useCallback(async () => {
    if (isCacheReady && allDataCache && allDataCache.companies.length > 0) {
      // Use cached companies
      console.log('Using cached companies:', allDataCache.companies.length);
      return allDataCache.companies;
    }
    
    if (!isCacheReady) {
      console.log('Cache not ready, waiting for data to load...');
      // If cache is not ready, we should wait for the main data to load
      return [];
    }
    
    try {
      // Fallback to API call if no cache available
      console.log('No cached companies, fetching from API');
      const loadedCompanies = await CompanyVehicleDeviceService.fetchCompaniesForSelect();
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
  }, [allDataCache, isCacheReady]);

  // Specific search functions for single criteria - CLIENT-SIDE using cached data
  const searchByImei = useCallback(async (imei) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      const results = CompanyVehicleDeviceService.filterByImeiLocal(allDataCache.devices, imei);
      
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
    }
  }, [allDataCache, loadAllData]);

  const searchBySim = useCallback(async (sim) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      const results = CompanyVehicleDeviceService.filterBySimLocal(allDataCache.devices, sim);
      
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
    }
  }, [allDataCache, loadAllData]);

  const searchByVehicle = useCallback(async (vehicle) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      const results = CompanyVehicleDeviceService.filterByVehicleLocal(allDataCache.devices, vehicle);
      
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
    }
  }, [allDataCache, loadAllData]);

  const searchByCompany = useCallback(async (company) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      const results = CompanyVehicleDeviceService.filterByCompanyLocal(
        allDataCache.devices, 
        company, 
        allDataCache.companies
      );
      
      if (results.length === 0) {
        toast({
          title: "Aucun résultat",
          description: `Aucune entreprise trouvée pour "${company}". Vérifiez l'orthographe.`,
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
    }
  }, [allDataCache, loadAllData]);

  // Reset to show all data
  const resetFilters = useCallback(() => {
    loadAllData();
  }, [loadAllData]);

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
    isCacheReady,
    
    // Actions
    loadAllData,
    searchDevices,
    searchByImei,
    searchBySim,
    searchByVehicle,
    searchByCompany,
    getVehiclesByCompany,
    getAllVehiclesByCompany,
    getDeviceStatus,
    loadCompaniesForSelect,
    resetFilters,
    
    // Utilities
    isFiltered: devices.length !== stats.totalDevices,
    totalResults: devices.length
  };
};

export default useCompanyVehicleDevice;