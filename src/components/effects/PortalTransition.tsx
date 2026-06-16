import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import type { WorldId } from '@/types';
import { useUniverseStore } from '@/store';

 const portalColors = {
  studios: {
    primary: '#FF2A2A',
    glow: 'rgba(255, 42, 42, 0.8)',
  },
  max: {
    primary: '#00BFFF',
    glow: 'rgba(0, 191, 255, 0.8)',
  },
  infinity: {
    primary: '#39FF88',
    glow: 'rgba(57, 255, 136, 0.8)',
  },
} as const;

interface PortalTransitionProps {
  worldId: WorldId | null;
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

export function PortalTransition({ worldId, isTransitioning, onTransitionComplete }: PortalTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);
  const colors = worldId ? portalColors[worldId] : null;

  // Particle burst animation during transition
  useEffect(() => {
    if (!isTransitioning || !canvasRef.current || !colors || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface BurstParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: BurstParticle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create burst particles
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 30 + 30,
        color: colors.primary,
      });
    }

    let animationId: number;
    let frame = 0;
    const maxFrames = 90;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Expanding ring
      const ringProgress = frame / maxFrames;
      const ringRadius = ringProgress * Math.max(canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 5 * (1 - ringProgress);
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = 30;
      ctx.stroke();

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - ringProgress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      frame++;
      if (frame >= maxFrames) {
        cancelAnimationFrame(animationId);
        onTransitionComplete();
        return;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isTransitioning, colors, onTransitionComplete, reducedMotion]);

  if (reducedMotion) {
    return (
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-white text-2xl">Entering...</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black" />

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
          />

          {/* Center text */}
          {colors && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.h2
                className="text-6xl md:text-8xl font-bold mb-4"
                style={{ color: colors.primary, textShadow: `0 0 60px ${colors.glow}` }}
              >
                Entering
              </motion.h2>
              <motion.div
                className="text-2xl md:text-3xl text-white/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {worldId?.toUpperCase()}
              </motion.div>
            </motion.div>
          )}

          {/* Radial wipe effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 0%, black 0%)`,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 50% 50%, transparent 0%, black 0%)`,
                `radial-gradient(circle at 50% 50%, transparent 50%, black 50%)`,
                `radial-gradient(circle at 50% 50%, transparent 100%, black 100%)`,
              ],
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PortalTransition;
