import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Milestone {
  quarter: string;
  title: string;
  description: string;
  status: string;
}

interface InfinityRoadmapProps {
  sectionTitle: string;
  headline: string;
  description: string;
  milestones: Milestone[];
}

export function InfinityRoadmap({
  sectionTitle,
  headline,
  description,
  milestones,
}: InfinityRoadmapProps) {
  const getStatusStyle = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      'in-progress': { bg: 'rgba(57, 255, 136, 0.2)', color: '#39FF88' },
      'planned': { bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' },
      'research': { bg: 'rgba(57, 255, 136, 0.1)', color: 'rgba(57, 255, 136, 0.7)' },
    };
    return styles[status] || styles['planned'];
  };

  return (
    <section id="roadmap" className="relative py-32" style={{ background: '#030a08' }}>
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

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.quarter}
                variants={staggerItem}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div
                    className="p-8 rounded-2xl border transition-all duration-300"
                    style={{
                      background: 'rgba(57, 255, 136, 0.02)',
                      borderColor: 'rgba(57, 255, 136, 0.15)',
                    }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ background: 'rgba(57, 255, 136, 0.15)', color: '#39FF88' }}
                    >
                      {milestone.quarter}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-sm text-white/60">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div
                    className="w-4 h-4 rounded-full border-4"
                    style={{
                      background: getStatusStyle(milestone.status).bg,
                      borderColor: '#39FF88',
                    }}
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfinityRoadmap;
