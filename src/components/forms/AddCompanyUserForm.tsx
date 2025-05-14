
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Save } from "lucide-react";
import { 
  DialogClose
} from "@/components/ui/dialog";

interface AddCompanyUserFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCompanyUserForm({ onClose, onSuccess }: AddCompanyUserFormProps) {
  // Company fields
  const [societe, setSociete] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!societe) {
      return;
    }
    
    console.log("Entreprise ajoutée:", {
      entreprise: societe,
      telephone: mobile,
      email,
      adresse,
      ville
    });
    
    onSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <Input 
            placeholder="Société"
            value={societe}
            onChange={(e) => setSociete(e.target.value)}
            required
          />
        </div>
        <div className="md:col-span-1">
          <Input 
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <Input 
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <Input 
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Input 
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
        </DialogClose>
        <Button 
          type="submit"
          disabled={!societe}
        >
          <Save className="h-4 w-4 mr-2" />
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
