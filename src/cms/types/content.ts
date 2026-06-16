// ============================================
// CMS Content Types
// Enterprise-grade content modeling for X-ERA Universe
// ============================================

// ============================================
// Hero Content Types
// ============================================

export interface HeroContent {
  headline: string;
  subheadline: string;
  description: string;
  cta: CTAPair;
  stats: StatItem[];
  video?: VideoContent;
  image?: ImageContent;
  metadata: ContentMetadata;
}

export interface CTAPair {
  primary: CTAButton;
  secondary?: CTAButton;
}

export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
}

// ============================================
// About Content Types
// ============================================

export interface AboutContent {
  sectionTitle: string;
  headline: string;
  description: string;
  highlights: HighlightItem[];
  image?: ImageContent;
  video?: VideoContent;
  metadata: ContentMetadata;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ============================================
// Services/Features Content Types
// ============================================

export interface ServicesContent {
  sectionTitle: string;
  headline: string;
  description: string;
  services: ServiceItem[];
  metadata: ContentMetadata;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  image?: ImageContent;
  video?: VideoContent;
  order?: number;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
}

export interface FeaturesContent {
  sectionTitle: string;
  headline: string;
  description: string;
  features: FeatureItem[];
  metadata: ContentMetadata;
}

// ============================================
// Portfolio/Projects Content Types
// ============================================

export interface PortfolioContent {
  sectionTitle: string;
  headline: string;
  description: string;
  categories: string[];
  projects: ProjectItem[];
  metadata: ContentMetadata;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  client?: string;
  year?: string;
  featured: boolean;
  media: MediaContent;
  video?: VideoContent;
  order?: number;
}

export interface CaseStudyContent {
  sectionTitle: string;
  headline: string;
  description: string;
  studies: CaseStudyItem[];
  metadata: ContentMetadata;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: ResultItem[];
  image: ImageContent;
  testimonial?: TestimonialQuote;
  order?: number;
}

export interface ResultItem {
  label: string;
  value: string;
}

// ============================================
// Team Content Types
// ============================================

export interface TeamContent {
  sectionTitle: string;
  headline: string;
  description: string;
  team: TeamMember[];
  metadata: ContentMetadata;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: ImageContent;
  social?: SocialLinks;
  order?: number;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
}

// ============================================
// Testimonials Content Types
// ============================================

export interface TestimonialsContent {
  sectionTitle: string;
  headline: string;
  description: string;
  testimonials: TestimonialItem[];
  metadata: ContentMetadata;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: ImageContent;
  rating?: number;
  order?: number;
}

export interface TestimonialQuote {
  quote: string;
  author: string;
  role: string;
}

// ============================================
// FAQ Content Types
// ============================================

export interface FAQContent {
  sectionTitle: string;
  headline: string;
  description: string;
  faqs: FAQItem[];
  metadata: ContentMetadata;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

// ============================================
// Process Content Types
// ============================================

export interface ProcessContent {
  sectionTitle: string;
  headline: string;
  description: string;
  steps: ProcessStep[];
  metadata: ContentMetadata;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  phase: string;
  order?: number;
}

// ============================================
// Contact Content Types
// ============================================

export interface ContactContent {
  sectionTitle: string;
  headline: string;
  description: string;
  email: string;
  phone: string;
  address: AddressContent;
  hours: BusinessHours;
  social: SocialLinks;
  metadata: ContentMetadata;
}

export interface AddressContent {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface BusinessHours {
  weekdays: string;
  weekends: string;
}

// ============================================
// Form Content Types
// ============================================

export interface FormContent {
  sectionTitle: string;
  headline: string;
  description: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  metadata: ContentMetadata;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  options?: SelectOption[];
  validation?: ValidationRules;
  order?: number;
}

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'multiselect';

export interface SelectOption {
  value: string;
  label: string;
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

// ============================================
// Media Content Types
// ============================================

export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export interface VideoContent {
  src: string;
  poster?: string;
  fallbackImage: ImageContent;
  mimeType: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface MediaContent {
  type: 'image' | 'video' | 'animation';
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// ============================================
// Generic Content Types
// ============================================

export interface ContentMetadata {
  id: string;
  worldId?: WorldId;
  locale?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  seo?: SEOContent;
}

export interface SEOContent {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

// ============================================
// World Content Types
// ============================================

export type WorldId = 'studios' | 'max' | 'infinity';

export interface WorldContent {
  id: WorldId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  theme: WorldTheme;
  hero: HeroContent;
  about: AboutContent;
  services?: ServicesContent;
  features?: FeaturesContent;
  portfolio?: PortfolioContent;
  caseStudies?: CaseStudyContent;
  team?: TeamContent;
  testimonials: TestimonialsContent;
  process?: ProcessContent;
  faq: FAQContent;
  contact: ContactContent;
  form?: FormContent;
  metadata: ContentMetadata;
}

export interface WorldTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  glowColor: string;
}

// ============================================
// Partner Content Types
// ============================================

export interface PartnersContent {
  sectionTitle: string;
  headline: string;
  description: string;
  categories: PartnerCategory[];
  stats: StatItem[];
  metadata: ContentMetadata;
}

export interface PartnerCategory {
  name: string;
  partners: string[];
}

// ============================================
// Pipeline/Roadmap Content Types
// ============================================

export interface PipelineContent {
  sectionTitle: string;
  headline: string;
  description: string;
  projects: PipelineProject[];
  metadata: ContentMetadata;
}

export interface PipelineProject {
  id: string;
  name: string;
  description: string;
  stage: string;
  progress: number;
  order?: number;
}

export interface RoadmapContent {
  sectionTitle: string;
  headline: string;
  description: string;
  milestones: RoadmapMilestone[];
  metadata: ContentMetadata;
}

export interface RoadmapMilestone {
  quarter: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'research';
  order?: number;
}

// ============================================
// Ecosystem/Network Content Types
// ============================================

export interface EcosystemContent {
  sectionTitle: string;
  headline: string;
  description: string;
  platforms: PlatformItem[];
  stats: StatItem[];
  metadata: ContentMetadata;
}

export interface PlatformItem {
  name: string;
  icon: string;
  reach: string;
  order?: number;
}

export interface DistributionContent {
  sectionTitle: string;
  headline: string;
  description: string;
  regions: RegionItem[];
  totalNodes: number;
  totalCountries: number;
  dailyViews: string;
  bandwidth: string;
  metadata: ContentMetadata;
}

export interface RegionItem {
  id: string;
  name: string;
  nodes: number;
  coverage: string;
}

// ============================================
// Analytics Content Types
// ============================================

export interface AnalyticsContent {
  sectionTitle: string;
  headline: string;
  description: string;
  features: FeatureItem[];
  metrics: StatItem[];
  metadata: ContentMetadata;
}

// ============================================
// Partnership Content Types
// ============================================

export interface PartnershipContent {
  sectionTitle: string;
  headline: string;
  description: string;
  tiers: PartnershipTier[];
  creators?: CreatorItem[];
  metadata: ContentMetadata;
}

export interface PartnershipTier {
  id: string;
  name: string;
  audience: string;
  benefits: string[];
  color?: string;
  order?: number;
}

export interface CreatorItem {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  growth: string;
  image: ImageContent;
  order?: number;
}

// ============================================
// Product Content Types
// ============================================

export interface ProductsContent {
  sectionTitle: string;
  headline: string;
  description: string;
  products: ProductItem[];
  metadata: ContentMetadata;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  pricing: string;
  image: ImageContent;
  order?: number;
}

// ============================================
// Research Content Types
// ============================================

export interface ResearchContent {
  sectionTitle: string;
  headline: string;
  description: string;
  areas: ResearchArea[];
  stats: StatItem[];
  metadata: ContentMetadata;
}

export interface ResearchArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  order?: number;
}

// ============================================
// Automation Content Types
// ============================================

export interface AutomationContent {
  sectionTitle: string;
  headline: string;
  description: string;
  industries: IndustryItem[];
  metadata: ContentMetadata;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  caseCount: string;
  order?: number;
}
