import * as VehicleService from './VehicleService';
import * as CompanyService from './CompanyService';
import * as DeviceService from './DeviceService';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';

/**
 * Service for managing company-vehicle-device relationships
 * Provides a unified interface for complex data operations
 */

/**
 * Get all companies with their associated vehicles and devices
 * @returns {Promise<{companies: Array, vehicles: Array, devices: Array, stats: Object}>}
 */
export const fetchCompaniesWithVehiclesAndDevices = async () => {
  try {
    console.log('=== FETCHING COMPANIES WITH VEHICLES AND DEVICES ===');
    
    // Try to use real service first, fallback to mock data if GraphQL fails
    let companies, vehicles;
    
    try {
      const result = await VehicleService.fetchCompaniesWithVehicles();
      companies = result.companies;
      vehicles = result.vehicles;
      
      console.log('✅ GraphQL service succeeded');
      console.log(`Companies loaded: ${companies.length}`);
      console.log(`Vehicles/devices loaded: ${vehicles.length}`);
      
      // Log sample data for debugging
      if (vehicles.length > 0) {
        console.log('Sample vehicle/device data:', vehicles.slice(0, 3).map(v => ({
          type: v.type,
          entreprise: v.entreprise,
          imei: v.imei,
          telephone: v.telephone,
          immatriculation: v.immatriculation
        })));
      }
      
    } catch (graphqlError) {
      console.warn('❌ GraphQL service failed, using mock data:', graphqlError.message);
      console.error('GraphQL error details:', graphqlError);
      
      // Use mock data service as fallback
      const { fetchMockCompaniesWithVehicles } = await import('./MockDataService');
      const mockResult = await fetchMockCompaniesWithVehicles();
      companies = mockResult.companies;
      vehicles = mockResult.vehicles;
      
      console.log('✅ Mock data service succeeded');
      console.log(`Mock companies loaded: ${companies.length}`);
      console.log(`Mock vehicles/devices loaded: ${vehicles.length}`);
    }

    // Extract devices from vehicles data
    const devices = vehicles || [];
    
    // Calculate stats
    const stats = {
      totalCompanies: companies ? companies.length : 0,
      totalVehicles: vehicles ? vehicles.filter(v => v.type === 'vehicle').length : 0,
      totalDevices: vehicles ? vehicles.filter(v => v.type === 'device').length : 0,
      connectedDevices: vehicles ? vehicles.filter(v => v.type === 'device' && v.enabled).length : 0,
      freeDevices: vehicles ? vehicles.filter(v => v.type === 'device' && !v.immatriculation).length : 0
    };

    console.log('Calculated stats:', stats);
    console.log('=== END FETCHING COMPANIES WITH VEHICLES AND DEVICES ===');

    return {
      companies: companies || [],
      vehicles: vehicles || [],
      devices: devices,
      stats
    };

  } catch (error) {
    console.error('Error in fetchCompaniesWithVehiclesAndDevices:', error);
    throw error;
  }
};

/**
 * Fetch vehicles for a specific company
 * @param {string} companyId - Company ID
 * @returns {Promise<Array>} Vehicles for the company
 */
export const fetchVehiclesByCompany = async (companyId) => {
  try {
    console.log('=== FETCHING VEHICLES BY COMPANY ===');
    console.log('Company ID:', companyId);
    
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    // Filter vehicles by company ID
    const companyVehicles = vehicles.filter(vehicle => 
      vehicle.companyId === companyId || vehicle.entreprise_id === companyId
    );
    
    console.log(`Found ${companyVehicles.length} vehicles for company ${companyId}`);
    console.log('=== END FETCHING VEHICLES BY COMPANY ===');
    
    return companyVehicles;
    
  } catch (error) {
    console.error('Error in fetchVehiclesByCompany:', error);
    throw error;
  }
};

/**
 * Fetch free devices (not associated with any vehicle)
 * @returns {Promise<Array>} Free devices
 */
export const fetchFreeDevices = async () => {
  try {
    console.log('=== FETCHING FREE DEVICES ===');
    
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    // Filter devices that are not associated with vehicles
    const freeDevices = vehicles.filter(device => 
      device.type === 'device' && (!device.immatriculation || device.immatriculation === 'Non assigné')
    );
    
    console.log(`Found ${freeDevices.length} free devices`);
    console.log('=== END FETCHING FREE DEVICES ===');
    
    return freeDevices;
    
  } catch (error) {
    console.error('Error in fetchFreeDevices:', error);
    throw error;
  }
};

/**
 * Unified search function using direct GraphQL queries
 * @param {Object} filters - Search filters (imei, sim, company, vehicle)
 * @returns {Promise<Array>} Combined and formatted results
 */
