// ============================================
// Max World - Main Component
// Sections: Hero, About, Portfolio, Testimonials, Merch, Contact
// ============================================

import { CinematicBackground } from '@/components/effects';
import { MaxHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import {
  MaxHero,
  MaxAbout,
  MaxPortfolio,
  MaxMerch,
  MaxTestimonials,
  MaxContact,
} from './';
import { maxData } from '@/data/max';

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
          {/* Hero Section */}
          <MaxHero {...maxData.hero} />

          {/* About - with Instagram */}
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

          {/* Merch Store */}
          <div id="merch">
            <MaxMerch />
          </div>

          {/* Contact */}
          <MaxContact />

          {/* Footer */}
          <footer className="py-16 border-t" style={{ background: '#020814', borderColor: 'rgba(0, 212, 255, 0.2)' }}>
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold" style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
                  X-ERA Max
                </span>
              </div>
              <div className="flex justify-center gap-6 mb-8">
                <a href="#" className="text-white/50 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">YouTube</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">Twitter</a>
              </div>
              <p className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} X-ERA ONE. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default MaxWorld;
