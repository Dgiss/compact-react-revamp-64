
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    let allCompanies = [];
    let allVehicles = [];
    let allDevices = [];
    let nextToken = null;
    
    // Fetch companies with vehicles (nouvelle relation)
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      const companyList = await client.graphql({
        query: queries.listCompanies,
        variables: variables
      });
      
      const data = companyList.data.listCompanies;
      allCompanies = allCompanies.concat(data.items);
      nextToken = data.nextToken;
      
    } while (nextToken);
  
  // Fetch all devices
  const devices = await fetchAllDevices();
  console.log('=== DEVICE DEBUG INFO ===');
  console.log('Total devices fetched:', devices.length);
  console.log('First device sample:', devices[0]);
  console.log('Device structure sample:', {
    imei: devices[0]?.imei,
    protocolId: devices[0]?.protocolId,
    sim: devices[0]?.sim
  });
  
  // Create a map of devices by IMEI for quick lookup
  const deviceMap = {};
  devices.forEach(device => {
    if (device.imei) {
      deviceMap[device.imei] = device;
    }
  });
  
  console.log('Device map keys (IMEIs):', Object.keys(deviceMap));
  console.log('Device map sample entry:', deviceMap[Object.keys(deviceMap)[0]]);
  
  // Extract all vehicles from companies and enrich with device data
  allCompanies.forEach(company => {
    if (company.vehicles && company.vehicles.items) {
      const companyVehicles = company.vehicles.items.map(vehicle => {
        console.log(`=== VEHICLE DEBUG: ${vehicle.immat} ===`);
        console.log('Vehicle device relation:', vehicle.device);
        
        // Nouveau schéma: utiliser la relation @hasOne avec Device
        const associatedDevice = vehicle.device || deviceMap[vehicle.immat];
        console.log('Associated device found:', !!associatedDevice);
        
        if (associatedDevice) {
          console.log('Device data:', {
            imei: associatedDevice.imei,
            protocolId: associatedDevice.protocolId,
            sim: associatedDevice.sim
          });
        } else {
          console.log('No device found for vehicle:', vehicle.immat);
        }
        
        return {
          ...vehicle,
          entreprise: company.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || "",
          nomVehicule: vehicle.nomVehicule || vehicle.code || "",
          imei: associatedDevice?.imei || "",
          typeBoitier: associatedDevice ? associatedDevice.protocolId?.toString() : "",
          marque: vehicle.marque || vehicle.brand?.brandName || "",
          modele: vehicle.modele_id || vehicle.modele?.modele || "",
          kilometrage: vehicle.kilometerage?.toString() || "",
          telephone: associatedDevice?.sim || "",
          emplacement: vehicle.locations || "",
          deviceData: associatedDevice || null,
          isAssociated: true,
          // Nouveaux champs du schéma enrichi
          AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
          energie: vehicle.energie || "",
          puissanceFiscale: vehicle.puissanceFiscale || "",
          couleur: vehicle.couleur || "",
          dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
          VIN: vehicle.VIN || vehicle.AWN_VIN || ""
        };
      });
      allVehicles = allVehicles.concat(companyVehicles);
    }
  });
  
  // Add unassociated devices
  const associatedImeis = new Set(allVehicles.map(v => v.imei).filter(Boolean));
  const unassociatedDevices = devices
    .filter(device => device.imei && !associatedImeis.has(device.imei))
    .map(device => ({
      id: device.imei,
      entreprise: "Boîtier libre",
      type: "device",
      immatriculation: "",
      nomVehicule: "",
      imei: device.imei,
      typeBoitier: device.protocolId?.toString() || "",
      marque: "",
      modele: "",
      kilometrage: "",
      telephone: device.sim || "",
      emplacement: "",
      deviceData: device,
      isAssociated: false
    }));
  
  allDevices = [...allVehicles, ...unassociatedDevices];
  
    console.log('=== FINAL RESULT SAMPLE ===');
    console.log('Sample vehicle with device data:', allDevices.find(d => d.type === 'vehicle'));
    console.log('Sample unassociated device:', allDevices.find(d => d.type === 'device'));
    
    return { companies: allCompanies, vehicles: allDevices };
  });
};

export const updateVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
  // Adapter aux nouveaux champs du schéma
  const vehicleDetails = {
    immat: data.immat,
    code: data.code,
    nomVehicule: data.nomVehicule,
    kilometerage: data.kilometerage,
    kilometerageStart: data.kilometerageStart,
    locations: data.locations,
    marque: data.marque,
    modele_id: data.modele_id,
    energie: data.energie,
    couleur: data.couleur,
    dateMiseEnCirculation: data.dateMiseEnCirculation,
    VIN: data.VIN,
    AWN_nom_commercial: data.AWN_nom_commercial,
    puissanceFiscale: data.puissanceFiscale,
    lastModificationDate: new Date().toISOString(),
    // Relation avec l'entreprise (nouvelle structure)
    companyVehiclesId: data.companyVehiclesId
  };

  await client.graphql({
    query: mutations.updateVehicle,
    variables: {
      input: vehicleDetails
    }
  });
};

export const deleteVehicleData = async (item) => {
  await waitForAmplifyConfig();
  const vehicleDetails = {
    immat: item.immat
  };

  await client.graphql({
    query: mutations.deleteVehicle,
    variables: { input: vehicleDetails }
  });
};
