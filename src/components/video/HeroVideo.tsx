import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeroVideoProps, VideoConfig } from '@/types';
import { fadeInUp } from '@/hooks/useMotion';

// Default video configuration
const defaultVideoConfig: Partial<VideoConfig> = {
  mimeType: 'video/mp4',
  width: 1920,
  height: 1080,
  aspectRatio: '16:9',
};

// Loading skeleton component
function VideoSkeleton({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-neutral-900 animate-pulse ${className || ''}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-shimmer" />
    </div>
  );
}

// Fallback image component
function VideoFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}

export function HeroVideo({
  video,
  overlay = true,
  overlayOpacity = 0.5,
  overlayGradient = false,
  loop = true,
  muted = true,
  autoplay = true,
  playsInline = true,
  lazy = true,
  priority = false,
  fallbackComponent,
  className = '',
  onLoad,
  onError,
}: HeroVideoProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge provided config with defaults
  const config: VideoConfig = {
    ...defaultVideoConfig,
    ...video,
  };

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Handle video load
  const handleLoadedData = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  // Handle video error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    const error = new Error(`Failed to load video: ${config.src}`);
    onError?.(error);
  }, [config.src, onError]);

  // Attempt to play video (for autoplay)
  const attemptPlay = useCallback(async () => {
    const videoEl = videoRef.current;
    if (!videoEl || !autoplay) return;

    try {
      await videoEl.play();
    } catch (err) {
      // Autoplay may be blocked by browser, this is handled by muted attribute
      console.warn('Video autoplay may be blocked:', err);
    }
  }, [autoplay]);

  // Auto-play when video is ready
  useEffect(() => {
    if (isInView && videoRef.current && autoplay) {
      attemptPlay();
    }
  }, [isInView, attemptPlay, autoplay]);

  // Handle reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Mobile optimization - pause video when not visible to save resources
  useEffect(() => {
    if (!videoRef.current) return;

    const videoEl = videoRef.current;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoplay && !hasError) {
            videoEl.play().catch(() => {});
          }
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    visibilityObserver.observe(videoEl);

    return () => visibilityObserver.disconnect();
  }, [autoplay, hasError]);

  const showFallback = hasError;
  const showLoading = isLoading && isInView;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      role="img"
      aria-label={config.alt || 'Video background'}
    >
      {/* Loading skeleton */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <VideoSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback image when video fails or for mobile optimization */}
      <AnimatePresence>
        {(showFallback || (lazy && !isInView)) && (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-5"
          >
            {fallbackComponent || (
              <VideoFallback
                src={config.fallbackImage}
                alt={config.alt || 'Video background fallback'}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video element */}
      {isInView && !hasError && (
        <motion.video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...fadeInUp.transition, duration: 1 }}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          poster={config.poster}
          onLoadedData={handleLoadedData}
          onError={handleError}
          preload={priority ? 'auto' : 'metadata'}
          aria-hidden="true"
        >
          <source src={config.src} type={config.mimeType} />
          {/* Fallback message for browsers that don't support video */}
          Your browser does not support the video tag.
        </motion.video>
      )}

      {/* Video overlay for text readability */}
      {overlay && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: overlayGradient
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)'
              : `rgba(0, 0, 0, ${overlayOpacity})`,
          }}
        />
      )}

      {/* Gradient overlay for additional depth */}
      {overlayGradient && (
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      )}
    </div>
  );
}

// Contained video component for inline use
export function VideoInline({
  video,
  controls = false,
  loop = true,
  muted = true,
  autoplay = false,
  className = '',
}: {
  video: VideoConfig;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const config: VideoConfig = {
    ...defaultVideoConfig,
    ...video,
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError && (
        <img
          src={config.fallbackImage}
          alt={config.alt || 'Video thumbnail'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={controls}
        loop={loop}
        muted={muted}
        autoPlay={autoplay}
        playsInline
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        poster={config.poster}
      >
        <source src={config.src} type={config.mimeType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

// Video with play button for user-initiated playback
export function VideoWithControls({
  video,
  thumbnail,
  className = '',
  onPlay,
}: {
  video: VideoConfig;
  thumbnail?: string;
  className?: string;
  onPlay?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const config: VideoConfig = {
    ...defaultVideoConfig,
    ...video,
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
    onPlay?.();
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Thumbnail/Play button */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
          aria-label="Play video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all shadow-xl">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Thumbnail image */}
      {!isPlaying && (
        <img
          src={thumbnail || config.poster || config.fallbackImage}
          alt={config.alt || 'Video thumbnail'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={isPlaying}
        playsInline
        poster={thumbnail || config.poster}
      >
        <source src={config.src} type={config.mimeType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default HeroVideo;
