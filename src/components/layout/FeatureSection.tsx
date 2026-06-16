import { motion } from 'framer-motion';
import type { WorldConfig, WorldFeature } from '@/types';
import { Container, Grid, Heading2, Paragraph } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';
import {
  Film,
  Camera,
  Clapperboard,
  Sparkles,
  Layers,
  Radio,
  Brain,
  Cloud,
  Code,
  BarChart3,
  Shield,
  Settings,
  Gamepad2,
  Globe,
  BookOpen,
  Users,
  Calendar,
  Wrench,
  Zap,
} from 'lucide-react';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Film,
  Camera,
  Clapperboard,
  Sparkles,
  Layers,
  Radio,
  Brain,
  Cloud,
  Code,
  BarChart3,
  Shield,
  Settings,
  Gamepad2,
  Globe,
  BookOpen,
  Users,
  Calendar,
  Wrench,
};

interface FeatureCardProps {
  feature: WorldFeature;
  worldId: WorldConfig['id'];
}

function FeatureCard({ feature, worldId }: FeatureCardProps) {
  const IconComponent = iconComponents[feature.icon] || Zap;

  const iconBgClass =
    worldId === 'studios'
      ? 'bg-studios-primary/20 text-studios-primary'
      : worldId === 'max'
      ? 'bg-max-primary/20 text-max-primary'
      : 'bg-infinity-primary/20 text-infinity-primary';

  return (
    <motion.div
      variants={staggerItem}
      className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/70 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className={`w-12 h-12 rounded-xl ${iconBgClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

interface FeaturesSectionProps {
  config: WorldConfig;
  title?: string;
  description?: string;
}

export function FeaturesSection({ config, title, description }: FeaturesSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={staggerItem} className="text-center mb-16">
            <Heading2 className="mb-4">
              {title || 'What We Offer'}
            </Heading2>
            <Paragraph size="lg" muted className="max-w-2xl mx-auto">
              {description || `Discover the comprehensive suite of services and experiences available in ${config.name}.`}
            </Paragraph>
          </motion.div>

          <Grid cols={3} gap="lg">
            {config.features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} worldId={config.id} />
            ))}
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturesSection;
