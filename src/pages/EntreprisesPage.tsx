
import React, { useState } from "react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import AddCompanyUserForm from "@/components/forms/AddCompanyUserForm";

export default function EntreprisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Définition de toutes les colonnes possibles
  const allColumns: Column[] = [
    // Colonnes communes
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    
    // Colonnes spécifiques aux entreprises
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
      entreprise: "SOCIETE AMBULANCES LEROY", 
      contact: "Jean Dupont", 
      telephone: "0123456789", 
      email: "contact@ambulances-leroy.fr", 
      adresse: "123 Rue de Paris, 75001 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      entreprise: "VITOR NETTOYAGE", 
      contact: "Marie Martin", 
      telephone: "0234567890", 
      email: "contact@vitor-nettoyage.com", 
      adresse: "456 Avenue Victor Hugo, 75016 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      entreprise: "MAC TRANSPORT", 
      contact: "Pierre Durand", 
      telephone: "0345678901", 
      email: "contact@mac-transport.fr", 
      adresse: "789 Boulevard Saint-Michel, 75005 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
      entreprise: "B LIVE", 
      contact: "Sophie Bernard", 
      telephone: "0456789012", 
      email: "contact@blive.com", 
      adresse: "12 Rue de Rivoli, 75004 Paris",
      ville: "Paris",
      type: "Entreprise"
    },
    { 
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

  // Sous-comptes fictifs pour les entreprises
  const subAccounts: Record<string, Array<{ nom: string, role: string, email: string }>> = {
    "SOCIETE AMBULANCES LEROY": [
      { nom: "Jean Dupont", role: "Administrateur", email: "jean.dupont@ambulances-leroy.fr" },
      { nom: "Lucie Martin", role: "Employé", email: "lucie.martin@ambulances-leroy.fr" },
      { nom: "Paul Bernard", role: "Conducteur", email: "paul.bernard@ambulances-leroy.fr" }
    ],
    "VITOR NETTOYAGE": [
      { nom: "Marie Martin", role: "Administrateur", email: "marie.martin@vitor-nettoyage.com" },
      { nom: "Antoine Petit", role: "Manager", email: "antoine.petit@vitor-nettoyage.com" }
    ],
    "MAC TRANSPORT": [
      { nom: "Pierre Durand", role: "Administrateur", email: "pierre.durand@mac-transport.fr" },
      { nom: "Sophie Lefevre", role: "Comptable", email: "sophie.lefevre@mac-transport.fr" },
      { nom: "Thomas Moreau", role: "Chauffeur", email: "thomas.moreau@mac-transport.fr" }
    ],
    "B LIVE": [
      { nom: "Sophie Bernard", role: "Administrateur", email: "sophie.bernard@blive.com" }
    ],
    "IRIS MULTISERVICES": [
      { nom: "Thomas Petit", role: "Administrateur", email: "thomas.petit@iris-multiservices.fr" },
      { nom: "Julie Dubois", role: "Secrétaire", email: "julie.dubois@iris-multiservices.fr" },
      { nom: "Maxime Robert", role: "Technicien", email: "maxime.robert@iris-multiservices.fr" },
      { nom: "Camille Fournier", role: "Agent", email: "camille.fournier@iris-multiservices.fr" }
    ],
    "3DJ SERVICES": [
      { nom: "Marc Dupuis", role: "Administrateur", email: "marc.dupuis@3djservices.com" },
      { nom: "Emilie Rousseau", role: "Designer", email: "emilie.rousseau@3djservices.com" }
    ],
    "ABCP": [
      { nom: "Laurent Girard", role: "Administrateur", email: "laurent.girard@abcp.fr" }
    ],
    "ABCT SECURITE ( ACTIVE SECURITE 16 )": [
      { nom: "Nicolas Blanc", role: "Administrateur", email: "nicolas.blanc@abctsecurite.fr" },
      { nom: "Stéphanie Mercier", role: "Agent de sécurité", email: "stephanie.mercier@abctsecurite.fr" }
    ],
    "AB NETTOYAGE": [
      { nom: "Christophe Legrand", role: "Administrateur", email: "christophe.legrand@abnettoyage.fr" }
    ],
    "ABP TRANSPORT": [
      { nom: "Valérie Morel", role: "Administrateur", email: "valerie.morel@abptransport.fr" },
      { nom: "Julien Gauthier", role: "Chauffeur", email: "julien.gauthier@abptransport.fr" }
    ]
  };

  // Fusionner les données en un seul tableau
  const combinedData = [...entreprisesData, ...utilisateursData];

  const handleCompanyClick = (companyName: string) => {
    setSelectedCompany(companyName);
  };

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  const handleAddSuccess = () => {
    setIsDialogOpen(false);
    toast({
      title: "Ajout réussi",
      description: "L'entreprise a été ajoutée avec succès"
    });
  };

  // Fonction pour rendre la cellule entreprise cliquable
  const renderEnterpriseCell = (row: any) => {
    // Si c'est une entreprise et pas un utilisateur
    if (row.type === "Entreprise" || !row.type) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="p-0 h-auto font-normal text-left text-foreground">
              {row.entreprise}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <h4 className="font-medium">Sous-comptes de {row.entreprise}</h4>
              </div>
              
              {subAccounts[row.entreprise] ? (
                <div className="space-y-2">
                  {subAccounts[row.entreprise].map((account, index) => (
                    <div key={index} className="border rounded p-2">
                      <div className="font-medium">{account.nom}</div>
                      <div className="text-sm text-muted-foreground">Rôle: {account.role}</div>
                      <div className="text-sm text-muted-foreground">{account.email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucun sous-compte disponible</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      );
    }
    return row.entreprise;
  };

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
              <DialogHeader className="mb-5">
                <DialogTitle>Ajouter une entreprise</DialogTitle>
              </DialogHeader>
              <AddCompanyUserForm 
                onClose={() => setIsDialogOpen(false)} 
                onSuccess={handleAddSuccess}
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
        renderCustomCell={{ entreprise: renderEnterpriseCell }}
      />
    </div>
  );
}
