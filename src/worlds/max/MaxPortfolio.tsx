// ============================================
// Max Portfolio Section
// Video portfolio with YouTube embeds & Playlist redirect
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, Youtube } from 'lucide-react';
import { Container } from '@/components/ui';
import { YouTubeEmbed } from '@/components/video/OptimizedVideo';
import { useStaggerAnimation } from '@/hooks';

// ============================================
// Portfolio Item Types
// ============================================

interface PortfolioVideo {
  id: string;
  youtubeId: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  duration?: string;
  description?: string;
}

// Portfolio data
const portfolioVideos: PortfolioVideo[] = [
  {
    id: '1',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Brand Documentary',
    client: 'Global Tech Corp',
    category: 'Documentary',
    thumbnail: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    duration: '8:24',
    description: 'A compelling brand story showcasing innovation and growth.',
  },
  {
    id: '2',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Product Launch Campaign',
    client: 'Innovate Labs',
    category: 'Commercial',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    duration: '3:45',
    description: 'High-energy product launch video for maximum impact.',
  },
  {
    id: '3',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Corporate Training Series',
    client: 'Enterprise Solutions',
    category: 'Educational',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    duration: '15:00',
    description: 'Comprehensive training content for enterprise teams.',
  },
  {
    id: '4',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Event Highlight Reel',
    client: 'Tech Conference 2024',
    category: 'Event',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    duration: '5:30',
    description: 'Dynamic highlights from the annual tech conference.',
  },
  {
    id: '5',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Social Media Campaign',
    client: 'Lifestyle Brand Co',
    category: 'Social',
    thumbnail: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg',
    duration: '1:00',
    description: 'Viral social content designed for maximum engagement.',
  },
  {
    id: '6',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Music Video Production',
    client: 'Independent Artist',
    category: 'Music',
    thumbnail: 'https://images.pexels.com/photos/3184605/pexels-photo-3184605.jpeg',
    duration: '4:15',
    description: 'Cinematic music video with stunning visual effects.',
  },
];

// YouTube playlist URL - update this with your actual playlist ID
const YOUTUBE_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PL YOUR_PLAYLIST_ID';

const categories = ['All', 'Documentary', 'Commercial', 'Educational', 'Event', 'Social', 'Music'];

// ============================================
// Portfolio Section Component
// ============================================

interface MaxPortfolioProps {
  title?: string;
  subtitle?: string;
  description?: string;
  youtubePlaylistUrl?: string;
}

export function MaxPortfolio({
  title = 'Our Work',
  subtitle = 'Portfolio',
  description = 'Explore our latest projects and see how we bring stories to life through compelling visual content.',
  youtubePlaylistUrl = YOUTUBE_PLAYLIST_URL,
}: MaxPortfolioProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, controls, itemVariants } = useStaggerAnimation({ staggerDelay: 0.1 });

  const filteredVideos =
    activeCategory === 'All'
      ? portfolioVideos
      : portfolioVideos.filter((v) => v.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden" style={{ background: 'rgba(0,8,18,0.55)' }}>
      {/* Background Gradient with Neon Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 60%)' }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/60 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === category
                  ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 212, 255, 0.1) 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: activeCategory === category ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)',
                border: activeCategory === category
                  ? '2px solid rgba(0, 212, 255, 0.6)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: activeCategory === category
                  ? '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
                  : 'none'
              }}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => (
              <motion.article
                key={video.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="group relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
                onClick={() => setSelectedVideo(video)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedVideo(video);
                  }
                }}
                role="button"
                aria-label={`Play ${video.title}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        boxShadow: '0 0 40px rgba(0, 212, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                      {video.duration}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{
                      background: 'rgba(0, 212, 255, 0.9)',
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{video.client}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* YouTube Playlist Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={youtubePlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(200, 0, 0, 0.1) 100%)',
              color: 'white',
              border: '2px solid rgba(255, 0, 0, 0.5)',
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.3), inset 0 0 20px rgba(255, 0, 0, 0.1)'
            }}
          >
            <Youtube className="w-5 h-5" />
            <span>Watch Full Playlist on YouTube</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </Container>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl rounded-xl overflow-hidden"
              style={{
                background: '#0a0a0a',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(0, 212, 255, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(0, 212, 255, 0.2)' }}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Embed */}
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <YouTubeEmbed
                  videoId={selectedVideo.youtubeId}
                  title={selectedVideo.title}
                  autoplay={true}
                  lazyLoad={false}
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
                    <p className="mt-1" style={{ color: '#00d4ff' }}>{selectedVideo.client}</p>
                  </div>
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(0, 212, 255, 0.2)',
                      color: '#00d4ff',
                      border: '1px solid rgba(0, 212, 255, 0.4)'
                    }}
                  >
                    {selectedVideo.category}
                  </span>
                </div>
                {selectedVideo.description && (
                  <p className="mt-4 text-white/60">{selectedVideo.description}</p>
                )}

                {/* Watch on YouTube button */}
                <div className="mt-6 flex gap-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: 'rgba(255, 0, 0, 0.15)',
                      color: 'white',
                      border: '1px solid rgba(255, 0, 0, 0.3)'
                    }}
                  >
                    <Youtube className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MaxPortfolio;
