import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { universeConfig } from '@/data';
import { scrollReveal, staggerContainer, staggerItem } from '@/hooks/useMotion';
import { Container, Divider } from '@/components/ui';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-800">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={scrollReveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 lg:py-24"
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Brand section */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">X</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {universeConfig.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{universeConfig.tagline}</p>
                </div>
              </Link>

              <p className="text-neutral-400 leading-relaxed max-w-md mb-8">
                {universeConfig.description}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {universeConfig.navigation.social.map((social) => {
                  const SocialIcon = socialIcons[social.icon] || Mail;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-neutral-800 transition-all duration-200"
                      aria-label={social.platform}
                    >
                      <SocialIcon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {universeConfig.footer.columns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    {column.title}
                  </h4>
                  <motion.ul
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    {column.links.map((link) => (
                      <motion.li key={link.id} variants={staggerItem}>
                        <Link
                          to={link.href}
                          className="text-neutral-400 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </div>

          <Divider className="mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-neutral-500">
              &copy; {currentYear} {universeConfig.footer.copyright}
            </p>

            <div className="flex items-center gap-6">
              {universeConfig.footer.legal.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}

export default Footer;
