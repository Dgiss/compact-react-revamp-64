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
 * Search companies with a real-time backend query - Case insensitive search
 */
export const searchCompaniesReal = async (searchTerm) => {
  return await withCredentialRetry(async () => {
    try {
      // Si pas de terme de recherche, retourner les premières entreprises
      if (!searchTerm || searchTerm.trim() === '') {
        const response = await client.graphql({
          query: queries.listCompanies,
          variables: { limit: 20 }
        });
        
        return response.data.listCompanies.items.map(company => ({
          id: company.id,
          name: company.name,
          siret: company.siret
        }));
      }
      
      // Recherche d'abord avec le terme exact
      let response = await client.graphql({
        query: queries.listCompanies,
        variables: {
          filter: {
            name: { contains: searchTerm }
          },
          limit: 50
        }
      });

      let companies = response.data.listCompanies.items;

      // Si aucun résultat avec le terme exact, essayer une recherche plus large
      if (companies.length === 0) {
        const searchVariations = [
          searchTerm.toLowerCase(),
          searchTerm.toUpperCase(),
          searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase()
        ];

        for (const variation of searchVariations) {
          if (companies.length > 0) break;
          
          response = await client.graphql({
            query: queries.listCompanies,
            variables: {
              filter: {
                name: { contains: variation }
              },
              limit: 50
            }
          });
          
          companies = response.data.listCompanies.items;
        }
      }

      // Si toujours aucun résultat, chercher dans toutes les entreprises
      if (companies.length === 0) {
        response = await client.graphql({
          query: queries.listCompanies,
          variables: { limit: 1000 }
        });
        
        const allCompanies = response.data.listCompanies.items;
        console.log(`📊 Total d'entreprises dans la base: ${allCompanies.length}`);
        
        // Filtrer manuellement avec une recherche plus flexible
        const searchLower = searchTerm.toLowerCase();
        companies = allCompanies.filter(company => 
          company.name && (
            company.name.toLowerCase().includes(searchLower) ||
            (company.siret && company.siret.includes(searchTerm))
          )
        );
        
        console.log(`📋 Recherche manuelle: ${companies.length} entreprises trouvées`);
        
        // Log des premières entreprises pour debug
        if (allCompanies.length > 0) {
          console.log(`🏢 Exemples d'entreprises en base:`, 
            allCompanies.slice(0, 5).map(c => c.name)
          );
        }
      }
      
      const finalCompanies = companies.map(company => ({
        id: company.id,
        name: company.name,
        siret: company.siret
      }));
      
      console.log(`Recherche "${searchTerm}": ${finalCompanies.length} entreprises trouvées`);
      return finalCompanies;
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
  if (!vehicle || vehicle.trim() === '') return devices;
  const searchTerm = vehicle.toLowerCase().trim();
  return devices.filter(device => 
    device.immatriculation && 
    device.immatriculation.toLowerCase().includes(searchTerm)
  );
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
export const fetchVehiclesWithEmptyImei = async (onProgressUpdate = null) => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING VEHICLES WITH EMPTY IMEI WITH PROGRESSIVE DISPLAY ===');
    
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
        
        // Call progress callback after each page with current results
        if (onProgressUpdate && allVehicles.length > 0) {
          // Fetch companies for mapping (simplified version for performance)
          try {
            const companiesResponse = await client.graphql({
              query: queries.listCompanies,
              variables: { limit: 1000 }
            });
            const companies = companiesResponse.data.listCompanies.items;
            
            const progressVehicles = allVehicles.map(vehicle => {
              const company = companies.find(c => c.id === vehicle.companyVehiclesId);
              return {
                ...vehicle,
                id: vehicle.immat || vehicle.immatriculation,
                entreprise: company?.name || "Non définie",
                type: "vehicle",
                immatriculation: vehicle.immat || vehicle.immatriculation || "",
                nomVehicule: vehicle.nomVehicule || "",
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
            
            onProgressUpdate([...progressVehicles]); // Send copy of current results
          } catch (companyError) {
            console.warn('Error fetching companies for progress update:', companyError);
          }
        }
        
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
          nomVehicule: vehicle.nomVehicule || "",
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
          nomVehicule: vehicle.nomVehicule || "",
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
      // Get all devices and filter out those with vehicles on the client side
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          limit: 1000
        }
      });
      
      const allDevices = response.data?.listDevices?.items || [];
      
      // Filter devices that don't have a vehicle association
      const devicesWithoutVehicles = allDevices.filter(device => !device.vehicle);
      
      const devices = devicesWithoutVehicles.map(device => ({
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
      
      // Fetch devices without vehicles - using all devices and filtering client side
      const allDevicesResponse = await client.graphql({
        query: queries.listDevices,
        variables: { limit: 1000 }
      });
      
      const devicesWithoutVehicles = allDevicesResponse.data.listDevices.items.filter(device => !device.vehicle);
      
      const devicesWithoutVehiclesCount = devicesWithoutVehicles.length;
      
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
