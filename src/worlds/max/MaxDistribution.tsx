import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Region {
  id: string;
  name: string;
  nodes: number;
  coverage: string;
}

interface MaxDistributionProps {
  sectionTitle: string;
  headline: string;
  description: string;
  regions: Region[];
  totalNodes: number;
  totalCountries: number;
  dailyViews: string;
  bandwidth: string;
}

export function MaxDistribution({
  sectionTitle,
  headline,
  description,
  regions,
  totalNodes,
  totalCountries,
  dailyViews,
  bandwidth,
}: MaxDistributionProps) {
  return (
    <section id="distribution" className="relative py-32" style={{ background: 'rgba(2,5,15,0.72)' }}>
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

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline}
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-white/70 max-w-2xl mx-auto">
            {description}
          </motion.p>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="text-center p-6 rounded-xl border"
            style={{ background: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.15)' }}
          >
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#00BFFF' }}>{totalNodes}</div>
            <div className="text-sm text-white/50">CDN Nodes</div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="text-center p-6 rounded-xl border"
            style={{ background: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.15)' }}
          >
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#00BFFF' }}>{totalCountries}</div>
            <div className="text-sm text-white/50">Countries</div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="text-center p-6 rounded-xl border"
            style={{ background: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.15)' }}
          >
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#00BFFF' }}>{dailyViews}</div>
            <div className="text-sm text-white/50">Daily Views</div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="text-center p-6 rounded-xl border"
            style={{ background: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.15)' }}
          >
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#00BFFF' }}>{bandwidth}</div>
            <div className="text-sm text-white/50">Bandwidth</div>
          </motion.div>
        </motion.div>

        {/* Regions Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {regions.map((region) => (
            <motion.div
              key={region.id}
              variants={staggerItem}
              className="group p-6 rounded-xl border transition-all duration-300"
              style={{
                background: 'rgba(0, 191, 255, 0.02)',
                borderColor: 'rgba(0, 191, 255, 0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{region.name}</h3>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(0, 191, 255, 0.15)', color: '#00BFFF' }}
                >
                  {region.coverage}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Nodes</span>
                  <span className="text-white font-semibold">{region.nodes}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: '#00BFFF' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(region.nodes / 52) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxDistribution;
