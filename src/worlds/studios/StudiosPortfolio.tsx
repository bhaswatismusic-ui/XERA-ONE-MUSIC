import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, Filter } from 'lucide-react';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';
import type { PortfolioProject } from '@/data/studios';

interface StudiosPortfolioProps {
  sectionTitle: string;
  headline: string;
  description: string;
  categories: string[];
  projects: PortfolioProject[];
}

export function StudiosPortfolio({
  sectionTitle,
  headline,
  description,
  categories,
  projects,
}: StudiosPortfolioProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="relative py-32" style={{ background: 'rgba(8,2,2,0.72)' }}>
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category
                    ? 'bg-studios-primary text-white'
                    : 'bg-neutral-900 text-white/70 border border-neutral-800 hover:border-studios-primary/50'
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <div className="aspect-[4/5] relative">
                  <img
                    src={project.media.src}
                    alt={project.media.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Video Play Icon (if video) */}
                  {project.video && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-studios-primary ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-studios-primary/20 text-studios-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-studios-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  {/* View Project Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-studios-primary flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Border Glow */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl border-2 transition-colors duration-300 pointer-events-none
                    ${hoveredProject === project.id ? 'border-studios-primary/50' : 'border-transparent'}
                  `}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-studios-primary rounded-lg hover:bg-studios-primary transition-colors">
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
}

export default StudiosPortfolio;
