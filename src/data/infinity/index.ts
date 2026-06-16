// ============================================
// X-ERA INFINITY WORLD DATA
// AI & Future Technology Ecosystem
// ============================================

// ============================================
// Hero Section Data
// ============================================

export const heroData = {
  headline: 'BUILDING THE FUTURE',
  subheadline: 'AI. Innovation. Infinite Possibilities.',
  description: 'Where artificial intelligence meets human imagination. We architect intelligent systems that transform industries and define tomorrow.',
  cta: {
    primary: {
      label: 'Explore Infinity',
      href: '/worlds/infinity/explore',
    },
    secondary: {
      label: 'View Our Research',
      href: '#research',
    },
  },
  stats: [
    { value: '150+', label: 'AI Models Deployed' },
    { value: '2B+', label: 'API Calls Daily' },
    { value: '99.99%', label: 'System Uptime' },
    { value: '50+', label: 'Enterprise Partners' },
  ],
  video: {
    src: '/videos/infinity-hero.mp4',
    poster: '/images/infinity-hero-poster.jpg',
    fallbackImage: 'https://images.pexels.com/photos/3161593/pexels-photo-3161593.jpeg?auto=compress&cs=tinysrgb&w=1920',
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
  sectionTitle: 'About X-ERA Infinity',
  headline: 'Engineering Tomorrow',
  description: 'X-ERA Infinity is the AI research and innovation division of the X-ERA Universe. We build intelligent systems that solve complex problems, automate the impossible, and create new possibilities for humanity.',
  highlights: [
    {
      id: 'research',
      title: 'Deep Research',
      description: 'Pioneering algorithms and architectures that push the boundaries of machine intelligence.',
      icon: 'Brain',
    },
    {
      id: 'automation',
      title: 'Intelligent Automation',
      description: 'Systems that learn, adapt, and optimize operations at unprecedented scale.',
      icon: 'Settings',
    },
    {
      id: 'products',
      title: 'AI Products',
      description: 'Production-ready AI solutions deployed across industries worldwide.',
      icon: 'Package',
    },
    {
      id: 'ethics',
      title: 'Responsible AI',
      description: 'Built with ethical frameworks, transparency, and human alignment at the core.',
      icon: 'Shield',
    },
  ],
  image: {
    src: 'https://images.pexels.com/photos/3161593/pexels-photo-3161593.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'X-ERA Infinity AI laboratory',
    width: 1200,
    height: 800,
  },
};

// ============================================
// AI Solutions Section
// ============================================

export const aiSolutionsData = {
  sectionTitle: 'AI Solutions',
  headline: 'Intelligence at Scale',
  description: 'Enterprise AI solutions tailored to your industry and challenges.',
  solutions: [
    {
      id: 'nlp',
      title: 'Natural Language Processing',
      description: 'Advanced text understanding, generation, and conversation AI for any language.',
      icon: 'MessageSquare',
      features: ['Chatbots & Assistants', 'Document Analysis', 'Translation', 'Sentiment Analysis'],
      image: {
        src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'NLP AI system',
      },
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      description: 'Image and video recognition, analysis, and generation at massive scale.',
      icon: 'Eye',
      features: ['Object Detection', 'Image Classification', 'Facial Recognition', 'Video Analysis'],
      image: {
        src: 'https://images.pexels.com/photos/2879482/pexels-photo-2879482.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Computer vision system',
      },
    },
    {
      id: 'predictive',
      title: 'Predictive Analytics',
      description: 'Forecasting systems that turn historical data into future insights.',
      icon: 'TrendingUp',
      features: ['Demand Forecasting', 'Risk Assessment', 'Trend Prediction', 'Anomaly Detection'],
      image: {
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Predictive analytics dashboard',
      },
    },
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Intelligent workflows that eliminate manual tasks and accelerate operations.',
      icon: 'Zap',
      features: ['Document Processing', 'Workflow Automation', 'Data Integration', 'Robotic Process'],
      image: {
        src: 'https://images.pexels.com/photos/1649303/pexels-photo-1649303.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Process automation',
      },
    },
    {
      id: 'recommendation',
      title: 'Recommendation Systems',
      description: 'Hyper-personalized suggestion engines that drive engagement and conversion.',
      icon: 'Sparkles',
      features: ['Content Recommendations', 'Product Suggestions', 'User Personalization', 'A/B Optimization'],
      image: {
        src: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Recommendation system',
      },
    },
    {
      id: 'generative',
      title: 'Generative AI',
      description: 'Creative AI that generates content, designs, code, and beyond.',
      icon: 'Wand2',
      features: ['Text Generation', 'Image Creation', 'Code Assistant', 'Design Tools'],
      image: {
        src: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Generative AI',
      },
    },
  ],
};

