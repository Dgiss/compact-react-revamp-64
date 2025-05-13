
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";

export default function VehiclesDevicesPage() {
  // Combine all columns from both vehicle and device data
  const allColumns: Column[] = [
    { id: "immatriculation", label: "Immatriculation", sortable: true },
    { id: "entreprise", label: "Entreprise", sortable: true },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true },
    { id: "imei", label: "IMEI", sortable: true },
    { id: "categorie", label: "Catégorie", sortable: true },
    { id: "marque", label: "Marque", sortable: true },
    { id: "modele", label: "Modèle", sortable: true },
    { id: "kilometrage", label: "Kilométrage", sortable: true },
    { id: "sim", label: "SIM", sortable: true },
    { id: "vehicule", label: "Véhicule associé", sortable: true },
  ];

  // Combine vehicle and device data
  const vehicleData = [
    { 
      immatriculation: "GD 120 NK", 
      entreprise: "MBSC", 
      nomVehicule: "", 
      imei: "866854051690975", 
      categorie: "Voiture", 
      marque: "Peugeot", 
      modele: "308", 
      kilometrage: "45000",
      type: "vehicle"
    },
    { 
      immatriculation: "EC 430 MQ", 
      entreprise: "PHENIX IDFTP", 
      nomVehicule: "", 
      imei: "864636066827169", 
      categorie: "Utilitaire", 
      marque: "Renault", 
      modele: "Master", 
      kilometrage: "78000",
      type: "vehicle"
    },
    { 
      immatriculation: "GY-861-SF", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "864454070312115", 
      categorie: "Voiture", 
      marque: "Toyota", 
      modele: "Yaris", 
      kilometrage: "32000",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-290-QC", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544508381053", 
      categorie: "Voiture", 
      marque: "Citroën", 
      modele: "C3", 
      kilometrage: "28000",
      type: "vehicle"
    },
    { 
      immatriculation: "GH-968-ZX", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544500701886", 
      categorie: "Utilitaire", 
      marque: "Fiat", 
      modele: "Ducato", 
      kilometrage: "62000",
      type: "vehicle"
    },
  ];

  const deviceData = [
    { 
      imei: "862531040658404", 
      sim: "8933150520000591384", 
      entreprise: "", 
      vehicule: "",
      type: "device"
    },
    { 
      imei: "862531040787807", 
      sim: "8933150520000763529", 
      entreprise: "", 
      vehicule: "",
      type: "device"
    },
    { 
      imei: "866795038741631", 
      sim: "8933150520001459950", 
      entreprise: "MATTEI / HABICONFORT", 
      vehicule: "FS 073 SV",
      type: "device"
    },
    { 
      imei: "350612070642820", 
      sim: "8933150520001427874", 
      entreprise: "ADANEV MOBILITES", 
      vehicule: "GY-953-LY",
      type: "device"
    },
    { 
      imei: "862531040673056", 
      sim: "8933150520000623030", 
      entreprise: "Kick Services", 
      vehicule: "RODSON MICHEL",
      type: "device"
    },
  ];

  // Combine all data into a single array
  const combinedData = [...vehicleData, ...deviceData];

  const handleAdd = () => {
    console.log("Add new item");
    // Implement add logic
  };

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
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
      
      <EnhancedDataTable
        columns={allColumns}
        data={combinedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
