
import React, { useState } from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import EditUserForm from "@/components/forms/EditUserForm";

export default function UtilisateursPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
    setSelectedUser(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur ${item.nom} a été supprimé avec succès.`
    });
  };

  const handleAdd = () => {
    console.log("Add new item");
    // Implement add logic
  };
  
  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "Modification réussie",
      description: "Les informations de l'utilisateur ont été mises à jour avec succès"
    });
  };

  const renderActions = (item: any) => {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
          <Edit className="h-4 w-4" />
        </Button>
        <DeleteConfirmationDialog
          title="Supprimer l'utilisateur"
          description={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${item.nom}" ? Cette action ne peut pas être annulée.`}
          onConfirm={() => handleDelete(item)}
        />
      </div>
    );
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
        renderActions={renderActions}
      />
      
      {/* Dialog pour éditer un utilisateur */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedUser && (
            <EditUserForm
              user={selectedUser}
              onClose={() => setEditDialogOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
