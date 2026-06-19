// ============================================
// Infinity World - Main Component
// ShaderBackground as full-page background
// ============================================

import { InfinitySmokeBackground } from '@/components/ui/InfinitySmokeBackground';
import { InfinityHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import { SocialConnect } from '@/components/layout/SocialConnect';
import { WorldFooter } from '@/components/layout/WorldFooter';
import {
  InfinityHero,
  InfinityAbout,
  InfinityProjects,
  InfinityTestimonials,
  InfinityConnect,
} from './';
import { infinityData } from '@/data/infinity';

const WORLD_COLOR = '#00ff6a';

const infinitySocialPlatforms = [
  { name: 'Instagram', handle: '@xerainfinity', url: 'https://instagram.com/xerainfinity', color: '#E4405F', description: 'AI breakthroughs & visual updates' },
  { name: 'YouTube', handle: '@XERAInfinity', url: 'https://youtube.com/@xerainfinity', color: '#FF0000', description: 'Research talks & tech demos' },
  { name: 'X / Twitter', handle: '@xerainfinity', url: 'https://twitter.com/xerainfinity', color: '#ffffff', description: 'Hot takes & AI discourse' },
  { name: 'LinkedIn', handle: 'X-ERA Infinity', url: 'https://linkedin.com/company/xerainfinity', color: '#0A66C2', description: 'Research papers & collaborations' },
  { name: 'GitHub', handle: 'xerainfinity', url: 'https://github.com/xerainfinity', color: '#ffffff', description: 'Open source projects & tools' },
  { name: 'Discord', handle: 'X-ERA Infinity', url: 'https://discord.gg/xerainfinity', color: '#5865F2', description: 'Community & developer chat' },
];

export function InfinityWorld() {
  const seoConfig = createWorldSEO(
    'infinity',
    'X-ERA Infinity',
    'AI research and automation solutions. Pushing the boundaries of intelligent systems and machine learning.'
  );

  return (
    <>
      <SEO {...seoConfig} />
      <InfinityHeader />

      {/* Neon green smoke — vertical columns from edges fading to center */}
      <InfinitySmokeBackground />

      <div className="relative min-h-screen overflow-hidden pt-28" style={{ isolation: 'isolate' }}>
        {/* Hero — fully transparent so shader shows */}
        <InfinityHero {...infinityData.hero} />

        {/* About */}
        <div id="about">
          <InfinityAbout {...infinityData.about} />
        </div>

        {/* Projects */}
        <InfinityProjects />

        {/* Testimonials */}
        <div id="testimonials">
          <InfinityTestimonials {...infinityData.testimonials} />
        </div>

        {/* Social Connect */}
        <SocialConnect worldColor={WORLD_COLOR} platforms={infinitySocialPlatforms} />

        {/* Connect - FAQ + Contact */}
        <InfinityConnect />

        {/* Footer */}
        <WorldFooter
          worldName="INFINITY"
          worldColor={WORLD_COLOR}
          tagline="Pushing the boundaries of intelligent systems, machine learning, and automation."
        />
      </div>
    </>
  );
}

export default InfinityWorld;
