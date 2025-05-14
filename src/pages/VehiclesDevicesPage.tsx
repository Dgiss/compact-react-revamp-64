
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileSpreadsheet } from "lucide-react";
import { EnhancedDataTable, Column } from "@/components/tables/EnhancedDataTable";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import AddVehicleForm from "@/components/forms/AddVehicleForm";
import ImportDevicesForm from "@/components/forms/ImportDevicesForm";
import AssociateVehicleForm from "@/components/forms/AssociateVehicleForm";
import { toast } from "@/components/ui/use-toast";

export default function VehiclesDevicesPage() {
  const [showAssociateSheet, setShowAssociateSheet] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vehiclesAndDevices, setVehiclesAndDevices] = useState<any[]>([]);

  // Simulons le chargement des données puisque nous n'avons pas encore de service pour les véhicules et les appareils
  useEffect(() => {
    const loadData = () => {
      // Dans une vraie application, vous feriez un appel API ici
      setTimeout(() => {
        setLoading(false);
        setVehiclesAndDevices([]);  // Tableau vide puisque nous n'avons pas de vraies données
      }, 1000);
    };

    loadData();
  }, []);

  // Définissez les colonnes
  const allColumns: Column[] = [
    { id: "immatriculation", label: "Immatriculation", sortable: true, visible: true },
    { id: "entreprise", label: "Entreprise", sortable: true, visible: true },
    { id: "nomVehicule", label: "Nom Véhicule", sortable: true, visible: true },
    { id: "imei", label: "IMEI", sortable: true, visible: true },
    { id: "typeBoitier", label: "Type de Boîtier", sortable: true, visible: true },
    { id: "marque", label: "Marque", sortable: true, visible: false },
    { id: "modele", label: "Modèle", sortable: true, visible: false },
    { id: "kilometrage", label: "Kilométrage", sortable: true, visible: false },
    { id: "sim", label: "SIM", sortable: true, visible: true },
    { id: "telephone", label: "Téléphone", sortable: true, visible: true },
  ];

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  const handleAssociate = (device: any) => {
    console.log("Associate device:", device);
    setSelectedDevice(device);
    setShowAssociateSheet(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Véhicules & Boîtiers</h1>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Véhicule
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <AddVehicleForm />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Importer des Boîtiers
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <ImportDevicesForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <p>Chargement des données...</p>
        </div>
      ) : vehiclesAndDevices.length === 0 ? (
        <div className="flex justify-center py-8">
          <p>Aucune donnée disponible dans la base de données</p>
        </div>
      ) : (
        <EnhancedDataTable
          columns={allColumns}
          data={vehiclesAndDevices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAssociate={handleAssociate}
        />
      )}

      <Sheet open={showAssociateSheet} onOpenChange={setShowAssociateSheet}>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Associer un Véhicule</SheetTitle>
          </SheetHeader>
          <AssociateVehicleForm
            device={selectedDevice}
            onClose={() => setShowAssociateSheet(false)}
            onSuccess={() => {
              toast({
                title: "Boîtier associé",
                description: "Le boîtier a été associé au véhicule avec succès"
              });
              setShowAssociateSheet(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
