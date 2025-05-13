
import React from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet } from "lucide-react";

export default function EntreprisesPage() {
  // Définition de toutes les colonnes possibles
  const allColumns: Column[] = [
    // Colonnes d'entreprises
    { id: "siret", label: "Siret", sortable: true, visible: true },
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    { id: "contact", label: "Contact", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
    { id: "email", label: "Email", sortable: true, visible: true },
    { id: "adresse", label: "Adresse", sortable: true, visible: false },
    
    // Colonnes d'utilisateurs
    { id: "nom", label: "Nom d'utilisateur", sortable: true, visible: true },
    { id: "motDePasse", label: "Mot de passe", sortable: false, visible: false },
    { id: "type", label: "Type", sortable: true, visible: true },
  ];

  // Données des entreprises
  const entreprisesData = [
    { 
      siret: "12345678901234", 
      entreprise: "SOCIETE AMBULANCES LEROY", 
      contact: "Jean Dupont", 
      telephone: "0123456789", 
      email: "contact@ambulances-leroy.fr", 
      adresse: "123 Rue de Paris, 75001 Paris",
      type: "entreprise"
    },
    { 
      siret: "23456789012345", 
      entreprise: "VITOR NETTOYAGE", 
      contact: "Marie Martin", 
      telephone: "0234567890", 
      email: "contact@vitor-nettoyage.com", 
      adresse: "456 Avenue Victor Hugo, 75016 Paris",
      type: "entreprise"
    },
    { 
      siret: "34567890123456", 
      entreprise: "MAC TRANSPORT", 
      contact: "Pierre Durand", 
      telephone: "0345678901", 
      email: "contact@mac-transport.fr", 
      adresse: "789 Boulevard Saint-Michel, 75005 Paris",
      type: "entreprise"
    },
    { 
      siret: "45678901234567", 
      entreprise: "B LIVE", 
      contact: "Sophie Bernard", 
      telephone: "0456789012", 
      email: "contact@blive.com", 
      adresse: "12 Rue de Rivoli, 75004 Paris",
      type: "entreprise"
    },
    { 
      siret: "56789012345678", 
      entreprise: "IRIS MULTISERVICES", 
      contact: "Thomas Petit", 
      telephone: "0567890123", 
      email: "contact@iris-multiservices.fr", 
      adresse: "34 Avenue des Champs-Élysées, 75008 Paris",
      type: "entreprise"
    },
  ];

  // Données des utilisateurs
  const utilisateursData = [
    { 
      nom: "3djservices", 
      motDePasse: "3djservices2025", 
      entreprise: "3DJ SERVICES", 
      type: "utilisateur"
    },
    { 
      nom: "abcp", 
      motDePasse: "abcp2025", 
      entreprise: "ABCP", 
      type: "utilisateur"
    },
    { 
      nom: "abctsecuriteactivesecurite16", 
      motDePasse: "abctsecuriteactivesecurite162025", 
      entreprise: "ABCT SECURITE ( ACTIVE SECURITE 16 )",
      type: "utilisateur"
    },
    { 
      nom: "abnettoyage", 
      motDePasse: "abnettoyage2025", 
      entreprise: "AB NETTOYAGE",
      type: "utilisateur"
    },
    { 
      nom: "abptransport", 
      motDePasse: "abptransport2025", 
      entreprise: "ABP TRANSPORT",
      type: "utilisateur"
    },
  ];

  // Combiner les données des entreprises et des utilisateurs
  const combinedData = [...entreprisesData, ...utilisateursData];

  const searchFields = [
    { id: "siret", label: "Siret" },
    { id: "entreprise", label: "Nom de l'entreprise" },
    { id: "email", label: "Email" },
    { id: "nom", label: "Nom d'utilisateur" },
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Entreprises & Utilisateurs</h1>
        <div className="flex gap-2">
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>
      
      <SearchForm
        fields={searchFields}
        onSubmit={handleSearch}
        onReset={() => console.log("Reset search")}
        onAdd={handleAdd}
      />
      
      <EnhancedDataTable
        columns={allColumns}
        data={combinedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
