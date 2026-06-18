import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: { src: string; alt: string };
  rating?: number;
}

interface InfinityTestimonialsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  testimonials: Testimonial[];
}

export function InfinityTestimonials({
  sectionTitle,
  headline,
  description,
  testimonials,
}: InfinityTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: 'rgba(5,8,5,0.72)' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#39FF88' }}>
              {sectionTitle}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{headline}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-10">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-2"
                  style={{ ringColor: 'rgba(57, 255, 136, 0.3)' }}
                >
                  <img
                    src={testimonials[activeIndex].image.src}
                    alt={testimonials[activeIndex].image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white font-bold text-lg">{testimonials[activeIndex].author}</div>
                <div className="text-white/60 text-sm">{testimonials[activeIndex].role}</div>

                {/* Rating */}
                {testimonials[activeIndex].rating && (
                  <div className="flex gap-1 mt-3">
                    {[...Array(testimonials[activeIndex].rating!)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ color: '#39FF88', fill: '#39FF88' }} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              whileHover={{
                background: 'rgba(57, 255, 136, 0.2)',
                borderColor: 'rgba(57, 255, 136, 0.5)',
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeIndex ? '2rem' : '0.5rem',
                    background: index === activeIndex ? '#39FF88' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              whileHover={{
                background: 'rgba(57, 255, 136, 0.2)',
                borderColor: 'rgba(57, 255, 136, 0.5)',
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfinityTestimonials;
