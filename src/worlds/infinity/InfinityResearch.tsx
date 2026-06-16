import { motion } from 'framer-motion';
import { Brain, Shield, Layers, Lightbulb, Zap, Activity } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Shield,
  Layers,
  Lightbulb,
  Zap,
  Activity,
};

interface ResearchArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface InfinityResearchProps {
  sectionTitle: string;
  headline: string;
  description: string;
  areas: ResearchArea[];
  stats: Array<{ label: string; value: string }>;
}

export function InfinityResearch({
  sectionTitle,
  headline,
  description,
  areas,
  stats,
}: InfinityResearchProps) {
  return (
    <section id="research" className="relative py-32 overflow-hidden" style={{ background: '#030a08' }}>
      {/* Background scientific grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(57, 255, 136, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#39FF88' }}>
              {sectionTitle}
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline}
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-white/70 max-w-2xl mx-auto">
            {description}
          </motion.p>
        </motion.div>

        {/* Research Areas Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {areas.map((area) => {
            const IconComponent = iconComponents[area.icon] || Brain;
            return (
              <motion.div
                key={area.id}
                variants={staggerItem}
                className="p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(57, 255, 136, 0.02)',
                  borderColor: 'rgba(57, 255, 136, 0.15)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: '#39FF88' }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{area.name}</h3>
                <p className="text-sm text-white/60">{area.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Research Stats */}
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
              className="text-center p-6 rounded-xl"
              style={{ background: 'rgba(57, 255, 136, 0.05)' }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#39FF88' }}>
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

export default InfinityResearch;
