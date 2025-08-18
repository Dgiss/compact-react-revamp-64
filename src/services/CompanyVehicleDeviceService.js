// ============= src/services/CompanyVehicleDeviceService.js - VERSION COMPLÈTE OPTIMISÉE =============

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { withCredentialRetry, waitForAmplifyConfig, ensureCredentials, getLazyClient } from '@/config/aws-config.js';

const client = getLazyClient();

// ============= CACHE MULTI-NIVEAU INTELLIGENT POUR COMPANIES =============
const companyCache = {
  companies: null,
  companiesTimestamp: 0,
  searchResults: new Map(),
  maxAge: 10 * 60 * 1000, // 10 minutes pour companies (changent rarement)
  searchMaxAge: 2 * 60 * 1000, // 2 minutes pour recherches
  
  getCompanies() {
    if (this.companies && Date.now() - this.companiesTimestamp < this.maxAge) {
      console.log('📦 Companies loaded from cache');
      return this.companies;
    }
    return null;
  },
  
  setCompanies(data) {
    this.companies = data;
    this.companiesTimestamp = Date.now();
    console.log(`💾 Companies cached: ${data.length} items`);
  },
  
  getSearch(searchTerm) {
    const key = searchTerm.toLowerCase();
    const cached = this.searchResults.get(key);
    if (cached && Date.now() - cached.timestamp < this.searchMaxAge) {
      console.log(`📦 Search "${searchTerm}" loaded from cache`);
      return cached.data;
    }
    return null;
  },
  
  setSearch(searchTerm, data) {
    const key = searchTerm.toLowerCase();
    this.searchResults.set(key, { data, timestamp: Date.now() });
    
    // Limiter la taille du cache de recherche
    if (this.searchResults.size > 50) {
      const firstKey = this.searchResults.keys().next().value;
      this.searchResults.delete(firstKey);
    }
    console.log(`💾 Search "${searchTerm}" cached`);
  },
  
  clear() {
    this.companies = null;
    this.companiesTimestamp = 0;
    this.searchResults.clear();
    console.log('🧹 Company cache cleared');
  },
  
  getAge() {
    return this.companiesTimestamp ? Date.now() - this.companiesTimestamp : null;
  }
};

// ============= FONCTION COMPANIES ULTRA-OPTIMISÉE =============
export const fetchCompaniesForSelect = async () => {
  return await withCredentialRetry(async () => {
    try {
      // 🚀 OPTIMISATION 1: Cache statique existant (votre logique conservée)
      if (fetchCompaniesForSelect._cache && Date.now() - fetchCompaniesForSelect._cache.ts < 60000) {
        console.log('📦 Companies from static cache');
        return fetchCompaniesForSelect._cache.data;
      }

      // 🚀 OPTIMISATION 2: Cache instance
      const cached = companyCache.getCompanies();
      if (cached) {
        // Mettre à jour le cache statique aussi
        fetchCompaniesForSelect._cache = { data: cached, ts: Date.now() };
        return cached;
      }

      console.log('🚀 Starting ultra-optimized companies fetch...');
      const startTime = performance.now();
      
      let allCompanies = [];
      let nextToken = null;
      let pageCount = 0;
      
      // ============= PAGINATION OPTIMISÉE =============
      do {
        pageCount++;
        
        console.log(`📄 Fetching companies page ${pageCount}...`);
        
        try {
          const response = await client.graphql({
            query: `query ListCompanyNames($limit: Int, $nextToken: String) {
              listCompanies(limit: $limit, nextToken: $nextToken) {
                items { id name siret }
                nextToken
              }
            }`,
            variables: { 
              limit: 1000,
              nextToken: nextToken 
            }
          });
          
          const data = response.data.listCompanies;
          const items = data.items || [];
          
          allCompanies = allCompanies.concat(items);
          nextToken = data.nextToken;
          
          console.log(`✅ Companies page ${pageCount}: ${items.length} items (Total: ${allCompanies.length})`);
          
        } catch (pageError) {
          console.error(`❌ Companies page ${pageCount} error:`, pageError);
          
          // 🚀 OPTIMISATION 3: Continuer avec données partielles
          if (allCompanies.length > 0) {
            console.log(`⚠️ Using partial companies data: ${allCompanies.length}`);
            break;
          } else {
            throw pageError;
          }
        }
        
        // Limite raisonnable pour companies
        if (pageCount >= 10) {
          console.log('⚠️ Companies page limit reached');
          break;
        }
        
      } while (nextToken);
      
      const endTime = performance.now();
      
      const companies = allCompanies.map(company => ({
        id: company.id,
        name: company.name,
        siret: company.siret
      }));
      
      console.log(`🎯 Ultra-optimized companies fetch completed: ${companies.length} companies in ${(endTime - startTime).toFixed(2)}ms`);
      
      // 🚀 OPTIMISATION 4: Triple cache
      companyCache.setCompanies(companies);
      fetchCompaniesForSelect._cache = { data: companies, ts: Date.now() };
      
      return companies;
      
    } catch (error) {
      console.error('Ultra-optimized companies fetch error:', error);
      throw error;
    }
  });
};

