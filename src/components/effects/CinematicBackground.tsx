import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useUniverseStore } from '@/store';

interface CinematicBackgroundProps {
  worldId?: 'studios' | 'max' | 'infinity' | null;
  intensity?: number;
}

export function CinematicBackground({ worldId, intensity = 0.5 }: CinematicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  // Color schemes per world
  const worldColors = {
    studios: {
      primary: 'rgba(255, 42, 42, 0.15)',
      secondary: 'rgba(255, 68, 68, 0.08)',
    },
    max: {
      primary: 'rgba(0, 191, 255, 0.15)',
      secondary: 'rgba(0, 149, 255, 0.08)',
    },
    infinity: {
      primary: 'rgba(57, 255, 136, 0.15)',
      secondary: 'rgba(57, 200, 120, 0.08)',
    },
  };

  const colors = worldId ? worldColors[worldId] : null;

  // Animated gradient orbs
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const orbs = container.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(15, 25)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 2,
      });
    });
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

      {/* Animated gradient orbs */}
      {!reducedMotion && (
        <>
          {/* World-specific colored orbs */}
          {colors && (
            <>
              <motion.div
                className="gradient-orb absolute w-[600px] h-[600px] rounded-full blur-[100px]"
                style={{
                  background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
                  left: '20%',
                  top: '20%',
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="gradient-orb absolute w-[500px] h-[500px] rounded-full blur-[80px]"
                style={{
                  background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
                  right: '10%',
                  bottom: '30%',
                }}
                animate={{
                  x: [0, -40, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              />
            </>
          )}

          {/* Ambient purple/blue glow (for gateway) */}
          {!colors && (
            <>
              <motion.div
                className="gradient-orb absolute w-[800px] h-[800px] rounded-full blur-[150px]"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
                  left: '30%',
                  top: '10%',
                }}
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, 50, 100, 0],
                  scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="gradient-orb absolute w-[600px] h-[600px] rounded-full blur-[120px]"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
                  right: '20%',
                  bottom: '20%',
                }}
                animate={{
                  x: [0, -80, 40, 0],
                  y: [0, -60, 80, 0],
                  scale: [1, 0.9, 1.05, 1],
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 5,
                }}
              />
              <motion.div
                className="gradient-orb absolute w-[400px] h-[400px] rounded-full blur-[80px]"
                style={{
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
                  left: '10%',
                  bottom: '30%',
                }}
                animate={{
                  x: [0, 60, -30, 0],
                  y: [0, -40, 60, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 10,
                }}
              />
            </>
          )}
        </>
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

export default CinematicBackground;
