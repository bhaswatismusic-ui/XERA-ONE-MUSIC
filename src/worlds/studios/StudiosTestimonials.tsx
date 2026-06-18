import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Container, Heading2 } from '@/components/ui';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: { src: string; alt: string };
  rating?: number;
}

interface StudiosTestimonialsProps {
  sectionTitle: string;
  headline: string;
  description: string;
  testimonials: Testimonial[];
}

export function StudiosTestimonials({
  sectionTitle,
  headline,
  description,
  testimonials,
}: StudiosTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: 'rgba(8,2,2,0.72)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <Quote className="w-full h-full text-studios-primary" />
        </div>
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="text-sm font-semibold text-studios-primary tracking-wider uppercase">
              {sectionTitle}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {description}
          </p>
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
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-studios-primary/30">
                  <img
                    src={testimonials[activeIndex].image.src}
                    alt={testimonials[activeIndex].image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white font-bold text-lg">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-white/60 text-sm">
                  {testimonials[activeIndex].role}
                </div>

                {/* Rating */}
                {testimonials[activeIndex].rating && (
                  <div className="flex gap-1 mt-3">
                    {[...Array(testimonials[activeIndex].rating!)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-studios-primary fill-studios-primary" />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:border-studios-primary hover:bg-studios-primary transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'w-8 bg-studios-primary' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:border-studios-primary hover:bg-studios-primary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudiosTestimonials;
