import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface EnquiryFieldProps {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().optional(),
  description: z.string().min(20, 'Please provide more details (at least 20 characters)'),
  referral: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface StudiosEnquiryProps {
  sectionTitle: string;
  headline: string;
  description: string;
  projectTypes: Array<{ value: string; label: string }>;
  budgetRanges: Array<{ value: string; label: string }>;
}

export function StudiosEnquiry({
  sectionTitle,
  headline,
  description,
  projectTypes,
  budgetRanges,
}: StudiosEnquiryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <section id="enquiry" className="relative py-32" style={{ background: 'rgba(6,0,0,0.55)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
            <p className="text-white/70 mb-8">
              Thank you for reaching out. Our team will review your project and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 border border-neutral-700 text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Send Another Enquiry
            </button>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="enquiry" className="relative py-32" style={{ background: 'rgba(6,0,0,0.55)' }}>
      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
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
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
              <input
                {...register('name')}
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder:text-neutral-500 focus:outline-none transition-colors ${
                  errors.name ? 'border-error-500' : 'border-neutral-700 focus:border-studios-primary'
                }`}
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-error-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder:text-neutral-500 focus:outline-none transition-colors ${
                  errors.email ? 'border-error-500' : 'border-neutral-700 focus:border-studios-primary'
                }`}
                placeholder="john@company.com"
              />
              {errors.email && <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Company</label>
              <input
                {...register('company')}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-studios-primary transition-colors"
                placeholder="Company Name"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Project Type *</label>
              <select
                {...register('projectType')}
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white focus:outline-none transition-colors ${
                  errors.projectType ? 'border-error-500' : 'border-neutral-700 focus:border-studios-primary'
                }`}
              >
                <option value="">Select project type</option>
                {projectTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
              {errors.projectType && <p className="mt-1 text-sm text-error-500">{errors.projectType.message}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Budget Range *</label>
              <select
                {...register('budget')}
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white focus:outline-none transition-colors ${
                  errors.budget ? 'border-error-500' : 'border-neutral-700 focus:border-studios-primary'
                }`}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((br) => (
                  <option key={br.value} value={br.value}>{br.label}</option>
                ))}
              </select>
              {errors.budget && <p className="mt-1 text-sm text-error-500">{errors.budget.message}</p>}
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Timeline</label>
              <input
                {...register('timeline')}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-studios-primary transition-colors"
                placeholder="e.g., 3 months, Q2 2024"
              />
            </div>

            {/* Description - Full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Project Description *</label>
              <textarea
                {...register('description')}
                rows={5}
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder:text-neutral-500 focus:outline-none transition-colors resize-none ${
                  errors.description ? 'border-error-500' : 'border-neutral-700 focus:border-studios-primary'
                }`}
                placeholder="Tell us about your project, goals, and vision..."
              />
              {errors.description && <p className="mt-1 text-sm text-error-500">{errors.description.message}</p>}
            </div>

            {/* Referral */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">How did you hear about us?</label>
              <input
                {...register('referral')}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-studios-primary transition-colors"
                placeholder="Google, referral, social media, etc."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-studios-primary rounded-lg hover:bg-studios-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Enquiry
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </Container>
    </section>
  );
}

export default StudiosEnquiry;
