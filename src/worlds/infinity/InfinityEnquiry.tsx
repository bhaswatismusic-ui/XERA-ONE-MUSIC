import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  organization: z.string().min(1, 'Please enter organization name'),
  orgType: z.string().min(1, 'Please select organization type'),
  aiReadiness: z.string().min(1, 'Please select AI readiness level'),
  budget: z.string().min(1, 'Please select budget range'),
  application: z.string().min(1, 'Please select an application area'),
  description: z.string().min(20, 'Please provide more details (at least 20 characters)'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface InfinityEnquiryProps {
  sectionTitle: string;
  headline: string;
  description: string;
  organizationTypes: Array<{ value: string; label: string }>;
  aiReadiness: Array<{ value: string; label: string }>;
  budgets: Array<{ value: string; label: string }>;
  applications: Array<{ value: string; label: string }>;
}

export function InfinityEnquiry({
  sectionTitle,
  headline,
  description,
  organizationTypes,
  aiReadiness,
  budgets,
  applications,
}: InfinityEnquiryProps) {
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <section id="enquiry" className="relative py-32 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ background: 'rgba(57, 255, 136, 0.15)' }}
            >
              <svg className="w-10 h-10" style={{ color: '#39FF88' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
            <p className="text-white/70 mb-8">
              Thank you for your interest in X-ERA Infinity. Our AI solutions team will review your request and contact you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 border rounded-lg text-white transition-colors"
              style={{ borderColor: 'rgba(57, 255, 136, 0.3)' }}
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="relative py-32 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#39FF88' }}>
              {sectionTitle}
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline}
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-white/70 max-w-2xl mx-auto">
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
                className="w-full px-4 py-3 rounded-lg text-white transition-colors"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.name ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-lg text-white transition-colors"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.email ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
                placeholder="you@company.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Organization *</label>
              <input
                {...register('organization')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.organization ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
                placeholder="Organization / Company"
              />
              {errors.organization && <p className="mt-1 text-sm text-red-400">{errors.organization.message}</p>}
            </div>

            {/* Organization Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Organization Type *</label>
              <select
                {...register('orgType')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.orgType ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
              >
                <option value="">Select type</option>
                {organizationTypes.map((ot) => (
                  <option key={ot.value} value={ot.value}>{ot.label}</option>
                ))}
              </select>
              {errors.orgType && <p className="mt-1 text-sm text-red-400">{errors.orgType.message}</p>}
            </div>

            {/* AI Readiness */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">AI Readiness *</label>
              <select
                {...register('aiReadiness')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.aiReadiness ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
              >
                <option value="">Select readiness level</option>
                {aiReadiness.map((ar) => (
                  <option key={ar.value} value={ar.value}>{ar.label}</option>
                ))}
              </select>
              {errors.aiReadiness && <p className="mt-1 text-sm text-red-400">{errors.aiReadiness.message}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Budget Range *</label>
              <select
                {...register('budget')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.budget ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
              >
                <option value="">Select budget</option>
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget.message}</p>}
            </div>

            {/* Application */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Primary AI Application *</label>
              <select
                {...register('application')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.application ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
              >
                <option value="">Select application area</option>
                {applications.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
              {errors.application && <p className="mt-1 text-sm text-red-400">{errors.application.message}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Project Description *</label>
              <textarea
                {...register('description')}
                rows={5}
                className="w-full px-4 py-3 rounded-lg text-white transition-colors resize-none"
                style={{
                  background: 'rgba(57, 255, 136, 0.05)',
                  border: errors.description ? '1px solid #ef4444' : '1px solid rgba(57, 255, 136, 0.2)',
                }}
                placeholder="Describe your AI project, goals, and challenges..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              style={{ background: '#39FF88', color: '#000000' }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default InfinityEnquiry;