// ============================================
// Products Section
// ============================================

export const productsData = {
  sectionTitle: 'Products',
  headline: 'Production-Ready AI',
  description: 'Battle-tested AI products powering thousands of organizations.',
  products: [
    {
      id: 'infinity-core',
      name: 'Infinity Core',
      tagline: 'The AI Foundation',
      description: 'Our flagship platform for building, deploying, and managing AI applications.',
      features: ['Model Training', 'API Gateway', 'Auto-scaling', 'Real-time Inference'],
      pricing: 'From $2,500/month',
      image: {
        src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Infinity Core platform',
      },
    },
    {
      id: 'neural-vision',
      name: 'Neural Vision',
      tagline: 'See Everything',
      description: 'Enterprise computer vision platform for image and video analysis at scale.',
      features: ['Object Detection', 'Scene Understanding', 'OCR', 'Real-time Processing'],
      pricing: 'From $3,000/month',
      image: {
        src: 'https://images.pexels.com/photos/2879482/pexels-photo-2879482.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Neural Vision platform',
      },
    },
    {
      id: 'dialogue-engine',
      name: 'Dialogue Engine',
      tagline: 'Conversations That Matter',
      description: 'Conversational AI platform for building intelligent assistants and chatbots.',
      features: ['Multi-turn Dialogue', 'Context Understanding', 'Voice Support', 'Custom Training'],
      pricing: 'From $1,500/month',
      image: {
        src: 'https://images.pexels.com/photos/3183133/pexels-photo-3183133.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Dialogue Engine platform',
      },
    },
    {
      id: 'automate-pro',
      name: 'Automate Pro',
      tagline: 'Intelligent Workflows',
      description: 'End-to-end process automation powered by machine learning.',
      features: ['Workflow Designer', 'Integration Hub', 'Error Handling', 'Analytics Dashboard'],
      pricing: 'From $4,000/month',
      image: {
        src: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Automate Pro platform',
      },
    },
  ],
};

// ============================================
// Research Lab Section
// ============================================

export const researchData = {
  sectionTitle: 'Research Lab',
  headline: 'Pushing Boundaries',
  description: 'Our research teams tackle the hardest problems in artificial intelligence.',
  areas: [
    {
      id: 'agi',
      name: 'AGI Research',
      description: 'Exploring pathways toward artificial general intelligence.',
      icon: 'Brain',
    },
    {
      id: 'alignment',
      name: 'AI Alignment',
      description: 'Ensuring AI systems remain safe and beneficial.',
      icon: 'Shield',
    },
    {
      id: 'multimodal',
      name: 'Multimodal Learning',
      description: 'Systems that understand text, images, audio, and beyond.',
      icon: 'Layers',
    },
    {
      id: 'reasoning',
      name: 'Machine Reasoning',
      description: 'Building AI that can think through complex problems.',
      icon: 'Lightbulb',
    },
    {
      id: 'fewshot',
      name: 'Few-shot Learning',
      description: 'Learning from minimal examples like humans do.',
      icon: 'Zap',
    },
    {
      id: 'efficiency',
      name: 'Efficient AI',
      description: 'Making AI smaller, faster, and more sustainable.',
      icon: 'Activity',
    },
  ],
  stats: [
    { label: 'Published Papers', value: '85+' },
    { label: 'Patents Filed', value: '120+' },
    { label: 'Research Partners', value: '25' },
    { label: 'Research Budget', value: '$200M+' },
  ],
};

// ============================================
// Automation Systems Section
// ============================================

