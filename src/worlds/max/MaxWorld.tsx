// ============================================
// Max World - Main Component
// Sections: Hero, About, Portfolio, Testimonials, Social, Merch, Contact, Footer
// Cyan neon glow styling
// ============================================

import { CinematicBackground } from '@/components/effects';
import { MaxHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import { SocialConnect } from '@/components/layout/SocialConnect';
import { WorldFooter } from '@/components/layout/WorldFooter';
import {
  MaxHero,
  MaxAbout,
  MaxPortfolio,
  MaxMerch,
  MaxTestimonials,
  MaxContact,
} from './';
import { maxData } from '@/data/max';

const WORLD_COLOR = '#00d4ff'; // Cyan neon

const maxSocialPlatforms = [
  { name: 'Instagram', handle: '@xeramax', url: 'https://instagram.com/xeramax', color: '#E4405F', description: 'Behind-the-scenes & daily updates' },
  { name: 'YouTube', handle: '@XERAMax', url: 'https://youtube.com/@xeramax', color: '#FF0000', description: 'Creator tutorials & features' },
  { name: 'X / Twitter', handle: '@xeramax', url: 'https://twitter.com/xeramax', color: '#ffffff', description: 'News, updates & engagement' },
  { name: 'LinkedIn', handle: 'X-ERA Max', url: 'https://linkedin.com/company/xeramax', color: '#0A66C2', description: 'Enterprise insights & partnerships' },
  { name: 'TikTok', handle: '@xeramax', url: 'https://tiktok.com/@xeramax', color: '#ffffff', description: 'Trending content & creators' },
  { name: 'Spotify', handle: 'X-ERA Max', url: 'https://open.spotify.com', color: '#1DB954', description: 'Creator podcasts & playlists' },
];

export function MaxWorld() {
  const seoConfig = createWorldSEO(
    'max',
    'X-ERA Max',
    'Digital media ecosystem and content distribution platform. Maximize your reach with data-driven media strategies.'
  );

  return (
    <>
      <SEO {...seoConfig} />
      <MaxHeader />

      <div className="relative min-h-screen overflow-hidden" style={{ background: '#020814' }}>
        <CinematicBackground worldId="max" />

        <div className="relative z-10 pt-28">
          {/* Hero Section */}
          <MaxHero {...maxData.hero} />

          {/* About */}
          <div id="about">
            <MaxAbout />
          </div>

          {/* Portfolio */}
          <div id="portfolio">
            <MaxPortfolio />
          </div>

          {/* Testimonials */}
          <div id="testimonials">
            <MaxTestimonials />
          </div>

          {/* Social Connect */}
          <SocialConnect worldColor={WORLD_COLOR} platforms={maxSocialPlatforms} />

          {/* Merch */}
          <div id="merch">
            <MaxMerch />
          </div>

          {/* Contact */}
          <MaxContact />

          {/* Modern Footer */}
          <WorldFooter
            worldName="MAX"
            worldColor={WORLD_COLOR}
            tagline="The amplification engine for creators, brands, and digital experiences."
          />
        </div>
      </div>
    </>
  );
}

export default MaxWorld;
