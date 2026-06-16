// ============================================
// World Loader Component
// Handles loading states and progressive reveal for each world
// ============================================

import { useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniverseStore } from '@/store';

// ============================================
// Loading Configuration
// ============================================

export interface WorldLoaderConfig {
  minDuration?: number;
  showProgress?: boolean;
  showText?: boolean;
  customLoader?: ReactNode;
}

const worldLoaderConfigs: Record<string, WorldLoaderConfig & { color: string }> = {
  studios: {
    color: '#FF2A2A',
    minDuration: 800,
    showProgress: true,
    showText: true,
  },
  max: {
    color: '#00BFFF',
    minDuration: 900,
    showProgress: true,
    showText: true,
  },
  infinity: {
    color: '#39FF88',
    minDuration: 850,
    showProgress: true,
    showText: true,
  },
};

// ============================================
// World Loader Component
// ============================================

interface WorldLoaderProps {
  worldId: 'studios' | 'max' | 'infinity';
  isLoading?: boolean;
  config?: WorldLoaderConfig;
  children: ReactNode;
  onLoadComplete?: () => void;
}

export function WorldLoader({
  worldId,
  isLoading: externalLoading,
  config,
  children,
  onLoadComplete,
}: WorldLoaderProps) {
  const [internalLoading, setInternalLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const reducedMotion = useUniverseStore((state) => state.reducedMotion);
  const loaderConfig = { ...worldLoaderConfigs[worldId], ...config };
  const isLoading = externalLoading ?? internalLoading;

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setInternalLoading(false);
      setShowContent(true);
      onLoadComplete?.();
      return;
    }

    const minDuration = loaderConfig.minDuration ?? 800;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setInternalLoading(false);
        setShowContent(true);
        onLoadComplete?.();
      }, 300);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [loaderConfig.minDuration, onLoadComplete, reducedMotion]);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
            {/* World-specific loader */}
            {loaderConfig.customLoader || (
              <>
                {/* Logo animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-24 h-24 rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: loaderConfig.color,
                      borderRightColor: loaderConfig.color,
                    }}
                  />

                  {/* Inner ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-3 rounded-full border-2 border-transparent"
                    style={{
                      borderBottomColor: loaderConfig.color,
                      borderLeftColor: loaderConfig.color,
                    }}
                  />

                  {/* Center dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: loaderConfig.color }}
                    />
                  </motion.div>
                </motion.div>

                {/* Loading text */}
                {loaderConfig.showText && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 text-center"
                  >
                    <motion.div
                      className="text-xl font-bold tracking-widest uppercase"
                      style={{ color: loaderConfig.color }}
                    >
                      {worldId}
                    </motion.div>
                    <motion.div
                      className="mt-2 text-sm text-white/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Loading...
                    </motion.div>
                  </motion.div>
                )}

                {/* Progress bar */}
                {loaderConfig.showProgress && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: loaderConfig.color }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}

                {/* Percentage */}
                {loaderConfig.showProgress && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-white/30 font-mono"
                  >
                    {Math.min(Math.round(progress), 100)}%
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with reveal animation */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// Quick Loader (for transitions between sections)
// ============================================

interface QuickLoaderProps {
  color?: string;
  duration?: number;
}

export function QuickLoader({ color = '#FF2A2A', duration = 300 }: QuickLoaderProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: duration / 1000 }}
      className="fixed top-0 left-0 right-0 h-1 z-50"
      style={{ backgroundColor: color, transformOrigin: 'left' }}
    />
  );
}

export default WorldLoader;
