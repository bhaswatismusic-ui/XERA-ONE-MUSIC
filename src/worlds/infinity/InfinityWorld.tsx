// ============================================
// Infinity World - Main Component
// Sections: Hero, About, Projects, Testimonials, Social, Connect, Footer
// ============================================

import { CinematicBackground } from '@/components/effects';
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
  { name: 'Spotify', handle: 'X-ERA Infinity', url: 'https://open.spotify.com', color: '#1DB954', description: 'AI research podcast & talks' },
];

export function InfinityWorld() {
  const seoConfig = createWorldSEO(
    'infinity',
    'X-ERA Infinity',
    'AI research and automation solutions. Pushing the boundaries of intelligent systems and machine learning.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <InfinityHeader />

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Cinematic Background */}
        <CinematicBackground worldId="infinity" />

        {/* Main Content */}
        <div className="relative z-10 pt-28">
          <InfinityHero {...infinityData.hero} />

          <div id="about">
            <InfinityAbout {...infinityData.about} />
          </div>

          <InfinityProjects />

          <div id="testimonials">
            <InfinityTestimonials {...infinityData.testimonials} />
          </div>

          <SocialConnect worldColor={WORLD_COLOR} platforms={infinitySocialPlatforms} />

          <InfinityConnect />

          <WorldFooter
            worldName="INFINITY"
            worldColor={WORLD_COLOR}
            tagline="Pushing the boundaries of intelligent systems, machine learning, and automation."
          />
        </div>
      </div>
    </>
  );
}

export default InfinityWorld;
