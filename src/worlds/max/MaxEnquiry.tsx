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
  company: z.string().optional(),
  creatorType: z.string().min(1, 'Please select creator type'),
  currentReach: z.string().min(1, 'Please select your current reach'),
  budget: z.string().min(1, 'Please select a budget range'),
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
  message: z.string().min(20, 'Please provide more details (at least 20 characters)'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface MaxEnquiryProps {
  sectionTitle: string;
  headline: string;
  description: string;
  creatorTypes: Array<{ value: string; label: string }>;
  currentReaches: Array<{ value: string; label: string }>;
  budgets: Array<{ value: string; label: string }>;
  goals: Array<{ value: string; label: string }>;
}

export function MaxEnquiry({
  sectionTitle,
  headline,
  description,
  creatorTypes,
  currentReaches,
  budgets,
  goals,
}: MaxEnquiryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const toggleGoal = (value: string) => {
    setSelectedGoals((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', { ...data, goals: selectedGoals });
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <section id="enquiry" className="relative py-32" style={{ background: 'rgba(0,8,18,0.55)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ background: 'rgba(0, 191, 255, 0.15)' }}
            >
              <svg className="w-10 h-10" style={{ color: '#00BFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Application Received!</h3>
            <p className="text-white/70 mb-8">
              Thank you for your interest in X-ERA Max. Our team will review your application and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 border rounded-lg text-white transition-colors"
              style={{ borderColor: 'rgba(0, 191, 255, 0.3)' }}
            >
              Submit Another Application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="relative py-32" style={{ background: 'rgba(0,8,18,0.55)' }}>
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
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00BFFF' }}>
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
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.name ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
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
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.email ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
                }}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Company / Brand</label>
              <input
                {...register('company')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                }}
                placeholder="Your company"
              />
            </div>

            {/* Creator Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Creator Type *</label>
              <select
                {...register('creatorType')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.creatorType ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
                }}
              >
                <option value="">Select type</option>
                {creatorTypes.map((ct) => (
                  <option key={ct.value} value={ct.value}>{ct.label}</option>
                ))}
              </select>
              {errors.creatorType && <p className="mt-1 text-sm text-red-400">{errors.creatorType.message}</p>}
            </div>

            {/* Current Reach */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Current Reach *</label>
              <select
                {...register('currentReach')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.currentReach ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
                }}
              >
                <option value="">Select reach</option>
                {currentReaches.map((cr) => (
                  <option key={cr.value} value={cr.value}>{cr.label}</option>
                ))}
              </select>
              {errors.currentReach && <p className="mt-1 text-sm text-red-400">{errors.currentReach.message}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Monthly Budget *</label>
              <select
                {...register('budget')}
                className="w-full px-4 py-3 rounded-lg text-white"
                style={{
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.budget ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
                }}
              >
                <option value="">Select budget</option>
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget.message}</p>}
            </div>

            {/* Goals - Full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-3">Goals *</label>
              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleGoal(goal.value)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: selectedGoals.includes(goal.value) ? 'rgba(0, 191, 255, 0.2)' : 'rgba(0, 191, 255, 0.05)',
                      border: selectedGoals.includes(goal.value) ? '1px solid rgba(0, 191, 255, 0.5)' : '1px solid rgba(0, 191, 255, 0.15)',
                      color: selectedGoals.includes(goal.value) ? '#00BFFF' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('goals')} value={selectedGoals.join(',')} />
            </div>

            {/* Message - Full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Tell us more *</label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-4 py-3 rounded-lg text-white transition-colors resize-none"
                style={{
                  background: 'rgba(0, 191, 255, 0.05)',
                  border: errors.message ? '1px solid #ef4444' : '1px solid rgba(0, 191, 255, 0.2)',
                }}
                placeholder="What are your growth goals and challenges?"
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              style={{ background: '#00BFFF', color: '#020814' }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default MaxEnquiry;
