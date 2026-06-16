// ============================================
// Code Splitting Configuration
// Lazy-loaded components for optimal bundle size
// ============================================

import { lazy, Suspense, ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

// ============================================
// Loading Fallback Component
// ============================================

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

export function LoadingFallback({ message = 'Loading...', className = '' }: LoadingFallbackProps) {
  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="w-8 h-8 text-white/50" aria-hidden="true" />
        </motion.div>
        <span className="text-white/50 text-sm">{message}</span>
      </motion.div>
    </div>
  );
}

// ============================================
// Dynamic Import Wrapper
// ============================================

export function createLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFn);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <LoadingFallback />}>
      <LazyComponent {...(props as React.ComponentProps<T>)} />
    </Suspense>
  );
}

// ============================================
// Lazy World Imports
// ============================================

export const LazyStudiosWorld = createLazyComponent(
  () => import('@/worlds/studios/StudiosWorld').then((m) => ({ default: m.StudiosWorld })),
  <LoadingFallback message="Loading X-ERA Studios..." className="min-h-screen" />
);

export const LazyMaxWorld = createLazyComponent(
  () => import('@/worlds/max/MaxWorld').then((m) => ({ default: m.MaxWorld })),
  <LoadingFallback message="Loading X-ERA Max..." className="min-h-screen" />
);

export const LazyInfinityWorld = createLazyComponent(
  () => import('@/worlds/infinity/InfinityWorld').then((m) => ({ default: m.InfinityWorld })),
  <LoadingFallback message="Loading X-ERA Infinity..." className="min-h-screen" />
);

// ============================================
// Lazy Component Imports
// ============================================

export const LazyParticlesCanvas = createLazyComponent(
  () => import('@/components/three/Particles').then((m) => ({ default: m.ParticleSystem })),
  null
);

export const LazyWorldScene3D = createLazyComponent(
  () => import('@/components/three/WorldScenes').then((m) => ({ default: m.WorldScene })),
  null
);

// ============================================
// Section Lazy Loading
// ============================================

export function lazySection<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  threshold: number = 0.1
) {
  const LazySection = lazy(importFn);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<LoadingFallback className="min-h-[300px]" />}>
      <LazySection {...(props as React.ComponentProps<T>)} />
    </Suspense>
  );
}

// ============================================
// Preload Functions
// ============================================

export const preloadFunctions = {
  studios: () => import('@/worlds/studios/StudiosWorld'),
  max: () => import('@/worlds/max/MaxWorld'),
  infinity: () => import('@/worlds/infinity/InfinityWorld'),
};

export function preloadWorld(worldId: 'studios' | 'max' | 'infinity'): Promise<unknown> {
  const preloadFn = preloadFunctions[worldId];
  if (preloadFn) {
    return preloadFn();
  }
  return Promise.resolve();
}

// ============================================
// Route-Based Chunk Names (comment for Vite)
// ============================================

// Vite automatically creates chunks based on dynamic imports.
// Use magic comments to name chunks where needed:
// import(/* webpackChunkName: "studios" */ '@/worlds/studios/StudiosWorld')

export default {
  createLazyComponent,
  LazyStudiosWorld,
  LazyMaxWorld,
  LazyInfinityWorld,
  loadingFallback: LoadingFallback,
  preloadWorld,
};
