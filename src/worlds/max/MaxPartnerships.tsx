import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Tier {
  id: string;
  name: string;
  audience: string;
  benefits: string[];
  color: string;
}

interface Creator {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  growth: string;
  image: string;
}

interface MaxPartnershipsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  tiers: Tier[];
  creators: Creator[];
}

export function MaxPartnerships({
  sectionTitle,
  headline,
  description,
  tiers,
  creators,
}: MaxPartnershipsProps) {
  return (
    <section id="partnerships" className="relative py-32" style={{ background: '#030a14' }}>
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

        {/* Tier Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={staggerItem}
              className="relative p-6 rounded-2xl border transition-all duration-300"
              style={{
                background: index === 3 ? 'rgba(0, 191, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                borderColor: index === 3 ? 'rgba(0, 191, 255, 0.4)' : 'rgba(255,255,255,0.1)',
              }}
            >
              {index === 3 && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#00BFFF', color: '#020814' }}
                >
                  Featured
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm mb-6" style={{ color: '#00BFFF' }}>{tier.audience}</p>

              <ul className="space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#00BFFF' }} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Creators */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {creators.map((creator) => (
            <motion.div
              key={creator.id}
              variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden"
              style={{ background: 'rgba(0, 191, 255, 0.02)', border: '1px solid rgba(0, 191, 255, 0.15)' }}
            >
              {/* Creator Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020814] via-transparent to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-white">{creator.name}</div>
                      <div className="text-sm text-white/50">{creator.handle}</div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(0, 191, 255, 0.2)', color: '#00BFFF' }}
                    >
                      {creator.followers}
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/60">{creator.category}</span>
                  <span className="text-sm font-medium" style={{ color: '#00BFFF' }}>{creator.growth}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxPartnerships;
