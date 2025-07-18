import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { createDeviceWithVehicleAssociation } from "@/services/DeviceService";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import { toast } from "@/components/ui/use-toast";

const categories = ["Voiture", "Utilitaire", "Camion", "Moto"];
const marques = ["Peugeot", "Renault", "Citroën", "Toyota", "Fiat", "BMW", "Mercedes"];
const modeles = {
  "Peugeot": ["208", "308", "3008", "5008"],
  "Renault": ["Clio", "Megane", "Captur", "Master"],
  "Citroën": ["C3", "C4", "Berlingo", "Jumpy"],
  "Toyota": ["Yaris", "Corolla", "RAV4", "Hilux"],
  "Fiat": ["500", "Panda", "Ducato", "Doblo"],
  "BMW": ["Serie 1", "Serie 3", "Serie 5", "X5"],
  "Mercedes": ["Classe A", "Classe C", "Classe E", "Sprinter"]
};
const emplacements = ["Paris", "Lyon", "Marseille", "Toulouse", "Lille", "Bordeaux", "Nantes", "Strasbourg", "Nice", "Rennes", "Montpellier"];

interface AddDeviceWithVehicleFormProps {
  onClose?: () => void;
  onSuccess?: (devices: any[]) => void;
}

export default function AddDeviceWithVehicleForm({ onClose, onSuccess }: AddDeviceWithVehicleFormProps) {
  // Vehicle fields
  const [nomVehicule, setNomVehicule] = useState("");
  const [immatriculation, setImmatriculation] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [kilometrage, setKilometrage] = useState("");
  
  // Device fields
  const [imei, setImei] = useState("");
  const [constructor, setConstructor] = useState("");
  const [sim, setSim] = useState("");
  const [typeBoitier, setTypeBoitier] = useState("");
  
  // State management
  const [entreprises, setEntreprises] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { loadCompaniesForSelect } = useCompanyVehicleDevice();

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await loadCompaniesForSelect();
        setEntreprises(companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setEntreprises([]);
      }
    };

    fetchCompanies();
  }, [loadCompaniesForSelect]);

  const showToast = (severity: 'success' | 'error' | 'warning', summary: string, detail: string) => {
    toast({
      title: summary,
      description: detail,
      variant: severity === 'error' ? 'destructive' : 'default',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      // Validate required fields
      if (!immatriculation) {
        showToast('error', 'Erreur', 'L\'immatriculation est obligatoire');
        return;
      }
      
      if (!imei) {
        showToast('error', 'Erreur', 'L\'IMEI est obligatoire');
        return;
      }
      
      if (!entreprise) {
        showToast('error', 'Erreur', 'Veuillez sélectionner une entreprise');
        return;
      }

      // Find the selected company
      const selectedCompany = entreprises.find(company => (company.id || company.name) === entreprise);
      const companyId = selectedCompany ? selectedCompany.id : null;
      const companyName = selectedCompany ? selectedCompany.name : entreprise;

      if (!companyId) {
        showToast('error', 'Erreur', 'Entreprise sélectionnée invalide');
        return;
      }

      // Parse protocol ID from type selector
      const protocolIdNumber = typeBoitier ? parseInt(typeBoitier.replace(/[^0-9]/g, '')) || null : null;

      // Prepare data for creation
      const creationData = {
        // Vehicle data
        immatriculation,
        nomVehicule,
        categorie,
        marque,
        modele,
        emplacement,
        kilometrage,
        companyVehiclesId: companyId,
        company: selectedCompany,
        
        // Device data
        imei,
        constructor: constructor || imei,
        sim,
        protocolId: protocolIdNumber
      };

      console.log('Creating device with vehicle association:', creationData);

      // Create device with vehicle association
      const result = await createDeviceWithVehicleAssociation(creationData);

      // Handle results
      if (result.success) {
        showToast('success', 'Succès', `${result.successCount} appareil(s) créé(s) et associé(s) au véhicule`);
        
        if (onSuccess) {
          onSuccess(result.devices);
        }
        
        // Reset form
        setImmatriculation("");
        setNomVehicule("");
        setCategorie("");
        setMarque("");
        setModele("");
        setEmplacement("");
        setKilometrage("");
        setImei("");
        setConstructor("");
        setSim("");
        setTypeBoitier("");
        setEntreprise("");
        
        if (onClose) onClose();
      } else {
        showToast('error', 'Échec', 'Aucun appareil n\'a pu être créé');
      }

      // Show errors if any
      if (result.errorCount > 0) {
        const errorMessage = result.errors.join(', ').substring(0, 100) + (result.errors.length > 100 ? '...' : '');
        showToast('warning', 'Certains IMEI ont échoué', errorMessage);
      }
      
    } catch (error) {
      console.error('Error in form submission:', error);
      showToast('error', 'Erreur', `Erreur lors de la création: ${error.message || 'Erreur inconnue'}`);
    } finally {
      setIsCreating(false);
    }
  };

  const filteredModeles = marque ? modeles[marque as keyof typeof modeles] || [] : [];
  
  // Create options
  const entrepriseOptions = entreprises.map(company => ({
    value: company.id || company.name,
    label: company.name
  }));
  
  const categorieOptions = categories.map(cat => ({
    value: cat,
    label: cat
  }));
  
  const marqueOptions = marques.map(m => ({
    value: m,
    label: m
  }));
  
  const modeleOptions = filteredModeles.map(m => ({
    value: m,
    label: m
  }));

  const emplacementOptions = emplacements.map(emp => ({
    value: emp,
    label: emp
  }));

  const boitierTypes = ["GPS Simple", "GPS Tracker", "GPS Avancé"];
  const boitierTypeOptions = boitierTypes.map(type => ({
    value: type,
    label: type
  }));

  return (
    <>
      <DialogHeader className="mb-5">
        <DialogTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Créer Device + Véhicule + Association
        </DialogTitle>
      </DialogHeader>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <p className="text-sm font-medium text-blue-800">
          Ce formulaire va automatiquement :
        </p>
        <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
          <li>Créer le boîtier avec l'IMEI fourni</li>
          <li>L'ajouter à Flespi</li>
          <li>Créer le véhicule</li>
          <li>Associer automatiquement le boîtier au véhicule</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vehicle Information */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-900">Informations Véhicule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="Immatriculation *"
                value={immatriculation} 
                onChange={(e) => setImmatriculation(e.target.value)}
                required
              />
            </div>
            <div>
              <Input 
                placeholder="Nom Véhicule"
                value={nomVehicule} 
                onChange={(e) => setNomVehicule(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SearchableSelect 
                options={categorieOptions}
                value={categorie}
                onValueChange={setCategorie}
                placeholder="Catégorie"
              />
            </div>
            
            <div>
              <SearchableSelect 
                options={marqueOptions}
                value={marque}
                onValueChange={(value) => {
                  setMarque(value);
                  setModele("");
                }}
                placeholder="Marque"
              />
            </div>
            
            <div>
              <SearchableSelect 
                options={modeleOptions}
                value={modele} 
                onValueChange={setModele}
                placeholder="Modèle" 
                disabled={!marque}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CompanySearchSelect 
                value={entreprise}
                onValueChange={setEntreprise}
                placeholder="Rechercher une entreprise... *"
                searchFunction={searchCompaniesReal}
              />
            </div>
            <div>
              <SearchableSelect 
                options={emplacementOptions}
                value={emplacement}
                onValueChange={setEmplacement}
                placeholder="Emplacement"
              />
            </div>
          </div>

          <div>
            <Input 
              placeholder="Kilométrage"
              value={kilometrage} 
              onChange={(e) => setKilometrage(e.target.value)}
            />
          </div>
        </div>

        {/* Device Information */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-900">Informations Boîtier</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="IMEI *"
                value={imei} 
                onChange={(e) => setImei(e.target.value)}
                required
              />
            </div>
            <div>
              <Input 
                placeholder="Constructor (optionnel)"
                value={constructor} 
                onChange={(e) => setConstructor(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="SIM"
                value={sim} 
                onChange={(e) => setSim(e.target.value)}
              />
            </div>
            <div>
              <SearchableSelect 
                options={boitierTypeOptions}
                value={typeBoitier}
                onValueChange={setTypeBoitier}
                placeholder="Type de boîtier"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Création en cours...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Créer Device + Véhicule + Association
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}