// ============================================
// World Header Component
// Navigation header for X-ERA worlds with tabs
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils';

// ============================================
// World Header Component
// ============================================

interface WorldHeaderProps {
  currentWorld: 'studios' | 'max' | 'infinity';
  subSections: { id: string; label: string }[];
  worldColor: string;
}

export function WorldHeader({ currentWorld, subSections, worldColor }: WorldHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      for (const section of [...subSections].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subSections]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-16 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-black/50'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sub Navigation - Section Links */}
        <nav
          className="flex items-center justify-center gap-1 py-3 overflow-x-auto"
          role="navigation"
          aria-label="Section navigation"
        >
          {subSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium tracking-wider uppercase rounded-lg transition-all duration-300 whitespace-nowrap',
                activeSection === section.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              )}
              style={{
                backgroundColor: activeSection === section.id ? `${worldColor}20` : undefined,
                color: activeSection === section.id ? worldColor : undefined,
                boxShadow: activeSection === section.id ? `0 0 20px ${worldColor}40` : undefined,
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

// ============================================
// World-Specific Header Exports
// ============================================

// Studios: Services, Portfolio, Process, Team, Testimonials, Connect (FAQ+Contact+Enquiry)
const studiosSections = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'team', label: 'Team' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'connect', label: 'Connect' },
];

// Max: About, Portfolio, Testimonials, Merch, Contact
const maxSections = [
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'merch', label: 'Merch' },
  { id: 'contact', label: 'Contact' },
];

// Infinity: About, Projects, Testimonials, Connect
const infinitySections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'connect', label: 'Connect' },
];

const worldColors = {
  studios: '#FF2020',
  max: '#00d4ff',
  infinity: '#00ff6a',
};

export function StudiosHeader() {
  return (
    <WorldHeader
      currentWorld="studios"
      subSections={studiosSections}
      worldColor={worldColors.studios}
    />
  );
}

export function MaxHeader() {
  return (
    <WorldHeader
      currentWorld="max"
      subSections={maxSections}
      worldColor={worldColors.max}
    />
  );
}

export function InfinityHeader() {
  return (
    <WorldHeader
      currentWorld="infinity"
      subSections={infinitySections}
      worldColor={worldColors.infinity}
    />
  );
}

export default WorldHeader;
