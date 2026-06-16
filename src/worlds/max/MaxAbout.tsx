// ============================================
// Max About - Social Media Integration
// Instagram feed display + Social Links
// ============================================

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Youtube, Twitter, Music, ExternalLink } from 'lucide-react';

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

export function MaxAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Neon glow decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 pointer-events-none">
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{
              color: '#00d4ff',
              textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
            }}
          >
            About MAX
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Connect With Our <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0, 212, 255, 0.6)' }}>World</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Follow our journey, explore our content, and stay connected with the MAX community.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
              style={{
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  {post.likes}
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.2)',
                  border: '2px solid rgba(0, 212, 255, 0.6)'
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${social.color}20`,
                  boxShadow: `0 0 20px ${social.color}30`
                }}
              >
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

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/xeramax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.05) 100%)',
              color: '#00d4ff',
              border: '2px solid rgba(0, 212, 255, 0.5)',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
            }}
          >
            <Instagram className="w-5 h-5" />
            <span>Follow @xeramax</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default MaxAbout;
