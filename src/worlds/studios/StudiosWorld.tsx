// ============================================
// Studios World - Main Component
// Removed: About (per user request)
// Combined: FAQ + Contact + Quote -> Connect
// ============================================

import { CinematicBackground } from '@/components/effects';
import { StudiosHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
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

export function StudiosWorld() {
  const seoConfig = createWorldSEO(
    'studios',
    'X-ERA Studios',
    'Creative storytelling and media production. We craft compelling visual content that captivates audiences and drives results.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <StudiosHeader />

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Cinematic Background */}
        <CinematicBackground worldId="studios" />

        {/* Main Content */}
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

          {/* Connect - Combined FAQ + Contact + Quote */}
          <StudiosConnect />

          {/* Footer */}
          <footer className="py-16 border-t" style={{ borderColor: 'rgba(255,32,32,0.2)' }}>
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold" style={{ color: '#FF2020', textShadow: '0 0 20px rgba(255,32,32,0.5)' }}>
                  X-ERA Studios
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

export default StudiosWorld;
