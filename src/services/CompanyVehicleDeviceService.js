import * as VehicleService from './VehicleService';
import * as CompanyService from './CompanyService';
import * as DeviceService from './DeviceService';
import { safeGetCache, safeSetCache, removeCache } from '@/utils/cache-utils';

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
    
    // OPTIMIZED: Check for cached data first using safe cache utilities
    const cachedData = safeGetCache('vehicle_cache', 300000); // 5 minutes
    if (cachedData) {
      return cachedData;
    }
    
    // Try to use real service first, fallback to mock data if GraphQL fails
    let companies, vehicles;
    
    try {
      const result = await VehicleService.fetchCompaniesWithVehicles();
      companies = result.companies;
      vehicles = result.vehicles;
      console.log('GraphQL data loaded successfully:', {
        companiesCount: companies.length,
        vehiclesCount: vehicles.length
      });
    } catch (graphqlError) {
      console.warn('GraphQL service failed, using mock data:', graphqlError.message);
      console.error('Full GraphQL error:', graphqlError);
      
      // Use mock data service as fallback
      const { fetchMockCompaniesWithVehicles } = await import('./MockDataService');
      const mockResult = await fetchMockCompaniesWithVehicles();
      companies = mockResult.companies;
      vehicles = mockResult.vehicles;
      console.log('Mock data loaded as fallback:', {
        companiesCount: companies.length,
        vehiclesCount: vehicles.length
      });
    }
    
    // Separate vehicles from free devices
    const actualVehicles = vehicles.filter(item => item.type === 'vehicle');
    let freeDevices = vehicles.filter(item => item.type === 'device');
    
    // NEW: Fetch company device associations to update device statuses
    try {
      const { generateClient } = await import('aws-amplify/api');
      const { companyDevicesByCompanyIDAndAssociationDate } = await import('../graphql/mutations');
      const client = generateClient();
      
      console.log('=== FETCHING COMPANY DEVICE ASSOCIATIONS ===');
      
      // For each company, get their device associations
      for (const company of companies) {
        try {
          const result = await client.graphql({
            query: companyDevicesByCompanyIDAndAssociationDate,
            variables: {
              companyID: company.id,
              filter: { isActive: { eq: true } } // Only active associations
            }
          });
          
          const companyDevices = result.data?.companyDevicesByCompanyIDAndAssociationDate?.items || [];
          console.log(`Company ${company.name} has ${companyDevices.length} reserved devices`);
          
          // Update free devices to show company reservation
          companyDevices.forEach(companyDevice => {
            const deviceIndex = freeDevices.findIndex(device => device.imei === companyDevice.deviceIMEI);
            if (deviceIndex !== -1) {
              // Update the device to show it's reserved for this company
              freeDevices[deviceIndex] = {
                ...freeDevices[deviceIndex],
                entreprise: company.name,
                isReservedForCompany: true,
                companyReservation: {
                  companyId: company.id,
                  companyName: company.name,
                  associationDate: companyDevice.associationDate
                }
              };
              console.log(`Device ${companyDevice.deviceIMEI} marked as reserved for ${company.name}`);
            }
          });
        } catch (error) {
          console.warn(`Error fetching devices for company ${company.name}:`, error);
        }
      }
    } catch (error) {
      console.warn('Error fetching company device associations:', error);
    }
    
    // Generate statistics
    const stats = {
      totalCompanies: companies.length,
      totalVehicles: actualVehicles.length,
      totalDevices: [...actualVehicles, ...freeDevices].length,
      freeDevices: freeDevices.filter(d => !d.isReservedForCompany).length,
      reservedDevices: freeDevices.filter(d => d.isReservedForCompany).length,
      associatedDevices: actualVehicles.filter(v => v.imei).length,
      companiesWithVehicles: companies.filter(c => c.vehicles?.items?.length > 0).length
    };
    
    const result = {
      companies,
      vehicles: actualVehicles,
      devices: [...actualVehicles, ...freeDevices], // Combined vehicles + free devices + reserved devices
      freeDevices,
      stats,
      timestamp: Date.now()
    };
    
    // OPTIMIZED: Save minimal cache data using safe cache utilities
    const lightweightCache = {
      companies: companies.map(c => ({ id: c.id, name: c.name })), // Only ID and name
      vehicles: actualVehicles.map(v => ({
        id: v.id,
        immatriculation: v.immatriculation,
        entreprise: v.entreprise,
        imei: v.imei,
        type: v.type,
        isAssociated: v.isAssociated
      })),
      devices: [...actualVehicles, ...freeDevices].map(d => ({
        id: d.id,
        imei: d.imei,
        entreprise: d.entreprise,
        type: d.type,
        isAssociated: d.isAssociated,
        isReservedForCompany: d.isReservedForCompany
      })),
      stats: result.stats
    };
    
    // Use safe cache utility to handle QuotaExceededError
    safeSetCache('vehicle_cache', lightweightCache, 300000); // 5 minutes
    
    return result;
  } catch (error) {
    console.error('Error fetching companies with vehicles and devices:', error);
    throw error;
  }
};