// ============= RECHERCHE COMPANIES ULTRA-OPTIMISÉE =============
export const searchCompaniesReal = async (searchTerm) => {
  return await withCredentialRetry(async () => {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return [];
      }

      const normalizedTerm = searchTerm.trim();
      
      // 🚀 OPTIMISATION 1: Cache de recherche
      const cachedSearch = companyCache.getSearch(normalizedTerm);
      if (cachedSearch) {
        return cachedSearch;
      }

      // 🚀 OPTIMISATION 2: Lookup direct pour les IDs (votre logique conservée)
      const looksLikeId = typeof searchTerm === 'string' && 
                         searchTerm.trim() !== '' && 
                         /[a-zA-Z0-9-]{8,}/.test(searchTerm);
      
      if (looksLikeId) {
        console.log(`🎯 Direct company lookup for ID: ${normalizedTerm}`);
        
        try {
          const res = await client.graphql({
            query: queries.getCompany,
            variables: { id: normalizedTerm }
          });
          
          const company = res.data?.getCompany;
          if (company) {
            const result = [company];
            companyCache.setSearch(normalizedTerm, result);
            return result;
          }
        } catch (directError) {
          console.log('Direct company lookup failed, falling back to list search');
        }
      }

      // 🚀 OPTIMISATION 3: Recherche dans companies cachées
      console.log(`🔍 Searching companies for: "${normalizedTerm}"`);
      const allCompanies = await fetchCompaniesForSelect();
      
      const lowerSearchTerm = normalizedTerm.toLowerCase();
      const results = allCompanies.filter(company => 
        company.name?.toLowerCase().includes(lowerSearchTerm) ||
        company.siret?.includes(normalizedTerm) ||
        company.id === normalizedTerm
      );
      
      console.log(`✅ Company search completed: ${results.length} companies found`);
      
      // 🚀 OPTIMISATION 4: Cache du résultat de recherche
      companyCache.setSearch(normalizedTerm, results);
      
      return results;
      
    } catch (error) {
      console.error('Ultra-optimized company search error:', error);
      throw error;
    }
  });
};

