// ============================================
// Local CMS Adapter
// Static content adapter using local data files
// ============================================

import type { CMSAdapter, CMSConfig } from './CMSAdapter';
import type {
  WorldId,
  WorldContent,
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
} from '../types';

// Import local data
import { studiosData } from '@/data/studios';
import { maxData } from '@/data/max';
import { infinityData } from '@/data/infinity';
import { worldConfigs } from '@/data/worlds';

/**
 * Local CMS Adapter
 *
 * Uses static JSON data files as content source.
 * Perfect for static builds, demos, and as a reference
 * implementation for other CMS adapters.
 */
export class LocalCMSAdapter implements CMSAdapter {
  private config: CMSConfig;
  private worldData: Record<WorldId, Record<string, unknown>>;

  constructor(config: CMSConfig = { type: 'local' }) {
    this.config = config;

    // Map local data to world IDs
    this.worldData = {
      studios: studiosData as unknown as Record<string, unknown>,
      max: maxData as unknown as Record<string, unknown>,
      infinity: infinityData as unknown as Record<string, unknown>,
    };
  }

  // ============================================
  // World Content
  // ============================================

  async getWorld(worldId: WorldId): Promise<WorldContent | null> {
    const data = this.worldData[worldId];
    if (!data) return null;

    const config = worldConfigs[worldId];

    return {
      id: worldId,
      name: config.name,
      slug: config.slug,
      tagline: config.tagline,
      description: config.description,
      theme: config.theme,
      hero: await this.getHero(worldId) as HeroContent,
      about: await this.getAbout(worldId) as AboutContent,
      services: await this.getServices(worldId),
      features: await this.getFeatures(worldId),
      portfolio: await this.getPortfolio(worldId),
      caseStudies: await this.getCaseStudies(worldId),
      testimonials: await this.getTestimonials(worldId) as TestimonialsContent,
      faq: await this.getFAQ(worldId) as FAQContent,
      process: await this.getProcess(worldId),
      contact: await this.getContact(worldId) as ContactContent,
      metadata: {
        id: worldId,
        worldId,
      },
    } as WorldContent;
  }

  async getWorlds(): Promise<WorldContent[]> {
    const worldIds: WorldId[] = ['studios', 'max', 'infinity'];
    const worlds = await Promise.all(
      worldIds.map(id => this.getWorld(id))
    );
    return worlds.filter((w): w is WorldContent => w !== null);
  }

  // ============================================
  // Hero Content
  // ============================================

  async getHero(worldId: WorldId): Promise<HeroContent | null> {
    const data = this.worldData[worldId];
    if (!data?.hero) return null;

    return data.hero as HeroContent;
  }

  // ============================================
  // About Content
  // ============================================

  async getAbout(worldId: WorldId): Promise<AboutContent | null> {
    const data = this.worldData[worldId];
    if (!data?.about) return null;

    return data.about as AboutContent;
  }

  // ============================================
  // Services Content
  // ============================================

  async getServices(worldId: WorldId): Promise<ServicesContent | null> {
    const data = this.worldData[worldId];

    // Map different data keys to services
    const servicesKey = this.getServicesKey(worldId);
    if (!data?.[servicesKey]) return null;

    return data[servicesKey] as ServicesContent;
  }

  private getServicesKey(worldId: WorldId): string {
    const keyMap: Record<WorldId, string> = {
      studios: 'services',
      max: 'solutions',
      infinity: 'aiSolutions',
    };
    return keyMap[worldId];
  }

  // ============================================
  // Features Content
  // ============================================

  async getFeatures(worldId: WorldId): Promise<FeaturesContent | null> {
    const data = this.worldData[worldId];

    // Studios uses worldConfig features
    if (worldId === 'studios') {
      const config = worldConfigs.studios;
      return {
        sectionTitle: 'Our Services',
        headline: 'Full-Spectrum Creative Services',
        description: 'End-to-end production capabilities.',
        features: config.features.map(f => ({
          id: f.id,
          title: f.title,
          description: f.description,
          icon: f.icon,
        })),
        metadata: { id: 'features', worldId },
      };
    }

    return null;
  }

  // ============================================
  // Portfolio Content
  // ============================================

  async getPortfolio(worldId: WorldId): Promise<PortfolioContent | null> {
    const data = this.worldData[worldId];

    const portfolioKey = this.getPortfolioKey(worldId);
    if (!data?.[portfolioKey]) return null;

    return data[portfolioKey] as PortfolioContent;
  }

  private getPortfolioKey(worldId: WorldId): string {
    const keyMap: Record<WorldId, string> = {
      studios: 'portfolio',
      max: 'caseStudies',
      infinity: 'caseStudies',
    };
    return keyMap[worldId];
  }

  async getProject(worldId: WorldId, projectId: string): Promise<PortfolioContent['projects'][0] | null> {
    const portfolio = await this.getPortfolio(worldId);
    if (!portfolio) return null;

    return portfolio.projects.find(p => p.id === projectId) || null;
  }

  // ============================================
  // Case Studies Content
  // ============================================

  async getCaseStudies(worldId: WorldId): Promise<CaseStudyContent | null> {
    const data = this.worldData[worldId];

    if (!data?.caseStudies) return null;
    return data.caseStudies as CaseStudyContent;
  }

