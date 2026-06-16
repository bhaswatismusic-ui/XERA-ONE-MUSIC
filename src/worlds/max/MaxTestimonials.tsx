// ============================================
// Max Testimonials - Face Cards with Marquee
// No video testimonials
// ============================================

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: { src: string; alt: string };
  rating?: number;
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
  const upperRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const lowerRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-7xl mx-auto px-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#00d4ff' }}
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
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Marquee Face Cards - Upper Row */}
        <div className="overflow-hidden mb-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' } }}
          >
            {[...upperRow, ...upperRow].map((testimonial, index) => (
              <TestimonialCard key={`upper-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Marquee Face Cards - Lower Row (opposite direction) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ x: { duration: 35, repeat: Infinity, ease: 'linear' } }}
          >
            {[...lowerRow, ...lowerRow].map((testimonial, index) => (
              <TestimonialCard key={`lower-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Face card top */}
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
              boxShadow: '0 0 12px rgba(0, 212, 255, 0.3)',
              border: '2px solid rgba(0, 212, 255, 0.25)'
            }}
          />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.author}</p>
          <p className="text-white/40 text-xs">{testimonial.role}</p>
          <p className="text-white/30 text-xs">{testimonial.company}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-white/60 text-sm leading-relaxed line-clamp-3">"{testimonial.quote}"</p>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex gap-0.5 mt-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5" style={{ fill: '#00d4ff', color: '#00d4ff' }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MaxTestimonials;
