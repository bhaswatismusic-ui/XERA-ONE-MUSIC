// ============================================
// Max About - With Blog/Social Media Integration
// Instagram feed display + Social Links
// ============================================

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Youtube, Twitter, Music, ExternalLink, Plus } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

// Mock Instagram feed data - In production, this would come from Instagram API
const instagramPosts = [
  { id: 1, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '2.4K' },
  { id: 2, image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '1.8K' },
  { id: 3, image: 'https://images.pexels.com/photos/2187305/pexels-photo-2187305.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '3.1K' },
  { id: 4, image: 'https://images.pexels.com/photos/111469/pexels-photo-111469.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '956' },
  { id: 5, image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '2.2K' },
  { id: 6, image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=400', likes: '1.5K' },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: '#', handle: '@xeramax', color: '#E4405F' },
  { name: 'YouTube', icon: Youtube, url: '#', handle: '@XERAMax', color: '#FF0000' },
  { name: 'Twitter', icon: Twitter, url: '#', handle: '@xeramax', color: '#1DA1F2' },
  { name: 'TikTok', icon: Music, url: '#', handle: '@xeramax', color: '#00F2EA' },
];

// Blog posts data - In production, from CMS
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Digital Media Distribution',
    excerpt: 'Exploring how AI and automation are reshaping content delivery...',
    date: '2024-01-15',
    author: 'MAX Team',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Maximizing Content Reach with Data Analytics',
    excerpt: 'Learn how to leverage data for better content decisions...',
    date: '2024-01-10',
    author: 'MAX Team',
    image: 'https://images.pexels.com/photos/2187305/pexels-photo-2187305.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Building Sustainable Creator Partnerships',
    excerpt: 'Strategies for long-term creator success and growth...',
    date: '2024-01-05',
    author: 'MAX Team',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export function MaxAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'instagram' | 'blog'>('instagram');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00d4ff' }}>
            About MAX
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Connect With Our <span style={{ color: '#00d4ff' }}>World</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Follow our journey, explore our content, and stay connected with the MAX community.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { id: 'instagram', label: 'Instagram Feed' },
            { id: 'blog', label: 'Blog' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as typeof activeView)}
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activeView === tab.id ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                color: activeView === tab.id ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                boxShadow: activeView === tab.id ? '0 0 20px rgba(0, 212, 255, 0.3)' : undefined,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Instagram Feed */}
        {activeView === 'instagram' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Instagram Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {instagramPosts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href="#"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={post.image}
                    alt="Instagram post"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                      <Instagram className="w-4 h-4 inline mr-1" />
                      {post.likes}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00d4ff] rounded-lg transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                  style={{ borderColor: `${social.color}30` }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${social.color}20` }}>
                    <social.icon className="w-6 h-6" style={{ color: social.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{social.name}</p>
                    <p className="text-white/50 text-sm">{social.handle}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Blog Posts */}
        {activeView === 'blog' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden border border-white/10 hover:border-[#00d4ff]/50 transition-all group cursor-pointer"
                  style={{ background: 'rgba(0, 212, 255, 0.02)' }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-white/50">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Write Blog CTA */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                <Plus className="w-4 h-4" />
                Write a Blog Post
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default MaxAbout;
