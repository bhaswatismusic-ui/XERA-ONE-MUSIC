import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { universeConfig, worldConfigs } from '@/data';
import { useUniverseStore } from '@/store';
import { Container } from '@/components/ui';
import {
  ParticleField,
  FloatingElements,
  AnimatedXLogo,
  PortalCard,
  PortalTransition,
  CinematicBackground,
} from '@/components/effects';
import { StudiosWorld } from './studios';
import { MaxWorld } from './max';
import { InfinityWorld } from './infinity';
import { WorldId } from '@/types';

export function Gateway() {
  const enterWorld = useUniverseStore((state) => state.enterWorld);
  const setTransitionComplete = useUniverseStore((state) => state.setTransitionComplete);
  const currentWorld = useUniverseStore((state) => state.currentWorld);
  const isTransitioning = useUniverseStore((state) => state.isTransitioning);
  const viewState = useUniverseStore((state) => state.viewState);

  // Set document metadata
  useEffect(() => {
    document.title = `${universeConfig.name} | ${universeConfig.tagline}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', universeConfig.description);
    }
  }, []);

  // Handle portal entrance
  const handleEnterWorld = (worldId: WorldId) => {
    enterWorld(worldId);
  };

  // Handle transition complete
  const handleTransitionComplete = () => {
    setTransitionComplete();
  };

  // If we're in a world view, render the appropriate world
  if (viewState === 'world' && currentWorld) {
    if (currentWorld === 'studios') {
      return <StudiosWorld />;
    }
    if (currentWorld === 'max') {
      return <MaxWorld />;
    }
    if (currentWorld === 'infinity') {
      return <InfinityWorld />;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* Background particle field */}
      <ParticleField
        particleCount={60}
        colors={['#ffffff', '#6366f1', '#8b5cf6', '#00d4ff']}
        speed={0.2}
      />

      {/* Floating geometric elements */}
      <FloatingElements count={15} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero section with animated logo */}
        <section className="flex-1 flex flex-col items-center justify-center pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            {/* Animated X Logo */}
            <AnimatedXLogo size={300} />

            {/* Universe name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white"
              style={{
                textShadow: '0 0 60px rgba(255,255,255,0.3)',
              }}
            >
              {universeConfig.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-4 text-xl md:text-2xl text-white/60 tracking-wide"
            >
              {universeConfig.tagline}
            </motion.p>
          </motion.div>

          {/* Scroll prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-xs uppercase tracking-widest">Choose Your Path</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Portal cards section */}
        <section className="pb-24 md:pb-32">
          <Container>
            {/* Section title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore the Worlds
              </h2>
              <p className="text-white/50 max-w-lg mx-auto">
                Each portal leads to a unique dimension within our universe.
                Choose your destination.
              </p>
            </motion.div>

            {/* Portal cards grid */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {Object.values(worldConfigs).map((config, index) => (
                <PortalCard
                  key={config.id}
                  config={config}
                  index={index}
                  onEnter={() => handleEnterWorld(config.id)}
                  isEntering={isTransitioning && currentWorld === config.id}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Bottom atmospheric gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Portal transition overlay */}
      <PortalTransition
        worldId={currentWorld}
        isTransitioning={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
}

// Placeholder for worlds not yet built
function WorldPlaceholder({ worldId }: { worldId: WorldId }) {
  const exitWorld = useUniverseStore((state) => state.exitWorld);
  const config = worldConfigs[worldId];

  useEffect(() => {
    document.title = config.metadata.pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.metadata.pageDescription);
    }
  }, [config]);

  const colors = {
    studios: { primary: '#FF2A2A', glow: 'rgba(255, 42, 42, 0.5)' },
    max: { primary: '#00BFFF', glow: 'rgba(0, 191, 255, 0.5)' },
    infinity: { primary: '#39FF88', glow: 'rgba(57, 255, 136, 0.5)' },
  };

  const worldColors = colors[worldId];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CinematicBackground worldId={worldId} />
      <ParticleField
        particleCount={40}
        colors={[worldColors.primary, '#ffffff', worldColors.primary]}
        speed={0.15}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: worldColors.primary, textShadow: `0 0 60px ${worldColors.glow}` }}
          >
            {config.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-white/70 mb-4"
          >
            {config.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/50 mb-12"
          >
            Coming Soon
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={exitWorld}
            className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Return to Gateway
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Gateway;
