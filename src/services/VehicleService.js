// ============= src/services/VehicleService.js - VERSION COMPLÈTE OPTIMISÉE =============

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry, getLazyClient } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';
import { createVehicleSimple, updateVehicleSimple } from './SimpleVehicleService.js';

const client = getLazyClient();

// ============= CACHE INLINE INTELLIGENT =============
const vehicleCache = {
  data: null,
  timestamp: 0,
  maxAge: 5 * 60 * 1000, // 5 minutes
  
  get() {
    if (this.data && Date.now() - this.timestamp < this.maxAge) {
      console.log('📦 Vehicles loaded from cache (ultra-fast!)');
      return this.data;
    }
    return null;
  },
  
  set(data) {
    this.data = data;
    this.timestamp = Date.now();
    console.log(`💾 Vehicles cached: ${data.length} items`);
  },
  
  clear() {
    this.data = null;
    this.timestamp = 0;
    console.log('🧹 Vehicle cache cleared');
  },
  
  getAge() {
    return this.timestamp ? Date.now() - this.timestamp : null;
  }
};

// ============= REQUÊTE OPTIMISÉE (Votre requête existante améliorée) =============
const SIMPLE_LIST_VEHICLES = `
  query ListVehiclesSimplified(
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        immat
        companyVehiclesId
        vehicleDeviceImei
        locations
        kilometerage
        code
        brand {
          brandName
        }
        modele {
          modele
        }
      }
      nextToken
    }
  }
`;

