
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  await waitForAmplifyConfig();
  let allCompanies = [];
  let allVehicles = [];
  let nextToken = null;
  
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
  
  // Extract all vehicles from companies
  allCompanies.forEach(company => {
    if (company.vehicles && company.vehicles.items) {
      const companyVehicles = company.vehicles.items.map(vehicle => ({
        ...vehicle,
        entreprise: company.name,
        type: "vehicle",
        immatriculation: vehicle.immat,
        nomVehicule: vehicle.code || "",
        imei: vehicle.vehicleDeviceImei || "",
        typeBoitier: "GPS Tracker",
        marque: vehicle.vehicleBrandBrandName || "",
        modele: vehicle.vehicleModeleId || "",
        kilometrage: vehicle.kilometerage?.toString() || "",
        telephone: "",
        emplacement: vehicle.locations || ""
      }));
      allVehicles = allVehicles.concat(companyVehicles);
    }
  });
  
  return { companies: allCompanies, vehicles: allVehicles };
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
