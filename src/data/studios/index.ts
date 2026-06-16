import type { ContentItem } from '@/types';

// ============================================
// Hero Section Data
// ============================================

export const heroData = {
  headline: 'Where Vision Becomes Reality',
  subheadline: 'Full-Service Creative Production Studio',
  description: 'From concept to final cut, we transform bold ideas into compelling visual narratives that captivate audiences and define brands.',
  cta: {
    primary: {
      label: 'View Our Work',
      href: '#portfolio',
    },
    secondary: {
      label: 'Start a Project',
      href: '#contact',
    },
  },
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '45', label: 'Industry Awards' },
    { value: '120+', label: 'Creative Experts' },
    { value: '99%', label: 'Client Satisfaction' },
  ],
  video: {
    src: '/videos/studio-hero.mp4',
    poster: '/images/studios-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/7988077/pexels-photo-7988077.jpeg?auto=compress&cs=tinysrgb&w=1920',
    mimeType: 'video/mp4',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
  },
};

// ============================================
// About Section Data
// ============================================

export const aboutData = {
  sectionTitle: 'About X-ERA Studios',
  headline: 'Crafting Stories That Move',
  description: `We are a collective of filmmakers, designers, strategists, and innovators united by a passion for visual storytelling. Every frame we capture, every cut we make, serves a singular purpose: to bring your vision to life with uncompromising excellence.`,
  highlights: [
    {
      id: 'craft',
      title: 'Masterful Craft',
      description: 'Award-winning talent wielding cutting-edge tools to create cinematic experiences.',
      icon: 'Award',
    },
    {
      id: 'innovation',
      title: 'Constant Innovation',
      description: 'Pushing boundaries with emerging technologies and techniques.',
      icon: 'Lightbulb',
    },
    {
      id: 'collaboration',
      title: 'Seamless Collaboration',
      description: 'Your vision, amplified by our expertise. True creative partnership.',
      icon: 'Users',
    },
    {
      id: 'impact',
      title: 'Measurable Impact',
      description: 'Content that drives engagement, conversions, and brand growth.',
      icon: 'TrendingUp',
    },
  ],
  image: {
    src: 'https://images.pexels.com/photos/2889459/pexels-photo-2889459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'X-ERA Studios production team at work',
    width: 1200,
    height: 800,
  },
  video: null,
};

// ============================================
// Services Section Data
// ============================================

export const servicesData = {
  sectionTitle: 'What We Do',
  headline: 'Full-Spectrum Creative Services',
  description: 'End-to-end production capabilities that transform ideas into impactful visual content.',
  services: [
    {
      id: 'film-production',
      title: 'Film Production',
      description: 'Feature films, documentaries, and short films crafted with cinematic excellence. From script development to final color grade.',
      icon: 'Film',
      features: ['Script Development', 'Pre-Production', 'Principal Photography', 'Post-Production'],
      image: {
        src: 'https://images.pexels.com/photos/2879482/pexels-photo-2879482.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Film production set',
      },
    },
    {
      id: 'commercial',
      title: 'Commercial Production',
      description: 'Compelling advertisements and branded content that capture attention and drive action across all platforms.',
      icon: 'Tv',
      features: ['TV Commercials', 'Social Media Ads', 'Brand Films', 'Product Videos'],
      image: {
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Commercial filming',
      },
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Stunning still imagery that tells stories. Editorial, commercial, and artistic photography for every need.',
      icon: 'Camera',
      features: ['Editorial Shoots', 'Product Photography', 'Corporate Headshots', 'Event Coverage'],
      image: {
        src: 'https://images.pexels.com/photos/1779750/pexels-photo-1779750.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Professional photography',
      },
    },
    {
      id: 'motion-graphics',
      title: 'Motion Graphics',
      description: 'Dynamic visual effects and animated content that elevate narratives and brands to new heights.',
      icon: 'Layers',
      features: ['2D Animation', '3D Animation', 'Visual Effects', 'Motion Design'],
      image: {
        src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Motion graphics design',
      },
    },
    {
      id: 'sound-design',
      title: 'Sound Design',
      description: 'Immersive audio experiences that complete the visual journey. From location recording to final mix.',
      icon: 'Volume2',
      features: ['Sound Recording', 'Audio Post', 'Music Composition', 'Voice Over'],
      image: {
        src: 'https://images.pexels.com/photos/1649303/pexels-photo-1649303.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Sound design studio',
      },
    },
    {
      id: 'live-events',
      title: 'Live Events',
      description: 'Full-scale event production and documentation. Concerts, conferences, and experiences captured live.',
      icon: 'Radio',
      features: ['Event Planning', 'Live Streaming', 'Multi-Cam Coverage', 'Documentary Editing'],
      image: {
        src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Live event production',
      },
    },
  ],
};

// ============================================
// Portfolio Section Data
// ============================================

export interface PortfolioProject extends ContentItem {
  category: string;
  year: string;
  client: string;
  featured: boolean;
  video?: {
    src: string;
    mimeType: string;
  };
}

