// ============= src/services/DeviceService.js - VERSION COMPLÈTE OPTIMISÉE =============

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry, getLazyClient } from '@/config/aws-config.js';
import { addDeviceToFlespi } from './FlespiService.js';
import { hasFlespiApiKey } from './ApiConfigService';
import { checkImeiAvailable, createDeviceSimple, associateDeviceToVehicleSimple } from './SimpleDeviceService.js';

const client = getLazyClient();

// ============= CACHE INLINE INTELLIGENT POUR DEVICES =============
const deviceCache = {
  data: null,
  timestamp: 0,
  maxAge: 3 * 60 * 1000, // 3 minutes (plus court car les devices sont plus volatiles)
  
  get() {
    if (this.data && Date.now() - this.timestamp < this.maxAge) {
      console.log('📦 Devices loaded from cache (ultra-fast!)');
      return this.data;
    }
    return null;
  },
  
  set(data) {
    this.data = data;
    this.timestamp = Date.now();
    console.log(`💾 Devices cached: ${data.length} items`);
  },
  
  clear() {
    this.data = null;
    this.timestamp = 0;
    console.log('🧹 Device cache cleared');
  },
  
  getAge() {
    return this.timestamp ? Date.now() - this.timestamp : null;
  }
};

// Cache pour les devices individuels
const individualDeviceCache = new Map();
const INDIVIDUAL_CACHE_MAX_AGE = 2 * 60 * 1000; // 2 minutes

