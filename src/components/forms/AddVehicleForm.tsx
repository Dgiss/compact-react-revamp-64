
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { createDevice } from "@/services/DeviceService";
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
  const [entreprises, setEntreprises] = useState([]);
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [shouldCreateDevice, setShouldCreateDevice] = useState(false);
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

  // Load initial data for editing mode
  useEffect(() => {
    if (initialData && entreprises.length > 0) {
      setNomVehicule(initialData.nomVehicule || "");
      setImmatriculation(initialData.immatriculation || "");
      setCategorie(initialData.categorie || "");
      setMarque(initialData.marque || "");
      setModele(initialData.modele || "");
      
      // Find company ID by name for backward compatibility
      const foundCompany = entreprises.find(company => company.name === initialData.entreprise);
      setEntreprise(foundCompany ? foundCompany.id || foundCompany.name : initialData.entreprise || "");
      
      setEmplacement(initialData.emplacement || "");
      setImei(initialData.imei || "");
      setTypeBoitier(initialData.typeBoitier || "");
      setSim(initialData.sim || "");
      setTelephone(initialData.telephone || "");
      setKilometrage(initialData.kilometrage || "");
      setType(initialData.type || "vehicle");
    }
  }, [initialData, entreprises]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingDevice(true);
    
    try {
      // Find the company name from the selected ID for backward compatibility
      const selectedCompany = entreprises.find(company => (company.id || company.name) === entreprise);
      const entrepriseName = selectedCompany ? selectedCompany.name : entreprise;
      
      // Create device first if IMEI is provided and we're creating a vehicle
      let deviceCreated = false;
      if (imei && (type === "vehicle" || shouldCreateDevice) && !isEditing) {
        try {
          await createDevice({
            imei: imei,
            sim: sim,
            protocolId: typeBoitier,
            constructor: imei,
            deviceVehicleImmat: immatriculation // Associate with vehicle if creating vehicle
          });
          deviceCreated = true;
          
          toast({
            title: "Boîtier créé",
            description: `Boîtier ${imei} créé et ajouté à Flespi avec succès`,
          });
        } catch (deviceError) {
          console.error('Error creating device:', deviceError);
          toast({
            title: "Erreur boîtier",
            description: "Erreur lors de la création du boîtier, mais le véhicule sera créé",
            variant: "destructive",
          });
        }
      }
      
      // Create form data with only serializable values (primitives)
      const formData = {
        nomVehicule: nomVehicule || "",
        immatriculation: immatriculation || "",
        categorie: categorie || "",
        marque: marque || "",
        modele: modele || "",
        entreprise: entrepriseName || "", // Send company name for compatibility
        companyVehiclesId: selectedCompany?.id, // Also send company ID for GraphQL
        emplacement: emplacement || "",
        imei: imei || "",
        typeBoitier: typeBoitier || "",
        sim: sim || "",
        telephone: telephone || "",
        kilometrage: kilometrage || "",
        type: type || "vehicle",
        deviceCreated: deviceCreated // Indicate if device was created
      };
      
      console.log('Form data being submitted:', formData);
      
      // Call onSave if provided (for editing mode)
      if (onSave) {
        onSave(formData);
      }
      
      // Call onClose if provided
      if (onClose) onClose();
      
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la soumission du formulaire",
        variant: "destructive",
      });
    } finally {
      setIsCreatingDevice(false);
    }
  };

  const filteredModeles = marque ? modeles[marque as keyof typeof modeles] || [] : [];
  
  // Create unique options using company ID as value and name as label
  const entrepriseOptions = entreprises.map(company => ({
    value: company.id || company.name, // Use ID as unique value, fallback to name
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
            <CompanySearchSelect 
              value={entreprise}
              onValueChange={setEntreprise}
              placeholder="Rechercher une entreprise..."
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
                placeholder="IMEI (optionnel)"
                value={imei} 
                onChange={(e) => setImei(e.target.value)}
                readOnly={isEditing} // IMEI shouldn't be editable in edit mode
              />
            </div>
          </div>
        )}
        
        {isVehicle && imei && !isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="createDevice"
                checked={shouldCreateDevice}
                onChange={(e) => setShouldCreateDevice(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="createDevice" className="text-sm font-medium">
                Créer automatiquement le boîtier avec cet IMEI
              </label>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Le boîtier sera automatiquement créé et associé à ce véhicule, et ajouté à Flespi
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isCreatingDevice}>
            {isCreatingDevice ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? "Mise à jour..." : "Création..."}
              </>
            ) : (
              <>
                {isEditing ? "Mettre à jour" : "Enregistrer"}
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
