// ============================================
// Studios World - Main Component
// Sections: Hero, Services, Portfolio, Process, Team, Testimonials, Social, Connect, Footer
// Red neon glow styling
// ============================================

import { CinematicBackground } from '@/components/effects';
import { StudiosHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import { SocialConnect } from '@/components/layout/SocialConnect';
import { WorldFooter } from '@/components/layout/WorldFooter';
import {
  StudiosHero,
  StudiosServices,
  StudiosPortfolio,
  StudiosProcess,
  StudiosTeam,
  StudiosTestimonials,
  StudiosConnect,
} from './';
import { studiosData } from '@/data/studios';

const WORLD_COLOR = '#ff2020'; // Red neon

const studiosSocialPlatforms = [
  { name: 'Instagram', handle: '@xerastudios', url: 'https://instagram.com/xerastudios', color: '#E4405F', description: 'Behind-the-scenes & BTS footage' },
  { name: 'YouTube', handle: '@XERAStudios', url: 'https://youtube.com/@xerastudios', color: '#FF0000', description: 'Films, showreels & production stories' },
  { name: 'X / Twitter', handle: '@xerastudios', url: 'https://twitter.com/xerastudios', color: '#ffffff', description: 'Updates, industry thoughts & more' },
  { name: 'LinkedIn', handle: 'X-ERA Studios', url: 'https://linkedin.com/company/xerastudios', color: '#0A66C2', description: 'Professional network & partnerships' },
  { name: 'Vimeo', handle: 'xerastudios', url: 'https://vimeo.com/xerastudios', color: '#1AB7EA', description: 'High-quality portfolio & reel' },
];

export function StudiosWorld() {
  const seoConfig = createWorldSEO(
    'studios',
    'X-ERA Studios',
    'Creative storytelling and media production. We craft compelling visual content that captivates audiences and drives results.'
  );

  return (
    <>
      <SEO {...seoConfig} />
      <StudiosHeader />

      <div className="relative min-h-screen overflow-hidden bg-black">
        <CinematicBackground worldId="studios" />

        <div className="relative z-10 pt-28">
          {/* Hero Section */}
          <StudiosHero {...studiosData.hero} />

          {/* Services */}
          <div id="services">
            <StudiosServices {...studiosData.services} />
          </div>

          {/* Portfolio */}
          <div id="portfolio">
            <StudiosPortfolio {...studiosData.portfolio} />
          </div>

          {/* Process */}
          <div id="process">
            <StudiosProcess {...studiosData.process} />
          </div>

          {/* Team */}
          <div id="team">
            <StudiosTeam {...studiosData.team} />
          </div>

          {/* Testimonials */}
          <div id="testimonials">
            <StudiosTestimonials {...studiosData.testimonials} />
          </div>

          {/* Social Connect */}
          <SocialConnect worldColor={WORLD_COLOR} platforms={studiosSocialPlatforms} />

          {/* Connect - Get a Quote + FAQ */}
          <div id="connect">
            <StudiosConnect />
          </div>

          {/* Modern Footer */}
          <WorldFooter
            worldName="STUDIOS"
            worldColor={WORLD_COLOR}
            tagline="Cinematic storytelling that moves people. From concept to screen, we craft visual experiences that define brands."
          />
        </div>
      </div>
    </>
  );
}

export default StudiosWorld;