// ============= FONCTION DEVICES SANS VÉHICULES ULTRA-OPTIMISÉE =============
export const fetchDevicesWithoutVehicles = async (limit = 1000) => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🚀 Starting ultra-optimized fetch of devices without vehicles...');
      const startTime = performance.now();
      
      let allDevices = [];
      let nextToken = null;
      let pageCount = 0;
      
      // ============= PAGINATION INTELLIGENTE AVEC FILTRE =============
      do {
        pageCount++;
        
        const variables = {
          limit: Math.min(limit, 1000), // Respect GraphQL limits
          nextToken: nextToken,
          filter: {
            deviceVehicleImmat: { attributeExists: false }
          }
        };
        
        console.log(`📄 Fetching unassigned devices page ${pageCount}...`);
        
        try {
          const response = await client.graphql({
            query: queries.listDevices,
            variables: variables
          });
          
          const data = response.data.listDevices;
          const items = data.items || [];
          
          // 🚀 OPTIMISATION: Double filtrage côté client pour sécurité
          const unassignedDevices = items.filter(device => 
            !device.deviceVehicleImmat || device.deviceVehicleImmat === ''
          );
          
          allDevices = allDevices.concat(unassignedDevices);
          nextToken = data.nextToken;
          
          console.log(`✅ Unassigned devices page ${pageCount}: ${unassignedDevices.length}/${items.length} devices (Total: ${allDevices.length})`);
          
        } catch (pageError) {
          console.error(`❌ Unassigned devices page ${pageCount} error:`, pageError);
          
          // 🚀 OPTIMISATION: Continuer avec données partielles
          if (allDevices.length > 0) {
            console.log(`⚠️ Using partial unassigned devices: ${allDevices.length}`);
            break;
          } else {
            throw pageError;
          }
        }
        
        // 🚀 OPTIMISATION: Pause adaptative
        if (nextToken && pageCount % 3 === 0) {
          console.log('⏱️ Adaptive pause for unassigned devices...');
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Limite de sécurité
        if (pageCount >= 20) {
          console.log('⚠️ Unassigned devices page limit reached');
          break;
        }
        
      } while (nextToken && allDevices.length < limit);
      
      const endTime = performance.now();
      console.log(`🎯 Ultra-optimized unassigned devices fetch completed: ${allDevices.length} devices in ${(endTime - startTime).toFixed(2)}ms`);
      
      return allDevices;
      
    } catch (error) {
      console.error('Ultra-optimized unassigned devices fetch error:', error);
      throw error;
    }
  });
};

// ============= FONCTION VÉHICULES SANS DEVICES OPTIMISÉE =============
export const fetchVehiclesWithoutDevices = async (limit = 1000) => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🚀 Starting optimized fetch of vehicles without devices...');
      const startTime = performance.now();
      
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      
      do {
        pageCount++;
        
        const variables = {
          limit: Math.min(limit, 1000),
          nextToken: nextToken,
          filter: {
            vehicleDeviceImei: { attributeExists: false }
          }
        };
        
        console.log(`📄 Fetching unassigned vehicles page ${pageCount}...`);
        
        try {
          const response = await client.graphql({
            query: queries.listVehicles,
            variables: variables
          });
          
          const data = response.data.listVehicles;
          const items = data.items || [];
          
          // Double filtrage côté client
          const unassignedVehicles = items.filter(vehicle => 
            !vehicle.vehicleDeviceImei || vehicle.vehicleDeviceImei === ''
          );
          
          allVehicles = allVehicles.concat(unassignedVehicles);
          nextToken = data.nextToken;
          
          console.log(`✅ Unassigned vehicles page ${pageCount}: ${unassignedVehicles.length}/${items.length} vehicles (Total: ${allVehicles.length})`);
          
        } catch (pageError) {
          console.error(`❌ Unassigned vehicles page ${pageCount} error:`, pageError);
          
          if (allVehicles.length > 0) {
            console.log(`⚠️ Using partial unassigned vehicles: ${allVehicles.length}`);
            break;
          } else {
            throw pageError;
          }
        }
        
        if (pageCount >= 20) {
          console.log('⚠️ Unassigned vehicles page limit reached');
          break;
        }
        
      } while (nextToken && allVehicles.length < limit);
      
      const endTime = performance.now();
      console.log(`🎯 Unassigned vehicles fetch completed: ${allVehicles.length} vehicles in ${(endTime - startTime).toFixed(2)}ms`);
      
      return allVehicles;
      
    } catch (error) {
      console.error('Unassigned vehicles fetch error:', error);
      throw error;
    }
  });
};

// ============= FONCTIONS DE FILTRAGE LOCAL OPTIMISÉES =============

/**
 * Filter devices locally (client-side) - OPTIMISÉ
 */