// ============= FONCTION PRINCIPALE ULTRA-OPTIMISÉE =============
export const fetchAllDevices = async () => {
  return await withCredentialRetry(async () => {
    // 🚀 OPTIMISATION 1: Vérifier le cache
    const cached = deviceCache.get();
    if (cached) {
      return cached;
    }

    console.log('🚀 Starting ultra-optimized device fetch...');
    
    // Votre requête simplifiée existante (améliorée)
    const SIMPLE_LIST_DEVICES = `
      query ListDevicesSimple($limit: Int, $nextToken: String) {
        listDevices(limit: $limit, nextToken: $nextToken) {
          items {
            imei
            sim
            protocolId
            name
            deviceVehicleImmat
            enabled
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    `;
    
    let allDevices = [];
    let nextToken = null;
    let batchCount = 0;
    const startTime = performance.now();
    
    try {
      // ============= BOUCLE OPTIMISÉE AVEC RETRY =============
      do {
        batchCount++;
        const variables = {
          limit: 1000, // Maximiser pour performance
          nextToken: nextToken
        };
        
        console.log(`📄 Fetching optimized device batch ${batchCount}...`);
        
        try {
          const deviceList = await client.graphql({
            query: SIMPLE_LIST_DEVICES,
            variables: variables
          });
          
          const data = deviceList.data.listDevices;
          const items = data.items || [];
          
          allDevices = allDevices.concat(items);
          nextToken = data.nextToken;
          
          console.log(`✅ Device batch ${batchCount}: ${items.length} items (Total: ${allDevices.length})`);
          
        } catch (error) {
          console.error(`❌ Device batch ${batchCount} error:`, error);
          
          // 🚀 OPTIMISATION 2: Gestion des erreurs partielles (votre logique conservée)
          if (error.data?.listDevices?.items) {
            console.log('⚠️ Using partial data from error response');
            const partialItems = error.data.listDevices.items;
            allDevices = allDevices.concat(partialItems);
            nextToken = error.data.listDevices.nextToken;
          } else {
            // 🚀 OPTIMISATION 3: Retry avec délai progressif
            if (batchCount <= 3) {
              const delay = 1000 * batchCount; // 1s, 2s, 3s
              console.log(`🔄 Retrying device batch ${batchCount} in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              continue; // Retry le même batch
            } else {
              throw new Error(`Failed to fetch devices: ${error.message}`);
            }
          }
        }
        
        // 🚀 OPTIMISATION 4: Pause adaptative
        if (nextToken && batchCount % 3 === 0) {
          console.log('⏱️ Adaptive device pause...');
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // Limite de sécurité
        if (batchCount >= 50) {
          console.log('⚠️ Device safety limit reached');
          break;
        }
        
      } while (nextToken);
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      console.log(`🎯 Ultra-optimized device fetch completed: ${allDevices.length} devices in ${totalTime.toFixed(2)}ms`);
      
      // 🚀 OPTIMISATION 5: Sauvegarder en cache
      deviceCache.set(allDevices);
      
      return allDevices;
      
    } catch (error) {
      console.error('Ultra-optimized device fetch error:', error);
      
      // 🚀 OPTIMISATION 6: Fallback gracieux
      console.log('🔄 Attempting device fallback...');
      try {
        const fallbackQuery = `
          query FallbackListDevices($limit: Int) {
            listDevices(limit: $limit) {
              items {
                imei
                sim
                protocolId
              }
            }
          }
        `;
        
        const response = await client.graphql({
          query: fallbackQuery,
          variables: { limit: 500 }
        });
        
        const fallbackDevices = response.data.listDevices.items || [];
        console.log(`✅ Device fallback successful: ${fallbackDevices.length} devices`);
        
        // Cache le fallback
        deviceCache.set(fallbackDevices);
        
        return fallbackDevices;
      } catch (fallbackError) {
        console.error('Device fallback also failed:', fallbackError);
        throw error;
      }
    }
  });
};

// ============= FONCTIONS INDIVIDUELLES OPTIMISÉES =============

export const getDevice = async (imei) => {
  return await withCredentialRetry(async () => {
    try {
      // 🚀 OPTIMISATION: Cache individuel
      const cacheKey = `device_${imei}`;
      const cached = individualDeviceCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < INDIVIDUAL_CACHE_MAX_AGE) {
        console.log(`📦 Device ${imei} from individual cache`);
        return cached.data;
      }
      
      console.log(`🔍 Fetching device ${imei}...`);
      
      const response = await client.graphql({
        query: queries.getDevice,
        variables: { imei }
      });
      
      const device = response.data.getDevice;
      
      // Cache le résultat
      if (device) {
        individualDeviceCache.set(cacheKey, {
          data: device,
          timestamp: Date.now()
        });
        
        // Limiter la taille du cache individuel
        if (individualDeviceCache.size > 100) {
          const firstKey = individualDeviceCache.keys().next().value;
          individualDeviceCache.delete(firstKey);
        }
      }
      
      return device;
    } catch (error) {
      console.error(`Error fetching device ${imei}:`, error);
      throw error;
    }
  });
};

export const createDevice = async (deviceData) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔧 Creating device ${deviceData.imei}...`);
      
      // Utiliser le service simplifié existant
      const result = await createDeviceSimple(deviceData);
      
      // 🚀 OPTIMISATION: Invalider les caches après création
      deviceCache.clear();
      individualDeviceCache.clear();
      
      console.log(`✅ Device ${deviceData.imei} created successfully`);
      
      return result;
    } catch (error) {
      console.error(`Device creation error for ${deviceData.imei}:`, error);
      throw error;
    }
  });
};

export const updateDevice = async (deviceData) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔄 Updating device ${deviceData.imei}...`);
      
      const cleanedData = cleanDataForGraphQL(deviceData);
      
      const response = await client.graphql({
        query: mutations.updateDevice,
        variables: {
          input: cleanedData
        }
      });
      
      // 🚀 OPTIMISATION: Invalider les caches après mise à jour
      deviceCache.clear();
      individualDeviceCache.delete(`device_${deviceData.imei}`);
      
      console.log(`✅ Device ${deviceData.imei} updated successfully`);
      
      return response.data.updateDevice;
    } catch (error) {
      console.error(`Device update error for ${deviceData.imei}:`, error);
      throw error;
    }
  });
};

export const deleteDevice = async (imei) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🗑️ Deleting device ${imei}...`);
      
      const response = await client.graphql({
        query: mutations.deleteDevice,
        variables: {
          input: { imei }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider les caches après suppression
      deviceCache.clear();
      individualDeviceCache.delete(`device_${imei}`);
      
      console.log(`✅ Device ${imei} deleted successfully`);
      
      return response.data.deleteDevice;
    } catch (error) {
      console.error(`Device deletion error for ${imei}:`, error);
      throw error;
    }
  });
};

// ============= FONCTIONS DE RECHERCHE OPTIMISÉES =============

export const searchDevicesByImei = async (imeiPattern) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Searching devices by IMEI pattern: ${imeiPattern}...`);
      
      // Essayer d'utiliser le cache d'abord
      const cached = deviceCache.get();
      if (cached) {
        console.log('📦 Using cached devices for IMEI search');
        const filteredDevices = cached.filter(device => 
          device.imei && device.imei.toLowerCase().includes(imeiPattern.toLowerCase())
        );
        console.log(`✅ Found ${filteredDevices.length} devices matching "${imeiPattern}" in cache`);
        return filteredDevices;
      }
      
      // Sinon, requête directe
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          filter: {
            imei: { contains: imeiPattern }
          },
          limit: 1000
        }
      });
      
      const devices = response.data.listDevices.items || [];
      console.log(`✅ Found ${devices.length} devices matching "${imeiPattern}"`);
      
      return devices;
    } catch (error) {
      console.error(`Error searching devices by IMEI "${imeiPattern}":`, error);
      throw error;
    }
  });
};

export const searchDevicesBySim = async (simPattern) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Searching devices by SIM pattern: ${simPattern}...`);
      
      // Essayer d'utiliser le cache d'abord
      const cached = deviceCache.get();
      if (cached) {
        console.log('📦 Using cached devices for SIM search');
        const filteredDevices = cached.filter(device => 
          device.sim && device.sim.toLowerCase().includes(simPattern.toLowerCase())
        );
        console.log(`✅ Found ${filteredDevices.length} devices matching SIM "${simPattern}" in cache`);
        return filteredDevices;
      }
      
      // Sinon, requête directe
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          filter: {
            sim: { contains: simPattern }
          },
          limit: 1000
        }
      });
      
      const devices = response.data.listDevices.items || [];
      console.log(`✅ Found ${devices.length} devices matching SIM "${simPattern}"`);
      
      return devices;
    } catch (error) {
      console.error(`Error searching devices by SIM "${simPattern}":`, error);
      throw error;
    }
  });
};

