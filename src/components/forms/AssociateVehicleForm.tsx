
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { CompanySearchSelect } from "@/components/ui/company-search-select";
import { toast } from "@/components/ui/use-toast";
import { useCompanyVehicleDevice } from "@/hooks/useCompanyVehicleDevice";
import { searchCompaniesReal } from "@/services/CompanyVehicleDeviceService";
import * as VehicleService from "@/services/VehicleService";
import * as CompanyDeviceService from "@/services/CompanyDeviceService";

interface AssociateVehicleFormProps {
  device?: any; // Can be a device or a vehicle for bidirectional association
  mode?: 'vehicle-device' | 'company-device'; // New mode for company-device association
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssociateVehicleForm({ device, mode = 'vehicle-device', onClose, onSuccess }: AssociateVehicleFormProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDeviceImei, setSelectedDeviceImei] = useState("");
  const [companyVehicles, setCompanyVehicles] = useState([]);
  const [companyDevices, setCompanyDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);

  const {
    companies,
    loadCompaniesForSelect,
    getVehiclesByCompany,
    getAllVehiclesByCompany,
    allDataCache,
    isCacheReady,
    loading: hookLoading
  } = useCompanyVehicleDevice();
  
  // Determine the association mode
  const isCompanyDeviceMode = mode === 'company-device';
  const isDeviceToVehicle = !isCompanyDeviceMode && device?.type === "device";
  const isVehicleToDevice = !isCompanyDeviceMode && device?.type === "vehicle";

  // Debug cache status
  useEffect(() => {
    console.log('AssociateVehicleForm: Cache status changed:', {
      isCacheReady,
      hookLoading,
      companiesCount: companies.length,
      hasCache: !!allDataCache
    });
  }, [isCacheReady, hookLoading, companies.length, allDataCache]);

  // Wait for cache to be ready before loading companies
  useEffect(() => {
    if (isCacheReady) {
      console.log('AssociateVehicleForm: Cache ready, loading companies...');
      loadCompaniesForSelect();
    }
  }, [loadCompaniesForSelect, isCacheReady]);

  // Create company options for select
  const companyOptions = companies.map(company => ({
    value: company.id,
    label: company.name || company.nom
  }));

  // SIMPLIFIED: Load vehicles when company is selected (for device to vehicle association)
  useEffect(() => {
    if (selectedCompany && isCacheReady && isDeviceToVehicle) {
      console.log('=== LOADING VEHICLES FOR ASSOCIATION ===');
      console.log('Company:', selectedCompany, 'Cache ready:', isCacheReady);
      loadVehiclesForCompany(selectedCompany);
    } else {
      console.log('Waiting for conditions - Company:', selectedCompany, 'Cache ready:', isCacheReady, 'Is device to vehicle:', isDeviceToVehicle);
    }
  }, [selectedCompany, isCacheReady, isDeviceToVehicle]);
  
  // Load devices when company is selected (for vehicle to device association)
  useEffect(() => {
    if (selectedCompany && isCacheReady && isVehicleToDevice) {
      loadDevicesForCompany(selectedCompany);
    }
  }, [selectedCompany, isCacheReady, isVehicleToDevice]);

  // Load free devices for company-device association mode
  useEffect(() => {
    if (isCompanyDeviceMode && isCacheReady) {
      loadFreeDevicesForCompanyAssociation();
    }
  }, [isCompanyDeviceMode, isCacheReady]);

