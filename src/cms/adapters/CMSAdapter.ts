// ============================================
// CMS Adapter Interface
// Abstraction layer for any headless CMS
// ============================================

import type {
  WorldId,
  HeroContent,
  AboutContent,
  ServicesContent,
  FeaturesContent,
  PortfolioContent,
  CaseStudyContent,
  TeamContent,
  TestimonialsContent,
  FAQContent,
  ProcessContent,
  ContactContent,
  FormContent,
  PartnersContent,
  EcosystemContent,
  DistributionContent,
  AnalyticsContent,
  PartnershipContent,
  ProductsContent,
  ResearchContent,
  AutomationContent,
  PipelineContent,
  RoadmapContent,
  WorldContent,
} from './types';

// ============================================
// CMS Adapter Interface
// ============================================

export interface CMSAdapter {
  // World Content
  getWorld(worldId: WorldId): Promise<WorldContent | null>;
  getWorlds(): Promise<WorldContent[]>;

  // Hero Content
  getHero(worldId: WorldId): Promise<HeroContent | null>;

  // About Content
  getAbout(worldId: WorldId): Promise<AboutContent | null>;

  // Services Content
  getServices(worldId: WorldId): Promise<ServicesContent | null>;

  // Features Content
  getFeatures(worldId: WorldId): Promise<FeaturesContent | null>;

  // Portfolio Content
  getPortfolio(worldId: WorldId): Promise<PortfolioContent | null>;
  getProject(worldId: WorldId, projectId: string): Promise<PortfolioContent['projects'][0] | null>;

  // Case Studies Content
  getCaseStudies(worldId: WorldId): Promise<CaseStudyContent | null>;
  getCaseStudy(worldId: WorldId, caseId: string): Promise<CaseStudyContent['studies'][0] | null>;

  // Team Content
  getTeam(worldId: WorldId): Promise<TeamContent | null>;

  // Testimonials Content
  getTestimonials(worldId: WorldId): Promise<TestimonialsContent | null>;

  // FAQ Content
  getFAQ(worldId: WorldId): Promise<FAQContent | null>;

  // Process Content
  getProcess(worldId: WorldId): Promise<ProcessContent | null>;

  // Contact Content
  getContact(worldId: WorldId): Promise<ContactContent | null>;

  // Form Content
  getForm(worldId: WorldId): Promise<FormContent | null>;

  // Partners Content
  getPartners(worldId: WorldId): Promise<PartnersContent | null>;

  // Ecosystem Content
  getEcosystem(worldId: WorldId): Promise<EcosystemContent | null>;

  // Distribution Content
  getDistribution(worldId: WorldId): Promise<DistributionContent | null>;

  // Analytics Content
  getAnalytics(worldId: WorldId): Promise<AnalyticsContent | null>;

  // Partnership Content
  getPartnerships(worldId: WorldId): Promise<PartnershipContent | null>;

  // Products Content
  getProducts(worldId: WorldId): Promise<ProductsContent | null>;

  // Research Content
  getResearch(worldId: WorldId): Promise<ResearchContent | null>;

  // Automation Content
  getAutomation(worldId: WorldId): Promise<AutomationContent | null>;

  // Pipeline Content
  getPipeline(worldId: WorldId): Promise<PipelineContent | null>;

  // Roadmap Content
  getRoadmap(worldId: WorldId): Promise<RoadmapContent | null>;

  // Form Submission
  submitForm(worldId: WorldId, formId: string, data: Record<string, unknown>): Promise<{ success: boolean; message: string }>;
}

// ============================================
// CMS Configuration
// ============================================

export interface CMSConfig {
  type: 'local' | 'supabase' | 'sanity' | 'strapi' | 'contentful' | 'directus' | 'wordpress';
  apiKey?: string;
  apiUrl?: string;
  projectId?: string;
  dataset?: string;
  locale?: string;
  cacheEnabled?: boolean;
  cacheTTL?: number;
}

// ============================================
// Content Cache
// ============================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class ContentCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.defaultTTL = defaultTTL;
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Generate cache key
  static createKey(...parts: string[]): string {
    return parts.filter(Boolean).join(':');
  }
}

// ============================================
// Content Validator
// ============================================

export class ContentValidator {
  static validateHero(content: unknown): content is HeroContent {
    if (!content || typeof content !== 'object') return false;
    const hero = content as Record<string, unknown>;
    return (
      typeof hero.headline === 'string' &&
      typeof hero.description === 'string' &&
      !!hero.cta &&
      Array.isArray(hero.stats)
    );
  }

  static validateAbout(content: unknown): content is AboutContent {
    if (!content || typeof content !== 'object') return false;
    const about = content as Record<string, unknown>;
    return (
      typeof about.headline === 'string' &&
      typeof about.description === 'string' &&
      Array.isArray(about.highlights)
    );
  }

  static validateServices(content: unknown): content is ServicesContent {
    if (!content || typeof content !== 'object') return false;
    const services = content as Record<string, unknown>;
    return (
      typeof services.headline === 'string' &&
      Array.isArray(services.services)
    );
  }

  static validateTestimonials(content: unknown): content is TestimonialsContent {
    if (!content || typeof content !== 'object') return false;
    const testimonials = content as Record<string, unknown>;
    return Array.isArray(testimonials.testimonials);
  }

  static validateFAQ(content: unknown): content is FAQContent {
    if (!content || typeof content !== 'object') return false;
    const faq = content as Record<string, unknown>;
    return Array.isArray(faq.faqs);
  }

  static validateContact(content: unknown): content is ContactContent {
    if (!content || typeof content !== 'object') return false;
    const contact = content as Record<string, unknown>;
    return (
      typeof contact.email === 'string' &&
      typeof contact.phone === 'string' &&
      !!contact.address
    );
  }
}