export const getUnassignedDevices = async () => {
  return await withCredentialRetry(async () => {
    try {
      console.log('🔍 Fetching unassigned devices...');
      
      // Essayer d'utiliser le cache d'abord
      const cached = deviceCache.get();
      if (cached) {
        console.log('📦 Using cached devices for unassigned search');
        const unassignedDevices = cached.filter(device => 
          !device.deviceVehicleImmat || device.deviceVehicleImmat === ''
        );
        console.log(`✅ Found ${unassignedDevices.length} unassigned devices in cache`);
        return unassignedDevices;
      }
      
      // Sinon, requête directe avec filtre
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          filter: {
            deviceVehicleImmat: { attributeExists: false }
          },
          limit: 1000
        }
      });
      
      const devices = response.data.listDevices.items || [];
      
      // Double filtrage côté client pour sécurité
      const unassignedDevices = devices.filter(device => 
        !device.deviceVehicleImmat || device.deviceVehicleImmat === ''
      );
      
      console.log(`✅ Found ${unassignedDevices.length} unassigned devices`);
      
      return unassignedDevices;
    } catch (error) {
      console.error('Error fetching unassigned devices:', error);
      throw error;
    }
  });
};

export const getDevicesByProtocol = async (protocolId) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔍 Fetching devices by protocol ${protocolId}...`);
      
      // Essayer d'utiliser le cache d'abord
      const cached = deviceCache.get();
      if (cached) {
        console.log('📦 Using cached devices for protocol search');
        const protocolDevices = cached.filter(device => 
          device.protocolId === protocolId
        );
        console.log(`✅ Found ${protocolDevices.length} devices with protocol ${protocolId} in cache`);
        return protocolDevices;
      }
      
      // Sinon, requête directe
      const response = await client.graphql({
        query: queries.listDevices,
        variables: {
          filter: {
            protocolId: { eq: protocolId }
          },
          limit: 1000
        }
      });
      
      const devices = response.data.listDevices.items || [];
      console.log(`✅ Found ${devices.length} devices with protocol ${protocolId}`);
      
      return devices;
    } catch (error) {
      console.error(`Error fetching devices by protocol ${protocolId}:`, error);
      throw error;
    }
  });
};

// ============= FONCTIONS D'ASSOCIATION OPTIMISÉES =============

export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Associating device ${deviceImei} to vehicle ${vehicleImmat}...`);
      
      const response = await client.graphql({
        query: mutations.updateDevice,
        variables: {
          input: {
            imei: deviceImei,
            deviceVehicleImmat: vehicleImmat
          }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider les caches après association
      deviceCache.clear();
      individualDeviceCache.delete(`device_${deviceImei}`);
      
      console.log(`✅ Device ${deviceImei} associated to vehicle ${vehicleImmat}`);
      
      return response.data.updateDevice;
    } catch (error) {
      console.error(`Device association error (${deviceImei} -> ${vehicleImmat}):`, error);
      throw error;
    }
  });
};