// ============= FONCTION PRINCIPALE ULTRA-OPTIMISÉE =============
export const fetchAllVehiclesOptimized = async () => {
  return await withCredentialRetry(async () => {
    // 🚀 OPTIMISATION 1: Vérifier le cache en premier
    const cached = vehicleCache.get();
    if (cached) {
      return cached;
    }

    try {
      let allVehicles = [];
      let nextToken = null;
      let batchCount = 0;
      const startTime = performance.now();
      
      console.log('🚀 Starting ultra-optimized vehicle fetch...');
      
      // ============= FONCTION DE BATCH AVEC RETRY INTELLIGENT =============
      const fetchBatchWithRetry = async (token, batchNum, retryCount = 0) => {
        const variables = {
          limit: 1000, // Maximiser pour réduire les round-trips
          nextToken: token
        };
        
        try {
          const response = await client.graphql({
            query: SIMPLE_LIST_VEHICLES,
            variables: variables
          });
          
          return response.data.listVehicles;
        } catch (error) {
          // 🚀 OPTIMISATION 2: Retry avec backoff exponentiel
          if (retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 500; // 500ms, 1s, 2s, 4s
            console.log(`🔄 Retrying vehicle batch ${batchNum} (attempt ${retryCount + 1}) in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchBatchWithRetry(token, batchNum, retryCount + 1);
          }
          throw error;
        }
      };

      // ============= BOUCLE PRINCIPALE OPTIMISÉE =============
      do {
        batchCount++;
        
        console.log(`📄 Fetching optimized vehicle batch ${batchCount}...`);
        
        try {
          const batchData = await fetchBatchWithRetry(nextToken, batchCount);
          const results = batchData.items;
          nextToken = batchData.nextToken;
          
          allVehicles = allVehicles.concat(results);
          
          console.log(`✅ Vehicle batch ${batchCount}: ${results.length} vehicles (Total: ${allVehicles.length})`);
          
          // 🚀 OPTIMISATION 3: Pause adaptative pour éviter la surcharge
          if (nextToken && batchCount % 5 === 0) {
            console.log('⏱️ Adaptive pause to prevent server overload...');
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
        } catch (batchError) {
          console.error(`❌ Vehicle batch ${batchCount} error:`, batchError);
          
          // 🚀 OPTIMISATION 4: Continuer avec les données partielles si possible
          if (allVehicles.length > 0) {
            console.log(`⚠️ Using partial vehicle data: ${allVehicles.length} vehicles`);
            break;
          } else {
            throw batchError;
          }
        }
        
        // 🚀 OPTIMISATION 5: Limite de sécurité
        if (batchCount >= 100) {
          console.log('⚠️ Safety limit reached (100 batches), stopping pagination');
          break;
        }
        
      } while (nextToken);

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      console.log(`🎯 Ultra-optimized vehicle fetch completed: ${allVehicles.length} vehicles in ${batchCount} batches (${totalTime.toFixed(2)}ms)`);

      // 🚀 OPTIMISATION 6: Sauvegarder en cache
      vehicleCache.set(allVehicles);

      return allVehicles;
      
    } catch (error) {
      console.error('Ultra-optimized vehicle fetch error:', error);
      
      // 🚀 OPTIMISATION 7: Fallback avec requête simplifiée
      console.log('🔄 Attempting fallback with simplified query...');
      try {
        const fallbackQuery = `
          query FallbackListVehicles($limit: Int) {
            listVehicles(limit: $limit) {
              items {
                immat
                companyVehiclesId
                vehicleDeviceImei
              }
              nextToken
            }
          }
        `;
        
        const response = await client.graphql({
          query: fallbackQuery,
          variables: { limit: 1000 }
        });
        
        const fallbackData = response.data.listVehicles.items || [];
        console.log(`✅ Fallback successful: ${fallbackData.length} vehicles`);
        
        // Cache même le fallback
        vehicleCache.set(fallbackData);
        
        return fallbackData;
      } catch (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
        throw error;
      }
    }
  });
};

// ============= FONCTION COMPLÈTE OPTIMISÉE =============
export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🚀 Starting optimized companies + vehicles fetch...');
      const startTime = performance.now();

      // 🚀 OPTIMISATION: Exécution parallèle avec gestion d'erreur
      const [vehiclesResult, devicesResult] = await Promise.allSettled([
        fetchAllVehiclesOptimized(),
        fetchAllDevices().catch(error => {
          console.warn('Devices fetch failed, continuing without:', error);
          return []; // Fallback gracieux
        })
      ]);

      // Traiter les résultats avec gestion d'erreur
      const vehicles = vehiclesResult.status === 'fulfilled' ? vehiclesResult.value : [];
      const devices = devicesResult.status === 'fulfilled' ? devicesResult.value : [];

      console.log(`📊 Parallel fetch results: ${vehicles.length} vehicles, ${devices.length} devices`);

      // Enrichir avec les entreprises
      const companyIds = [...new Set(vehicles.map(v => v.companyVehiclesId).filter(Boolean))];
      
      console.log(`🏢 Fetching ${companyIds.length} unique companies...`);
      
      const companyPromises = companyIds.map(async (companyId) => {
        try {
          const companyResponse = await client.graphql({
            query: queries.getCompany,
            variables: { id: companyId }
          });
          return companyResponse.data.getCompany;
        } catch (error) {
          console.warn(`Failed to fetch company ${companyId}:`, error);
          return { id: companyId, name: 'Entreprise inconnue' };
        }
      });

      // Exécuter les requêtes companies avec limite de concurrence
      const companies = [];
      const chunkSize = 5; // Limite de 5 requêtes simultanées
      
      for (let i = 0; i < companyPromises.length; i += chunkSize) {
        const chunk = companyPromises.slice(i, i + chunkSize);
        const chunkResults = await Promise.allSettled(chunk);
        
        const chunkCompanies = chunkResults
          .filter(result => result.status === 'fulfilled' && result.value)
          .map(result => result.value);
          
        companies.push(...chunkCompanies);
        
        // Pause entre chunks
        if (i + chunkSize < companyPromises.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      console.log(`✅ Companies fetched: ${companies.length}/${companyIds.length}`);

      // Combiner et enrichir véhicules et devices
      const enrichedVehicles = vehicles.map(vehicle => ({
        ...vehicle,
        type: 'vehicle',
        isAssociated: !!vehicle.vehicleDeviceImei,
        entreprise: companies.find(c => c.id === vehicle.companyVehiclesId)?.name || 'Entreprise inconnue'
      }));

      const enrichedDevices = devices.map(device => ({
        ...device,
        type: 'device',
        isAssociated: !!device.deviceVehicleImmat,
        entreprise: device.deviceVehicleImmat ? 'Associé' : 'Boîtier libre'
      }));

      const allItems = [...enrichedVehicles, ...enrichedDevices];

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      console.log(`🎯 Complete optimized fetch finished:`);
      console.log(`   📊 Total items: ${allItems.length}`);
      console.log(`   🚗 Vehicles: ${enrichedVehicles.length}`);
      console.log(`   📡 Devices: ${enrichedDevices.length}`);
      console.log(`   🏢 Companies: ${companies.length}`);
      console.log(`   ⏱️ Total time: ${totalTime.toFixed(2)}ms`);

      return {
        companies: companies,
        vehicles: allItems
      };

    } catch (error) {
      console.error('Optimized complete fetch error:', error);
      throw error;
    }
  });
};

// ============= FONCTIONS EXISTANTES OPTIMISÉES =============

export const dissociateVehicleFromDevice = async (immat) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Dissociating vehicle ${immat}...`);
      
      const response = await client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: {
            immat: immat,
            vehicleDeviceImei: null
          }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider le cache après modification
      vehicleCache.clear();
      console.log(`✅ Vehicle ${immat} dissociated successfully`);
      
      return response.data.updateVehicle;
    } catch (error) {
      console.error('Vehicle dissociation error:', error);
      throw error;
    }
  });
};

export const deleteVehicleData = async (vehicle) => {
  return await withCredentialRetry(async () => {
    try {
      const immat = vehicle.immatriculation || vehicle.immat;
      console.log(`🗑️ Deleting vehicle ${immat}...`);
      
      const response = await client.graphql({
        query: mutations.deleteVehicle,
        variables: {
          input: {
            immat: immat
          }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider le cache après modification
      vehicleCache.clear();
      console.log(`✅ Vehicle ${immat} deleted successfully`);
      
      return response.data.deleteVehicle;
    } catch (error) {
      console.error('Vehicle deletion error:', error);
      throw error;
    }
  });
};

export const createVehicle = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🚗 Creating new vehicle...');
      
      const cleanedData = cleanDataForGraphQL(vehicleData);
      
      const response = await client.graphql({
        query: mutations.createVehicle,
        variables: {
          input: cleanedData
        }
      });
      
      // 🚀 OPTIMISATION: Invalider le cache après création
      vehicleCache.clear();
      console.log('✅ Vehicle created successfully');
      
      return response.data.createVehicle;
    } catch (error) {
      console.error('Vehicle creation error:', error);
      throw error;
    }
  });
};

export const updateVehicle = async (vehicleData) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔄 Updating vehicle ${vehicleData.immat}...`);
      
      const cleanedData = cleanDataForGraphQL(vehicleData);
      
      const response = await client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: cleanedData
        }
      });
      
      // 🚀 OPTIMISATION: Invalider le cache après mise à jour
      vehicleCache.clear();
      console.log(`✅ Vehicle ${vehicleData.immat} updated successfully`);
      
      return response.data.updateVehicle;
    } catch (error) {
      console.error('Vehicle update error:', error);
      throw error;
    }
  });
};

export const getVehicle = async (immat) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Fetching vehicle ${immat}...`);
      
      const response = await client.graphql({
        query: queries.getVehicle,
        variables: { immat }
      });
      
      return response.data.getVehicle;
    } catch (error) {
      console.error(`Error fetching vehicle ${immat}:`, error);
      throw error;
    }
  });
};

