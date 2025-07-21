import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Cache pour les entreprises (TTL: 5 minutes)
let companiesCache = null;
let companiesCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * OPTIMIZED: Get companies with caching to avoid repeated queries
 */
const getCachedCompanies = async () => {
  const now = Date.now();
  
  // Return cached companies if still valid
  if (companiesCache && (now - companiesCacheTime) < CACHE_TTL) {
    console.log('📦 Using cached companies');
    return companiesCache;
  }
  
  console.log('🔄 Fetching fresh companies');
  const response = await client.graphql({
    query: `query ListCompaniesOptimized {
      listCompanies(limit: 1000) {
        items {
          id
          name
        }
      }
    }`
  });
  
  // Create a Map for O(1) lookup instead of O(n) array.find()
  companiesCache = new Map();
  response.data.listCompanies.items.forEach(company => {
    companiesCache.set(company.id, company.name);
  });
  
  companiesCacheTime = now;
  return companiesCache;
};

/**
 * Fetch companies for select components
 */
export const fetchCompaniesForSelect = async () => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });
      
      const companies = response.data.listCompanies.items.map(company => ({
        id: company.id,
        name: company.name,
        siret: company.siret
      }));
      
      return companies;
    } catch (error) {
      console.error('Error fetching companies for select:', error);
      throw error;
    }
  });
};

/**
 * Search companies with a real-time backend query
 */
export const searchCompaniesReal = async (searchTerm) => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: queries.listCompanies,
        variables: {
          filter: {
            name: {
              contains: searchTerm
            }
          },
          limit: 5
        }
      });
      
      const companies = response.data.listCompanies.items.map(company => ({
        id: company.id,
        name: company.name,
        siret: company.siret
      }));
      
      return companies;
    } catch (error) {
      console.error('Error searching companies:', error);
      throw error;
    }
  });
};

/**
 * Filter devices locally (client-side)
 */
export const filterDevicesLocal = (devices, filters) => {
  const { imei, immatriculation, entreprise } = filters;
  
  return devices.filter(device => {
    const imeiMatch = !imei || (device.imei && device.imei.toLowerCase().includes(imei.toLowerCase()));
    const immatriculationMatch = !immatriculation || (device.immatriculation && device.immatriculation.toLowerCase().includes(immatriculation.toLowerCase()));
    const entrepriseMatch = !entreprise || (device.entreprise && device.entreprise.toLowerCase().includes(entreprise.toLowerCase()));
    
    return imeiMatch && immatriculationMatch && entrepriseMatch;
  });
};

/**
 * Filter vehicles by company locally (client-side)
 */
export const filterVehiclesByCompanyLocal = (vehicles, companyId, companies) => {
  if (!companyId) return vehicles;
  
  const selectedCompany = companies.find(company => company.id === companyId);
  if (!selectedCompany) return [];
  
  return vehicles.filter(vehicle => vehicle.companyVehiclesId === companyId);
};

/**
 * Get device status locally (client-side)
 */
export const getDeviceStatusLocal = (devices, imei) => {
  const device = devices.find(device => device.imei === imei);
  
  if (!device) {
    return { found: false, message: 'Device not found' };
  }
  
  return { found: true, status: device.status };
};

/**
 * Filter by IMEI locally (client-side)
 */
export const filterByImeiLocal = (devices, imei) => {
  if (!imei) return devices;
  return devices.filter(device => device.imei && device.imei.toLowerCase().includes(imei.toLowerCase()));
};

/**
 * Filter by SIM locally (client-side)
 */
export const filterBySimLocal = (devices, sim) => {
  if (!sim) return devices;
  return devices.filter(device => device.telephone && device.telephone.toLowerCase().includes(sim.toLowerCase()));
};

/**
 * Filter by Vehicle locally (client-side)
 */
export const filterByVehicleLocal = (devices, vehicle) => {
  if (!vehicle) return devices;
  return devices.filter(device => device.immatriculation && device.immatriculation.toLowerCase().includes(vehicle.toLowerCase()));
};

/**
 * Filter by Company locally (client-side)
 */
export const filterByCompanyLocal = (devices, company, companies) => {
  if (!company) return devices;
  
  const selectedCompany = companies.find(c => c.name === company);
  if (!selectedCompany) return [];
  
  return devices.filter(device => device.entreprise === company);
};

/**
 * Get vehicles with empty IMEI (restored original functionality)
 */
export const fetchVehiclesWithEmptyImei = async () => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: queries.listVehicles,
        variables: {
          filter: {
            or: [
              { vehicleDeviceImei: { attributeExists: false } },
              { vehicleDeviceImei: { eq: "" } }
            ]
          },
          limit: 10000
        }
      });

      // Get companies for mapping
      const companiesResponse = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });

      const companies = companiesResponse.data.listCompanies.items;
      
      const vehicles = response.data.listVehicles.items
        .filter(vehicle => vehicle != null)
        .map(vehicle => {
          const company = companies.find(c => c.id === vehicle.companyVehiclesId);
          return {
            ...vehicle,
            id: vehicle.immat || vehicle.immatriculation,
            entreprise: company ? company.name : "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || vehicle.immatriculation || "",
            nomVehicule: "",
            imei: "",
            typeBoitier: "",
            marque: "",
            modele: "",
            kilometrage: "",
            telephone: "",
            emplacement: "",
            deviceData: null,
            isAssociated: false
          };
        });
      
      return vehicles;
      
    } catch (error) {
      console.error('Error fetching vehicles with empty IMEI:', error);
      throw error;
    }
  });
};

/**
 * Get vehicles without devices (restored original functionality)
 */
