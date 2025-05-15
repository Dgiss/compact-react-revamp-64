
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet, Search, Edit, Link } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import AddVehicleForm from "@/components/forms/AddVehicleForm";
import ImportDevicesForm from "@/components/forms/ImportDevicesForm";
import AssociateVehicleForm from "@/components/forms/AssociateVehicleForm";
import { toast } from "@/components/ui/use-toast";
import { MultipleImeiSearchDialog } from "@/components/dialogs/MultipleImeiSearchDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";

export default function VehiclesDevicesPage() {
  // Define vehicle and device data
  const vehicleData = [
    { 
      immatriculation: "GD 120 NK", 
      entreprise: "MBSC", 
      nomVehicule: "", 
      imei: "866854051690975", 
      typeBoitier: "GPS Tracker",
      marque: "Peugeot", 
      modele: "308", 
      kilometrage: "45000",
      telephone: "",
      emplacement: "Paris",
      type: "vehicle"
    },
    { 
      immatriculation: "EC 430 MQ", 
      entreprise: "PHENIX IDFTP", 
      nomVehicule: "", 
      imei: "864636066827169", 
      typeBoitier: "GPS Tracker",
      marque: "Renault", 
      modele: "Master", 
      kilometrage: "78000",
      telephone: "",
      emplacement: "Lyon",
      type: "vehicle"
    },
    { 
      immatriculation: "GY-861-SF", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "864454070312115", 
      typeBoitier: "GPS Tracker",
      marque: "Toyota", 
      modele: "Yaris", 
      kilometrage: "32000",
      telephone: "",
      emplacement: "Marseille",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-290-QC", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544508381053", 
      typeBoitier: "GPS Tracker",
      marque: "Citroën", 
      modele: "C3", 
      kilometrage: "28000",
      telephone: "",
      emplacement: "Toulouse",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-968-ZX", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544500701886", 
      typeBoitier: "GPS Tracker",
      marque: "Fiat", 
      modele: "Ducato", 
      kilometrage: "62000",
      telephone: "",
      emplacement: "Lille",
      type: "vehicle"
    },
  ];

  const deviceData = [
    { 
      imei: "862531040658404", 
      sim: "8933150520000591384", 
      typeBoitier: "GPS Simple",
      entreprise: "", 
      telephone: "0712345678",
      emplacement: "",
      type: "device"
    },
    { 
      imei: "862531040787807", 
      sim: "8933150520000763529", 
      typeBoitier: "GPS Avancé",
      entreprise: "", 
      telephone: "0723456789",
      emplacement: "",
      type: "device"
    },
    { 
      imei: "866795038741631", 
      sim: "8933150520001459950", 
      typeBoitier: "GPS Simple",
      entreprise: "MATTEI / HABICONFORT", 
      telephone: "0734567890",
      emplacement: "Bordeaux",
      type: "device"
    },
    { 
      imei: "350612070642820", 
      sim: "8933150520001427874",
      typeBoitier: "GPS Avancé", 
      entreprise: "ADANEV MOBILITES", 
      telephone: "0745678901",
      emplacement: "Nantes",
      type: "device"
    },
    { 
      imei: "862531040673056", 
      sim: "8933150520000623030", 
      typeBoitier: "GPS Simple",
      entreprise: "Kick Services", 
      telephone: "0756789012",
      emplacement: "Strasbourg",
      type: "device"
    },
  ];

  const [showAssociateSheet, setShowAssociateSheet] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showMultipleImeiDialog, setShowMultipleImeiDialog] = useState(false);
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);
  const [showImportDevicesDialog, setShowImportDevicesDialog] = useState(false);
  const [showEditVehicleDialog, setShowEditVehicleDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [combinedData, setCombinedData] = useState<any[]>([...vehicleData, ...deviceData]);

  // Define all possible columns
  const allColumns: Column[] = [
    { id: "immatriculation", label: "Immatriculation", sortable: true, visible: true },
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true, visible: true },
    { id: "imei", label: "IMEI", sortable: true, visible: true },
    { id: "typeBoitier", label: "Type de Boîtier", sortable: true, visible: true },
    { id: "emplacement", label: "Emplacement", sortable: true, visible: true },
    { id: "marque", label: "Marque", sortable: true, visible: false },
    { id: "modele", label: "Modèle", sortable: true, visible: false },
    { id: "kilometrage", label: "Kilométrage", sortable: true, visible: false },
    { id: "sim", label: "SIM", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
  ];

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    setSelectedItem(item);
    setShowEditVehicleDialog(true);
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    setSelectedItem(item);
  };

  const confirmDelete = () => {
    // Remove the item from the combined data
    const updatedData = combinedData.filter(entry => 
      entry.imei !== selectedItem.imei
    );
    
    setCombinedData(updatedData);
    
    // Update filtered data if necessary
    if (isFiltered) {
      const updatedFilteredData = filteredData.filter(entry => 
        entry.imei !== selectedItem.imei
      );
      setFilteredData(updatedFilteredData);
    }
    
    // Show success toast
    toast({
      title: selectedItem.type === "vehicle" ? "Véhicule supprimé" : "Boîtier supprimé",
      description: "L'élément a été supprimé avec succès.",
    });
    
    setSelectedItem(null);
  };

  const handleAssociate = (device: any) => {
    console.log("Associate device:", device);
    setSelectedDevice(device);
    setShowAssociateSheet(true);
  };

  // Réinitialiser la recherche
  const resetSearch = () => {
    setIsFiltered(false);
    setFilteredData([]);
  };

  // Fonction pour mettre à jour les données après une modification
  const handleUpdateDevices = (devices: any[], newCompany: string) => {
    // Créer une copie profonde des données
    const updatedData = [...combinedData];
    
    // Mettre à jour l'entreprise pour chaque appareil sélectionné
    devices.forEach(selectedDevice => {
      const index = updatedData.findIndex(item => item.imei === selectedDevice.imei);
      if (index !== -1) {
        updatedData[index] = { ...updatedData[index], entreprise: newCompany };
      }
    });
    
    // Mettre à jour les données filtrées si nécessaire
    if (isFiltered) {
      const updatedFiltered = filteredData.map(item => {
        const matchedDevice = devices.find(d => d.imei === item.imei);
        if (matchedDevice) {
          return { ...item, entreprise: newCompany };
        }
        return item;
      });
      setFilteredData(updatedFiltered);
    }
    
    // Afficher un toast de confirmation
    toast({
      description: `${devices.length} boîtier(s) modifié(s) avec succès`,
    });
  };

  // Handle save after editing
  const handleSaveEdit = (updatedItem: any) => {
    // Update the item in the combined data
    const updatedData = combinedData.map(item => 
      item.imei === updatedItem.imei ? { ...item, ...updatedItem } : item
    );
    
    setCombinedData(updatedData);
    
    // Update filtered data if necessary
    if (isFiltered) {
      const updatedFilteredData = filteredData.map(item => 
        item.imei === updatedItem.imei ? { ...item, ...updatedItem } : item
      );
      setFilteredData(updatedFilteredData);
    }
    
    // Show success toast
    toast({
      title: updatedItem.type === "vehicle" ? "Véhicule modifié" : "Boîtier modifié",
      description: "Les informations ont été mises à jour avec succès.",
    });
    
    setShowEditVehicleDialog(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
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
              <AddVehicleForm onClose={() => setShowAddVehicleDialog(false)} />
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
      
      {/* Afficher un bouton pour réinitialiser la recherche si des filtres sont actifs */}
      {isFiltered && (
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={resetSearch}>Réinitialiser la recherche</Button>
        </div>
      )}
      
      <EnhancedDataTable
        columns={allColumns}
        data={isFiltered ? filteredData : combinedData}
        onEdit={handleEdit}
        onDelete={(item) => {
          setSelectedItem(item);
          // Use custom delete handler with confirmation dialog
        }}
        renderActions={(item) => (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
              <Edit className="h-4 w-4" />
            </Button>
            <DeleteConfirmationDialog
              title={item.type === "vehicle" ? "Supprimer le véhicule" : "Supprimer le boîtier"}
              description={`Êtes-vous sûr de vouloir supprimer ${item.type === "vehicle" ? "ce véhicule" : "ce boîtier"} ? Cette action est irréversible.`}
              onConfirm={() => {
                const updatedData = combinedData.filter(entry => entry.imei !== item.imei);
                setCombinedData(updatedData);
                if (isFiltered) {
                  const updatedFilteredData = filteredData.filter(entry => entry.imei !== item.imei);
                  setFilteredData(updatedFilteredData);
                }
                toast({
                  description: `${item.type === "vehicle" ? "Véhicule" : "Boîtier"} supprimé avec succès.`
                });
              }}
            />
            {item.type === "device" && (
              <Button variant="ghost" size="icon" onClick={() => handleAssociate(item)}>
                <Link className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        onAssociate={handleAssociate}
      />

      {/* Sheet pour associer un boîtier à un véhicule */}
      <Sheet open={showAssociateSheet} onOpenChange={setShowAssociateSheet}>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Associer un Véhicule</SheetTitle>
          </SheetHeader>
          <AssociateVehicleForm
            device={selectedDevice}
            onClose={() => setShowAssociateSheet(false)}
            onSuccess={() => {
              toast({
                title: "Boîtier associé",
                description: "Le boîtier a été associé au véhicule avec succès"
              });
              setShowAssociateSheet(false);
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Dialog pour la recherche multiple d'IMEI */}
      <MultipleImeiSearchDialog
        open={showMultipleImeiDialog}
        onOpenChange={setShowMultipleImeiDialog}
        data={combinedData}
        onUpdate={(devices, newCompany) => {
          handleUpdateDevices(devices, newCompany);
          setShowMultipleImeiDialog(false);
        }}
      />

      {/* Dialog pour l'édition d'un véhicule ou boîtier */}
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
