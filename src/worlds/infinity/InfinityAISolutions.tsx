import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, TrendingUp, Zap, Sparkles, Wand2 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Eye,
  TrendingUp,
  Zap,
  Sparkles,
  Wand2,
};

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: { src: string; alt: string };
}

interface InfinityAISolutionsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  solutions: Solution[];
}

export function InfinityAISolutions({
  sectionTitle,
  headline,
  description,
  solutions,
}: InfinityAISolutionsProps) {
  const [activeSolution, setActiveSolution] = useState(0);

  return (
    <section id="ai-solutions" className="relative py-32 overflow-hidden bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 136, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 136, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
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

        {/* Solutions Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-12 scrollbar-hide">
          {solutions.map((solution, index) => {
            const IconComponent = iconComponents[solution.icon] || Zap;
            return (
              <motion.button
                key={solution.id}
                onClick={() => setActiveSolution(index)}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: activeSolution === index ? 'rgba(57, 255, 136, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: activeSolution === index ? '1px solid rgba(57, 255, 136, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                  color: activeSolution === index ? '#39FF88' : 'rgba(255,255,255,0.7)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium whitespace-nowrap">{solution.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Solution Detail */}
        <motion.div
          key={activeSolution}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <motion.img
              src={solutions[activeSolution].image.src}
              alt={solutions[activeSolution].image.alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-7xl font-bold" style={{ color: 'rgba(57, 255, 136, 0.2)' }}>
                {String(activeSolution + 1).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">{solutions[activeSolution].title}</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              {solutions[activeSolution].description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              {solutions[activeSolution].features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#39FF88' }} />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfinityAISolutions;
