import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BufferLoaderProps {
  onComplete: () => void;
}

export function BufferLoader({ onComplete }: BufferLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [bufferWidth, setBufferWidth] = useState(0);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [done, setDone] = useState(false);

  // Drive the progress bar forward
  useEffect(() => {
    const bufferInterval = setInterval(() => {
      setBufferWidth((prev) => {
        if (prev >= 100) {
          clearInterval(bufferInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(bufferInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = Math.min(bufferWidth, 100);
        if (prev >= target) return prev;
        return prev + Math.random() * 8 + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [bufferWidth]);

  // Once 100 % is hit, trigger the curtains after a short pause
  useEffect(() => {
    if (progress >= 100 && bufferWidth >= 100 && !curtainsOpen) {
      const t = setTimeout(() => {
        setCurtainsOpen(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [progress, bufferWidth, curtainsOpen]);

  // Fire onComplete after curtain animation completes (1.2 s)
  useEffect(() => {
    if (curtainsOpen) {
      const t = setTimeout(() => {
        setDone(true);
        onComplete();
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [curtainsOpen, onComplete]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ── Particles ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 900),
            }}
            animate={{ y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 900)], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* ── Loader content (hidden once curtains start) ─── */}
      <AnimatePresence>
        {!curtainsOpen && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8"
          >
            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20" />

            {/* Title */}
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

              {/* Neon X-ERA-ONE */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider"
                style={{
                  color: '#ffffff',
                  textShadow:
                    '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px rgba(0,212,255,0.4)',
                }}
                animate={{
                  textShadow: [
                    '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px rgba(0,212,255,0.4)',
                    '0 0 15px #ff2020, 0 0 30px #ff2020, 0 0 60px #ff2020, 0 0 100px rgba(255,32,32,0.4)',
                    '0 0 10px #00ff6a, 0 0 20px #00ff6a, 0 0 40px #00ff6a, 0 0 80px rgba(0,255,106,0.4)',
                    '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px rgba(0,212,255,0.4)',
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                X-ERA-ONE
              </motion.h1>

              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 mt-2 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                UNIVERSE
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 md:w-96 h-1 relative mb-4">
              <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-white/20 rounded-full transition-all duration-100"
                  style={{ width: `${Math.min(bufferWidth, 100)}%` }}
                />
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff, #ffffff)',
                    boxShadow: '0 0 12px rgba(0,212,255,0.8)',
                  }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            <p className="text-white/50 text-sm tracking-widest">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Left curtain ────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-20"
        style={{
          background: 'linear-gradient(to right, #000000, #0a0a0a)',
          originX: 0,
        }}
        animate={curtainsOpen ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Inner edge glow */}
        <div
          className="absolute top-0 right-0 w-1 h-full"
          style={{
            background: curtainsOpen
              ? 'none'
              : 'linear-gradient(to bottom, transparent, #00d4ff, #ff2020, #00ff6a, transparent)',
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* ── Right curtain ───────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-20"
        style={{
          background: 'linear-gradient(to left, #000000, #0a0a0a)',
          originX: 1,
        }}
        animate={curtainsOpen ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Inner edge glow */}
        <div
          className="absolute top-0 left-0 w-1 h-full"
          style={{
            background: curtainsOpen
              ? 'none'
              : 'linear-gradient(to bottom, transparent, #ff2020, #00d4ff, #00ff6a, transparent)',
            opacity: 0.6,
          }}
        />
      </motion.div>
    </div>
  );
}

export default BufferLoader;
