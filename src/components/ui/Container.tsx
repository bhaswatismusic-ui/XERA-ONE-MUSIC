import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'world';

interface ContainerProps extends HTMLMotionProps<'div'> {
  size?: ContainerSize;
  as?: 'div' | 'section' | 'article' | 'main';
  children: ReactNode;
}

const containerSizes: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
  world: 'max-w-6xl',
};

export function Container({
  size = 'lg',
  as: Component = 'div',
  children,
  className = '',
  ...props
}: ContainerProps) {
  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;

  return (
    <MotionComponent
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${containerSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

// Section wrapper with consistent spacing
interface SectionProps extends HTMLMotionProps<'section'> {
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'subtle' | 'dark' | 'gradient';
  children: ReactNode;
}

const paddingStyles = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
};

const backgroundStyles = {
  transparent: '',
  subtle: 'bg-neutral-900/50',
  dark: 'bg-neutral-950',
  gradient: 'bg-hero-gradient',
};

export function Section({
  padding = 'lg',
  background = 'transparent',
  children,
  className = '',
  ...props
}: SectionProps) {
  return (
    <motion.section
      className={`${paddingStyles[padding]} ${backgroundStyles[background]} ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// Grid component
interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

const gridColsStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function Grid({ cols = 3, gap = 'lg', children, className = '' }: GridProps) {
  return (
    <div className={`grid ${gridColsStyles[cols]} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Divider component
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  const orientationClasses = {
    horizontal: 'w-full h-px',
    vertical: 'w-px h-full',
  };

  return (
    <div className={`${orientationClasses[orientation]} bg-neutral-800 ${className}`} />
  );
}

export default Container;
