// ============================================
// Max Testimonials - Face Cards with Marquee
// Modern infinite scroll testimonials
// ============================================

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Play, X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui';
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

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Working with X-ERA Max transformed our content strategy. The quality and professionalism exceeded all expectations.',
    author: 'Sarah Chen',
    role: 'Head of Content',
    company: 'Tech Giant Inc',
    image: { src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Sarah Chen' },
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
    image: { src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Michael Torres' },
    rating: 5,
  },
  {
    id: '3',
    quote: 'Their team understood our vision from day one. The creative execution was flawless.',
    author: 'Emily Watson',
    role: 'Creative Lead',
    company: 'Innovation Labs',
    image: { src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Emily Watson' },
    rating: 5,
  },
  {
    id: '4',
    quote: 'From concept to delivery, everything was handled with precision and creativity.',
    author: 'David Park',
    role: 'CEO',
    company: 'Startup Ventures',
    image: { src: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'David Park' },
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
    image: { src: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Jessica Lee' },
    rating: 5,
  },
  {
    id: '6',
    quote: 'Professional, creative, and incredibly responsive. A true partner in content creation.',
    author: 'Robert Kim',
    role: 'VP of Marketing',
    company: 'Digital First',
    image: { src: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Robert Kim' },
    rating: 5,
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '7',
    quote: 'X-ERA Max completely revolutionized how we approach video content. Game-changing partnership.',
    author: 'Amanda Foster',
    role: 'Content Director',
    company: 'Creative Studios',
    image: { src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Amanda Foster' },
    rating: 5,
  },
  {
    id: '8',
    quote: 'The team delivered beyond our expectations. Every project has been outstanding.',
    author: 'James Wright',
    role: 'Executive Producer',
    company: 'Media House',
    image: { src: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'James Wright' },
    rating: 5,
  },
];

interface MaxTestimonialsProps {
  sectionTitle?: string;
  headline?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export function MaxTestimonials({
  sectionTitle = 'Client Stories',
  headline = 'Trusted by Industry Leaders',
  description = 'Hear directly from our partners about their experience working with X-ERA Max.',
  testimonials = defaultTestimonials,
}: MaxTestimonialsProps) {
  const [videoModal, setVideoModal] = useState<Testimonial | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const featuredTestimonials = testimonials.filter((t) => t.featured || t.videoId);
  const upperRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const lowerRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)' }} />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
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
                  key={featuredIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Video/Image Section */}
                  <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={featuredTestimonials[featuredIndex].image.src}
                      alt={featuredTestimonials[featuredIndex].image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />

                    {featuredTestimonials[featuredIndex].videoId && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                        <button
                          onClick={() => setVideoModal(featuredTestimonials[featuredIndex])}
                          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                          }}
                          aria-label={`Play testimonial from ${featuredTestimonials[featuredIndex].author}`}
                        >
                          <Play className="w-8 h-8 text-white ml-1" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
                        </button>
                      </div>
                    )}

                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium"
                      style={{
                        background: 'rgba(0, 212, 255, 0.9)',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                      }}
                    >
                      Video Testimonial
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="space-y-6">
                    <Quote className="w-12 h-12" style={{ color: '#00d4ff', opacity: 0.4 }} />
                    <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                      "{featuredTestimonials[featuredIndex].quote}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <img
                        src={featuredTestimonials[featuredIndex].image.src}
                        alt={featuredTestimonials[featuredIndex].image.alt}
                        className="w-14 h-14 rounded-full object-cover"
                        style={{
                          boxShadow: '0 0 0 3px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)'
                        }}
                      />
                      <div>
                        <div className="font-bold text-white text-lg">
                          {featuredTestimonials[featuredIndex].author}
                        </div>
                        <div className="text-white/60">
                          {featuredTestimonials[featuredIndex].role}, {featuredTestimonials[featuredIndex].company}
                        </div>
                      </div>
                    </div>

                    {featuredTestimonials[featuredIndex].rating && (
                      <div className="flex gap-1">
                        {[...Array(featuredTestimonials[featuredIndex].rating!)].map((_, i) => (
                          <Star key={i} className="w-5 h-5" style={{ fill: '#00d4ff', color: '#00d4ff', filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))' }} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={prevFeatured}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(0, 212, 255, 0.05)'
                  }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFeaturedIndex(index)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: index === featuredIndex ? '32px' : '8px',
                        height: '8px',
                        background: index === featuredIndex ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)',
                        boxShadow: index === featuredIndex ? '0 0 20px rgba(0, 212, 255, 0.5)' : 'none'
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextFeatured}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(0, 212, 255, 0.05)'
                  }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </Container>

      {/* Marquee Face Cards */}
      <div ref={marqueeRef} className="overflow-hidden py-16">
        {/* Upper Row - moving left */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {[...upperRow, ...upperRow].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{
                  borderColor: 'rgba(0, 212, 255, 0.4)',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image.src}
                      alt={testimonial.image.alt}
                      className="w-14 h-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.4), inset 0 0 10px rgba(0, 212, 255, 0.2)',
                        border: '2px solid rgba(0, 212, 255, 0.3)'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">"{testimonial.quote}"</p>
                {testimonial.rating && (
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ fill: '#00d4ff', color: '#00d4ff' }} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lower Row - moving right */}
        <div className="relative mt-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              x: {
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {[...lowerRow, ...lowerRow].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-lower-${index}`}
                className="flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{
                  borderColor: 'rgba(0, 212, 255, 0.4)',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image.src}
                      alt={testimonial.image.alt}
                      className="w-14 h-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.4), inset 0 0 10px rgba(0, 212, 255, 0.2)',
                        border: '2px solid rgba(0, 212, 255, 0.3)'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">"{testimonial.quote}"</p>
                {testimonial.rating && (
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ fill: '#00d4ff', color: '#00d4ff' }} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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
              style={{
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(0, 212, 255, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(0, 212, 255, 0.2)' }}
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
