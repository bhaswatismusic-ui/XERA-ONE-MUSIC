import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Play, X } from 'lucide-react';
import { Container } from '@/components/ui';
import { useStaggerAnimation } from '@/hooks/useMotion';
import { YouTubeEmbed } from '@/components/video/OptimizedVideo';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: { src: string; alt: string };
  rating?: number;
  videoId?: string;
  featured?: boolean;
}

interface MaxTestimonialsProps {
  sectionTitle?: string;
  headline?: string;
  description?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Working with X-ERA Max transformed our content strategy. The quality and professionalism exceeded all expectations.',
    author: 'Sarah Chen',
    role: 'Head of Content',
    company: 'Tech Giant Inc',
    image: { src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', alt: 'Sarah Chen' },
    rating: 5,
    videoId: 'dQw4w9WgXcQ',
    featured: true,
  },
  {
    id: '2',
    quote: 'The ROI we saw from our video campaign was incredible. X-ERA Max delivers results that matter.',
    author: 'Michael Torres',
    role: 'Marketing Director',
    company: 'Global Media Co',
    image: { src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', alt: 'Michael Torres' },
    rating: 5,
  },
  {
    id: '3',
    quote: 'Their team understood our vision from day one. The creative execution was flawless.',
    author: 'Emily Watson',
    role: 'Creative Lead',
    company: 'Innovation Labs',
    image: { src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', alt: 'Emily Watson' },
    rating: 5,
  },
  {
    id: '4',
    quote: 'From concept to delivery, everything was handled with precision and creativity.',
    author: 'David Park',
    role: 'CEO',
    company: 'Startup Ventures',
    image: { src: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', alt: 'David Park' },
    rating: 5,
    videoId: 'dQw4w9WgXcQ',
    featured: true,
  },
  {
    id: '5',
    quote: 'The documentary they produced for us won multiple awards. Absolutely brilliant work.',
    author: 'Jessica Lee',
    role: 'Brand Manager',
    company: 'Fortune 500',
    image: { src: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg', alt: 'Jessica Lee' },
    rating: 5,
  },
  {
    id: '6',
    quote: 'Professional, creative, and incredibly responsive. A true partner in content creation.',
    author: 'Robert Kim',
    role: 'VP of Marketing',
    company: 'Digital First',
    image: { src: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', alt: 'Robert Kim' },
    rating: 5,
    videoId: 'dQw4w9WgXcQ',
    featured: true,
  },
];

export function MaxTestimonials({
  sectionTitle = 'Client Stories',
  headline = 'Trusted by Industry Leaders',
  description = 'Hear directly from our partners about their experience working with X-ERA Max.',
  testimonials = defaultTestimonials,
}: MaxTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoModal, setVideoModal] = useState<Testimonial | null>(null);

  const featuredTestimonials = testimonials.filter((t) => t.featured || t.videoId);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#00BFFF' }}
          >
            {sectionTitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Featured Video Testimonial */}
        {featuredTestimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Video/Image Section */}
                  <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={featuredTestimonials[activeIndex].image.src}
                      alt={featuredTestimonials[activeIndex].image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Play Button Overlay */}
                    {featuredTestimonials[activeIndex].videoId && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <button
                          onClick={() => setVideoModal(featuredTestimonials[activeIndex])}
                          className="w-20 h-20 rounded-full bg-[#00BFFF] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                          aria-label={`Play testimonial from ${featuredTestimonials[activeIndex].author}`}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </button>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#00BFFF] text-white text-xs font-medium">
                      Video Testimonial
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="space-y-6">
                    <Quote className="w-12 h-12 text-[#00BFFF]/30" />
                    <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                      "{featuredTestimonials[activeIndex].quote}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <img
                        src={featuredTestimonials[activeIndex].image.src}
                        alt={featuredTestimonials[activeIndex].image.alt}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00BFFF]/30"
                      />
                      <div>
                        <div className="font-bold text-white text-lg">
                          {featuredTestimonials[activeIndex].author}
                        </div>
                        <div className="text-white/60">
                          {featuredTestimonials[activeIndex].role}, {featuredTestimonials[activeIndex].company}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    {featuredTestimonials[activeIndex].rating && (
                      <div className="flex gap-1">
                        {[...Array(featuredTestimonials[activeIndex].rating!)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#00BFFF]" style={{ fill: '#00BFFF' }} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-full transition-all ${
                        index === activeIndex ? 'w-8 h-2 bg-[#00BFFF]' : 'w-2 h-2 bg-white/20'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Testimonial Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#00BFFF]/30 transition-all group"
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00BFFF]" style={{ fill: '#00BFFF' }} />
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-white/80 mb-6 line-clamp-4">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image.src}
                  alt={testimonial.image.alt}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-white text-sm">{testimonial.author}</div>
                  <div className="text-white/50 text-xs">{testimonial.role}</div>
                </div>
              </div>

              {/* Video indicator */}
              {testimonial.videoId && (
                <button
                  onClick={() => setVideoModal(testimonial)}
                  className="mt-4 flex items-center gap-2 text-[#00BFFF] text-sm hover:underline"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch Video
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/40 text-sm mb-8">Trusted by leading brands worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            {['TechCorp', 'MediaInc', 'InnovateCo', 'DigitalFirst', 'GlobalBrand', 'NextGen'].map(
              (name) => (
                <div key={name} className="text-xl font-bold text-white/30 tracking-wider">
                  {name}
                </div>
              )
            )}
          </div>
        </motion.div>
      </Container>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && videoModal.videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <YouTubeEmbed
                videoId={videoModal.videoId}
                title={`Testimonial from ${videoModal.author}`}
                autoplay={true}
                lazyLoad={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MaxTestimonials;
