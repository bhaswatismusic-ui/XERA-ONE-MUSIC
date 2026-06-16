import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Settings, Package, Shield } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const iconComponents = {
  Brain,
  Settings,
  Package,
  Shield,
};

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface InfinityAboutProps {
  sectionTitle: string;
  headline: string;
  description: string;
  highlights: Highlight[];
  image: { src: string; alt: string; width: number; height: number };
}

export function InfinityAbout({
  sectionTitle,
  headline,
  description,
  highlights,
  image,
}: InfinityAboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={staggerItem} className="mb-4">
              <span
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: '#39FF88' }}
              >
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
              className="text-lg text-white/70 leading-relaxed mb-12"
            >
              {description}
            </motion.p>

            {/* Highlights Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 gap-6"
            >
              {highlights.map((highlight) => {
                const IconComponent = iconComponents[highlight.icon as keyof typeof iconComponents] || Brain;
                return (
                  <motion.div
                    key={highlight.id}
                    variants={staggerItem}
                    className="group p-6 rounded-xl border transition-all duration-300 hover:bg-white/5"
                    style={{
                      background: 'rgba(57, 255, 136, 0.02)',
                      borderColor: 'rgba(57, 255, 136, 0.2)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: '#39FF88' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image with Parallax */}
          <motion.div
            style={{ y: imageY }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl"
                style={{ border: '2px solid rgba(57, 255, 136, 0.3)' }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-xl"
                style={{ border: '2px solid rgba(57, 255, 136, 0.3)' }}
              />
            </div>

            {/* Floating AI element */}
            <motion.div
              animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 px-4 py-2 rounded-lg"
              style={{ background: 'rgba(57, 255, 136, 0.1)', border: '1px solid rgba(57, 255, 136, 0.3)' }}
            >
              <span className="text-sm font-mono" style={{ color: '#39FF88' }}>AI = Future</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(57, 255, 136, 0.05) 0%, transparent 70%)',
        }}
      />
    </section>
  );
}

export default InfinityAbout;
