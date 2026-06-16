import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useUniverseStore } from '@/store';

interface LenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export function useLenis(options?: LenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  useEffect(() => {
    // Respect reduced motion preference
    if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: options?.lerp ?? 0.1,
      duration: options?.duration ?? 1.2,
      smoothWheel: options?.smoothWheel ?? true,
      wheelMultiplier: options?.wheelMultiplier ?? 1,
      touchMultiplier: options?.touchMultiplier ?? 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenisRef.current = null;
    };
  }, [reducedMotion, options?.lerp, options?.duration, options?.smoothWheel, options?.wheelMultiplier, options?.touchMultiplier]);

  return lenisRef;
}

export function useLenisInstance() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the global lenis instance if available
    const checkLenis = () => {
      const html = document.documentElement;
      if (html.classList.contains('lenis-smooth')) {
        // Lenis is initialized
      }
    };

    checkLenis();
  }, []);

  return lenisRef.current;
}

export type { Lenis };
