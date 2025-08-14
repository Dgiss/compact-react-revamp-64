/**
 * Performance utilities for optimizing batch operations and search
 */

export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  itemsProcessed?: number;
  itemsPerSecond?: number;
}

/**
 * Performance timer utility
 */
export class PerformanceTimer {
  private metrics: PerformanceMetrics;

  constructor() {
    this.metrics = {
      startTime: performance.now()
    };
  }

  stop(itemsProcessed = 0): PerformanceMetrics {
    this.metrics.endTime = performance.now();
    this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
    this.metrics.itemsProcessed = itemsProcessed;
    this.metrics.itemsPerSecond = itemsProcessed > 0 ? (itemsProcessed / this.metrics.duration) * 1000 : 0;
    
    return this.metrics;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

/**
 * Batch processor for large datasets
 */
export const processBatch = async <T, R>(
  items: T[],
  processor: (batch: T[]) => Promise<R[]> | R[],
  batchSize = 1000
): Promise<R[]> => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await processor(batch);
    results.push(...batchResults);
  }
  
  return results;
};

/**
 * Parallel promise execution with concurrency limit
 */
export const executeInParallel = async <T>(
  promises: (() => Promise<T>)[],
  concurrency = 5
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < promises.length; i += concurrency) {
    const batch = promises.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(p => p()));
    results.push(...batchResults);
  }
  
  return results;
};

/**
 * Debounced function executor
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Create search index for fast lookups
 */
export const createSearchIndex = <T>(
  items: T[],
  getKeys: (item: T) => string[]
): Map<string, T[]> => {
  const index = new Map<string, T[]>();
  
  items.forEach(item => {
    const keys = getKeys(item);
    keys.forEach(key => {
      const normalizedKey = key.toLowerCase().trim();
      if (!index.has(normalizedKey)) {
        index.set(normalizedKey, []);
      }
      index.get(normalizedKey)!.push(item);
    });
  });
  
  return index;
};