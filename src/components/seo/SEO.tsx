// ============================================
// SEO and Metadata Management
// Dynamic meta tags, Open Graph, Twitter Cards, and structured data
// ============================================

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// ============================================
// SEO Configuration Types
// ============================================

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  siteName?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLanguages?: { hrefLang: string; href: string }[];
  jsonLd?: Schema[];
}

// ============================================
// Schema.org Structured Data Types
// ============================================

export interface SchemaOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed?: string;
  }[];
}

export interface SchemaWebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface SchemaWebPage {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Organization';
    name: string;
  };
}

export interface SchemaArticle {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: { '@type': 'ImageObject'; url: string };
  };
}

export interface SchemaService {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description?: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed?: string | { '@type': 'Place'; name: string };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
}

export interface SchemaFAQ {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface SchemaBreadcrumb {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export type Schema =
  | { '@type': string; [key: string]: unknown }
  | SchemaOrganization
  | SchemaWebSite
  | SchemaWebPage
  | SchemaArticle
  | SchemaService
  | SchemaFAQ
  | SchemaBreadcrumb;

// ============================================
// SEO Component
// ============================================

export interface SEOProps extends SEOConfig {
  children?: React.ReactNode;
}

export function SEO({
  title,
  description,
  canonical,
  image,
  imageAlt,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  siteName = 'X-ERA ONE',
  author,
  keywords,
  noIndex,
  noFollow,
  publishedTime,
  modifiedTime,
  section,
  tags,
  locale = 'en_US',
  alternateLanguages,
  jsonLd,
}: SEOProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1',
  ].join(', ');

  const defaultImage = image || '/og-image.jpg';
  const fullImageUrl = defaultImage.startsWith('http')
    ? defaultImage
    : `${window.location.origin}${defaultImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="robots" content={robotsContent} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || currentUrl} />
      <meta property="og:image" content={fullImageUrl} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags && tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Alternate Languages */}
      {alternateLanguages?.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {/* Structured Data */}
      {jsonLd && jsonLd.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : { '@graph': jsonLd })}
        </script>
      )}
    </Helmet>
  );
}

// ============================================
// X-ERA Universe SEO Presets
// ============================================

export const universeSEO: SchemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'X-ERA ONE',
  url: 'https://x-era.one',
  logo: 'https://x-era.one/logo.png',
  sameAs: [
    'https://twitter.com/xeraone',
    'https://instagram.com/xeraone',
    'https://youtube.com/@xeraone',
    'https://linkedin.com/company/x-era',
  ],
};

const worldKeywords: Record<string, string[]> = {
  studios: [
    'X-ERA Studios', 'creative production', 'video production', 'brand storytelling',
    'documentary filmmaking', 'commercial production', 'brand strategy',
    'creative agency', 'media production', 'cinematic content',
  ],
  max: [
    'X-ERA Max', 'content amplification', 'digital media', 'content distribution',
    'YouTube strategy', 'social media marketing', 'content creator platform',
    'audience growth', 'monetization', 'digital brand', 'media analytics',
  ],
  infinity: [
    'X-ERA Infinity', 'AI solutions', 'automation', 'AI research',
    'machine learning', 'intelligent automation', 'data-driven strategy',
    'AI agency', 'workflow automation', 'technology innovation',
  ],
};

export function createWorldSEO(
  worldId: 'studios' | 'max' | 'infinity',
  worldName: string,
  worldDescription: string
): SEOConfig {
  const worldSchemas: Record<string, Schema> = {
    studios: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'X-ERA Studios',
      description: 'Creative storytelling, cinematic production, and brand media',
      url: 'https://x-era.one/studios',
      sameAs: ['https://instagram.com/xerastudios'],
    },
    max: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'X-ERA Max',
      description: 'Digital media amplification, content distribution and creator monetization',
      url: 'https://x-era.one/max',
      sameAs: ['https://youtube.com/@xeramax'],
    },
    infinity: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'X-ERA Infinity',
      description: 'AI research, intelligent automation and data-driven solutions',
      url: 'https://x-era.one/infinity',
      sameAs: [],
    },
  };

  const breadcrumb: SchemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://x-era.one' },
      { '@type': 'ListItem', position: 2, name: worldName, item: `https://x-era.one/${worldId}` },
    ],
  };

  return {
    title: `${worldName} | X-ERA ONE — ${worldDescription.slice(0, 50)}`,
    description: worldDescription,
    canonical: `https://x-era.one/${worldId}`,
    ogType: 'website',
    siteName: 'X-ERA ONE',
    keywords: ['X-ERA ONE', worldName, ...worldKeywords[worldId]],
    jsonLd: [universeSEO, worldSchemas[worldId], breadcrumb],
  };
}

// ============================================
// FAQ Schema Generator
// ============================================

export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): SchemaFAQ {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// Breadcrumb Schema Generator
// ============================================

export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): SchemaBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// Service Schema Generator
// ============================================

export function createServiceSchema(
  name: string,
  description: string,
  provider: string
): SchemaService {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
  };
}

export default SEO;
