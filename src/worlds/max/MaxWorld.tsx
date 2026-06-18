// ============================================
// Max World - Main Component
// SmokeBackground (cyan) covers the entire page
// ============================================

import { SmokeBackground } from '@/components/ui/smoke-background';
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
const MAX_SMOKE_COLOR = '#003a5c'; // Deep cyan-teal smoke

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

      {/* Cyan smoke shader — fixed canvas behind everything */}
      <SmokeBackground smokeColor={MAX_SMOKE_COLOR} />

      <div className="relative min-h-screen overflow-hidden" style={{ isolation: 'isolate' }}>
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

          <SocialConnect worldColor={WORLD_COLOR} platforms={maxSocialPlatforms} />

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
