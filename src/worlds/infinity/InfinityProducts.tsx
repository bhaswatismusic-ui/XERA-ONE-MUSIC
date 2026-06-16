import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  pricing: string;
  image: { src: string; alt: string };
}

interface InfinityProductsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  products: Product[];
}

export function InfinityProducts({
  sectionTitle,
  headline,
  description,
  products,
}: InfinityProductsProps) {
  return (
    <section id="products" className="relative py-32 bg-black">
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

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-300"
              style={{
                background: 'rgba(57, 255, 136, 0.02)',
                borderColor: 'rgba(57, 255, 136, 0.15)',
              }}
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image.src}
                    alt={product.image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(57, 255, 136, 0.2)', color: '#39FF88' }}
                    >
                      {product.pricing}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-sm mb-4" style={{ color: '#39FF88' }}>{product.tagline}</p>
                  <p className="text-sm text-white/60">{product.description}</p>

                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#39FF88' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InfinityProducts;
