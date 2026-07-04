import { motion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ScrollFadeIn from '../components/ScrollFadeIn';
import CTABanner from '../components/CTABanner';
import { useContent } from '../context/ContentContext';
import usePageMeta from '../hooks/usePageMeta';

export const Team = () => {
  usePageMeta({
    title: 'Our Team',
    description: 'Meet the expert digital marketers, developers, and designers behind Digieonix.'
  });

  const content = useContent();
  const teamMembers = content?.team || [];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              The Minds Behind Digieonix
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Team</span>
            </h1>
            <p className="text-dark-muted max-w-2xl mx-auto text-lg">
              We are a collective of passionate marketers, visionary designers, and technical wizards dedicated to scaling your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollFadeIn key={member.id} delay={index * 0.1}>
                <div className="group relative rounded-3xl bg-dark-card border border-dark-border/40 overflow-hidden hover:border-primary/50 transition-all duration-500">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent opacity-80" />
                    
                    {/* Social Links on Hover */}
                    {(member.social?.linkedin || member.social?.instagram) && (
                      <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {member.social?.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                            <FaLinkedinIn className="w-4 h-4" />
                          </a>
                        )}
                        {member.social?.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                            <FaInstagram className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-cyan-400 font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-dark-muted text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner />
    </PageTransition>
  );
};

export default Team;
