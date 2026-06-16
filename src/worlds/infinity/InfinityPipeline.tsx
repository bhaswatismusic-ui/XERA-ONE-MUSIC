import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface Project {
  id: string;
  name: string;
  description: string;
  stage: string;
  progress: number;
}

interface InfinityPipelineProps {
  sectionTitle: string;
  headline: string;
  description: string;
  projects: Project[];
}

export function InfinityPipeline({
  sectionTitle,
  headline,
  description,
  projects,
}: InfinityPipelineProps) {
  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Research': 'rgba(57, 255, 136, 0.3)',
      'Development': 'rgba(57, 255, 136, 0.5)',
      'Alpha Testing': 'rgba(57, 255, 136, 0.7)',
      'Beta': 'rgba(57, 255, 136, 0.8)',
    };
    return colors[stage] || 'rgba(57, 255, 136, 0.3)';
  };

  return (
    <section id="pipeline" className="relative py-32" style={{ background: '#030a08' }}>
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

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="p-8 rounded-2xl border"
              style={{
                background: 'rgba(57, 255, 136, 0.02)',
                borderColor: 'rgba(57, 255, 136, 0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: getStageColor(project.stage), color: '#000' }}
                >
                  {project.stage}
                </span>
              </div>

              <p className="text-sm text-white/60 mb-6">{project.description}</p>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: '#39FF88' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InfinityPipeline;
