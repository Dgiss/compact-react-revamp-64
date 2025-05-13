
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddVehicleForm from "@/components/forms/AddVehicleForm";
import ImportDevicesForm from "@/components/forms/ImportDevicesForm";

export default function VehiclesDevicesPage() {
  // Define all possible columns
  const allColumns: Column[] = [
    { id: "immatriculation", label: "Immatriculation", sortable: true, visible: true },
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true, visible: true },
    { id: "imei", label: "IMEI", sortable: true, visible: true },
    { id: "typeBoitier", label: "Type de Boîtier", sortable: true, visible: true }, // Ajout de la colonne Type de Boîtier
    { id: "categorie", label: "Catégorie", sortable: true, visible: false }, // Catégorie cachée complètement (sera supprimée du rendu)
    { id: "marque", label: "Marque", sortable: true, visible: false }, // Cachée par défaut
    { id: "modele", label: "Modèle", sortable: true, visible: false }, // Cachée par défaut
    { id: "kilometrage", label: "Kilométrage", sortable: true, visible: false }, // Cachée par défaut
    { id: "sim", label: "SIM", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true }, // Ajout de la colonne téléphone
    { id: "vehicule", label: "Véhicule associé", sortable: true, visible: true },
  ];

  // Combine vehicle and device data
  const vehicleData = [
    { 
      immatriculation: "GD 120 NK", 
      entreprise: "MBSC", 
      nomVehicule: "", 
      imei: "866854051690975", 
      typeBoitier: "GPS Tracker",
      categorie: "Voiture", 
      marque: "Peugeot", 
      modele: "308", 
      kilometrage: "45000",
      telephone: "",
      type: "vehicle"
    },
    { 
      immatriculation: "EC 430 MQ", 
      entreprise: "PHENIX IDFTP", 
      nomVehicule: "", 
      imei: "864636066827169", 
      typeBoitier: "GPS Tracker",
      categorie: "Utilitaire", 
      marque: "Renault", 
      modele: "Master", 
      kilometrage: "78000",
      telephone: "",
      type: "vehicle"
    },
    { 
      immatriculation: "GY-861-SF", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "864454070312115", 
      typeBoitier: "GPS Tracker",
      categorie: "Voiture", 
      marque: "Toyota", 
      modele: "Yaris", 
      kilometrage: "32000",
      telephone: "",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-290-QC", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544508381053", 
      typeBoitier: "GPS Tracker",
      categorie: "Voiture", 
      marque: "Citroën", 
      modele: "C3", 
      kilometrage: "28000",
      telephone: "",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-968-ZX", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544500701886", 
      typeBoitier: "GPS Tracker",
      categorie: "Utilitaire", 
      marque: "Fiat", 
      modele: "Ducato", 
      kilometrage: "62000",
      telephone: "",
      type: "vehicle"
    },
  ];

  const deviceData = [
    { 
      imei: "862531040658404", 
      sim: "8933150520000591384", 
      typeBoitier: "GPS Simple",
      entreprise: "", 
      vehicule: "",
      telephone: "0712345678",
      type: "device"
    },
    { 
      imei: "862531040787807", 
      sim: "8933150520000763529", 
      typeBoitier: "GPS Avancé",
      entreprise: "", 
      vehicule: "",
      telephone: "0723456789",
      type: "device"
    },
    { 
      imei: "866795038741631", 
      sim: "8933150520001459950", 
      typeBoitier: "GPS Simple",
      entreprise: "MATTEI / HABICONFORT", 
      vehicule: "FS 073 SV",
      telephone: "0734567890",
      type: "device"
    },
    { 
      imei: "350612070642820", 
      sim: "8933150520001427874",
      typeBoitier: "GPS Avancé", 
      entreprise: "ADANEV MOBILITES", 
      vehicule: "GY-953-LY",
      telephone: "0745678901",
      type: "device"
    },
    { 
      imei: "862531040673056", 
      sim: "8933150520000623030", 
      typeBoitier: "GPS Simple",
      entreprise: "Kick Services", 
      vehicule: "RODSON MICHEL",
      telephone: "0756789012",
      type: "device"
    },
  ];

  // Combine all data into a single array
  const combinedData = [...vehicleData, ...deviceData];

  // Filtrer les colonnes pour supprimer "categorie" du rendu final
  const displayColumns = allColumns.filter(column => column.id !== "categorie");

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Véhicule
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <AddVehicleForm />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Importer des Boîtiers
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <ImportDevicesForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <EnhancedDataTable
        columns={displayColumns}
        data={combinedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
