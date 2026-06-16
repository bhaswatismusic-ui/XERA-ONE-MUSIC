import { motion, type HTMLMotionProps } from 'framer-motion';
import { cardVariants, featureCardVariants } from '@/hooks/useMotion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'hover' | 'feature';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  variants = variant === 'feature' ? featureCardVariants : cardVariants,
  initial = 'initial',
  whileHover = variant === 'hover' ? 'hover' : undefined,
  whileTap = variant === 'feature' ? 'tap' : undefined,
  animate = 'animate',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800 overflow-hidden';

  const hoverStyles = variant === 'hover' || variant === 'feature'
    ? 'transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70 hover:shadow-glow'
    : '';

  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// World Card specifically for the gateway
interface WorldCardProps extends HTMLMotionProps<'div'> {
  worldName: string;
  tagline: string;
  variant?: 'studios' | 'max' | 'infinity';
  thumbnail?: string;
  children?: React.ReactNode;
}

const worldGradientStyles = {
  studios: 'from-studios-primary/20 via-studios-primary/10 to-transparent',
  max: 'from-max-primary/20 via-max-primary/10 to-transparent',
  infinity: 'from-infinity-primary/20 via-infinity-primary/10 to-transparent',
};

const worldGlowStyles = {
  studios: 'group-hover:shadow-[0_0_40px_rgba(229,9,20,0.3)]',
  max: 'group-hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]',
  infinity: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]',
};

export function WorldCard({
  worldName,
  tagline,
  variant = 'studios',
  thumbnail,
  children,
  className = '',
  ...props
}: WorldCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true }}
      className={`
        relative group
        rounded-3xl overflow-hidden
        bg-gradient-to-br ${worldGradientStyles[variant]}
        border border-neutral-800
        transition-all duration-500 ease-out
        ${worldGlowStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${worldGradientStyles[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Thumbnail */}
      {thumbnail && (
        <div className="absolute inset-0 z-0">
          <img
            src={thumbnail}
            alt={`${worldName} thumbnail`}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;
