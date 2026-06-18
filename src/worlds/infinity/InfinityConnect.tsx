// ============================================
// Infinity Connect - Combined FAQ + Contact
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// FAQ data
const faqData = [
  {
    question: 'What AI solutions does X-ERA Infinity offer?',
    answer: 'We provide comprehensive AI solutions including machine learning model development, intelligent automation, predictive analytics, and custom AI applications tailored to your business needs.',
  },
  {
    question: 'How long does an AI project typically take?',
    answer: 'Project timelines vary based on complexity. A typical project ranges from 8-16 weeks, including discovery, development, training, and deployment phases. We provide detailed timelines during consultation.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We work across healthcare, finance, retail, manufacturing, and technology sectors. Our solutions are adaptable to any industry requiring intelligent systems and data-driven insights.',
  },
  {
    question: 'Do you provide ongoing support after deployment?',
    answer: 'Yes, we offer comprehensive post-deployment support including monitoring, maintenance, model updates, and continuous improvement services to ensure optimal performance.',
  },
  {
    question: 'How do you ensure AI ethics and responsible AI?',
    answer: 'We follow strict ethical guidelines, implement bias detection, ensure transparency in model decisions, and prioritize data privacy and security in all our solutions.',
  },
];

export function InfinityConnect() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('contact');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', company: '', projectType: '', message: '' },
  });

  const onSubmit = (data: any) => {
    console.log('Infinity contact submitted:', data);
    // Handle submission - send to individual endpoint
  };

  return (
    <section id="connect" className="relative py-32 overflow-hidden" style={{ background: 'rgba(5,8,5,0.72)' }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00ff6a 0%, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00ff6a' }}>
            Connect
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Let's Build the <span style={{ color: '#00ff6a' }}>Future</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Have questions about our AI solutions? Ready to start your intelligent transformation?
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { id: 'contact', label: 'Contact', icon: Mail },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? 'rgba(0, 255, 106, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#00ff6a' : 'rgba(255,255,255,0.5)',
                boxShadow: activeTab === tab.id ? '0 0 20px rgba(0, 255, 106, 0.3)' : undefined,
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
            >
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 255, 106, 0.15)' }}>
                      <Mail className="w-6 h-6" style={{ color: '#00ff6a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Email</p>
                      <a href="mailto:hello@xera-infinity.com" className="text-white hover:text-[#00ff6a] transition-colors">
                        hello@xera-infinity.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 255, 106, 0.15)' }}>
                      <Phone className="w-6 h-6" style={{ color: '#00ff6a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-white hover:text-[#00ff6a] transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 255, 106, 0.15)' }}>
                      <MapPin className="w-6 h-6" style={{ color: '#00ff6a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Location</p>
                      <p className="text-white">Boston, Massachusetts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="Name" name="name" control={form.control} required />
                <FormField label="Email" name="email" type="email" control={form.control} required />
                <FormField label="Company" name="company" control={form.control} />
                <FormField
                  label="Project Type"
                  name="projectType"
                  type="select"
                  options={[
                    { value: 'ai-development', label: 'AI/ML Development' },
                    { value: 'automation', label: 'Intelligent Automation' },
                    { value: 'analytics', label: 'Predictive Analytics' },
                    { value: 'consulting', label: 'AI Consulting' },
                    { value: 'other', label: 'Other' },
                  ]}
                  control={form.control}
                  required
                />
                <FormField label="Message" name="message" type="textarea" control={form.control} required />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: '#00ff6a', color: '#000', boxShadow: '0 0 20px rgba(0, 255, 106, 0.4)' }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-white/10 rounded-lg overflow-hidden"
                    style={{ background: 'rgba(0, 255, 106, 0.02)' }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-white pr-4">{faq.question}</span>
                      <ChevronDown
                        className="w-5 h-5 text-white/50 transition-transform shrink-0"
                        style={{ transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-white/70">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default InfinityConnect;