export const associateVehicleToDevice = async (immat, deviceImei) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Associating vehicle ${immat} to device ${deviceImei}...`);
      
      const response = await client.graphql({
        query: mutations.updateVehicle,
        variables: {
          input: {
            immat: immat,
            vehicleDeviceImei: deviceImei
          }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider le cache après modification
      vehicleCache.clear();
      console.log(`✅ Vehicle ${immat} associated to device ${deviceImei}`);
      
      return response.data.updateVehicle;
    } catch (error) {
      console.error('Vehicle association error:', error);
      throw error;
    }
  });
};

// ============= FONCTIONS DE RECHERCHE OPTIMISÉES =============

export const searchVehiclesByCompany = async (companyId) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Searching vehicles for company ${companyId}...`);
      
      // Essayer d'utiliser le cache d'abord
      const cached = vehicleCache.get();
      if (cached) {
        console.log('📦 Using cached vehicles for company search');
        const filteredVehicles = cached.filter(vehicle => 
          vehicle.companyVehiclesId === companyId
        );
        console.log(`✅ Found ${filteredVehicles.length} vehicles in cache for company ${companyId}`);
        return filteredVehicles;
      }
      
      // Sinon, requête directe
      const response = await client.graphql({
        query: `
          query ListVehiclesMinimal($filter: ModelVehicleFilterInput, $limit: Int) {
            listVehicles(filter: $filter, limit: $limit) {
              items {
                immat
                companyVehiclesId
                vehicleDeviceImei
              }
            }
          }
        `,
        variables: {
          filter: {
            companyVehiclesId: { eq: companyId }
          },
          limit: 1000
        }
      });
      
      const vehicles = response.data.listVehicles.items || [];
      console.log(`✅ Found ${vehicles.length} vehicles for company ${companyId}`);
      
      return vehicles;
    } catch (error) {
      console.error(`Error searching vehicles for company ${companyId}:`, error);
      throw error;
    }
  });
};

