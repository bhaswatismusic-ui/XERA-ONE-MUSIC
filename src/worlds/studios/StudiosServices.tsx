import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Film, Tv, Camera, Layers, Volume2, Radio } from 'lucide-react';
import { Container, Heading2, Paragraph } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: { src: string; alt: string };
}

interface StudiosServicesProps {
  sectionTitle: string;
  headline: string;
  description: string;
  services: Service[];
}

const iconComponents = {
  Film,
  Tv,
  Camera,
  Layers,
  Volume2,
  Radio,
};

export function StudiosServices({
  sectionTitle,
  headline,
  description,
  services,
}: StudiosServicesProps) {
  const [activeService, setActiveService] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative py-32 bg-black">
      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-sm font-semibold text-studios-primary tracking-wider uppercase">
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
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Services Carousel */}
        <div className="relative">
          {/* Service Tabs */}
          <div className="flex overflow-x-auto gap-4 pb-4 mb-12 scrollbar-hide">
            {services.map((service, index) => {
              const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || Film;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`
                    flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl
                    transition-all duration-300
                    ${
                      activeService === index
                        ? 'bg-studios-primary text-white'
                        : 'bg-neutral-900 text-white/70 border border-neutral-800 hover:border-studios-primary/50'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="whitespace-nowrap font-medium">{service.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Service Detail */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <motion.img
                src={services[activeService].image.src}
                alt={services[activeService].image.alt}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Service number */}
              <div className="absolute bottom-6 left-6">
                <div className="text-7xl font-bold text-studios-primary/20">
                  {String(activeService + 1).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {services[activeService].title}
              </h3>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {services[activeService].description}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {services[activeService].features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-2 h-2 rounded-full bg-studios-primary" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Cards Grid (Alternative View) */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
        >
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || Film;
            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-studios-primary/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-studios-primary/20 flex items-center justify-center mb-6 group-hover:bg-studios-primary/30 transition-colors">
                  <IconComponent className="w-7 h-7 text-studios-primary" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>

                {/* Description Preview */}
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Button */}
                <motion.button
                  onClick={() => setActiveService(index)}
                  className="mt-4 text-sm text-studios-primary font-medium hover:text-studios-secondary transition-colors"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default StudiosServices;
