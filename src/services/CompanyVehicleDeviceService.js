import * as VehicleService from './VehicleService';
import * as CompanyService from './CompanyService';
import * as DeviceService from './DeviceService';

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
    // Try to use real service first, fallback to mock data if GraphQL fails
    let companies, vehicles;
    
    try {
      const result = await VehicleService.fetchCompaniesWithVehicles();
      companies = result.companies;
      vehicles = result.vehicles;
    } catch (graphqlError) {
      console.warn('GraphQL service failed, using mock data:', graphqlError.message);
      
      // Use mock data service as fallback
      const { fetchMockCompaniesWithVehicles } = await import('./MockDataService');
      const mockResult = await fetchMockCompaniesWithVehicles();
      companies = mockResult.companies;
      vehicles = mockResult.vehicles;
    }
    
    // Separate vehicles from free devices
    const actualVehicles = vehicles.filter(item => item.type === 'vehicle');
    const freeDevices = vehicles.filter(item => item.type === 'device');
    
    // Generate statistics
    const stats = {
      totalCompanies: companies.length,
      totalVehicles: actualVehicles.length,
      totalDevices: vehicles.length,
      freeDevices: freeDevices.length,
      associatedDevices: actualVehicles.filter(v => v.imei).length,
      companiesWithVehicles: companies.filter(c => c.vehicles?.items?.length > 0).length
    };
    
    return {
      companies,
      vehicles: actualVehicles,
      devices: vehicles, // Combined vehicles + free devices
      freeDevices,
      stats
    };
  } catch (error) {
    console.error('Error fetching companies with vehicles and devices:', error);
    throw error;
  }
};

/**
 * Get vehicles for a specific company
 * @param {string} companyId - Company ID
 * @returns {Promise<Array>} Array of vehicles with device data
 */
export const fetchVehiclesByCompany = async (companyId) => {
  try {
    const { companies, vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    // Find the company
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }
    
    // Filter vehicles for this company
    const companyVehicles = vehicles.filter(vehicle => 
      vehicle.type === 'vehicle' && 
      vehicle.entreprise === company.name
    );
    
    return companyVehicles;
  } catch (error) {
    console.error('Error fetching vehicles by company:', error);
    throw error;
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
 * Search devices by multiple criteria
 * @param {Object} filters - Search filters
 * @param {string} filters.imei - IMEI filter
 * @param {string} filters.sim - SIM filter
 * @param {string} filters.entreprise - Company filter
 * @param {string} filters.immatriculation - License plate filter
 * @returns {Promise<Array>} Filtered results
 */
export const searchDevicesAndVehicles = async (filters) => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    return vehicles.filter(item => {
      const matchesImei = !filters.imei || 
        (item.imei && item.imei.toLowerCase().includes(filters.imei.toLowerCase()));
      
      const matchesSim = !filters.sim || 
        (item.telephone && item.telephone.toLowerCase().includes(filters.sim.toLowerCase()));
      
      const matchesEntreprise = !filters.entreprise || 
        (item.entreprise && item.entreprise.toLowerCase().includes(filters.entreprise.toLowerCase()));
      
      const matchesImmat = !filters.immatriculation || 
        (item.immatriculation && item.immatriculation.toLowerCase().includes(filters.immatriculation.toLowerCase()));
      
      return matchesImei && matchesSim && matchesEntreprise && matchesImmat;
    });
  } catch (error) {
    console.error('Error searching devices and vehicles:', error);
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
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.siret && company.siret.includes(searchTerm))
    );
  } catch (error) {
    console.error('Error searching companies:', error);
    throw error;
  }
};

/**
 * Search devices by IMEI only
 * @param {string} imei - IMEI to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByImei = async (imei) => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    return vehicles.filter(item => 
      item.imei && item.imei.toLowerCase().includes(imei.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching by IMEI:', error);
    throw error;
  }
};

/**
 * Search devices by SIM only
 * @param {string} sim - SIM to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchBySim = async (sim) => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    return vehicles.filter(item => 
      item.telephone && item.telephone.toLowerCase().includes(sim.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching by SIM:', error);
    throw error;
  }
};

/**
 * Search devices by vehicle/immatriculation only
 * @param {string} vehicle - Vehicle/immatriculation to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByVehicle = async (vehicle) => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    return vehicles.filter(item => 
      (item.immatriculation && item.immatriculation.toLowerCase().includes(vehicle.toLowerCase())) ||
      (item.nomVehicule && item.nomVehicule.toLowerCase().includes(vehicle.toLowerCase()))
    );
  } catch (error) {
    console.error('Error searching by vehicle:', error);
    throw error;
  }
};

/**
 * Search devices by company only
 * @param {string} company - Company to search for
 * @returns {Promise<Array>} Filtered results
 */
export const searchByCompany = async (company) => {
  try {
    console.log('=== COMPANY SEARCH DEBUG ===');
    console.log('Searching for company:', company);
    
    const { companies, vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    console.log('Total vehicles loaded:', vehicles.length);
    console.log('Total companies loaded:', companies.length);
    
    // Get all unique companies for debugging
    const allCompanies = [...new Set(vehicles
      .map(item => item.entreprise)
      .filter(Boolean)
    )];
    console.log('All available companies:', allCompanies);
    
    // Filter results with case-insensitive partial matching
    const results = vehicles.filter(item => {
      if (!item.entreprise) return false;
      
      const itemCompany = item.entreprise.toLowerCase();
      const searchCompany = company.toLowerCase();
      
      // Skip "Boîtier libre" when searching for real companies
      if (item.entreprise === "Boîtier libre" && company !== "Boîtier libre") {
        return false;
      }
      
      return itemCompany.includes(searchCompany);
    });
    
    console.log('Search results count:', results.length);
    console.log('Sample search results:', results.slice(0, 3));
    console.log('=== END SEARCH DEBUG ===');
    
    return results;
  } catch (error) {
    console.error('Error searching by company:', error);
    console.error('Full error:', error);
    // Return empty array on error to prevent UI crashes
    return [];
  }
};

/**
 * Get device status and association info
 * @param {string} imei - Device IMEI
 * @returns {Promise<Object>} Device status information
 */
export const getDeviceStatus = async (imei) => {
  try {
    const { vehicles } = await VehicleService.fetchCompaniesWithVehicles();
    
    const device = vehicles.find(item => item.imei === imei);
    
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
    console.error('Error getting device status:', error);
    throw error;
  }
};