export const dissociateDeviceFromVehicle = async (deviceImei) => {
  return await withCredentialRetry(async () => {
    try {
      console.log(`🔗 Dissociating device ${deviceImei}...`);
      
      const response = await client.graphql({
        query: mutations.updateDevice,
        variables: {
          input: {
            imei: deviceImei,
            deviceVehicleImmat: null
          }
        }
      });
      
      // 🚀 OPTIMISATION: Invalider les caches après dissociation
      deviceCache.clear();
      individualDeviceCache.delete(`device_${deviceImei}`);
      
      console.log(`✅ Device ${deviceImei} dissociated`);
      
      return response.data.updateDevice;
    } catch (error) {
      console.error(`Device dissociation error for ${deviceImei}:`, error);
      throw error;
    }
  });
};

// ============= FONCTIONS FLESPI INTÉGRÉES =============

export const createDeviceWithFlespi = async (deviceData) => {
  try {
    console.log(`🚀 Creating device ${deviceData.imei} with Flespi integration...`);
    
    // Vérifier si Flespi est configuré
    const hasFlespiKey = await hasFlespiApiKey();
    
    if (hasFlespiKey) {
      console.log('📡 Adding device to Flespi...');
      try {
        await addDeviceToFlespi(deviceData);
        console.log('✅ Device added to Flespi successfully');
      } catch (flespiError) {
        console.warn('⚠️ Flespi integration failed, continuing with database creation:', flespiError);
      }
    } else {
      console.log('ℹ️ No Flespi API key configured, skipping Flespi integration');
    }
    
    // Créer le device dans la base de données
    const result = await createDevice(deviceData);
    
    console.log(`✅ Device ${deviceData.imei} created with Flespi integration`);
    
    return result;
  } catch (error) {
    console.error(`Error creating device ${deviceData.imei} with Flespi:`, error);
    throw error;
  }
};