  const loadVehiclesForCompany = async (companyName) => {
    console.log('=== LOADING VEHICLES FOR ASSOCIATION FORM ===');
    console.log('Company:', companyName, 'Cache ready:', isCacheReady);
    setIsLoading(true);
    
    try {
      if (!isCacheReady) {
        console.log('Cache not ready, aborting vehicle load');
        setCompanyVehicles([]);
        setIsLoading(false);
        return;
      }

      const vehicles = await getVehiclesByCompany(companyName);
      console.log('Vehicles received:', vehicles?.length || 0);
      
      setCompanyVehicles(vehicles || []);
      
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setCompanyVehicles([]);
      toast({
        title: "Erreur",
        description: "Impossible de charger les véhicules",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadDevicesForCompany = async (companyName) => {
    console.log('Loading devices for company:', companyName);
    setLoadingDevices(true);
    
    try {
      if (!allDataCache) {
        setCompanyDevices([]);
        return;
      }
      
      // Get free devices from cache
      const freeDevices = allDataCache.vehicles?.filter(item => 
        item.type === "device" && 
        !item.isAssociated &&
        (item.entreprise === "Boîtier libre" || item.entreprise === companyName)
      ) || [];
      
      console.log('Free devices found:', freeDevices.length);
      setCompanyDevices(freeDevices);
      
    } catch (error) {
      console.error('Error loading devices:', error);
      setCompanyDevices([]);
      toast({
        title: "Erreur",
        description: "Impossible de charger les boîtiers",
        variant: "destructive",
      });
    } finally {
      setLoadingDevices(false);
    }
  };

  const loadFreeDevicesForCompanyAssociation = async () => {
    console.log('Loading free devices for company association');
    setLoadingDevices(true);
    
    try {
      const freeDevices = await CompanyDeviceService.getUnassignedDevices();
      console.log('Free devices for company association:', freeDevices.length);
      setCompanyDevices(freeDevices);
      
    } catch (error) {
      console.error('Error loading free devices:', error);
      setCompanyDevices([]);
      toast({
        title: "Erreur",
        description: "Impossible de charger les boîtiers libres",
        variant: "destructive",
      });
    } finally {
      setLoadingDevices(false);
    }
  };

  // Generate vehicle options (for device to vehicle association)
  const vehicleOptions = companyVehicles.map(vehicle => {
    const isAlreadyAssociated = vehicle.imei && vehicle.isAssociated;
    return {
      value: vehicle.immatriculation || vehicle.immat,
      label: `${vehicle.immatriculation || vehicle.immat}${vehicle.nomVehicule ? ` (${vehicle.nomVehicule})` : ''}${isAlreadyAssociated ? ' - Déjà associé' : ''}`,
      disabled: isAlreadyAssociated
    };
  });

  // Generate device options (for vehicle to device association)
  const deviceOptions = companyDevices.map(device => ({
    value: device.imei,
    label: `${device.imei}${device.typeBoitier ? ` (Protocol: ${device.typeBoitier})` : ''}`,
    disabled: false
  }));

  const handleSubmit = async () => {
    if (!selectedCompany && !isCompanyDeviceMode) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une entreprise",
        variant: "destructive",
      });
      return;
    }

    if (isDeviceToVehicle) {
      // Device to vehicle association
      if (!selectedVehicle) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un véhicule",
          variant: "destructive",
        });
        return;
      }

      if (!device?.imei) {
        toast({
          title: "Erreur",
          description: "IMEI du boîtier non trouvé",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        await VehicleService.associateDeviceToVehicle(device.imei, selectedVehicle);
        
        toast({
          title: "Succès",
          description: "Boîtier associé au véhicule avec succès",
        });
        
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error associating device to vehicle:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de l'association",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else if (isVehicleToDevice) {
      // Vehicle to device association
      if (!selectedDeviceImei) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un boîtier",
          variant: "destructive",
        });
        return;
      }

      if (!device?.vehicleImmat && !device?.immatriculation && !device?.immat) {
        toast({
          title: "Erreur",
          description: "Immatriculation du véhicule non trouvée",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        const vehicleImmat = device.vehicleImmat || device.immatriculation || device.immat;
        await VehicleService.associateDeviceToVehicle(selectedDeviceImei, vehicleImmat);
        
        toast({
          title: "Succès",
          description: "Véhicule associé au boîtier avec succès",
        });
        
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error associating vehicle to device:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de l'association",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else if (isCompanyDeviceMode) {
      // Company-device association
      if (!selectedDeviceImei) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un boîtier",
          variant: "destructive",
        });
        return;
      }

      if (!selectedCompany) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une entreprise",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        await CompanyDeviceService.associateDeviceToCompany(selectedDeviceImei, selectedCompany);
        
