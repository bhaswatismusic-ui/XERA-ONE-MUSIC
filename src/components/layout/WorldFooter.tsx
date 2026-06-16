// ============================================
// World Footer - Modern, Classy
// Used across all world pages
// ============================================

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface WorldFooterProps {
  worldName: string;
  worldColor: string;
  tagline: string;
}

const year = new Date().getFullYear();

const links = {
  worlds: [
    { label: 'Studios', href: '/studios' },
    { label: 'MAX', href: '/max' },
    { label: 'Infinity', href: '/infinity' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/xeraone' },
    { label: 'YouTube', href: 'https://youtube.com/@xeraone' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/xeraone' },
    { label: 'X / Twitter', href: 'https://twitter.com/xeraone' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
  ],
};

export function WorldFooter({ worldName, worldColor, tagline }: WorldFooterProps) {
  const navigate = useNavigate();

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ background: '#020814' }}
    >
      {/* Top glow divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${worldColor}30, transparent)`
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center bottom, ${worldColor}08 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 mb-6 group"
              >
                <div className="w-10 h-10 border border-white/20 rounded flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <span className="text-xl font-bold text-white">X</span>
                </div>
                <span className="text-lg font-semibold tracking-widest text-white/80 group-hover:text-white transition-colors uppercase">
                  X-ERA ONE
                </span>
              </button>

              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
                {tagline}
              </p>

              {/* Current world badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: `${worldColor}10`,
                  border: `1px solid ${worldColor}30`,
                  color: worldColor,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: worldColor }} />
                {worldName}
              </div>
            </motion.div>
          </div>

          {/* Worlds column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6">
              Worlds
            </p>
            <ul className="space-y-3">
              {links.worlds.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/50 hover:text-white transition-colors text-sm group flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6">
              Follow
            </p>
            <ul className="space-y-3">
              {links.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-sm group flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/25 text-xs tracking-wide">
            &copy; {year} X-ERA ONE. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {links.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/25 hover:text-white/60 transition-colors text-xs"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default WorldFooter;
