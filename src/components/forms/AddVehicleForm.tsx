
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SearchableSelect } from "@/components/ui/searchable-select";

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

export default function AddVehicleForm() {
  const [nomVehicule, setNomVehicule] = useState("");
  const [immatriculation, setImmatriculation] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [emplacement, setEmplacement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nomVehicule,
      immatriculation,
      categorie,
      marque,
      modele,
      entreprise,
      emplacement
    });
    // Implement save logic
  };

  const filteredModeles = marque ? modeles[marque as keyof typeof modeles] || [] : [];
  
  const entrepriseOptions = entreprises.map(ent => ({
    value: ent,
    label: ent
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

  return (
    <>
      <SheetHeader className="mb-5">
        <SheetTitle>Ajouter un Véhicule</SheetTitle>
      </SheetHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

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

        <div className="flex justify-end gap-2 mt-6">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </SheetClose>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </>
  );
}