export const searchDevicesAndVehicles = async (filters) => {
  try {
    console.log('=== UNIFIED SEARCH DEBUG ===');
    console.log('Filters:', filters);
    
    const client = generateClient();
    const { imei, sim, company, vehicle } = filters;
    
    // Build GraphQL filter based on provided criteria
    let graphqlFilter = null;
    
    if (imei && imei.trim()) {
      graphqlFilter = {
        or: [
          { imei: { eq: imei.trim() } },
          { imei: { beginsWith: imei.trim() } }
        ]
      };
    } else if (sim && sim.trim()) {
      graphqlFilter = {
        sim: { contains: sim.trim() }
      };
    } else if (vehicle && vehicle.trim()) {
      graphqlFilter = {
        deviceVehicleImmat: { contains: vehicle.trim() }
      };
    } else if (company && company.trim()) {
      graphqlFilter = {
        name: { contains: company.trim() }
      };
    }
    
    if (!graphqlFilter) {
      console.log('No valid search criteria provided');
      return [];
    }

    console.log('Using GraphQL filter:', JSON.stringify(graphqlFilter, null, 2));

    // Execute direct GraphQL search
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: graphqlFilter,
        limit: 1000
      }
    });

    const devices = response.data.listDevices.items || [];
    console.log('Direct GraphQL results:', devices.length);

    // Format results to match expected structure
    const formattedResults = devices.map(device => ({
      type: 'device',
      imei: device.imei,
      protocol_id: device.protocolId,
      sim: device.sim,
      name: device.name,
      entreprise: device.name || 'Non défini', // Use device name as company fallback
      immatriculation: device.deviceVehicleImmat || 'Non assigné',
      telephone: device.sim,
      enabled: device.enabled,
      device_type_id: device.device_type_id,
      flespi_id: device.flespi_id,
      cid: device.cid,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt
    }));

    console.log('Formatted results:', formattedResults.length);
    console.log('=== END UNIFIED SEARCH DEBUG ===');
    
    return formattedResults;
    
  } catch (error) {
    console.error('Error in searchDevicesAndVehicles:', error);
    throw error;
  }
};

/**
 * Get companies list for dropdowns/selects
 * @returns {Promise<Array>} Array of companies with id and name
 */
export const fetchCompaniesForSelect = async () => {
  console.log('=== FETCHING COMPANIES FOR SELECT ===');
  try {
    const companies = await CompanyService.fetchCompanies();
    console.log('Raw companies from service:', companies);
    
    const formattedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name || company.nom,
      siret: company.siret
    }));
    
    console.log('Formatted companies for select:', formattedCompanies);
    return formattedCompanies;
  } catch (error) {
    console.error('Error fetching companies for select:', error);
    throw error;
  }
};

/**
 * Search companies by name with real data
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Filtered companies
 */
export const searchCompaniesReal = async (searchTerm) => {
  try {
    const companies = await fetchCompaniesForSelect();
    
    if (!searchTerm) return companies;
    
    return companies.filter(company => 
      (company.name && company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.siret && company.siret.includes(searchTerm))
    );
  } catch (error) {
    console.error('Error searching companies:', error);
    throw error;
  }
};

