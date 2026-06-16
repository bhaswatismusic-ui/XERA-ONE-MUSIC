// ============================================
// Neon Button - White glow / black text
// Hover reveals world neon color
// ============================================

import { motion } from 'framer-motion';

type WorldNeon = 'studios' | 'max' | 'infinity';

interface NeonButtonProps {
  children: React.ReactNode;
  world: WorldNeon;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  size?: 'default' | 'lg' | 'sm';
  variant?: 'primary' | 'outline';
}

const worldColors: Record<WorldNeon, { glow: string; border: string; shadow: string; innerShadow: string }> = {
  studios: {
    glow: '#ff2020',
    border: '#ff2020',
    shadow: '0 0 20px rgba(255,32,32,0.5), 0 0 40px rgba(255,32,32,0.2)',
    innerShadow: 'inset 0 0 15px rgba(255,32,32,0.1)',
  },
  max: {
    glow: '#00d4ff',
    border: '#00d4ff',
    shadow: '0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)',
    innerShadow: 'inset 0 0 15px rgba(0,212,255,0.1)',
  },
  infinity: {
    glow: '#00ff6a',
    border: '#00ff6a',
    shadow: '0 0 20px rgba(0,255,106,0.5), 0 0 40px rgba(0,255,106,0.2)',
    innerShadow: 'inset 0 0 15px rgba(0,255,106,0.1)',
  },
};

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  default: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function NeonButton({
  children,
  world,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  className = '',
  size = 'default',
  variant = 'primary',
}: NeonButtonProps) {
  const colors = worldColors[world];
  const isPrimary = variant === 'primary';

  const baseStyle: React.CSSProperties = isPrimary
    ? {
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#000000',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.15)',
      }
    : {
        background: 'transparent',
        color: '#ffffff',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'none',
      };

  const hoverStyle: React.CSSProperties = isPrimary
    ? {
        background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)`,
        color: colors.glow,
        border: `2px solid ${colors.border}`,
        boxShadow: colors.shadow,
        textShadow: `0 0 10px ${colors.glow}80`,
      }
    : {
        background: `${colors.glow}10`,
        color: colors.glow,
        border: `2px solid ${colors.border}80`,
        boxShadow: colors.shadow,
        textShadow: `0 0 10px ${colors.glow}80`,
      };

  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide uppercase transition-all duration-300 ${sizeClasses[size]} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      target={target}
      rel={rel}
      type={href ? undefined : type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={baseStyle}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onHoverStart={(e: any) => {
        if (!disabled && e?.currentTarget) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onHoverEnd={(e: any) => {
        if (!disabled && e?.currentTarget) {
          Object.assign(e.currentTarget.style, baseStyle);
        }
      }}
    >
      {children}
    </MotionComponent>
  );
}

export default NeonButton;
