import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface PartnerCategory {
  name: string;
  partners: string[];
}

interface InfinityPartnersProps {
  sectionTitle: string;
  headline: string;
  description: string;
  categories: PartnerCategory[];
  stats: Array<{ label: string; value: string }>;
}

export function InfinityPartners({
  sectionTitle,
  headline,
  description,
  categories,
  stats,
}: InfinityPartnersProps) {
  return (
    <section id="partners" className="relative py-32 bg-black">
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

        {/* Partners Categories */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={staggerItem}
              className="p-6 rounded-xl border"
              style={{
                background: 'rgba(57, 255, 136, 0.02)',
                borderColor: 'rgba(57, 255, 136, 0.15)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.partners.map((partner) => (
                  <li key={partner} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1 h-1 rounded-full" style={{ background: '#39FF88' }} />
                    {partner}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Partner Stats */}
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

export default InfinityPartners;
