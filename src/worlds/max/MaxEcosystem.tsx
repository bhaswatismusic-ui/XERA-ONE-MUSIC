import { motion } from 'framer-motion';
import { Youtube, Music, Instagram, Radio, Twitter, Mic, Linkedin, Camera } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Youtube,
  Music,
  Instagram,
  Radio,
  Twitter,
  Mic,
  Linkedin,
  Camera,
};

interface Platform {
  name: string;
  icon: string;
  reach: string;
}

interface MaxEcosystemProps {
  sectionTitle: string;
  headline: string;
  description: string;
  platforms: Platform[];
  stats: Array<{ label: string; value: string }>;
}

export function MaxEcosystem({
  sectionTitle,
  headline,
  description,
  platforms,
  stats,
}: MaxEcosystemProps) {
  return (
    <section id="ecosystem" className="relative py-32" style={{ background: 'rgba(2,5,15,0.72)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00BFFF' }}>
              {sectionTitle}
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {headline}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Platform Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {platforms.map((platform) => {
            const IconComponent = platformIcons[platform.icon] || Camera;
            return (
              <motion.div
                key={platform.name}
                variants={staggerItem}
                className="group relative p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 191, 255, 0.02)',
                  borderColor: 'rgba(0, 191, 255, 0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                  style={{ background: 'rgba(0, 191, 255, 0.15)' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: '#00BFFF' }} />
                </div>
                <h3 className="text-lg font-semibold text-white text-center mb-1">{platform.name}</h3>
                <p className="text-sm text-center font-medium" style={{ color: '#00BFFF' }}>
                  {platform.reach}
                </p>

                {/* Connection line animation */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    boxShadow: '0 0 30px rgba(0, 191, 255, 0.3) inset',
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ecosystem Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-6 rounded-xl border"
              style={{
                background: 'rgba(0, 191, 255, 0.05)',
                borderColor: 'rgba(0, 191, 255, 0.15)',
              }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#00BFFF' }}>
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxEcosystem;
