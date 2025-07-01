
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  await waitForAmplifyConfig();
  let allCompanies = [];
  let allVehicles = [];
  let allDevices = [];
  let nextToken = null;
  
  // Fetch companies with vehicles
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
        console.log('Vehicle IMEI:', vehicle.vehicleDeviceImei);
        console.log('IMEI exists in deviceMap:', !!deviceMap[vehicle.vehicleDeviceImei]);
        
        const associatedDevice = deviceMap[vehicle.vehicleDeviceImei];
        console.log('Associated device found:', !!associatedDevice);
        
        if (associatedDevice) {
          console.log('Device data:', {
            imei: associatedDevice.imei,
            protocolId: associatedDevice.protocolId,
            sim: associatedDevice.sim
          });
        } else {
          console.log('No device found for IMEI:', vehicle.vehicleDeviceImei);
          console.log('Available IMEIs in map:', Object.keys(deviceMap).slice(0, 5));
        }
        
        return {
          ...vehicle,
          entreprise: company.name,
          type: "vehicle",
          immatriculation: vehicle.immat,
          nomVehicule: vehicle.code || "",
          imei: vehicle.vehicleDeviceImei || "",
          typeBoitier: associatedDevice ? associatedDevice.protocolId : "",
          marque: vehicle.vehicleBrandBrandName || "",
          modele: vehicle.vehicleModeleId || "",
          kilometrage: vehicle.kilometerage?.toString() || "",
          telephone: associatedDevice?.sim || "",
          emplacement: associatedDevice?.lastKnownLocation || vehicle.locations || "",
          deviceData: associatedDevice || null,
          isAssociated: true
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
      entreprise: "Non assigné",
      type: "device",
      immatriculation: "",
      nomVehicule: "",
      imei: device.imei,
      typeBoitier: device.protocolId,
      marque: "",
      modele: "",
      kilometrage: "",
      telephone: device.sim || "",
      emplacement: device.lastKnownLocation || "",
      deviceData: device,
      isAssociated: false
    }));
  
  allDevices = [...allVehicles, ...unassociatedDevices];
  
  console.log('=== FINAL RESULT SAMPLE ===');
  console.log('Sample vehicle with device data:', allDevices.find(d => d.type === 'vehicle'));
  console.log('Sample unassociated device:', allDevices.find(d => d.type === 'device'));
  
  return { companies: allCompanies, vehicles: allDevices };
};

export const updateVehicleData = async (data) => {
  await waitForAmplifyConfig();
  const vehicleDetails = {
    immat: data.immat,
    vehicleDeviceImei: data.vehicleDeviceImei,
    vehicleVehicleCategoryId: data.vehicleVehicleCategoryId,
    vehicleBrandBrandName: data.vehicleBrandBrandName,
    vehicleModeleId: data.vehicleModeleId,
    kilometerage: data.kilometerage,
    kilometerageStart: data.kilometerageStart,
    code: data.code
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
