
import React, { useState } from "react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import AddCompanyForm from "@/components/forms/AddCompanyForm";
import { CompanyUsersList } from "@/components/CompanyUsersList";
import EditCompanyForm from "@/components/forms/EditCompanyForm";
import EditUserForm from "@/components/forms/EditUserForm";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";

// Base de données fictive des utilisateurs par entreprise
const companyUsers = {
  "SOCIETE AMBULANCES LEROY": [
    { id: "u1", nom: "ambulances_leroy_admin", motDePasse: "secure123", role: "Admin" },
    { id: "u2", nom: "leroy_user1", motDePasse: "password456", role: "Opérateur" },
  ],
  "VITOR NETTOYAGE": [
    { id: "u3", nom: "vitor_admin", motDePasse: "vitor2023", role: "Admin" },
    { id: "u4", nom: "vitor_comptable", motDePasse: "compta2023", role: "Comptabilité" },
    { id: "u5", nom: "vitor_tech", motDePasse: "tech2023", role: "Technicien" },
  ],
  "MAC TRANSPORT": [
    { id: "u6", nom: "mac_admin", motDePasse: "mac2023", role: "Admin" },
  ],
  "B LIVE": [
    { id: "u7", nom: "blive_admin", motDePasse: "blive2023", role: "Admin" },
    { id: "u8", nom: "blive_user", motDePasse: "user2023", role: "Utilisateur" },
  ],
  "IRIS MULTISERVICES": [
    { id: "u9", nom: "iris_admin", motDePasse: "iris2023", role: "Admin" },
    { id: "u10", nom: "iris_tech", motDePasse: "tech2023", role: "Technicien" },
  ],
};

export default function EntreprisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Définition de toutes les colonnes possibles, sans login/password dans le tableau principal
  const allColumns: Column[] = [
    // Colonnes communes
    { 
      id: "entreprise", 
      label: "Entreprise", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => {
        if (row.type === "Entreprise") {
          return <CompanyUsersList 
            companyName={value} 
            users={companyUsers[value] || []} 
          />;
        }
        return value;
      }
    },
    
    // Colonnes spécifiques aux entreprises
    { id: "contact", label: "Contact", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
    { id: "email", label: "Email", sortable: true, visible: true },
    { id: "adresse", label: "Adresse", sortable: true, visible: true },
    { id: "ville", label: "Ville", sortable: true, visible: true },
    { id: "type", label: "Type", sortable: true, visible: false },
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

  // Filtrer les données d'utilisateurs pour ne pas afficher les utilisateurs directement dans le tableau
  const filteredData = entreprisesData;

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    
    if (item.type === "Entreprise") {
      setEditDialogOpen(true);
    } else {
      setEditUserDialogOpen(true);
    }
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    
    // Simuler la suppression
    toast({
      title: item.type === "Entreprise" ? "Entreprise supprimée" : "Utilisateur supprimé",
      description: `${item.type === "Entreprise" ? item.entreprise : item.nom} a été supprimé avec succès.`
    });
  };

  const renderActions = (item: any) => {
    return (
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </Dialog>
        
        <DeleteConfirmationDialog
          title={item.type === "Entreprise" ? "Supprimer l'entreprise" : "Supprimer l'utilisateur"}
          description={item.type === "Entreprise" 
            ? `Êtes-vous sûr de vouloir supprimer l'entreprise "${item.entreprise}" ? Cette action ne peut pas être annulée.`
            : `Êtes-vous sûr de vouloir supprimer l'utilisateur "${item.nom}" ? Cette action ne peut pas être annulée.`
          }
          onConfirm={() => handleDelete(item)}
        />
      </div>
    );
  };

  const handleAddSuccess = () => {
    setIsDialogOpen(false);
    toast({
      title: "Ajout réussi",
      description: "L'entreprise et l'utilisateur ont été ajoutés avec succès"
    });
  };
  
  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setEditUserDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: "Modification réussie",
      description: "Les informations ont été mises à jour avec succès"
    });
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
              <AddCompanyForm 
                onClose={() => setIsDialogOpen(false)} 
                onSuccess={handleAddSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <EnhancedDataTable
        columns={allColumns}
        data={filteredData}
        renderActions={renderActions}
      />
      
      {/* Dialog pour éditer une entreprise */}
      <Dialog open={editDialogOpen && selectedItem?.type === "Entreprise"} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && selectedItem.type === "Entreprise" && (
            <EditCompanyForm 
              company={selectedItem} 
              onClose={() => setEditDialogOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour éditer un utilisateur */}
      <Dialog open={editUserDialogOpen && !selectedItem?.type} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && !selectedItem.type && (
            <EditUserForm 
              user={selectedItem} 
              onClose={() => setEditUserDialogOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
