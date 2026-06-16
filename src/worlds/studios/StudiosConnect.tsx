// ============================================
// Studios Connect - Combined FAQ + Contact + Quote
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Send, MessageSquare, HelpCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms';
import { cn } from '@/utils';

// ============================================
// Form Schemas
// ============================================

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Select a project type'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().min(20, 'Please provide more details about your project'),
});

// ============================================
// FAQ Data
// ============================================

const faqData = [
  {
    question: 'What services does X-ERA Studios offer?',
    answer: 'We offer comprehensive creative production services including film production, photography, post-production, motion graphics, and live event coverage. Our team handles everything from concept development to final delivery.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple photoshoot might take 1-2 days, while a full film production can span several weeks. We\'ll provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! We work with clients globally. Our team is equipped for remote collaboration and can travel for on-location shoots anywhere in the world.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'Pricing is tailored to each project\'s specific requirements. We offer competitive rates and transparent quotes. Contact us for a customized estimate based on your needs.',
  },
  {
    question: 'Can you help with concept development?',
    answer: 'Absolutely. Our creative direction services include concept development, storyboarding, and strategic planning to bring your vision to life.',
  },
];

// ============================================
// Studios Connect Component
// ============================================

interface StudiosConnectProps {
  className?: string;
}

export function StudiosConnect({ className }: StudiosConnectProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'quote'>('contact');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const quoteForm = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { name: '', email: '', company: '', projectType: '', budget: '', timeline: '', details: '' },
  });

  const onContactSubmit = (data: any) => {
    console.log('Contact submitted:', data);
    // Handle submission
  };

  const onQuoteSubmit = (data: any) => {
    console.log('Quote submitted:', data);
    // Handle submission
  };

  return (
    <section id="connect" className={cn('py-20 relative', className)}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF2020 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span style={{ color: '#FF2020' }}>Connect</span> With Us
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have questions or ready to start your project? We're here to help bring your vision to life.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { id: 'contact', label: 'Contact', icon: Mail },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
            { id: 'quote', label: 'Get a Quote', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300',
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              )}
              style={{
                backgroundColor: activeTab === tab.id ? '#FF202020' : 'transparent',
                boxShadow: activeTab === tab.id ? '0 0 20px #FF202040' : undefined,
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-lg bg-[#FF202020] flex items-center justify-center">
                      <Mail className="w-5 h-5" style={{ color: '#FF2020' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Email</p>
                      <a href="mailto:hello@xera-studios.com" className="hover:text-white transition-colors">
                        hello@xera-studios.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-lg bg-[#FF202020] flex items-center justify-center">
                      <Phone className="w-5 h-5" style={{ color: '#FF2020' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Phone</p>
                      <a href="tel:+1234567890" className="hover:text-white transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-lg bg-[#FF202020] flex items-center justify-center">
                      <MapPin className="w-5 h-5" style={{ color: '#FF2020' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Location</p>
                      <p>Los Angeles, California</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                <FormField label="Name" name="name" control={contactForm.control} required />
                <FormField label="Email" name="email" type="email" control={contactForm.control} required />
                <FormField label="Phone" name="phone" type="tel" control={contactForm.control} />
                <FormField label="Subject" name="subject" control={contactForm.control} required />
                <FormField label="Message" name="message" type="textarea" control={contactForm.control} required />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: '#FF2020', boxShadow: '0 0 20px #FF202040' }}
                >
                  <Send className="w-4 h-4" />
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
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-white/10 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <ChevronDown
                        className={cn('w-5 h-5 text-white/50 transition-transform', expandedFaq === index && 'rotate-180')}
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
                          <p className="px-4 pb-4 text-white/60">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quote Tab */}
          {activeTab === 'quote' && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Request a Quote</h3>
              <form onSubmit={quoteForm.handleSubmit(onQuoteSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField label="Name" name="name" control={quoteForm.control} required />
                  <FormField label="Email" name="email" type="email" control={quoteForm.control} required />
                </div>
                <FormField label="Company" name="company" control={quoteForm.control} />
                <FormField
                  label="Project Type"
                  name="projectType"
                  type="select"
                  options={[
                    { value: 'film', label: 'Film Production' },
                    { value: 'photography', label: 'Photography' },
                    { value: 'motion', label: 'Motion Graphics' },
                    { value: 'post', label: 'Post Production' },
                    { value: 'event', label: 'Live Event' },
                    { value: 'other', label: 'Other' },
                  ]}
                  control={quoteForm.control}
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    label="Budget Range"
                    name="budget"
                    type="select"
                    options={[
                      { value: '5k-10k', label: '$5K - $10K' },
                      { value: '10k-25k', label: '$10K - $25K' },
                      { value: '25k-50k', label: '$25K - $50K' },
                      { value: '50k+', label: '$50K+' },
                    ]}
                    control={quoteForm.control}
                  />
                  <FormField
                    label="Timeline"
                    name="timeline"
                    type="select"
                    options={[
                      { value: 'asap', label: 'ASAP' },
                      { value: '1-2weeks', label: '1-2 Weeks' },
                      { value: '1month', label: '1 Month' },
                      { value: 'flexible', label: 'Flexible' },
                    ]}
                    control={quoteForm.control}
                  />
                </div>
                <FormField
                  label="Project Details"
                  name="details"
                  type="textarea"
                  control={quoteForm.control}
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: '#FF2020', boxShadow: '0 0 20px #FF202040' }}
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default StudiosConnect;
