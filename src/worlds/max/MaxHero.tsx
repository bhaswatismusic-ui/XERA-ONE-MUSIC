// ============================================
// Max Hero - Optimized for Performance
// ============================================

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { HeroVideo } from '@/components/video';
import { Container } from '@/components/ui';
import type { VideoConfig } from '@/types';

interface MaxHeroProps {
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

export function MaxHero({
  headline,
  subheadline,
  description,
  cta,
  stats,
  video,
}: MaxHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020814' }}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          video={video}
          overlay
          overlayOpacity={0.7}
          overlayGradient
        />
      </div>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <Container className="relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full"
            style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', border: '1px solid rgba(0, 191, 255, 0.3)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00BFFF' }} />
            <span className="text-sm font-medium" style={{ color: '#00BFFF' }}>{subheadline}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
            style={{ textShadow: '0 0 80px rgba(0, 191, 255, 0.3)' }}
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
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-black bg-white rounded-lg transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#00d4ff';
                el.style.color = '#000000';
                el.style.boxShadow = '0 0 20px rgba(0,212,255,0.7), 0 0 40px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.2)';
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
                el.style.background = '#00d4ff';
                el.style.color = '#000000';
                el.style.boxShadow = '0 0 20px rgba(0,212,255,0.7), 0 0 40px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.2)';
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
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#00BFFF' }}>
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

export default MaxHero;