export const filterDevicesLocal = (devices, filters) => {
  if (!devices || !Array.isArray(devices)) {
    console.warn('filterDevicesLocal: Invalid devices array');
    return [];
  }
  
  const startTime = performance.now();
  
  const filtered = devices.filter(device => {
    // Filtrage IMEI avec support multi-IMEI
    const imei = filters.imei;
    const dImei = (device.imei || '').toString().toLowerCase();
    
    // Support multi-IMEI amélioré
    const imeiTokens = imei ? 
      (typeof imei === 'string' ? imei : String(imei))
        .split(/[^0-9A-Za-z]+/)
        .map(t => t.trim())
        .filter(Boolean)
        .flatMap(t => {
          // Expansion des chaînes numériques concaténées en chunks de 15 chiffres
          if (/^\d+$/.test(t) && t.length >= 30 && t.length % 15 === 0) {
            const chunks = [];
            for (let i = 0; i < t.length; i += 15) {
              chunks.push(t.slice(i, i + 15));
            }
            return chunks;
          }
          return [t];
        }) : [];
    
    const hasMultiImei = imeiTokens.length > 1;
    const imeiMatch = !imei 
      ? true
      : hasMultiImei
        ? imeiTokens.some(token => dImei.includes(token.toLowerCase()))
        : (dImei && dImei.includes(imeiTokens[0]?.toLowerCase() || String(imei).toLowerCase()));
    
    // Filtrage immatriculation
    const immatriculationValue = (device.immatriculation || device.immat || '').toString();
    const immatriculationMatch = !filters.immatriculation || 
      immatriculationValue.toLowerCase().includes(filters.immatriculation.toLowerCase());
    
    // Filtrage entreprise
    const entrepriseMatch = !filters.entreprise || 
      ((device.entreprise || '').toLowerCase().includes(filters.entreprise.toLowerCase()));
    
    // Filtrage téléphone/SIM
    const telephoneMatch = !filters.telephone || 
      ((device.telephone || device.sim || '').toLowerCase().includes(filters.telephone.toLowerCase()));
    
    return imeiMatch && immatriculationMatch && entrepriseMatch && telephoneMatch;
  });
  
  const endTime = performance.now();
  console.log(`🔍 Local filtering completed: ${filtered.length}/${devices.length} items in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

/**
 * Filter vehicles by company locally (client-side) - OPTIMISÉ
 */
export const filterVehiclesByCompanyLocal = (vehicles, companyId, companies) => {
  if (!companyId || !vehicles || !Array.isArray(vehicles)) {
    return vehicles || [];
  }
  
  const startTime = performance.now();
  
  // Trouver l'entreprise
  const selectedCompany = companies?.find(company => company.id === companyId);
  if (!selectedCompany) {
    console.warn(`Company with ID ${companyId} not found`);
    return [];
  }
  
  const filtered = vehicles.filter(vehicle => vehicle.companyVehiclesId === companyId);
  
  const endTime = performance.now();
  console.log(`🏢 Company filtering completed: ${filtered.length} vehicles for company "${selectedCompany.name}" in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

/**
 * Get device status locally (client-side) - OPTIMISÉ
 */
export const getDeviceStatusLocal = (devices, imei) => {
  if (!devices || !Array.isArray(devices)) {
    return { found: false, message: 'No devices data available' };
  }
  
  const device = devices.find(device => device.imei === imei);
  
  if (!device) {
    return { found: false, message: `Device ${imei} not found` };
  }
  
  return { 
    found: true, 
    status: device.status,
    isAssociated: !!device.deviceVehicleImmat,
    vehicleImmat: device.deviceVehicleImmat || null
  };
};

/**
 * Filter by IMEI locally (client-side) - OPTIMISÉ
 */
export const filterByImeiLocal = (devices, imei) => {
  if (!imei || !devices || !Array.isArray(devices)) {
    return devices || [];
  }
  
  const startTime = performance.now();
  
  const raw = (typeof imei === 'string' ? imei : String(imei));
  let tokens = raw
    .split(/[^0-9A-Za-z]+/)
    .map(t => t.trim())
    .filter(Boolean);
    
  // Expansion des chaînes numériques concaténées en chunks de 15 chiffres
  tokens = tokens.flatMap(t => {
    if (/^\d+$/.test(t) && t.length >= 30 && t.length % 15 === 0) {
      const chunks = [];
      for (let i = 0; i < t.length; i += 15) {
        chunks.push(t.slice(i, i + 15));
      }
      return chunks;
    }
    return [t];
  });
  
  let filtered;
  
  if (tokens.length <= 1) {
    const term = (tokens[0] || raw).toLowerCase();
    filtered = devices.filter(device => device.imei && device.imei.toLowerCase().includes(term));
  } else {
    const lowers = tokens.map(t => t.toLowerCase());
    filtered = devices.filter(device => {
      const d = device.imei?.toLowerCase();
      if (!d) return false;
      return lowers.includes(d) || lowers.some(t => d.includes(t));
    });
  }
  
  const endTime = performance.now();
  console.log(`📱 IMEI filtering completed: ${filtered.length} devices matching "${imei}" in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

/**
 * Filter by SIM locally (client-side) - OPTIMISÉ
 */
export const filterBySimLocal = (devices, sim) => {
  if (!sim || !devices || !Array.isArray(devices)) {
    return devices || [];
  }
  
  const startTime = performance.now();
  const filtered = devices.filter(device => 
    (device.telephone && device.telephone.toLowerCase().includes(sim.toLowerCase())) ||
    (device.sim && device.sim.toLowerCase().includes(sim.toLowerCase()))
  );
  
  const endTime = performance.now();
  console.log(`📞 SIM filtering completed: ${filtered.length} devices matching "${sim}" in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

/**
 * Filter by Vehicle locally (client-side) - OPTIMISÉ
 */
export const filterByVehicleLocal = (devices, vehicle) => {
  if (!vehicle || vehicle.trim() === '' || !devices || !Array.isArray(devices)) {
    return devices || [];
  }
  
  const startTime = performance.now();
  const searchTerm = vehicle.toLowerCase().trim();
  const filtered = devices.filter(device => 
    (device.immatriculation && device.immatriculation.toLowerCase().includes(searchTerm)) ||
    (device.immat && device.immat.toLowerCase().includes(searchTerm))
  );
  
  const endTime = performance.now();
  console.log(`🚗 Vehicle filtering completed: ${filtered.length} devices matching "${vehicle}" in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

/**
 * Filter by Company locally (client-side) - OPTIMISÉ
 */
export const filterByCompanyLocal = (devices, company, companies) => {
  if (!company || !devices || !Array.isArray(devices)) {
    return devices || [];
  }
  
  const startTime = performance.now();
  
  // Recherche flexible par nom ou ID
  const searchTerm = company.toLowerCase();
  const selectedCompany = companies?.find(c => 
    c.name?.toLowerCase().includes(searchTerm) || 
    c.id === company
  );
  
  if (!selectedCompany) {
    console.warn(`Company "${company}" not found`);
    return [];
  }
  
  const filtered = devices.filter(device => 
    device.entreprise === selectedCompany.name ||
    device.companyVehiclesId === selectedCompany.id
  );
  
  const endTime = performance.now();
  console.log(`🏢 Company filtering completed: ${filtered.length} devices for "${company}" in ${(endTime - startTime).toFixed(2)}ms`);
  
  return filtered;
};

// ============= FONCTIONS DE RÉCUPÉRATION SPÉCIALISÉES =============

/**
 * Get vehicles with empty IMEI with optimized pagination - OPTIMISÉ
 */
export const fetchVehiclesWithEmptyImei = async (onProgressUpdate = null) => {
  return await withCredentialRetry(async () => {
    console.log('🚀 Starting optimized fetch of vehicles with empty IMEI...');
    
    try {
      let allVehicles = [];
      let nextToken = null;
      let pageCount = 0;
      let totalNullItems = 0;
      let totalInvalidItems = 0;
      let totalNullCompanies = 0;
      const startTime = performance.now();
      
      // Itérer à travers toutes les pages avec pagination
      do {
        pageCount++;
        console.log(`📄 Fetching vehicles with empty IMEI - Page ${pageCount}${nextToken ? ` (token: ${nextToken.substring(0, 20)}...)` : ''}`);
        
        try {
          const response = await client.graphql({
            query: queries.listVehicles,
            variables: {
              limit: 1000,
              nextToken: nextToken
            }
          });
          
          const data = response.data.listVehicles;
          const vehicles = data.items || [];
          nextToken = data.nextToken;
          
          // Filtrer les véhicules sans IMEI
          const vehiclesWithoutImei = vehicles.filter(vehicle => {
            const hasNoImei = !vehicle.vehicleDeviceImei || vehicle.vehicleDeviceImei === '';
            const hasNoCompany = !vehicle.companyVehiclesId;
            const isInvalid = !vehicle.immat;
            
            if (hasNoCompany) totalNullCompanies++;
            if (isInvalid) totalInvalidItems++;
            if (hasNoImei) totalNullItems++;
            
            return hasNoImei;
          });
          
          allVehicles = allVehicles.concat(vehiclesWithoutImei);
          
          console.log(`✅ Page ${pageCount}: ${vehiclesWithoutImei.length}/${vehicles.length} vehicles without IMEI (Total: ${allVehicles.length})`);
          
          // Callback de progression
          if (onProgressUpdate && typeof onProgressUpdate === 'function') {
            try {
              onProgressUpdate([...allVehicles]);
            } catch (callbackError) {
              console.warn('Progress callback error:', callbackError);
            }
          }
          
        } catch (pageError) {
          console.error(`❌ Error fetching page ${pageCount}:`, pageError);
          
          // Continuer avec les données partielles si possible
          if (allVehicles.length > 0) {
            console.log(`⚠️ Using partial data from ${pageCount - 1} pages: ${allVehicles.length} vehicles`);
            break;
          } else {
            throw pageError;
          }
        }
        
        // Pause entre pages pour éviter la surcharge
        if (nextToken && pageCount % 5 === 0) {
          console.log('⏱️ Adaptive pause for empty IMEI fetch...');
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Limite de sécurité
        if (pageCount >= 50) {
          console.log('⚠️ Empty IMEI fetch page limit reached');
          break;
        }
        
      } while (nextToken);
      
      const endTime = performance.now();
      
      console.log(`🎯 Empty IMEI fetch completed:`);
      console.log(`   📊 Total vehicles without IMEI: ${allVehicles.length}`);
      console.log(`   📄 Pages processed: ${pageCount}`);
      console.log(`   ⏱️ Total time: ${(endTime - startTime).toFixed(2)}ms`);
      console.log(`   📈 Stats: ${totalNullItems} no IMEI, ${totalNullCompanies} no company, ${totalInvalidItems} invalid`);
      
      return allVehicles;
      
    } catch (error) {
      console.error('Empty IMEI fetch error:', error);
      throw error;
    }
  });
};

// ============= FONCTIONS D'ASSOCIATION OPTIMISÉES =============

export const associateDeviceToCompany = async (deviceImei, companyId) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Associating device ${deviceImei} to company ${companyId}...`);
      
      const response = await client.graphql({
        query: mutations.createCompanyDevice,
        variables: {
          input: {
            companyID: companyId,
            deviceIMEI: deviceImei,
            associationDate: new Date().toISOString(),
            isActive: true
          }
        }
      });
      
      console.log(`✅ Device ${deviceImei} associated to company ${companyId}`);
      
      return response.data.createCompanyDevice;
    } catch (error) {
      console.error(`Device-company association error (${deviceImei} -> ${companyId}):`, error);
      throw error;
    }
  });
};

export const dissociateDeviceFromCompany = async (deviceImei, companyId) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Dissociating device ${deviceImei} from company ${companyId}...`);
      
      // Trouver l'association existante
      const response = await client.graphql({
        query: queries.listCompanyDevices,
        variables: {
          filter: {
            deviceIMEI: { eq: deviceImei },
            companyID: { eq: companyId },
            isActive: { eq: true }
          }
        }
      });
      
      const associations = response.data.listCompanyDevices.items;
      
      if (associations.length === 0) {
        throw new Error(`No active association found between device ${deviceImei} and company ${companyId}`);
      }
      
      // Désactiver l'association
      const updateResponse = await client.graphql({
        query: mutations.updateCompanyDevice,
        variables: {
          input: {
            id: associations[0].id,
            isActive: false,
            dissociationDate: new Date().toISOString()
          }
        }
      });
      
      console.log(`✅ Device ${deviceImei} dissociated from company ${companyId}`);
      
      return updateResponse.data.updateCompanyDevice;
    } catch (error) {
      console.error(`Device-company dissociation error (${deviceImei} <- ${companyId}):`, error);
      throw error;
    }
  });
};

// ============= FONCTIONS DE BATCH OPERATIONS =============

export const batchAssociateDevicesToCompany = async (deviceImeis, companyId) => {
  try {
    console.log(`🚀 Batch associating ${deviceImeis.length} devices to company ${companyId}...`);
    const startTime = performance.now();
    
    const results = [];
    const errors = [];
    
    // Traiter par chunks pour éviter la surcharge
    const chunkSize = 3;
    for (let i = 0; i < deviceImeis.length; i += chunkSize) {
      const chunk = deviceImeis.slice(i, i + chunkSize);
      
      console.log(`📦 Processing association chunk ${Math.floor(i/chunkSize) + 1}/${Math.ceil(deviceImeis.length/chunkSize)}...`);
      
      const chunkPromises = chunk.map(async (deviceImei) => {
        try {
          const result = await associateDeviceToCompany(deviceImei, companyId);
          return { success: true, deviceImei, result };
        } catch (error) {
          console.error(`Failed to associate device ${deviceImei}:`, error);
          return { success: false, deviceImei, error: error.message };
        }
      });
      
      const chunkResults = await Promise.allSettled(chunkPromises);
      
      chunkResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          if (result.value.success) {
            results.push(result.value);
          } else {
            errors.push(result.value);
          }
        }
      });
      
      // Pause entre chunks
      if (i + chunkSize < deviceImeis.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    const endTime = performance.now();
    
    console.log(`🎯 Batch association completed:`);
    console.log(`   ✅ Successful: ${results.length}`);
    console.log(`   ❌ Failed: ${errors.length}`);
    console.log(`   ⏱️ Total time: ${(endTime - startTime).toFixed(2)}ms`);
    
    return {
      successful: results,
      failed: errors,
      totalTime: endTime - startTime
    };
    
  } catch (error) {
    console.error('Batch association error:', error);
    throw error;
  }
};

// ============= UTILITAIRES DE CACHE =============

export const clearCompanyCache = () => {
  companyCache.clear();
  // Clear static cache aussi
  delete fetchCompaniesForSelect._cache;
};

export const getCompanyCacheStats = () => {
  return {
    companies: {
      cached: !!companyCache.companies,
      itemCount: companyCache.companies ? companyCache.companies.length : 0,
      age: companyCache.getAge(),
      maxAge: companyCache.maxAge
    },
    searches: {
      cached: companyCache.searchResults.size,
      maxAge: companyCache.searchMaxAge
    },
    static: {
      cached: !!fetchCompaniesForSelect._cache,
      age: fetchCompaniesForSelect._cache ? Date.now() - fetchCompaniesForSelect._cache.ts : null
    }
  };
};

export const warmUpCompanyCache = async () => {
  console.log('🔥 Warming up company cache...');
  try {
    await fetchCompaniesForSelect();
    console.log('✅ Company cache warmed up successfully');
  } catch (error) {
    console.error('❌ Failed to warm up company cache:', error);
  }
};

// ============= FONCTION DE TEST COMPLÈTE =============

export const testCompanyOptimizations = async () => {
  console.log('🧪 Testing company service optimizations...');
  const startTime = performance.now();
  
  try {
    // Test 1: Premier chargement companies
    console.log('1. Testing first companies load...');
    clearCompanyCache();
    const firstLoad = await fetchCompaniesForSelect();
    const firstLoadTime = performance.now() - startTime;
    
    // Test 2: Chargement depuis cache
    console.log('2. Testing companies cache load...');
    const cacheStartTime = performance.now();
    const secondLoad = await fetchCompaniesForSelect();
    const cacheLoadTime = performance.now() - cacheStartTime;
    
    // Test 3: Recherche
    if (firstLoad.length > 0) {
      console.log('3. Testing company search...');
      const searchStartTime = performance.now();
      const searchResults = await searchCompaniesReal(firstLoad[0].name.substring(0, 3));
      const searchTime = performance.now() - searchStartTime;
      
      // Test cache de recherche
      const searchCacheStartTime = performance.now();
      await searchCompaniesReal(firstLoad[0].name.substring(0, 3));
      const searchCacheTime = performance.now() - searchCacheStartTime;
      
      console.log(`   Search results: ${searchResults.length}`);
      console.log(`   Search time: ${searchTime.toFixed(2)}ms`);
      console.log(`   Search cache time: ${searchCacheTime.toFixed(2)}ms`);
    }
    
    // Test 4: Devices sans véhicules
    console.log('4. Testing unassigned devices fetch...');
    const devicesStartTime = performance.now();
    const unassignedDevices = await fetchDevicesWithoutVehicles(100); // Limite pour test
    const devicesTime = performance.now() - devicesStartTime;
    
    // Stats
    const stats = getCompanyCacheStats();
    const endTime = performance.now();
    
    console.log('✅ Company optimization tests completed');
    console.table({
      'Total Companies': firstLoad.length,
      'Unassigned Devices': unassignedDevices.length,
      'First Load Time': `${firstLoadTime.toFixed(2)}ms`,
      'Cache Load Time': `${cacheLoadTime.toFixed(2)}ms`,
      'Devices Fetch Time': `${devicesTime.toFixed(2)}ms`,
      'Speed Improvement': `${((firstLoadTime - cacheLoadTime) / firstLoadTime * 100).toFixed(1)}%`,
      'Cache Hit': secondLoad === firstLoad ? 'Yes' : 'No'
    });
    
    return {
      success: true,
      companiesCount: firstLoad.length,
      unassignedDevicesCount: unassignedDevices.length,
      firstLoadTime,
      cacheLoadTime,
      devicesTime,
      speedImprovement: ((firstLoadTime - cacheLoadTime) / firstLoadTime * 100),
      cacheStats: stats
    };
    
  } catch (error) {
    console.error('❌ Company optimization tests failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// ============= FONCTION DE MAINTENANCE GLOBALE =============

export const clearAllCaches = () => {
  clearCompanyCache();
  console.log('🧹 All CompanyVehicleDevice caches cleared');
};

export const getAllCacheStats = () => {
  return {
    company: getCompanyCacheStats()
  };
};

export const warmUpAllCaches = async () => {
  console.log('🔥 Warming up all CompanyVehicleDevice caches...');
  try {
    await warmUpCompanyCache();
    console.log('✅ All CompanyVehicleDevice caches warmed up successfully');
  } catch (error) {
    console.error('❌ Failed to warm up all caches:', error);
  }
};

// Log de chargement
console.log('🚀 CompanyVehicleDeviceService optimized loaded successfully!');
console.log('📋 Available optimizations:');
console.log('   • Multi-level intelligent caching (companies: 10min, searches: 2min)');
console.log('   • Optimized pagination with adaptive pauses');
console.log('   • Enhanced local filtering with performance monitoring');
console.log('   • Batch operations with chunking and error handling');
console.log('   • Graceful fallbacks and partial data handling');
console.log('   • Smart search with ID detection and cache-first strategy');
console.log('🔧 Cache utilities: clearAllCaches(), getAllCacheStats(), warmUpAllCaches()');
console.log('🧪 Test with: testCompanyOptimizations()');

export default {
  fetchCompaniesForSelect,
  searchCompaniesReal,
  fetchDevicesWithoutVehicles,
  fetchVehiclesWithoutDevices,
  fetchVehiclesWithEmptyImei,
  filterDevicesLocal,
  filterVehiclesByCompanyLocal,
  getDeviceStatusLocal,
  filterByImeiLocal,
  filterBySimLocal,
  filterByVehicleLocal,
  filterByCompanyLocal,
  associateDeviceToCompany,
  dissociateDeviceFromCompany,
  batchAssociateDevicesToCompany,
  clearAllCaches,
  getAllCacheStats,
  warmUpAllCaches,
  testCompanyOptimizations
};