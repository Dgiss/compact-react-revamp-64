import React, { useState } from "react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabsEnhanced } from "@/components/ui/tabs-enhanced";
import AddUserForm from "@/components/forms/AddUserForm";
import AddCompanyForm from "@/components/forms/AddCompanyForm";
import { toast } from "@/components/ui/use-toast";

export default function EntreprisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState("users");

  // Définition de toutes les colonnes possibles
  const allColumns: Column[] = [
    // Colonnes communes
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    
    // Colonnes spécifiques aux entreprises
    { id: "siret", label: "Siret", sortable: true, visible: false },
    { id: "contact", label: "Contact", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
    { id: "email", label: "Email", sortable: true, visible: true },
    { id: "adresse", label: "Adresse", sortable: true, visible: true },
    { id: "ville", label: "Ville", sortable: true, visible: true },
    { id: "type", label: "Type", sortable: true, visible: false },
    
    // Colonnes spécifiques aux utilisateurs
    { id: "nom", label: "Nom d'utilisateur", sortable: true, visible: true },
    { id: "motDePasse", label: "Mot de passe", sortable: true, visible: true },
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
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      siret: "23456789012345", 
      entreprise: "VITOR NETTOYAGE", 
      contact: "Marie Martin", 
      telephone: "0234567890", 
      email: "contact@vitor-nettoyage.com", 
      adresse: "456 Avenue Victor Hugo, 75016 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      siret: "34567890123456", 
      entreprise: "MAC TRANSPORT", 
      contact: "Pierre Durand", 
      telephone: "0345678901", 
      email: "contact@mac-transport.fr", 
      adresse: "789 Boulevard Saint-Michel, 75005 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      siret: "45678901234567", 
      entreprise: "B LIVE", 
      contact: "Sophie Bernard", 
      telephone: "0456789012", 
      email: "contact@blive.com", 
      adresse: "12 Rue de Rivoli, 75004 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      siret: "56789012345678", 
      entreprise: "IRIS MULTISERVICES", 
      contact: "Thomas Petit", 
      telephone: "0567890123", 
      email: "contact@iris-multiservices.fr", 
      adresse: "34 Avenue des Champs-Élysées, 75008 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
  ];

  // Données des utilisateurs
  const utilisateursData = [
    { 
      nom: "3djservices", 
      motDePasse: "3djservices2025", 
      entreprise: "3DJ SERVICES", 
      type: "Utilisateur"
    },
    { 
      nom: "abcp", 
      motDePasse: "abcp2025", 
      entreprise: "ABCP", 
      type: "Utilisateur"
    },
    { 
      nom: "abctsecuriteactivesecurite16", 
      motDePasse: "abctsecuriteactivesecurite162025", 
      entreprise: "ABCT SECURITE ( ACTIVE SECURITE 16 )",
      type: "Utilisateur"
    },
    { 
      nom: "abnettoyage", 
      motDePasse: "abnettoyage2025", 
      entreprise: "AB NETTOYAGE",
      type: "Utilisateur"
    },
    { 
      nom: "abptransport", 
      motDePasse: "abptransport2025", 
      entreprise: "ABP TRANSPORT",
      type: "Utilisateur"
    },
  ];

  // Fusionner les données en un seul tableau
  const combinedData = [...entreprisesData, ...utilisateursData];

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  const handleAddSuccess = (type: string) => {
    setIsDialogOpen(false);
    toast({
      title: type === "user" ? "Utilisateur ajouté" : "Entreprise ajoutée",
      description: type === "user" ? "L'utilisateur a été ajouté avec succès" : "L'entreprise a été ajoutée avec succès"
    });
  };

  const formTabs = [
    {
      id: "users",
      label: "Utilisateur",
      content: (
        <AddUserForm 
          onClose={() => setIsDialogOpen(false)} 
          onSuccess={() => handleAddSuccess("user")}
        />
      )
    },
    {
      id: "company",
      label: "Entreprise",
      content: (
        <AddCompanyForm 
          onClose={() => setIsDialogOpen(false)} 
          onSuccess={() => handleAddSuccess("company")}
        />
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Entreprises & Utilisateurs</h1>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <TabsEnhanced 
                tabs={formTabs} 
                defaultValue={dialogTab} 
                onChange={setDialogTab}
              />
            </DialogContent>
          </Dialog>
        </div>
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