export const automationData = {
  sectionTitle: 'Automation Systems',
  headline: 'Automate the Impossible',
  description: 'Intelligent automation that handles complexity so you can focus on strategy.',
  industries: [
    {
      id: 'finance',
      name: 'Finance',
      description: 'Fraud detection, risk assessment, algorithmic trading, and compliance automation.',
      icon: 'DollarSign',
      caseCount: '50+',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Diagnostic assistance, patient monitoring, drug discovery, and administrative automation.',
      icon: 'Heart',
      caseCount: '40+',
    },
    {
      id: 'retail',
      name: 'Retail',
      description: 'Inventory optimization, demand forecasting, personalization, and supply chain automation.',
      icon: 'ShoppingCart',
      caseCount: '45+',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Quality control, predictive maintenance, production optimization, and robotic integration.',
      icon: 'Cog',
      caseCount: '35+',
    },
    {
      id: 'logistics',
      name: 'Logistics',
      description: 'Route optimization, warehouse automation, demand planning, and delivery prediction.',
      icon: 'Truck',
      caseCount: '30+',
    },
    {
      id: 'energy',
      name: 'Energy',
      description: 'Grid optimization, predictive maintenance, demand forecasting, and efficiency analysis.',
      icon: 'Zap',
      caseCount: '25+',
    },
  ],
};

// ============================================
// Innovation Pipeline Section
// ============================================

export const pipelineData = {
  sectionTitle: 'Innovation Pipeline',
  headline: 'What\'s Next',
  description: 'Upcoming innovations currently in development.',
  projects: [
    {
      id: 'project-alpha',
      name: 'Project Alpha',
      description: 'Next-generation reasoning engine with breakthrough performance.',
      stage: 'Alpha Testing',
      progress: 75,
    },
    {
      id: 'quantum-bridge',
      name: 'Quantum Bridge',
      description: 'Quantum-classical hybrid algorithms for complex optimization.',
      stage: 'Research',
      progress: 30,
    },
    {
      id: 'infinity-edge',
      name: 'Infinity Edge',
      description: 'Ultra-low latency inference for real-time applications.',
      stage: 'Beta',
      progress: 85,
    },
    {
      id: 'multimodal-core',
      name: 'Multimodal Core',
      description: 'Unified model architecture for all modalities.',
      stage: 'Development',
      progress: 50,
    },
  ],
};

// ============================================
// Case Studies Section
// ============================================

export const caseStudiesData = {
  sectionTitle: 'Case Studies',
  headline: 'Real-World Impact',
  description: 'Transformations powered by X-ERA Infinity AI systems.',
  studies: [
    {
      id: 'case-1',
      title: 'Automating 10,000 Daily Decisions',
      client: 'Global Financial Corp',
      category: 'Financial Services',
      description: 'How we automated complex trading decisions with 99.7% accuracy.',
      challenge: 'Manual analysis of market conditions leading to delayed decisions and missed opportunities.',
      solution: 'Deployed real-time predictive AI that processes 10,000 market signals per second.',
      results: [
        { label: 'Decisions Automated', value: '10,000/day' },
        { label: 'Accuracy', value: '99.7%' },
        { label: 'Cost Reduction', value: '73%' },
      ],
      image: {
        src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Financial AI case study',
      },
      testimonial: {
        quote: 'X-ERA Infinity transformed our trading floor. What took hours now happens in milliseconds.',
        author: 'Michael Torres',
        role: 'CTO, Global Financial Corp',
      },
    },
    {
      id: 'case-2',
      title: '90% Faster Medical Diagnoses',
      client: 'Regional Hospital Network',
      category: 'Healthcare',
      description: 'AI-assisted diagnostic imaging that reduced diagnosis time from days to minutes.',
      challenge: 'Radiologist shortage causing long wait times for critical diagnostic results.',
      solution: 'Computer vision AI that pre-analyzes scans and flags critical cases for priority review.',
      results: [
        { label: 'Diagnosis Time', value: '-90%' },
        { label: 'Accuracy', value: '98.5%' },
        { label: 'Critical Cases Caught', value: '+35%' },
      ],
      image: {
        src: 'https://images.pexels.com/photos/2879482/pexels-photo-2879482.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Healthcare AI case study',
      },
    },
    {
      id: 'case-3',
      title: 'Predictive Maintenance Revolution',
      client: 'Industrial Manufacturing Co',
      category: 'Manufacturing',
      description: 'From reactive to predictive maintenance, eliminating 85% of unplanned downtime.',
      challenge: 'Unpredictable equipment failures causing costly production stoppages.',
      solution: 'IoT sensors combined with ML models predicting failures days in advance.',
      results: [
        { label: 'Unplanned Downtime', value: '-85%' },
        { label: 'Maintenance Costs', value: '-40%' },
        { label: 'Equipment Lifespan', value: '+25%' },
      ],
      image: {
        src: 'https://images.pexels.com/photos/3183133/pexels-photo-3183133.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Manufacturing AI case study',
      },
    },
  ],
};

