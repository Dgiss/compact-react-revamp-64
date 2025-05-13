
import React from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { TabsEnhanced } from "@/components/ui/tabs-enhanced";
import { DataTable } from "@/components/tables/DataTable";

export default function VehiclesDevicesPage() {
  const vehicleColumns = [
    { id: "immatriculation", label: "Immatriculation", sortable: true },
    { id: "entreprise", label: "Entreprise", sortable: true },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true },
    { id: "imei", label: "IMEI", sortable: true },
    { id: "categorie", label: "Catégorie", sortable: true },
    { id: "marque", label: "Marque", sortable: true },
    { id: "modele", label: "Modèle", sortable: true },
    { id: "kilometrage", label: "Kilométrage", sortable: true },
  ];

  const deviceColumns = [
    { id: "imei", label: "IMEI", sortable: true },
    { id: "sim", label: "SIM", sortable: true },
    { id: "entreprise", label: "Entreprise", sortable: true },
    { id: "vehicule", label: "Véhicule", sortable: true },
  ];

  const vehicleData = [
    { 
      immatriculation: "GD 120 NK", 
      entreprise: "MBSC", 
      nomVehicule: "", 
      imei: "866854051690975", 
      categorie: "Voiture", 
      marque: "Peugeot", 
      modele: "308", 
      kilometrage: "45000" 
    },
    { 
      immatriculation: "EC 430 MQ", 
      entreprise: "PHENIX IDFTP", 
      nomVehicule: "", 
      imei: "864636066827169", 
      categorie: "Utilitaire", 
      marque: "Renault", 
      modele: "Master", 
      kilometrage: "78000" 
    },
    { 
      immatriculation: "GY-861-SF", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "864454070312115", 
      categorie: "Voiture", 
      marque: "Toyota", 
      modele: "Yaris", 
      kilometrage: "32000" 
    },
    { 
      immatriculation: "GH-290-QC", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544508381053", 
      categorie: "Voiture", 
      marque: "Citroën", 
      modele: "C3", 
      kilometrage: "28000" 
    },
    { 
      immatriculation: "GH-968-ZX", 
      entreprise: "ADANEV MOBILITES", 
      nomVehicule: "", 
      imei: "350544500701886", 
      categorie: "Utilitaire", 
      marque: "Fiat", 
      modele: "Ducato", 
      kilometrage: "62000" 
    },
  ];

  const deviceData = [
    { 
      imei: "862531040658404", 
      sim: "", 
      entreprise: "", 
      vehicule: "" 
    },
    { 
      imei: "862531040787807", 
      sim: "", 
      entreprise: "", 
      vehicule: "" 
    },
    { 
      imei: "866795038741631", 
      sim: "", 
      entreprise: "MATTEI / HABICONFORT", 
      vehicule: "FS 073 SV" 
    },
    { 
      imei: "350612070642820", 
      sim: "", 
      entreprise: "ADANEV MOBILITES", 
      vehicule: "GY-953-LY" 
    },
    { 
      imei: "862531040673056", 
      sim: "", 
      entreprise: "Kick Services", 
      vehicule: "RODSON MICHEL" 
    },
  ];

  const vehicleSearchFields = [
    { id: "immatriculation", label: "Immatriculation" },
    { id: "nomVehicule", label: "Nom Véhicule" },
    { 
      id: "entreprise", 
      label: "Entreprise", 
      type: "select",
      options: [
        { value: "MBSC", label: "MBSC" },
        { value: "PHENIX IDFTP", label: "PHENIX IDFTP" },
        { value: "ADANEV MOBILITES", label: "ADANEV MOBILITES" },
      ]
    },
    { 
      id: "categorie", 
      label: "Catégorie", 
      type: "select",
      options: [
        { value: "Voiture", label: "Voiture" },
        { value: "Utilitaire", label: "Utilitaire" },
        { value: "Camion", label: "Camion" },
      ]
    },
    { 
      id: "marque", 
      label: "Marque", 
      type: "select",
      options: [
        { value: "Peugeot", label: "Peugeot" },
        { value: "Renault", label: "Renault" },
        { value: "Toyota", label: "Toyota" },
        { value: "Citroën", label: "Citroën" },
        { value: "Fiat", label: "Fiat" },
      ]
    },
  ];

  const deviceSearchFields = [
    { id: "imei", label: "IMEI" },
    { id: "sim", label: "SIM" },
    { id: "vehicule", label: "Véhicule" },
  ];

  const handleVehicleSearch = (formData: any) => {
    console.log("Searching vehicles with:", formData);
    // Implement search logic
  };

  const handleDeviceSearch = (formData: any) => {
    console.log("Searching devices with:", formData);
    // Implement search logic
  };

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  const handleAdd = () => {
    console.log("Add new item");
    // Implement add logic
  };

  const tabs = [
    {
      id: "vehicles",
      label: "Véhicules",
      content: (
        <div>
          <SearchForm
            fields={vehicleSearchFields}
            onSubmit={handleVehicleSearch}
            onReset={() => console.log("Reset vehicle search")}
            onAdd={handleAdd}
          />
          <DataTable
            columns={vehicleColumns}
            data={vehicleData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ),
    },
    {
      id: "devices",
      label: "Boîtiers",
      content: (
        <div>
          <SearchForm
            fields={deviceSearchFields}
            onSubmit={handleDeviceSearch}
            onReset={() => console.log("Reset device search")}
            onAdd={handleAdd}
          />
          <DataTable
            columns={deviceColumns}
            data={deviceData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Véhicules & Boîtiers</h1>
      <TabsEnhanced tabs={tabs} />
    </div>
  );
}
