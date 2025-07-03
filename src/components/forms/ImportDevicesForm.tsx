
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Check, Eye, EyeOff, FileSpreadsheet, AlertCircle } from "lucide-react";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { createDevice } from "@/services/DeviceService";
import * as XLSX from 'xlsx';

const clients = ["MBSC", "PHENIX IDFTP", "ADANEV MOBILITES", "Kick Services", "MATTEI / HABICONFORT"];
const deviceTypes = ["GPS Simple", "GPS Avancé", "GPS Tracker", "GPS Pro", "Traceur"];

type DeviceData = {
  imei: string;
  sim: string;
  telephone: string;
  typeBoitier: string;
}

interface ImportDevicesFormProps {
  onClose?: () => void;
}

export default function ImportDevicesForm({ onClose }: ImportDevicesFormProps) {
  const [clientSelected, setClientSelected] = useState("");
  const [typeBoitier, setTypeBoitier] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<DeviceData[]>([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  
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
      
      // Parse the Excel file and generate preview data
      parseExcelFile(selectedFile);
    }
  };

  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        
        // Skip header row and transform data
        const transformedData: DeviceData[] = sheetData.slice(1).map((row: any) => ({
          imei: row[0]?.toString() || '',
          sim: row[2]?.toString() || '',
          telephone: row[3]?.toString() || '',
          typeBoitier: typeBoitier
        })).filter(device => device.imei); // Filter out empty rows
        
        setPreviewData(transformedData);
        setIsPreviewVisible(true);
        
        console.log('Parsed Excel data:', transformedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de l'analyse du fichier Excel",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  const handleImport = async () => {
    if (!clientSelected) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner un client avant d'importer",
        variant: "destructive",
      });
      return;
    }
    
    if (!typeBoitier) {
      toast({
        title: "Attention", 
        description: "Veuillez sélectionner un type de boîtier",
        variant: "destructive",
      });
      return;
    }
    
    if (!file || previewData.length === 0) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner un fichier Excel valide",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };
    
    try {
      console.log("Starting import for client:", clientSelected);
      console.log("Device type:", typeBoitier);
      console.log("Devices to import:", previewData.length);
      
      // Process devices in batches to avoid overwhelming the API
      for (let i = 0; i < previewData.length; i++) {
        const device = previewData[i];
        
        try {
          await createDevice({
            imei: device.imei,
            sim: device.sim,
            protocolId: typeBoitier,
            constructor: device.imei // For Flespi naming
          });
          
          results.success++;
          console.log(`Device ${device.imei} imported successfully`);
        } catch (error) {
          results.failed++;
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          results.errors.push(`${device.imei}: ${errorMsg}`);
          console.error(`Failed to import device ${device.imei}:`, error);
        }
        
        // Update progress
        const progress = ((i + 1) / previewData.length) * 100;
        setImportProgress(progress);
      }
      
      setImportResults(results);
      
      // Show summary toast
      toast({
        title: "Import terminé",
        description: `${results.success} boîtiers importés avec succès. ${results.failed} échecs.`,
        variant: results.failed === 0 ? "default" : "destructive",
      });
      
      // Close dialog after successful import
      if (results.failed === 0) {
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      }
      
    } catch (error) {
      console.error('Import process failed:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du processus d'import",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <>
      <DialogHeader className="mb-5">
        <DialogTitle>Importer des Boîtiers</DialogTitle>
      </DialogHeader>

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
              <div className="font-medium flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                {file.name}
                <span className="text-sm text-muted-foreground">
                  ({previewData.length} boîtiers)
                </span>
              </div>
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
              <div className="border rounded-md mt-2 overflow-x-auto max-h-64">
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
                        <TableCell className="font-mono text-sm">{device.imei}</TableCell>
                        <TableCell className="font-mono text-sm">{device.sim}</TableCell>
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
        
        {isImporting && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Import en cours...</span>
            </div>
            <Progress value={importProgress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {Math.round(importProgress)}% - Ne fermez pas cette fenêtre
            </p>
          </div>
        )}
        
        {importResults && (
          <Alert className={importResults.failed > 0 ? "border-destructive" : "border-green-500"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p>
                  <strong>Import terminé:</strong> {importResults.success} succès, {importResults.failed} échecs
                </p>
                {importResults.errors.length > 0 && (
                  <div className="max-h-32 overflow-y-auto">
                    <p className="text-sm font-medium">Erreurs:</p>
                    <ul className="text-xs space-y-1">
                      {importResults.errors.slice(0, 5).map((error, index) => (
                        <li key={index} className="text-destructive">{error}</li>
                      ))}
                      {importResults.errors.length > 5 && (
                        <li className="text-muted-foreground">
                          ... et {importResults.errors.length - 5} autres erreurs
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </DialogClose>
          <Button 
            onClick={handleImport} 
            disabled={!file || !clientSelected || !typeBoitier || isImporting || previewData.length === 0}
          >
            {isImporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Import en cours...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Valider l'import ({previewData.length} boîtiers)
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
