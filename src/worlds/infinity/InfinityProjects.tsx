// ============================================
// Infinity Projects - Team Profiles & Client Collaborations
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Lightbulb, Award, ExternalLink, ChevronRight } from 'lucide-react';

// Project categories
const projectCategories = [
  { id: 'team', label: 'Team Profiles', icon: Users },
  { id: 'collaborations', label: 'Client Collaborations', icon: Briefcase },
  { id: 'process', label: 'Our Process', icon: Lightbulb },
];

// Team profiles
const teamProfiles = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Chief AI Architect',
    bio: 'Leading our AI research with 15+ years in machine learning and cognitive systems.',
    image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Machine Learning', 'Neural Networks', 'AI Ethics'],
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    role: 'Head of Innovation',
    bio: 'Driving breakthrough solutions at the intersection of technology and creativity.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Product Innovation', 'R&D Strategy', 'Tech Integration'],
    linkedin: '#',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'Lead Data Scientist',
    bio: 'Transforming complex data into actionable insights and intelligent systems.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Data Science', 'Analytics', 'Predictive Modeling'],
    linkedin: '#',
  },
  {
    id: 4,
    name: 'James Kim',
    role: 'Automation Director',
    bio: 'Building intelligent automation systems that scale enterprise operations.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Process Automation', 'Enterprise Systems', 'Workflow Design'],
    linkedin: '#',
  },
];

// Client collaborations
const collaborations = [
  {
    id: 1,
    client: 'TechVenture Corp',
    project: 'AI-Powered Analytics Platform',
    description: 'Built a comprehensive analytics solution processing 50M+ daily events.',
    image: 'https://images.pexels.com/photos/3161593/pexels-photo-3161593.jpeg?auto=compress&cs=tinysrgb&w=600',
    metrics: { performance: '+340%', efficiency: '+85%', cost: '-60%' },
    tags: ['AI', 'Analytics', 'Enterprise'],
  },
  {
    id: 2,
    client: 'GlobalRetail Inc',
    project: 'Intelligent Inventory System',
    description: 'Developed ML-driven inventory management reducing waste by 70%.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    metrics: { accuracy: '99.2%', savings: '$2.4M', speed: '10x' },
    tags: ['Machine Learning', 'Retail', 'Automation'],
  },
  {
    id: 3,
    client: 'HealthFirst Partners',
    project: 'Predictive Health Analytics',
    description: 'Created predictive models for patient health outcomes with 95% accuracy.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    metrics: { accuracy: '95%', patients: '100K+', impact: 'Lives saved' },
    tags: ['Healthcare', 'AI', 'Predictive'],
  },
];

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Discovery & Analysis',
    description: 'Deep dive into your business needs, data landscape, and strategic goals.',
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Solution Design',
    description: 'Architect intelligent systems tailored to your specific requirements.',
    duration: '2-3 weeks',
  },
  {
    step: '03',
    title: 'Development & Training',
    description: 'Build and train models with your data for optimal performance.',
    duration: '4-8 weeks',
  },
  {
    step: '04',
    title: 'Deployment & Scale',
    description: 'Launch production systems with monitoring and continuous improvement.',
    duration: '2-4 weeks',
  },
];

export function InfinityProjects() {
  const [activeCategory, setActiveCategory] = useState('team');
  const [selectedMember, setSelectedMember] = useState<typeof teamProfiles[0] | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-black">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5"
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
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Our <span style={{ color: '#00ff6a' }}>Work</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Meet our team, explore collaborations, and understand our process.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? 'rgba(0, 255, 106, 0.15)' : 'transparent',
                color: activeCategory === cat.id ? '#00ff6a' : 'rgba(255,255,255,0.5)',
                boxShadow: activeCategory === cat.id ? '0 0 20px rgba(0, 255, 106, 0.3)' : undefined,
              }}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Team Profiles */}
        <AnimatePresence mode="wait">
          {activeCategory === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamProfiles.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-xl overflow-hidden border border-white/10 hover:border-[#00ff6a]/50 transition-all cursor-pointer"
                    style={{ background: 'rgba(0, 255, 106, 0.02)' }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#00ff6a] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm" style={{ color: '#00ff6a' }}>{member.role}</p>
                      <div className="flex gap-2 mt-3">
                        {member.expertise.slice(0, 2).map((skill) => (
                          <span key={skill} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Client Collaborations */}
          {activeCategory === 'collaborations' && (
            <motion.div
              key="collaborations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-12">
                {collaborations.map((collab, index) => (
                  <motion.div
                    key={collab.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className={`rounded-xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img
                        src={collab.image}
                        alt={collab.project}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="flex gap-2 mb-3">
                        {collab.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs rounded-full" style={{ background: 'rgba(0, 255, 106, 0.15)', color: '#00ff6a' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-white/50 mb-2">{collab.client}</p>
                      <h3 className="text-2xl font-bold text-white mb-4">{collab.project}</h3>
                      <p className="text-white/70 mb-6">{collab.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(collab.metrics).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-2xl font-bold" style={{ color: '#00ff6a' }}>{value}</p>
                            <p className="text-sm text-white/50 capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Our Process */}
          {activeCategory === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-6 rounded-xl border border-white/10"
                    style={{ background: 'rgba(0, 255, 106, 0.02)' }}
                  >
                    <div className="text-4xl font-bold mb-4" style={{ color: 'rgba(0, 255, 106, 0.3)' }}>
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{step.description}</p>
                    <p className="text-xs px-3 py-1 rounded-full inline-block" style={{ background: 'rgba(0, 255, 106, 0.15)', color: '#00ff6a' }}>
                      {step.duration}
                    </p>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ChevronRight className="w-6 h-6 text-white/20" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-2xl w-full rounded-2xl overflow-hidden"
                style={{ background: '#0a0a0a', border: '1px solid rgba(0, 255, 106, 0.3)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/5]">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                    <p className="text-lg mb-4" style={{ color: '#00ff6a' }}>{selectedMember.role}</p>
                    <p className="text-white/70 mb-6">{selectedMember.bio}</p>
                    <div className="mb-6">
                      <p className="text-sm text-white/50 mb-2">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-sm rounded-full" style={{ background: 'rgba(0, 255, 106, 0.15)', color: '#00ff6a' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={selectedMember.linkedin}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02]"
                      style={{ background: '#00ff6a', color: '#000' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default InfinityProjects;
