import { motion } from 'framer-motion';
import { Activity, Brain, Users, BarChart3 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const iconComponents = {
  Activity,
  Brain,
  Users,
  BarChart3,
};

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface MaxAnalyticsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  features: Feature[];
  metrics: Array<{ label: string; value: string }>;
}

export function MaxAnalytics({
  sectionTitle,
  headline,
  description,
  features,
  metrics,
}: MaxAnalyticsProps) {
  return (
    <section id="analytics" className="relative py-32 overflow-hidden" style={{ background: 'rgba(2,5,15,0.72)' }}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00BFFF' }}>
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

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature) => {
            const IconComponent = iconComponents[feature.icon as keyof typeof iconComponents] || Activity;
            return (
              <motion.div
                key={feature.id}
                variants={staggerItem}
                className="p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 191, 255, 0.02)',
                  borderColor: 'rgba(0, 191, 255, 0.15)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0, 191, 255, 0.15)' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: '#00BFFF' }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={staggerItem}
              className="text-center p-6 rounded-xl"
              style={{ background: 'rgba(0, 191, 255, 0.05)' }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#00BFFF' }}>
                {metric.value}
              </div>
              <div className="text-sm text-white/50">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxAnalytics;
