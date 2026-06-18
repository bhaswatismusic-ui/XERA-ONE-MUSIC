// ============================================
// Max Contact - Simple Contact Form
// ============================================

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export function MaxContact() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = (data: any) => {
    console.log('Max contact submitted:', data);
    // Handle submission - send to individual endpoint
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: 'rgba(0,8,18,0.55)' }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00d4ff' }}>
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Let's <span style={{ color: '#00d4ff' }}>Connect</span>
            </h2>
            <p className="text-lg text-white/60">
              Ready to maximize your digital presence? We're here to help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
                  <Mail className="w-6 h-6" style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                  <a href="mailto:hello@xera-max.com" className="text-white/60 hover:text-white transition-colors">
                    hello@xera-max.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
                  <Phone className="w-6 h-6" style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                  <a href="tel:+1234567890" className="text-white/60 hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
                  <MapPin className="w-6 h-6" style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-white/60">San Francisco, California</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField label="Name" name="name" control={form.control} required />
              <FormField label="Email" name="email" type="email" control={form.control} required />
              <FormField label="Subject" name="subject" control={form.control} required />
              <FormField label="Message" name="message" type="textarea" control={form.control} required />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#00d4ff', color: '#000', boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MaxContact;
