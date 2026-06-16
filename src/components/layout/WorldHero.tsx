import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { WorldConfig } from '@/types';
import { HeroVideo } from '@/components/video';
import { LinkButton, Container } from '@/components/ui';
import {
  heroTitleVariants,
  heroSubtextVariants,
  heroCtaVariants,
  staggerContainer,
  staggerItem,
} from '@/hooks/useMotion';

interface WorldHeroProps {
  config: WorldConfig;
  worldIndex?: number;
}

export function WorldHero({ config, worldIndex = 0 }: WorldHeroProps) {
  const gradientTextClass =
    config.id === 'studios'
      ? 'text-gradient-studios'
      : config.id === 'max'
      ? 'text-gradient-max'
      : 'text-gradient-infinity';

  const glowClass =
    config.id === 'studios'
      ? 'glow-studios'
      : config.id === 'max'
      ? 'glow-max'
      : 'glow-infinity';

  const bgClass =
    config.id === 'studios'
      ? 'bg-world-studios'
      : config.id === 'max'
      ? 'bg-world-max'
      : 'bg-world-infinity';

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${bgClass}`}>
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          video={config.heroVideo}
          overlay
          overlayGradient
          overlayOpacity={0.5}
          priority
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          {/* World Badge */}
          <motion.div
            variants={staggerItem}
            className="mb-6"
          >
            <span
              className={`
                inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full
                ${config.id === 'studios' ? 'bg-studios-primary/20 text-studios-primary border border-studios-primary/30' : ''}
                ${config.id === 'max' ? 'bg-max-primary/20 text-max-primary border border-max-primary/30' : ''}
                ${config.id === 'infinity' ? 'bg-infinity-primary/20 text-infinity-primary border border-infinity-primary/30' : ''}
              `}
            >
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                config.id === 'studios' ? 'bg-studios-primary' :
                config.id === 'max' ? 'bg-max-primary' :
                'bg-infinity-primary'
              }`} />
              Welcome to {config.name}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={heroTitleVariants}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 ${gradientTextClass}`}
          >
            {config.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={heroSubtextVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-200 mb-8"
          >
            {config.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={heroSubtextVariants}
            className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl"
          >
            {config.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCtaVariants}
            className="flex flex-wrap gap-4"
          >
            <LinkButton
              href={config.cta.primary.href}
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className={glowClass}
            >
              {config.cta.primary.label}
            </LinkButton>

            {config.cta.secondary && (
              <LinkButton
                href={config.cta.secondary.href}
                size="lg"
                variant="outline"
              >
                {config.cta.secondary.label}
              </LinkButton>
            )}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-neutral-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default WorldHero;
