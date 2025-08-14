import { useState, useEffect, useCallback, useRef } from 'react';
import * as CompanyVehicleDeviceService from '@/services/CompanyVehicleDeviceService';
import * as VehicleService from '@/services/VehicleService.js';
import { toast } from '@/hooks/use-toast';

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
  const [companiesReady, setCompaniesReady] = useState(false);
  
  // Loading mode states
  const [loadingMode, setLoadingMode] = useState('initial'); // 'initial', 'search', 'complete', 'optimized', 'scan'
  const [quickStats, setQuickStats] = useState(null);
  const [scanMetrics, setScanMetrics] = useState(null);

  // Performance guards
  const loadingRef = useRef(false);
  const lastLoadRef = useRef(0);

  // AUTO-LOAD companies on mount with debounce
  useEffect(() => {
    let isMounted = true;
    
    const loadInitialCompanies = async () => {
      if (!isMounted) return;
      
      try {
        console.log('useCompanyVehicleDevice: Auto-loading companies...');
        const loadedCompanies = await CompanyVehicleDeviceService.fetchCompaniesForSelect();
        
        if (isMounted) {
          console.log('Initial companies loaded:', loadedCompanies.length);
          setCompanies(loadedCompanies);
          setCompaniesReady(true);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error auto-loading companies:', error);
          setCompanies([]);
          setCompaniesReady(false);
        }
      }
    };
    
    // Debounce to prevent multiple simultaneous calls
    const timeoutId = setTimeout(loadInitialCompanies, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // localStorage utilities with better error handling
  const saveToLocalStorage = (data) => {
    try {
      // CRITICAL FIX: Reduce cache size to prevent QuotaExceededError
      const compactData = {
        companies: (data.companies || []).map(c => ({
          id: c.id,
          name: c.name,
          siret: c.siret
        })),
        vehicles: (data.vehicles || []).map(v => ({
          id: v.id,
          immat: v.immat || v.immatriculation,
          type: v.type,
          marque: v.marque,
          modele: v.modele,
          companyVehiclesId: v.companyVehiclesId,
          entreprise: v.entreprise,
          // FIXED: Use actual GraphQL relation - device.imei instead of vehicleDeviceImei
          deviceImei: v.device?.imei || null,
          isAssociated: !!v.device?.imei
        })),
        timestamp: Date.now()
      };
      
      // Check size before saving
      const dataStr = JSON.stringify(compactData);
      const sizeInMB = (dataStr.length * 2) / (1024 * 1024); // Rough estimate
      
      if (sizeInMB > 4) { // Limit to 4MB
        console.warn('Cache data too large, using compact version');
        const ultraCompactData = {
          companies: compactData.companies.slice(0, 50),
          vehicles: compactData.vehicles.slice(0, 200),
          timestamp: Date.now()
        };
        localStorage.setItem('fleetwatch_vehicle_cache', JSON.stringify(ultraCompactData));
      } else {
        localStorage.setItem('fleetwatch_vehicle_cache', dataStr);
      }
      
      console.log('Data saved to localStorage (size:', sizeInMB.toFixed(2), 'MB)');
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded, clearing cache');
        localStorage.removeItem('fleetwatch_vehicle_cache');
        // Try saving minimal data only
        try {
          const minimalData = {
            companies: (data.companies || []).slice(0, 10).map(c => ({ id: c.id, name: c.name })),
            vehicles: (data.vehicles || []).slice(0, 50).map(v => ({ 
              immat: v.immat || v.immatriculation, 
              type: v.type,
              deviceImei: v.device?.imei || null
            })),
            timestamp: Date.now()
          };
          localStorage.setItem('fleetwatch_vehicle_cache', JSON.stringify(minimalData));
          console.log('Saved minimal cache after quota error');
        } catch (fallbackError) {
          console.error('Failed to save even minimal cache:', fallbackError);
        }
      } else {
        console.error('Error saving to localStorage:', error);
      }
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
      const result = await VehicleService.fetchCompaniesWithVehicles();
      
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

  /**
   * COMPLETE SCAN of Vehicle table - exhaustive loading without limits
   * For debugging and ensuring all vehicles are displayed
   */
  const loadCompleteVehicleScan = useCallback(async () => {
    // Prevent concurrent loading
    if (loadingRef.current) {
      console.log('⏹️ Scan already in progress, skipping...');
      return;
    }
    
    loadingRef.current = true;
    setLoadingMode('scan');
    setLoading(true);
    setError(null);
    setScanMetrics(null);
    
    try {
      console.log('🔍 === COMPLETE VEHICLE SCAN STARTED ===');
      
      const startTime = Date.now();
      
      // Use the new complete scan service method
      console.log('🔍 Using exhaustive scan with unlimited pagination...');
      const result = await VehicleService.scanCompaniesWithVehicles();
      
      const loadTime = result.loadTime || (Date.now() - startTime);
      console.log(`🎯 === COMPLETE SCAN COMPLETED IN ${loadTime}ms ===`);
      console.log('📊 Scan Results:', {
        companies: result.companies?.length || 0,
        totalItems: result.vehicles?.length || 0,
        vehicleCount: result.stats?.vehicleCount || 0,
        freeDeviceCount: result.stats?.freeDeviceCount || 0,
        scanMetrics: result.scanMetrics
      });
      
      // Store scan metrics for debugging
      setScanMetrics(result.scanMetrics);
      
      // Update state with complete data
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      
      // Cache complete scan results
      setAllDataCache(result);
      setIsCacheReady(true);
      
      // Save complete scan to localStorage in background
      setTimeout(() => {
        try {
          saveToLocalStorage(result);
        } catch (cacheError) {
          console.warn('Complete scan cache save failed:', cacheError);
        }
      }, 0);
      
      // Calculate comprehensive stats
      const vehicles = result.vehicles || [];
      const vehicleCount = result.stats?.vehicleCount || vehicles.filter(item => item.type === "vehicle").length;
      const freeDevicesCount = result.stats?.freeDeviceCount || vehicles.filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      const associatedDeviceCount = vehicles.filter(item => 
        item.type === "device" && item.isAssociated
      ).length;
      
      setFreeDevices(freeDevicesCount);
      setStats({
        vehicleCount,
        associatedDeviceCount,
        freeDeviceCount: freeDevicesCount,
        totalItems: vehicles.length,
        loadTime,
        isCompleteScan: true,
        scanMetrics: result.scanMetrics
      });
      
      // Success notification with scan details
      const loadTimeSeconds = (loadTime / 1000).toFixed(1);
      const batchCount = result.scanMetrics?.batchCount || 0;
      toast({
        title: "🔍 Scan complet terminé",
        description: `${vehicleCount} véhicules, ${freeDevicesCount} boîtiers libres (${batchCount} batches, ${loadTimeSeconds}s)`,
      });
      
    } catch (err) {
      console.error('❌ Complete vehicle scan error:', err);
      setError(err.message || 'Erreur lors du scan complet');
      setScanMetrics(null);
      
      // Try to recover with cached data
      const cachedData = loadFromLocalStorage();
      if (cachedData) {
        console.log('🔄 Recovering with cached data after scan failure...');
        setCompanies(cachedData.companies || []);
        setDevices(cachedData.vehicles || []);
        setAllDataCache(cachedData);
        setIsCacheReady(true);
        
        toast({
          title: "⚠️ Scan échoué - Cache utilisé",
          description: "Utilisation des données en cache après échec du scan",
          variant: "destructive"
        });
      } else {
        // Complete failure - reset states
        setCompanies([]);
        setDevices([]);
        setAllDataCache(null);
        setIsCacheReady(false);
        setFreeDevices(0);
        setStats({});
        
        toast({
          title: "❌ Échec du scan complet",
          description: `Erreur: ${err.message}`,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  /**
   * ULTRA-FAST DATA LOADING (<20s) with enriched ListVehicles
   * Uses massive parallel pagination and intelligent caching
   */
  const loadAllDataUltraFast = useCallback(async (mode = 'ultra-fast') => {
    // Prevent concurrent loading
    if (loadingRef.current) {
      console.log('⏹️ Loading already in progress, skipping...');
      return;
    }
    
    loadingRef.current = true;
    setLoadingMode(mode);
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🚀 === ULTRA-FAST LOADING STARTED (${mode.toUpperCase()}) ===`);
      
      const startTime = Date.now();
      let result;
      
      // Use the new ultra-fast service method
      console.log('🔥 Using ultra-fast enriched loading with massive parallel pagination...');
      result = await VehicleService.fetchCompaniesWithVehiclesUltraFast();
      
      const loadTime = result.loadTime || (Date.now() - startTime);
      console.log(`🎯 === ULTRA-FAST LOADING COMPLETED IN ${loadTime}ms ===`);
      console.log('📊 Results:', {
        companies: result.companies?.length || 0,
        totalItems: result.vehicles?.length || 0,
        vehicleCount: result.stats?.vehicleCount || 0,
        freeDeviceCount: result.stats?.freeDeviceCount || 0
      });
      
      // Validate we got data under 20 seconds
      if (loadTime > 20000) {
        console.warn(`⚠️ Loading exceeded 20s limit: ${loadTime}ms`);
      }
      
      // Update state efficiently
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      
      // Cache for client-side filtering
      setAllDataCache(result);
      setIsCacheReady(true);
      
      // Save to localStorage in background (non-blocking)
      setTimeout(() => {
        try {
          saveToLocalStorage(result);
        } catch (cacheError) {
          console.warn('Cache save failed:', cacheError);
        }
      }, 0);
      
      // Calculate stats from result or compute them
      const vehicles = result.vehicles || [];
      const vehicleCount = result.stats?.vehicleCount || vehicles.filter(item => item.type === "vehicle").length;
      const freeDevicesCount = result.stats?.freeDeviceCount || vehicles.filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      const associatedDeviceCount = vehicles.filter(item => 
        item.type === "device" && item.isAssociated
      ).length;
      
      setFreeDevices(freeDevicesCount);
      setStats({
        vehicleCount,
        associatedDeviceCount,
        freeDeviceCount: freeDevicesCount,
        totalItems: vehicles.length,
        loadTime
      });
      
      // Success notification
      const loadTimeSeconds = (loadTime / 1000).toFixed(1);
      toast({
        title: "✅ Chargement ultra-rapide terminé",
        description: `${vehicleCount} véhicules, ${freeDevicesCount} boîtiers libres en ${loadTimeSeconds}s`,
      });
      
    } catch (err) {
      console.error('❌ Ultra-fast loading error:', err);
      setError(err.message || 'Une erreur est survenue');
      
      // Try to recover with cached data
      const cachedData = loadFromLocalStorage();
      if (cachedData) {
        console.log('🔄 Recovering with cached data...');
        setCompanies(cachedData.companies || []);
        setDevices(cachedData.vehicles || []);
        setAllDataCache(cachedData);
        setIsCacheReady(true);
        
        toast({
          title: "⚠️ Utilisation du cache",
          description: "Données récupérées du cache en cas d'erreur",
          variant: "destructive"
        });
      } else {
        // Complete failure - reset states
        setCompanies([]);
        setDevices([]);
        setAllDataCache(null);
        setIsCacheReady(false);
        setFreeDevices(0);
        setStats({});
        
        toast({
          title: "❌ Erreur de chargement",
          description: `Échec du chargement: ${err.message}`,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  // Keep original function as fallback
  const loadAllData = useCallback(async (mode = 'optimized') => {
    console.log('⚠️ Using fallback loadAllData, consider using loadAllDataUltraFast');
    
    // Route to ultra-fast by default
    if (mode === 'optimized' || mode === 'complete') {
      return await loadAllDataUltraFast('ultra-fast');
    }
    
    // Legacy implementation for specific cases
    setLoadingMode(mode);
    setLoading(true);
    setError(null);
    
    try {
      console.log(`=== LOADING ALL DATA (${mode.toUpperCase()}) - LEGACY ===`);
      
      const startTime = Date.now();
      let result;
      
      if (mode === 'complete') {
        result = await VehicleService.fetchCompaniesWithVehicles();
      } else {
        const [base, free] = await Promise.all([
          VehicleService.fetchAllVehiclesOptimized(),
          CompanyVehicleDeviceService.fetchDevicesWithoutVehicles()
        ]);
        result = {
          companies: base.companies || [],
          vehicles: [...(base.vehicles || []), ...(free || [])]
        };
      }
      
      const loadTime = Date.now() - startTime;
      console.log(`=== LEGACY DATA LOADED IN ${loadTime}ms ===`);
      
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      setAllDataCache(result);
      setIsCacheReady(true);
      
      setTimeout(() => saveToLocalStorage(result), 0);
      
      const vehicles = result.vehicles || [];
      const vehicleCount = vehicles.filter(item => item.type === "vehicle").length;
      const freeDevicesCount = vehicles.filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      
      setFreeDevices(freeDevicesCount);
      setStats({ vehicleCount, freeDeviceCount: freeDevicesCount });
      
      toast({
        title: "Données chargées (legacy)",
        description: `${vehicleCount} véhicules, ${freeDevicesCount} boîtiers libres (${loadTime}ms)`,
      });
      
    } catch (err) {
      console.error('Legacy loading error:', err);
      setError(err.message || 'An error occurred');
      setCompanies([]);
      setDevices([]);
      setAllDataCache(null);
      setIsCacheReady(false);
      setFreeDevices(0);
      setStats({});
      
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Search with filters - CLIENT-SIDE using cached data (OPTIMIZED)
  const searchDevices = useCallback(async (filters) => {
    if (!allDataCache || !isCacheReady) {
      console.log('Cache not ready for search, loading data...');
      await loadAllData();
      if (!allDataCache) return [];
    }
    
    try {
      // FIXED: Use vehicles array instead of devices for client-side filtering
      const results = CompanyVehicleDeviceService.filterDevicesLocal(allDataCache.vehicles, filters);
      
      console.log(`Search results for filters ${JSON.stringify(filters)}:`, results.length);
      
      return results;
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      return [];
    }
  }, [allDataCache, isCacheReady, loadAllData]);

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
      
      // FIXED: Filter for vehicles WITHOUT an associated device using GraphQL relations
      const availableVehicles = companyVehicles.filter(vehicle => {
        // Check device relation - use actual GraphQL schema
        const hasDevice = vehicle.device?.imei || vehicle.deviceImei;
        
        console.log(`Vehicle ${vehicle.immat || vehicle.immatriculation}: hasDevice=${!!hasDevice}, available=${!hasDevice}`);
        
        return !hasDevice; // Available if no device associated
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
      
      // FIXED: Add status indicator using actual GraphQL relations
      const vehiclesWithStatus = companyVehicles.map(vehicle => {
        const deviceImei = vehicle.device?.imei || vehicle.deviceImei;
        const isAssociated = !!deviceImei;
        
        return {
          ...vehicle,
          isAssociated,
          associatedDevice: deviceImei
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
      return CompanyVehicleDeviceService.getDeviceStatusLocal(allDataCache.vehicles, imei);
    } catch (err) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la vérification du device: ${err.message}`,
        variant: "destructive",
      });
      return { found: false, message: err.message };
    }
  }, [allDataCache, loadAllData]);

  // Load companies for select components - ALWAYS load companies
  const loadCompaniesForSelect = useCallback(async () => {
    try {
      // Try cached companies first
      if (allDataCache && allDataCache.companies && allDataCache.companies.length > 0) {
        console.log('Using cached companies:', allDataCache.companies.length);
        setCompanies(allDataCache.companies);
        return allDataCache.companies;
      }
      
      // If no cache, load directly from API
      console.log('No cached companies, fetching from API');
      const loadedCompanies = await CompanyVehicleDeviceService.fetchCompaniesForSelect();
      console.log('Companies loaded:', loadedCompanies.length);
      setCompanies(loadedCompanies);
      return loadedCompanies;
    } catch (err) {
      console.error('Error in loadCompaniesForSelect:', err);
      setCompanies([]);
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement des entreprises: ${err.message}`,
        variant: "destructive",
      });
      return [];
    }
  }, [allDataCache]);

  // Specific search functions for single criteria - CLIENT-SIDE using cached data
  const searchByImei = useCallback(async (imei) => {
    if (!allDataCache) {
      await loadAllData();
      return [];
    }
    
    try {
      // Normalize/sanitize IMEI input: accept separators and pick the first 15-digit token
      const raw = typeof imei === 'string' ? imei : String(imei);
      const tokens = raw
        .split(/[^0-9A-Za-z]+/)
        .map(t => t.trim())
        .filter(Boolean);
      // Prefer a 15-digit numeric token if present, else the first token
      const preferred = tokens.find(t => /^\d{15}$/.test(t)) || tokens[0] || raw.trim();
      const sanitizedImei = preferred;

      console.log(`🔍 Searching for IMEI: ${sanitizedImei} in cache with ${allDataCache.vehicles?.length || 0} items`);

      // First, search locally in the unified cache
      const localResults = CompanyVehicleDeviceService.filterByImeiLocal(allDataCache.vehicles, sanitizedImei);
      console.log(`🔍 Local search results:`, localResults);
      
      if (localResults.length > 0) {
        toast({
          title: "Recherche par IMEI",
          description: `${localResults.length} résultat(s) trouvé(s) (cache)`
        });
        return localResults;
      }

      // FIXED: If no local results and cache might be stale, try refreshing cache first
      console.log('🔍 No local results, checking if cache needs refresh...');
      const now = Date.now();
      const lastCacheUpdate = localStorage.getItem('companyVehicleDeviceData_timestamp');
      const cacheAge = lastCacheUpdate ? now - parseInt(lastCacheUpdate) : Infinity;
      
      // If cache is older than 5 minutes and no results, force refresh
      if (cacheAge > 300000) { // 5 minutes
        console.log('🔍 Cache is stale, forcing refresh before backend search...');
        await loadAllData();
        // Retry local search after refresh
        const refreshedResults = CompanyVehicleDeviceService.filterByImeiLocal(allDataCache.vehicles, sanitizedImei);
        if (refreshedResults.length > 0) {
          toast({
            title: "Recherche par IMEI",
            description: `${refreshedResults.length} résultat(s) trouvé(s) (cache rafraîchi)`
          });
          return refreshedResults;
        }
      }

      // Fallback to backend exact lookup with sanitized IMEI
      const { getGraphQLClient } = await import('@/config/aws-config.js');
      const { getDevice } = await import('../graphql/queries');
      const client = await getGraphQLClient();
      const response = await client.graphql({
        query: getDevice,
        variables: { imei: sanitizedImei }
      });
      const device = response.data?.getDevice;
      if (device) {
        const mapped = {
          id: device.imei,
          entreprise: device.vehicle ? "Associé" : "Boîtier libre",
          type: "device",
          immatriculation: device.vehicle?.immat || "",
          nomVehicule: device.vehicle?.nomVehicule || "",
          imei: device.imei,
          typeBoitier: device.protocolId?.toString() || "",
          marque: "",
          modele: "",
          kilometrage: "",
          telephone: device.sim || "",
          emplacement: "",
          deviceData: device,
          isAssociated: !!device.vehicle?.immat
        };
        toast({ title: "Recherche par IMEI", description: `1 résultat trouvé (backend)` });
        return [mapped];
      }

      toast({ title: "Recherche par IMEI", description: `0 résultat` });
      return [];
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la recherche par IMEI: ${err.message}`,
        variant: "destructive"
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
      const results = CompanyVehicleDeviceService.filterBySimLocal(allDataCache.vehicles, sim);
      
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
      // Use the existing filterByVehicleLocal function which already handles the unified format
      const results = CompanyVehicleDeviceService.filterByVehicleLocal(allDataCache.vehicles, vehicle);
      
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
        allDataCache.vehicles, 
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

  // OPTIMIZED: Get vehicles without devices (no cache needed)
  const getVehiclesWithoutDevices = useCallback(async () => {
    try {
      const vehicles = await CompanyVehicleDeviceService.fetchVehiclesWithoutDevices();
      
      toast({
        title: "Véhicules sans IMEI",
        description: `${vehicles.length} véhicule(s) sans boîtier trouvé(s)`,
      });
      
      return vehicles;
    } catch (err) {
      console.error('Error getting vehicles without devices:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la récupération des véhicules sans IMEI: ${err.message}`,
        variant: "destructive",
      });
      return [];
    }
  }, []);

  // OPTIMIZED: Get vehicles with empty IMEI with progressive loading
  const getVehiclesWithEmptyImei = useCallback(async (onProgressUpdate = null) => {
    try {
      console.log('=== HOOK: GETTING VEHICLES WITH EMPTY IMEI ===');
      const vehicles = await CompanyVehicleDeviceService.fetchVehiclesWithEmptyImei(onProgressUpdate);
      
      console.log('Hook: Vehicles with empty IMEI received:', vehicles.length);
      
      toast({
        title: "Véhicules sans IMEI",
        description: `${vehicles.length} véhicule(s) sans IMEI assigné trouvé(s)`,
      });
      
      return vehicles;
    } catch (err) {
      console.error('=== HOOK ERROR: Getting vehicles with empty IMEI ===');
      console.error('Hook error details:', err);
      console.error('Hook error message:', err.message);
      
      // Provide more specific error handling
      let errorMessage = 'Erreur lors de la récupération des véhicules sans IMEI';
      if (err.message && err.message !== 'undefined') {
        errorMessage += `: ${err.message}`;
      } else {
        errorMessage += ': Erreur inconnue, vérifiez la console pour plus de détails';
      }
      
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    }
  }, []);

  // OPTIMIZED: Get devices without vehicles (no cache needed)
  const getDevicesWithoutVehicles = useCallback(async () => {
    try {
      const devices = await CompanyVehicleDeviceService.fetchDevicesWithoutVehicles();
      
      toast({
        title: "Devices sans véhicules",
        description: `${devices.length} boîtier(s) libre(s) trouvé(s)`,
      });
      
      return devices;
    } catch (err) {
      console.error('Error getting devices without vehicles:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: `Erreur lors de la récupération des boîtiers libres: ${err.message}`,
        variant: "destructive",
      });
      return [];
    }
  }, []);

  // OPTIMIZED: Get stats for unassociated items
  const getUnassociatedItemsStats = useCallback(async () => {
    try {
      return await CompanyVehicleDeviceService.fetchUnassociatedItemsStats();
    } catch (err) {
      console.error('Error getting unassociated items stats:', err);
      setError(err.message);
      return {
        vehiclesWithoutDevicesCount: 0,
        devicesWithoutVehiclesCount: 0,
        totalVehicles: 0,
        totalDevices: 0
      };
    }
  }, []);

  // FIXED: Load basic statistics with proper error handling and fallback
  const loadQuickStats = useCallback(async () => {
    try {
      setLoading(true);
      
      // Use cached data as primary source for quick stats
      const cachedData = loadFromLocalStorage();
      if (cachedData && cachedData.companies && cachedData.vehicles) {
        const vehicleCount = (cachedData.vehicles || []).filter(item => item.type === "vehicle").length;
        const deviceCount = (cachedData.vehicles || []).filter(item => item.type === "device").length;
        
        setQuickStats({
          totalVehicles: vehicleCount,
          totalDevices: deviceCount
        });
        console.log('Quick stats loaded from cache:', { totalVehicles: vehicleCount, totalDevices: deviceCount });
        return;
      }
      
      // Fallback to simplified GraphQL queries with better error handling
      try {
        const { getGraphQLClient } = await import('@/config/aws-config.js');
        const { listCompanies } = await import('../graphql/queries');
        const client = await getGraphQLClient();
        
        // Simple count query that should work with the schema
        const companiesResult = await client.graphql({
          query: listCompanies,
          variables: { limit: 1 }
        });
        
        // Set basic stats
        setQuickStats({
          totalVehicles: 0, // Will be updated when data loads
          totalDevices: 0,  // Will be updated when data loads
          totalCompanies: companiesResult.data?.listCompanies?.items?.length || 0
        });
        
        console.log('Basic quick stats loaded');
      } catch (graphqlError) {
        console.warn('GraphQL quick stats failed, using minimal fallback:', graphqlError);
        // Use absolute minimal stats
        setQuickStats({
          totalVehicles: companies.length > 0 ? 0 : 0,
          totalDevices: companies.length > 0 ? 0 : 0
        });
      }
    } catch (error) {
      console.error('Error loading quick stats:', error);
      // Always provide some stats, even if empty
      setQuickStats({
        totalVehicles: 0,
        totalDevices: 0
      });
    } finally {
      setLoading(false);
    }
  }, [companies.length]);

  // MODIFIED: Initialize only cached data and quick stats on mount
  useEffect(() => {
    console.log('=== INITIALIZING ON-DEMAND LOADING MODE ===');
    const cachedData = loadFromLocalStorage();
    
    if (cachedData) {
      console.log('Found cached data - setting as available but not loading to state');
      setAllDataCache(cachedData);
      setIsCacheReady(true);
      // Don't load to state automatically anymore
    }
    
    // Load quick stats for dashboard
    loadQuickStats();
  }, [loadQuickStats]); // Include loadQuickStats in dependencies

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
    loadingMode,
    quickStats,
    scanMetrics,
    
    // Cache status
    allDataCache,
    
    // Actions
    loadAllData,
    loadAllDataUltraFast, // NEW: Ultra-fast loading function
    loadCompleteVehicleScan, // NEW: Complete exhaustive scan function
    loadQuickStats,
    setLoadingMode,
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
    
    // OPTIMIZED: New specialized functions for unassociated items
    getVehiclesWithoutDevices,
    getVehiclesWithEmptyImei,
    getDevicesWithoutVehicles,
    getUnassociatedItemsStats,
    
    // Utilities
    isFiltered: devices.length !== stats.totalDevices,
    totalResults: devices.length
  };
};

export default useCompanyVehicleDevice;
