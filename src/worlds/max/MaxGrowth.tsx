import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface GrowthMetric {
  label: string;
  value: string;
  suffix?: string;
}

interface MaxGrowthProps {
  sectionTitle: string;
  headline: string;
  description: string;
  metrics: GrowthMetric[];
}

function AnimatedCounter({ value, suffix = '', duration = 2500 }: { value: string; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            setDisplayValue(Number(value) || 0);
            return;
          }

          const decimals = (value.split('.')[1] || '').length;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = numValue * easeProgress;

            setDisplayValue(Number(currentValue.toFixed(decimals)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  const finalValue = hasAnimated.current ? displayValue : 0;
  const displayStr = value.includes('.')
    ? finalValue.toFixed((value.split('.')[1] || '').length)
    : finalValue.toString();

  return (
    <div ref={ref}>
      <motion.span
        className="text-5xl md:text-6xl lg:text-7xl font-bold"
        style={{ color: '#00BFFF' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayStr}
      </motion.span>
      {suffix && (
        <span className="text-3xl md:text-4xl font-bold text-white/70 ml-1">{suffix}</span>
      )}
    </div>
  );
}

export function MaxGrowth({
  sectionTitle,
  headline,
  description,
  metrics,
}: MaxGrowthProps) {
  return (
    <section id="growth" className="relative py-32" style={{ background: '#030a14' }}>
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.08) 0%, transparent 50%)',
        }}
      />

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

        {/* Metrics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={staggerItem}
              className="text-center p-8 rounded-2xl border transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(0, 191, 255, 0.03)',
                borderColor: 'rgba(0, 191, 255, 0.15)',
              }}
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <div className="text-sm text-white/50 mt-2">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxGrowth;
