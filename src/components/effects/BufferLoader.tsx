import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BufferLoaderProps {
  onComplete: () => void;
}

export function BufferLoader({ onComplete }: BufferLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [bufferWidth, setBufferWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate buffer loading
    const bufferInterval = setInterval(() => {
      setBufferWidth((prev) => {
        if (prev >= 100) {
          clearInterval(bufferInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Progress follows buffer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = Math.min(bufferWidth, 100);
        if (prev >= target) return prev;
        return prev + Math.random() * 8 + 2;
      });
    }, 50);

    return () => {
      clearInterval(bufferInterval);
      clearInterval(progressInterval);
    };
  }, [bufferWidth]);

  useEffect(() => {
    if (progress >= 100 && bufferWidth >= 100) {
      setTimeout(() => setIsReady(true), 500);
    }
  }, [progress, bufferWidth]);

  const handleEnter = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Particle-like floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-white/60 text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome to
          </motion.p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">
            X-ERA-ONE
          </h1>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 mt-2 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            UNIVERSE
          </motion.p>
        </motion.div>

        {/* Buffer loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 md:w-96 h-1 relative mb-8"
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden">
            {/* Buffer (white glow) */}
            <motion.div
              className="absolute h-full bg-white/20 rounded-full"
              animate={{ width: `${Math.min(bufferWidth, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Progress */}
            <motion.div
              className="absolute h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4)]"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: `translateX(${progress - 50}%)`,
            }}
          />
        </motion.div>

        {/* Loading percentage */}
        <AnimatePresence>
          {!isReady && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/50 text-sm tracking-widest"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={handleEnter}
              className="px-12 py-4 text-white text-lg tracking-widest uppercase border-2 border-white/30 rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Enter Universe</span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors" />
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20" />
    </div>
  );
}

export default BufferLoader;
