// ============================================
// Animation Optimization Utilities
// Viewport-based activation and performance-aware animations
// ============================================

import { useEffect, useRef, useState, useCallback, RefObject } from 'react';
import { motion, useInView, useAnimation, useReducedMotion, AnimationControls } from 'framer-motion';
import { getAdaptiveQuality } from '@/utils/performance';

// ============================================
// Viewport Animation Hook
// ============================================

export interface ViewportAnimationOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
  animation?: {
    hidden: { opacity: number; y: number; scale?: number };
    visible: { opacity: number; y: number; scale?: number };
  };
  duration?: number;
  delay?: number;
  staggerChildren?: number;
}

export function useViewportAnimation(
  options: ViewportAnimationOptions = {}
): [RefObject<HTMLDivElement | null>, AnimationControls, boolean] {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: options.once !== false,
    margin: options.margin || '-50px',
    amount: options.threshold || 0.1,
  });

  const quality = getAdaptiveQuality();

  useEffect(() => {
    if (isInView && quality.animationFPS > 0) {
      controls.start('visible');
    } else if (!options.once && !isInView) {
      controls.start('hidden');
    }
  }, [isInView, controls, options.once, quality.animationFPS]);

  return [ref, controls, isInView];
}

// ============================================
// Stagger Animation Hook
// ============================================

export interface StaggerAnimationOptions {
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export function useStaggerAnimation(options: StaggerAnimationOptions = {}) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { staggerDelay = 0.1, direction = 'up', duration = 0.5 } = options;

  const getDirectionOffset = useCallback(() => {
    switch (direction) {
      case 'up':
        return { y: 30, x: 0 };
      case 'down':
        return { y: -30, x: 0 };
      case 'left':
        return { y: 0, x: 30 };
      case 'right':
        return { y: 0, x: -30 };
      default:
        return { y: 30, x: 0 };
    }
  }, [direction]);

  useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          delay: i * staggerDelay,
          duration,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }));
    }
  }, [isInView, controls, staggerDelay, duration, getDirectionOffset]);

  const offset = getDirectionOffset();

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return { ref, controls, isInView, itemVariants };
}

// ============================================
// Parallax Animation Hook
// ============================================

export interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  const { speed = 0.5, direction = 'up', disabled } = options;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (disabled || reducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top > windowHeight || rect.bottom < 0) return;

      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const moveAmount = scrollPercent * speed * 100;

      setOffsetY(direction === 'up' ? -moveAmount : moveAmount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, disabled, reducedMotion]);

  return { ref, offsetY };
}

// ============================================
// Counter Animation Hook
// ============================================

export interface CounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  separator?: string;
}

export function useAnimatedCounter(options: CounterOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { start = 0, end, duration = 2, decimals = 0, separator = ',' } = options;

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const startTime = performance.now();
    const endTime = startTime + duration * 1000;

    const animate = (currentTime: number) => {
      if (currentTime >= endTime) {
        setDisplayValue(end);
        setHasAnimated(true);
        return;
      }

      const progress = (currentTime - startTime) / (duration * 1000);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easeProgress;

      setDisplayValue(currentValue);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, hasAnimated, start, end, duration]);

  const formatValue = (value: number): string => {
    const fixed = value.toFixed(decimals);
    if (!separator) return fixed;

    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return parts.join('.');
  };

  return { ref, displayValue: formatValue(displayValue) };
}

// ============================================
// Typewriter Animation Hook
// ============================================

export interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
}

export function useTypewriter(options: TypewriterOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const { text, speed = 50, delay = 0, cursor = true } = options;

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeoutId = setTimeout(typeCharacter, delay);

    return () => clearTimeout(timeoutId);
  }, [isInView, text, speed, delay]);

  return { ref, displayText, isComplete, cursor };
}

// ============================================
// Scroll Progress Hook
// ============================================

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;

      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ============================================
// Animation Throttle Hook
// ============================================

export function useThrottledAnimation(fps: number = 60) {
  const lastFrameTime = useRef(0);
  const animationRef = useRef<number | null>(null);

  const shouldUpdate = useCallback(() => {
    const now = performance.now();
    const elapsed = now - lastFrameTime.current;
    const targetInterval = 1000 / fps;

    if (elapsed >= targetInterval) {
      lastFrameTime.current = now;
      return true;
    }

    return false;
  }, [fps]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return shouldUpdate;
}

// ============================================
// Prefab Animation Components
// ============================================

export interface FadeInProps {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export function FadeIn({ delay = 0, duration = 0.5, direction = 'up', ...props }: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const quality = getAdaptiveQuality();

  const offset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  if (reducedMotion || quality.animationFPS === 0) {
    return <div className={props.className}>{props.children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
}

export default {
  useViewportAnimation,
  useStaggerAnimation,
  useParallax,
  useAnimatedCounter,
  useTypewriter,
  useScrollProgress,
  useThrottledAnimation,
  FadeIn,
};
