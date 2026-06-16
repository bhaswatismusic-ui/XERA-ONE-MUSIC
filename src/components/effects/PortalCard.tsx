import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import type { WorldConfig } from '@/types';
import { useUniverseStore } from '@/store';
import { useEffect as useReactEffect } from 'react';

interface PortalCardProps {
  config: WorldConfig;
  index: number;
  onEnter: () => void;
  isEntering: boolean;
}

const portalColors = {
  studios: {
    primary: '#FF2A2A',
    secondary: '#cc2222',
    glow: 'rgba(255, 42, 42, 0.5)',
    gradient: 'linear-gradient(135deg, rgba(255, 42, 42, 0.2) 0%, rgba(255, 42, 42, 0.05) 100%)',
  },
  max: {
    primary: '#00BFFF',
    secondary: '#0099cc',
    glow: 'rgba(0, 191, 255, 0.5)',
    gradient: 'linear-gradient(135deg, rgba(0, 191, 255, 0.2) 0%, rgba(0, 191, 255, 0.05) 100%)',
  },
  infinity: {
    primary: '#39FF88',
    secondary: '#2ecc70',
    glow: 'rgba(57, 255, 136, 0.5)',
    gradient: 'linear-gradient(135deg, rgba(57, 255, 136, 0.2) 0%, rgba(57, 255, 136, 0.05) 100%)',
  },
} as const;

export function PortalCard({ config, index, onEnter, isEntering }: PortalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  const colors = portalColors[config.id];

  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Magnetic effect - pull towards cursor
  const magneticX = useSpring(useMotionValue(0), { damping: 15, stiffness: 150 });
  const magneticY = useSpring(useMotionValue(0), { damping: 15, stiffness: 150 });

  // Handle mouse move for 3D and magnetic effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);

    // Magnetic effect
    const magnetStrength = 15;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    if (Math.abs(distX) < rect.width * 0.6 && Math.abs(distY) < rect.height * 0.6) {
      magneticX.set(distX * 0.1);
      magneticY.set(distY * 0.1);
    }

    // Update glow position
    if (glowRef.current) {
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;
      gsap.to(glowRef.current, {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${colors.glow}, transparent 50%)`,
        duration: 0.2,
      });
    }
  }, [colors.glow, magneticX, magneticY, reducedMotion, x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Particle burst animation
    if (particlesRef.current && !reducedMotion) {
      const particles = particlesRef.current.children;
      gsap.fromTo(
        particles,
        { scale: 0, opacity: 1 },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    magneticX.set(0);
    magneticY.set(0);

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        background: 'radial-gradient(circle at 50% 50%, transparent, transparent 50%)',
        duration: 0.3,
      });
    }
  }, [magneticX, magneticY, x, y]);

  // Staggered entrance animation
  const controls = useAnimation();

  useReactEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    });
  }, [controls, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onEnter}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        x: magneticX,
        y: magneticY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative cursor-pointer group"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-2 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.glow}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          filter: 'blur(20px)',
        }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: 320,
          height: 420,
          background: colors.gradient,
          border: `1px solid ${colors.primary}30`,
        }}
      >
        {/* Dynamic glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{ background: 'radial-gradient(circle at 50% 50%, transparent, transparent 50%)' }}
        />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Portal ring animation */}
        <div className="absolute inset-8 flex items-center justify-center">
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              border: `2px solid ${colors.primary}40`,
              boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
            }}
            animate={reducedMotion ? {} : {
              rotate: 360,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.3 },
            }}
          />
          <motion.div
            className="absolute w-36 h-36 rounded-full"
            style={{
              border: `1px solid ${colors.primary}60`,
            }}
            animate={reducedMotion ? {} : {
              rotate: -360,
              scale: isHovered ? 0.9 : 1,
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.3 },
            }}
          />

          {/* Center portal glow */}
          <motion.div
            className="absolute w-24 h-24 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Particle burst container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: colors.primary,
                boxShadow: `0 0 10px ${colors.primary}`,
                left: `${50}%`,
                top: `${50}%`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(60px)`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          {/* World name */}
          <motion.h3
            className="text-3xl font-bold mb-2"
            style={{ color: colors.primary, textShadow: `0 0 30px ${colors.glow}` }}
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {config.name}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="text-white/70 text-sm mb-4"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {config.tagline}
          </motion.p>

          {/* Enter indicator */}
          <motion.div
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
            style={{ color: colors.primary }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <span>Click to Enter</span>
            <motion.span
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-4 right-4 w-8 h-8"
          style={{
            borderRight: `2px solid ${colors.primary}`,
            borderTop: `2px solid ${colors.primary}`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />
        <div
          className="absolute bottom-4 left-4 w-8 h-8"
          style={{
            borderLeft: `2px solid ${colors.primary}`,
            borderBottom: `2px solid ${colors.primary}`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />
      </div>

      {/* Reflection effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, transparent 50%)',
          opacity: isHovered ? 1 : 0,
        }}
        animate={{ x: isHovered ? 20 : -20 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

export default PortalCard;
