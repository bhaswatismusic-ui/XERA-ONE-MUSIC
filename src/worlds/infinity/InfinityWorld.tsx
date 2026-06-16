// ============================================
// Infinity World - Main Component
// Removed: AI Solutions, Products, Research, Automation
// Added: Projects (Team, Collaborations, Process)
// Combined: FAQ + Contact -> Connect
// ============================================

import { CinematicBackground } from '@/components/effects';
import { InfinityHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import {
  InfinityHero,
  InfinityAbout,
  InfinityProjects,
  InfinityTestimonials,
  InfinityConnect,
} from './';
import { infinityData } from '@/data/infinity';

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
          {/* Hero Section */}
          <InfinityHero {...infinityData.hero} />

          {/* About with Social Media */}
          <div id="about">
            <InfinityAbout {...infinityData.about} />
          </div>

          {/* Projects - Team, Collaborations, Process */}
          <InfinityProjects />

          {/* Testimonials */}
          <div id="testimonials">
            <InfinityTestimonials {...infinityData.testimonials} />
          </div>

          {/* Connect - Combined FAQ + Contact */}
          <InfinityConnect />

          {/* Footer */}
          <footer className="py-16 border-t" style={{ borderColor: 'rgba(0, 255, 106, 0.2)' }}>
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold" style={{ color: '#00ff6a', textShadow: '0 0 20px rgba(0, 255, 106, 0.5)' }}>
                  X-ERA Infinity
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

export default InfinityWorld;
