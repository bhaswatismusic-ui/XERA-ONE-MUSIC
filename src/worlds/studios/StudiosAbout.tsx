import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Lightbulb, Users, TrendingUp } from 'lucide-react';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface StudiosAboutProps {
  sectionTitle: string;
  headline: string;
  description: string;
  highlights: Highlight[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const iconComponents = {
  Award,
  Lightbulb,
  Users,
  TrendingUp,
};

export function StudiosAbout({
  sectionTitle,
  headline,
  description,
  highlights,
  image,
}: StudiosAboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Section Label */}
            <motion.div variants={staggerItem} className="mb-4">
              <span className="text-sm font-semibold text-studios-primary tracking-wider uppercase">
                {sectionTitle}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {headline}
            </motion.h2>

            {/* Description */}
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
                const IconComponent = iconComponents[highlight.icon as keyof typeof iconComponents] || Award;
                return (
                  <motion.div
                    key={highlight.id}
                    variants={staggerItem}
                    className="group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-studios-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-studios-primary/20 flex items-center justify-center mb-4 group-hover:bg-studios-primary/30 transition-colors">
                      <IconComponent className="w-6 h-6 text-studios-primary" />
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
            style={{ y: imageY, opacity }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Accent corner */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-studios-primary rounded-xl opacity-50" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-studios-primary rounded-xl opacity-50" />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 border border-studios-primary/20 rounded-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default StudiosAbout;
