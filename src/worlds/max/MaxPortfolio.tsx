// ============================================
// Max Portfolio Section
// Video portfolio with YouTube embeds
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, PlayCircle } from 'lucide-react';
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

const categories = ['All', 'Documentary', 'Commercial', 'Educational', 'Event', 'Social', 'Music'];

// ============================================
// Portfolio Section Component
// ============================================

interface MaxPortfolioProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function MaxPortfolio({
  title = 'Our Work',
  subtitle = 'Portfolio',
  description = 'Explore our latest projects and see how we bring stories to life through compelling visual content.',
}: MaxPortfolioProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, controls, itemVariants } = useStaggerAnimation({ staggerDelay: 0.1 });

  const filteredVideos =
    activeCategory === 'All'
      ? portfolioVideos
      : portfolioVideos.filter((v) => v.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00BFFF]/5 to-transparent" />

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
            style={{ color: '#00BFFF' }}
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[#00BFFF] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
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
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#00BFFF]/50 transition-all cursor-pointer"
                onClick={() => setSelectedVideo(video)}
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
                      className="w-16 h-16 rounded-full bg-[#00BFFF] flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
                      {video.duration}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#00BFFF]/90 text-white text-xs font-medium">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00BFFF] transition-colors">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{video.client}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#00BFFF]/50 transition-all"
          >
            <span>View All Projects</span>
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
              className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
                    <p className="mt-1 text-[#00BFFF]">{selectedVideo.client}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00BFFF]/20 text-[#00BFFF] text-sm font-medium">
                    {selectedVideo.category}
                  </span>
                </div>
                {selectedVideo.description && (
                  <p className="mt-4 text-white/60">{selectedVideo.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MaxPortfolio;
