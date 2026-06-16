import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { Container, Heading2 } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/hooks/useMotion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: { src: string; alt: string };
  social: Record<string, string>;
}

interface StudiosTeamProps {
  sectionTitle: string;
  headline: string;
  description: string;
  team: TeamMember[];
}

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function StudiosTeam({
  sectionTitle,
  headline,
  description,
  team,
}: StudiosTeamProps) {
  return (
    <section id="team" className="relative py-32 bg-black">
      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-20"
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

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItem}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                {/* Image */}
                <div className="aspect-[3/4] relative">
                  <img
                    src={member.image.src}
                    alt={member.image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                      if (!IconComponent) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-studios-primary flex items-center justify-center hover:bg-studios-secondary transition-colors"
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-studios-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-studios-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default StudiosTeam;
