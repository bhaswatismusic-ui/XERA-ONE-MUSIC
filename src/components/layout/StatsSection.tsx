import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { WorldConfig, WorldStat } from '@/types';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = '', duration = 2000 }: AnimatedCounterProps) {
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

  // Check if value has a decimal
  const finalValue = hasAnimated.current ? displayValue : 0;
  const displayStr = value.includes('.')
    ? finalValue.toFixed((value.split('.')[1] || '').length)
    : finalValue.toString();

  return (
    <div ref={ref}>
      <span className={`stat-value ${
        suffix === 'M+' || suffix === 'K+' || suffix === 'M' || suffix === 'PB'
          ? 'text-white'
          : 'text-white'
      }`}>
        {displayStr}
      </span>
      {suffix && <span className="text-2xl md:text-3xl text-neutral-400">{suffix}</span>}
    </div>
  );
}

interface StatCardProps {
  stat: WorldStat;
  worldId: WorldConfig['id'];
}

function StatCard({ stat, worldId }: StatCardProps) {
  const gradientClass =
    worldId === 'studios'
      ? 'from-studios-primary/20 to-transparent'
      : worldId === 'max'
      ? 'from-max-primary/20 to-transparent'
      : 'from-infinity-primary/20 to-transparent';

  const borderClass =
    worldId === 'studios'
      ? 'border-studios-primary/20 hover:border-studios-primary/40'
      : worldId === 'max'
      ? 'border-max-primary/20 hover:border-max-primary/40'
      : 'border-infinity-primary/20 hover:border-infinity-primary/40';

  return (
    <motion.div
      variants={staggerItem}
      className={`
        relative p-8 rounded-2xl
        bg-gradient-to-br ${gradientClass}
        border ${borderClass}
        backdrop-blur-sm border border-neutral-800
        text-center
        transition-all duration-300
        hover:bg-neutral-900/50
      `}
    >
      <div className="mb-4">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  );
}

interface StatsSectionProps {
  config: WorldConfig;
  title?: string;
  description?: string;
}

export function StatsSection({ config, title, description }: StatsSectionProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={staggerItem} className="text-center mb-16">
            <Heading2 className="mb-4">
              {title || 'By the Numbers'}
            </Heading2>
            {description && (
              <p className="text-lg text-neutral-400">{description}</p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} worldId={config.id} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default StatsSection;
