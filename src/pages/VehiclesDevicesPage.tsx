import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FileSpreadsheet, Search, Edit, Link, Car, Wifi, Upload, Database, ArrowLeft, Smartphone, Building, X, RefreshCw, Filter, SearchX, Zap, Clock } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddVehicleForm from "@/components/forms/AddVehicleForm";
import ImportDevicesForm from "@/components/forms/ImportDevicesForm";
import AssociateVehicleForm from "@/components/forms/AssociateVehicleForm";
import AddDeviceWithVehicleForm from "@/components/forms/AddDeviceWithVehicleForm";
import { toast } from "@/hooks/use-toast";
import { MultipleImeiSearchDialog } from "@/components/dialogs/MultipleImeiSearchDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice.jsx";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { DevicesBulkAssociation } from "@/components/tables/DevicesBulkAssociation";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import { createVehicleSimple, updateVehicleSimple } from "@/services/SimpleVehicleService";
import { dissociateVehicleFromDevice, deleteVehicleData } from "@/services/VehicleService";
import { associateDeviceToVehicle } from "@/services/DeviceAssociationService.js";
import { updateDeviceSimple } from "@/services/SimpleDeviceService.js";
import * as CompanyDeviceService from "@/services/CompanyDeviceService";
import { useDataRefresh } from "@/hooks/useDataRefresh";
import { clearOldCaches } from "@/utils/cache-utils";
import { CacheDebugPanel } from "@/components/debug/CacheDebugPanel";
import { ImeiDiagnosticPanel } from "@/components/debug/ImeiDiagnosticPanel";

// ============= OPTIMISATIONS RECHERCHE ULTRA-RAPIDE =============

// Classe d'indexation optimisée pour recherche instantanée
class SuperFastSearchIndex {
  constructor() {
    this.indexes = {
      imei: new Map(),
      immatriculation: new Map(), 
      entreprise: new Map(),
      telephone: new Map(),
      sim: new Map(),
      fulltext: new Map()
    };
    this.data = [];
    this.lastIndexTime = 0;
  }

  normalizeText(text) {
    if (!text) return "";
    return text.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]/g, ""); // Keep only alphanumeric
  }

  tokenize(text) {
    if (!text) return [];
    const normalized = this.normalizeText(text);
    const tokens = new Set();
    
    tokens.add(normalized);
    
    // Add substrings for partial matching (minimum 2 chars)
    for (let i = 0; i < normalized.length - 1; i++) {
      for (let j = i + 2; j <= normalized.length; j++) {
        tokens.add(normalized.substring(i, j));
      }
    }
    
    return Array.from(tokens);
  }

  buildIndex(data) {
    console.log(`🚀 Building super fast search index for ${data.length} items...`);
    const startTime = performance.now();
    
    Object.values(this.indexes).forEach(index => index.clear());
    this.data = data;

    data.forEach((item, idx) => {
      // Index IMEI
      if (item.imei) {
        const imeiTokens = this.tokenize(item.imei);
        imeiTokens.forEach(token => {
          if (!this.indexes.imei.has(token)) this.indexes.imei.set(token, []);
          this.indexes.imei.get(token).push(idx);
        });
      }

      // Index immatriculation  
      if (item.immatriculation || item.immat) {
        const immat = item.immatriculation || item.immat;
        const immatTokens = this.tokenize(immat);
        immatTokens.forEach(token => {
          if (!this.indexes.immatriculation.has(token)) this.indexes.immatriculation.set(token, []);
          this.indexes.immatriculation.get(token).push(idx);
        });
      }

      // Index entreprise
      if (item.entreprise) {
        const entrepriseTokens = this.tokenize(item.entreprise);
        entrepriseTokens.forEach(token => {
          if (!this.indexes.entreprise.has(token)) this.indexes.entreprise.set(token, []);
          this.indexes.entreprise.get(token).push(idx);
        });
      }

      // Index téléphone/SIM
      if (item.telephone || item.sim) {
        const tel = item.telephone || item.sim;
        const telTokens = this.tokenize(tel);
        telTokens.forEach(token => {
          if (!this.indexes.telephone.has(token)) this.indexes.telephone.set(token, []);
          this.indexes.telephone.get(token).push(idx);
          if (!this.indexes.sim.has(token)) this.indexes.sim.set(token, []);
          this.indexes.sim.get(token).push(idx);
        });
      }

      // Index full-text
      const fullText = [
        item.imei,
        item.immatriculation || item.immat,
        item.entreprise,
        item.telephone || item.sim,
        item.nomVehicule,
        item.marque,
        item.modele
      ].filter(Boolean).join(" ");
      
      const fullTextTokens = this.tokenize(fullText);
      fullTextTokens.forEach(token => {
        if (!this.indexes.fulltext.has(token)) this.indexes.fulltext.set(token, []);
        this.indexes.fulltext.get(token).push(idx);
      });
    });

    this.lastIndexTime = performance.now();
    console.log(`✅ Super fast index built in ${(this.lastIndexTime - startTime).toFixed(2)}ms`);
  }

  search(criteria) {
    const startTime = performance.now();
    const results = new Map(); // item index -> score
    
    const addResults = (indexName, query, weight = 1) => {
      if (!query) return;
      
      const normalized = this.normalizeText(query);
      const index = this.indexes[indexName];
      
      // Exact match gets highest score
      if (index.has(normalized)) {
        index.get(normalized).forEach(idx => {
          results.set(idx, (results.get(idx) || 0) + weight * 100);
        });
      }
      
      // Partial matches
      for (const [token, indices] of index.entries()) {
        if (token.includes(normalized) && token !== normalized) {
          const score = weight * (normalized.length / token.length) * 50;
          indices.forEach(idx => {
            results.set(idx, (results.get(idx) || 0) + score);
          });
        }
      }
    };

    // Search with different weights
    if (criteria.imei) addResults('imei', criteria.imei, 3);
    if (criteria.immatriculation) addResults('immatriculation', criteria.immatriculation, 2);
    if (criteria.entreprise) addResults('entreprise', criteria.entreprise, 2);
    if (criteria.telephone) addResults('telephone', criteria.telephone, 1.5);
    if (criteria.sim) addResults('sim', criteria.sim, 1.5);
    
    // Global search if only one term
    const termsCount = Object.values(criteria).filter(Boolean).length;
    if (termsCount === 1) {
      const globalTerm = Object.values(criteria).find(Boolean);
      addResults('fulltext', globalTerm, 1);
    }

    // Convert to sorted array
    const sortedResults = Array.from(results.entries())
      .sort(([,a], [,b]) => b - a)
      .map(([idx]) => this.data[idx])
      .slice(0, 1000);

    console.log(`🔍 Super fast search completed in ${(performance.now() - startTime).toFixed(2)}ms - ${sortedResults.length} results`);
    return sortedResults;
  }

  suggest(field, query, limit = 8) {
    if (!query || query.length < 2) return [];
    
    const normalized = this.normalizeText(query);
    const index = this.indexes[field];
    const suggestions = new Set();
    
    for (const [token, indices] of index.entries()) {
      if (token.startsWith(normalized) && suggestions.size < limit) {
        indices.slice(0, 3).forEach(idx => {
          const item = this.data[idx];
          if (item[field]) suggestions.add(item[field]);
          if (field === 'immatriculation' && item.immat) suggestions.add(item.immat);
        });
      }
    }
    
    return Array.from(suggestions).slice(0, limit);
  }
}