export const searchVehiclesByImmat = async (immatPattern) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Searching vehicles by immat pattern: ${immatPattern}...`);
      
      // Essayer d'utiliser le cache d'abord
      const cached = vehicleCache.get();
      if (cached) {
        console.log('📦 Using cached vehicles for immat search');
        const filteredVehicles = cached.filter(vehicle => 
          vehicle.immat && vehicle.immat.toLowerCase().includes(immatPattern.toLowerCase())
        );
        console.log(`✅ Found ${filteredVehicles.length} vehicles matching "${immatPattern}" in cache`);
        return filteredVehicles;
      }
      
      // Sinon, requête directe
      const response = await client.graphql({
        query: `
          query ListVehiclesMinimal($filter: ModelVehicleFilterInput, $limit: Int) {
            listVehicles(filter: $filter, limit: $limit) {
              items {
                immat
                companyVehiclesId
                vehicleDeviceImei
              }
            }
          }
        `,
        variables: {
          filter: {
            immat: { contains: immatPattern }
          },
          limit: 1000
        }
      });
      
      const vehicles = response.data.listVehicles.items || [];
      console.log(`✅ Found ${vehicles.length} vehicles matching "${immatPattern}"`);
      
      return vehicles;
    } catch (error) {
      console.error(`Error searching vehicles by immat "${immatPattern}":`, error);
      throw error;
    }
  });
};

// ============= UTILITAIRES DE CACHE =============

export const clearVehicleCache = () => {
  vehicleCache.clear();
};

export const getVehicleCacheStats = () => {
  return {
    cached: !!vehicleCache.data,
    itemCount: vehicleCache.data ? vehicleCache.data.length : 0,
    age: vehicleCache.getAge(),
    maxAge: vehicleCache.maxAge
  };
};

export const warmUpVehicleCache = async () => {
  console.log('🔥 Warming up vehicle cache...');
  try {
    await fetchAllVehiclesOptimized();
    console.log('✅ Vehicle cache warmed up successfully');
  } catch (error) {
    console.error('❌ Failed to warm up vehicle cache:', error);
  }
};

// ============= FONCTION DE TEST =============

export const testVehicleOptimizations = async () => {
  console.log('🧪 Testing vehicle service optimizations...');
  const startTime = performance.now();
  
  try {
    // Test 1: Premier chargement
    console.log('1. Testing first load...');
    vehicleCache.clear();
    const firstLoad = await fetchAllVehiclesOptimized();
    const firstLoadTime = performance.now() - startTime;
    
    // Test 2: Chargement depuis cache
    console.log('2. Testing cache load...');
    const cacheStartTime = performance.now();
    const secondLoad = await fetchAllVehiclesOptimized();
    const cacheLoadTime = performance.now() - cacheStartTime;
    
    // Test 3: Stats
    const stats = getVehicleCacheStats();
    
    const endTime = performance.now();
    
    console.log('✅ Vehicle optimization tests completed');
    console.table({
      'First Load Time': `${firstLoadTime.toFixed(2)}ms`,
      'Cache Load Time': `${cacheLoadTime.toFixed(2)}ms`,
      'Speed Improvement': `${((firstLoadTime - cacheLoadTime) / firstLoadTime * 100).toFixed(1)}%`,
      'Vehicles Count': firstLoad.length,
      'Cache Hit': secondLoad === firstLoad ? 'Yes' : 'No'
    });
    
    return {
      success: true,
      vehiclesCount: firstLoad.length,
      firstLoadTime,
      cacheLoadTime,
      speedImprovement: ((firstLoadTime - cacheLoadTime) / firstLoadTime * 100),
      cacheStats: stats
    };
    
  } catch (error) {
    console.error('❌ Vehicle optimization tests failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Log de chargement
console.log('🚀 VehicleService optimized loaded successfully!');
console.log('📋 Available optimizations:');
console.log('   • Intelligent caching (5min)');
console.log('   • Retry with exponential backoff');
console.log('   • Graceful fallbacks');
console.log('   • Adaptive pagination pauses');
console.log('   • Partial data handling');
console.log('🔧 Cache utilities: clearVehicleCache(), getVehicleCacheStats(), warmUpVehicleCache()');
console.log('🧪 Test with: testVehicleOptimizations()');

export default {
  fetchAllVehiclesOptimized,
  fetchCompaniesWithVehicles,
  dissociateVehicleFromDevice,
  deleteVehicleData,
  createVehicle,
  updateVehicle,
  getVehicle,
  associateVehicleToDevice,
  searchVehiclesByCompany,
  searchVehiclesByImmat,
  clearVehicleCache,
  getVehicleCacheStats,
  warmUpVehicleCache,
  testVehicleOptimizations
};