/**
 * CLIENT-SIDE: Filter vehicles by company using cached data
 * @param {Array} vehicles - Cached vehicles data
 * @param {string} companyId - Company ID
 * @param {Array} companies - Cached companies data
 * @returns {Array} Filtered vehicles
 */
export const filterVehiclesByCompanyLocal = (vehicles, companyId, companies) => {
  try {
    // Find the company
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      console.warn(`Company with ID ${companyId} not found`);
      return [];
    }
    
    // Filter vehicles for this company
    return vehicles.filter(vehicle => 
      vehicle.type === 'vehicle' && 
      vehicle.entreprise === company.name
    );
  } catch (error) {
    console.error('Error filtering vehicles by company:', error);
    return [];
  }
};

/**
 * Get free (unassociated) devices
 * @returns {Promise<Array>} Array of free devices
 */
export const fetchFreeDevices = async () => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    // Return only free devices
    return vehicles.filter(item => item.type === 'device');
  } catch (error) {
    console.error('Error fetching free devices:', error);
    throw error;
  }
};

/**
 * CLIENT-SIDE: Filter devices by multiple criteria using cached data
 * @param {Array} devices - Cached devices data
 * @param {Object} filters - Search filters
 * @returns {Array} Filtered results
 */
export const filterDevicesLocal = (devices, filters) => {
  try {
    return devices.filter(item => {
      const matchesImei = !filters.imei || 
        (item.imei && item.imei.toLowerCase().includes(filters.imei.toLowerCase()));
      
      const matchesSim = !filters.sim || 
        (item.telephone && item.telephone.toLowerCase().includes(filters.sim.toLowerCase()));
      
      const matchesEntreprise = !filters.entreprise || 
        (item.entreprise && item.entreprise.toLowerCase().includes(filters.entreprise.toLowerCase()));
      
      const matchesImmat = !filters.immatriculation || (() => {
        const searchTerm = filters.immatriculation.toLowerCase();
        const hasImmatriculation = item.immatriculation && item.immatriculation.toLowerCase().includes(searchTerm);
        const hasImmat = item.immat && item.immat.toLowerCase().includes(searchTerm);
        const hasNomVehicule = item.nomVehicule && item.nomVehicule.toLowerCase().includes(searchTerm);
        return hasImmatriculation || hasImmat || hasNomVehicule;
      })();
      
      return matchesImei && matchesSim && matchesEntreprise && matchesImmat;
    });
  } catch (error) {
    console.error('Error filtering devices locally:', error);
    return [];
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
 * CLIENT-SIDE: Filter devices by IMEI using cached data
 * @param {Array} devices - Cached devices data
 * @param {string} imei - IMEI to search for
 * @returns {Array} Filtered results
 */
export const filterByImeiLocal = (devices, imei) => {
  return devices.filter(item => 
    item.imei && item.imei.toLowerCase().includes(imei.toLowerCase())
  );
};

/**
 * CLIENT-SIDE: Filter devices by SIM using cached data
 * @param {Array} devices - Cached devices data
 * @param {string} sim - SIM to search for
 * @returns {Array} Filtered results
 */
export const filterBySimLocal = (devices, sim) => {
  return devices.filter(item => 
    item.telephone && item.telephone.toLowerCase().includes(sim.toLowerCase())
  );
};

/**
 * CLIENT-SIDE: Filter devices by vehicle/immatriculation using cached data
 * @param {Array} devices - Cached devices data
 * @param {string} vehicle - Vehicle/immatriculation to search for
 * @returns {Array} Filtered results
 */
export const filterByVehicleLocal = (devices, vehicle) => {
  const searchTerm = vehicle.toLowerCase();
  return devices.filter(item => {
    const hasImmatriculation = item.immatriculation && item.immatriculation.toLowerCase().includes(searchTerm);
    const hasImmat = item.immat && item.immat.toLowerCase().includes(searchTerm);
    const hasNomVehicule = item.nomVehicule && item.nomVehicule.toLowerCase().includes(searchTerm);
    return hasImmatriculation || hasImmat || hasNomVehicule;
  });
};

/**
 * CLIENT-SIDE: Filter devices by company using cached data
 * @param {Array} devices - Cached devices data
 * @param {string} company - Company to search for
 * @param {Array} companies - Cached companies data
 * @returns {Array} Filtered results
 */
export const filterByCompanyLocal = (devices, company, companies) => {
  try {
    // If company is an ID (UUID format), find the company name first
    let searchTerm = company;
    if (typeof company === 'string' && company.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      const foundCompany = companies.find(c => c.id === company);
      if (foundCompany) {
        searchTerm = foundCompany.name;
      } else {
        return [];
      }
    }
    
    // Normalize company name for better matching
    const normalizeCompanyName = (name) => {
      if (!name || typeof name !== 'string') return '';
      return name.toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remove accents
    };
    
    const normalizedSearchTerm = normalizeCompanyName(searchTerm);
    
    // Filter results with enhanced matching
    return devices.filter(item => {
      if (!item.entreprise) return false;
      
      const normalizedItemCompany = normalizeCompanyName(item.entreprise);
      
      // Skip "Boîtier libre" when searching for real companies
      if (item.entreprise === "Boîtier libre" && searchTerm !== "Boîtier libre") {
        return false;
      }
      
      // Try exact match first, then partial match
      const exactMatch = normalizedItemCompany === normalizedSearchTerm;
      const partialMatch = normalizedItemCompany.includes(normalizedSearchTerm);
      
      return exactMatch || partialMatch;
    });
  } catch (error) {
    console.error('Error filtering by company locally:', error);
    return [];
  }
};

/**
 * CLIENT-SIDE: Get device status using cached data
 * @param {Array} devices - Cached devices data
 * @param {string} imei - Device IMEI
 * @returns {Object} Device status information
 */
export const getDeviceStatusLocal = (devices, imei) => {
  try {
    const device = devices.find(item => item.imei === imei);
    
    if (!device) {
      return { found: false, message: 'Device not found' };
    }
    
    return {
      found: true,
      type: device.type,
      isAssociated: device.isAssociated,
      entreprise: device.entreprise,
      vehicleInfo: device.type === 'vehicle' ? {
        immatriculation: device.immatriculation,
        nomVehicule: device.nomVehicule,
        marque: device.marque,
        modele: device.modele
      } : null,
      deviceData: device.deviceData
    };
  } catch (error) {
    console.error('Error getting device status locally:', error);
    return { found: false, message: 'Error retrieving device status' };
  }
};

/**
 * OPTIMIZED: Fetch vehicles without devices directly from GraphQL
 * @param {Object} filter - Optional filter criteria
 * @returns {Promise<Array>} Array of vehicles without devices
 */
export const fetchVehiclesWithoutDevices = async (filter = {}) => {
  try {
    console.log('=== FETCHING VEHICLES WITHOUT DEVICES (OPTIMIZED) ===');
    
    const { generateClient } = await import('aws-amplify/api');
    const { listVehicles } = await import('../graphql/queries');
    const client = generateClient();
    
    // Use GraphQL filter to get only vehicles without associated devices
    // In our schema, vehicles have a @hasOne relation with device, so we filter where device is null
    const variables = {
      filter: {
        ...filter,
        // Filter for vehicles that don't have a device relation
        vehicleDeviceImei: { attributeExists: false }
      },
      limit: 1000
    };
    
    const result = await client.graphql({
      query: listVehicles,
      variables
    });
    
    const vehicles = result.data?.listVehicles?.items || [];
    
    console.log(`Found ${vehicles.length} vehicles without devices`);
    
    // Transform to match our data structure
    return vehicles.map(vehicle => ({
      ...vehicle,
      type: 'vehicle',
      isAssociated: false,
      entreprise: vehicle.company?.name || 'Entreprise inconnue',
      immatriculation: vehicle.immat,
      imei: null,
      telephone: null
    }));
    
  } catch (error) {
    console.error('Error fetching vehicles without devices:', error);
    throw error;
  }
};

/**
 * OPTIMIZED: Fetch devices without vehicles directly from GraphQL
 * @param {Object} filter - Optional filter criteria
 * @returns {Promise<Array>} Array of devices without vehicles
 */
export const fetchDevicesWithoutVehicles = async (filter = {}) => {
  try {
    console.log('=== FETCHING DEVICES WITHOUT VEHICLES (OPTIMIZED) ===');
    
    const { generateClient } = await import('aws-amplify/api');
    const { listDevices } = await import('../graphql/queries');
    const client = generateClient();
    
    // Use GraphQL filter to get only devices without vehicle association
    // In our schema, devices have a @belongsTo relation with vehicle, so we filter where vehicle is null
    const variables = {
      filter: {
        ...filter,
        // Filter for devices that don't have a vehicle relation
        deviceVehicleImmat: { attributeExists: false }
      },
      limit: 1000
    };
    
    const result = await client.graphql({
      query: listDevices,
      variables
    });
    
    const devices = result.data?.listDevices?.items || [];
    
    console.log(`Found ${devices.length} devices without vehicles`);
    
    // Transform to match our data structure  
    return devices.map(device => ({
      ...device,
      type: 'device',
      isAssociated: false,
      entreprise: 'Boîtier libre',
      immatriculation: null,
      nomVehicule: null,
      telephone: device.sim || null
    }));
    
  } catch (error) {
    console.error('Error fetching devices without vehicles:', error);
    throw error;
  }
};

/**
 * OPTIMIZED: Fetch vehicles with empty IMEI (vehicles that have association but no IMEI)
 * @param {Object} filter - Optional filter criteria
 * @returns {Promise<Array>} Array of vehicles with empty vehicleDeviceImei
 */
export const fetchVehiclesWithEmptyImei = async (filter = {}) => {
  try {
    console.log('=== FETCHING VEHICLES WITH EMPTY IMEI ===');
    
    const { generateClient } = await import('aws-amplify/api');
    const { listVehicles } = await import('../graphql/queries');
    const client = generateClient();
    
    // Fetch all vehicles and filter client-side for empty IMEI
    const variables = {
      filter: filter,
      limit: 1000
    };
    
    const result = await client.graphql({
      query: listVehicles,
      variables
    });
    
    const allVehicles = result.data?.listVehicles?.items || [];
    
    // Filter for vehicles with empty/null vehicleDeviceImei
    const vehiclesWithEmptyImei = allVehicles.filter(vehicle => 
      !vehicle.vehicleDeviceImei || 
      vehicle.vehicleDeviceImei === '' || 
      vehicle.vehicleDeviceImei === null
    );
    
    console.log(`Found ${vehiclesWithEmptyImei.length} vehicles with empty IMEI out of ${allVehicles.length} total vehicles`);
    
    // Transform to match our data structure
    return vehiclesWithEmptyImei.map(vehicle => ({
      ...vehicle,
      type: 'vehicle',
      isAssociated: false, // They have no IMEI so considered not fully associated
      entreprise: vehicle.company?.name || 'Entreprise inconnue',
      immatriculation: vehicle.immat,
      imei: null, // Explicitly null to show empty state
      telephone: null,
      vehicleDeviceImei: null // Make sure it's clearly null
    }));
    
  } catch (error) {
    console.error('Error fetching vehicles with empty IMEI:', error);
    throw error;
  }
};

/**
 * OPTIMIZED: Get statistics for unassociated items without loading full data
 * @returns {Promise<Object>} Statistics object
 */
export const fetchUnassociatedItemsStats = async () => {
  try {
    console.log('=== FETCHING UNASSOCIATED ITEMS STATS (OPTIMIZED) ===');
    
    const [vehiclesWithoutDevices, devicesWithoutVehicles] = await Promise.all([
      fetchVehiclesWithoutDevices(),
      fetchDevicesWithoutVehicles()
    ]);
    
    return {
      vehiclesWithoutDevicesCount: vehiclesWithoutDevices.length,
      devicesWithoutVehiclesCount: devicesWithoutVehicles.length,
      totalVehicles: vehiclesWithoutDevices.length, // Could be enhanced with total count query
      totalDevices: devicesWithoutVehicles.length   // Could be enhanced with total count query
    };
    
  } catch (error) {
    console.error('Error fetching unassociated items stats:', error);
    throw error;
  }
};