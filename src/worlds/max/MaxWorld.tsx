// ============================================
// Max World - Main Component
// Sections: Hero, About, Portfolio, Testimonials, Social, Merch, Contact
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

const WORLD_COLOR = '#00d4ff';

export function MaxWorld() {
  const seoConfig = createWorldSEO(
    'max',
    'X-ERA Max',
    'Digital media ecosystem and content distribution platform. Maximize your reach with data-driven media strategies.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <MaxHeader />

      <div className="relative min-h-screen overflow-hidden" style={{ background: '#020814' }}>
        {/* Cinematic Background */}
        <CinematicBackground worldId="max" />

        {/* Main Content */}
        <div className="relative z-10 pt-28">
          <MaxHero {...maxData.hero} />

          <div id="about">
            <MaxAbout />
          </div>

          <div id="portfolio">
            <MaxPortfolio />
          </div>

          <div id="testimonials">
            <MaxTestimonials />
          </div>

          <SocialConnect worldColor={WORLD_COLOR} />

          <div id="merch">
            <MaxMerch />
          </div>

          <MaxContact />

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
