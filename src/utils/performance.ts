// ============================================
// Performance Optimization Utilities
// Production-ready performance monitoring and optimization
// ============================================

import { useEffect, useState, useCallback, useRef } from 'react';

// ============================================
// Device Detection
// ============================================

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasWebGL: boolean;
  hasTouch: boolean;
  prefersReducedMotion: boolean;
  prefersReducedData: boolean;
  pixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  connectionType: string;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasWebGL = !!gl;

  const connection = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean } }).connection;

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    hasWebGL,
    hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    connectionType: connection?.effectiveType || 'unknown',
    effectiveType: connection?.effectiveType || '4g',
    downlink: connection?.downlink || 10,
    rtt: connection?.rtt || 50,
    saveData: connection?.saveData || false,
  };
}

// ============================================
// Adaptive Quality Settings
// ============================================

export interface QualitySettings {
  particleCount: number;
  animationFPS: number;
  textureQuality: 'low' | 'medium' | 'high';
  enableParticles: boolean;
  enableWebGL: boolean;
  enableShadows: boolean;
  enableReflections: boolean;
  videoAutoplay: boolean;
  videoQuality: 'low' | 'medium' | 'high';
  imageQuality: 'low' | 'medium' | 'high';
}

export function getAdaptiveQuality(): QualitySettings {
  const caps = getDeviceCapabilities();

  if (caps.prefersReducedMotion || caps.saveData) {
    return {
      particleCount: 0,
      animationFPS: 15,
      textureQuality: 'low',
      enableParticles: false,
      enableWebGL: false,
      enableShadows: false,
      enableReflections: false,
      videoAutoplay: false,
      videoQuality: 'low',
      imageQuality: 'low',
    };
  }

  if (caps.isMobile || caps.effectiveType === '2g' || caps.effectiveType === '3g') {
    return {
      particleCount: 100,
      animationFPS: 30,
      textureQuality: 'low',
      enableParticles: true,
      enableWebGL: caps.hasWebGL,
      enableShadows: false,
      enableReflections: false,
      videoAutoplay: false,
      videoQuality: 'low',
      imageQuality: 'medium',
    };
  }

  if (caps.isTablet || caps.effectiveType === '4g') {
    return {
      particleCount: 200,
      animationFPS: 60,
      textureQuality: 'medium',
      enableParticles: true,
      enableWebGL: caps.hasWebGL,
      enableShadows: false,
      enableReflections: true,
      videoAutoplay: true,
      videoQuality: 'medium',
      imageQuality: 'high',
    };
  }

  return {
    particleCount: 300,
    animationFPS: 60,
    textureQuality: 'high',
    enableParticles: true,
    enableWebGL: caps.hasWebGL,
    enableShadows: true,
    enableReflections: true,
    videoAutoplay: true,
    videoQuality: 'high',
    imageQuality: 'high',
  };
}

// ============================================
// Performance Monitor
// ============================================

export interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  layoutTime: number;
  paintTime: number;
  domNodes: number;
  jsHeapSize: number;
  totalJSHeapSize: number;
}

export function usePerformanceMetrics(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    renderTime: 0,
    layoutTime: 0,
    paintTime: 0,
    domNodes: 0,
    jsHeapSize: 0,
    totalJSHeapSize: 0,
  });

  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;
    let running = true;

    const updateMetrics = () => {
      if (!running) return;

      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;

      frameTimes.current.push(delta);
      if (frameTimes.current.length > 60) {
        frameTimes.current.shift();
      }

      const avgFrameTime = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
      const fps = 1000 / avgFrameTime;

      const perfEntries = performance.getEntriesByType('measure');
      const renderTime = perfEntries.length > 0
        ? perfEntries.reduce((acc, entry) => acc + entry.duration, 0)
        : 0;

      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;

      setMetrics({
        fps: Math.round(fps),
        memory: memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0,
        renderTime: Math.round(renderTime),
        layoutTime: 0,
        paintTime: 0,
        domNodes: document.getElementsByTagName('*').length,
        jsHeapSize: memory?.usedJSHeapSize || 0,
        totalJSHeapSize: memory?.totalJSHeapSize || 0,
      });

      animationId = requestAnimationFrame(updateMetrics);
    };

    animationId = requestAnimationFrame(updateMetrics);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
    };
  }, []);

  return metrics;
}

