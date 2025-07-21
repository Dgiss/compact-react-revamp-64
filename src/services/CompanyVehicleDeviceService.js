import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry } from '@/config/aws-config.js';

const client = generateClient();

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
 * OPTIMIZED: Get vehicles with empty IMEI with primary/fallback system and complete pagination
 */
export const fetchVehiclesWithEmptyImei = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING VEHICLES WITH EMPTY IMEI WITH COMPLETE PAGINATION ===');
    
    try {
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      let totalNullItems = 0;
      let totalInvalidItems = 0;
      let totalNullCompanies = 0;
      
      // Iterate through all pages using pagination
      do {
        pageCount++;
        console.log(`Fetching vehicles with empty IMEI - Page ${pageCount}${nextToken ? ` (nextToken: ${nextToken.substring(0, 50)}...)` : ''}`);
        
        const response = await client.graphql({
          query: `query GetVehiclesWithEmptyImei($nextToken: String) {
            listVehicles(
              filter: {or: [{vehicleDeviceImei: {attributeExists: false}}, {vehicleDeviceImei: {eq: ""}}]}
              nextToken: $nextToken
              limit: 1000
            ) {
              items {
                companyVehiclesId
                device {
                  cid
                  name
                  protocolId
                  sim
                  imei
                  flespi_id
                  device_type_id
                }
                immatriculation
                immat
                companyVehiclesId
                vehicleDeviceImei
              }
              nextToken
            }
          }`,
          variables: { nextToken }
        });

        const rawItems = response.data.listVehicles.items;
        console.log(`Page ${pageCount}: ${rawItems.length} raw items received`);

        // STEP 1: Filter out null items and validate data
        const validVehicles = rawItems.filter(vehicle => {
          if (vehicle === null || vehicle === undefined) {
            console.warn('Filtered out null/undefined vehicle item');
            totalNullItems++;
            return false;
          }
          
          // Validate that vehicle has either immat or immatriculation
          if (!vehicle.immat && !vehicle.immatriculation) {
            console.warn('Filtered out vehicle with no immat/immatriculation:', vehicle);
            totalInvalidItems++;
            return false;
          }
          
          return true;
        });

        console.log(`Page ${pageCount}: ${validVehicles.length} valid vehicles after filtering (${totalNullItems} null, ${totalNullCompanies} null companies, ${totalInvalidItems} invalid)`);
        
        allVehicles = allVehicles.concat(validVehicles);
        nextToken = response.data.listVehicles.nextToken;
        
        console.log(`Page ${pageCount}: ${validVehicles.length} vehicles added, Total so far: ${allVehicles.length}`);
        
      } while (nextToken);

      console.log(`=== PAGINATION COMPLETE: ${pageCount} pages, ${allVehicles.length} total valid vehicles with empty IMEI ===`);
      console.log(`=== FILTERED OUT: ${totalNullItems} null items, ${totalNullCompanies} null companies, ${totalInvalidItems} invalid items ===`);

      // Fetch all companies to match with vehicles
      const companiesResponse = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });
      const companies = companiesResponse.data.listCompanies.items;
      
      const vehicles = allVehicles.map(vehicle => {
        const company = companies.find(c => c.id === vehicle.companyVehiclesId);
        return {
          ...vehicle,
          id: vehicle.immat || vehicle.immatriculation,
          entreprise: company?.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || vehicle.immatriculation || "",
          nomVehicule: vehicle.device?.name || "",
          imei: "", // Empty by definition
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
      
      console.log('=== WORKING FILTER SUCCESS WITH COMPLETE PAGINATION ===');
      console.log('Total vehicles with empty IMEI found:', vehicles.length);
      console.log('Total items filtered out:', totalNullItems + totalNullCompanies + totalInvalidItems);
      
      return vehicles;
      
    } catch (error) {
      console.error('=== ERROR WITH WORKING FILTER ===');
      console.error('Error details:', error);
      // STEP 2: Improved error handling - preserve original error details
      const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';
      console.error('Original error details:', {
        message: error?.message,
        stack: error?.stack,
        graphQLErrors: error?.errors
      });
      throw new Error(`Erreur lors de la récupération des véhicules sans IMEI: ${errorMessage}`);
    }
  });
};

/**
 * OPTIMIZED: Get vehicles without devices using working filter with complete pagination
 */
