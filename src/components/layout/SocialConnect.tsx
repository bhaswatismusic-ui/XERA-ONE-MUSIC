// ============================================
// Social Connect Section
// Inspired by clintoncerejo.com LIVE tab
// Shown on all world pages
// ============================================

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  color: string;
  description: string;
}

interface SocialConnectProps {
  worldColor: string;
  platforms?: SocialPlatform[];
}

const defaultPlatforms: SocialPlatform[] = [
  {
    name: 'Instagram',
    handle: '@xeraone',
    url: 'https://instagram.com/xeraone',
    color: '#E4405F',
    description: 'Behind-the-scenes & visual stories',
  },
  {
    name: 'YouTube',
    handle: '@XERAOne',
    url: 'https://youtube.com/@xeraone',
    color: '#FF0000',
    description: 'Full films, series & documentaries',
  },
  {
    name: 'X / Twitter',
    handle: '@xeraone',
    url: 'https://twitter.com/xeraone',
    color: '#ffffff',
    description: 'Thoughts, updates & conversations',
  },
  {
    name: 'LinkedIn',
    handle: 'X-ERA ONE',
    url: 'https://linkedin.com/company/xeraone',
    color: '#0A66C2',
    description: 'Industry insights & partnerships',
  },
  {
    name: 'TikTok',
    handle: '@xeraone',
    url: 'https://tiktok.com/@xeraone',
    color: '#ffffff',
    description: 'Short-form content & trends',
  },
  {
    name: 'Spotify',
    handle: 'X-ERA ONE',
    url: 'https://open.spotify.com',
    color: '#1DB954',
    description: 'Playlists & audio experiences',
  },
];

export function SocialConnect({ worldColor, platforms = defaultPlatforms }: SocialConnectProps) {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#020814' }}>
      {/* Subtle divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: `linear-gradient(to right, transparent, ${worldColor}40, transparent)` }}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            {/* Live indicator dot */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: worldColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: worldColor }}
                />
              </span>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: worldColor }}
              >
                Find Us On
              </span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Stay Connected
          </h2>
        </motion.div>

        {/* Platform List - clintoncerejo.com style */}
        <div className="space-y-0">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group flex items-center justify-between py-6 border-b border-white/6 transition-all duration-300"
            >
              {/* Left: number + platform */}
              <div className="flex items-center gap-6 md:gap-10">
                <span
                  className="text-xs font-mono tabular-nums text-white/20 w-6 text-right select-none"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Colored dot */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                    style={{
                      background: platform.color,
                      boxShadow: `0 0 12px ${platform.color}80`
                    }}
                  />
                  <div>
                    <div
                      className="text-xl md:text-3xl font-bold text-white tracking-tight transition-all duration-300 group-hover:translate-x-2"
                      style={{ fontVariantNumeric: 'normal' }}
                    >
                      {platform.name}
                    </div>
                    <div className="text-sm text-white/40 mt-0.5 hidden md:block">{platform.description}</div>
                  </div>
                </div>
              </div>

              {/* Right: handle + arrow */}
              <div className="flex items-center gap-4 md:gap-8">
                <span
                  className="text-sm md:text-base font-medium transition-all duration-300"
                  style={{ color: platform.color }}
                >
                  {platform.handle}
                </span>
                <div
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                  style={{ borderColor: `${platform.color}40` }}
                >
                  <ExternalLink className="w-4 h-4" style={{ color: platform.color }} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialConnect;
