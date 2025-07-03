
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { SearchableSelect } from "@/components/ui/searchable-select";
import * as CompanyService from "@/services/CompanyService";

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
const entreprises = ["MBSC", "PHENIX IDFTP", "ADANEV MOBILITES", "Kick Services", "MATTEI / HABICONFORT"];
const emplacements = ["Paris", "Lyon", "Marseille", "Toulouse", "Lille", "Bordeaux", "Nantes", "Strasbourg", "Nice", "Rennes", "Montpellier"];

interface AddVehicleFormProps {
  onClose?: () => void;
  onSave?: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

export default function AddVehicleForm({ onClose, onSave, initialData, isEditing = false }: AddVehicleFormProps) {
  const [nomVehicule, setNomVehicule] = useState("");
  const [immatriculation, setImmatriculation] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [imei, setImei] = useState("");
  const [typeBoitier, setTypeBoitier] = useState("");
  const [sim, setSim] = useState("");
  const [telephone, setTelephone] = useState("");
  const [kilometrage, setKilometrage] = useState("");
  const [type, setType] = useState("vehicle");
  const [companies, setCompanies] = useState([]);

  // Load companies on mount
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companiesData = await CompanyService.fetchCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error loading companies:', error);
      }
    };
    
    loadCompanies();
  }, []);

  // Load initial data for editing mode
  useEffect(() => {
    if (initialData) {
      setNomVehicule(initialData.nomVehicule || "");
      setImmatriculation(initialData.immatriculation || "");
      setCategorie(initialData.categorie || "");
      setMarque(initialData.marque || "");
      setModele(initialData.modele || "");
      setEntreprise(initialData.entreprise || "");
      setEmplacement(initialData.emplacement || "");
      setImei(initialData.imei || "");
      setTypeBoitier(initialData.typeBoitier || "");
      setSim(initialData.sim || "");
      setTelephone(initialData.telephone || "");
      setKilometrage(initialData.kilometrage || "");
      setType(initialData.type || "vehicle");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      nomVehicule,
      immatriculation,
      categorie,
      marque,
      modele,
      entreprise,
      emplacement,
      imei,
      typeBoitier,
      sim,
      telephone,
      kilometrage,
      type
    };
    
    console.log(formData);
    
    // Call onSave if provided (for editing mode)
    if (onSave) {
      onSave(formData);
    }
    
    // Call onClose if provided
    if (onClose) onClose();
  };

  const filteredModeles = marque ? modeles[marque as keyof typeof modeles] || [] : [];
  
  const entrepriseOptions = companies.map(company => ({
    value: company.name,
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

  // Determine form fields based on the item type
  const isVehicle = type === "vehicle";
  const isDevice = type === "device";

  return (
    <>
      {!isEditing && (
        <DialogHeader className="mb-5">
          <DialogTitle>Ajouter un {isVehicle ? "Véhicule" : "Boîtier"}</DialogTitle>
        </DialogHeader>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common fields for both vehicle and device */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isVehicle && (
            <>
              <div>
                <Input 
                  placeholder="Nom Véhicule"
                  value={nomVehicule} 
                  onChange={(e) => setNomVehicule(e.target.value)}
                />
              </div>
              <div>
                <Input 
                  placeholder="Immatriculation" 
                  value={immatriculation}
                  onChange={(e) => setImmatriculation(e.target.value)}
                />
              </div>
            </>
          )}
          
          {isDevice && (
            <>
              <div>
                <Input 
                  placeholder="IMEI"
                  value={imei} 
                  onChange={(e) => setImei(e.target.value)}
                  readOnly={isEditing} // IMEI shouldn't be editable in edit mode
                />
              </div>
              <div>
                <Input 
                  placeholder="SIM" 
                  value={sim}
                  onChange={(e) => setSim(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {isVehicle && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SearchableSelect 
                options={categorieOptions}
                value={categorie}
                onValueChange={setCategorie}
                placeholder="Categorie"
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
                placeholder="Model" 
                disabled={!marque}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SearchableSelect 
              options={entrepriseOptions}
              value={entreprise}
              onValueChange={setEntreprise}
              placeholder="Entreprise"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SearchableSelect 
              options={boitierTypeOptions}
              value={typeBoitier}
              onValueChange={setTypeBoitier}
              placeholder="Type de boîtier"
            />
          </div>
          <div>
            <Input 
              placeholder="Téléphone"
              value={telephone} 
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
        </div>

        {isVehicle && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="Kilométrage"
                value={kilometrage} 
                onChange={(e) => setKilometrage(e.target.value)}
              />
            </div>
            <div>
              <Input 
                placeholder="IMEI"
                value={imei} 
                onChange={(e) => setImei(e.target.value)}
                readOnly={isEditing} // IMEI shouldn't be editable in edit mode
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </div>
      </form>
    </>
  );
}
