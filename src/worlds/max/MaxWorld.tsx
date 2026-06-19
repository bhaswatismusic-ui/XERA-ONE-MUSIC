import { MaxSmokeBackground } from '@/components/ui/MaxSmokeBackground';
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

      {/* Neon blue smoke — vertical columns from edges fading to center */}
      <MaxSmokeBackground />

      {/* All page content sits above the canvas at z-index 1 */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <MaxHeader />
        <main className="pt-28">
          <MaxHero {...maxData.hero} />
          <MaxAbout />
          <MaxPortfolio />
          <MaxTestimonials />
          <SocialConnect worldColor={WORLD_COLOR} platforms={maxSocialPlatforms} />
          <MaxMerch />
          <MaxContact />
          <WorldFooter
            worldName="MAX"
            worldColor={WORLD_COLOR}
            tagline="The amplification engine for creators, brands, and digital experiences."
          />
        </main>
      </div>
    </>
  );
}

export default MaxWorld;
