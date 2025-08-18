import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FileSpreadsheet, Search, Edit, Link, Car, Wifi, Upload, Database, ArrowLeft, Smartphone, Building, X, RefreshCw, Filter, SearchX, Zap } from "lucide-react";
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

// ============= OPTIMISATIONS RECHERCHE =============

// Classe pour l'indexation et la recherche optimisée
class SearchIndexOptimized {
  constructor() {
    this.indexes = {
      imei: new Map(),
      immatriculation: new Map(),
      entreprise: new Map(),
      telephone: new Map(),
      fulltext: new Map()
    };
    this.data = [];
    this.lastIndexTime = 0;
  }

  // Normalise le texte pour la recherche
  normalizeText(text) {
    if (!text) return "";
    return text.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]/g, ""); // Keep only alphanumeric
  }

  // Tokenise le texte pour recherche partielle
  tokenize(text) {
    if (!text) return [];
    const normalized = this.normalizeText(text);
    const tokens = new Set();
    
    // Add full text
    tokens.add(normalized);
    
    // Add substrings for partial matching (minimum 2 chars)
    for (let i = 0; i < normalized.length - 1; i++) {
      for (let j = i + 2; j <= normalized.length; j++) {
        tokens.add(normalized.substring(i, j));
      }
    }
    
    return Array.from(tokens);
  }

  // Construit l'index de recherche
  buildIndex(data) {
    console.log(`🚀 Building optimized search index for ${data.length} items...`);
    const startTime = performance.now();
    
    // Clear existing indexes
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
      if (item.immatriculation) {
        const immatTokens = this.tokenize(item.immatriculation);
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
      if (item.telephone) {
        const telTokens = this.tokenize(item.telephone);
        telTokens.forEach(token => {
          if (!this.indexes.telephone.has(token)) this.indexes.telephone.set(token, []);
          this.indexes.telephone.get(token).push(idx);
        });
      }

      // Index full-text pour recherche globale
      const fullText = [
        item.imei,
        item.immatriculation,
        item.entreprise,
        item.telephone,
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
    console.log(`✅ Index built in ${(this.lastIndexTime - startTime).toFixed(2)}ms`);
    console.log(`📊 Index stats:`, {
      imei: this.indexes.imei.size,
      immatriculation: this.indexes.immatriculation.size,
      entreprise: this.indexes.entreprise.size,
      telephone: this.indexes.telephone.size,
      fulltext: this.indexes.fulltext.size
    });
  }

  // Recherche optimisée avec scoring
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
      
      // Partial matches get lower scores
      for (const [token, indices] of index.entries()) {
        if (token.includes(normalized) && token !== normalized) {
          const score = weight * (normalized.length / token.length) * 50;
          indices.forEach(idx => {
            results.set(idx, (results.get(idx) || 0) + score);
          });
        }
      }
    };

    // Search in appropriate indexes with different weights
    addResults('imei', criteria.imei, 3);
    addResults('immatriculation', criteria.immatriculation, 2);
    addResults('entreprise', criteria.entreprise, 2);
    addResults('telephone', criteria.telephone, 1.5);
    
    // Global search if only one term provided
    const termsCount = Object.values(criteria).filter(Boolean).length;
    if (termsCount === 1) {
      const globalTerm = Object.values(criteria).find(Boolean);
      addResults('fulltext', globalTerm, 1);
    }

    // Convert to sorted array
    const sortedResults = Array.from(results.entries())
      .sort(([,a], [,b]) => b - a) // Sort by score descending
      .map(([idx]) => this.data[idx])
      .slice(0, 1000); // Limit results

    console.log(`🔍 Search completed in ${(performance.now() - startTime).toFixed(2)}ms - ${sortedResults.length} results`);
    return sortedResults;
  }

  // Recherche rapide pour autocomplete
  suggest(field, query, limit = 10) {
    if (!query || query.length < 2) return [];
    
    const normalized = this.normalizeText(query);
    const index = this.indexes[field];
    const suggestions = new Set();
    
    for (const [token, indices] of index.entries()) {
      if (token.startsWith(normalized) && suggestions.size < limit) {
        // Get original values
        indices.slice(0, 3).forEach(idx => {
          const item = this.data[idx];
          if (item[field]) suggestions.add(item[field]);
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============= COMPOSANT PRINCIPAL =============

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
  
  // Search index instance
  const searchIndex = useRef(new SearchIndexOptimized());
  
  // Local state for filtered data
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchStats, setSearchStats] = useState({ total: 0, time: 0 });

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

  // Optimized search states
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState({
    imei: '',
    immatriculation: '',
    entreprise: '',
    telephone: ''
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchMode, setSearchMode] = useState('simple'); // 'simple' | 'advanced'
  
  // Autocomplete states
  const [suggestions, setSuggestions] = useState({
    imei: [],
    immatriculation: [],
    entreprise: [],
    telephone: []
  });
  const [activeSuggestionField, setActiveSuggestionField] = useState(null);

  // Multi-selection states
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isDeviceSelectMode, setIsDeviceSelectMode] = useState(false);
  const [showBulkAssociation, setShowBulkAssociation] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  // Debounced search terms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedAdvancedSearch = useDebounce(advancedSearch, 300);

  // Data refresh hook
  const {
    refreshAfterAssociation,
    refreshAfterDissociation,
    refreshAfterDeletion
  } = useDataRefresh(loadAllData, setFilteredData, searchDevices, currentFilters);

  // ============= SEARCH OPTIMIZATION =============

  // Rebuild index when data changes
  useEffect(() => {
    if (combinedData && combinedData.length > 0) {
      console.log('🔄 Rebuilding search index...');
      searchIndex.current.buildIndex(combinedData);
    }
  }, [combinedData]);

  // Optimized search effect for simple search
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
      performSearch({ fulltext: debouncedSearchTerm });
    } else if (debouncedSearchTerm === '') {
      resetSearchResults();
    }
  }, [debouncedSearchTerm]);

  // Optimized search effect for advanced search
  useEffect(() => {
    const hasAdvancedCriteria = Object.values(debouncedAdvancedSearch).some(val => val && val.length >= 2);
    if (hasAdvancedCriteria && searchMode === 'advanced') {
      performSearch(debouncedAdvancedSearch);
    }
  }, [debouncedAdvancedSearch, searchMode]);

  // Core search function using optimized index
  const performSearch = useCallback((criteria) => {
    if (!searchIndex.current.data.length) {
      console.warn('Search index not ready');
      return;
    }

    const startTime = performance.now();
    const results = searchIndex.current.search(criteria);
    const endTime = performance.now();
    
    setFilteredData(results);
    setIsSearchActive(true);
    setSearchStats({
      total: results.length,
      time: endTime - startTime
    });

    // Update current filters for refresh
    setCurrentFilters(criteria);

    toast({
      title: "Recherche terminée",
      description: `${results.length} résultat(s) trouvé(s) en ${(endTime - startTime).toFixed(1)}ms`
    });
  }, []);

  // Reset search results
  const resetSearchResults = useCallback(() => {
    setFilteredData([]);
    setIsSearchActive(false);
    setSearchStats({ total: 0, time: 0 });
    setCurrentFilters({});
  }, []);

  // Handle advanced search input changes
  const handleAdvancedSearchChange = useCallback((field, value) => {
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));

    // Update suggestions
    if (value.length >= 2) {
      const fieldSuggestions = searchIndex.current.suggest(field, value, 5);
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
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));
    setActiveSuggestionField(null);
  }, []);

  // ============= SPECIALIZED SEARCH FUNCTIONS =============

  // Optimized vehicles without devices search
  const searchVehiclesWithoutDevicesOptimized = async () => {
    try {
      setIsSearchActive(true);
      const startTime = performance.now();
      const results = await getVehiclesWithoutDevices();
      const endTime = performance.now();
      
      setFilteredData(results);
      setSearchStats({
        total: results.length,
        time: endTime - startTime
      });
      
      toast({
        title: "Véhicules sans boîtiers",
        description: `${results.length} véhicule(s) trouvé(s) en ${(endTime - startTime).toFixed(1)}ms`
      });
    } catch (error) {
      console.error('Error searching vehicles without devices:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche des véhicules sans boîtiers",
        variant: "destructive"
      });
    }
  };

  // Optimized devices without vehicles search  
  const searchDevicesWithoutVehiclesOptimized = async () => {
    try {
      setIsSearchActive(true);
      const startTime = performance.now();
      const results = await getDevicesWithoutVehicles();
      const endTime = performance.now();
      
      setFilteredData(results);
      setSearchStats({
        total: results.length,
        time: endTime - startTime
      });
      
      toast({
        title: "Boîtiers libres",
        description: `${results.length} boîtier(s) trouvé(s) en ${(endTime - startTime).toFixed(1)}ms`
      });
    } catch (error) {
      console.error('Error searching devices without vehicles:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche des boîtiers libres",
        variant: "destructive"
      });
    }
  };

  // Optimized vehicles with empty IMEI search
  const searchVehiclesWithEmptyImeiOptimized = async () => {
    try {
      setIsSearchActive(true);
      const startTime = performance.now();
      const results = await getVehiclesWithEmptyImei();
      const endTime = performance.now();
      
      setFilteredData(results);
      setSearchStats({
        total: results.length,
        time: endTime - startTime
      });
      
      toast({
        title: "Véhicules sans IMEI",
        description: `${results.length} véhicule(s) trouvé(s) en ${(endTime - startTime).toFixed(1)}ms`
      });
    } catch (error) {
      console.error('Error searching vehicles with empty IMEI:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche des véhicules sans IMEI",
        variant: "destructive"
      });
    }
  };

  // ============= DATA MANAGEMENT =============

  // Refresh current view
  const refreshCurrentView = async () => {
    try {
      if (isSearchActive && Object.keys(currentFilters).length > 0) {
        // Refresh search results
        console.log('🔄 Refreshing current search...');
        await loadAllData('optimized');
        // Re-perform search after data refresh
        setTimeout(() => {
          performSearch(currentFilters);
        }, 100);
      } else {
        // Refresh all data
        console.log('🔄 Refreshing all data...');
        await loadAllData('optimized');
        resetSearchResults();
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

  // Clear all search
  const clearAllSearch = () => {
    setSearchTerm('');
    setAdvancedSearch({
      imei: '',
      immatriculation: '',
      entreprise: '',
      telephone: ''
    });
    setSearchMode('simple');
    setShowAdvancedSearch(false);
    resetSearchResults();
    setSuggestions({
      imei: [],
      immatriculation: [],
      entreprise: [],
      telephone: []
    });
    setActiveSuggestionField(null);
    
    toast({
      title: "Recherche réinitialisée",
      description: "Tous les filtres ont été effacés"
    });
  };

  // ============= VEHICLE MANAGEMENT =============

  // Update or create vehicle
  const updateVehicleData = async (data) => {
    try {
      console.log('=== UPDATING/CREATING VEHICLE (OPTIMIZED) ===');
      
      const mappedData = { ...data };
      
      // Map company logic (keep existing logic)
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
        console.log('✅ Vehicle updated successfully');
        await refreshAfterAssociation("Véhicule traité avec succès", {
          ...updatedVehicle,
          type: "vehicle",
          isAssociated: !!updatedVehicle.vehicleDeviceImei
        });
        
        // Refresh search index
        setTimeout(() => {
          searchIndex.current.buildIndex(combinedData);
        }, 500);
      }
      
      return updatedVehicle;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la mise à jour du véhicule",
        variant: "destructive"
      });
      throw error;
    }
  };

  // ============= TABLE CONFIGURATION =============

  const columns = useMemo(() => [
    {
      key: "entreprise",
      header: "Entreprise",
      sortable: true,
      className: "min-w-[150px]",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-blue-700">{value || 'N/A'}</span>
        </div>
      )
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      className: "w-[100px]",
      render: (value, row) => (
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
      key: "immatriculation",
      header: "Immatriculation",
      sortable: true,
      className: "min-w-[120px]",
      render: (value) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {value || 'N/A'}
        </span>
      )
    },
    {
      key: "imei",
      header: "IMEI",
      sortable: true,
      className: "min-w-[150px]",
      render: (value, row) => (
        value ? (
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-gray-500" />
            <span className="font-mono text-xs">{value}</span>
          </div>
        ) : (
          <span className="text-gray-400 italic">Aucun IMEI</span>
        )
      )
    },
    {
      key: "status",
      header: "Statut",
      sortable: true,
      className: "w-[120px]",
      render: (value, row) => {
        const isAssociated = row.isAssociated || row.type === "vehicle" && row.imei;
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isAssociated 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {isAssociated ? "Associé" : "Libre"}
          </span>
        );
      }
    },
    {
      key: "telephone",
      header: "Téléphone",
      sortable: true,
      className: "min-w-[120px]",
      render: (value) => (
        value ? (
          <span className="font-mono text-sm">{value}</span>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        )
      )
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[150px]",
      render: (value, row) => (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedItem(row);
              setShowEditVehicleDialog(true);
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedDevice(row);
              setShowAssociateSheet(true);
            }}
          >
            <Link className="h-3 w-3" />
          </Button>
        </div>
      )
    }
  ], []);

  // ============= COMPUTED VALUES =============

  const displayData = isSearchActive ? filteredData : combinedData;
  const totalDisplayed = displayData?.length || 0;

  // ============= RENDER =============

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Véhicules & Boîtiers</h1>
          <p className="text-gray-600 mt-1">
            Gestion optimisée avec recherche instantanée
            {isSearchActive && (
              <span className="ml-2 text-blue-600 font-medium">
                • {searchStats.total} résultats en {searchStats.time.toFixed(1)}ms
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCurrentView} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Rafraîchir
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-between">
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
      </div>

      {/* ============= SEARCH INTERFACE OPTIMISÉE ============= */}
      
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Recherche Optimisée
          </h2>
          <div className="flex gap-2">
            <Button
              variant={searchMode === 'simple' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSearchMode('simple');
                setShowAdvancedSearch(false);
              }}
            >
              Recherche Simple
            </Button>
            <Button
              variant={searchMode === 'advanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSearchMode('advanced');
                setShowAdvancedSearch(true);
              }}
            >
              <Filter className="h-4 w-4 mr-1" />
              Recherche Avancée
            </Button>
            {isSearchActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllSearch}
              >
                <SearchX className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Simple Search */}
        {searchMode === 'simple' && (
          <div className="space-y-2">
            <Label htmlFor="simple-search">Recherche Globale</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="simple-search"
                placeholder="Rechercher par IMEI, immatriculation, entreprise, téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">
              Recherche instantanée dès 2 caractères • Recherche floue activée
            </p>
          </div>
        )}

        {/* Advanced Search */}
        {searchMode === 'advanced' && showAdvancedSearch && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'imei', label: 'IMEI', placeholder: 'Ex: 350612071728933' },
              { key: 'immatriculation', label: 'Immatriculation', placeholder: 'Ex: AA-123-BB' },
              { key: 'entreprise', label: 'Entreprise', placeholder: 'Nom de l\'entreprise' },
              { key: 'telephone', label: 'Téléphone/SIM', placeholder: 'Numéro de téléphone' }
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2 relative">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  placeholder={placeholder}
                  value={advancedSearch[key]}
                  onChange={(e) => handleAdvancedSearchChange(key, e.target.value)}
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

      {/* ============= SPECIALIZED SEARCH BUTTONS ============= */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">🚗 Véhicules sans boîtiers</h3>
          <p className="text-xs text-gray-600 mb-3">Recherche optimisée avec cache intelligent</p>
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
          <p className="text-xs text-gray-600 mb-3">Chargement direct optimisé</p>
          <Button 
            variant="outline" 
            onClick={searchDevicesWithoutVehiclesOptimized} 
            className="w-full bg-green-50 border-green-300 hover:bg-green-100" 
            disabled={loading}
          >
            <Wifi className="h-4 w-4 mr-2" />
            Boîtiers libres
          </Button>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Véhicules sans IMEI</h3>
          <p className="text-xs text-gray-600 mb-3">Affichage progressif des résultats</p>
          <Button 
            variant="outline" 
            onClick={searchVehiclesWithEmptyImeiOptimized} 
            className="w-full bg-orange-50 border-orange-300 hover:bg-orange-100" 
            disabled={loading}
          >
            <Database className="h-4 w-4 mr-2" />
            Sans IMEI
          </Button>
        </div>
      </div>

      {/* ============= DATA TABLE ============= */}
      
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                {isSearchActive ? 'Résultats de recherche' : 'Tous les véhicules et boîtiers'}
              </h3>
              <p className="text-sm text-gray-600">
                {totalDisplayed} élément(s) affiché(s)
                {isSearchActive && searchStats.time > 0 && (
                  <span className="ml-2 text-blue-600">
                    • Temps de recherche: {searchStats.time.toFixed(1)}ms
                  </span>
                )}
              </p>
            </div>
            
            {isSearchActive && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Search className="h-4 w-4" />
                <span>Mode recherche actif</span>
              </div>
            )}
          </div>
        </div>
        
        <EnhancedDataTable
          data={displayData || []}
          columns={columns}
          loading={loading}
          emptyMessage={
            isSearchActive 
              ? "Aucun résultat trouvé pour cette recherche"
              : "Aucune donnée disponible"
          }
          className="min-h-[400px]"
        />
      </div>

      {/* ============= DIALOGS (keep existing ones) ============= */}
      
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
          setIsSearchActive(true);
          setShowMultipleImeiDialog(false);
        }}
      />

      {/* Debug Panels */}
      <CacheDebugPanel />
      <ImeiDiagnosticPanel />
    </div>
  );
}