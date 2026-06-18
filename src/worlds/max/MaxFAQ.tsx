import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface MaxFAQProps {
  sectionTitle: string;
  headline: string;
  description: string;
  faqs: FAQ[];
}

export function MaxFAQ({
  sectionTitle,
  headline,
  description,
  faqs,
}: MaxFAQProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-32" style={{ background: 'rgba(0,8,18,0.55)' }}>
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

        {/* FAQ Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={staggerItem}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                border: `1px solid ${openFaq === faq.id ? 'rgba(0, 191, 255, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                background: openFaq === faq.id ? 'rgba(0, 191, 255, 0.05)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5" style={{ color: '#00BFFF' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-white/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MaxFAQ;
