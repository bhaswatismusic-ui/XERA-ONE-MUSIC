import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface CaseStudyResult {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  image: { src: string; alt: string };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface MaxCaseStudiesProps {
  sectionTitle: string;
  headline: string;
  description: string;
  studies: CaseStudy[];
}

export function MaxCaseStudies({
  sectionTitle,
  headline,
  description,
  studies,
}: MaxCaseStudiesProps) {
  const [activeStudy, setActiveStudy] = useState(0);

  return (
    <section id="case-studies" className="relative py-32" style={{ background: '#020814' }}>
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

        {/* Case Study Navigation */}
        <div className="flex overflow-x-auto gap-4 pb-6 mb-12 scrollbar-hide">
          {studies.map((study, index) => (
            <motion.button
              key={study.id}
              onClick={() => setActiveStudy(index)}
              className="flex-shrink-0 px-6 py-4 rounded-xl transition-all duration-300"
              style={{
                background: activeStudy === index ? 'rgba(0, 191, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                border: activeStudy === index ? '1px solid rgba(0, 191, 255, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                color: activeStudy === index ? '#00BFFF' : 'rgba(255,255,255,0.7)',
              }}
            >
              <div className="text-left">
                <div className="text-xs text-white/50 mb-1">{study.category}</div>
                <div className="font-semibold whitespace-nowrap">{study.client}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={studies[activeStudy].image.src}
                alt={studies[activeStudy].image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020814]/60 to-transparent" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{studies[activeStudy].title}</h3>
              <p className="text-sm mb-6" style={{ color: '#00BFFF' }}>{studies[activeStudy].client}</p>
              <p className="text-white/70 leading-relaxed mb-8">{studies[activeStudy].description}</p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {studies[activeStudy].results.map((result) => (
                  <div
                    key={result.label}
                    className="p-4 rounded-xl text-center"
                    style={{ background: 'rgba(0, 191, 255, 0.05)' }}
                  >
                    <div className="text-2xl font-bold mb-1" style={{ color: '#00BFFF' }}>{result.value}</div>
                    <div className="text-xs text-white/50">{result.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              {studies[activeStudy].testimonial && (
                <div
                  className="p-6 rounded-xl border-l-4"
                  style={{
                    background: 'rgba(0, 191, 255, 0.02)',
                    borderLeftColor: '#00BFFF',
                  }}
                >
                  <p className="text-white/80 italic mb-4">"{studies[activeStudy].testimonial?.quote}"</p>
                  <div className="text-sm text-white/50">
                    — {studies[activeStudy].testimonial?.author},{' '}
                    <span style={{ color: '#00BFFF' }}>{studies[activeStudy].testimonial?.role}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MaxCaseStudies;
