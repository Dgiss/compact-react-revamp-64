
import React, { useState, useEffect } from "react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import AddCompanyForm from "@/components/forms/AddCompanyForm";
import { CompanyUsersList } from "@/components/CompanyUsersList";
import EditCompanyForm from "@/components/forms/EditCompanyForm";
import EditUserForm from "@/components/forms/EditUserForm";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { companyService, userService, Company, User } from "@/services/awsService";
import { useToast } from "@/hooks/use-toast";

export default function EntreprisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Chargement des données AWS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const companiesData = await companyService.listCompanies();
        const usersData = await userService.listUsers();
        
        setCompanies(companiesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données depuis AWS",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Définition de toutes les colonnes possibles
  const allColumns: Column[] = [
    // Colonnes communes
    { 
      id: "name", 
      label: "Entreprise", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => row.type === "company" ? value : row.companyId || "N/A"
    },
    
    // Colonnes spécifiques aux entreprises
    { id: "contact", label: "Contact", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
    { id: "email", label: "Email", sortable: true, visible: true },
    { id: "adresse", label: "Adresse", sortable: true, visible: true },
    { id: "ville", label: "Ville", sortable: true, visible: true },
    
    // Colonnes spécifiques aux utilisateurs
    { id: "username", label: "Nom d'utilisateur", sortable: true, visible: true },
    { id: "password", label: "Mot de passe", sortable: true, visible: true },
    { id: "role", label: "Rôle", sortable: true, visible: true },
  ];

  // Préparation des données pour l'affichage
  const companiesData = companies.map(company => ({
    ...company,
    type: "company"
  }));

  const usersData = users.map(user => ({
    ...user,
    type: "user"
  }));

  // Fusionner les données en un seul tableau
  const combinedData = [...companiesData, ...usersData];

  const handleEdit = async (item: any) => {
    setSelectedItem(item);
    
    if (item.type === "company") {
      try {
        // Récupérer les détails complets de l'entreprise
        const companyDetails = await companyService.getCompany(item.id);
        setSelectedItem({ ...companyDetails, type: "company" });
        setEditDialogOpen(true);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de l'entreprise:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'entreprise",
          variant: "destructive"
        });
      }
    } else {
      setEditUserDialogOpen(true);
    }
  };

  const handleDelete = async (item: any) => {
    try {
      if (item.type === "company") {
        await companyService.deleteCompany(item.id);
        setCompanies(companies.filter(company => company.id !== item.id));
      } else {
        await userService.deleteUser(item.id);
        setUsers(users.filter(user => user.id !== item.id));
      }
      
      toast({
        title: item.type === "company" ? "Entreprise supprimée" : "Utilisateur supprimé",
        description: `${item.type === "company" ? item.name : item.username} a été supprimé avec succès.`
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const renderActions = (item: any) => {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
          <Edit className="h-4 w-4" />
        </Button>
        
        <DeleteConfirmationDialog
          title={item.type === "company" ? "Supprimer l'entreprise" : "Supprimer l'utilisateur"}
          description={item.type === "company" 
            ? `Êtes-vous sûr de vouloir supprimer l'entreprise "${item.name}" ? Cette action ne peut pas être annulée.`
            : `Êtes-vous sûr de vouloir supprimer l'utilisateur "${item.username}" ? Cette action ne peut pas être annulée.`
          }
          onConfirm={() => handleDelete(item)}
        />
        
        {item.type === "company" && (
          <CompanyUsersList 
            companyName={item.name} 
            users={item.users?.items || []} 
          />
        )}
      </div>
    );
  };

  const handleAddSuccess = async () => {
    setIsDialogOpen(false);
    try {
      const companiesData = await companyService.listCompanies();
      const usersData = await userService.listUsers();
      
      setCompanies(companiesData);
      setUsers(usersData);
      
      toast({
        title: "Ajout réussi",
        description: "L'entreprise a été ajoutée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
    }
  };
  
  const handleEditSuccess = async () => {
    setEditDialogOpen(false);
    setEditUserDialogOpen(false);
    setSelectedItem(null);
    
    try {
      const companiesData = await companyService.listCompanies();
      const usersData = await userService.listUsers();
      
      setCompanies(companiesData);
      setUsers(usersData);
      
      toast({
        title: "Modification réussie",
        description: "Les informations ont été mises à jour avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
    }
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
      
      {loading ? (
        <div className="flex justify-center py-8">
          <p>Chargement des données...</p>
        </div>
      ) : (
        <EnhancedDataTable
          columns={allColumns}
          data={combinedData}
          renderActions={renderActions}
        />
      )}
      
      <Dialog open={editDialogOpen && selectedItem?.type === "company"} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && selectedItem.type === "company" && (
            <EditCompanyForm 
              company={selectedItem} 
              onClose={() => setEditDialogOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={editUserDialogOpen && selectedItem?.type === "user"} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && selectedItem.type === "user" && (
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
