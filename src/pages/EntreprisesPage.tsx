
import React from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { DataTable } from "@/components/tables/DataTable";

export default function EntreprisesPage() {
  const columns = [
    { id: "siret", label: "Siret", sortable: true },
    { id: "entreprise", label: "Entreprise", sortable: true },
    { id: "contact", label: "Contact", sortable: true },
    { id: "telephone", label: "Téléphone", sortable: true },
    { id: "email", label: "Email", sortable: true },
    { id: "adresse", label: "Adresse", sortable: true },
  ];

  const data = [
    { 
      siret: "12345678901234", 
      entreprise: "SOCIETE AMBULANCES LEROY", 
      contact: "Jean Dupont", 
      telephone: "0123456789", 
      email: "contact@ambulances-leroy.fr", 
      adresse: "123 Rue de Paris, 75001 Paris" 
    },
    { 
      siret: "23456789012345", 
      entreprise: "VITOR NETTOYAGE", 
      contact: "Marie Martin", 
      telephone: "0234567890", 
      email: "contact@vitor-nettoyage.com", 
      adresse: "456 Avenue Victor Hugo, 75016 Paris" 
    },
    { 
      siret: "34567890123456", 
      entreprise: "MAC TRANSPORT", 
      contact: "Pierre Durand", 
      telephone: "0345678901", 
      email: "contact@mac-transport.fr", 
      adresse: "789 Boulevard Saint-Michel, 75005 Paris" 
    },
    { 
      siret: "45678901234567", 
      entreprise: "B LIVE", 
      contact: "Sophie Bernard", 
      telephone: "0456789012", 
      email: "contact@blive.com", 
      adresse: "12 Rue de Rivoli, 75004 Paris" 
    },
    { 
      siret: "56789012345678", 
      entreprise: "IRIS MULTISERVICES", 
      contact: "Thomas Petit", 
      telephone: "0567890123", 
      email: "contact@iris-multiservices.fr", 
      adresse: "34 Avenue des Champs-Élysées, 75008 Paris" 
    },
  ];

  const searchFields = [
    { id: "siret", label: "Siret" },
    { id: "entreprise", label: "Nom de l'entreprise" },
    { id: "email", label: "Email" },
  ];

  const handleSearch = (formData: any) => {
    console.log("Searching with:", formData);
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Entreprises</h1>
      
      <SearchForm
        fields={searchFields}
        onSubmit={handleSearch}
        onReset={() => console.log("Reset search")}
        onAdd={handleAdd}
      />
      
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
