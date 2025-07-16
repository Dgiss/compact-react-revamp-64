
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { toast } from "@/components/ui/use-toast";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import * as VehicleService from "@/services/VehicleService";

interface AssociateVehicleFormProps {
  device?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssociateVehicleForm({ device, onClose, onSuccess }: AssociateVehicleFormProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [companyVehicles, setCompanyVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const {
    companies,
    loadCompaniesForSelect,
    getVehiclesByCompany,
    getAllVehiclesByCompany
  } = useCompanyVehicleDevice();

  // Load companies on mount
  useEffect(() => {
    loadCompaniesForSelect();
  }, [loadCompaniesForSelect]);

  // Create company options for select
  const companyOptions = companies.map(company => ({
    value: company.id,
    label: company.name || company.nom
  }));

  // Load vehicles when company is selected
  useEffect(() => {
    if (selectedCompany) {
      setShowAllVehicles(false);
      setLoadingTimeout(false);
      
      const loadVehicles = async () => {
        console.log('=== LOADING VEHICLES FOR SELECTED COMPANY ===', selectedCompany);
        setIsLoading(true);
        
        // Set a timeout to detect stuck loading
        const timeoutId = setTimeout(() => {
          setLoadingTimeout(true);
        }, 8000); // 8 seconds timeout
        
        try {
          const vehicles = await getVehiclesByCompany(selectedCompany);
          console.log('Available vehicles returned from hook:', vehicles);
          
          clearTimeout(timeoutId);
          setLoadingTimeout(false);
          
          if (vehicles.length === 0) {
            console.log('No available vehicles found, loading all vehicles as fallback');
            
            // Fallback: load ALL vehicles (including those with IMEI)
            const allVehicles = await getAllVehiclesByCompany(selectedCompany);
            console.log('All vehicles (fallback):', allVehicles);
            
            setCompanyVehicles(allVehicles);
            setShowAllVehicles(true);
            
            if (allVehicles.length === 0) {
              toast({
                title: "Aucun véhicule trouvé",
                description: "Aucun véhicule trouvé pour cette entreprise",
                variant: "destructive",
              });
            } else {
              toast({
                title: "Véhicules chargés",
                description: `${allVehicles.length} véhicule(s) trouvé(s) (certains ont déjà un boîtier)`,
              });
            }
          } else {
            setCompanyVehicles(vehicles);
            setShowAllVehicles(false);
          }
        } catch (error) {
          clearTimeout(timeoutId);
          console.error('Error loading vehicles:', error);
          
          // Try fallback even on error
          try {
            console.log('Error occurred, trying fallback to all vehicles');
            const allVehicles = await getAllVehiclesByCompany(selectedCompany);
            setCompanyVehicles(allVehicles);
            setShowAllVehicles(true);
            
            toast({
              title: "Véhicules chargés (mode de récupération)",
              description: `${allVehicles.length} véhicule(s) chargé(s) malgré l'erreur`,
            });
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            toast({
              title: "Erreur",
              description: "Erreur lors du chargement des véhicules",
              variant: "destructive",
            });
          }
        } finally {
          setIsLoading(false);
        }
      };
      
      loadVehicles();
      setSelectedVehicle(""); // Reset vehicle selection
    } else {
      setCompanyVehicles([]);
      setShowAllVehicles(false);
    }
  }, [selectedCompany, getVehiclesByCompany, getAllVehiclesByCompany]);

  // Create vehicle options for select with status indicators
  const vehicleOptions = companyVehicles.map(vehicle => {
    const baseLabel = `${vehicle.immatriculation || vehicle.immat} - ${vehicle.nomVehicle || vehicle.nomVehicule || vehicle.marque}`;
    
    if (showAllVehicles && vehicle.isAssociated) {
      return {
        value: vehicle.immatriculation || vehicle.immat,
        label: `${baseLabel} (Déjà associé - ${vehicle.associatedDevice})`
      };
    }
    
    return {
      value: vehicle.immatriculation || vehicle.immat,
      label: baseLabel
    };
  });

  const handleSubmit = async () => {
    console.log('=== SUBMIT ASSOCIATION ===');
    console.log('Selected company:', selectedCompany);
    console.log('Selected vehicle:', selectedVehicle);
    console.log('Device:', device);
    
    if (!selectedCompany || !selectedVehicle) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner une entreprise et un véhicule",
        variant: "destructive",
      });
      return;
    }

    if (!device?.imei) {
      toast({
        title: "Erreur",
        description: "IMEI du boîtier manquant",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Attempting to associate device', device.imei, 'to vehicle', selectedVehicle);
      // Associate device to vehicle
      const result = await VehicleService.associateDeviceToVehicle(device.imei, selectedVehicle);
      console.log('Association result:', result);
      
      toast({
        title: "Association réussie",
        description: `Le boîtier ${device.imei} a été associé au véhicule ${selectedVehicle}`,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error associating device:', error);
      console.error('Full error object:', error);
      
      let errorMessage = error.message;
      if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors[0].message;
      }
      
      toast({
        title: "Erreur",
        description: `Erreur lors de l'association: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Entreprise
        </label>
        <CompanySearchSelect 
          value={selectedCompany}
          onValueChange={setSelectedCompany}
          placeholder="Sélectionner une entreprise"
          searchFunction={searchCompaniesReal}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Véhicules ({vehicleOptions.length} trouvé{vehicleOptions.length !== 1 ? 's' : ''}) 
          {isLoading && <span className="text-sm text-muted-foreground">(Chargement...)</span>}
          {showAllVehicles && (
            <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
              Tous les véhicules (y compris ceux avec boîtier)
            </span>
          )}
          {loadingTimeout && (
            <span className="ml-2 text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
              Chargement lent détecté...
            </span>
          )}
        </label>
        <SearchableSelect 
          options={vehicleOptions}
          value={selectedVehicle}
          onValueChange={setSelectedVehicle}
          placeholder={
            !selectedCompany 
              ? "Sélectionner d'abord une entreprise" 
              : isLoading 
                ? "Chargement des véhicules..." 
                : vehicleOptions.length === 0
                  ? "Aucun véhicule trouvé"
                  : showAllVehicles
                    ? "Choisir un véhicule (certains ont déjà un boîtier)"
                    : "Sélectionner un véhicule disponible"
          }
          disabled={!selectedCompany || isLoading || vehicleOptions.length === 0}
        />
        {selectedCompany && !isLoading && vehicleOptions.length === 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Aucun véhicule trouvé pour cette entreprise.
          </p>
        )}
        {showAllVehicles && vehicleOptions.length > 0 && (
          <p className="text-sm text-blue-600 mt-1">
            ℹ️ Certains véhicules ont déjà un boîtier associé. Vous pouvez le remplacer si nécessaire.
          </p>
        )}
      </div>

      {device && (
        <div className="bg-muted/40 p-3 rounded-md">
          <h4 className="font-medium mb-2">Boîtier à associer :</h4>
          <div className="space-y-1 text-sm">
            <p><strong>IMEI :</strong> {device.imei}</p>
            {device.telephone && <p><strong>SIM :</strong> {device.telephone}</p>}
            {device.typeBoitier && <p><strong>Type :</strong> {device.typeBoitier}</p>}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2 mt-6">
        <SheetClose asChild>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
        </SheetClose>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedCompany || !selectedVehicle || isSubmitting || vehicleOptions.length === 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Association...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
