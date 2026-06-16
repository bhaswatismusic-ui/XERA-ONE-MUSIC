// ============================================
// X-ERA MAX WORLD DATA
// Media & Content Ecosystem
// ============================================

// ============================================
// Hero Section Data
// ============================================

export const heroData = {
  headline: 'AMPLIFY EVERYTHING',
  subheadline: 'Content. Reach. Influence. Scale.',
  description: 'The acceleration engine for creators, brands, and digital experiences. Transform your content into cultural movements.',
  cta: {
    primary: {
      label: 'Start Growing',
      href: '/worlds/max/get-started',
    },
    secondary: {
      label: 'See How It Works',
      href: '#about',
    },
  },
  stats: [
    { value: '500M+', label: 'Monthly Views' },
    { value: '150K+', label: 'Active Creators' },
    { value: '98%', label: 'Uptime SLA' },
    { value: '45+', label: 'Platform Integrations' },
  ],
  video: {
    src: '/videos/max-hero.mp4',
    poster: '/images/max-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
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
  sectionTitle: 'About X-ERA Max',
  headline: 'The Amplification Engine',
  description: 'X-ERA Max is where content becomes culture. We provide the infrastructure, tools, and intelligence to transform creative vision into measurable impact across every digital frontier.',
  highlights: [
    {
      id: 'distribution',
      title: 'Global Distribution',
      description: 'Seamless multi-platform deployment to billions of potential viewers worldwide.',
      icon: 'Globe',
    },
    {
      id: 'analytics',
      title: 'Deep Analytics',
      description: 'Real-time insights that decode audience behavior and optimize performance.',
      icon: 'BarChart3',
    },
    {
      id: 'monetization',
      title: 'Revenue Optimization',
      description: 'Intelligent monetization strategies that maximize every view, click, and engagement.',
      icon: 'DollarSign',
    },
    {
      id: 'growth',
      title: 'Accelerated Growth',
      description: 'AI-powered growth engines that identify and capture new audience segments.',
      icon: 'TrendingUp',
    },
  ],
  image: {
    src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'X-ERA Max digital media dashboard',
    width: 1200,
    height: 800,
  },
};

// ============================================
// Testimonials Section Data
// ============================================

export const testimonialsData = {
  sectionTitle: 'Testimonials',
  headline: 'From Our Creators',
  description: 'Success stories from creators who transformed their reach with X-ERA Max.',
  testimonials: [
    {
      id: 'test-1',
      quote: 'X-ERA Max gave us the data and tools to understand exactly what our audience wanted. Our growth trajectory completely changed.',
      author: 'Sarah Mitchell',
      role: 'Content Creator, 1.2M subscribers',
      image: {
        src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Sarah Mitchell',
      },
      rating: 5,
    },
    {
      id: 'test-2',
      quote: 'The multi-platform distribution alone saves us 20 hours per week. The analytics are just incredible depth.',
      author: 'Marcus Johnson',
      role: 'Creative Director, Brand Studio',
      image: {
        src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Marcus Johnson',
      },
      rating: 5,
    },
    {
      id: 'test-3',
      quote: 'We tripled our revenue in 6 months. The monetization tools and brand partnerships are unmatched.',
      author: 'Elena Rodriguez',
      role: 'YouTuber & Podcaster',
      image: {
        src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Elena Rodriguez',
      },
      rating: 5,
    },
  ],
};

// ============================================
// Contact Section
// ============================================

export const contactData = {
  sectionTitle: 'Get in Touch',
  headline: 'Ready to Amplify?',
  description: 'Let\'s discuss how X-ERA Max can accelerate your content journey.',
  email: 'max@xeraone.com',
  phone: '+1 (555) 987-6543',
  address: {
    street: '5678 Digital Plaza',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
  },
  hours: {
    weekdays: '9:00 AM - 7:00 PM PST',
    weekends: '10:00 AM - 4:00 PM PST',
  },
  social: {
    twitter: 'https://twitter.com/xeramax',
    linkedin: 'https://linkedin.com/company/xeramax',
    instagram: 'https://instagram.com/xeramax',
    youtube: 'https://youtube.com/@xeramax',
  },
};

// ============================================
// Export All Data
// ============================================

export const maxData = {
  hero: heroData,
  about: aboutData,
  testimonials: testimonialsData,
  contact: contactData,
};

export default maxData;
