import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet, Search, Edit, Link, Car, Wifi, Upload, Database, ArrowLeft, Smartphone, Building } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import * as CompanyDeviceService from "@/services/CompanyDeviceService";
import { useDataRefresh } from "@/hooks/useDataRefresh";
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
    // OPTIMIZED: New specialized functions
    getVehiclesWithoutDevices,
    getVehiclesWithEmptyImei,
    getDevicesWithoutVehicles,
    getUnassociatedItemsStats
  } = useCompanyVehicleDevice();

  // Local state for filtered data when using search
  const [filteredData, setFilteredData] = useState([]);

  // Dialog states
  const [showAssociateSheet, setShowAssociateSheet] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [associationMode, setAssociationMode] = useState<'vehicle-device' | 'company-device'>('vehicle-device');
  const [showMultipleImeiDialog, setShowMultipleImeiDialog] = useState(false);
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);
  const [showImportDevicesDialog, setShowImportDevicesDialog] = useState(false);
  const [showEditVehicleDialog, setShowEditVehicleDialog] = useState(false);
  const [showAddDeviceWithVehicleDialog, setShowAddDeviceWithVehicleDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Search states
  const [searchImei, setSearchImei] = useState('');
  const [searchImmat, setSearchImmat] = useState('');
  const [searchEntreprise, setSearchEntreprise] = useState('');
  const [searchVehiclesWithoutImei, setSearchVehiclesWithoutImei] = useState(false);

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

  // OPTIMIZED: Search vehicles with empty IMEI with progressive display
  const searchVehiclesWithEmptyImeiOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: VEHICLES WITH EMPTY IMEI ===');
      setFilteredData([]); // Clear previous results
      setLoadingMode('search');
      
      // Progress callback to update results as they come in
      const onProgressUpdate = (progressResults) => {
        console.log(`Progress update: ${progressResults.length} vehicles so far`);
        setFilteredData([...progressResults]); // Update the display
      };
      
      const vehiclesWithEmptyImei = await getVehiclesWithEmptyImei(onProgressUpdate);
      setFilteredData(vehiclesWithEmptyImei); // Final update
    } catch (error) {
      console.error('Error searching vehicles with empty IMEI:', error);
    }
  };

  // OPTIMIZED: Search vehicles without devices - no cache loading needed
  const searchVehiclesWithoutDevicesOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: VEHICLES WITHOUT DEVICES ===');
      const vehiclesWithoutDevices = await getVehiclesWithoutDevices();
      setFilteredData(vehiclesWithoutDevices);
      setLoadingMode('search');
    } catch (error) {
      console.error('Error searching vehicles without devices:', error);
    }
  };

  // OPTIMIZED: Search devices without vehicles - no cache loading needed  
  const searchDevicesWithoutVehiclesOptimized = async () => {
    try {
      console.log('=== OPTIMIZED SEARCH: DEVICES WITHOUT VEHICLES ===');
      const devicesWithoutVehicles = await getDevicesWithoutVehicles();
      setFilteredData(devicesWithoutVehicles);
      setLoadingMode('search');
    } catch (error) {
      console.error('Error searching devices without vehicles:', error);
    }
  };

  // Search for company reserved devices
  const searchCompanyReservedDevices = async () => {
    try {
      console.log('=== SEARCH: COMPANY RESERVED DEVICES ===');
      const unassignedDevices = await CompanyDeviceService.getUnassignedDevices();
      // Filter for devices that are actually reserved by companies (future enhancement)
      const reservedDevices = unassignedDevices.filter(device => device.status === 'company_reserved');
      setFilteredData(reservedDevices);
      setLoadingMode('search');
    } catch (error) {
      console.error('Error searching company reserved devices:', error);
    }
  };

  // FALLBACK: Search vehicles without IMEI using cached data (for compatibility)
  const searchVehiclesWithoutImeiFunction = () => {
    console.log('=== FALLBACK SEARCH: VEHICLES WITHOUT IMEI (CACHED) ===');
    const vehiclesWithoutImei = combinedData.filter(item => item.type === "vehicle" && (!item.imei || item.imei === "") && (!item.vehicleDeviceImei || item.vehicleDeviceImei === ""));
    console.log('Vehicles without IMEI found:', vehiclesWithoutImei.length);
    setFilteredData(vehiclesWithoutImei);
    toast({
      title: "Recherche réussie",
      description: `${vehiclesWithoutImei.length} véhicule(s) sans IMEI trouvé(s)`
    });
  };

  // Search vehicles with filters
  const searchVehicles = async () => {
    if (searchVehiclesWithoutImei) {
      searchVehiclesWithoutImeiFunction();
      return;
    }
    if (!searchImei && !searchImmat && !searchEntreprise) {
      toast({
        title: "Attention",
        description: "Veuillez saisir au moins un critère de recherche",
        variant: "destructive"
      });
      return;
    }
    console.log('=== SEARCH INITIATED ===');
    console.log('Search criteria:', {
      searchImei,
      searchImmat,
      searchEntreprise
    });
    console.log('Available data in hook:', {
      combinedDataLength: combinedData.length,
      companiesLength: companies.length
    });
    try {
      // Determine search type based on how many criteria are filled
      const filledCriteria = [searchImei, searchImmat, searchEntreprise].filter(Boolean);
      let results;
      if (filledCriteria.length === 1) {
        // Single criteria search - use specific functions with optimized caching
        if (searchImei) {
          console.log('Single IMEI search for:', searchImei);
          results = await searchByImei(searchImei);
        } else if (searchImmat) {
          console.log('Single vehicle search for:', searchImmat);
          results = await searchByVehicle(searchImmat);
        } else if (searchEntreprise) {
          console.log('Single company search for:', searchEntreprise);
          console.log('Company search term:', searchEntreprise);
          // The searchByCompany function will now use cached data automatically
          results = await searchByCompany(searchEntreprise);
        }
      } else {
        // Multiple criteria search - use combined search
        console.log('Multiple criteria search');
        results = await searchDevices({
          imei: searchImei,
          immatriculation: searchImmat,
          entreprise: searchEntreprise
        });
      }
      console.log('Search results received:', results?.length || 0);
      console.log('First 3 results:', results?.slice(0, 3).map(r => ({
        entreprise: r.entreprise,
        imei: r.imei,
        type: r.type,
        immatriculation: r.immatriculation
      })));
      setFilteredData(results || []);

      // Store current filters for refresh after operations
      setCurrentFilters({
        imei: searchImei,
        immatriculation: searchImmat,
        entreprise: searchEntreprise
      });
      if (!results || results.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucun véhicule ou boîtier trouvé avec ces critères",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Recherche réussie",
          description: `${results.length} résultat(s) trouvé(s)`
        });
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche",
        variant: "destructive"
      });
      setFilteredData([]);
    }
  };

  // Reset search
  const resetSearch = () => {
    setSearchImei('');
    setSearchImmat('');
    setSearchEntreprise('');
    setSearchVehiclesWithoutImei(false);
    setFilteredData([]);
    setCurrentFilters({});
    resetFilters();
  };

  // Update or create vehicle - CORRECTED LOGIC
  const updateVehicleData = async data => {
    try {
      console.log('=== UPDATING/CREATING VEHICLE (CORRECTED) ===');
      console.log('Data received:', data);

      // Map entreprise to companyVehiclesId if needed
      const mappedData = {
        ...data
      };
      if (data.entreprise && !data.companyVehiclesId) {
        const company = companies.find(c => c.name === data.entreprise);
        if (company) {
          mappedData.companyVehiclesId = company.id;
          console.log('Mapped entreprise to companyVehiclesId:', data.entreprise, '→', company.id);
        } else {
          throw new Error(`Entreprise "${data.entreprise}" non trouvée`);
        }
      }

      // Use the corrected create or update function
      const {
        createOrUpdateVehicleSimple
      } = await import('../services/SimpleVehicleService.js');
      await createOrUpdateVehicleSimple(mappedData);
      toast({
        title: "Succès",
        description: "Véhicule traité avec succès"
      });

      // Reload data
      await loadAllData();
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
  const dissociateDevice = async vehicleImmat => {
    try {
      await dissociateVehicleFromDevice(vehicleImmat);
      await refreshAfterDissociation("Boîtier dissocié avec succès");
    } catch (err) {
      console.error('Error dissociating device:', err);
      toast({
        title: "Erreur",
        description: "Erreur lors de la dissociation",
        variant: "destructive"
      });
    }
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
          results.push({
            immat,
            success: true
          });
        } catch (error) {
          console.error(`Error dissociating ${immat}:`, error);
          errors.push({
            immat,
            error: error.message
          });
        }
      }
      console.log('Bulk dissociation completed:', {
        successful: results.length,
        failed: errors.length
      });
      if (errors.length === 0) {
        toast({
          title: "Succès",
          description: `${results.length} véhicule(s) dissocié(s) avec succès`
        });
      } else {
        toast({
          title: "Partiellement réussi",
          description: `${results.length} réussi(s), ${errors.length} échec(s)`,
          variant: "default"
        });
      }
      setSelectedVehicles([]);
      setIsSelectMode(false);
      await refreshAfterDissociation(`${results.length} véhicule(s) dissocié(s) avec succès`);
    } catch (err) {
      console.error('Error bulk dissociating:', err);
      toast({
        title: "Erreur",
        description: "Erreur lors de la dissociation multiple",
        variant: "destructive"
      });
    }
  };

  // Toggle select mode
  const toggleSelectMode = () => {
    const newSelectMode = !isSelectMode;
    setIsSelectMode(newSelectMode);
    setSelectedVehicles([]);
    
    // If turning on vehicle select mode, turn off device select mode
    if (newSelectMode && isDeviceSelectMode) {
      setIsDeviceSelectMode(false);
      setSelectedDevices([]);
    }
  };

  // Toggle device select mode
  const toggleDeviceSelectMode = () => {
    const newDeviceSelectMode = !isDeviceSelectMode;
    setIsDeviceSelectMode(newDeviceSelectMode);
    setSelectedDevices([]);
    
    // If turning on device select mode, turn off vehicle select mode
    if (newDeviceSelectMode && isSelectMode) {
      setIsSelectMode(false);
      setSelectedVehicles([]);
    }
  };

  // Get available devices for selection (only unassociated devices)
  const getAvailableDevices = () => {
    const currentData = filteredData.length > 0 ? filteredData : combinedData;
    return currentData.filter(item => 
      item.type === "device" && 
      item.imei && 
      !item.isAssociated
    );
  };

  // Handle device selection
  const handleDeviceSelect = (imei, isSelected) => {
    if (isSelected) {
      // Prevent duplicates
      setSelectedDevices(prev => 
        prev.includes(imei) ? prev : [...prev, imei]
      );
    } else {
      setSelectedDevices(prev => prev.filter(id => id !== imei));
    }
  };

  // Select all available devices
  const selectAllDevices = () => {
    const availableDevices = getAvailableDevices();
    setSelectedDevices(availableDevices.map(device => device.imei));
  };

  // Deselect all devices
  const deselectAllDevices = () => {
    setSelectedDevices([]);
  };

  // Handle bulk association of selected devices
  const handleBulkAssociateDevices = () => {
    if (selectedDevices.length === 0) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner au moins un boîtier",
        variant: "destructive"
      });
      return;
    }

    const devicesData = selectedDevices.map(imei => 
      filteredData.find(item => item.imei === imei) || 
      combinedData.find(item => item.imei === imei)
    ).filter(Boolean);
    
    console.log('=== BULK ASSOCIATION: SELECTED DEVICES ===');
    console.log('Selected IMEIs:', selectedDevices);
    console.log('Devices data for association:', devicesData);
    
    setShowBulkAssociation(true);
    // Stocker les données des devices sélectionnés pour l'association
    setFilteredData(devicesData);
  };

  // Handle vehicle selection
  const handleVehicleSelect = (immat, isSelected) => {
    if (isSelected) {
      // Prevent duplicates
      setSelectedVehicles(prev => 
        prev.includes(immat) ? prev : [...prev, immat]
      );
    } else {
      setSelectedVehicles(prev => prev.filter(id => id !== immat));
    }
  };

  // Define columns for the table with enhanced device information
  const allColumns = [...(isSelectMode ? [{
    id: "select",
    label: "Sélection",
    sortable: false,
    visible: true,
    renderCell: (value, row) => {
      // Only show checkbox for vehicles with associated devices
      if (row.type === "vehicle" && row.imei && row.isAssociated) {
        const isSelected = selectedVehicles.includes(row.immatriculation || row.immat);
        return (
          <div className="flex justify-center">
            <input 
              type="checkbox" 
              checked={isSelected}
              onChange={e => handleVehicleSelect(row.immatriculation || row.immat, e.target.checked)} 
              className="h-4 w-4 accent-blue-600 cursor-pointer"
            />
          </div>
        );
      }
      return null;
    }
  }] : []), ...(isDeviceSelectMode ? [{
    id: "deviceSelect",
    label: "Sélection Boîtiers",
    sortable: false,
    visible: true,
    renderCell: (value, row) => {
      // Only show checkbox for unassociated devices (available for association)
      if (row.type === "device" && row.imei && !row.isAssociated) {
        const isSelected = selectedDevices.includes(row.imei);
        return (
          <div className="flex justify-center">
            <input 
              type="checkbox" 
              checked={isSelected}
              onChange={e => handleDeviceSelect(row.imei, e.target.checked)} 
              className="h-4 w-4 accent-green-600 cursor-pointer"
            />
          </div>
        );
      }
      return null;
    }
  }] : []), {
    id: "immatriculation",
    label: "Immatriculation",
    sortable: true,
    visible: true,
    renderCell: (value, row) => <div className="flex items-center gap-2">
          {row.type === "vehicle" ? <Car className="h-4 w-4 text-blue-500" /> : <Wifi className="h-4 w-4 text-green-500" />}
          <div className="flex flex-col">
            <span className={!value ? "text-gray-400 italic" : "font-medium"}>
              {value || (row.type === "vehicle" ? "Pas d'immatriculation" : "Boîtier non assigné")}
            </span>
            {row.type === "vehicle" && row.nomVehicule && <span className="text-xs text-gray-500">{row.nomVehicule}</span>}
          </div>
        </div>
  }, {
    id: "entreprise",
    label: "Entreprise",
    sortable: true,
    visible: true,
    renderCell: (value, row) => <div className="flex flex-col">
          <span className={row.type === "vehicle" ? "text-blue-600 font-medium" : row.isAssociated ? "text-gray-900" : "text-green-600 font-medium"}>
            {value || "Entreprise non définie"}
          </span>
          {row.type === "device" && <span className="text-xs text-gray-500">
              {row.isAssociated ? "Boîtier assigné" : "Boîtier disponible"}
            </span>}
        </div>
  }, {
    id: "nomVehicule",
    label: "Nom Véhicule",
    sortable: true,
    visible: true
  }, {
    id: "imei",
    label: "IMEI",
    sortable: true,
    visible: true,
    renderCell: (value, row) => <span className={!value ? "text-gray-400 italic" : "text-gray-900"}>
          {value || "Non assigné"}
        </span>
  }, {
    id: "typeBoitier",
    label: "Protocol ID",
    sortable: true,
    visible: true,
    renderCell: (value, row) => <div className="flex flex-col">
          <span className="font-medium">
            {value ? `Protocol: ${value}` : "Aucun protocole"}
          </span>
          {row.deviceData && <span className="text-xs text-gray-500">
              {row.isAssociated ? "Associé" : "Disponible"}
            </span>}
        </div>
  }, {
    id: "emplacement",
    label: "Emplacement",
    sortable: true,
    visible: true
  }, {
    id: "marque",
    label: "Marque",
    sortable: true,
    visible: false
  }, {
    id: "modele",
    label: "Modèle",
    sortable: true,
    visible: false
  }, {
    id: "kilometrage",
    label: "Kilométrage",
    sortable: true,
    visible: false
  }, {
    id: "telephone",
    label: "SIM",
    sortable: true,
    visible: true,
    renderCell: value => <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Pas de SIM"}
        </span>
  }, {
    id: "statut",
    label: "Statut",
    sortable: true,
    visible: true,
    renderCell: (value, row) => {
      // Determine device status based on type and associations
      let status = "Inconnu";
      let badgeClass = "bg-gray-100 text-gray-800";
      if (row.type === "device") {
        // For devices, determine status based on company association and vehicle association
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
        // For vehicles, show association status
        if (row.imei && row.isAssociated) {
          status = "Avec boîtier";
          badgeClass = "bg-blue-100 text-blue-800";
        } else {
          status = "Sans boîtier";
          badgeClass = "bg-gray-100 text-gray-800";
        }
      }
      return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
            {status}
          </span>;
    }
  }];
  const handleEdit = item => {
    setSelectedItem(item);
    setShowEditVehicleDialog(true);
  };
  const handleAssociate = item => {
    console.log('=== HANDLE ASSOCIATE ===');
    console.log('Item to associate:', item);

    // Can associate either a device to a vehicle or a vehicle to a device
    if (item.type === "device") {
      console.log('Associating device to vehicle mode');
      setSelectedDevice(item);
    } else {
      console.log('Associating vehicle to device mode');
      // For vehicle, create a device-like object for the form
      setSelectedDevice({
        ...item,
        type: "vehicle",
        vehicleImmat: item.immatriculation || item.immat
      });
    }
    setAssociationMode('vehicle-device');
    setShowAssociateSheet(true);
  };
  const handleCompanyDeviceAssociation = () => {
    setSelectedDevice(null);
    setAssociationMode('company-device');
    setShowAssociateSheet(true);
  };
  const handleSaveEdit = updatedItem => {
    updateVehicleData(updatedItem);
    setShowEditVehicleDialog(false);
    setSelectedItem(null);
  };

  // Initial view component
  const InitialView = () => <div className="space-y-8 p-8 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Véhicules & Dispositifs</h1>
        <p className="text-muted-foreground">Choisissez une action pour commencer</p>
      </div>

      {quickStats && <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{quickStats.totalVehicles}</div>
            <div className="text-sm text-muted-foreground">Véhicules</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{quickStats.totalDevices}</div>
            <div className="text-sm text-muted-foreground">Dispositifs</div>
          </div>
        </div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Button onClick={() => searchVehiclesWithEmptyImeiOptimized()} variant="outline" className="h-20 text-left flex flex-col items-start justify-center p-4" disabled={loading}>
          <Car className="h-6 w-6 mb-2" />
          <div>
            <div className="font-medium">Véhicules sans IMEI</div>
            <div className="text-sm text-muted-foreground">Voir les véhicules avec IMEI vide</div>
          </div>
        </Button>

        <Button onClick={() => {
        searchDevicesWithoutVehiclesOptimized();
        setShowBulkAssociation(true);
      }} variant="outline" className="h-20 text-left flex flex-col items-start justify-center p-4" disabled={loading}>
          <Smartphone className="h-6 w-6 mb-2" />
          <div>
            <div className="font-medium">Dispositifs libres</div>
            <div className="text-sm text-muted-foreground">Voir et associer en masse</div>
          </div>
        </Button>

        <Button onClick={() => setLoadingMode('search')} variant="outline" className="h-20 text-left flex flex-col items-start justify-center p-4">
          <Search className="h-6 w-6 mb-2" />
          <div>
            <div className="font-medium">Rechercher</div>
            <div className="text-sm text-muted-foreground">Recherche par critères</div>
          </div>
        </Button>

        <Button onClick={() => loadAllData('optimized')} variant="outline" className="h-20 text-left flex flex-col items-start justify-center p-4" disabled={loading}>
          <Database className="h-6 w-6 mb-2" />
          <div>
            <div className="font-medium">Charger tout (Optimisé)</div>
            <div className="text-sm text-muted-foreground">Nouvelle requête optimisée</div>
          </div>
        </Button>
      </div>

      <div className="flex gap-2 justify-center">
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
    </div>;
  if (loading) {
    return <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>;
  }

  // Show initial view when no specific mode is active
  if (loadingMode === 'initial') {
    return <div className="space-y-6">
        <InitialView />
        
        {/* Dialogs for initial view */}
        <Dialog open={showAddVehicleDialog} onOpenChange={setShowAddVehicleDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Ajouter un Véhicule</DialogTitle>
            </DialogHeader>
            <AddVehicleForm onClose={() => setShowAddVehicleDialog(false)} onSave={async data => {
            await updateVehicleData(data);
            setShowAddVehicleDialog(false);
            loadQuickStats();
          }} />
          </DialogContent>
        </Dialog>

        <Dialog open={showImportDevicesDialog} onOpenChange={setShowImportDevicesDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Importer des Boîtiers</DialogTitle>
            </DialogHeader>
            <ImportDevicesForm onClose={() => {
            setShowImportDevicesDialog(false);
            loadQuickStats();
          }} />
          </DialogContent>
        </Dialog>

        <Dialog open={showAddDeviceWithVehicleDialog} onOpenChange={setShowAddDeviceWithVehicleDialog}>
          <DialogContent className="max-w-2xl">
            <AddDeviceWithVehicleForm onClose={() => setShowAddDeviceWithVehicleDialog(false)} onSuccess={devices => {
            setShowAddDeviceWithVehicleDialog(false);
            setFilteredData(devices);
            setLoadingMode('search');
            toast({
              title: "Succès",
              description: "Device et véhicule créés et associés avec succès"
            });
          }} />
          </DialogContent>
        </Dialog>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Véhicules & Dispositifs</h1>
          <Button variant="ghost" size="sm" onClick={() => setLoadingMode('initial')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
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
      
      {/* Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-2">IMEI</label>
          <input type="text" className="w-full p-2 border rounded" value={searchImei} onChange={e => setSearchImei(e.target.value)} placeholder="Rechercher par IMEI..." disabled={searchVehiclesWithoutImei} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Immatriculation</label>
          <input type="text" className="w-full p-2 border rounded" value={searchImmat} onChange={e => setSearchImmat(e.target.value)} placeholder="Rechercher par immatriculation..." disabled={searchVehiclesWithoutImei} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Entreprise</label>
          <CompanySearchSelect value={searchEntreprise} onValueChange={setSearchEntreprise} placeholder="Rechercher par entreprise..." searchFunction={searchCompaniesReal} disabled={searchVehiclesWithoutImei} />
        </div>
        <div>
          
          <div className="flex items-center space-x-2">
            
            
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button variant="outline" onClick={resetSearch}>
            Réinitialiser
          </Button>
          <Button onClick={searchVehicles}>
            Rechercher
          </Button>
        </div>
      </div>

      {/* OPTIMIZED: Specialized Filter Buttons - Direct API calls without cache loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">🚗 Véhicules sans boîtiers</h3>
          <p className="text-xs text-gray-600 mb-3">Recherche optimisée - Chargement direct sans cache</p>
          <Button variant="outline" onClick={searchVehiclesWithoutDevicesOptimized} className="w-full bg-blue-50 border-blue-300 hover:bg-blue-100" disabled={loading}>
            <Car className="h-4 w-4 mr-2" />
            Véhicules sans IMEI
          </Button>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-semibold text-green-700 mb-2">📡 Boîtiers libres</h3>
          <p className="text-xs text-gray-600 mb-3">Recherche optimisée - Chargement direct sans cache</p>
          <Button variant="outline" onClick={searchDevicesWithoutVehiclesOptimized} className="w-full bg-green-50 border-green-300 hover:bg-green-100" disabled={loading}>
            <Wifi className="h-4 w-4 mr-2" />
            Devices sans véhicules
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
          <p className="text-sm text-gray-600 mt-1">
            {combinedData.filter(item => item.type === "vehicle").length} véhicules • {" "}
            {combinedData.filter(item => item.type === "device" && item.isAssociated).length} boîtiers assignés • {" "}
            {combinedData.filter(item => item.type === "device" && !item.isAssociated).length} boîtiers disponibles
          </p>
          
          {/* Multi-select controls */}
          {isSelectMode && <div className="flex items-center gap-2 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium">
                Mode sélection véhicules: {selectedVehicles.length} véhicule(s) sélectionné(s)
              </span>
              {selectedVehicles.length > 0 && <Button size="sm" variant="destructive" onClick={bulkDissociateSelected}>
                  Dissocier la sélection ({selectedVehicles.length})
                </Button>}
              <Button size="sm" variant="outline" onClick={toggleSelectMode}>
                Annuler
              </Button>
            </div>}
            
          {/* Multi-select controls for devices */}
          {isDeviceSelectMode && <div className="flex items-center gap-2 mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm text-green-700 font-medium">
                Mode sélection boîtiers: {selectedDevices.length} boîtier(s) sélectionné(s) / {getAvailableDevices().length} disponible(s)
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={selectAllDevices} disabled={getAvailableDevices().length === 0}>
                  Tout sélectionner
                </Button>
                {selectedDevices.length > 0 && <Button size="sm" variant="ghost" onClick={deselectAllDevices}>
                    Tout désélectionner
                  </Button>}
                {selectedDevices.length > 0 && <Button size="sm" variant="default" onClick={handleBulkAssociateDevices}>
                    Associer la sélection ({selectedDevices.length})
                  </Button>}
              </div>
              <Button size="sm" variant="outline" onClick={toggleDeviceSelectMode}>
                Annuler
              </Button>
            </div>}
        </div>
        
        {/* Action buttons - Always visible and prominent */}
        <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:gap-2 lg:min-w-[200px]">
          <Button 
            variant={isSelectMode ? "default" : "outline"} 
            onClick={toggleSelectMode}
            className={isSelectMode ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:bg-blue-50"}
          >
            {isSelectMode ? "✓ Mode sélection véhicules" : "Sélectionner véhicules"}
          </Button>
          <Button 
            variant={isDeviceSelectMode ? "default" : "outline"} 
            onClick={toggleDeviceSelectMode}
            className={isDeviceSelectMode ? "bg-green-600 text-white" : "border-green-600 text-green-600 hover:bg-green-50"}
          >
            {isDeviceSelectMode ? "✓ Mode sélection boîtiers" : "Sélectionner boîtiers"}
          </Button>
          
          <Dialog open={showAddVehicleDialog} onOpenChange={setShowAddVehicleDialog}>
            <DialogTrigger asChild>
              
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un Véhicule</DialogTitle>
              </DialogHeader>
              <AddVehicleForm onClose={() => setShowAddVehicleDialog(false)} onSave={async data => {
              await updateVehicleData(data);
              setShowAddVehicleDialog(false);
            }} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAddDeviceWithVehicleDialog} onOpenChange={setShowAddDeviceWithVehicleDialog}>
            <DialogTrigger asChild>
              
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <AddDeviceWithVehicleForm onClose={() => setShowAddDeviceWithVehicleDialog(false)} onSuccess={devices => {
              setShowAddDeviceWithVehicleDialog(false);
              setFilteredData(devices);
              setLoadingMode('search');
              toast({
                title: "Succès",
                description: "Device et véhicule créés et associés avec succès"
              });
            }} />
            </DialogContent>
          </Dialog>

          <Dialog open={showImportDevicesDialog} onOpenChange={setShowImportDevicesDialog}>
            <DialogTrigger asChild>
              
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Importer des Boîtiers</DialogTitle>
              </DialogHeader>
              <ImportDevicesForm onClose={() => setShowImportDevicesDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Interface d'association en masse pour boîtiers sélectionnés */}
      {showBulkAssociation && filteredData.length > 0 && <div className="mb-6">
          <DevicesBulkAssociation 
            devices={filteredData.filter(device => device.type === "device")} 
            onAssociationComplete={() => {
              // Fermer l'interface d'association
              setShowBulkAssociation(false);
              // Réinitialiser les sélections
              setSelectedDevices([]);
              setIsDeviceSelectMode(false);
              // Rafraîchir les données
              loadAllData();
              toast({
                title: "Association réussie",
                description: "Boîtiers associés avec succès"
              });
            }} 
          />
        </div>}

      {/* Interface d'association en masse pour boîtiers sans IMEI */}
      {!showBulkAssociation && filteredData.some(device => device.type === "device" && (!device.imei || device.imei === "")) && <div className="mb-6">
          <DevicesBulkAssociation devices={filteredData.filter(device => device.type === "device" && (!device.imei || device.imei === ""))} onAssociationComplete={() => {
        searchDevicesWithoutVehiclesOptimized();
        toast({
          title: "Mise à jour",
          description: "Liste des boîtiers actualisée"
        });
      }} />
        </div>}

      <EnhancedDataTable 
        columns={allColumns} 
        data={filteredData.length > 0 ? filteredData : combinedData} 
        onEdit={handleEdit} 
        selectedVehicles={selectedVehicles}
        selectedDevices={selectedDevices}
        isSelectMode={isSelectMode}
        isDeviceSelectMode={isDeviceSelectMode}
        renderActions={item => <div className="flex gap-1">
            {/* Edit button - shown for all vehicles */}
            {item.type === "vehicle" && <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} title="Modifier ce véhicule">
              <Edit className="h-4 w-4" />
            </Button>}
            
            {/* Delete button - shown for all vehicles */}
            {item.type === "vehicle" && <DeleteConfirmationDialog title="Supprimer le véhicule" description={`Êtes-vous sûr de vouloir supprimer le véhicule "${item.immatriculation || item.immat}" ? Cette action est irréversible.`} onConfirm={() => deleteVehicleDataLocal(item)} />}
            
            {/* Association button for free devices (device-vehicle association) */}
            {item.type === "device" && !item.isAssociated && item.entreprise === "Boîtier libre"}
            
            {/* Reserve button for free devices (company-device association) */}
            {item.type === "device" && !item.isAssociated && item.entreprise === "Boîtier libre" && <Button variant="ghost" size="icon" onClick={() => {
        setSelectedDevice(item);
        setAssociationMode('company-device');
        setShowAssociateSheet(true);
      }} title="Réserver ce boîtier pour une entreprise">
                <Building className="h-4 w-4" />
              </Button>}
            
            {/* Association button for vehicles without device - IMPROVED for vehicles without IMEI */}
            {item.type === "vehicle" && (!item.imei || item.imei === "" || !item.vehicleDeviceImei || item.vehicleDeviceImei === "" || !item.isAssociated) && <Button variant="ghost" size="icon" onClick={() => handleAssociate(item)} title="Associer un boîtier à ce véhicule">
                <Link className="h-4 w-4" />
              </Button>}
            
            {/* Dissociation button for associated vehicles */}
            {item.type === "vehicle" && (item.imei || item.vehicleDeviceImei) && item.isAssociated && !isSelectMode && <Button variant="ghost" size="icon" onClick={() => dissociateDevice(item.immatriculation || item.immat)} title="Dissocier le boîtier de ce véhicule" className="text-orange-600 hover:text-orange-700">
                <Link className="h-4 w-4" />
              </Button>}
          </div>} loading={loading} enablePagination={true} defaultItemsPerPage={50} />

      {/* Keep existing dialogs and sheets */}
      <Sheet open={showAssociateSheet} onOpenChange={setShowAssociateSheet}>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Associer un Véhicule</SheetTitle>
          </SheetHeader>
          <AssociateVehicleForm device={selectedDevice} mode={associationMode} onClose={() => setShowAssociateSheet(false)} onSuccess={async () => {
          const successMessage = associationMode === 'company-device' ? "Le boîtier a été réservé pour l'entreprise avec succès" : "Le boîtier a été associé au véhicule avec succès";
          setShowAssociateSheet(false);
          setAssociationMode('vehicle-device');

          // Use refresh hook to automatically update table
          await refreshAfterAssociation(successMessage);
        }} />
        </SheetContent>
      </Sheet>

      <MultipleImeiSearchDialog open={showMultipleImeiDialog} onOpenChange={setShowMultipleImeiDialog} data={combinedData} onUpdate={(devices, newCompany) => {
      const updatedData = [...combinedData];
      devices.forEach(selectedDevice => {
        const index = updatedData.findIndex(item => item.imei === selectedDevice.imei);
        if (index !== -1) {
          updatedData[index] = {
            ...updatedData[index],
            entreprise: newCompany
          };
        }
      });
      toast({
        description: `${devices.length} boîtier(s) modifié(s) avec succès`
      });
      setShowMultipleImeiDialog(false);
    }} />

      <Dialog open={showEditVehicleDialog} onOpenChange={setShowEditVehicleDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === "vehicle" ? "Modifier le véhicule" : "Modifier le boîtier"}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && <AddVehicleForm initialData={selectedItem} onClose={() => setShowEditVehicleDialog(false)} onSave={handleSaveEdit} isEditing={true} />}
        </DialogContent>
      </Dialog>
    </div>;
}