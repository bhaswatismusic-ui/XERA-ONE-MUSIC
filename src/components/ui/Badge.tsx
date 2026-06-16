import { motion, type HTMLMotionProps } from 'framer-motion';
import type { WorldId } from '@/types';

interface BadgeProps extends HTMLMotionProps<'span'> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  default: 'bg-neutral-800 text-neutral-300',
  primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
  secondary: 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/30',
  success: 'bg-success-500/20 text-success-400 border border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-400 border border-warning-500/30',
  error: 'bg-error-500/20 text-error-400 border border-error-500/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${badgeVariants[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.span>
  );
}

// World badge for identifying cards belonging to specific worlds
interface WorldBadgeProps {
  worldId: WorldId;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const worldBadgeStyles: Record<WorldId, string> = {
  studios: 'bg-studios-primary/20 text-studios-primary border-studios-primary/30',
  max: 'bg-max-primary/20 text-max-primary border-max-primary/30',
  infinity: 'bg-infinity-primary/20 text-infinity-primary border-infinity-primary/30',
};

const worldNames: Record<WorldId, string> = {
  studios: 'Studios',
  max: 'Max',
  infinity: 'Infinity',
};

export function WorldBadge({ worldId, text, size = 'md' }: WorldBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border
        ${worldBadgeStyles[worldId]}
        ${sizeStyles[size]}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {text || worldNames[worldId]}
    </span>
  );
}

// Status badge for showing states
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed';
  text?: string;
}

const statusStyles = {
  active: 'bg-success-500/20 text-success-400 border-success-500/30',
  inactive: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
  pending: 'bg-warning-500/20 text-warning-400 border-warning-500/30',
  completed: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
};

const statusDotStyles = {
  active: 'bg-success-400',
  inactive: 'bg-neutral-400',
  pending: 'bg-warning-400 animate-pulse',
  completed: 'bg-primary-400',
};

export function StatusBadge({ status, text }: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border
        ${statusStyles[status]}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[status]}`} />
      {text || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default Badge;