// ============================================
// Roadmap Section
// ============================================

export const roadmapData = {
  sectionTitle: 'Roadmap',
  headline: 'The Path Forward',
  description: 'Our vision for the future of X-ERA Infinity.',
  milestones: [
    {
      quarter: 'Q1 2026',
      title: 'Quantum Integration',
      description: 'First quantum-classical hybrid models in production.',
      status: 'in-progress',
    },
    {
      quarter: 'Q2 2026',
      title: 'Edge Expansion',
      description: 'On-device AI inference for billions of devices.',
      status: 'planned',
    },
    {
      quarter: 'Q3 2026',
      title: 'Model Marketplace',
      description: 'Open platform for third-party AI models.',
      status: 'planned',
    },
    {
      quarter: 'Q4 2026',
      title: 'AGI Milestone',
      description: 'Significant advancement toward general reasoning.',
      status: 'research',
    },
    {
      quarter: '2027',
      title: 'Global AI Infrastructure',
      description: 'Distributed AI compute spanning every continent.',
      status: 'planned',
    },
  ],
};

// ============================================
// Partners Section
// ============================================

export const partnersData = {
  sectionTitle: 'Partners',
  headline: 'Built Together',
  description: 'Industry leaders who trust X-ERA Infinity.',
  categories: [
    {
      name: 'Technology Partners',
      partners: ['NVIDIA', 'Microsoft Azure', 'Google Cloud', 'AWS'],
    },
    {
      name: 'Research Institutions',
      partners: ['MIT AI Lab', 'Stanford HAI', 'Oxford AI', 'CERN'],
    },
    {
      name: 'Industry Partners',
      partners: ['Fortune 500 Companies', 'Global Banks', 'Healthcare Systems', 'Manufacturing Leaders'],
    },
  ],
  stats: [
    { label: 'Enterprise Partners', value: '50+' },
    { label: 'Research Institutions', value: '25+' },
    { label: 'Countries Deployed', value: '40+' },
    { label: 'Joint Projects', value: '100+' },
  ],
};

// ============================================
// Testimonials Section
// ============================================

export const testimonialsData = {
  sectionTitle: 'Testimonials',
  headline: 'What Leaders Say',
  description: 'Industry perspectives on X-ERA Infinity impact.',
  testimonials: [
    {
      id: 'test-1',
      quote: 'X-ERA Infinity\'s NLP models reduced our customer service response time by 80%. The ROI was visible within weeks.',
      author: 'Dr. Jennifer Walsh',
      role: 'VP of Technology, E-commerce Giant',
      image: {
        src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Dr. Jennifer Walsh',
      },
      rating: 5,
    },
    {
      id: 'test-2',
      quote: 'The predictive analytics platform transformed our supply chain. We\'ve eliminated stockouts entirely.',
      author: 'Robert Chen',
      role: 'COO, Global Retail Corporation',
      image: {
        src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Robert Chen',
      },
      rating: 5,
    },
    {
      id: 'test-3',
      quote: 'Their research into AI alignment gives us confidence that we\'re deploying responsible, safe systems at scale.',
      author: 'Amanda Foster',
      role: 'Chief AI Ethics Officer',
      image: {
        src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
        alt: 'Amanda Foster',
      },
      rating: 5,
    },
  ],
};

// ============================================
// FAQ Section
// ============================================