// ============================================
// Intersection Observer Hook
// ============================================

export interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: IntersectionOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}

// ============================================
// Lazy Load Hook
// ============================================

export function useLazyLoad<T>(
  importFn: () => Promise<{ default: T }>,
  condition: boolean = true
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!condition || data) return;

    setLoading(true);

    importFn()
      .then((module) => {
        setData(module.default);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to load'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [condition, data, importFn]);

  return { data, loading, error };
}

// ============================================
// Throttle and Debounce
// ============================================

export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, delay - timeSinceLastCall);
    }
  }) as T;
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T;
}

// ============================================
// Animation Frame Throttle
// ============================================

export function rafThrottle<T extends (...args: Parameters<T>) => void>(fn: T): T {
  let requestId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return ((...args: Parameters<T>) => {
    lastArgs = args;

    if (requestId) {
      return;
    }

    requestId = requestAnimationFrame(() => {
      requestId = null;
      if (lastArgs) {
        fn(...lastArgs);
      }
    });
  }) as T;
}

// ============================================
// Resource Preloader
// ============================================

export interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  as?: 'image' | 'video' | 'script' | 'style' | 'font' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export function preloadResource(href: string, options: PreloadOptions = {}): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;

  if (options.as) link.as = options.as;
  if (options.type) link.type = options.type;
  if (options.crossOrigin) link.crossOrigin = options.crossOrigin;
  if (options.priority) {
    link.fetchPriority = options.priority;
  }

  document.head.appendChild(link);
}

export function prefetchResource(href: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// ============================================
// Memory Management
// ============================================

export function cleanupThreejsResources(object: { geometry?: unknown; material?: unknown; dispose?: () => void }): void {
  if (!object) return;

  if ('geometry' in object && object.geometry) {
    const geo = object.geometry as { dispose?: () => void };
    if (geo.dispose) geo.dispose();
  }

  if ('material' in object && object.material) {
    const mat = object.material;
    if (Array.isArray(mat)) {
      mat.forEach((m: { dispose?: () => void }) => {
        if (m.dispose) m.dispose();
      });
    } else if ((mat as { dispose?: () => void }).dispose) {
      (mat as { dispose: () => void }).dispose();
    }
  }

  if ('dispose' in object && object.dispose) {
    object.dispose();
  }
}

// ============================================
// Performance Budget Alert
// ============================================

export interface PerformanceBudget {
  maxFPS?: number;
  minFPS?: number;
  maxMemory?: number;
  maxDOMNodes?: number;
  maxBundleSize?: number;
}

export function usePerformanceBudget(budget: PerformanceBudget): {
  warnings: string[];
  isWithinBudget: boolean;
} {
  const metrics = usePerformanceMetrics();
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const newWarnings: string[] = [];

    if (budget.minFPS && metrics.fps < budget.minFPS) {
      newWarnings.push(`FPS below budget: ${metrics.fps} < ${budget.minFPS}`);
    }

    if (budget.maxMemory && metrics.memory > budget.maxMemory) {
      newWarnings.push(`Memory above budget: ${metrics.memory}MB > ${budget.maxMemory}MB`);
    }

    if (budget.maxDOMNodes && metrics.domNodes > budget.maxDOMNodes) {
      newWarnings.push(`DOM nodes above budget: ${metrics.domNodes} > ${budget.maxDOMNodes}`);
    }

    setWarnings(newWarnings);
  }, [metrics, budget]);

  return {
    warnings,
    isWithinBudget: warnings.length === 0,
  };
}

export default {
  getDeviceCapabilities,
  getAdaptiveQuality,
  usePerformanceMetrics,
  useIntersectionObserver,
  useLazyLoad,
  throttle,
  debounce,
  rafThrottle,
  preloadResource,
  prefetchResource,
  cleanupThreejsResources,
  usePerformanceBudget,
};
