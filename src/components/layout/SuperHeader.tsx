import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useUniverseStore } from '@/store';
import type { WorldId } from '@/types';

const worlds: { id: WorldId; name: string; color: string; activeColor: string }[] = [
  { id: 'studios', name: 'STUDIOS', color: '#ff2020', activeColor: 'bg-gradient-to-b from-[#ff2020] to-[#cc0000]' },
  { id: 'max', name: 'MAX', color: '#00d4ff', activeColor: 'bg-gradient-to-b from-[#00d4ff] to-[#0099cc]' },
  { id: 'infinity', name: 'INFINITY', color: '#00ff6a', activeColor: 'bg-gradient-to-b from-[#00ff6a] to-[#00cc55]' },
];

export function SuperHeader() {
  const navigate = useNavigate();
  const params = useParams<{ worldId?: string }>();
  const currentWorld = useUniverseStore((state) => state.currentWorld);
  const hasEntered = useUniverseStore((state) => state.hasEntered);

  // Determine active world from URL params or store
  const activeWorld: WorldId = (params.worldId as WorldId) || currentWorld || 'max';

  const handleWorldSelect = (worldId: WorldId) => {
    navigate(`/${worldId}`);
  };

  // Don't show if hasn't entered the universe yet
  if (!hasEntered) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Color bar strip with gradients */}
      <div className="flex h-1">
        <div className="flex-1 bg-gradient-to-r from-[#ff2020] to-[#ff4040]" />
        <div className="flex-1 bg-gradient-to-r from-[#00a0ff] to-[#00d4ff]" />
        <div className="flex-1 bg-gradient-to-r from-[#00cc55] to-[#00ff6a]" />
      </div>

      {/* Navigation container */}
      <div className="bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">X</span>
                <div className="absolute inset-0 border-2 border-white/30 rounded" />
              </div>
              <span className="text-lg font-semibold tracking-widest text-white/90 group-hover:text-white transition-colors">
                X-ERA ONE
              </span>
            </motion.button>

            {/* World tabs */}
            <div className="flex items-center">
              {worlds.map((world) => {
                const isActive = activeWorld === world.id;
                return (
                  <motion.button
                    key={world.id}
                    onClick={() => handleWorldSelect(world.id)}
                    className="relative px-6 py-3 mx-1 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                    style={{
                      color: isActive ? world.color : 'rgba(255,255,255,0.5)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeWorld"
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Background glow */}
                          <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                              backgroundColor: `${world.color}15`,
                            }}
                          />
                          {/* Bottom border */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                            style={{
                              background: world.color,
                              boxShadow: `0 0 10px ${world.color}, 0 0 20px ${world.color}`,
                            }}
                            layoutId="activeBorder"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Text */}
                    <span className="relative z-10">{world.name}</span>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: `${world.color}10`,
                      }}
                    />
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
