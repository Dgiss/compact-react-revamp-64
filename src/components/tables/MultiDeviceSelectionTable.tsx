import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Link, Wifi, Building } from "lucide-react";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import { toast } from "@/hooks/use-toast";
import * as SimpleDeviceService from "@/services/SimpleDeviceService";
import * as CompanyDeviceService from "@/services/CompanyDeviceService";

interface Device {
  imei: string;
  typeBoitier?: string;
  entreprise?: string;
  telephone?: string;
  isAssociated?: boolean;
  type: string;
}

interface MultiDeviceSelectionTableProps {
  devices: Device[];
  onDevicesUpdate: () => void;
  onClose?: () => void;
}

export function MultiDeviceSelectionTable({ devices, onDevicesUpdate, onClose }: MultiDeviceSelectionTableProps) {
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Filter for unassociated devices only
  const unassociatedDevices = devices.filter(device => !device.isAssociated);

  useEffect(() => {
    const allSelected = unassociatedDevices.length > 0 && selectedDevices.size === unassociatedDevices.length;
    setSelectAll(allSelected);
  }, [selectedDevices, unassociatedDevices.length]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDevices(new Set(unassociatedDevices.map(device => device.imei)));
    } else {
      setSelectedDevices(new Set());
    }
    setSelectAll(checked);
  };

  const handleSelectDevice = (imei: string, checked: boolean) => {
    const newSelection = new Set(selectedDevices);
    if (checked) {
      newSelection.add(imei);
    } else {
      newSelection.delete(imei);
    }
    setSelectedDevices(newSelection);
  };

  const handleBulkAssociate = async () => {
    if (selectedDevices.size === 0) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner au moins un device",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCompany) {
      toast({
        title: "Attention", 
        description: "Veuillez sélectionner une entreprise",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    const successCount = [];
    const errorCount = [];

    try {
      for (const imei of selectedDevices) {
        try {
          await CompanyDeviceService.associateDeviceToCompany(imei, selectedCompany);
          successCount.push(imei);
        } catch (error) {
          console.error(`Erreur association ${imei}:`, error);
          errorCount.push(imei);
        }
      }

      if (successCount.length > 0) {
        toast({
          title: "Succès",
          description: `${successCount.length} device(s) associé(s) avec succès`,
        });
      }

      if (errorCount.length > 0) {
        toast({
          title: "Erreurs partielles",
          description: `${errorCount.length} device(s) n'ont pas pu être associés`,
          variant: "destructive"
        });
      }

      // Reset selection
      setSelectedDevices(new Set());
      setSelectedCompany("");
      
      // Trigger refresh
      onDevicesUpdate();
      
    } catch (error) {
      console.error('Erreur lors de l\'association multiple:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'association multiple",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedDevices.size === 0) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner au moins un device",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedDevices.size} device(s) ? Cette action est irréversible.`)) {
      return;
    }

    setIsProcessing(true);
    const successCount = [];
    const errorCount = [];

    try {
      for (const imei of selectedDevices) {
        try {
          // Use SimpleDeviceService to delete device
          const device = unassociatedDevices.find(d => d.imei === imei);
          if (device) {
            await SimpleDeviceService.deleteDevice({ imei });
            successCount.push(imei);
          }
        } catch (error) {
          console.error(`Erreur suppression ${imei}:`, error);
          errorCount.push(imei);
        }
      }

      if (successCount.length > 0) {
        toast({
          title: "Succès",
          description: `${successCount.length} device(s) supprimé(s) avec succès`,
        });
      }

      if (errorCount.length > 0) {
        toast({
          title: "Erreurs partielles", 
          description: `${errorCount.length} device(s) n'ont pas pu être supprimés`,
          variant: "destructive"
        });
      }

      // Reset selection
      setSelectedDevices(new Set());
      
      // Trigger refresh
      onDevicesUpdate();
      
    } catch (error) {
      console.error('Erreur lors de la suppression multiple:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression multiple",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getDeviceStatusBadge = (device: Device) => {
    if (device.isAssociated) {
      return <Badge variant="secondary">Associé</Badge>;
    } else if (device.entreprise) {
      return <Badge variant="outline">Réservé</Badge>;
    } else {
      return <Badge variant="default">Libre</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Gestion Multiple des Devices ({unassociatedDevices.length} non associés)
        </h3>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedDevices.size > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-3">
            <p className="text-sm font-medium text-blue-800">
              {selectedDevices.size} device(s) sélectionné(s)
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <CompanySearchSelect
                  value={selectedCompany}
                  onValueChange={setSelectedCompany}
                  placeholder="Sélectionner une entreprise pour association..."
                  searchFunction={searchCompaniesReal}
                  disabled={isProcessing}
                />
              </div>
              <Button
                onClick={handleBulkAssociate}
                disabled={!selectedCompany || isProcessing}
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                Associer
              </Button>
              <Button
                onClick={handleBulkDelete}
                disabled={isProcessing}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  disabled={unassociatedDevices.length === 0}
                />
              </TableHead>
              <TableHead>IMEI</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>SIM</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unassociatedDevices.map((device) => (
              <TableRow key={device.imei}>
                <TableCell>
                  <Checkbox
                    checked={selectedDevices.has(device.imei)}
                    onCheckedChange={(checked) => handleSelectDevice(device.imei, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-500" />
                    {device.imei}
                  </div>
                </TableCell>
                <TableCell>{device.typeBoitier || "Non défini"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {device.entreprise && <Building className="h-4 w-4 text-blue-500" />}
                    {device.entreprise || "Aucune"}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {device.telephone || "Non défini"}
                </TableCell>
                <TableCell>
                  {getDeviceStatusBadge(device)}
                </TableCell>
              </TableRow>
            ))}
            {unassociatedDevices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun device non associé disponible
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {unassociatedDevices.length > 0 && (
        <div className="text-sm text-gray-600">
          Total: {unassociatedDevices.length} device(s) non associé(s)
        </div>
      )}
    </div>
  );
}