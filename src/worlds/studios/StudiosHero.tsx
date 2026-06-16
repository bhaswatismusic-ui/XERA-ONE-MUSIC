// ============================================
// Studios Hero - Optimized for Performance
// ============================================

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { HeroVideo } from '@/components/video';
import { Container } from '@/components/ui';
import type { VideoConfig } from '@/types';

interface StudiosHeroProps {
  headline: string;
  subheadline: string;
  description: string;
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  stats: Array<{ value: string; label: string }>;
  video: VideoConfig;
}

export function StudiosHero({
  headline,
  subheadline,
  description,
  cta,
  stats,
  video,
}: StudiosHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          video={video}
          overlay
          overlayOpacity={0.6}
          overlayGradient
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-studios-primary/20 border border-studios-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-studios-primary" />
            <span className="text-sm font-medium text-studios-primary">{subheadline}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
            style={{ textShadow: '0 0 80px rgba(255, 42, 42, 0.3)' }}
          >
            {headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-2xl"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href={cta.primary.href}
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-black bg-white rounded-lg transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ff2020';
                el.style.color = '#ffffff';
                el.style.boxShadow = '0 0 20px rgba(255,32,32,0.7), 0 0 40px rgba(255,32,32,0.4), 0 0 60px rgba(255,32,32,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ffffff';
                el.style.color = '#000000';
                el.style.boxShadow = '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)';
              }}
            >
              {cta.primary.label}
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={cta.secondary.href}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-black bg-white rounded-lg transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ff2020';
                el.style.color = '#ffffff';
                el.style.boxShadow = '0 0 20px rgba(255,32,32,0.7), 0 0 40px rgba(255,32,32,0.4), 0 0 60px rgba(255,32,32,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ffffff';
                el.style.color = '#000000';
                el.style.boxShadow = '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)';
              }}
            >
              {cta.secondary.label}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-studios-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default StudiosHero;