        toast({
          title: "Succès",
          description: "Boîtier réservé pour l'entreprise avec succès",
        });
        
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error associating device to company:', error);
        toast({
          title: "Erreur",
          description: error.message || "Erreur lors de la réservation",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isCompanyDeviceMode 
            ? "Réserver un boîtier pour une entreprise"
            : isDeviceToVehicle 
            ? `Associer le boîtier ${device?.imei}` 
            : `Associer un boîtier au véhicule ${device?.immatriculation || device?.immat}`
          }
        </h2>
      </div>

      <div className="space-y-4">
        {/* Company selection - show for all modes except direct device-vehicle */}
        {!isDeviceToVehicle || isCompanyDeviceMode ? (
          <div>
            <label className="block text-sm font-medium mb-2">
              Entreprise *
            </label>
            <CompanySearchSelect
              value={selectedCompany}
              onValueChange={setSelectedCompany}
              placeholder="Sélectionner une entreprise..."
              searchFunction={searchCompaniesReal}
              disabled={!isCacheReady}
            />
            {!isCacheReady && (
              <p className="text-sm text-gray-500 mt-1">
                Chargement des données en cours...
              </p>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2">
              Entreprise *
            </label>
            <CompanySearchSelect
              value={selectedCompany}
              onValueChange={setSelectedCompany}
              placeholder="Sélectionner une entreprise..."
              searchFunction={searchCompaniesReal}
              disabled={!isCacheReady}
            />
            {!isCacheReady && (
              <p className="text-sm text-gray-500 mt-1">
                Chargement des données en cours...
              </p>
            )}
          </div>
        )}

        {isDeviceToVehicle && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Véhicule *
            </label>
            <SearchableSelect
              value={selectedVehicle}
              onValueChange={setSelectedVehicle}
              options={vehicleOptions}
              placeholder={
                !selectedCompany 
                  ? "Sélectionner d'abord une entreprise" 
                  : isLoading 
                    ? "Chargement des véhicules..." 
                    : companyVehicles.length === 0
                      ? "Aucun véhicule disponible"
                      : "Sélectionner un véhicule..."
              }
              disabled={!selectedCompany || isLoading || !isCacheReady}
            />
            {showAllVehicles && (
              <p className="text-sm text-orange-600 mt-1">
                ⚠️ Certains véhicules sont déjà associés à un boîtier
              </p>
            )}
          </div>
        )}

        {isVehicleToDevice && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Boîtier *
            </label>
            <SearchableSelect
              value={selectedDeviceImei}
              onValueChange={setSelectedDeviceImei}
              options={deviceOptions}
              placeholder={
                !selectedCompany 
                  ? "Sélectionner d'abord une entreprise" 
                  : loadingDevices 
                    ? "Chargement des boîtiers..." 
                    : companyDevices.length === 0
                      ? "Aucun boîtier disponible"
                      : "Sélectionner un boîtier..."
              }
              disabled={!selectedCompany || loadingDevices || !isCacheReady}
            />
            {companyDevices.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                ✓ {companyDevices.length} boîtier(s) disponible(s)
              </p>
            )}
          </div>
        )}

        {/* Device selection for company-device mode */}
        {isCompanyDeviceMode && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Boîtier libre *
            </label>
            <SearchableSelect
              value={selectedDeviceImei}
              onValueChange={setSelectedDeviceImei}
              options={deviceOptions}
              placeholder={
                loadingDevices 
                  ? "Chargement des boîtiers libres..." 
                  : companyDevices.length === 0
                    ? "Aucun boîtier libre disponible"
                    : "Sélectionner un boîtier libre..."
              }
              disabled={loadingDevices || !isCacheReady}
            />
            {companyDevices.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                ✓ {companyDevices.length} boîtier(s) libre(s) disponible(s)
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting || 
              (!isCompanyDeviceMode && !selectedCompany) || 
              (isCompanyDeviceMode && (!selectedCompany || !selectedDeviceImei)) ||
              (isDeviceToVehicle && !selectedVehicle) ||
              (isVehicleToDevice && !selectedDeviceImei) ||
              !isCacheReady
            }
          >
            {isSubmitting 
              ? (isCompanyDeviceMode ? "Réservation..." : "Association...") 
              : (isCompanyDeviceMode ? "Réserver" : "Associer")
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