/**
 * Search devices by IMEI using direct GraphQL
 * @param {string} imei - IMEI to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByImei = async (imei) => {
  try {
    console.log('=== IMEI SEARCH DEBUG ===');
    console.log('Searching for IMEI:', imei);
    
    const client = generateClient();
    
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: {
          or: [
            { imei: { eq: imei.trim() } },
            { imei: { beginsWith: imei.trim() } }
          ]
        },
        limit: 1000
      }
    });

    const devices = response.data.listDevices.items || [];
    console.log('IMEI search results:', devices.length);

    // Format results
    const formattedResults = devices.map(device => ({
      type: 'device',
      imei: device.imei,
      protocol_id: device.protocolId,
      sim: device.sim,
      name: device.name,
      entreprise: device.name || 'Non défini',
      immatriculation: device.deviceVehicleImmat || 'Non assigné',
      telephone: device.sim,
      enabled: device.enabled,
      device_type_id: device.device_type_id,
      flespi_id: device.flespi_id,
      cid: device.cid,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt
    }));

    console.log('=== END IMEI SEARCH DEBUG ===');
    return formattedResults;
    
  } catch (error) {
    console.error('Error in searchByImei:', error);
    throw error;
  }
};

/**
 * Search devices by SIM using direct GraphQL
 * @param {string} sim - SIM to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchBySim = async (sim) => {
  try {
    console.log('=== SIM SEARCH DEBUG ===');
    console.log('Searching for SIM:', sim);
    
    const client = generateClient();
    
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: {
          sim: { contains: sim.trim() }
        },
        limit: 1000
      }
    });

    const devices = response.data.listDevices.items || [];
    console.log('SIM search results:', devices.length);

    // Format results
    const formattedResults = devices.map(device => ({
      type: 'device',
      imei: device.imei,
      protocol_id: device.protocolId,
      sim: device.sim,
      name: device.name,
      entreprise: device.name || 'Non défini',
      immatriculation: device.deviceVehicleImmat || 'Non assigné',
      telephone: device.sim,
      enabled: device.enabled,
      device_type_id: device.device_type_id,
      flespi_id: device.flespi_id,
      cid: device.cid,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt
    }));

    console.log('=== END SIM SEARCH DEBUG ===');
    return formattedResults;
    
  } catch (error) {
    console.error('Error in searchBySim:', error);
    throw error;
  }
};

/**
 * Search devices by vehicle/immatriculation using direct GraphQL
 * @param {string} vehicle - Vehicle/immatriculation to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByVehicle = async (vehicle) => {
  try {
    console.log('=== VEHICLE SEARCH DEBUG ===');
    console.log('Searching for vehicle:', vehicle);
    
    const client = generateClient();
    
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: {
          deviceVehicleImmat: { contains: vehicle.trim() }
        },
        limit: 1000
      }
    });

    const devices = response.data.listDevices.items || [];
    console.log('Vehicle search results:', devices.length);

    // Format results
    const formattedResults = devices.map(device => ({
      type: 'device',
      imei: device.imei,
      protocol_id: device.protocolId,
      sim: device.sim,
      name: device.name,
      entreprise: device.name || 'Non défini',
      immatriculation: device.deviceVehicleImmat || 'Non assigné',
      telephone: device.sim,
      enabled: device.enabled,
      device_type_id: device.device_type_id,
      flespi_id: device.flespi_id,
      cid: device.cid,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt
    }));

    console.log('=== END VEHICLE SEARCH DEBUG ===');
    return formattedResults;
    
  } catch (error) {
    console.error('Error in searchByVehicle:', error);
    throw error;
  }
};

/**
 * Search devices by company using direct GraphQL
 * @param {string} company - Company to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByCompany = async (company) => {
  try {
    console.log('=== COMPANY SEARCH DEBUG ===');
    console.log('Searching for company:', company);
    
    const client = generateClient();
    
    const response = await client.graphql({
      query: queries.listDevices,
      variables: {
        filter: {
          name: { contains: company.trim() }
        },
        limit: 1000
      }
    });

    const devices = response.data.listDevices.items || [];
    console.log('Company search results:', devices.length);

    // Format results
    const formattedResults = devices.map(device => ({
      type: 'device',
      imei: device.imei,
      protocol_id: device.protocolId,
      sim: device.sim,
      name: device.name,
      entreprise: device.name || 'Non défini',
      immatriculation: device.deviceVehicleImmat || 'Non assigné',
      telephone: device.sim,
      enabled: device.enabled,
      device_type_id: device.device_type_id,
      flespi_id: device.flespi_id,
      cid: device.cid,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt
    }));

    console.log('=== END COMPANY SEARCH DEBUG ===');
    return formattedResults;
    
  } catch (error) {
    console.error('Error in searchByCompany:', error);
    throw error;
  }
};

/**
 * Get device status and association info by IMEI
 * @param {string} imei - Device IMEI
 * @returns {Promise<Object>} Device status and associations
 */
export const getDeviceStatus = async (imei) => {
  try {
    console.log('=== GET DEVICE STATUS DEBUG ===');
    console.log('Getting status for IMEI:', imei);
    
    const client = generateClient();
    
    // Get device details
    const deviceResponse = await client.graphql({
      query: queries.getDevice,
      variables: { imei: imei }
    });

    const device = deviceResponse.data.getDevice;
    
    if (!device) {
      console.log('Device not found');
      return {
        found: false,
        device: null,
        vehicle: null,
        company: null
      };
    }

    // If device has vehicle association, get vehicle details
    let vehicle = null;
    let company = null;
    
    if (device.deviceVehicleImmat) {
      // Search for vehicle by immatriculation
      const vehicleData = await VehicleService.fetchCompaniesWithVehicles();
      vehicle = vehicleData.vehicles.find(v => 
        v.immatriculation === device.deviceVehicleImmat || 
        v.immat === device.deviceVehicleImmat
      );
      
      if (vehicle && vehicle.entreprise) {
        company = vehicleData.companies.find(c => c.name === vehicle.entreprise);
      }
    }

    const status = {
      found: true,
      device: {
        imei: device.imei,
        protocolId: device.protocolId,
        sim: device.sim,
        name: device.name,
        enabled: device.enabled,
        associatedVehicle: device.deviceVehicleImmat,
        flespi_id: device.flespi_id,
        device_type_id: device.device_type_id
      },
      vehicle: vehicle ? {
        immatriculation: vehicle.immatriculation || vehicle.immat,
        nomVehicule: vehicle.nomVehicule,
        marque: vehicle.marque,
        modele: vehicle.modele,
        entreprise: vehicle.entreprise
      } : null,
      company: company ? {
        id: company.id,
        name: company.name,
        siret: company.siret
      } : null
    };

    console.log('Device status:', status);
    console.log('=== END GET DEVICE STATUS DEBUG ===');
    
    return status;
    
  } catch (error) {
    console.error('Error in getDeviceStatus:', error);
    throw error;
  }
};