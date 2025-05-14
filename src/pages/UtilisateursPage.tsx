
import React, { useState, useEffect } from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import EditUserForm from "@/components/forms/EditUserForm";
import { EnhancedDataTable } from "@/components/tables/EnhancedDataTable";
import { userService, companyService, User, Company } from "@/services/awsService";

export default function UtilisateursPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement des données AWS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await userService.listUsers();
        const companiesData = await companyService.listCompanies();
        
        setUsers(usersData);
        setCompanies(companiesData);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les utilisateurs depuis AWS",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Définition des colonnes
  const columns = [
    { id: "username", label: "Nom d'utilisateur", sortable: true },
    { id: "password", label: "Mot de passe", sortable: false },
    { 
      id: "companyId", 
      label: "Entreprise", 
      sortable: true,
      renderCell: (value: string) => {
        const company = companies.find(c => c.id === value);
        return company ? company.name : value || "N/A";
      }
    },
    { id: "role", label: "Rôle", sortable: true },
  ];

  // Préparation des options de recherche
  const searchFields = [
    { id: "username", label: "Nom Utilisateur" },
    { 
      id: "companyId", 
      label: "Entreprise", 
      type: "select",
      options: companies.map(company => ({
        value: company.id || "",
        label: company.name
      }))
    },
  ];

  const handleSearch = (formData: any) => {
    console.log("Searching with:", formData);
    // Implement search logic
  };

  const handleEdit = (item: User) => {
    console.log("Edit item:", item);
    setSelectedUser(item);
    setEditDialogOpen(true);
  };

  const handleDelete = async (item: User) => {
    if (!item.id) return;
    
    try {
      await userService.deleteUser(item.id);
      setUsers(users.filter(user => user.id !== item.id));
      
      toast({
        title: "Utilisateur supprimé",
        description: `L'utilisateur ${item.username} a été supprimé avec succès.`
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const handleAdd = () => {
    console.log("Add new user");
    // Implement add logic
  };
  
  const handleEditSuccess = async () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    
    try {
      const usersData = await userService.listUsers();
      setUsers(usersData);
      
      toast({
        title: "Modification réussie",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
    }
  };

  const renderActions = (item: User) => {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
          <Edit className="h-4 w-4" />
        </Button>
        <DeleteConfirmationDialog
          title="Supprimer l'utilisateur"
          description={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${item.username}" ? Cette action ne peut pas être annulée.`}
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
      
      {loading ? (
        <div className="flex justify-center py-8">
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : (
        <EnhancedDataTable
          columns={columns}
          data={users}
          renderActions={renderActions}
        />
      )}
      
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
