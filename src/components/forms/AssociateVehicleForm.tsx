
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { SearchableSelect } from "@/components/ui/searchable-select";

interface AssociateVehicleFormProps {
  device?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssociateVehicleForm({ device, onClose, onSuccess }: AssociateVehicleFormProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  // Données factices des entreprises et véhicules
  const companies = ["MBSC", "PHENIX IDFTP", "ADANEV MOBILITES", "Kick Services", "MATTEI / HABICONFORT"];
  
  const companyOptions = companies.map(company => ({
    value: company,
    label: company
  }));
  
  // Les véhicules seraient normalement filtrés en fonction de l'entreprise sélectionnée
  const vehicles = [
    { id: "1", name: "GD 120 NK - Peugeot 308" },
    { id: "2", name: "EC 430 MQ - Renault Master" },
    { id: "3", name: "GY-861-SF - Toyota Yaris" },
    { id: "4", name: "GH-290-QC - Citroën C3" },
    { id: "5", name: "GH-968-ZX - Fiat Ducato" },
  ];
  
  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.name
  }));
  
  const handleSubmit = () => {
    if (!selectedCompany || !selectedVehicle) {
      return;
    }
    
    console.log("Association soumise", {
      device,
      company: selectedCompany,
      vehicle: selectedVehicle,
    });
    
    // Dans une implémentation réelle, nous enverrions ces données au serveur
    onSuccess();
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
          Véhicules
        </label>
        <SearchableSelect 
          options={vehicleOptions}
          value={selectedVehicle}
          onValueChange={setSelectedVehicle}
          placeholder="Sélectionner un véhicule"
          disabled={!selectedCompany}
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <SheetClose asChild>
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
        </SheetClose>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedCompany || !selectedVehicle}
        >
          <Save className="h-4 w-4 mr-2" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
