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
 * OPTIMIZED: Get vehicles without devices
 */
export const fetchVehiclesWithoutDevices = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING VEHICLES WITHOUT DEVICES ===');
    
    try {
      const response = await client.graphql({
        query: `query ListVehiclesWithoutDevices {
          listVehicles(filter: {vehicleDeviceImei: {attributeExists: false}}) {
            items {
              immat
              immatriculation
              nomVehicule
              marque
              modele
              kilometerage
              emplacement
              vehicleDeviceImei
              companyVehiclesId
              company {
                id
                name
                siret
              }
            }
          }
        }`
      });
      
      const vehicles = response.data.listVehicles.items.map(vehicle => ({
        ...vehicle,
        id: vehicle.immat || vehicle.immatriculation,
        entreprise: vehicle.company?.name || "Non définie",
        type: "vehicle",
        immatriculation: vehicle.immat || vehicle.immatriculation || "",
        nomVehicule: vehicle.nomVehicule || "",
        imei: "",
        typeBoitier: "",
        marque: vehicle.marque || "",
        modele: vehicle.modele || "",
        kilometrage: vehicle.kilometerage?.toString() || "",
        telephone: "",
        emplacement: vehicle.emplacement || "",
        deviceData: null,
        isAssociated: false
      }));
      
      console.log('Vehicles without devices found:', vehicles.length);
      return vehicles;
    } catch (error) {
      console.error('Error fetching vehicles without devices:', error);
      throw error;
    }
  });
};

/**
 * OPTIMIZED: Get vehicles with empty IMEI with primary/fallback system
 */
export const fetchVehiclesWithEmptyImei = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING VEHICLES WITH EMPTY IMEI (PRIMARY METHOD) ===');
    
    try {
      // PRIMARY METHOD: Direct GraphQL query for vehicles with empty IMEI
      console.log('Trying primary method: Direct query for vehicles with empty vehicleDeviceImei...');
      
      let allVehiclesWithEmptyImei = [];
      let nextToken = null;
      let totalBatches = 0;
      
      do {
        totalBatches++;
        console.log(`=== BATCH ${totalBatches} for vehicles with empty IMEI ===`);
        
        const response = await client.graphql({
          query: `query GetVehiclesWithEmptyImei($nextToken: String) {
            listVehicles(
              filter: {
                or: [
                  { vehicleDeviceImei: { attributeExists: false } },
                  { vehicleDeviceImei: { eq: "" } },
                  { vehicleDeviceImei: { eq: null } }
                ]
              },
              limit: 1000,
              nextToken: $nextToken
            ) {
              items {
                immat
                immatriculation
                nomVehicule
                marque
                modele
                kilometerage
                emplacement
                vehicleDeviceImei
                companyVehiclesId
                company {
                  id
                  name
                  siret
                }
              }
              nextToken
            }
          }`,
          variables: { nextToken }
        });

        const vehiclesData = response.data.listVehicles;
        console.log(`Batch ${totalBatches} - Vehicles with empty IMEI:`, vehiclesData.items.length);
        
        if (vehiclesData.items.length > 0) {
          const mappedVehicles = vehiclesData.items.map(vehicle => ({
            ...vehicle,
            id: vehicle.immat || vehicle.immatriculation,
            entreprise: vehicle.company?.name || "Non définie",
            type: "vehicle",
            immatriculation: vehicle.immat || vehicle.immatriculation || "",
            nomVehicule: vehicle.nomVehicule || "",
            imei: "", // Empty by definition
            typeBoitier: "",
            marque: vehicle.marque || "",
            modele: vehicle.modele || "",
            kilometrage: vehicle.kilometerage?.toString() || "",
            telephone: "",
            emplacement: vehicle.emplacement || "",
            deviceData: null,
            isAssociated: false
          }));
          
          allVehiclesWithEmptyImei = allVehiclesWithEmptyImei.concat(mappedVehicles);
        }
        
        nextToken = vehiclesData.nextToken;
        console.log(`Batch ${totalBatches} completed. NextToken:`, !!nextToken);
        
      } while (nextToken);
      
      console.log('=== PRIMARY METHOD SUCCESS ===');
      console.log('Total vehicles with empty IMEI found:', allVehiclesWithEmptyImei.length);
      console.log('Total batches processed:', totalBatches);
      
      return allVehiclesWithEmptyImei;
      
    } catch (primaryError) {
      console.error('=== PRIMARY METHOD FAILED ===');
      console.error('Primary error details:', primaryError);
      console.error('Primary error message:', primaryError.message);
      if (primaryError.errors) {
        console.error('GraphQL errors:', primaryError.errors);
      }
      
      // FALLBACK METHOD: Load all vehicles and filter client-side
      console.log('=== SWITCHING TO FALLBACK METHOD ===');
      console.log('Loading all vehicles and filtering client-side...');
      
      try {
        let allVehicles = [];
        let nextToken = null;
        let fallbackBatches = 0;
        
        do {
          fallbackBatches++;
          console.log(`=== FALLBACK BATCH ${fallbackBatches} ===`);
          
          const response = await client.graphql({
            query: queries.listVehicles,
            variables: { 
              limit: 1000,
              nextToken: nextToken
            }
          });
          
          const vehiclesData = response.data.listVehicles;
          console.log(`Fallback batch ${fallbackBatches} - All vehicles:`, vehiclesData.items.length);
          
          allVehicles = allVehicles.concat(vehiclesData.items);
          nextToken = vehiclesData.nextToken;
          
        } while (nextToken);
        
        console.log('Fallback: Total vehicles loaded:', allVehicles.length);
        
        // Filter vehicles with empty IMEI client-side
        const vehiclesWithEmptyImei = allVehicles.filter(vehicle => {
          const hasEmptyImei = !vehicle.vehicleDeviceImei || vehicle.vehicleDeviceImei === "" || vehicle.vehicleDeviceImei === null;
          return hasEmptyImei;
        });
        
        console.log('Fallback: Vehicles with empty IMEI after filtering:', vehiclesWithEmptyImei.length);
        
        // Map to expected format
        const mappedVehicles = vehiclesWithEmptyImei.map(vehicle => ({
          ...vehicle,
          id: vehicle.immat || vehicle.immatriculation,
          entreprise: vehicle.company?.name || "Non définie",
          type: "vehicle",
          immatriculation: vehicle.immat || vehicle.immatriculation || "",
          nomVehicule: vehicle.nomVehicule || "",
          imei: "", // Empty by definition
          typeBoitier: "",
          marque: vehicle.marque || "",
          modele: vehicle.modele || "",
          kilometrage: vehicle.kilometerage?.toString() || "",
          telephone: "",
          emplacement: vehicle.emplacement || "",
          deviceData: null,
          isAssociated: false
        }));
        
        console.log('=== FALLBACK METHOD SUCCESS ===');
        console.log('Fallback result count:', mappedVehicles.length);
        
        return mappedVehicles;
        
      } catch (fallbackError) {
        console.error('=== FALLBACK METHOD ALSO FAILED ===');
        console.error('Fallback error details:', fallbackError);
        console.error('Fallback error message:', fallbackError.message);
        
        throw new Error(`Échec principal et fallback: Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`);
      }
    }
  });
};

/**
 * OPTIMIZED: Get devices without vehicles
 */
export const fetchDevicesWithoutVehicles = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING DEVICES WITHOUT VEHICLES ===');
    
    try {
      const response = await client.graphql({
        query: `query ListDevicesWithoutVehicles {
          listDevices(filter: {vehicle: {attributeExists: false}}) {
            items {
              cid
              name
              protocolId
              sim
              imei
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
