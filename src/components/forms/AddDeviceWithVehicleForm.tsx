import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, AlertCircle, CheckCircle } from "lucide-react";
import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { useVehicleValidation } from "@/hooks/useVehicleValidation";
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

  // Vehicle validation
  const { 
    isValidating, 
    validationError, 
    checkImmatriculation, 
    validateImmatFormat,
    clearValidationError 
  } = useVehicleValidation();
  
  const [immatValidationStatus, setImmatValidationStatus] = useState(null); // null, 'valid', 'invalid', 'exists'
  const [existingVehicle, setExistingVehicle] = useState(null);

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

  // Debounced immatriculation validation
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (immatriculation && immatriculation.trim()) {
        // First validate format
        const formatValidation = validateImmatFormat(immatriculation);
        if (!formatValidation.isValid) {
          setImmatValidationStatus('invalid');
          return;
        }

        // Then check if exists
        try {
          const result = await checkImmatriculation(immatriculation);
          if (result.exists) {
            setImmatValidationStatus('exists');
            setExistingVehicle(result.vehicle);
          } else {
            setImmatValidationStatus('valid');
            setExistingVehicle(null);
          }
        } catch (error) {
          console.error('Error validating immatriculation:', error);
          setImmatValidationStatus('invalid');
        }
      } else {
        setImmatValidationStatus(null);
        setExistingVehicle(null);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [immatriculation, checkImmatriculation, validateImmatFormat]);

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

      // Check immatriculation format
      const formatValidation = validateImmatFormat(immatriculation);
      if (!formatValidation.isValid) {
        showToast('error', 'Erreur', formatValidation.error);
        return;
      }

      // Warn if vehicle already exists
      if (immatValidationStatus === 'exists' && existingVehicle) {
        const confirmMessage = `Un véhicule avec l'immatriculation "${immatriculation}" existe déjà (Entreprise: ${existingVehicle.entreprise || 'Non définie'}). Voulez-vous associer le boîtier à ce véhicule existant ?`;
        
        if (!window.confirm(confirmMessage)) {
          showToast('warning', 'Opération annulée', 'Veuillez modifier l\'immatriculation pour créer un nouveau véhicule');
          return;
        }

        // If user confirms, we'll try to associate with existing vehicle
        // The backend should handle this case
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
      
      // Enhanced error handling for duplicate immatriculation
      let errorMessage = error.message || 'Erreur inconnue';
      
      if (error.message && error.message.includes('immatriculation existe déjà')) {
        errorMessage = 'Cette immatriculation est déjà utilisée. Veuillez en choisir une autre ou associer le boîtier au véhicule existant.';
      }
      
      showToast('error', 'Erreur', `Erreur lors de la création: ${errorMessage}`);
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

  // Immatriculation validation indicator
  const renderImmatValidationIcon = () => {
    if (isValidating) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>;
    }
    
    switch (immatValidationStatus) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'exists':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'invalid':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getImmatValidationMessage = () => {
    if (validationError) {
      return { type: 'error', message: validationError };
    }
    
    switch (immatValidationStatus) {
      case 'valid':
        return { type: 'success', message: 'Immatriculation disponible' };
      case 'exists':
        return { 
          type: 'warning', 
          message: `Véhicule existant${existingVehicle?.entreprise ? ` (${existingVehicle.entreprise})` : ''}. Le boîtier sera associé au véhicule existant.` 
        };
      case 'invalid':
        const formatValidation = validateImmatFormat(immatriculation);
        return { type: 'error', message: formatValidation.error || 'Format invalide' };
      default:
        return null;
    }
  };

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
            <div className="relative">
              <div className="relative">
                <Input 
                  placeholder="Immatriculation *"
                  value={immatriculation} 
                  onChange={(e) => {
                    setImmatriculation(e.target.value);
                    clearValidationError();
                  }}
                  required
                  className={`pr-10 ${
                    immatValidationStatus === 'valid' ? 'border-green-500' :
                    immatValidationStatus === 'exists' ? 'border-orange-500' :
                    immatValidationStatus === 'invalid' ? 'border-red-500' : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {renderImmatValidationIcon()}
                </div>
              </div>
              
              {/* Validation message */}
              {(() => {
                const validation = getImmatValidationMessage();
                if (!validation) return null;
                
                const textColor = validation.type === 'success' ? 'text-green-600' :
                                validation.type === 'warning' ? 'text-orange-600' : 'text-red-600';
                
                return (
                  <p className={`text-xs mt-1 ${textColor}`}>
                    {validation.message}
                  </p>
                );
              })()}
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
