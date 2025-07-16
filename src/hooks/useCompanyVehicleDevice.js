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

  // localStorage utilities
  const saveToLocalStorage = (data) => {
    try {
      const cacheData = {
        ...data,
        timestamp: Date.now()
      };
      localStorage.setItem('fleetwatch_vehicle_cache', JSON.stringify(cacheData));
      console.log('Data saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const cached = localStorage.getItem('fleetwatch_vehicle_cache');
      if (!cached) return null;
      
      const data = JSON.parse(cached);
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (now - data.timestamp > thirtyMinutes) {
        console.log('Cache expired, removing from localStorage');
        localStorage.removeItem('fleetwatch_vehicle_cache');
        return null;
      }
      
      console.log('Valid cache found in localStorage');
      return data;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      localStorage.removeItem('fleetwatch_vehicle_cache');
      return null;
    }
  };
  
  const refreshDataInBackground = async () => {
    try {
      console.log('Refreshing data in background...');
      const result = await CompanyVehicleDeviceService.fetchCompaniesWithVehiclesAndDevices();
      
      // Update cache
      setAllDataCache(result);
      saveToLocalStorage(result);
      
      // Update state silently
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      
      console.log('Background refresh completed');
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  };

  // Load all data - SIMPLIFIED for API calls only when needed
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('=== LOADING ALL DATA FROM API ===');
      
      const result = await CompanyVehicleDeviceService.fetchCompaniesWithVehiclesAndDevices();
      
      console.log('=== DATA LOADED SUCCESSFULLY ===');
      console.log('Companies count:', result.companies?.length || 0);
      console.log('Combined data count:', result.vehicles?.length || 0);
      
      // Update state
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      
      // Cache for client-side filtering
      setAllDataCache(result);
      setIsCacheReady(true);
      
      // Save to localStorage
      saveToLocalStorage(result);
      
      // Update free devices
      const freeDevicesCount = (result.vehicles || []).filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      setFreeDevices(freeDevicesCount);
      
      // Update stats
      const vehicleCount = (result.vehicles || []).filter(item => item.type === "vehicle").length;
      const associatedDeviceCount = (result.vehicles || []).filter(item => 
        item.type === "device" && item.isAssociated
      ).length;
      
      setStats({
        vehicleCount,
        associatedDeviceCount,
        freeDeviceCount: freeDevicesCount
      });
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'An error occurred');
      // Reset states on error
      setCompanies([]);
      setDevices([]);
      setAllDataCache(null);
      setIsCacheReady(false);
      setFreeDevices(0);
      setStats({});
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

  // Get vehicles for specific company - SIMPLIFIED logic
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
      
      console.log('Raw company vehicles found:', companyVehicles.length);
      
      // Filter for vehicles WITHOUT an associated device (simplified logic)
      const availableVehicles = companyVehicles.filter(vehicle => {
        // Check ONLY vehicleDeviceImei field for simplicity
        const hasDeviceImei = vehicle.vehicleDeviceImei && vehicle.vehicleDeviceImei !== "";
        
        console.log(`Vehicle ${vehicle.immat || vehicle.immatriculation}: hasDeviceImei=${hasDeviceImei}, available=${!hasDeviceImei}`);
        
        return !hasDeviceImei; // Available if no device IMEI
      });
      
      console.log('Available vehicles for association:', availableVehicles.length);
      
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

  // SIMPLIFIED: Initialize cache from localStorage IMMEDIATELY on mount
  useEffect(() => {
    console.log('=== INITIALIZING CACHE FROM LOCALSTORAGE ===');
    const cachedData = loadFromLocalStorage();
    
    if (cachedData) {
      console.log('Found cached data in localStorage, initializing IMMEDIATELY');
      setAllDataCache(cachedData);
      setCompanies(cachedData.companies || []);
      setDevices(cachedData.vehicles || []);
      setIsCacheReady(true); // Set cache ready IMMEDIATELY
      
      // Update derived state
      const freeDevicesCount = (cachedData.vehicles || []).filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      setFreeDevices(freeDevicesCount);
      
      const vehicleCount = (cachedData.vehicles || []).filter(item => item.type === "vehicle").length;
      const associatedDeviceCount = (cachedData.vehicles || []).filter(item => 
        item.type === "device" && item.isAssociated
      ).length;
      
      setStats({
        vehicleCount,
        associatedDeviceCount,
        freeDeviceCount: freeDevicesCount
      });
      
      console.log('Cache initialized successfully - CACHE IS READY:', {
        companiesCount: cachedData.companies?.length || 0,
        vehiclesCount: vehicleCount,
        devicesCount: freeDevicesCount + associatedDeviceCount,
        isCacheReady: true
      });
      
      // Schedule background refresh (non-blocking)
      setTimeout(() => {
        refreshDataInBackground();
      }, 2000);
    } else {
      console.log('No cached data found, will need to load data from API');
      setIsCacheReady(false);
    }
  }, []); // Empty dependency array - run only once on mount

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
    
    // Cache status
    allDataCache,
    
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