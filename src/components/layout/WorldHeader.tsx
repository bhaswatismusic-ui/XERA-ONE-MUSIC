// ============================================
// World Header Component
// Navigation header for X-ERA worlds with neon glow tabs
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Map world to neon glow colors
  const getNeonGlow = (color: string, isActive: boolean): React.CSSProperties => {
    if (!isActive) return {};

    return {
      backgroundColor: `${color}10`,
      color: color,
      border: `1px solid ${color}50`,
      boxShadow: `0 0 15px ${color}40, 0 0 30px ${color}20, inset 0 0 10px ${color}10`,
      textShadow: `0 0 8px ${color}80`
    };
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-16 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/5' : 'bg-black/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="flex items-center justify-center gap-1 py-3 overflow-x-auto scrollbar-hide"
          role="navigation"
          aria-label="Section navigation"
        >
          {subSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-4 py-2 text-sm font-medium tracking-wider uppercase rounded-lg transition-all duration-300 whitespace-nowrap"
                style={getNeonGlow(worldColor, isActive)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = worldColor;
                    e.currentTarget.style.backgroundColor = `${worldColor}08`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {!isActive && (
                  <span className="text-white/50 hover:text-white/80 transition-colors">
                    {section.label}
                  </span>
                )}
                {isActive && section.label}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

// ============================================
// World-Specific Header Exports with Sections
// ============================================

// Studios: Services, Portfolio, Process, Team, Testimonials, Connect
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

// World colors with neon glow
const worldColors = {
  studios: '#ff2020',  // Red neon
  max: '#00d4ff',      // Cyan neon
  infinity: '#00ff6a', // Green neon
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
