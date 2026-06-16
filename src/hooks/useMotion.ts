import type { TransitionConfig, AnimationConfig, ScrollAnimationConfig } from '@/types';
import type { Variants, Transition } from 'framer-motion';

// Standard easing curves
export const easing = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springBouncy: { type: 'spring', stiffness: 300, damping: 20 },
} as const;

// Duration presets
export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

// Default transition
export const defaultTransition: Transition = {
  duration: duration.normal,
  ease: easing.ease,
};

// ============================================
// Fade Animations
// ============================================

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: AnimationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.normal, ease: easing.ease },
};

export const fadeInDown: AnimationConfig = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.normal, ease: easing.ease },
};

export const fadeInLeft: AnimationConfig = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: duration.normal, ease: easing.ease },
};

export const fadeInRight: AnimationConfig = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: duration.normal, ease: easing.ease },
};

// ============================================
// Scale Animations
// ============================================

export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleUp: AnimationConfig = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: duration.normal, ease: easing.ease },
};

export const scaleDown: AnimationConfig = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: duration.normal, ease: easing.ease },
};

// ============================================
// Stagger Animations
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const staggerItemFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============================================
// Page Transitions
// ============================================

export const pageTransition: AnimationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: duration.slow, ease: easing.ease },
};

export const slideTransition: AnimationConfig = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: duration.slow, ease: easing.ease },
};

// ============================================
// Card/Item Animations
// ============================================

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.ease },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: duration.fast },
  },
  hover: {
    y: -5,
    transition: { duration: duration.fast, ease: easing.ease },
  },
};

export const featureCardVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.ease },
  },
  hover: {
    scale: 1.02,
    transition: { duration: duration.fast },
  },
  tap: {
    scale: 0.98,
  },
};

// ============================================
// Hero Animations
// ============================================

export const heroTextVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.ease },
  },
};

export const heroTitleVariants: Variants = {
  initial: { opacity: 0, y: 80, rotateX: 10 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: duration.verySlow, ease: easing.ease },
  },
};

export const heroSubtextVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, delay: 0.2, ease: easing.ease },
  },
};

export const heroCtaVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, delay: 0.4, ease: easing.ease },
  },
};

// ============================================
// Navigation Animations
// ============================================

export const navItemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast },
  },
  hover: {
    y: -2,
    transition: { duration: duration.fast },
  },
};

export const mobileMenuVariants: Variants = {
  initial: { opacity: 0, x: '100%' },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing.ease },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: duration.normal, ease: easing.ease },
  },
};

// ============================================
// Scroll Animations
// ============================================

export const scrollReveal: ScrollAnimationConfig = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: easing.ease },
  viewport: { once: true, amount: 0.3 },
};

export const scrollScale: ScrollAnimationConfig = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: duration.slow, ease: easing.ease },
  viewport: { once: true, amount: 0.3 },
};

export const scrollSlideLeft: ScrollAnimationConfig = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: duration.slow, ease: easing.ease },
  viewport: { once: true, amount: 0.3 },
};

export const scrollSlideRight: ScrollAnimationConfig = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: duration.slow, ease: easing.ease },
  viewport: { once: true, amount: 0.3 },
};

// ============================================
// Stat Counter Animation
// ============================================

export const counterVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.ease },
  },
};

// ============================================
// Button/Interactive Animations
// ============================================

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const linkVariants: Variants = {
  initial: { x: 0 },
  hover: { x: 5 },
};

export const iconHoverVariants: Variants = {
  initial: { rotate: 0, scale: 1 },
  hover: { rotate: 15, scale: 1.1 },
  tap: { scale: 0.9 },
};

// ============================================
// Modal/Overlay Animations
// ============================================

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.ease },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: duration.fast },
  },
};

export const drawerVariants: Variants = {
  initial: { x: '100%' },
  animate: {
    x: 0,
    transition: { duration: duration.normal, ease: easing.ease },
  },
  exit: {
    x: '100%',
    transition: { duration: duration.normal, ease: easing.ease },
  },
};

// ============================================
// Globe/World Card Animations
// ============================================

export const worldCardVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.ease },
  },
  hover: {
    scale: 1.05,
    y: -10,
    transition: { duration: duration.normal },
  },
  tap: { scale: 0.98 },
};

export const worldGlitchVariants: Variants = {
  initial: { opacity: 1 },
  glitch: {
    opacity: [1, 0.8, 1, 0.9, 1],
    x: [0, -2, 2, -1, 0],
    transition: { duration: 0.3, repeat: Infinity, repeatDelay: 3 },
  },
};

// ============================================
// Helper Functions
// ============================================

export function createScrollReveal(
  delay: number = 0,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
): ScrollAnimationConfig {
  const offsetMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  const offset = offsetMap[direction];

  return {
    initial: { opacity: 0, ...offset },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: duration.slow, delay, ease: easing.ease },
    viewport: { once: true, amount: 0.3 },
  };
}

export function createStaggerAnimation(
  itemCount: number,
  baseDelay: number = 0.1
): { container: Variants; item: Variants } {
  return {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: baseDelay,
          delayChildren: baseDelay,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: duration.normal, ease: easing.ease },
      },
    },
  };
}
