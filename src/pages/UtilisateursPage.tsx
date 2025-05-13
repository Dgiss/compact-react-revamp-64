
import React from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { DataTable } from "@/components/tables/DataTable";

export default function UtilisateursPage() {
  const columns = [
    { id: "nom", label: "Nom d'utilisateur", sortable: true },
    { id: "motDePasse", label: "Mot de passe", sortable: false },
    { id: "entreprise", label: "Entreprise", sortable: true },
  ];

  const data = [
    { 
      nom: "3djservices", 
      motDePasse: "3djservices2025", 
      entreprise: "3DJ SERVICES"
    },
    { 
      nom: "abcp", 
      motDePasse: "abcp2025", 
      entreprise: "ABCP"
    },
    { 
      nom: "abctsecuriteactivesecurite16", 
      motDePasse: "abctsecuriteactivesecurite162025", 
      entreprise: "ABCT SECURITE ( ACTIVE SECURITE 16 )"
    },
    { 
      nom: "abnettoyage", 
      motDePasse: "abnettoyage2025", 
      entreprise: "AB NETTOYAGE"
    },
    { 
      nom: "abptransport", 
      motDePasse: "abptransport2025", 
      entreprise: "ABP TRANSPORT"
    },
  ];

  const searchFields = [
    { id: "nom", label: "Nom Utilisateur" },
    { 
      id: "entreprise", 
      label: "Entreprise", 
      type: "select",
      options: [
        { value: "3DJ SERVICES", label: "3DJ SERVICES" },
        { value: "ABCP", label: "ABCP" },
        { value: "AB NETTOYAGE", label: "AB NETTOYAGE" },
        { value: "ABP TRANSPORT", label: "ABP TRANSPORT" },
      ]
    },
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
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
      
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