export const faqData = {
  sectionTitle: 'FAQ',
  headline: 'AI Questions Answered',
  description: 'Everything you need to know about implementing X-ERA Infinity.',
  faqs: [
    {
      id: 'faq-1',
      question: 'How do I integrate X-ERA Infinity with existing systems?',
      answer: 'We offer REST APIs, SDKs for all major languages, and pre-built connectors for popular platforms. Our solutions architects provide dedicated integration support.',
    },
    {
      id: 'faq-2',
      question: 'What data privacy measures are in place?',
      answer: 'We implement enterprise-grade encryption, SOC 2 Type II compliance, GDPR compliance, and offer on-premise deployment options. Your data never trains our models.',
    },
    {
      id: 'faq-3',
      question: 'Can models be customized for my specific needs?',
      answer: 'Absolutely. We offer fine-tuning services, custom model development, and transfer learning approaches to adapt our systems to your unique requirements.',
    },
    {
      id: 'faq-4',
      question: 'What kind of support is included?',
      answer: 'All plans include technical documentation, community forums, and email support. Enterprise plans include dedicated account managers, SLA guarantees, and 24/7 priority support.',
    },
    {
      id: 'faq-5',
      question: 'How do you ensure AI safety and ethics?',
      answer: 'All X-ERA Infinity systems undergo rigorous safety testing, bias audits, and alignment reviews. We publish our AI principles and have an independent ethics board.',
    },
    {
      id: 'faq-6',
      question: 'What are the infrastructure requirements?',
      answer: 'We offer cloud, hybrid, and on-premise deployment. Cloud requires no infrastructure. On-premise needs vary by workload—we provide detailed specs after assessment.',
    },
  ],
};

// ============================================
// Contact Section
// ============================================

export const contactData = {
  sectionTitle: 'Contact Us',
  headline: 'Start the Conversation',
  description: 'Let\'s explore how AI can transform your organization.',
  email: 'infinity@xeraone.com',
  phone: '+1 (555) 456-7890',
  address: {
    street: '9012 Innovation Way',
    city: 'Boston',
    state: 'MA',
    zip: '02142',
    country: 'United States',
  },
  hours: {
    weekdays: '9:00 AM - 8:00 PM EST',
    weekends: 'By Appointment',
  },
  social: {
    twitter: 'https://twitter.com/xerainfinity',
    linkedin: 'https://linkedin.com/company/xerainfinity',
    github: 'https://github.com/xerainfinity',
    youtube: 'https://youtube.com/@xerainfinity',
  },
};

// ============================================
// Enquiry Form Data
// ============================================

export const enquiryData = {
  sectionTitle: 'Request Consultation',
  headline: 'Tell Us About Your Project',
  description: 'Our AI experts will design a custom solution architecture for your needs.',
  organizationTypes: [
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
    { value: 'midmarket', label: 'Mid-Market (100-1000 employees)' },
    { value: 'startup', label: 'Startup (Under 100 employees)' },
    { value: 'government', label: 'Government / Public Sector' },
    { value: 'academic', label: 'Academic / Research' },
  ],
  aiReadiness: [
    { value: 'exploring', label: 'Exploring AI possibilities' },
    { value: 'poc', label: 'Ready for proof of concept' },
    { value: 'piloting', label: 'Planning pilot deployment' },
    { value: 'scaling', label: 'Scaling existing AI' },
    { value: 'advanced', label: 'Advanced AI capabilities' },
  ],
  budgets: [
    { value: 'under50k', label: 'Under $50,000' },
    { value: '50to200k', label: '$50,000 - $200,000' },
    { value: '200kto1m', label: '$200,000 - $1M' },
    { value: 'over1m', label: 'Over $1M' },
    { value: 'flexible', label: 'Budget is flexible' },
  ],
  applications: [
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'vision', label: 'Computer Vision' },
    { value: 'predictive', label: 'Predictive Analytics' },
    { value: 'automation', label: 'Process Automation' },
    { value: 'generative', label: 'Generative AI' },
    { value: 'other', label: 'Other' },
  ],
};

// ============================================
// Export All Data
// ============================================

export const infinityData = {
  hero: heroData,
  about: aboutData,
  aiSolutions: aiSolutionsData,
  products: productsData,
  research: researchData,
  automation: automationData,
  pipeline: pipelineData,
  caseStudies: caseStudiesData,
  roadmap: roadmapData,
  partners: partnersData,
  testimonials: testimonialsData,
  faq: faqData,
  contact: contactData,
  enquiry: enquiryData,
};

export default infinityData;
