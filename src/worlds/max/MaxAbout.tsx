// ============================================
// Max About - Simple about with pictures and writeup
// ============================================

import { motion } from 'framer-motion';

const images = [
  {
    src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Digital content creation',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Team collaboration',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Creative production',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Media technology',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Content strategy',
    span: '',
  },
];

export function MaxAbout() {
  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-4"
            style={{ color: '#00d4ff' }}
          >
            About MAX
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Content becomes culture when the right vision meets the right platform.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              X-ERA Max is the amplification engine for creators, brands, and digital experiences.
              We exist at the intersection of creativity and technology, turning raw content into
              cultural movements that resonate across platforms and audiences.
            </p>
            <p className="text-base text-white/50 leading-relaxed">
              From distribution strategy to deep analytics, from monetization to community building,
              Max provides the complete infrastructure that transforms creative vision into measurable
              impact. We don't just publish content -- we engineer its journey from first view to
              lasting influence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/8">
              {[
                { value: '500M+', label: 'Monthly Views' },
                { value: '150K+', label: 'Creators' },
                { value: '45+', label: 'Platforms' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className={`relative rounded-xl overflow-hidden group ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ minHeight: img.span ? '300px' : '180px' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.3)',
                    border: '2px solid rgba(0, 212, 255, 0.4)',
                    borderRadius: '0.75rem'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MaxAbout;