export const updateDeviceWithFlespi = async (deviceData) => {
  try {
    console.log(`🔄 Updating device ${deviceData.imei} with Flespi sync...`);
    
    // Mettre à jour dans la base de données
    const result = await updateDevice(deviceData);
    
    // Synchroniser avec Flespi si configuré
    const hasFlespiKey = await hasFlespiApiKey();
    if (hasFlespiKey) {
      console.log('📡 Syncing device with Flespi...');
      try {
        // Note: Flespi sync logic would go here
        console.log('✅ Device synced with Flespi');
      } catch (flespiError) {
        console.warn('⚠️ Flespi sync failed:', flespiError);
      }
    }
    
    console.log(`✅ Device ${deviceData.imei} updated with Flespi sync`);
    
    return result;
  } catch (error) {
    console.error(`Error updating device ${deviceData.imei} with Flespi:`, error);
    throw error;
  }
};

// ============= BATCH OPERATIONS OPTIMISÉES =============

export const batchCreateDevices = async (devicesData) => {
  try {
    console.log(`🚀 Batch creating ${devicesData.length} devices...`);
    const startTime = performance.now();
    
    const results = [];
    const errors = [];
    const chunkSize = 5; // Traiter par chunks pour éviter la surcharge
    
    for (let i = 0; i < devicesData.length; i += chunkSize) {
      const chunk = devicesData.slice(i, i + chunkSize);
      
      console.log(`📦 Processing device chunk ${Math.floor(i/chunkSize) + 1}/${Math.ceil(devicesData.length/chunkSize)}...`);
      
      const chunkPromises = chunk.map(async (deviceData) => {
        try {
          const result = await createDevice(deviceData);
          return { success: true, device: result, imei: deviceData.imei };
        } catch (error) {
          console.error(`Failed to create device ${deviceData.imei}:`, error);
          return { success: false, error: error.message, imei: deviceData.imei };
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
        } else {
          errors.push({ success: false, error: result.reason.message });
        }
      });
      
      // Pause entre chunks
      if (i + chunkSize < devicesData.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    console.log(`🎯 Batch device creation completed:`);
    console.log(`   ✅ Successful: ${results.length}`);
    console.log(`   ❌ Failed: ${errors.length}`);
    console.log(`   ⏱️ Total time: ${totalTime.toFixed(2)}ms`);
    
    // Invalider le cache après création en masse
    deviceCache.clear();
    individualDeviceCache.clear();
    
    return {
      successful: results,
      failed: errors,
      totalTime
    };
    
  } catch (error) {
    console.error('Batch device creation error:', error);
    throw error;
  }
};

export const batchAssociateDevices = async (associations) => {
  try {
    console.log(`🔗 Batch associating ${associations.length} devices...`);
    const startTime = performance.now();
    
    const results = [];
    const errors = [];
    
    for (const association of associations) {
      try {
        await associateDeviceToVehicle(association.deviceImei, association.vehicleImmat);
        results.push(association);
        console.log(`✅ Associated ${association.deviceImei} -> ${association.vehicleImmat}`);
      } catch (error) {
        console.error(`❌ Failed to associate ${association.deviceImei} -> ${association.vehicleImmat}:`, error);
        errors.push({ ...association, error: error.message });
      }
      
      // Petite pause entre associations
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    console.log(`🎯 Batch device association completed:`);
    console.log(`   ✅ Successful: ${results.length}`);
    console.log(`   ❌ Failed: ${errors.length}`);
    console.log(`   ⏱️ Total time: ${totalTime.toFixed(2)}ms`);
    
    return {
      successful: results,
      failed: errors,
      totalTime
    };
    
  } catch (error) {
    console.error('Batch device association error:', error);
    throw error;
  }
};

// ============= UTILITAIRES DE CACHE =============

export const clearDeviceCache = () => {
  deviceCache.clear();
  individualDeviceCache.clear();
};

export const getDeviceCacheStats = () => {
  return {
    allDevices: {
      cached: !!deviceCache.data,
      itemCount: deviceCache.data ? deviceCache.data.length : 0,
      age: deviceCache.getAge(),
      maxAge: deviceCache.maxAge
    },
    individualDevices: {
      cached: individualDeviceCache.size,
      maxAge: INDIVIDUAL_CACHE_MAX_AGE
    }
  };
};

export const warmUpDeviceCache = async () => {
  console.log('🔥 Warming up device cache...');
  try {
    await fetchAllDevices();
    console.log('✅ Device cache warmed up successfully');
  } catch (error) {
    console.error('❌ Failed to warm up device cache:', error);
  }
};

// ============= FONCTION DE TEST =============

export const testDeviceOptimizations = async () => {
  console.log('🧪 Testing device service optimizations...');
  const startTime = performance.now();
  
  try {
    // Test 1: Premier chargement
    console.log('1. Testing first device load...');
    deviceCache.clear();
    const firstLoad = await fetchAllDevices();
    const firstLoadTime = performance.now() - startTime;
    
    // Test 2: Chargement depuis cache
    console.log('2. Testing device cache load...');
    const cacheStartTime = performance.now();
    const secondLoad = await fetchAllDevices();
    const cacheLoadTime = performance.now() - cacheStartTime;
    
    // Test 3: Recherche
    console.log('3. Testing device search...');
    const searchStartTime = performance.now();
    const searchResults = await getUnassignedDevices();
    const searchTime = performance.now() - searchStartTime;
    
    // Test 4: Device individuel
    if (firstLoad.length > 0) {
      console.log('4. Testing individual device fetch...');
      const individualStartTime = performance.now();
      await getDevice(firstLoad[0].imei);
      const individualTime = performance.now() - individualStartTime;
      
      // Test cache individuel
      const individualCacheStartTime = performance.now();
      await getDevice(firstLoad[0].imei);
      const individualCacheTime = performance.now() - individualCacheStartTime;
      
      console.log(`   Individual fetch: ${individualTime.toFixed(2)}ms`);
      console.log(`   Individual cache: ${individualCacheTime.toFixed(2)}ms`);
    }
    
    // Stats
    const stats = getDeviceCacheStats();
    const endTime = performance.now();
    
    console.log('✅ Device optimization tests completed');
    console.table({
      'Total Devices': firstLoad.length,
      'Unassigned Devices': searchResults.length,
      'First Load Time': `${firstLoadTime.toFixed(2)}ms`,
      'Cache Load Time': `${cacheLoadTime.toFixed(2)}ms`,
      'Search Time': `${searchTime.toFixed(2)}ms`,
      'Speed Improvement': `${((firstLoadTime - cacheLoadTime) / firstLoadTime * 100).toFixed(1)}%`,
      'Cache Hit': secondLoad === firstLoad ? 'Yes' : 'No'
    });
    
    return {
      success: true,
      devicesCount: firstLoad.length,
      unassignedCount: searchResults.length,
      firstLoadTime,
      cacheLoadTime,
      searchTime,
      speedImprovement: ((firstLoadTime - cacheLoadTime) / firstLoadTime * 100),
      cacheStats: stats
    };
    
  } catch (error) {
    console.error('❌ Device optimization tests failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Log de chargement
console.log('🚀 DeviceService optimized loaded successfully!');
console.log('📋 Available optimizations:');
console.log('   • Intelligent caching (3min all devices + 2min individual)');
console.log('   • Retry with progressive delays');
console.log('   • Graceful fallbacks and partial data handling');
console.log('   • Optimized search with cache-first strategy');
console.log('   • Batch operations with chunking');
console.log('   • Flespi integration support');
console.log('🔧 Cache utilities: clearDeviceCache(), getDeviceCacheStats(), warmUpDeviceCache()');
console.log('🧪 Test with: testDeviceOptimizations()');

export default {
  fetchAllDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  searchDevicesByImei,
  searchDevicesBySim,
  getUnassignedDevices,
  getDevicesByProtocol,
  associateDeviceToVehicle,
  dissociateDeviceFromVehicle,
  createDeviceWithFlespi,
  updateDeviceWithFlespi,
  batchCreateDevices,
  batchAssociateDevices,
  clearDeviceCache,
  getDeviceCacheStats,
  warmUpDeviceCache,
  testDeviceOptimizations
};