export const fetchVehiclesWithoutDevices = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING VEHICLES WITHOUT DEVICES WITH COMPLETE PAGINATION ===');
    
    try {
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      let totalNullItems = 0;
      let totalInvalidItems = 0;
      let totalNullCompanies = 0;
      
      // Iterate through all pages using pagination
      do {
        pageCount++;
        console.log(`Fetching vehicles without devices - Page ${pageCount}${nextToken ? ` (nextToken: ${nextToken.substring(0, 50)}...)` : ''}`);
        
        const response = await client.graphql({
          query: `query ListVehiclesWithoutDevices($nextToken: String) {
            listVehicles(
              filter: {or: [{vehicleDeviceImei: {attributeExists: false}}, {vehicleDeviceImei: {eq: ""}}]}
              nextToken: $nextToken
              limit: 1000
            ) {
               items {
                companyVehiclesId
                device {
                  cid
                  name
                  protocolId
                  sim
                  imei
                  flespi_id
                  device_type_id
                }
                immatriculation
                immat
                vehicleDeviceImei
               }
              nextToken
            }
          }`,
          variables: { nextToken }
        });
        
        const rawItems = response.data.listVehicles.items;
        console.log(`Page ${pageCount}: ${rawItems.length} raw items received`);

        // STEP 1: Filter out null items and validate data
        const validVehicles = rawItems.filter(vehicle => {
          if (vehicle === null || vehicle === undefined) {
            console.warn('Filtered out null/undefined vehicle item');
            totalNullItems++;
            return false;
          }
          
          // Validate that vehicle has either immat or immatriculation
          if (!vehicle.immat && !vehicle.immatriculation) {
            console.warn('Filtered out vehicle with no immat/immatriculation:', vehicle);
            totalInvalidItems++;
            return false;
          }
          
          return true;
        });

        console.log(`Page ${pageCount}: ${validVehicles.length} valid vehicles after filtering (${totalNullItems} null, ${totalNullCompanies} null companies, ${totalInvalidItems} invalid)`);
        
        allVehicles = allVehicles.concat(validVehicles);
        nextToken = response.data.listVehicles.nextToken;
        
        console.log(`Page ${pageCount}: ${validVehicles.length} vehicles without devices added, Total so far: ${allVehicles.length}`);
        
      } while (nextToken);
      
      console.log(`=== PAGINATION COMPLETE: ${pageCount} pages, ${allVehicles.length} total vehicles without devices ===`);
      console.log(`=== FILTERED OUT: ${totalNullItems} null items, ${totalNullCompanies} null companies, ${totalInvalidItems} invalid items ===`);
      
      // Fetch all companies to match with vehicles
      const companiesResponse = await client.graphql({
        query: queries.listCompanies,
        variables: { limit: 1000 }
      });
      const companies = companiesResponse.data.listCompanies.items;
      
      const vehicles = allVehicles.map(vehicle => {
        const company = companies.find(c => c.id === vehicle.companyVehiclesId);
        return {
          ...vehicle,
          id: vehicle.immat || vehicle.immatriculation,
          entreprise: company?.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || vehicle.immatriculation || "",
          nomVehicule: vehicle.device?.name || "",
          imei: "", // Empty by definition since these are vehicles without devices
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
      
      console.log('Vehicles without devices found:', vehicles.length);
      console.log('Sample vehicles:', vehicles.slice(0, 3).map(v => ({
        immat: v.immatriculation,
        company: v.entreprise,
        vehicleDeviceImei: v.vehicleDeviceImei
      })));
      
      return vehicles;
    } catch (error) {
      console.error('Error fetching vehicles without devices:', error);
      // Improved error handling
      const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';
      console.error('Original error details:', {
        message: error?.message,
        stack: error?.stack,
        graphQLErrors: error?.errors
      });
      throw new Error(`Erreur lors de la récupération des véhicules sans devices: ${errorMessage}`);
    }
  });
};

/**
 * OPTIMIZED: Get devices without vehicles - uses simplified GraphQL query
 */
export const fetchDevicesWithoutVehicles = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== OPTIMIZED SEARCH: DEVICES WITHOUT VEHICLES ===');
    
    try {
      const response = await client.graphql({
        query: `query ListDevicesWithoutVehicle {
          listDevices(filter: {
            deviceVehicleImmat: {attributeExists: false}
          }) {
            items {
              imei
              name
              sim
              cid
              protocolId
              flespi_id
              device_type_id
            }
          }
        }`
      });
      
      const devices = response.data.listDevices.items.map(device => ({
        id: device.imei,
        entreprise: "Boîtier libre",
        type: "device",
        immatriculation: "",
        nomVehicule: device.name || "",
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
