import React, { useState, useEffect } from "react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import AddCompanyForm from "@/components/forms/AddCompanyForm";
import { CompanyUsersList } from "@/components/CompanyUsersList";
import EditCompanyForm from "@/components/forms/EditCompanyForm";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import * as CompanyService from "@/services/CompanyService";

export default function EntreprisesPage() {
  // States
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Search states
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchSiret, setSearchSiret] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch all companies with users
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      console.log('Fetching companies with users...');
      const allItems = await CompanyService.fetchCompaniesWithUsers();
      console.log('Companies fetched successfully:', allItems.length);
      setCompanies(allItems);
    } catch (err) {
      console.error('Error fetching companies:', err);
      toast({
        title: "Erreur",
        description: `Erreur lors de la récupération des entreprises: ${err.message || 'Erreur inconnue'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Search companies with filters
  const fetchFilteredCompanies = async () => {
    setSearchLoading(true);
    
    try {
      const allCompanies = await CompanyService.fetchFilteredCompanies(searchName, searchEmail, searchSiret);
      setCompanies(allCompanies);
      setIsFiltered(true);
      
      toast({
        title: "Recherche réussie",
        description: `${allCompanies.length} entreprises trouvées`,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la recherche",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  // Reset search
  const resetFilter = async () => {
    setSearchName('');
    setSearchEmail('');
    setSearchSiret('');
    setIsFiltered(false);
    await fetchCompanies();
  };

  // Update company
  const updateCompanyData = async (data) => {
    try {
      await CompanyService.updateCompanyAndUser({
        companyData: data
      });

      toast({
        title: "Succès",
        description: "Entreprise modifiée avec succès",
      });
      
      await fetchCompanies();
    } catch (err) {
      console.error('Error updating company:', err);
      toast({
        title: "Erreur",
        description: err.message || "Erreur lors de la modification",
        variant: "destructive",
      });
    }
  };

  // Delete company and associated users
  const handleDelete = async (item) => {
    try {
      await CompanyService.deleteCompanyAndUser(item);

      toast({
        title: "Succès",
        description: "Entreprise et utilisateurs supprimés avec succès",
      });
      
      await fetchCompanies();
    } catch (err) {
      console.error('Error deleting company:', err);
      toast({
        title: "Erreur",
        description: err.message || "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Define columns for the table
  const allColumns = [
    { 
      id: "name", 
      label: "Entreprise", 
      sortable: true, 
      visible: true,
      renderCell: (value, row) => {
        return <CompanyUsersList 
          companyName={value} 
          users={row.users?.items || []} 
        />;
      }
    },
    { id: "contact", label: "Contact", sortable: true, visible: true },
    { id: "mobile", label: "Téléphone", sortable: true, visible: true },
    { id: "email", label: "Email", sortable: true, visible: true },
    { id: "address", label: "Adresse", sortable: true, visible: true },
    { id: "city", label: "Ville", sortable: true, visible: true },
    { id: "siret", label: "Siret", sortable: true, visible: false },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const renderActions = (item) => {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
          <Edit className="h-4 w-4" />
        </Button>
        
        <DeleteConfirmationDialog
          title="Supprimer l'entreprise"
          description={`Êtes-vous sûr de vouloir supprimer l'entreprise "${item.name}" ? Cette action ne peut pas être annulée.`}
          onConfirm={() => handleDelete(item)}
        />
      </div>
    );
  };

  const handleAddSuccess = () => {
    setIsDialogOpen(false);
    fetchCompanies();
    toast({
      title: "Ajout réussi",
      description: "L'entreprise et l'utilisateur ont été créés avec succès"
    });
  };
  
  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setSelectedItem(null);
    fetchCompanies();
    toast({
      title: "Modification réussie",
      description: "Les informations ont été mises à jour avec succès"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement des entreprises...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-2">Nom entreprise</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Rechercher par nom..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Rechercher par email..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Siret</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={searchSiret}
            onChange={(e) => setSearchSiret(e.target.value)}
            placeholder="Rechercher par siret..."
          />
        </div>
        <div className="flex items-end gap-2">
          <Button 
            variant="outline"
            onClick={resetFilter}
            disabled={searchLoading}
          >
            Réinitialiser
          </Button>
          <Button 
            onClick={fetchFilteredCompanies}
            disabled={searchLoading}
          >
            {searchLoading ? "Recherche..." : "Rechercher"}
          </Button>
        </div>
      </div>

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
              <DialogTitle>Ajouter une entreprise</DialogTitle>
              <DialogDescription>
                Créez une nouvelle entreprise en remplissant les informations ci-dessous.
              </DialogDescription>
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
        data={companies}
        renderActions={renderActions}
        loading={loading}
        enablePagination={true}
        defaultItemsPerPage={50}
      />
      
      {/* Edit Company Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Modifier l'entreprise</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'entreprise sélectionnée.
          </DialogDescription>
          {selectedItem && (
            <EditCompanyForm 
              company={selectedItem} 
              onClose={() => setEditDialogOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
