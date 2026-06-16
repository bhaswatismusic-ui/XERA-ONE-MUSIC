import type { WorldConfig } from '@/types';

export const studiosConfig: WorldConfig = {
  id: 'studios',
  slug: 'x-era-studios',
  name: 'X-ERA Studios',
  tagline: 'Where Vision Becomes Reality',
  description:
    'A full-service creative production studio specializing in film, photography, and digital content creation. From concept to delivery, we transform ideas into compelling visual narratives.',
  heroVideo: {
    src: '/videos/studio-hero.mp4',
    poster: '/images/studios-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/7988077/pexels-photo-7988077.jpeg?auto=compress&cs=tinysrgb&w=1920',
    mimeType: 'video/mp4',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
  },
  theme: {
    primary: '#e50914',
    secondary: '#2c2c2c',
    accent: '#f5c518',
    gradient: 'linear-gradient(135deg, #e50914 0%, #b81d24 50%, #2c2c2c 100%)',
    glowColor: 'rgba(229, 9, 20, 0.5)',
  },
  features: [
    {
      id: 'film-production',
      title: 'Film Production',
      description: 'End-to-end film production services from pre-production through post.',
      icon: 'Film',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Professional photography for commercial, editorial, and artistic projects.',
      icon: 'Camera',
    },
    {
      id: 'post-production',
      title: 'Post Production',
      description: 'Advanced editing, color grading, VFX, and sound design.',
      icon: 'Clapperboard',
    },
    {
      id: 'creative-direction',
      title: 'Creative Direction',
      description: 'Strategic creative guidance to bring your vision to life.',
      icon: 'Sparkles',
    },
    {
      id: 'motion-graphics',
      title: 'Motion Graphics',
      description: 'Dynamic visual effects and animated content creation.',
      icon: 'Layers',
    },
    {
      id: 'live-events',
      title: 'Live Events',
      description: 'Full coverage and documentation of live performances and events.',
      icon: 'Radio',
    },
  ],
  stats: [
    { label: 'Projects Completed', value: '500', suffix: '+' },
    { label: 'Industry Awards', value: '45' },
    { label: 'Team Members', value: '120', suffix: '+' },
    { label: 'Client Satisfaction', value: '99', suffix: '%' },
  ],
  cta: {
    primary: {
      label: 'Start Your Project',
      href: '/worlds/studios/contact',
      variant: 'primary',
      size: 'lg',
    },
    secondary: {
      label: 'View Portfolio',
      href: '/worlds/studios/portfolio',
      variant: 'outline',
      size: 'lg',
    },
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Welcome to X-ERA Studios',
      content: 'Where Vision Becomes Reality',
    },
    {
      id: 'services-overview',
      type: 'features',
      title: 'Our Services',
      content: 'Comprehensive creative production services tailored to your vision.',
    },
    {
      id: 'stats-section',
      type: 'stats',
      title: 'By the Numbers',
      content: 'Our track record speaks for itself.',
    },
    {
      id: 'portfolio-highlight',
      type: 'gallery',
      title: 'Featured Work',
      content: 'Explore some of our most impactful projects.',
    },
  ],
  metadata: {
    pageTitle: 'X-ERA Studios | Creative Production Studio',
    pageDescription:
      'Full-service creative production studio specializing in film, photography, and digital content creation.',
    keywords: ['film production', 'photography', 'video production', 'creative studio', 'X-ERA'],
    ogImage: '/images/studios-og.jpg',
  },
};

export default studiosConfig;