export const portfolioData = {
  sectionTitle: 'Our Work',
  headline: 'Projects That Speak',
  description: 'A curated selection of our most impactful creative work across film, commercial, and digital.',
  categories: ['All', 'Film', 'Commercial', 'Music Video', 'Documentary', 'Photography'],
  projects: [
    {
      id: 'proj-001',
      title: 'Echoes of Tomorrow',
      description: 'A feature-length documentary exploring the intersection of technology and human creativity.',
      category: 'Documentary',
      year: '2024',
      client: 'TechForward Foundation',
      featured: true,
      tags: ['Documentary', 'Award Winner'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Echoes of Tomorrow documentary',
      },
    },
    {
      id: 'proj-002',
      title: 'Velocity',
      description: 'High-energy automotive campaign for luxury vehicle brand showcasing performance and elegance.',
      category: 'Commercial',
      year: '2024',
      client: 'Apex Motors',
      featured: true,
      tags: ['Commercial', 'Automotive'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Velocity automotive campaign',
      },
    },
    {
      id: 'proj-003',
      title: 'Frequencies',
      description: 'Visual album for acclaimed electronic artist, blending live performance with abstract narratives.',
      category: 'Music Video',
      year: '2024',
      client: 'Nova Records',
      featured: true,
      tags: ['Music Video', 'Creative'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/167471/pexels-photo-167471.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Frequencies music video',
      },
    },
    {
      id: 'proj-004',
      title: 'Heritage',
      description: 'Brand documentary celebrating 100 years of craftsmanship for heritage luxury goods company.',
      category: 'Film',
      year: '2023',
      client: 'Maison Laurent',
      featured: false,
      tags: ['Film', 'Brand Documentary'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/3183133/pexels-photo-3183133.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Heritage brand documentary',
      },
    },
    {
      id: 'proj-005',
      title: 'Urban Canvas',
      description: 'Photography series documenting street artists transforming city landscapes worldwide.',
      category: 'Photography',
      year: '2024',
      client: 'Global Arts Initiative',
      featured: true,
      tags: ['Photography', 'Art'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/2889459/pexels-photo-2889459.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Urban Canvas photography',
      },
    },
    {
      id: 'proj-006',
      title: 'The Summit Series',
      description: 'Multi-platform campaign for outdoor adventure brand featuring extreme sports athletes.',
      category: 'Commercial',
      year: '2024',
      client: 'Peak Performance',
      featured: false,
      tags: ['Commercial', 'Sports'],
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Summit Series campaign',
      },
    },
  ],
};

// ============================================
// Process Section Data
// ============================================

export const processData = {
  sectionTitle: 'Our Process',
  headline: 'From Vision to Reality',
  description: 'A proven creative process refined over hundreds of successful projects.',
  steps: [
    {
      id: 'discover',
      number: '01',
      title: 'Discover',
      description: 'Understanding your vision, goals, audience, and brand. Deep research and creative exploration.',
      phase: 'Strategy',
    },
    {
      id: 'conceive',
      number: '02',
      title: 'Conceive',
      description: 'Developing the creative concept. Scriptwriting, storyboarding, and visual treatment development.',
      phase: 'Pre-Production',
    },
    {
      id: 'create',
      number: '03',
      title: 'Create',
      description: 'Execution excellence. Production, direction, and capturing of all creative assets.',
      phase: 'Production',
    },
    {
      id: 'craft',
      number: '04',
      title: 'Craft',
      description: 'Post-production magic. Editing, color grading, sound design, and visual effects.',
      phase: 'Post-Production',
    },
    {
      id: 'deliver',
      number: '05',
      title: 'Deliver',
      description: 'Final delivery and optimization across all platforms. Analytics setup and performance tracking.',
      phase: 'Delivery',
    },
  ],
};

// ============================================
// Team Section Data
// ============================================

