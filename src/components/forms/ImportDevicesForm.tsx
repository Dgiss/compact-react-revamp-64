import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Check, Eye, EyeOff, Box } from "lucide-react";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const clients = ["MBSC", "PHENIX IDFTP", "ADANEV MOBILITES", "Kick Services", "MATTEI / HABICONFORT"];
const deviceTypes = ["GPS Simple", "GPS Avancé", "GPS Tracker", "GPS Pro", "Traceur"];

type DeviceData = {
  imei: string;
  sim: string;
  telephone: string;
  typeBoitier: string;
}

export default function ImportDevicesForm() {
  const [clientSelected, setClientSelected] = useState("");
  const [typeBoitier, setTypeBoitier] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<DeviceData[]>([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  
  const clientOptions = clients.map(client => ({
    value: client,
    label: client
  }));
  
  const deviceTypeOptions = deviceTypes.map(type => ({
    value: type,
    label: type
  }));
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Simuler l'analyse du fichier Excel et générer des données d'aperçu
      simulateExcelParsing(selectedFile);
    }
  };

  const simulateExcelParsing = (file: File) => {
    // Données simulées - dans une implémentation réelle, vous les extrairiez du fichier Excel
    const mockData: DeviceData[] = [
      { imei: "862531040658404", sim: "8933150520000591384", telephone: "0712345678", typeBoitier },
      { imei: "862531040787807", sim: "8933150520000763529", telephone: "0723456789", typeBoitier },
      { imei: "866795038741631", sim: "8933150520001459950", telephone: "0734567890", typeBoitier },
      { imei: "350612070642820", sim: "8933150520001427874", telephone: "0745678901", typeBoitier }
    ];
    
    setPreviewData(mockData);
    setIsPreviewVisible(true);
  };
  
  const handleImport = () => {
    if (!clientSelected) {
      alert("Veuillez sélectionner un client avant d'importer");
      return;
    }
    
    if (!typeBoitier) {
      alert("Veuillez sélectionner un type de boîtier");
      return;
    }
    
    if (!file) {
      alert("Veuillez sélectionner un fichier Excel");
      return;
    }
    
    console.log("Import des boîtiers pour le client:", clientSelected);
    console.log("Type de boîtier:", typeBoitier);
    console.log("Données importées:", previewData);
    // Implémentez ici la logique d'import finale
  };
  
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <>
      <SheetHeader className="mb-5">
        <SheetTitle>Importer des Boîtiers</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Client (Obligatoire)
          </label>
          <SearchableSelect 
            options={clientOptions}
            value={clientSelected}
            onValueChange={setClientSelected}
            placeholder="Sélectionner un client"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Type de Boîtier (Obligatoire)
          </label>
          <SearchableSelect 
            options={deviceTypeOptions}
            value={typeBoitier}
            onValueChange={setTypeBoitier}
            placeholder="Sélectionner un type de boîtier"
            disabled={!clientSelected}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Fichier Excel
          </label>
          <div className="flex items-center gap-2">
            <Input 
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              disabled={!clientSelected || !typeBoitier}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Format accepté: Excel (.xlsx, .xls) contenant les colonnes IMEI, SIM et Téléphone
          </p>
        </div>
        
        {file && (
          <div className="bg-muted/40 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">Fichier sélectionné: {file.name}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={togglePreview} 
                className="flex items-center"
              >
                {isPreviewVisible ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Masquer l'aperçu
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Voir l'aperçu
                  </>
                )}
              </Button>
            </div>
            
            {isPreviewVisible && (
              <div className="border rounded-md mt-2 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IMEI</TableHead>
                      <TableHead>Numéro SIM</TableHead>
                      <TableHead>Numéro de Téléphone</TableHead>
                      <TableHead>Type de Boîtier</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((device, index) => (
                      <TableRow key={index}>
                        <TableCell>{device.imei}</TableCell>
                        <TableCell>{device.sim}</TableCell>
                        <TableCell>{device.telephone}</TableCell>
                        <TableCell>{device.typeBoitier || typeBoitier}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-6">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </SheetClose>
          <Button 
            onClick={handleImport} 
            disabled={!file || !clientSelected || !typeBoitier}
          >
            <Upload className="h-4 w-4 mr-2" />
            Valider l'import
          </Button>
        </div>
      </div>
    </>
  );
}
