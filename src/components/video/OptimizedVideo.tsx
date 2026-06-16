// ============================================
// Optimized Video Component
// Production-ready video with lazy loading, adaptive quality, and accessibility
// ============================================

import { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from 'lucide-react';
import { useIntersectionObserver, getAdaptiveQuality, getDeviceCapabilities } from '@/utils/performance';

// ============================================
// Video Configuration
// ============================================

export interface VideoSource {
  src: string;
  type: string;
  quality?: 'low' | 'medium' | 'high';
}

export interface OptimizedVideoProps {
  sources: VideoSource[];
  poster?: string;
  posterWebp?: string;
  posterAvif?: string;
  alt?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  lazyLoad?: boolean;
  threshold?: number;
  priority?: 'high' | 'low';
  placeholderColor?: string;
  aspectRatio?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onLoaded?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================
// Optimized Video Component
// ============================================

export const OptimizedVideo = forwardRef<HTMLVideoElement, OptimizedVideoProps>(
  (
    {
      sources,
      poster,
      posterWebp,
      posterAvif,
      alt = 'Video content',
      autoPlay = false,
      muted = true,
      loop = true,
      controls = false,
      lazyLoad = true,
      threshold = 0.1,
      priority = 'low',
      placeholderColor = '#000',
      aspectRatio = '16/9',
      onPlay,
      onPause,
      onEnded,
      onLoaded,
      onError,
      className = '',
      style,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [showControls, setShowControls] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const quality = getAdaptiveQuality();
    const caps = getDeviceCapabilities();

    // Determine if we should autoplay
    const shouldAutoplay = autoPlay && !caps.prefersReducedMotion && quality.videoAutoplay;

    // Filter sources by quality
    const filteredSources = sources.filter((source) => {
      if (!source.quality) return true;
      if (quality.videoQuality === 'low') return source.quality === 'low';
      if (quality.videoQuality === 'medium') return source.quality === 'medium' || source.quality === 'low';
      return true;
    });

    // Intersection observer for lazy loading
    const [lazyRef, isVisible] = useIntersectionObserver({
      threshold,
      rootMargin: '100px',
      triggerOnce: !loop,
    });

    // Use the ref callback to set both refs
    const setRefs = useCallback(
      (el: HTMLVideoElement | null) => {
        videoRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref]
    );

    // Handle play/pause
    useEffect(() => {
      if (!videoRef.current || !isVisible || !shouldAutoplay) return;

      const video = videoRef.current;

      if (isPlaying) {
        video.play().catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Video autoplay failed:', err);
            setIsPlaying(false);
          }
        });
      } else {
        video.pause();
      }
    }, [isPlaying, isVisible, shouldAutoplay]);

    // Handle visibility change
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (!videoRef.current) return;

        if (document.hidden && isPlaying) {
          videoRef.current.pause();
        } else if (!document.hidden && isVisible && shouldAutoplay) {
          videoRef.current.play().catch(() => {});
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isPlaying, isVisible, shouldAutoplay]);

    // Event handlers
    const handleLoadedData = useCallback(() => {
      setIsLoaded(true);
      onLoaded?.();
    }, [onLoaded]);

    const handleError = useCallback(() => {
      const err = new Error('Video failed to load');
      setError(err.message);
      onError?.(err);
    }, [onError]);

    const handlePlay = useCallback(() => {
      setIsPlaying(true);
      onPlay?.();
    }, [onPlay]);

    const handlePause = useCallback(() => {
      setIsPlaying(false);
      onPause?.();
    }, [onPause]);

    const handleEnded = useCallback(() => {
      setIsPlaying(false);
      onEnded?.();
    }, [onEnded]);

    const togglePlay = useCallback(() => {
      if (!videoRef.current) return;
      setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
      if (!videoRef.current) return;
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }, [isMuted]);

    const toggleFullscreen = useCallback(async () => {
      if (!containerRef.current) return;

      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.warn('Fullscreen error:', err);
      }
    }, []);

    // Preload video if priority is high
    useEffect(() => {
      if (priority === 'high' && sources[0]) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = sources[0].src;
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }, [sources, priority]);

    const shouldRender = !lazyLoad || isVisible;

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (lazyLoad) (lazyRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={`relative overflow-hidden ${className}`}
        style={{
          aspectRatio,
          backgroundColor: placeholderColor,
          ...style,
        }}
        onMouseEnter={() => controls && setShowControls(true)}
        onMouseLeave={() => controls && setShowControls(false)}
        onFocus={() => controls && setShowControls(true)}
        onBlur={() => controls && setShowControls(false)}
        role="figure"
        aria-label={alt}
      >
        {/* Placeholder */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              {posterAvif || posterWebp || poster ? (
                <picture>
                  {posterAvif && <source srcSet={posterAvif} type="image/avif" />}
                  {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
                  <img
                    src={poster}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              ) : (
                <Loader className="w-8 h-8 text-white/50 animate-spin" aria-hidden="true" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Element */}
        {shouldRender && (
          <video
            ref={setRefs}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop={loop}
            autoPlay={shouldAutoplay && isVisible}
            poster={poster}
            preload={priority === 'high' ? 'auto' : 'metadata'}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            aria-label={alt}
          >
            {filteredSources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
            <track kind="captions" />
          </video>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <p className="text-white/70 text-sm">Video unavailable</p>
          </div>
        )}

        {/* Custom Controls Overlay */}
        {controls && (
          <AnimatePresence>
            {(showControls || !isPlaying) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" aria-hidden="true" />
                  )}
                </button>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Volume2 className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  }
);

OptimizedVideo.displayName = 'OptimizedVideo';

// ============================================
// Background Video Component
// ============================================

export interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export function BackgroundVideo({
  src,
  poster,
  overlay = true,
  overlayOpacity = 0.5,
  className = '',
}: BackgroundVideoProps) {
  const quality = getAdaptiveQuality();

  // Don't render video on low-end devices
  if (!quality.videoAutoplay) {
    return poster ? (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    ) : null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ============================================
// YouTube Embed Component
// ============================================

export interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  start?: number;
  autoplay?: boolean;
  lazyLoad?: boolean;
  className?: string;
  aspectRatio?: string;
}

export function YouTubeEmbed({
  videoId,
  title,
  start = 0,
  autoplay = false,
  lazyLoad = true,
  className = '',
  aspectRatio = '16/9',
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);

  const [lazyRef, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (isVisible && lazyLoad && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isVisible, lazyLoad, shouldLoad]);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?start=${start}${autoplay ? '&autoplay=1' : ''}&rel=0&modestbranding=1`;

  return (
    <div
      ref={(el) => {
        if (lazyLoad) (lazyRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <button
            onClick={() => setShouldLoad(true)}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={`Play video: ${title}`}
          >
            <Play className="w-6 h-6 ml-1" aria-hidden="true" />
          </button>
        </div>
      )}

      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      )}
    </div>
  );
}

export default OptimizedVideo;
