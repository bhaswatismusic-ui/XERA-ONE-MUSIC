import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Github, Youtube } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Github,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  instagram: Instagram,
};

interface InfinityContactProps {
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
    twitter: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
}

export function InfinityContact({
  sectionTitle,
  headline,
  description,
  email,
  phone,
  address,
  hours,
  social,
}: InfinityContactProps) {
  return (
    <section id="contact" className="relative py-32" style={{ background: '#030a08' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#39FF88' }}>
                {sectionTitle}
              </span>
            </motion.div>

            <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-6">
              {headline}
            </motion.h2>

            <motion.p variants={staggerItem} className="text-lg text-white/70 mb-12">
              {description}
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: '#39FF88' }} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Email</div>
                  <a href={`mailto:${email}`} className="text-white hover:opacity-80 transition-opacity">
                    {email}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <Phone className="w-5 h-5" style={{ color: '#39FF88' }} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Phone</div>
                  <a href={`tel:${phone}`} className="text-white hover:opacity-80 transition-opacity">
                    {phone}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: '#39FF88' }} />
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
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(57, 255, 136, 0.15)' }}
                >
                  <Clock className="w-5 h-5" style={{ color: '#39FF88' }} />
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
                const IconComponent = socialIcons[platform] || Github;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(57, 255, 136, 0.05)',
                      borderColor: 'rgba(57, 255, 136, 0.2)',
                      color: '#39FF88',
                    }}
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
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(57, 255, 136, 0.02)', borderColor: 'rgba(57, 255, 136, 0.15)' }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#ai-solutions" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span>AI Solutions</span>
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a href="#research" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span>Research Lab</span>
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span>Case Studies</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Ready to build the future?</p>
              <a
                href="#enquiry"
                className="inline-block px-6 py-3 font-semibold rounded-lg transition-all duration-300"
                style={{ background: '#39FF88', color: '#000000' }}
              >
                Request Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default InfinityContact;
