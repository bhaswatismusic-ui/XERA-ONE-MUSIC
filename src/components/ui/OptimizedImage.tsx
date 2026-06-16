// ============================================
// Optimized Image Component
// Production-ready responsive images with lazy loading and modern formats
// ============================================

import { useRef, useState, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useIntersectionObserver, getAdaptiveQuality } from '@/utils/performance';

// ============================================
// Responsive Image Configuration
// ============================================

export interface ImageSource {
  src: string;
  width: number;
  quality?: number;
}

export interface ResponsiveImageProps {
  src: string;
  srcSet?: ImageSource[];
  webp?: string;
  avif?: string;
  webpSrcSet?: ImageSource[];
  avifSrcSet?: ImageSource[];
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: 'high' | 'low';
  lazyLoad?: boolean;
  threshold?: number;
  placeholderColor?: string;
  placeholderBlur?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: string;
  fadeDuration?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}

// ============================================
// Optimized Image Component
// ============================================

export const OptimizedImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  (
    {
      src,
      srcSet,
      webp,
      avif,
      webpSrcSet,
      avifSrcSet,
      alt,
      width,
      height,
      sizes = '100vw',
      priority = 'low',
      lazyLoad = true,
      threshold = 0.1,
      placeholderColor = 'transparent',
      placeholderBlur,
      objectFit = 'cover',
      objectPosition = 'center',
      fadeDuration = 0.3,
      onLoad,
      onError,
      className = '',
      imgClassName = '',
      style,
    },
    ref
  ) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const quality = getAdaptiveQuality();

    // Intersection observer for lazy loading
    const [lazyRef, isVisible] = useIntersectionObserver({
      threshold,
      rootMargin: '50px 0px',
      triggerOnce: true,
    });

    // Build srcSet string
    const buildSrcSet = useCallback((sources: ImageSource[] | undefined) => {
      if (!sources) return undefined;
      return sources.map((s) => `${s.src} ${s.width}w`).join(', ');
    }, []);

    // Filter srcSets based on quality
    const filterByQuality = useCallback(
      (sources: ImageSource[] | undefined) => {
        if (!sources) return undefined;
        if (quality.imageQuality === 'low') {
          return sources.filter((s) => s.quality && s.quality <= 50);
        }
        if (quality.imageQuality === 'medium') {
          return sources.filter((s) => !s.quality || s.quality <= 75);
        }
        return sources;
      },
      [quality.imageQuality]
    );

    const filteredSrcSet = filterByQuality(srcSet);
    const filteredWebpSrcSet = filterByQuality(webpSrcSet);
    const filteredAvifSrcSet = filterByQuality(avifSrcSet);

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setHasError(true);
      onError?.(new Error('Failed to load image'));
    }, [onError]);

    const shouldRender = !lazyLoad || isVisible || priority === 'high';
    const shouldPreload = priority === 'high' && lazyLoad;

    // Preload high priority images
    if (shouldPreload) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }

    const containerStyle = {
      backgroundColor: placeholderColor,
      aspectRatio: width && height ? `${width}/${height}` : undefined,
    };

    const imageStyle = {
      objectFit,
      objectPosition,
    };

    const blurStyle = placeholderBlur
      ? {
          backgroundImage: `url(${placeholderBlur})`,
          backgroundSize: 'cover',
          backgroundPosition: objectPosition,
        }
      : {};

    return (
      <div
        ref={(el) => {
          if (lazyLoad) (lazyRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={`relative overflow-hidden ${className}`}
        style={{ ...containerStyle, ...blurStyle, ...style }}
        role="img"
        aria-label={alt}
      >
        {/* Loading placeholder */}
        <AnimatePresence>
          {!isLoaded && !hasError && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeDuration }}
              className="absolute inset-0 flex items-center justify-center"
              style={blurStyle}
            >
              {!placeholderBlur && (
                <Loader
                  className="w-6 h-6 text-white/30 animate-spin"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error placeholder */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <span className="text-neutral-500 text-sm">Image unavailable</span>
          </div>
        )}

        {/* Image with modern formats */}
        {shouldRender && (
          <picture>
            {/* AVIF format (best compression) */}
            {(avif || filteredAvifSrcSet) && (
              <source
                srcSet={buildSrcSet(filteredAvifSrcSet) || avif}
                type="image/avif"
                sizes={sizes}
              />
            )}

            {/* WebP format (wide support) */}
            {(webp || filteredWebpSrcSet) && (
              <source
                srcSet={buildSrcSet(filteredWebpSrcSet) || webp}
                type="image/webp"
                sizes={sizes}
              />
            )}

            {/* Fallback to original format */}
            <motion.img
              ref={(el) => {
                imgRef.current = el;
                if (typeof ref === 'function') {
                  ref(el);
                } else if (ref) {
                  ref.current = el;
                }
              }}
              src={src}
              srcSet={buildSrcSet(filteredSrcSet)}
              sizes={sizes}
              alt={alt}
              width={width}
              height={height}
              loading={lazyLoad && priority !== 'high' ? 'lazy' : 'eager'}
              decoding={priority === 'high' ? 'sync' : 'async'}
              onLoad={handleLoad}
              onError={handleError}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: fadeDuration }}
              className={`absolute inset-0 w-full h-full ${imgClassName}`}
              style={imageStyle}
            />
          </picture>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

// ============================================
// Avatar Component
// ============================================

export interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt, size = 'md', fallback, className = '' }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const initials = fallback || alt.charAt(0).toUpperCase();

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-neutral-700 ${className}`}
      role="img"
      aria-label={alt}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-700 text-white text-sm font-medium">
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

// ============================================
// Gallery Image Component
// ============================================

export interface GalleryImageProps extends ResponsiveImageProps {
  onClick?: () => void;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

export function GalleryImage({
  onClick,
  overlay = true,
  overlayContent,
  className = '',
  ...props
}: GalleryImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-lg cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      aria-label={`View ${props.alt}`}
    >
      <OptimizedImage {...props} className="w-full h-full transition-transform duration-300 group-hover:scale-105" />

      {overlay && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              {overlayContent}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default OptimizedImage;
