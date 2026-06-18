import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface StudiosContactProps {
  sectionTitle: string;
  headline: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
}

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

export function StudiosContact({
  sectionTitle,
  headline,
  description,
  email,
  phone,
  address,
  hours,
  social,
}: StudiosContactProps) {
  return (
    <section id="contact" className="relative py-32" style={{ background: 'rgba(6,0,0,0.55)' }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="mb-4">
              <span className="text-sm font-semibold text-studios-primary tracking-wider uppercase">
                {sectionTitle}
              </span>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {headline}
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="text-lg text-white/70 mb-12"
            >
              {description}
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-studios-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-studios-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Email</div>
                  <a href={`mailto:${email}`} className="text-white hover:text-studios-primary transition-colors">
                    {email}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-studios-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-studios-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Phone</div>
                  <a href={`tel:${phone}`} className="text-white hover:text-studios-primary transition-colors">
                    {phone}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-studios-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-studios-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Address</div>
                  <div className="text-white">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}<br />
                    {address.country}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-studios-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-studios-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Hours</div>
                  <div className="text-white">
                    Mon - Fri: {hours.weekdays}<br />
                    Sat - Sun: {hours.weekends}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="flex gap-3 mt-10">
              {Object.entries(social).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white/60 hover:text-studios-primary hover:border-studios-primary/50 transition-all"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 rounded-2xl p-8 border border-neutral-800"
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#portfolio" className="text-white/70 hover:text-studios-primary transition-colors flex items-center gap-2">
                  <span>View Our Work</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-studios-primary transition-colors flex items-center gap-2">
                  <span>Our Services</span>
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/70 hover:text-studios-primary transition-colors flex items-center gap-2">
                  <span>Meet the Team</span>
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/70 hover:text-studios-primary transition-colors flex items-center gap-2">
                  <span>Our Process</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-neutral-800">
              <p className="text-white/50 text-sm mb-4">Ready to start your project?</p>
              <a
                href="#enquiry"
                className="inline-block px-6 py-3 bg-studios-primary text-white font-semibold rounded-lg hover:bg-studios-secondary transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default StudiosContact;
