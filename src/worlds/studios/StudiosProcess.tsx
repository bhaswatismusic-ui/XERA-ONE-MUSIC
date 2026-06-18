import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  phase: string;
}

interface StudiosProcessProps {
  sectionTitle: string;
  headline: string;
  description: string;
  steps: ProcessStep[];
}

export function StudiosProcess({
  sectionTitle,
  headline,
  description,
  steps,
}: StudiosProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="process" ref={containerRef} className="relative py-32" style={{ background: 'rgba(8,2,2,0.72)' }}>
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
            className="text-4xl md:text-5xl font-bold text-white mb-6"
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

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-studios-primary"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-neutral-900/50 rounded-2xl p-8 border border-neutral-800 hover:border-studios-primary/30 transition-colors">
                    {/* Phase Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studios-primary/20 text-studios-primary text-sm font-medium mb-4">
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center Number */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-studios-primary flex items-center justify-center shadow-lg shadow-studios-primary/30">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Empty Side for Alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudiosProcess;
