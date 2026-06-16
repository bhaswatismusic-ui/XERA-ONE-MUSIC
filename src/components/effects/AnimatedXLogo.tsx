import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useUniverseStore } from '@/store';

interface AnimatedXLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export function AnimatedXLogo({ size = 400, className = '', interactive = true }: AnimatedXLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  // GSAP animation for continuous glow pulse
  useEffect(() => {
    if (reducedMotion || !glowRef.current) return;

    const glowElement = glowRef.current;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(glowElement, {
      opacity: 1,
      scale: 1.05,
      duration: 2,
      ease: 'power2.inOut',
    }).to(glowElement, {
      opacity: 0.6,
      scale: 1,
      duration: 2,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Interactive glow effect based on mouse
  useEffect(() => {
    if (!interactive || reducedMotion || !logoRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const logo = logoRef.current;
      if (!logo) return;

      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Subtle 3D rotation
      gsap.to(logo, {
        rotateY: deltaX * 10,
        rotateX: -deltaY * 10,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logoRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    logoRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      logoRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, reducedMotion]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background glow layers */}
      <div
        ref={glowRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        <div
          className="absolute w-[120%] h-[120%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute w-[100%] h-[100%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* The X Logo */}
      <motion.svg
        ref={logoRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <defs>
          {/* Gradient for the X */}
          <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="xGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for behind */}
          <filter id="xGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        {/* Shadow layer */}
        <g filter="url(#xGlowStrong)" opacity={0.5}>
          <motion.path
            d="M40 40 L160 160 M160 40 L40 160"
            fill="none"
            stroke="url(#xGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            opacity={0.3}
          />
        </g>

        {/* Main X shape - animated stroke */}
        <g filter="url(#xGlow)">
          {/* First stroke of X (top-left to bottom-right) */}
          <motion.line
            x1="40"
            y1="40"
            x2="160"
            y2="160"
            stroke="url(#xGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Second stroke of X (top-right to bottom-left) */}
          <motion.line
            x1="160"
            y1="40"
            x2="40"
            y2="160"
            stroke="url(#xGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />
        </g>

        {/* Center glow point */}
        <motion.circle
          cx="100"
          cy="100"
          r="4"
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
          transition={{ duration: 1, delay: 0.8 }}
          filter="url(#xGlow)"
        />
      </motion.svg>

      {/* Orbiting particles */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-white/60"
            style={{
              boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            css={{
              transform: [
                { translateX: size * 0.65, translateY: 0 },
              ] as any,
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary-400/80"
            style={{
              boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            css={{
              transform: [
                { translateX: size * 0.55, translateY: 0 },
              ] as any,
            }}
          />
        </>
      )}
    </div>
  );
}

export default AnimatedXLogo;
