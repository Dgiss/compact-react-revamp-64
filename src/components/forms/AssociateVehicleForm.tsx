
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

  const {
    companies,
    loadCompaniesForSelect,
    getVehiclesByCompany
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
      const loadVehicles = async () => {
        console.log('=== LOADING VEHICLES FOR SELECTED COMPANY ===', selectedCompany);
        setIsLoading(true);
        try {
          const vehicles = await getVehiclesByCompany(selectedCompany);
          console.log('Vehicles returned from hook:', vehicles);
          
          // The hook already filters for available vehicles, but let's double-check
          const availableVehicles = vehicles.filter(vehicle => 
            (!vehicle.imei || vehicle.imei === "") && 
            (!vehicle.deviceData || !vehicle.deviceData.imei)
          );
          
          console.log('Final available vehicles for association:', availableVehicles);
          setCompanyVehicles(availableVehicles);
          
          if (availableVehicles.length === 0) {
            toast({
              title: "Aucun véhicule disponible",
              description: "Tous les véhicules de cette entreprise ont déjà un boîtier associé",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Error loading vehicles:', error);
          toast({
            title: "Erreur",
            description: "Erreur lors du chargement des véhicules",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      loadVehicles();
      setSelectedVehicle(""); // Reset vehicle selection
    }
  }, [selectedCompany, getVehiclesByCompany]);

  // Create vehicle options for select
  const vehicleOptions = companyVehicles.map(vehicle => ({
    value: vehicle.immatriculation || vehicle.immat,
    label: `${vehicle.immatriculation || vehicle.immat} - ${vehicle.nomVehicle || vehicle.nomVehicule || vehicle.marque}`
  }));

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
          Véhicules {isLoading && <span className="text-sm text-muted-foreground">(Chargement...)</span>}
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
                  ? "Aucun véhicule disponible"
                  : "Sélectionner un véhicule"
          }
          disabled={!selectedCompany || isLoading || vehicleOptions.length === 0}
        />
        {selectedCompany && !isLoading && vehicleOptions.length === 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Tous les véhicules de cette entreprise ont déjà un boîtier associé.
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
