import type { WorldConfig } from '@/types';

export const maxConfig: WorldConfig = {
  id: 'max',
  slug: 'x-era-max',
  name: 'X-ERA Max',
  tagline: 'Peak Performance Technology',
  description:
    'High-performance technology solutions and digital innovation hub. We engineer cutting-edge software, AI solutions, and digital infrastructure for the modern enterprise.',
  heroVideo: {
    src: '/videos/max-hero.mp4',
    poster: '/images/max-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    mimeType: 'video/mp4',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
  },
  theme: {
    primary: '#00d4ff',
    secondary: '#0a1628',
    accent: '#00ff88',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #0a1628 100%)',
    glowColor: 'rgba(0, 212, 255, 0.5)',
  },
  features: [
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Custom artificial intelligence and machine learning implementations.',
      icon: 'Brain',
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Architecture',
      description: 'Scalable, secure cloud infrastructure design and deployment.',
      icon: 'Cloud',
    },
    {
      id: 'enterprise-software',
      title: 'Enterprise Software',
      description: 'Bespoke software solutions for complex business challenges.',
      icon: 'Code',
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Advanced analytics and business intelligence platforms.',
      icon: 'BarChart3',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions and threat protection.',
      icon: 'Shield',
    },
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Intelligent automation to streamline operations.',
      icon: 'Settings',
    },
  ],
  stats: [
    { label: 'Systems Deployed', value: '1,200', suffix: '+' },
    { label: 'Uptime Guarantee', value: '99.99', suffix: '%' },
    { label: 'Enterprise Clients', value: '350', suffix: '+' },
    { label: 'Data Processed Daily', value: '50', suffix: 'PB' },
  ],
  cta: {
    primary: {
      label: 'Explore Solutions',
      href: '/worlds/max/solutions',
      variant: 'primary',
      size: 'lg',
    },
    secondary: {
      label: 'Request Demo',
      href: '/worlds/max/demo',
      variant: 'outline',
      size: 'lg',
    },
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Welcome to X-ERA Max',
      content: 'Peak Performance Technology',
    },
    {
      id: 'solutions-overview',
      type: 'features',
      title: 'Our Solutions',
      content: 'Enterprise-grade technology for the modern world.',
    },
    {
      id: 'stats-section',
      type: 'stats',
      title: 'Performance Metrics',
      content: 'Reliability you can count on.',
    },
    {
      id: 'tech-stack',
      type: 'services',
      title: 'Technology Stack',
      content: 'Built on industry-leading technologies.',
    },
  ],
  metadata: {
    pageTitle: 'X-ERA Max | Enterprise Technology Solutions',
    pageDescription:
      'High-performance enterprise technology solutions including AI, cloud architecture, and digital innovation.',
    keywords: ['enterprise software', 'AI solutions', 'cloud architecture', 'technology', 'X-ERA Max'],
    ogImage: '/images/max-og.jpg',
  },
};

export default maxConfig;
