import { motion } from 'framer-motion';
import { DollarSign, Heart, ShoppingCart, Cog, Truck, Zap } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Heart,
  ShoppingCart,
  Cog,
  Truck,
  Zap,
};

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  caseCount: string;
}

interface InfinityAutomationProps {
  sectionTitle: string;
  headline: string;
  description: string;
  industries: Industry[];
}

export function InfinityAutomation({
  sectionTitle,
  headline,
  description,
  industries,
}: InfinityAutomationProps) {
  return (
    <section id="automation" className="relative py-32 bg-black">
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

        {/* Industries Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry) => {
            const IconComponent = iconComponents[industry.icon] || Zap;
            return (
              <motion.div
                key={industry.id}
                variants={staggerItem}
                className="group p-8 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(57, 255, 136, 0.02)',
                  borderColor: 'rgba(57, 255, 136, 0.15)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: '#39FF88' }} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{industry.description}</p>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">Deployments:</span>
                  <span className="text-sm font-semibold" style={{ color: '#39FF88' }}>{industry.caseCount}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default InfinityAutomation;
