import { useState, useEffect, useCallback, useRef } from 'react';
import * as CompanyVehicleDeviceService from '@/services/CompanyVehicleDeviceService';
import * as VehicleService from '@/services/VehicleService.js';
import { toast } from '@/hooks/use-toast';
import { setOptimizedCache, getOptimizedCache, getCacheStats } from '@/utils/optimized-cache-utils';
import { PerformanceTimer, createSearchIndex, processBatch } from '@/utils/performance-utils';

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
  const [loadingMode, setLoadingMode] = useState('initial'); // 'initial', 'search', 'complete', 'optimized'
  const [quickStats, setQuickStats] = useState(null);

  // Performance guards
  const loadingRef = useRef(false);
  const lastLoadRef = useRef(0);
  
  // Search indexes for ultra-fast lookups
  const searchIndexesRef = useRef({
    imei: new Map(),
    immat: new Map(),
    company: new Map(),
    sim: new Map()
  });

  // Build search indexes for ultra-fast searching
  const buildSearchIndexes = useCallback((vehicles) => {
    const timer = new PerformanceTimer();
    
    searchIndexesRef.current = {
      imei: createSearchIndex(vehicles, (item) => [
        item.imei || '',
        item.vehicleDeviceImei || ''
      ].filter(Boolean)),
      
      immat: createSearchIndex(vehicles, (item) => [
        item.immatriculation || ''
      ].filter(Boolean)),
      
      company: createSearchIndex(vehicles, (item) => [
        item.entreprise || ''
      ].filter(Boolean)),
      
      sim: createSearchIndex(vehicles, (item) => [
        item.telephone || ''
      ].filter(Boolean))
    };
    
    const metrics = timer.stop(vehicles.length);
    console.log(`🔍 Search indexes built in ${metrics.duration.toFixed(2)}ms for ${vehicles.length} items`);
  }, []);

  // Auto-load initial companies with debouncing
  useEffect(() => {
    let timeoutId;
    
    if (!companiesReady && !loading && !loadingRef.current) {
      timeoutId = setTimeout(async () => {
        try {
          setLoading(true);
          loadingRef.current = true;
          
          const companiesData = await CompanyVehicleDeviceService.fetchCompaniesForSelect();
          setCompanies(companiesData || []);
          setCompaniesReady(true);
          
          console.log(`✅ Initial companies loaded: ${companiesData?.length || 0}`);
        } catch (error) {
          console.error('Error loading initial companies:', error);
          setError(error.message);
        } finally {
          setLoading(false);
          loadingRef.current = false;
        }
      }, 100);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [companiesReady, loading]);

  // Save to localStorage with optimized compression
  const saveToLocalStorage = useCallback((data) => {
    try {
      const timer = new PerformanceTimer();
      
      // Compact data before saving - remove unnecessary fields
      const compactData = {
        companies: data.companies || [],
        vehicles: (data.vehicles || []).map(item => ({
          id: item.id,
          type: item.type,
          immatriculation: item.immatriculation,
          entreprise: item.entreprise,
          imei: item.imei,
          nomVehicule: item.nomVehicule,
          telephone: item.telephone,
          typeBoitier: item.typeBoitier,
          isAssociated: item.isAssociated,
          companyVehiclesId: item.companyVehiclesId,
          vehicleDeviceImei: item.vehicleDeviceImei,
          marque: item.marque,
          modele: item.modele,
          year: item.year,
          kilometrage: item.kilometrage,
          emplacement: item.emplacement,
          // Enhanced data
          fuelType: item.fuelType,
          consumption: item.consumption,
          maxSpeed: item.maxSpeed,
          seatCount: item.seatCount,
          tankCapacity: item.tankCapacity,
          co2: item.co2
        }))
      };
      
      const success = setOptimizedCache('companyVehicleDeviceData', compactData, 1800000);
      const metrics = timer.stop(compactData.vehicles.length);
      
      if (success) {
        const stats = getCacheStats();
        console.log(`💾 Data cached in ${metrics.duration.toFixed(2)}ms. Cache stats: ${stats.totalSize.toFixed(2)}MB, ${stats.entryCount} entries, ${stats.compressedCount} compressed`);
      }
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  }, []);

  // Load from localStorage with optimized cache
  const loadFromLocalStorage = useCallback(() => {
    try {
      const cached = getOptimizedCache('companyVehicleDeviceData', 1800000); // 30 minutes
      if (cached) {
        console.log('📦 Using optimized cached company-vehicle-device data');
        // Rebuild search indexes after loading from cache
        buildSearchIndexes(cached.vehicles || []);
        return cached;
      }
    } catch (error) {
      console.warn('Error loading from localStorage:', error);
    }
    return null;
  }, [buildSearchIndexes]);

  // Load all data - ULTRA-OPTIMIZED with enriched GraphQL query and parallel processing
  const loadAllData = useCallback(async (mode = 'optimized') => {
    setLoadingMode(mode);
    setLoading(true);
    setError(null);
    
    try {
      console.log(`=== ULTRA-OPTIMIZED LOADING (${mode.toUpperCase()}) ===`);
      
      const startTime = Date.now();
      const timer = new PerformanceTimer();
      let result;
      
      if (mode === 'complete') {
        // Complete dataset using enriched GraphQL query
        console.log('Using enriched complete query...');
        result = await VehicleService.fetchCompaniesWithVehicles();
      } else {
        // Optimized: enriched vehicles query + free devices merged with parallel processing
        console.log('Using ULTRA-optimized parallel query + free devices merge...');
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
      const metrics = timer.stop(result.vehicles?.length || 0);
      
      console.log(`=== ULTRA-OPTIMIZED DATA LOADED SUCCESSFULLY ===`);
      console.log(`⚡ Load time: ${loadTime}ms`);
      console.log(`📊 Processing rate: ${metrics.itemsPerSecond.toFixed(0)} items/sec`);
      console.log(`🏢 Companies: ${result.companies?.length || 0}`);
      console.log(`🚗 Vehicles: ${result.vehicles?.length || 0}`);
      
      // Update state efficiently with enriched data
      setCompanies(result.companies || []);
      setDevices(result.vehicles || []);
      
      // Cache enriched data for client-side filtering
      setAllDataCache(result);
      setIsCacheReady(true);
      
      // Build search indexes for ultra-fast searching
      buildSearchIndexes(result.vehicles || []);
      
      // Save enriched data to localStorage in background
      setTimeout(() => saveToLocalStorage(result), 0);
      
      // Calculate stats efficiently with enriched data
      const vehicles = result.vehicles || [];
      const vehicleCount = vehicles.filter(item => item.type === "vehicle").length;
      const associatedDeviceCount = vehicles.filter(item => 
        item.type === "device" && item.isAssociated
      ).length;
      const freeDevicesCount = vehicles.filter(item => 
        item.type === "device" && !item.isAssociated
      ).length;
      
      setFreeDevices(freeDevicesCount);
      setStats({
        vehicleCount,
        associatedDeviceCount,
        freeDeviceCount: freeDevicesCount
      });
      
      toast({
        title: "🚀 Données ultra-optimisées chargées",
        description: `${vehicleCount} véhicules, ${freeDevicesCount} boîtiers libres (${loadTime}ms)`,
      });
      
    } catch (err) {
      console.error('Error loading ultra-optimized data:', err);
      setError(err.message || 'An error occurred');
      // Reset states on error
      setCompanies([]);
      setDevices([]);
      setAllDataCache(null);
      setIsCacheReady(false);
      setFreeDevices(0);
      setStats({});
      
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement ultra-optimisé: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [buildSearchIndexes, saveToLocalStorage]);

  
  const searchDevices = useCallback(async (filters) => {
    if (!isCacheReady || !allDataCache?.vehicles) {
      console.log('Cache not ready, loading data first...');
      await loadAllData('optimized');
      return [];
    }

    const vehicles = allDataCache.vehicles;
    let results = vehicles;

    // Apply filters
    if (filters.entreprise && filters.entreprise !== 'all') {
      results = results.filter(item => 
        item.companyVehiclesId === filters.entreprise ||
        item.entreprise?.toLowerCase().includes(filters.entreprise.toLowerCase())
      );
    }

    if (filters.imei) {
      results = results.filter(item => 
        item.imei && item.imei.toLowerCase().includes(filters.imei.toLowerCase())
      );
    }

    if (filters.immatriculation) {
      results = results.filter(item => 
        item.immatriculation && item.immatriculation.toLowerCase().includes(filters.immatriculation.toLowerCase())
      );
    }

    if (filters.telephone) {
      results = results.filter(item => 
        item.telephone && item.telephone.toLowerCase().includes(filters.telephone.toLowerCase())
      );
    }

    if (filters.nomVehicule) {
      results = results.filter(item => 
        item.nomVehicule && item.nomVehicule.toLowerCase().includes(filters.nomVehicule.toLowerCase())
      );
    }

    console.log(`Filtered ${results.length} items from ${vehicles.length} total`);
    return results;
  }, [isCacheReady, allDataCache, loadAllData]);

  // Get vehicles by company - optimized version
  const getVehiclesByCompany = useCallback((companyId) => {
    if (!allDataCache?.vehicles || !companyId) return [];
    
    return allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && 
      item.companyVehiclesId === companyId &&
      !item.imei // Vehicles without devices
    );
  }, [allDataCache]);

  // Get all vehicles by company - optimized version
  const getAllVehiclesByCompany = useCallback((companyId) => {
    if (!allDataCache?.vehicles || !companyId) return [];
    
    return allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && 
      item.companyVehiclesId === companyId
    );
  }, [allDataCache]);

  // Check device status by IMEI - optimized with cache
  const getDeviceStatus = useCallback((imei) => {
    if (!allDataCache?.vehicles || !imei) return { status: 'unknown' };
    
    const device = allDataCache.vehicles.find(item => 
      (item.type === "device" || item.imei) && 
      item.imei === imei
    );
    
    if (!device) return { status: 'not_found' };
    
    return {
      status: device.isAssociated ? 'associated' : 'free',
      device: device
    };
  }, [allDataCache]);

  // Ultra-fast search by IMEI using search indexes
  const searchByImei = useCallback(async (imei) => {
    if (!imei?.trim()) return [];
    
    const cleanImei = imei.trim();
    const timer = new PerformanceTimer();
    
    // ULTRA-FAST: Search using pre-built indexes
    if (isCacheReady && searchIndexesRef.current.imei.size > 0) {
      const exactMatches = searchIndexesRef.current.imei.get(cleanImei.toLowerCase()) || [];
      
      if (exactMatches.length === 0) {
        // Fuzzy search in index
        const fuzzyMatches = [];
        searchIndexesRef.current.imei.forEach((items, key) => {
          if (key.includes(cleanImei.toLowerCase()) || cleanImei.toLowerCase().includes(key)) {
            fuzzyMatches.push(...items);
          }
        });
        
        if (fuzzyMatches.length > 0) {
          const metrics = timer.stop(fuzzyMatches.length);
          console.log(`🚀 Found ${fuzzyMatches.length} devices with fuzzy search in ${metrics.duration.toFixed(2)}ms`);
          return fuzzyMatches;
        }
      } else {
        const metrics = timer.stop(exactMatches.length);
        console.log(`🚀 Found ${exactMatches.length} devices with index search in ${metrics.duration.toFixed(2)}ms`);
        return exactMatches;
      }
    }
    
    // Fallback: try cache if indexes not ready
    if (isCacheReady && allDataCache?.vehicles) {
      const results = allDataCache.vehicles.filter(device => 
        device.imei && device.imei.toLowerCase().includes(cleanImei.toLowerCase())
      );
      
      if (results.length > 0) {
        const metrics = timer.stop(results.length);
        console.log(`Found ${results.length} devices in cache fallback in ${metrics.duration.toFixed(2)}ms`);
        return results;
      }
    }
    
    console.log('Cache search failed, trying backend strategies...');
    
    // Strategy 1: Quick device lookup
    try {
      const quickResults = await CompanyVehicleDeviceService.searchDeviceByImei(cleanImei);
      if (quickResults && quickResults.length > 0) {
        console.log(`Found ${quickResults.length} devices with quick search`);
        return quickResults;
      }
    } catch (error) {
      console.warn('Quick search failed:', error);
    }
    
    // Strategy 2: Full vehicle search as fallback
    try {
      const fullResults = await CompanyVehicleDeviceService.searchVehiclesByFilters({ imei: cleanImei });
      if (fullResults && fullResults.length > 0) {
        console.log(`Found ${fullResults.length} vehicles with full search`);
        return fullResults;
      }
    } catch (error) {
      console.warn('Full search failed:', error);
    }
    
    const metrics = timer.stop(0);
    console.log(`No results found for IMEI: ${cleanImei} (total time: ${metrics.duration.toFixed(2)}ms)`);
    return [];
  }, [isCacheReady, allDataCache]);

  
  // Search by SIM using cached data
  const searchBySim = useCallback((sim) => {
    if (!sim?.trim() || !allDataCache?.vehicles) return [];
    
    const cleanSim = sim.trim();
    return allDataCache.vehicles.filter(device => 
      device.telephone && device.telephone.toLowerCase().includes(cleanSim.toLowerCase())
    );
  }, [allDataCache]);

  // Search by vehicle using cached data
  const searchByVehicle = useCallback((vehicle) => {
    if (!vehicle?.trim() || !allDataCache?.vehicles) return [];
    
    const cleanVehicle = vehicle.trim().toLowerCase();
    return allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && (
        (item.immatriculation && item.immatriculation.toLowerCase().includes(cleanVehicle)) ||
        (item.nomVehicule && item.nomVehicule.toLowerCase().includes(cleanVehicle))
      )
    );
  }, [allDataCache]);

  // Search by company using cached data
  const searchByCompany = useCallback((company) => {
    if (!company?.trim() || !allDataCache?.vehicles) return [];
    
    const cleanCompany = company.trim().toLowerCase();
    return allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && 
      item.entreprise && 
      item.entreprise.toLowerCase().includes(cleanCompany)
    );
  }, [allDataCache]);

  // Get vehicles without devices - optimized
  const getVehiclesWithoutDevices = useCallback(async () => {
    if (!isCacheReady || !allDataCache?.vehicles) {
      console.log('Cache not ready, using backend service...');
      return await CompanyVehicleDeviceService.fetchVehiclesWithoutDevices();
    }
    
    return allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && !item.imei
    );
  }, [isCacheReady, allDataCache]);

  // Get vehicles with empty IMEI - optimized with progress
  const getVehiclesWithEmptyImei = useCallback(async (onProgressUpdate) => {
    if (!isCacheReady || !allDataCache?.vehicles) {
      console.log('Cache not ready, using backend service...');
      return await CompanyVehicleDeviceService.fetchVehiclesWithEmptyImei(onProgressUpdate);
    }
    
    const vehicles = allDataCache.vehicles.filter(item => 
      item.type === "vehicle" && (!item.imei || item.imei.trim() === "")
    );
    
    if (onProgressUpdate) {
      onProgressUpdate(vehicles.length);
    }
    
    return vehicles;
  }, [isCacheReady, allDataCache]);

  // Get devices without vehicles - optimized
  const getDevicesWithoutVehicles = useCallback(async () => {
    if (!isCacheReady || !allDataCache?.vehicles) {
      console.log('Cache not ready, using backend service...');
      return await CompanyVehicleDeviceService.fetchDevicesWithoutVehicles();
    }
    
    return allDataCache.vehicles.filter(item => 
      item.type === "device" && !item.isAssociated
    );
  }, [isCacheReady, allDataCache]);

  // Get unassociated items stats - optimized
  const getUnassociatedItemsStats = useCallback(async () => {
    if (!isCacheReady || !allDataCache?.vehicles) {
      console.log('Cache not ready, using backend service...');
      return await CompanyVehicleDeviceService.fetchUnassociatedItemsStats();
    }
    
    const vehicles = allDataCache.vehicles;
    const vehiclesWithoutDevices = vehicles.filter(item => 
      item.type === "vehicle" && !item.imei
    ).length;
    
    const devicesWithoutVehicles = vehicles.filter(item => 
      item.type === "device" && !item.isAssociated
    ).length;
    
    return {
      vehiclesWithoutDevices,
      devicesWithoutVehicles
    };
  }, [isCacheReady, allDataCache]);

  // Load quick stats with cache optimization
  const loadQuickStats = useCallback(async () => {
    if (quickStats) return quickStats;
    
    try {
      // Try cache first
      if (isCacheReady && allDataCache?.vehicles) {
        const vehicles = allDataCache.vehicles;
        const stats = {
          vehicleCount: vehicles.filter(item => item.type === "vehicle").length,
          deviceCount: vehicles.filter(item => item.type === "device").length,
          associatedCount: vehicles.filter(item => item.type === "device" && item.isAssociated).length,
          freeDeviceCount: vehicles.filter(item => item.type === "device" && !item.isAssociated).length
        };
        setQuickStats(stats);
        return stats;
      }
      
      // Fallback to backend
      const stats = await CompanyVehicleDeviceService.fetchQuickStats();
      setQuickStats(stats);
      return stats;
    } catch (error) {
      console.error('Error loading quick stats:', error);
      return {};
    }
  }, [quickStats, isCacheReady, allDataCache]);

  // Initialize hook with cached data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load cached data first
        const cached = loadFromLocalStorage();
        if (cached) {
          setCompanies(cached.companies || []);
          setDevices(cached.vehicles || []);
          setAllDataCache(cached);
          setIsCacheReady(true);
          
          // Calculate stats from cached data
          const vehicles = cached.vehicles || [];
          const vehicleCount = vehicles.filter(item => item.type === "vehicle").length;
          const freeDevicesCount = vehicles.filter(item => item.type === "device" && !item.isAssociated).length;
          setFreeDevices(freeDevicesCount);
          setStats({
            vehicleCount,
            freeDeviceCount: freeDevicesCount
          });
        }
        
        // Load quick stats
        await loadQuickStats();
      } catch (error) {
        console.warn('Error initializing cached data:', error);
      }
    };
    
    initializeData();
  }, [loadFromLocalStorage, loadQuickStats]);

  // Reset filters by reloading all data
  const resetFilters = useCallback(async () => {
    await loadAllData('optimized');
  }, [loadAllData]);

  return {
    // Data states
    companies,
    vehicles,
    devices,
    freeDevices,
    stats,
    quickStats,
    
    // Loading states
    loading,
    error,
    loadingMode,
    isCacheReady,
    companiesReady,
    
    // Actions
    loadAllData,
    loadQuickStats,
    setLoadingMode,
    searchDevices,
    getVehiclesByCompany,
    getAllVehiclesByCompany,
    getDeviceStatus,
    searchByImei,
    searchBySim,
    searchByVehicle,
    searchByCompany,
    getVehiclesWithoutDevices,
    getVehiclesWithEmptyImei,
    getDevicesWithoutVehicles,
    getUnassociatedItemsStats,
    resetFilters,
    
    // Computed properties
    isFiltered: loadingMode === 'search',
    totalResults: devices?.length || 0,
    
    // Cache status
    cacheReady: isCacheReady
  };
};
