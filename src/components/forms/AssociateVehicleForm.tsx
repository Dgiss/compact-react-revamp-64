
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { toast } from "@/components/ui/use-toast";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
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
        setIsLoading(true);
        try {
          const vehicles = await getVehiclesByCompany(selectedCompany);
          // Filter vehicles that don't have a device associated
          const availableVehicles = vehicles.filter(vehicle => !vehicle.imei || vehicle.imei === "");
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
      // Associate device to vehicle
      await VehicleService.associateDeviceToVehicle(device.imei, selectedVehicle);
      
      toast({
        title: "Association réussie",
        description: `Le boîtier ${device.imei} a été associé au véhicule ${selectedVehicle}`,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error associating device:', error);
      toast({
        title: "Erreur",
        description: `Erreur lors de l'association: ${error.message}`,
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
        <SearchableSelect 
          options={companyOptions}
          value={selectedCompany}
          onValueChange={setSelectedCompany}
          placeholder="Sélectionner une entreprise"
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
