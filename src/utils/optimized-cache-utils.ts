/**
 * Optimized cache utilities with compression and better performance
 */
import LZString from 'lz-string';

const CACHE_PREFIX = 'fleetwatch_opt_';
const MAX_CACHE_SIZE_MB = 10; // Increased limit
const COMPRESSION_THRESHOLD = 50000; // Compress if data > 50KB

export interface OptimizedCacheEntry {
  data: any;
  timestamp: number;
  compressed: boolean;
  size: number;
  checksum?: string;
}

/**
 * Calculate simple checksum for data integrity
 */
const calculateChecksum = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Compress data using LZ-string if above threshold
 */
const compressData = (data: any): { compressed: boolean; data: string } => {
  const jsonString = JSON.stringify(data);
  
  if (jsonString.length > COMPRESSION_THRESHOLD) {
    const compressed = LZString.compress(jsonString);
    console.log(`Compressed data: ${jsonString.length} -> ${compressed.length} bytes (${((1 - compressed.length / jsonString.length) * 100).toFixed(1)}% reduction)`);
    return { compressed: true, data: compressed };
  }
  
  return { compressed: false, data: jsonString };
};

/**
 * Decompress data if needed
 */
const decompressData = (entry: OptimizedCacheEntry): any => {
  if (entry.compressed) {
    const decompressed = LZString.decompress(entry.data as string);
    return JSON.parse(decompressed);
  }
  
  return typeof entry.data === 'string' ? JSON.parse(entry.data) : entry.data;
};

/**
 * Enhanced cache set with compression and validation
 */
export const setOptimizedCache = (key: string, data: any, maxAgeMs: number = 1800000): boolean => {
  try {
    const { compressed, data: processedData } = compressData(data);
    
    const cacheEntry: OptimizedCacheEntry = {
      data: processedData,
      timestamp: Date.now(),
      compressed,
      size: processedData.length,
      checksum: calculateChecksum(processedData)
    };
    
    const cacheString = JSON.stringify(cacheEntry);
    const sizeMB = cacheString.length / 1024 / 1024;
    
    if (sizeMB > MAX_CACHE_SIZE_MB) {
      console.warn(`⚠️ Cache "${key}" too large (${sizeMB.toFixed(2)}MB), attempting cleanup`);
      clearExpiredCaches();
      
      // Try again after cleanup
      const retrySize = cacheString.length / 1024 / 1024;
      if (retrySize > MAX_CACHE_SIZE_MB) {
        console.warn(`Cache "${key}" still too large after cleanup, skipping`);
        return false;
      }
    }
    
    localStorage.setItem(CACHE_PREFIX + key, cacheString);
    console.log(`✅ Optimized cache "${key}" saved (${sizeMB.toFixed(2)}MB, compressed: ${compressed})`);
    return true;
    
  } catch (error) {
    console.warn(`Error saving optimized cache "${key}":`, error);
    
    if (error.name === 'QuotaExceededError') {
      clearExpiredCaches();
      // Try one more time with a smaller dataset
      try {
        localStorage.setItem(CACHE_PREFIX + key + '_fallback', JSON.stringify({
          timestamp: Date.now(),
          size: 'limited'
        }));
      } catch {}
    }
    
    return false;
  }
};

/**
 * Enhanced cache get with decompression and validation
 */
export const getOptimizedCache = (key: string, maxAgeMs: number = 1800000): any => {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;
    
    const cacheEntry: OptimizedCacheEntry = JSON.parse(cached);
    const age = Date.now() - cacheEntry.timestamp;
    
    if (age > maxAgeMs) {
      console.log(`Optimized cache "${key}" expired (age: ${Math.round(age / 60000)}min), removing`);
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    
    // Validate checksum if available
    if (cacheEntry.checksum) {
      const currentChecksum = calculateChecksum(cacheEntry.data as string);
      if (currentChecksum !== cacheEntry.checksum) {
        console.warn(`Cache "${key}" checksum mismatch, removing corrupted data`);
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
    }
    
    const data = decompressData(cacheEntry);
    console.log(`Using optimized cache "${key}" (age: ${Math.round(age / 60000)}min, compressed: ${cacheEntry.compressed})`);
    return data;
    
  } catch (error) {
    console.warn(`Error reading optimized cache "${key}":`, error);
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }
};

/**
 * Clear only expired caches, keep valid ones
 */
export const clearExpiredCaches = (): void => {
  try {
    const keysToRemove: string[] = [];
    const now = Date.now();
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const entry = JSON.parse(cached);
            const age = now - entry.timestamp;
            
            // Remove if older than 30 minutes
            if (age > 1800000) {
              keysToRemove.push(key);
            }
          }
        } catch {
          // Remove corrupted entries
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared ${keysToRemove.length} expired/corrupted cache entries`);
    
  } catch (error) {
    console.warn('Error clearing expired caches:', error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = (): { totalSize: number; entryCount: number; compressedCount: number } => {
  let totalSize = 0;
  let entryCount = 0;
  let compressedCount = 0;
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += value.length;
          entryCount++;
          
          try {
            const entry = JSON.parse(value);
            if (entry.compressed) compressedCount++;
          } catch {}
        }
      }
    }
  } catch (error) {
    console.warn('Error calculating cache stats:', error);
  }
  
  return {
    totalSize: totalSize / 1024 / 1024, // MB
    entryCount,
    compressedCount
  };
};