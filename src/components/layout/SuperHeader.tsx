import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useUniverseStore } from '@/store';
import type { WorldId } from '@/types';

const worlds: { id: WorldId; name: string; color: string }[] = [
  { id: 'studios', name: 'STUDIOS', color: '#ff2020' },
  { id: 'max', name: 'MAX', color: '#00d4ff' },
  { id: 'infinity', name: 'INFINITY', color: '#00ff6a' },
];

export function SuperHeader() {
  const navigate = useNavigate();
  const params = useParams<{ worldId?: string }>();
  const currentWorld = useUniverseStore((state) => state.currentWorld);
  const hasEntered = useUniverseStore((state) => state.hasEntered);

  const activeWorld: WorldId = (params.worldId as WorldId) || currentWorld || 'max';

  const handleWorldSelect = (worldId: WorldId) => {
    navigate(`/${worldId}`);
  };

  if (!hasEntered) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Navigation container - no colored bar */}
      <div className="bg-black/95 backdrop-blur-lg border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <span className="text-xl font-bold text-white tracking-tighter">X</span>
                <div className="absolute inset-0 border border-white/20 rounded" />
              </div>
              <span className="text-sm font-semibold tracking-widest text-white/80 group-hover:text-white transition-colors uppercase">
                X-ERA ONE
              </span>
            </motion.button>

            {/* World tabs */}
            <div className="flex items-center gap-1">
              {worlds.map((world) => {
                const isActive = activeWorld === world.id;
                return (
                  <motion.button
                    key={world.id}
                    onClick={() => handleWorldSelect(world.id)}
                    className="relative px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg"
                    style={{
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeWorld"
                          className="absolute inset-0 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover layer */}
                    <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white/5" />

                    <span className="relative z-10">{world.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default SuperHeader;
