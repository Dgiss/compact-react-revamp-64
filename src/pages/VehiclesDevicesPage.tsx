
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet, Search, Edit, Link, Car, Wifi } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddVehicleForm from "@/components/forms/AddVehicleForm";
import ImportDevicesForm from "@/components/forms/ImportDevicesForm";
import AssociateVehicleForm from "@/components/forms/AssociateVehicleForm";
import { toast } from "@/components/ui/use-toast";
import { MultipleImeiSearchDialog } from "@/components/dialogs/MultipleImeiSearchDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import * as VehicleService from "@/services/VehicleService";

export default function VehiclesDevicesPage() {
  const {
    companies,
    devices: combinedData,
    loading,
    loadAllData,
    searchDevices,
    searchByImei,
    searchBySim,
    searchByVehicle,
    searchByCompany,
    resetFilters,
    isFiltered,
    totalResults
  } = useCompanyVehicleDevice();
  
  // Local state for filtered data when using search
  const [filteredData, setFilteredData] = useState([]);
  
  // Dialog states
  const [showAssociateSheet, setShowAssociateSheet] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showMultipleImeiDialog, setShowMultipleImeiDialog] = useState(false);
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);
  const [showImportDevicesDialog, setShowImportDevicesDialog] = useState(false);
  const [showEditVehicleDialog, setShowEditVehicleDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Search states
  const [searchImei, setSearchImei] = useState('');
  const [searchImmat, setSearchImmat] = useState('');
  const [searchEntreprise, setSearchEntreprise] = useState('');

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Search vehicles with filters
  const searchVehicles = async () => {
    if (!searchImei && !searchImmat && !searchEntreprise) {
      toast({
        title: "Attention",
        description: "Veuillez saisir au moins un critère de recherche",
        variant: "destructive",
      });
      return;
    }

    console.log('=== SEARCH INITIATED ===');
    console.log('Search criteria:', { searchImei, searchImmat, searchEntreprise });
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
      
      if (!results || results.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucun véhicule ou boîtier trouvé avec ces critères",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Recherche réussie",
          description: `${results.length} résultat(s) trouvé(s)`,
        });
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche",
        variant: "destructive",
      });
      setFilteredData([]);
    }
  };

  // Reset search
  const resetSearch = () => {
    setSearchImei('');
    setSearchImmat('');
    setSearchEntreprise('');
    setFilteredData([]);
    resetFilters();
  };

  // Update or create vehicle
  const updateVehicleData = async (data) => {
    try {
      console.log('=== UPDATING/CREATING VEHICLE ===');
      console.log('Data received:', data);
      
      // Check if this is a new vehicle creation or an update
      const isNewVehicle = !data.immat && data.immatriculation;
      
      if (isNewVehicle) {
        // Create new vehicle
        await VehicleService.createVehicleData(data);
        toast({
          title: "Succès",
          description: "Véhicule créé avec succès",
        });
      } else {
        // Update existing vehicle
        await VehicleService.updateVehicleData(data);
        toast({
          title: "Succès",
          description: "Véhicule modifié avec succès",
        });
      }
      
      await loadAllData();
    } catch (err) {
      console.error('Error updating/creating vehicle:', err);
      toast({
        title: "Erreur",
        description: `Erreur lors de la ${data.immat ? 'modification' : 'création'}`,
        variant: "destructive",
      });
    }
  };

  // Delete vehicle
  const deleteVehicleData = async (item) => {
    try {
      await VehicleService.deleteVehicleData(item);

      toast({
        title: "Succès",
        description: "Véhicule supprimé avec succès",
      });
      
      await loadAllData();
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };


  // Define columns for the table with enhanced device information
  const allColumns = [
    { 
      id: "immatriculation", 
      label: "Immatriculation", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => (
        <div className="flex items-center gap-2">
          {row.type === "vehicle" ? (
            <Car className="h-4 w-4 text-blue-500" />
          ) : (
            <Wifi className="h-4 w-4 text-green-500" />
          )}
          <div className="flex flex-col">
            <span className={!value ? "text-gray-400 italic" : "font-medium"}>
              {value || (row.type === "vehicle" ? "Pas d'immatriculation" : "Boîtier non assigné")}
            </span>
            {row.type === "vehicle" && row.nomVehicule && (
              <span className="text-xs text-gray-500">{row.nomVehicule}</span>
            )}
          </div>
        </div>
      )
    },
    { 
      id: "entreprise", 
      label: "Entreprise", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => (
        <div className="flex flex-col">
          <span className={row.type === "vehicle" ? "text-blue-600 font-medium" : 
                          row.isAssociated ? "text-gray-900" : "text-green-600 font-medium"}>
            {value || "Entreprise non définie"}
          </span>
          {row.type === "device" && (
            <span className="text-xs text-gray-500">
              {row.isAssociated ? "Boîtier assigné" : "Boîtier disponible"}
            </span>
          )}
        </div>
      )
    },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true, visible: true },
    { id: "imei", label: "IMEI", sortable: true, visible: true },
    { 
      id: "typeBoitier", 
      label: "Protocol ID", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {value ? `Protocol: ${value}` : "Aucun protocole"}
          </span>
          {row.deviceData && (
            <span className="text-xs text-gray-500">
              {row.isAssociated ? "Associé" : "Disponible"}
            </span>
          )}
        </div>
      )
    },
    { id: "emplacement", label: "Emplacement", sortable: true, visible: true },
    { id: "marque", label: "Marque", sortable: true, visible: false },
    { id: "modele", label: "Modèle", sortable: true, visible: false },
    { id: "kilometrage", label: "Kilométrage", sortable: true, visible: false },
    { 
      id: "telephone", 
      label: "SIM", 
      sortable: true, 
      visible: true,
      renderCell: (value) => (
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Pas de SIM"}
        </span>
      )
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditVehicleDialog(true);
  };

  const handleAssociate = (device) => {
    setSelectedDevice(device);
    setShowAssociateSheet(true);
  };

  const handleSaveEdit = (updatedItem) => {
    updateVehicleData(updatedItem);
    setShowEditVehicleDialog(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement des véhicules et boîtiers...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-2">IMEI</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={searchImei}
            onChange={(e) => setSearchImei(e.target.value)}
            placeholder="Rechercher par IMEI..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Immatriculation</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={searchImmat}
            onChange={(e) => setSearchImmat(e.target.value)}
            placeholder="Rechercher par immatriculation..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Entreprise</label>
          <CompanySearchSelect 
            value={searchEntreprise}
            onValueChange={setSearchEntreprise}
            placeholder="Rechercher par entreprise..."
            searchFunction={searchCompaniesReal}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button 
            variant="outline"
            onClick={resetSearch}
          >
            Réinitialiser
          </Button>
          <Button 
            onClick={searchVehicles}
          >
            Rechercher
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
          <p className="text-sm text-gray-600 mt-1">
            {combinedData.filter(item => item.type === "vehicle").length} véhicules • {" "}
            {combinedData.filter(item => item.type === "device" && item.isAssociated).length} boîtiers assignés • {" "}
            {combinedData.filter(item => item.type === "device" && !item.isAssociated).length} boîtiers disponibles
          </p>
        </div>
        {/* Keep existing buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="default"
            onClick={() => setShowMultipleImeiDialog(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Recherche Multiple d'IMEI
          </Button>
          
          <Dialog open={showAddVehicleDialog} onOpenChange={setShowAddVehicleDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Véhicule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un Véhicule</DialogTitle>
              </DialogHeader>
              <AddVehicleForm 
                onClose={() => setShowAddVehicleDialog(false)} 
                onSave={async (data) => {
                  await updateVehicleData(data);
                  setShowAddVehicleDialog(false);
                }}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={showImportDevicesDialog} onOpenChange={setShowImportDevicesDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Importer des Boîtiers
              </Button>
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
      
      <EnhancedDataTable
        columns={allColumns}
        data={filteredData.length > 0 ? filteredData : combinedData}
        onEdit={handleEdit}
        renderActions={(item) => (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
              <Edit className="h-4 w-4" />
            </Button>
            <DeleteConfirmationDialog
              title="Supprimer le véhicule"
              description={`Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.`}
              onConfirm={() => deleteVehicleData(item)}
            />
            {item.type === "device" && (
              <Button variant="ghost" size="icon" onClick={() => handleAssociate(item)}>
                <Link className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        loading={loading}
        enablePagination={true}
        defaultItemsPerPage={50}
      />

      {/* Keep existing dialogs and sheets */}
      <Sheet open={showAssociateSheet} onOpenChange={setShowAssociateSheet}>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Associer un Véhicule</SheetTitle>
          </SheetHeader>
          <AssociateVehicleForm
            device={selectedDevice}
            onClose={() => setShowAssociateSheet(false)}
            onSuccess={async () => {
              toast({
                title: "Boîtier associé",
                description: "Le boîtier a été associé au véhicule avec succès"
              });
              setShowAssociateSheet(false);
              // Refresh data to show the new association
              await loadAllData();
            }}
          />
        </SheetContent>
      </Sheet>

      <MultipleImeiSearchDialog
        open={showMultipleImeiDialog}
        onOpenChange={setShowMultipleImeiDialog}
        data={combinedData}
        onUpdate={(devices, newCompany) => {
          const updatedData = [...combinedData];
          
          devices.forEach(selectedDevice => {
            const index = updatedData.findIndex(item => item.imei === selectedDevice.imei);
            if (index !== -1) {
              updatedData[index] = { ...updatedData[index], entreprise: newCompany };
            }
          });
          
          toast({
            description: `${devices.length} boîtier(s) modifié(s) avec succès`,
          });
          setShowMultipleImeiDialog(false);
        }}
      />

      <Dialog open={showEditVehicleDialog} onOpenChange={setShowEditVehicleDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === "vehicle" ? "Modifier le véhicule" : "Modifier le boîtier"}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <AddVehicleForm 
              initialData={selectedItem}
              onClose={() => setShowEditVehicleDialog(false)}
              onSave={handleSaveEdit}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
