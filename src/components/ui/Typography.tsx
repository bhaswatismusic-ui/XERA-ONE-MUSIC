import { motion, type HTMLMotionProps } from 'framer-motion';
import { heroTitleVariants, heroSubtextVariants, scrollReveal } from '@/hooks/useMotion';

// Heading components
interface HeadingProps extends HTMLMotionProps<'h1'> {
  gradient?: boolean;
  gradientWorld?: 'studios' | 'max' | 'infinity';
  children: React.ReactNode;
}

export function Heading1({
  gradient = false,
  gradientWorld,
  children,
  className = '',
  ...props
}: HeadingProps) {
  const gradientClass = gradientWorld
    ? `text-gradient-${gradientWorld}`
    : gradient
    ? 'text-gradient-brand bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent'
    : '';

  return (
    <motion.h1
      variants={heroTitleVariants}
      initial="initial"
      animate="animate"
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </motion.h1>
  );
}

export function Heading2({
  gradient = false,
  gradientWorld,
  children,
  className = '',
  ...props
}: HeadingProps) {
  const gradientClass = gradientWorld
    ? `text-gradient-${gradientWorld}`
    : gradient
    ? 'text-gradient-brand bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent'
    : '';

  return (
    <motion.h2
      className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </motion.h2>
  );
}

export function Heading3({ children, className = '', ...props }: HeadingProps) {
  return (
    <motion.h3
      className={`text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${className}`}
      {...props}
    >
      {children}
    </motion.h3>
  );
}

export function Heading4({ children, className = '', ...props }: HeadingProps) {
  return (
    <motion.h4
      className={`text-xl sm:text-2xl font-semibold tracking-tight leading-tight ${className}`}
      {...props}
    >
      {children}
    </motion.h4>
  );
}

// Paragraph components
interface TextProps extends HTMLMotionProps<'p'> {
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
  balanced?: boolean;
  children: React.ReactNode;
}

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg md:text-xl',
};

export function Paragraph({
  size = 'md',
  muted = false,
  balanced = false,
  children,
  className = '',
  ...props
}: TextProps) {
  return (
    <motion.p
      variants={heroSubtextVariants}
      initial="initial"
      animate="animate"
      className={`
        ${textSizeStyles[size]}
        ${muted ? 'text-neutral-400' : 'text-neutral-300'}
        ${balanced ? 'text-balance' : ''}
        leading-relaxed
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.p>
  );
}

// Lead text for hero sections
export function Lead({ children, className = '', ...props }: TextProps) {
  return (
    <motion.p
      variants={heroSubtextVariants}
      initial="initial"
      animate="animate"
      className={`text-xl md:text-2xl lg:text-3xl font-light text-neutral-300 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </motion.p>
  );
}

// Small text
export function Small({ children, className = '', ...props }: TextProps) {
  return (
    <motion.span className={`text-sm text-neutral-400 ${className}`} {...props}>
      {children}
    </motion.span>
  );
}

// Label text
export function Label({ children, className = '', ...props }: TextProps) {
  return (
    <motion.span
      className={`text-xs font-semibold uppercase tracking-wider text-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
}

// Quote component
interface QuoteProps extends HTMLMotionProps<'blockquote'> {
  author?: string;
  role?: string;
  children: React.ReactNode;
}

export function Quote({ author, role, children, className = '', ...props }: QuoteProps) {
  return (
    <motion.blockquote
      variants={scrollReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={`relative pl-6 border-l-2 border-primary-500 ${className}`}
      {...props}
    >
      <p className="text-lg md:text-xl text-neutral-300 italic leading-relaxed">{children}</p>
      {author && (
        <footer className="mt-4">
          <cite className="not-italic">
            <span className="text-white font-semibold">{author}</span>
            {role && <span className="text-neutral-500 ml-2">— {role}</span>}
          </cite>
        </footer>
      )}
    </motion.blockquote>
  );
}

export default Heading1;
