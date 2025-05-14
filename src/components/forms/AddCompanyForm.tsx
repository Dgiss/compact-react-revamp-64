
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Save, ArrowLeft } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

interface AddCompanyFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCompanyForm({ onClose, onSuccess }: AddCompanyFormProps) {
  // Champs entreprise
  const [societe, setSociete] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  
  // Champs utilisateur
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
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
      ville,
      utilisateur: {
        nom: username,
        motDePasse: password
      }
    });
    
    onSuccess();
  };
  
  return (
    <>
      <DialogHeader className="mb-5 flex flex-row items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <DialogTitle>Ajouter L'entreprise</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <Input 
              placeholder="Société"
              value={societe}
              onChange={(e) => setSociete(e.target.value)}
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
          <div className="md:col-span-1">
            <Input 
              placeholder="Ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <Input 
              placeholder="Nom utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <Input 
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose} className="ml-auto">
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={!societe}
          >
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </form>
    </>
  );
}
