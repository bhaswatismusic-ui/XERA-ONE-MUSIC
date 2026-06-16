import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { WorldConfig } from '@/types';
import { Container, Button } from '@/components/ui';
import { scrollReveal } from '@/hooks/useMotion';

interface CTASectionProps {
  config: WorldConfig;
  title?: string;
  description?: string;
}

export function CTASection({ config, title, description }: CTASectionProps) {
  const gradientClass =
    config.id === 'studios'
      ? 'bg-world-studios'
      : config.id === 'max'
      ? 'bg-world-max'
      : 'bg-world-infinity';

  const glowClass =
    config.id === 'studios'
      ? 'hover:glow-studios'
      : config.id === 'max'
      ? 'hover:glow-max'
      : 'hover:glow-infinity';

  return (
    <section className={`py-24 md:py-32 ${gradientClass}`}>
      <Container>
        <motion.div
          variants={scrollReveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {title || `Ready to Experience ${config.name}?`}
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed">
            {description || 'Take the next step and discover what awaits you in this world.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to={config.cta.primary.href}>
              <Button
                as="link"
                href={config.cta.primary.href}
                size="lg"
                variant="primary"
                className={glowClass}
              >
                {config.cta.primary.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {config.cta.secondary && (
              <Link to={config.cta.secondary.href}>
                <Button
                  as="link"
                  href={config.cta.secondary.href}
                  size="lg"
                  variant="outline"
                >
                  {config.cta.secondary.label}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTASection;
