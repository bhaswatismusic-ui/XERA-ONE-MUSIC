import type { WorldConfig } from '@/types';

export const infinityConfig: WorldConfig = {
  id: 'infinity',
  slug: 'x-era-infinity',
  name: 'X-ERA Infinity',
  tagline: 'Beyond Boundaries',
  description:
    'An immersive entertainment and gaming universe featuring interactive experiences, virtual worlds, and next-generation digital entertainment. Explore infinite possibilities.',
  heroVideo: {
    src: '/videos/infinity-hero.mp4',
    poster: '/images/infinity-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/3161593/pexels-photo-3161593.jpeg?auto=compress&cs=tinysrgb&w=1920',
    mimeType: 'video/mp4',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
  },
  theme: {
    primary: '#00ff6a',
    secondary: '#00cc55',
    accent: '#00ff88',
    gradient: 'linear-gradient(135deg, #00ff6a 0%, #00d4ff 50%, #00cc55 100%)',
    glowColor: 'rgba(0, 255, 106, 0.5)',
  },
  features: [
    {
      id: 'gaming',
      title: 'Gaming Universe',
      description: 'Immersive gaming experiences across multiple platforms and genres.',
      icon: 'Gamepad2',
    },
    {
      id: 'virtual-worlds',
      title: 'Virtual Worlds',
      description: 'Explore vast digital landscapes and connect with others.',
      icon: 'Globe',
    },
    {
      id: 'interactive-stories',
      title: 'Interactive Stories',
      description: 'Choose-your-own-adventure narratives shaped by your decisions.',
      icon: 'BookOpen',
    },
    {
      id: 'social-hub',
      title: 'Social Hub',
      description: 'Connect with a global community of creators and players.',
      icon: 'Users',
    },
    {
      id: 'live-events',
      title: 'Live Events',
      description: 'Real-time virtual events, concerts, and experiences.',
      icon: 'Calendar',
    },
    {
      id: 'creator-tools',
      title: 'Creator Tools',
      description: 'Build and share your own experiences with powerful tools.',
      icon: 'Wrench',
    },
  ],
  stats: [
    { label: 'Active Players', value: '2.5', suffix: 'M' },
    { label: 'Virtual Worlds', value: '150', suffix: '+' },
    { label: 'Daily Hours Played', value: '15', suffix: 'M+' },
    { label: 'Community Members', value: '500', suffix: 'K+' },
  ],
  cta: {
    primary: {
      label: 'Enter the Universe',
      href: '/worlds/infinity/explore',
      variant: 'primary',
      size: 'lg',
    },
    secondary: {
      label: 'Create Your World',
      href: '/worlds/infinity/create',
      variant: 'outline',
      size: 'lg',
    },
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Welcome to X-ERA Infinity',
      content: 'Beyond Boundaries',
    },
    {
      id: 'experience-types',
      type: 'features',
      title: 'Explore',
      content: 'Discover infinite ways to play, create, and connect.',
    },
    {
      id: 'stats-section',
      type: 'stats',
      title: 'Growing Universe',
      content: 'Join millions in the X-ERA Infinity experience.',
    },
    {
      id: 'featured-worlds',
      type: 'gallery',
      title: 'Featured Worlds',
      content: 'Step into player-created universes.',
    },
  ],
  metadata: {
    pageTitle: 'X-ERA Infinity | Immersive Entertainment Universe',
    pageDescription:
      'Explore infinite possibilities in our immersive entertainment and gaming universe featuring interactive experiences.',
    keywords: ['gaming', 'virtual worlds', 'interactive entertainment', 'metaverse', 'X-ERA Infinity'],
    ogImage: '/images/infinity-og.jpg',
  },
};

export default infinityConfig;
