// ============================================
// Content Service
// Main service for accessing content across the application
// ============================================

import type { CMSAdapter, CMSConfig } from '../adapters';
import { LocalCMSAdapter, ContentCache } from '../adapters';
import type { WorldId, WorldContent } from '../types';

// ============================================
// Content Service Configuration
// ============================================

interface ContentServiceConfig {
  adapter?: CMSAdapter;
  cmsConfig?: CMSConfig;
  cacheEnabled?: boolean;
  cacheTTL?: number;
}

// ============================================
// Content Service Singleton
// ============================================

let adapterInstance: CMSAdapter | null = null;
let cacheInstance: ContentCache | null = null;
let isInitialized = false;

/**
 * Initialize the content service
 */
export function initializeContentService(config: ContentServiceConfig = {}): void {
  if (isInitialized) {
    console.warn('Content service already initialized');
    return;
  }

  // Create adapter if not provided
  adapterInstance = config.adapter || new LocalCMSAdapter(config.cmsConfig);

  // Create cache if enabled
  if (config.cacheEnabled !== false) {
    cacheInstance = new ContentCache(config.cacheTTL);
  }

  isInitialized = true;
}

/**
 * Get the CMS adapter
 */
export function getAdapter(): CMSAdapter {
  if (!adapterInstance) {
    initializeContentService();
  }
  return adapterInstance!;
}

/**
 * Get the cache instance
 */
export function getCache(): ContentCache | null {
  return cacheInstance;
}

// ============================================
// Content Service Methods
// ============================================

/**
 * Get world content
 */
export async function getWorldContent(worldId: WorldId): Promise<WorldContent | null> {
  const cacheKey = ContentCache.createKey('world', worldId);

  // Check cache
  const cached = cacheInstance?.get<WorldContent>(cacheKey);
  if (cached) return cached;

  // Fetch from adapter
  const content = await getAdapter().getWorld(worldId);

  // Cache result
  if (content) {
    cacheInstance?.set(cacheKey, content);
  }

  return content;
}

/**
 * Get all worlds
 */
export async function getAllWorlds(): Promise<WorldContent[]> {
  const cacheKey = ContentCache.createKey('worlds', 'all');

  const cached = cacheInstance?.get<WorldContent[]>(cacheKey);
  if (cached) return cached;

  const worlds = await getAdapter().getWorlds();
  cacheInstance?.set(cacheKey, worlds);

  return worlds;
}

/**
 * Clear content cache
 */
export function clearContentCache(): void {
  cacheInstance?.clear();
}

/**
 * Check if service is initialized
 */
export function isContentServiceInitialized(): boolean {
  return isInitialized;
}

// ============================================
// Pre-built Content Hooks for React
// ============================================

import { useState, useEffect } from 'react';

/**
 * React hook for world content
 */
export function useWorldContent(worldId: WorldId) {
  const [content, setContent] = useState<WorldContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchContent() {
      try {
        setLoading(true);
        const data = await getWorldContent(worldId);
        if (mounted) {
          setContent(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load content'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [worldId]);

  return { content, loading, error };
}

/**
 * React hook for all worlds
 */
export function useAllWorlds() {
  const [worlds, setWorlds] = useState<WorldContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchWorlds() {
      try {
        setLoading(true);
        const data = await getAllWorlds();
        if (mounted) {
          setWorlds(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load worlds'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchWorlds();

    return () => {
      mounted = false;
    };
  }, []);

  return { worlds, loading, error };
}

// ============================================
// Default Export
// ============================================

const ContentService = {
  initialize: initializeContentService,
  getWorld: getWorldContent,
  getAllWorlds,
  clearCache: clearContentCache,
  isInitialized: isContentServiceInitialized,
  getAdapter,
};

export default ContentService;
