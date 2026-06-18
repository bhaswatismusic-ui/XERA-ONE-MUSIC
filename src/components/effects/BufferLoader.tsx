import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BufferLoaderProps {
  onComplete: () => void;
}

// Stable random values generated once so they don't re-randomise on re-render
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}));

export function BufferLoader({ onComplete }: BufferLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Animate progress 0 → 100 over ~2.4 s
  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief pause then open the curtains
        setTimeout(() => setCurtainsOpen(true), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // After curtains fully open, signal completion and unmount
  useEffect(() => {
    if (!curtainsOpen) return;
    const t = setTimeout(() => {
      setHidden(true);
      onCompleteRef.current();
    }, 1300); // matches curtain transition duration
    return () => clearTimeout(t);
  }, [curtainsOpen]);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* ── Left curtain panel ──────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-auto"
        initial={{ x: 0 }}
        animate={curtainsOpen ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: 'linear-gradient(135deg, #050505 0%, #0c0c12 100%)' }}
      >
        {/* Neon seam — right edge of left panel */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] h-full"
          animate={curtainsOpen ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #00d4ff 30%, #ff2020 60%, #00ff6a 85%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Right curtain panel ─────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-auto"
        initial={{ x: 0 }}
        animate={curtainsOpen ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: 'linear-gradient(225deg, #050505 0%, #0c0c12 100%)' }}
      >
        {/* Neon seam — left edge of right panel */}
        <motion.div
          className="absolute top-0 left-0 w-[2px] h-full"
          animate={curtainsOpen ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #00ff6a 30%, #00d4ff 60%, #ff2020 85%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Welcome content — sits above both panels ────────────── */}
      <AnimatePresence>
        {!curtainsOpen && (
          <motion.div
            key="welcome"
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            {/* Floating particles */}
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white/25"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-14 h-14 border-l-2 border-t-2 border-white/15 rounded-tl" />
            <div className="absolute top-8 right-8 w-14 h-14 border-r-2 border-t-2 border-white/15 rounded-tr" />
            <div className="absolute bottom-8 left-8 w-14 h-14 border-l-2 border-b-2 border-white/15 rounded-bl" />
            <div className="absolute bottom-8 right-8 w-14 h-14 border-r-2 border-b-2 border-white/15 rounded-br" />

            {/* Text block */}
            <div className="text-center px-6">
              {/* "WELCOME TO" */}
              <motion.p
                className="text-xs md:text-sm tracking-[0.45em] uppercase text-white/50 mb-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Welcome to
              </motion.p>

              {/* X-ERA ONE — cycling neon */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-widest text-white"
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: [
                    '0 0 12px #00d4ff, 0 0 28px #00d4ff, 0 0 56px rgba(0,212,255,0.5)',
                    '0 0 12px #ff2020, 0 0 28px #ff2020, 0 0 56px rgba(255,32,32,0.5)',
                    '0 0 12px #00ff6a, 0 0 28px #00ff6a, 0 0 56px rgba(0,255,106,0.5)',
                    '0 0 12px #00d4ff, 0 0 28px #00d4ff, 0 0 56px rgba(0,212,255,0.5)',
                  ],
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.4 },
                  y: { duration: 0.7, delay: 0.4 },
                  textShadow: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                }}
              >
                X-ERA ONE
              </motion.h1>

              {/* UNIVERSE */}
              <motion.p
                className="text-lg md:text-2xl lg:text-3xl font-light tracking-[0.5em] text-white/70 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.65 }}
              >
                UNIVERSE
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="mt-12 w-56 md:w-80 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #00d4ff, #ffffff)',
                      boxShadow: '0 0 10px rgba(0,212,255,0.9)',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.08, ease: 'linear' }}
                  />
                </div>
                <p className="mt-3 text-center text-xs tracking-[0.3em] text-white/35">
                  {progress}%
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BufferLoader;