  async getCaseStudy(worldId: WorldId, caseId: string): Promise<CaseStudyContent['studies'][0] | null> {
    const caseStudies = await this.getCaseStudies(worldId);
    if (!caseStudies) return null;

    return caseStudies.studies.find(s => s.id === caseId) || null;
  }

  // ============================================
  // Team Content
  // ============================================

  async getTeam(worldId: WorldId): Promise<TeamContent | null> {
    const data = this.worldData[worldId];

    if (!data?.team) return null;
    return data.team as TeamContent;
  }

  // ============================================
  // Testimonials Content
  // ============================================

  async getTestimonials(worldId: WorldId): Promise<TestimonialsContent | null> {
    const data = this.worldData[worldId];

    if (!data?.testimonials) return null;
    return data.testimonials as TestimonialsContent;
  }

  // ============================================
  // FAQ Content
  // ============================================

  async getFAQ(worldId: WorldId): Promise<FAQContent | null> {
    const data = this.worldData[worldId];

    if (!data?.faq) return null;
    return data.faq as FAQContent;
  }

  // ============================================
  // Process Content
  // ============================================

  async getProcess(worldId: WorldId): Promise<ProcessContent | null> {
    const data = this.worldData[worldId];

    if (!data?.process) return null;
    return data.process as ProcessContent;
  }

  // ============================================
  // Contact Content
  // ============================================

  async getContact(worldId: WorldId): Promise<ContactContent | null> {
    const data = this.worldData[worldId];

    if (!data?.contact) return null;
    return data.contact as ContactContent;
  }

  // ============================================
  // Form Content
  // ============================================

  async getForm(worldId: WorldId): Promise<FormContent | null> {
    const data = this.worldData[worldId];

    if (!data?.enquiry) return null;

    // Convert enquiry to form content
    const enquiry = data.enquiry as Record<string, unknown>;
    return {
      sectionTitle: enquiry.sectionTitle as string,
      headline: enquiry.headline as string,
      description: enquiry.description as string,
      fields: [],
      submitLabel: 'Submit',
      successMessage: 'Thank you for your submission!',
      metadata: { id: 'form', worldId },
    };
  }

  // ============================================
  // Partners Content
  // ============================================

  async getPartners(worldId: WorldId): Promise<PartnersContent | null> {
    const data = this.worldData[worldId];

    if (!data?.partners) return null;
    return data.partners as PartnersContent;
  }

  // ============================================
  // Ecosystem Content
  // ============================================

  async getEcosystem(worldId: WorldId): Promise<EcosystemContent | null> {
    const data = this.worldData[worldId];

    const key = worldId === 'max' ? 'ecosystem' : 'ecosystem';
    if (!data?.[key]) return null;
    return data[key] as EcosystemContent;
  }

  // ============================================
  // Distribution Content
  // ============================================

  async getDistribution(worldId: WorldId): Promise<DistributionContent | null> {
    const data = this.worldData[worldId];

    if (!data?.distribution) return null;
    return data.distribution as DistributionContent;
  }

  // ============================================
  // Analytics Content
  // ============================================

  async getAnalytics(worldId: WorldId): Promise<AnalyticsContent | null> {
    const data = this.worldData[worldId];

    if (!data?.analytics) return null;
    return data.analytics as AnalyticsContent;
  }

  // ============================================
  // Partnership Content
  // ============================================

  async getPartnerships(worldId: WorldId): Promise<PartnershipContent | null> {
    const data = this.worldData[worldId];

    if (!data?.partnerships) return null;
    return data.partnerships as PartnershipContent;
  }

  // ============================================
  // Products Content
  // ============================================

  async getProducts(worldId: WorldId): Promise<ProductsContent | null> {
    const data = this.worldData[worldId];

    if (!data?.products) return null;
    return data.products as ProductsContent;
  }

  // ============================================
  // Research Content
  // ============================================

  async getResearch(worldId: WorldId): Promise<ResearchContent | null> {
    const data = this.worldData[worldId];

    if (!data?.research) return null;
    return data.research as ResearchContent;
  }

  // ============================================
  // Automation Content
  // ============================================

  async getAutomation(worldId: WorldId): Promise<AutomationContent | null> {
    const data = this.worldData[worldId];

    if (!data?.automation) return null;
    return data.automation as AutomationContent;
  }

  // ============================================
  // Pipeline Content
  // ============================================

  async getPipeline(worldId: WorldId): Promise<PipelineContent | null> {
    const data = this.worldData[worldId];

    if (!data?.pipeline) return null;
    return data.pipeline as PipelineContent;
  }

  // ============================================
  // Roadmap Content
  // ============================================

  async getRoadmap(worldId: WorldId): Promise<RoadmapContent | null> {
    const data = this.worldData[worldId];

    if (!data?.roadmap) return null;
    return data.roadmap as RoadmapContent;
  }

  // ============================================
  // Form Submission (Local - no-op)
  // ============================================

  async submitForm(
    worldId: WorldId,
    formId: string,
    data: Record<string, unknown>
  ): Promise<{ success: boolean; message: string }> {
    // In local adapter, just log the submission
    console.log('Form submission:', { worldId, formId, data });

    return {
      success: true,
      message: 'Form submitted successfully (local mode)',
    };
  }
}

export default LocalCMSAdapter;
