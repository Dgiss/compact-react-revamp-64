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
    setLoading(true);
    setError(null);
    
    try {
      const companyVehicles = await CompanyVehicleDeviceService.fetchVehiclesByCompany(companyId);
      return companyVehicles;
    } catch (err) {
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
    try {
      return await CompanyVehicleDeviceService.fetchCompaniesForSelect();
    } catch (err) {
      toast({
        title: "Erreur",
        description: `Erreur lors du chargement des entreprises: ${err.message}`,
        variant: "destructive",
      });
      return [];
    }
  }, []);

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
    
    // Actions
    loadAllData,
    searchDevices,
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