export const fetchVehiclesWithoutDevices = async () => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: queries.listVehicles,
        variables: {
          filter: {
            or: [
              { vehicleDeviceImei: { attributeExists: false } },
              { vehicleDeviceImei: { eq: "" } }
            ]
          },
          limit: 10000
        }
      });

      // Get companies for mapping
      const companiesResponse = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });

      const companies = companiesResponse.data.listCompanies.items;
      
      const vehicles = response.data.listVehicles.items
        .filter(vehicle => vehicle != null)
        .map(vehicle => {
          const company = companies.find(c => c.id === vehicle.companyVehiclesId);
          return {
            ...vehicle,
            id: vehicle.immat || vehicle.immatriculation,
            entreprise: company ? company.name : "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || vehicle.immatriculation || "",
            nomVehicule: "",
            imei: "",
            typeBoitier: "",
            marque: "",
            modele: "",
            kilometrage: "",
            telephone: "",
            emplacement: "",
            deviceData: null,
            isAssociated: false
          };
        });
      
      return vehicles;
    } catch (error) {
      console.error('Error fetching vehicles without devices:', error);
      throw error;
    }
  });
};

/**
 * Get devices without vehicles (restored original functionality)
 */
export const fetchDevicesWithoutVehicles = async () => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          filter: { vehicle: { attributeExists: false } },
          limit: 10000
        }
      });
      
      const devices = response.data.listDevices.items.map(device => ({
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
      
      console.log('Devices without vehicles found:', devices.length);
      return devices;
    } catch (error) {
      console.error('Error fetching devices without vehicles:', error);
      throw error;
    }
  });
};

/**
 * OPTIMIZED: Get stats for unassociated items
 */
export const fetchUnassociatedItemsStats = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING UNASSOCIATED ITEMS STATS ===');
    
    try {
      // Fetch vehicles without devices
      const vehiclesWithoutDevicesResponse = await client.graphql({
        query: `query ListVehiclesWithoutDevicesCount {
          listVehicles(filter: {vehicleDeviceImei: {attributeExists: false}}) {
            items {
              immat
            }
          }
        }`
      });
      
      const vehiclesWithoutDevicesCount = vehiclesWithoutDevicesResponse.data.listVehicles.items.length;
      
      // Fetch devices without vehicles
      const devicesWithoutVehiclesResponse = await client.graphql({
        query: `query ListDevicesWithoutVehiclesCount {
          listDevices(filter: {vehicle: {attributeExists: false}}) {
            items {
              imei
            }
          }
        }`
      });
      
      const devicesWithoutVehiclesCount = devicesWithoutVehiclesResponse.data.listDevices.items.length;
      
      // Fetch total vehicles
      const totalVehiclesResponse = await client.graphql({
        query: `query ListTotalVehiclesCount {
          listVehicles {
            items {
              immat
            }
          }
        }`
      });
      
      const totalVehicles = totalVehiclesResponse.data.listVehicles.items.length;
      
      // Fetch total devices
      const totalDevicesResponse = await client.graphql({
        query: `query ListTotalDevicesCount {
          listDevices {
            items {
              imei
            }
          }
        }`
      });
      
      const totalDevices = totalDevicesResponse.data.listDevices.items.length;
      
      console.log('Unassociated items stats:', {
        vehiclesWithoutDevicesCount,
        devicesWithoutVehiclesCount,
        totalVehicles,
        totalDevices
      });
      
      return {
        vehiclesWithoutDevicesCount,
        devicesWithoutVehiclesCount,
        totalVehicles,
        totalDevices
      };
    } catch (error) {
      console.error('Error fetching unassociated items stats:', error);
      throw error;
    }
  });
};

/**
 * Get all vehicles and devices together
 */
export const fetchAllVehiclesAndDevices = async () => {
  return await withCredentialRetry(async () => {
    try {
      // Get all vehicles
      const vehiclesResponse = await client.graphql({
        query: queries.listVehicles,
        variables: { limit: 10000 }
      });

      // Get all devices  
      const devicesResponse = await client.graphql({
        query: queries.listDevices,
        variables: { limit: 10000 }
      });

      // Get companies for mapping
      const companiesResponse = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });

      const companies = companiesResponse.data.listCompanies.items;
      const devices = devicesResponse.data.listDevices.items;
      
      // Map vehicles
      const vehicles = vehiclesResponse.data.listVehicles.items
        .filter(vehicle => vehicle != null)
        .map(vehicle => {
          const company = companies.find(c => c.id === vehicle.companyVehiclesId);
          const associatedDevice = devices.find(device => device.imei === vehicle.vehicleDeviceImei);
          
          return {
            ...vehicle,
            id: vehicle.immat || vehicle.immatriculation,
            entreprise: company ? company.name : "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || vehicle.immatriculation || "",
            nomVehicule: vehicle.nom || "",
            imei: vehicle.vehicleDeviceImei || "",
            typeBoitier: associatedDevice?.protocolId?.toString() || "",
            marque: "",
            modele: "",
            kilometrage: "",
            telephone: associatedDevice?.sim || "",
            emplacement: "",
            deviceData: associatedDevice,
            isAssociated: !!vehicle.vehicleDeviceImei
          };
        });

      // Map devices without vehicles
      const devicesWithoutVehicles = devices
        .filter(device => device != null && !device.vehicle)
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

      return [...vehicles, ...devicesWithoutVehicles];
    } catch (error) {
      console.error('Error fetching all vehicles and devices:', error);
      throw error;
    }
  });
};

/**
 * Create vehicle
 */
export const createVehicle = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    try {
      const response = await client.graphql({
        query: mutations.createVehicle,
        variables: { input: vehicleData }
      });
      return response.data.createVehicle;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  });
};