export const teamData = {
  sectionTitle: 'Our Team',
  headline: 'Masters of the Craft',
  description: 'Award-winning talent with decades of combined experience in film, design, and technology.',
  team: [
    {
      id: 'team-001',
      name: 'Marcus Chen',
      role: 'Executive Director',
      bio: 'Emmy-winning director with 20+ years crafting visual narratives for global brands.',
      image: {
        src: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt: 'Marcus Chen',
      },
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      id: 'team-002',
      name: 'Sarah Williams',
      role: 'Creative Director',
      bio: 'Former agency creative director. Cannes Lions winner. Expert in brand storytelling.',
      image: {
        src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt: 'Sarah Williams',
      },
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      id: 'team-003',
      name: 'James Okonkwo',
      role: 'Director of Photography',
      bio: 'ASC member specializing in cinematic narrative. Sundance and Venice Film Festival selections.',
      image: {
        src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt: 'James Okonkwo',
      },
      social: {
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      id: 'team-004',
      name: 'Elena Rodriguez',
      role: 'Head of Post Production',
      bio: 'BAFTA-nominated editor. Expert in long-form documentary and commercial editing.',
      image: {
        src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt: 'Elena Rodriguez',
      },
      social: {
        linkedin: '#',
      },
    },
  ],
};

// ============================================
// Testimonials Section Data
// ============================================

export const testimonialsData = {
  sectionTitle: 'Testimonials',
  headline: 'Words From Our Partners',
  description: 'What our clients and collaborators say about working with X-ERA Studios.',
  testimonials: [
    {
      id: 'test-001',
      quote: 'X-ERA Studios transformed our brand narrative. Their creative vision and execution exceeded every expectation. The campaign drove a 340% increase in engagement.',
      author: 'David Park',
      role: 'CMO, TechVision Inc.',
      image: {
        src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'David Park',
      },
      rating: 5,
    },
    {
      id: 'test-002',
      quote: 'Working with Marcus and his team was transformative. They don\'t just execute—they elevate. Our documentary won three major festivals after their touch.',
      author: 'Amanda Foster',
      role: 'Director, Foster Foundation',
      image: {
        src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Amanda Foster',
      },
      rating: 5,
    },
    {
      id: 'test-003',
      quote: 'The level of craft and attention to detail is unparalleled. From concept to delivery, every touchpoint was professional, creative, and on-brand.',
      author: 'Michael Torres',
      role: 'Brand Director, Maison Laurent',
      image: {
        src: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Michael Torres',
      },
      rating: 5,
    },
  ],
};

// ============================================
// FAQ Section Data
// ============================================

export const faqData = {
  sectionTitle: 'FAQ',
  headline: 'Common Questions',
  description: 'Quick answers to help you understand our process and services.',
  faqs: [
    {
      id: 'faq-001',
      question: 'What types of projects does X-ERA Studios handle?',
      answer: 'We specialize in film production, commercial content, photography, motion graphics, and live event coverage. From 30-second ads to feature documentaries, we scale our approach to match your vision.',
    },
    {
      id: 'faq-002',
      question: 'What is the typical project timeline?',
      answer: 'Timelines vary by project scope. A commercial campaign typically runs 4-8 weeks from kickoff to delivery. Feature projects can span several months. We provide detailed timelines during our discovery phase.',
    },
    {
      id: 'faq-003',
      question: 'Do you work with clients remotely?',
      answer: 'Absolutely. We have a robust remote production workflow refined over years of global collaboration. Our team spans multiple continents, ensuring round-the-clock creative momentum.',
    },
    {
      id: 'faq-004',
      question: 'What is your pricing structure?',
      answer: 'Every project is unique. We provide custom quotes based on scope, deliverables, and timeline. Contact us for a free consultation and detailed estimate tailored to your needs.',
    },
    {
      id: 'faq-005',
      question: 'Can you handle emergency or rush projects?',
      answer: 'Yes. Our team is experienced in fast-turnaround production without sacrificing quality. Rush projects are subject to availability and may incur additional fees.',
    },
    {
      id: 'faq-006',
      question: 'Do you provide raw footage and project files?',
      answer: 'By default, clients receive all final deliverables. Raw footage and project files can be included in the initial agreement or purchased separately based on project terms.',
    },
  ],
};

// ============================================
// Contact Section Data
// ============================================

export const contactData = {
  sectionTitle: 'Get in Touch',
  headline: 'Start Your Project',
  description: 'Ready to bring your vision to life? Let\'s create something extraordinary together.',
  email: 'studio@xeraone.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '1234 Creative Boulevard',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'United States',
  },
  hours: {
    weekdays: '9:00 AM - 6:00 PM PST',
    weekends: 'By Appointment',
  },
  social: {
    instagram: 'https://instagram.com/xerastudios',
    linkedin: 'https://linkedin.com/company/xerastudios',
    twitter: 'https://twitter.com/xerastudios',
    youtube: 'https://youtube.com/@xerastudios',
  },
};

// ============================================
// Enquiry Form Data
// ============================================

export const enquiryData = {
  sectionTitle: 'Request a Quote',
  headline: 'Tell Us About Your Project',
  description: 'Fill out the form below and our team will get back to you within 24 hours.',
  projectTypes: [
    { value: 'commercial', label: 'Commercial / Advertising' },
    { value: 'film', label: 'Film / Documentary' },
    { value: 'photography', label: 'Photography' },
    { value: 'motion', label: 'Motion Graphics / Animation' },
    { value: 'event', label: 'Live Event Coverage' },
    { value: 'other', label: 'Other' },
  ],
  budgetRanges: [
    { value: 'under25', label: 'Under $25,000' },
    { value: '25to50', label: '$25,000 - $50,000' },
    { value: '50to100', label: '$50,000 - $100,000' },
    { value: '100to250', label: '$100,000 - $250,000' },
    { value: 'over250', label: 'Over $250,000' },
    { value: 'flexible', label: 'Budget is Flexible' },
  ],
};

export const studiosData = {
  hero: heroData,
  about: aboutData,
  services: servicesData,
  portfolio: portfolioData,
  process: processData,
  team: teamData,
  testimonials: testimonialsData,
  faq: faqData,
  contact: contactData,
  enquiry: enquiryData,
};

export default studiosData;