// Hook de debouncing optimisé
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function VehiclesDevicesPage() {
  const {
    companies,
    devices: combinedData,
    loading,
    isCacheReady,
    loadingMode,
    quickStats,
    loadAllData,
    loadQuickStats,
    setLoadingMode,
    searchDevices,
    searchByImei,
    searchBySim,
    searchByVehicle,
    searchByCompany,
    resetFilters,
    isFiltered,
    totalResults,
    getVehiclesWithoutDevices,
    getVehiclesWithEmptyImei,
    getDevicesWithoutVehicles,
    getUnassociatedItemsStats
  } = useCompanyVehicleDevice();

  // ============= STATE MANAGEMENT =============
  
  // Search optimization
  const searchIndex = useRef(new SuperFastSearchIndex());
  const [searchStats, setSearchStats] = useState({ total: 0, time: 0 });
  
  // Local state for filtered data when using search
  const [filteredData, setFilteredData] = useState([]);

  // Dialog states
  const [showAssociateSheet, setShowAssociateSheet] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [associationMode, setAssociationMode] = useState('vehicle-device');
  const [showMultipleImeiDialog, setShowMultipleImeiDialog] = useState(false);
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);
  const [showImportDevicesDialog, setShowImportDevicesDialog] = useState(false);
  const [showEditVehicleDialog, setShowEditVehicleDialog] = useState(false);
  const [showAddDeviceWithVehicleDialog, setShowAddDeviceWithVehicleDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ============= OPTIMIZED SEARCH STATES =============
  const [searchImei, setSearchImei] = useState('');
  const [searchImmat, setSearchImmat] = useState('');
  const [searchEntreprise, setSearchEntreprise] = useState('');
  const [searchTelephone, setSearchTelephone] = useState('');
  const [searchVehiclesWithoutImei, setSearchVehiclesWithoutImei] = useState(false);
  
  // Advanced search
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Suggestions
  const [suggestions, setSuggestions] = useState({
    imei: [],
    immatriculation: [],
    entreprise: [],
    telephone: []
  });
  const [activeSuggestionField, setActiveSuggestionField] = useState(null);

  // Multi-selection for dissociation
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  // Multi-selection for devices association
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isDeviceSelectMode, setIsDeviceSelectMode] = useState(false);

  // Bulk association state
  const [showBulkAssociation, setShowBulkAssociation] = useState(false);

  // Track current filters for refresh after association
  const [currentFilters, setCurrentFilters] = useState({});

  // Data refresh hook
  const {
    refreshAfterAssociation,
    refreshAfterDissociation,
    refreshAfterDeletion
  } = useDataRefresh(loadAllData, setFilteredData, searchDevices, currentFilters);

  // Debounced search values
  const debouncedGlobalSearch = useDebounce(globalSearch, 200);
  const debouncedSearchImei = useDebounce(searchImei, 200);
  const debouncedSearchImmat = useDebounce(searchImmat, 200);
  const debouncedSearchEntreprise = useDebounce(searchEntreprise, 200);
  const debouncedSearchTelephone = useDebounce(searchTelephone, 200);

  // ============= SEARCH OPTIMIZATION =============

  // Rebuild index when data changes
  useEffect(() => {
    if (combinedData && combinedData.length > 0) {
      console.log('🔄 Rebuilding super fast search index...');
      searchIndex.current.buildIndex(combinedData);
    }
  }, [combinedData]);

  // Optimized search function
  const performOptimizedSearch = useCallback((criteria) => {
    if (!searchIndex.current.data.length) {
      console.warn('Search index not ready');
      return;
    }

    const startTime = performance.now();
    const results = searchIndex.current.search(criteria);
    const endTime = performance.now();
    
    setFilteredData(results);
    setSearchStats({
      total: results.length,
      time: endTime - startTime
    });

    setCurrentFilters(criteria);

    toast({
      title: "Recherche ultra-rapide",
      description: `${results.length} résultat(s) en ${(endTime - startTime).toFixed(1)}ms`
    });
  }, []);

  // Global search effect
  useEffect(() => {
    if (debouncedGlobalSearch && debouncedGlobalSearch.length >= 2) {
      performOptimizedSearch({ fulltext: debouncedGlobalSearch });
    } else if (debouncedGlobalSearch === '') {
      resetSearchResults();
    }
  }, [debouncedGlobalSearch, performOptimizedSearch]);

  // Advanced search effect
  useEffect(() => {
    const criteria = {};
    if (debouncedSearchImei) criteria.imei = debouncedSearchImei;
    if (debouncedSearchImmat) criteria.immatriculation = debouncedSearchImmat;
    if (debouncedSearchEntreprise) criteria.entreprise = debouncedSearchEntreprise;
    if (debouncedSearchTelephone) criteria.telephone = debouncedSearchTelephone;
    
    const hasAdvancedCriteria = Object.keys(criteria).length > 0;
    if (hasAdvancedCriteria && showAdvancedSearch) {
      performOptimizedSearch(criteria);
    }
  }, [debouncedSearchImei, debouncedSearchImmat, debouncedSearchEntreprise, debouncedSearchTelephone, showAdvancedSearch, performOptimizedSearch]);

  // Reset search results
  const resetSearchResults = useCallback(() => {
    setFilteredData([]);
    setSearchStats({ total: 0, time: 0 });
    setCurrentFilters({});
  }, []);

  // Handle suggestions
  const handleSuggestionInput = useCallback((field, value) => {
    if (value.length >= 2) {
      const fieldSuggestions = searchIndex.current.suggest(field, value, 6);
      setSuggestions(prev => ({
        ...prev,
        [field]: fieldSuggestions
      }));
      setActiveSuggestionField(field);
    } else {
      setActiveSuggestionField(null);
    }
  }, []);

  // Apply suggestion
  const applySuggestion = useCallback((field, value) => {
    if (field === 'imei') setSearchImei(value);
    else if (field === 'immatriculation') setSearchImmat(value);
    else if (field === 'entreprise') setSearchEntreprise(value);
    else if (field === 'telephone') setSearchTelephone(value);
    setActiveSuggestionField(null);
  }, []);

  // ============= EXISTING SEARCH FUNCTIONS (OPTIMIZED) =============

  // OPTIMIZED: Search vehicles with empty IMEI with progressive display
  const searchVehiclesWithEmptyImeiOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: VEHICLES WITH EMPTY IMEI ===');
      setFilteredData([]);
      setLoadingMode('search');

      const onProgressUpdate = progressResults => {
        console.log(`Progress update: ${progressResults.length} vehicles so far`);
        setFilteredData([...progressResults]);
      };
      const vehiclesWithEmptyImei = await getVehiclesWithEmptyImei(onProgressUpdate);
      setFilteredData(vehiclesWithEmptyImei);
    } catch (error) {
      console.error('Error searching vehicles with empty IMEI:', error);
    }
  };

  // OPTIMIZED: Search vehicles without devices
  const searchVehiclesWithoutDevicesOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: VEHICLES WITHOUT DEVICES ===');
      setFilteredData([]);
      setCurrentFilters({});
      const vehiclesWithoutDevices = await getVehiclesWithoutDevices();
      setFilteredData(vehiclesWithoutDevices);
      setLoadingMode('search');
    } catch (error) {
      console.error('Error searching vehicles without devices:', error);
    }
  };

  // OPTIMIZED: Search devices without vehicles
  const searchDevicesWithoutVehiclesOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: DEVICES WITHOUT VEHICLES ===');
      setFilteredData([]);
      setCurrentFilters({});
      const devicesWithoutVehicles = await getDevicesWithoutVehicles();
      setFilteredData(devicesWithoutVehicles);
      setLoadingMode('search');
    } catch (error) {
      console.error('Error searching devices without vehicles:', error);
    }
  };

  // Original search function with fallback
  const searchVehicles = async () => {
    if (searchVehiclesWithoutImei) {
      const vehiclesWithoutImei = combinedData.filter(item => 
        item.type === "vehicle" && 
        (!item.imei || item.imei === "") && 
        (!item.vehicleDeviceImei || item.vehicleDeviceImei === "")
      );
      setFilteredData(vehiclesWithoutImei);
      toast({
        title: "Recherche réussie",
        description: `${vehiclesWithoutImei.length} véhicule(s) sans IMEI trouvé(s)`
      });
      return;
    }

    if (!searchImei && !searchImmat && !searchEntreprise && !searchTelephone) {
      toast({
        title: "Attention",
        description: "Veuillez saisir au moins un critère de recherche",
        variant: "destructive"
      });
      return;
    }

    // Use optimized search
    const criteria = {};
    if (searchImei) criteria.imei = searchImei;
    if (searchImmat) criteria.immatriculation = searchImmat;
    if (searchEntreprise) criteria.entreprise = searchEntreprise;
    if (searchTelephone) criteria.telephone = searchTelephone;

    performOptimizedSearch(criteria);
  };

  // Reset search
  const resetSearch = () => {
    setSearchImei('');
    setSearchImmat('');
    setSearchEntreprise('');
    setSearchTelephone('');
    setGlobalSearch('');
    setSearchVehiclesWithoutImei(false);
    setFilteredData([]);
    setCurrentFilters({});
    setShowAdvancedSearch(false);
    setSuggestions({
      imei: [],
      immatriculation: [],
      entreprise: [],
      telephone: []
    });
    setActiveSuggestionField(null);
    resetFilters();
  };

  // ============= ALL EXISTING FUNCTIONS (UNCHANGED) =============

  // Refresh current view
  const refreshCurrentView = async () => {
    try {
      if (Object.keys(currentFilters).length > 0) {
        console.log('🔄 Refreshing current search with filters:', currentFilters);
        const results = await searchDevices(currentFilters);
        setFilteredData(results || []);
        toast({
          title: "Rafraîchi",
          description: `Données actualisées - ${results?.length || 0} résultat(s)`
        });
      } else if (filteredData.length > 0) {
        if (filteredData.every(item => item.type === 'vehicle' && !item.vehicleDeviceImei)) {
          console.log('🔄 Refreshing vehicles without devices');
          await searchVehiclesWithoutDevicesOptimized();
        } else if (filteredData.every(item => item.type === 'device' && !item.isAssociated)) {
          console.log('🔄 Refreshing devices without vehicles');
          await searchDevicesWithoutVehiclesOptimized();
        } else {
          console.log('🔄 Refreshing with load all data');
          await loadAllData('optimized');
        }
      } else {
        console.log('🔄 Refreshing all data');
        await loadAllData('optimized');
      }
    } catch (error) {
      console.error('Error refreshing current view:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du rafraîchissement",
        variant: "destructive"
      });
    }
  };

  // Update or create vehicle
  const updateVehicleData = async data => {
    try {
      console.log('=== UPDATING/CREATING VEHICLE (CORRECTED) ===');
      console.log('Data received:', data);

      const mappedData = { ...data };
      if (!mappedData.companyVehiclesId && data.entreprise) {
        const rawEntreprise = String(data.entreprise).trim();
        const looksLikeId = /[a-zA-Z0-9-]{8,}/.test(rawEntreprise);
        
        const byId = companies.find(c => c.id === rawEntreprise);
        const byName = !byId ? companies.find(c => c.name === rawEntreprise) : null;
        const found = byId || byName;
        
        if (found) {
          mappedData.companyVehiclesId = found.id;
          mappedData.entreprise = found.name;
        } else if (looksLikeId) {
          mappedData.companyVehiclesId = rawEntreprise;
          try {
            const results = await searchCompaniesReal(rawEntreprise);
            const exact = Array.isArray(results) ? results.find(c => c.id === rawEntreprise) : null;
            if (exact?.name) mappedData.entreprise = exact.name;
          } catch (e) {
            // ignore and proceed
          }
        } else {
          try {
            const results = await searchCompaniesReal(rawEntreprise);
            const exact = Array.isArray(results) ? results.find(c => c.name?.toLowerCase() === rawEntreprise.toLowerCase()) : null;
            if (exact) {
              mappedData.companyVehiclesId = exact.id;
              mappedData.entreprise = exact.name;
            } else {
              throw new Error(`Entreprise "${rawEntreprise}" non trouvée`);
            }
          } catch {
            if (looksLikeId) {
              mappedData.companyVehiclesId = rawEntreprise;
            } else {
              throw new Error(`Entreprise "${rawEntreprise}" non trouvée`);
            }
          }
        }
      }

      const { createOrUpdateVehicleSimple } = await import('../services/SimpleVehicleService.js');
      const updatedVehicle = await createOrUpdateVehicleSimple(mappedData);

      if (updatedVehicle) {
        console.log('✅ Using optimized update: updating local state with modified vehicle');
        await refreshAfterAssociation("Véhicule traité avec succès", {
          ...updatedVehicle,
          type: "vehicle",
          isAssociated: !!updatedVehicle.vehicleDeviceImei
        });
      } else {
        console.log('❌ No updated vehicle returned, falling back to full reload');
        toast({
          title: "Succès",
          description: "Véhicule traité avec succès"
        });
        await loadAllData();
      }
    } catch (err) {
      console.error('Error updating/creating vehicle:', err);
      toast({
        title: "Erreur",
        description: `Erreur lors du traitement: ${err.message}`,
        variant: "destructive"
      });
    }
  };

  // Delete vehicle
  const deleteVehicleDataLocal = async item => {
    try {
      await deleteVehicleData(item);
      await refreshAfterDeletion("Véhicule supprimé avec succès");
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  // Dissociate device from vehicle
  const dissociateDevice = async item => {
    console.log('=== STARTING DISSOCIATION ===');
    console.log('Item to dissociate:', item);
    try {
      if (item.type === 'vehicle') {
        console.log('Dissociating vehicle with immat:', item.immatriculation || item.immat);
        const result = await dissociateVehicleFromDevice(item.immatriculation || item.immat);
        console.log('Dissociation result:', result);
        await refreshAfterDissociation("Boîtier dissocié du véhicule avec succès", {
          ...item,
          imei: '',
          vehicleDeviceImei: null,
          device: null,
          isAssociated: false,
          type: 'vehicle'
        });
        await refreshCurrentView();
      } else if (item.type === 'device') {
        const { dissociateDeviceFromVehicle } = await import('../services/VehicleDissociationService.js');
        console.log('Dissociating device with IMEI:', item.imei);
        const result = await dissociateDeviceFromVehicle(item.vehicleImmat);
        console.log('Dissociation result:', result);
        await refreshAfterDissociation("Véhicule dissocié du boîtier avec succès", {
          ...item,
          vehicleImmat: null,
          isAssociated: false,
          entreprise: 'Boîtier libre',
          type: 'device'
        });
        await refreshCurrentView();
      }
      console.log('Dissociation completed successfully');
    } catch (err) {
      console.error('=== DISSOCIATION ERROR ===');
      console.error('Error type:', err.constructor.name);
      console.error('Error message:', err.message);
      console.error('Full error:', err);
      if (err.errors) {
        console.error('GraphQL errors:', err.errors);
      }
      toast({
        title: "Erreur",
        description: `Erreur lors de la dissociation: ${err.message}`,
        variant: "destructive"
      });
    }
  };

  // Toggle selection modes
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedVehicles([]);
  };

  const toggleDeviceSelectMode = () => {
    setIsDeviceSelectMode(!isDeviceSelectMode);
    setSelectedDevices([]);
  };

  // Bulk dissociate selected vehicles
  const bulkDissociateSelected = async () => {
    if (selectedVehicles.length === 0) return;
    console.log('=== BULK DISSOCIATING DEVICES FROM VEHICLES ===');
    console.log('Vehicle immats:', selectedVehicles);
    try {
      const results = [];
      const errors = [];
      for (const immat of selectedVehicles) {
        try {
          await dissociateVehicleFromDevice(immat);
          results.push({ immat, success: true });
        } catch (error) {
          console.error(`Error dissociating ${immat}:`, error);
          errors.push({ immat, error: error.message });
        }
      }

      console.log('Bulk dissociation results:', { results, errors });
      
      if (results.length > 0) {
        await refreshAfterDissociation(`${results.length} véhicule(s) dissocié(s) avec succès`);
      }
      
      if (errors.length > 0) {
        toast({
          title: "Attention",
          description: `${errors.length} erreur(s) lors de la dissociation`,
          variant: "destructive"
        });
      }

      setSelectedVehicles([]);
      setIsSelectMode(false);
    } catch (err) {
      console.error('Bulk dissociation error:', err);
      toast({
        title: "Erreur",
        description: "Erreur lors de la dissociation en masse",
        variant: "destructive"
      });
    }
  };

  // ============= COLUMN DEFINITIONS (UNCHANGED) =============

  const allColumns = [
    {
      id: "entreprise",
      label: "Entreprise",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-blue-500" />
          <span className={value ? "text-blue-700 font-medium" : "text-gray-400"}>
            {value || "Entreprise non définie"}
          </span>
        </div>
      )
    },
    {
      id: "type",
      label: "Type",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <div className="flex items-center gap-2">
          {value === "vehicle" ? (
            <Car className="h-4 w-4 text-green-500" />
          ) : (
            <Wifi className="h-4 w-4 text-purple-500" />
          )}
          <span className={`text-sm font-medium ${
            value === "vehicle" ? "text-green-700" : "text-purple-700"
          }`}>
            {value === "vehicle" ? "Véhicule" : "Boîtier"}
          </span>
        </div>
      )
    },
    {
      id: "immatriculation",
      label: "Immatriculation",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-blue-500" />
          <div className="flex flex-col">
            <span className="font-medium">
              {value || row.immat || "Pas d'immatriculation"}
            </span>
            {row.nomVehicule && <span className="text-xs text-gray-500">{row.nomVehicule}</span>}
          </div>
        </div>
      )
    },
    {
      id: "imei",
      label: "IMEI",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        value ? (
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-gray-500" />
            <span className="font-mono text-xs">{value}</span>
          </div>
        ) : (
          <span className="text-gray-400 italic">
            {row.type === "vehicle" ? "Aucun IMEI" : "Non assigné"}
          </span>
        )
      )
    },
    {
      id: "typeBoitier",
      label: "Protocol",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Aucun protocole"}
        </span>
      )
    },
    {
      id: "emplacement",
      label: "Emplacement",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Non défini"}
        </span>
      )
    },
    {
      id: "marque",
      label: "Marque",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Non définie"}
        </span>
      )
    },
    {
      id: "modele",
      label: "Modèle",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Non défini"}
        </span>
      )
    },
    {
      id: "kilometrage",
      label: "Kilométrage",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? `${value} km` : "Non défini"}
        </span>
      )
    },
    {
      id: "sim",
      label: "SIM",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className={row.sim || row.telephone ? "text-gray-900" : "text-gray-400"}>
          {row.sim || row.telephone || "Pas de SIM"}
        </span>
      )
    },
    {
      id: "statut",
      label: "Statut",
      sortable: true,
      visible: true,
      renderCell: (value, row) => {
        let status = "Inconnu";
        let badgeClass = "bg-gray-100 text-gray-800";
        
        if (row.type === "device") {
          if (!row.isAssociated && row.entreprise === "Boîtier libre" && !row.isReservedForCompany) {
            status = "Libre";
            badgeClass = "bg-green-100 text-green-800";
          } else if (row.isAssociated && row.immatriculation) {
            status = "Associé véhicule";
            badgeClass = "bg-blue-100 text-blue-800";
          } else if (row.isReservedForCompany || row.entreprise && row.entreprise !== "Boîtier libre") {
            status = "Réservé client";
            badgeClass = "bg-orange-100 text-orange-800";
          }
        } else if (row.type === "vehicle") {
          if (row.imei && row.isAssociated) {
            status = "Avec boîtier";
            badgeClass = "bg-blue-100 text-blue-800";
          } else {
            status = "Sans boîtier";
            badgeClass = "bg-gray-100 text-gray-800";
          }
        }
        
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
            {status}
          </span>
        );
      }
    }
  ];

  // Vehicle without device columns
  const vehicleWithoutDeviceColumns = [
    {
      id: "immatriculation",
      label: "Immatriculation",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-blue-500" />
          <div className="flex flex-col">
            <span className="font-medium">
              {value || "Pas d'immatriculation"}
            </span>
            {row.nomVehicule && <span className="text-xs text-gray-500">{row.nomVehicule}</span>}
          </div>
        </div>
      )
    },
    {
      id: "imei",
      label: "IMEI",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className="text-gray-400 italic">
          Non assigné
        </span>
      )
    },
    {
      id: "entreprise",
      label: "Entreprise actuelle",
      sortable: true,
      visible: true,
      renderCell: (value, row) => (
        <span className="text-blue-600 font-medium">
          {value || "Entreprise non définie"}
        </span>
      )
    }
  ];

  // Function to determine which columns to use
  const getColumnsForCurrentView = () => {
    const hasVehiclesWithoutDevices = filteredData.length > 0 && 
      filteredData.some(item => item.type === "vehicle" && (!item.imei || item.imei === ""));
    if (hasVehiclesWithoutDevices && filteredData.every(item => item.type === "vehicle")) {
      return vehicleWithoutDeviceColumns;
    }
    return allColumns;
  };

  // Handle functions
  const handleDelete = async item => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${item.immatriculation || item.immat}" ?`)) {
      return;
    }
    try {
      await deleteVehicleData(item);
      toast({
        title: "Succès",
        description: "Véhicule supprimé avec succès"
      });
      if (loadingMode === 'search') {
        searchVehiclesWithoutDevicesOptimized();
      } else {
        loadAllData();
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du véhicule",
        variant: "destructive"
      });
    }
  };

  const handleEdit = item => {
    setSelectedItem(item);
    setShowEditVehicleDialog(true);
  };

  const handleAssociate = item => {
    console.log('Association initiated for item:', item);
    setSelectedDevice(item);
    setShowAssociateSheet(true);
  };

  // ============= RENDER =============

  return (
    <div className="space-y-6 p-6">
      {/* Header with stats */}
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <span>{combinedData.filter(item => item.type === "vehicle").length} véhicules</span>
            <span>{combinedData.filter(item => item.type === "device" && item.isAssociated).length} boîtiers assignés</span>
            <span>{combinedData.filter(item => item.type === "device" && !item.isAssociated).length} boîtiers disponibles</span>
            {searchStats.time > 0 && (
              <span className="text-blue-600 font-medium flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Recherche: {searchStats.time.toFixed(1)}ms
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCurrentView} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Rafraîchir
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button onClick={() => setShowAddVehicleDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter Véhicule
        </Button>
        <Button variant="default" onClick={() => setShowAddDeviceWithVehicleDialog(true)}>
          <Car className="mr-2 h-4 w-4" />
          Créer Device + Véhicule
        </Button>
        <Button variant="outline" onClick={() => setShowImportDevicesDialog(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Importer Devices
        </Button>
      </div>

      {/* ============= INTERFACE DE RECHERCHE OPTIMISÉE ============= */}
      
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Recherche Ultra-Rapide
            {searchStats.total > 0 && (
              <span className="text-sm text-blue-600 ml-2">
                {searchStats.total} résultats en {searchStats.time.toFixed(1)}ms
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={!showAdvancedSearch ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAdvancedSearch(false)}
            >
              Recherche Globale
            </Button>
            <Button
              variant={showAdvancedSearch ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAdvancedSearch(true)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Recherche Avancée
            </Button>
            {(filteredData.length > 0 || globalSearch || searchImei || searchImmat || searchEntreprise || searchTelephone) && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetSearch}
              >
                <SearchX className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Global Search */}
        {!showAdvancedSearch && (
          <div className="space-y-2">
            <Label htmlFor="global-search">Recherche Globale</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="global-search"
                placeholder="Rechercher par IMEI, immatriculation, entreprise, téléphone..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">
              🚀 Recherche instantanée dès 2 caractères • Recherche floue activée • Performance sub-milliseconde
            </p>
          </div>
        )}

        {/* Advanced Search */}
        {showAdvancedSearch && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'imei', label: 'IMEI', value: searchImei, setter: setSearchImei, placeholder: 'Ex: 350612071728933' },
              { key: 'immatriculation', label: 'Immatriculation', value: searchImmat, setter: setSearchImmat, placeholder: 'Ex: AA-123-BB' },
              { key: 'entreprise', label: 'Entreprise', value: searchEntreprise, setter: setSearchEntreprise, placeholder: 'Nom de l\'entreprise' },
              { key: 'telephone', label: 'Téléphone/SIM', value: searchTelephone, setter: setSearchTelephone, placeholder: 'Numéro de téléphone' }
            ].map(({ key, label, value, setter, placeholder }) => (
              <div key={key} className="space-y-2 relative">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => {
                    setter(e.target.value);
                    handleSuggestionInput(key, e.target.value);
                  }}
                />
                
                {/* Suggestions dropdown */}
                {activeSuggestionField === key && suggestions[key].length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {suggestions[key].map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => applySuggestion(key, suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============= BOUTONS SPÉCIALISÉS (INCHANGÉS) ============= */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">🚗 Véhicules sans boîtiers</h3>
          <p className="text-xs text-gray-600 mb-3">Recherche optimisée - Chargement direct sans cache</p>
          <Button 
            variant="outline" 
            onClick={searchVehiclesWithoutDevicesOptimized} 
            className="w-full bg-blue-50 border-blue-300 hover:bg-blue-100" 
            disabled={loading}
          >
            <Car className="h-4 w-4 mr-2" />
            Véhicules sans boîtier
          </Button>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-semibold text-green-700 mb-2">📡 Boîtiers libres</h3>
          <p className="text-xs text-gray-600 mb-3">Recherche optimisée - Chargement direct sans cache</p>
          <Button 
            variant="outline" 
            onClick={() => {
              searchDevicesWithoutVehiclesOptimized();
              setShowBulkAssociation(true);
            }} 
            className="w-full bg-green-50 border-green-300 hover:bg-green-100" 
            disabled={loading}
          >
            <Wifi className="h-4 w-4 mr-2" />
            Devices sans véhicules
          </Button>
        </div>

        <div className="text-center">
          <h3 className="text-sm font-semibold text-purple-700 mb-2">📊 Charger tout</h3>
          <p className="text-xs text-gray-600 mb-3">Rechargement complet des données</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setFilteredData([]);
              setCurrentFilters({});
              loadAllData('optimized');
            }} 
            className="w-full bg-purple-50 border-purple-300 hover:bg-purple-100" 
            disabled={loading}
          >
            <Database className="h-4 w-4 mr-2" />
            Charger tout
          </Button>
        </div>
      </div>

      {/* ============= CONTRÔLES DE SÉLECTION MULTIPLE ============= */}
      
      {isSelectMode && (
        <div className="flex items-center gap-2 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm text-blue-700 font-medium">
            Mode sélection véhicules: {selectedVehicles.length} véhicule(s) sélectionné(s)
          </span>
          {selectedVehicles.length > 0 && (
            <Button size="sm" variant="destructive" onClick={bulkDissociateSelected}>
              Dissocier la sélection ({selectedVehicles.length})
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={toggleSelectMode}>
            Annuler
          </Button>
        </div>
      )}

      {/* ============= INTERFACE D'ASSOCIATION EN MASSE ============= */}
      
      {showBulkAssociation && filteredData.length > 0 && (
        <div className="mb-6">
          <DevicesBulkAssociation 
            devices={filteredData.filter(device => device.type === "device")} 
            onAssociationComplete={async () => {
              setShowBulkAssociation(false);
              setSelectedDevices([]);
              setIsDeviceSelectMode(false);
              await refreshAfterAssociation("Boîtiers associés avec succès");
            }} 
          />
        </div>
      )}

      {/* ============= TABLE DE DONNÉES ============= */}
      
      {(() => {
        if (showBulkAssociation) return null;
        
        const dataToShow = filteredData.length > 0 ? filteredData : combinedData;
        
        return dataToShow.length > 0 ? (
          <EnhancedDataTable 
            columns={getColumnsForCurrentView()} 
            data={dataToShow} 
            onEdit={handleEdit} 
            onAssociate={handleAssociate} 
            onDissociate={dissociateDevice} 
            loading={loading} 
            enablePagination={true} 
            selectedVehicles={selectedVehicles} 
            selectedDevices={selectedDevices} 
            isSelectMode={isSelectMode} 
            isDeviceSelectMode={isDeviceSelectMode}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Aucune donnée à afficher.
          </div>
        );
      })()}

      {/* ============= TOUS LES DIALOGS EXISTANTS (INCHANGÉS) ============= */}
      
      {/* Add Vehicle Dialog */}
      <Dialog open={showAddVehicleDialog} onOpenChange={setShowAddVehicleDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
            <DialogDescription>
              Remplissez les informations du véhicule ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <AddVehicleForm
            companies={companies}
            onSuccess={(vehicle) => {
              setShowAddVehicleDialog(false);
              updateVehicleData(vehicle);
            }}
            onCancel={() => setShowAddVehicleDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Dialog */}
      <Dialog open={showEditVehicleDialog} onOpenChange={setShowEditVehicleDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le véhicule</DialogTitle>
            <DialogDescription>
              Modifiez les informations du véhicule ci-dessous.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <AddVehicleForm
              companies={companies}
              initialData={selectedItem}
              onSuccess={(vehicle) => {
                setShowEditVehicleDialog(false);
                setSelectedItem(null);
                updateVehicleData(vehicle);
              }}
              onCancel={() => {
                setShowEditVehicleDialog(false);
                setSelectedItem(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Import Devices Dialog */}
      <Dialog open={showImportDevicesDialog} onOpenChange={setShowImportDevicesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Importer des boîtiers</DialogTitle>
            <DialogDescription>
              Importez plusieurs boîtiers à partir d'un fichier CSV.
            </DialogDescription>
          </DialogHeader>
          <ImportDevicesForm
            onSuccess={() => {
              setShowImportDevicesDialog(false);
              refreshCurrentView();
            }}
            onCancel={() => setShowImportDevicesDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Add Device with Vehicle Dialog */}
      <Dialog open={showAddDeviceWithVehicleDialog} onOpenChange={setShowAddDeviceWithVehicleDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un boîtier avec véhicule</DialogTitle>
            <DialogDescription>
              Créez un nouveau boîtier et associez-le à un véhicule.
            </DialogDescription>
          </DialogHeader>
          <AddDeviceWithVehicleForm
            companies={companies}
            onSuccess={() => {
              setShowAddDeviceWithVehicleDialog(false);
              refreshCurrentView();
            }}
            onCancel={() => setShowAddDeviceWithVehicleDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Associate Sheet */}
      <Sheet open={showAssociateSheet} onOpenChange={setShowAssociateSheet}>
        <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Association Véhicule-Boîtier</SheetTitle>
          </SheetHeader>
          {selectedDevice && (
            <AssociateVehicleForm
              selectedDevice={selectedDevice}
              companies={companies}
              mode={associationMode}
              onSuccess={() => {
                setShowAssociateSheet(false);
                setSelectedDevice(null);
                refreshCurrentView();
              }}
              onCancel={() => {
                setShowAssociateSheet(false);
                setSelectedDevice(null);
              }}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Multiple IMEI Search Dialog */}
      <MultipleImeiSearchDialog
        open={showMultipleImeiDialog}
        onOpenChange={setShowMultipleImeiDialog}
        onSearch={(results) => {
          setFilteredData(results);
          setShowMultipleImeiDialog(false);
        }}
      />

      {/* Debug Panels */}
      <CacheDebugPanel />
      <ImeiDiagnosticPanel />
    </div>
  );
}