// ============================================
// Portal Transition System
// Immersive world transition animations with GSAP
// ============================================

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useUniverseStore } from '@/store';

// ============================================
// Portal Configuration
// ============================================

export interface PortalTransitionConfig {
  duration?: number;
  color?: string;
  particleCount?: number;
  ringCount?: number;
  enableSound?: boolean;
  onTransitionStart?: () => void;
  onTransitionComplete?: () => void;
}

interface PortalTransitionProps {
  isActive: boolean;
  targetWorld: 'studios' | 'max' | 'infinity' | null;
  config?: PortalTransitionConfig;
  onComplete?: () => void;
}

// World-specific colors
const worldColors = {
  studios: '#FF2A2A',
  max: '#00BFFF',
  infinity: '#39FF88',
};

// ============================================
// Portal Transition Component
// ============================================

export function PortalTransition({
  isActive,
  targetWorld,
  config,
  onComplete,
}: PortalTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRingRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'portal' | 'expand' | 'flash' | 'reveal'>('idle');

  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  const color = targetWorld ? worldColors[targetWorld] : '#ffffff';
  const duration = config?.duration ?? 1.8;

  // Create particle elements
  const createParticles = useCallback(() => {
    if (!particleContainerRef.current || !targetWorld) return;

    const count = config?.particleCount ?? 30;
    const container = particleContainerRef.current;

    // Clear existing particles
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'portal-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: ${color};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
      `;
      container.appendChild(particle);
    }

    return container.children;
  }, [targetWorld, config?.particleCount, color]);

  // Run transition animation
  useEffect(() => {
    if (!isActive || !targetWorld || reducedMotion || !containerRef.current) {
      if (onComplete && !isActive) {
        onComplete();
      }
      return;
    }

    config?.onTransitionStart?.();

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('idle');
        config?.onTransitionComplete?.();
        onComplete?.();
      },
    });

    const particles = createParticles();
    const ringCount = config?.ringCount ?? 3;

    // Phase 1: Portal activation (0-30%)
    setPhase('portal');
    tl.fromTo(
      portalRingRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: 0,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 180,
        duration: duration * 0.25,
        ease: 'power2.out',
      }
    );

    // Phase 2: Energy ring expansion (25-60%)
    tl.to(
      portalRingRef.current,
      {
        scale: 15,
        opacity: 0.8,
        rotation: 360,
        duration: duration * 0.35,
        ease: 'power3.in',
      },
      `-=${duration * 0.1}`
    );

    // Phase 3: Particle explosion (50-80%)
    if (particles) {
      setPhase('expand');
      Array.from(particles).forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 100 + Math.random() * 200;

        tl.to(
          particle,
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 1,
            scale: 1.5,
            duration: duration * 0.3,
            ease: 'power2.out',
          },
          `-=${duration * 0.2}`
        );

        // Fade out particles
        tl.to(
          particle,
          {
            opacity: 0,
            scale: 0,
            duration: duration * 0.2,
            ease: 'power2.in',
          },
          `-=${duration * 0.1}`
        );
      });
    }

    // Phase 4: Fullscreen flash (75-90%)
    setPhase('flash');
    tl.to(
      flashRef.current,
      {
        opacity: 0.6,
        duration: duration * 0.15,
        ease: 'power2.in',
      },
      `-=${duration * 0.15}`
    );

    tl.to(flashRef.current, {
      opacity: 0,
      duration: duration * 0.15,
      ease: 'power2.out',
    });

    // Phase 5: World reveal (85-100%)
    setPhase('reveal');
    tl.to(portalRingRef.current, {
      scale: 0,
      opacity: 0,
      duration: duration * 0.15,
      ease: 'power3.in',
    });

    return () => {
      tl.kill();
    };
  }, [isActive, targetWorld, reducedMotion, duration, config, createParticles, onComplete]);

  if (!isActive && phase === 'idle') return null;

  return createPortal(
    <AnimatePresence>
      {(isActive || phase !== 'idle') && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Portal Ring */}
          <div
            ref={portalRingRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100px',
              height: '100px',
              opacity: 0,
            }}
          >
            {/* Outer Ring */}
            <div
              className="absolute inset-0 rounded-full border-4 animate-pulse"
              style={{
                borderColor: color,
                boxShadow: `0 0 30px ${color}, 0 0 60px ${color}, inset 0 0 30px ${color}`,
              }}
            />

            {/* Inner Ring */}
            <div
              className="absolute inset-4 rounded-full border-2"
              style={{
                borderColor: `${color}88`,
                boxShadow: `0 0 20px ${color}`,
              }}
            />

            {/* Core */}
            <div
              className="absolute inset-8 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}40, transparent)`,
              }}
            />

            {/* Energy rays */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-[60px] w-[2px]"
                style={{
                  background: `linear-gradient(to right, ${color}, transparent)`,
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  transformOrigin: 'center left',
                }}
              />
            ))}
          </div>

          {/* Particle Container */}
          <div ref={particleContainerRef} className="absolute inset-0" />

          {/* Flash Overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 70%)`,
              opacity: 0,
            }}
          />

          {/* Scanlines effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${color}10 2px,
                ${color}10 4px
              )`,
              opacity: phase === 'flash' ? 0.5 : 0,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ============================================
// Hook for triggering transitions
// ============================================

export function usePortalTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'studios' | 'max' | 'infinity' | null>(null);

  const triggerTransition = useCallback(
    (targetWorld: 'studios' | 'max' | 'infinity', onComplete?: () => void) => {
      setTransitionTarget(targetWorld);
      setIsTransitioning(true);

      // The onComplete callback will be called after the animation
      const originalOnComplete = onComplete;
      onComplete = () => {
        setIsTransitioning(false);
        setTransitionTarget(null);
        originalOnComplete?.();
      };
    },
    []
  );

  return {
    isTransitioning,
    transitionTarget,
    triggerTransition,
    PortalComponent: () => (
      <PortalTransition
        isActive={isTransitioning}
        targetWorld={transitionTarget}
        onComplete={() => {
          setIsTransitioning(false);
          setTransitionTarget(null);
        }}
      />
    ),
  };
}

export default PortalTransition;
