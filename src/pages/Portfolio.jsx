import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import PageTransition from '../components/PageTransition';
import usePageMeta from '../hooks/usePageMeta';
import TiltCard from '../components/TiltCard';
import MagneticElement from '../components/MagneticElement';

export const Portfolio = () => {
  const content = useContent();
  usePageMeta({
    title: 'Portfolio',
    description: 'See real campaign results from Digieonix — Meta Ads, Web Development, SEO, and Social Media success stories.'
  });

  const portfolioProjects = content?.portfolio || [];
  const portfolioCategories = ['All', ...new Set(portfolioProjects.map(p => p.category))];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  // Close modal on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <PageTransition>
      {/* 1. Page Hero Header */}
      <section className="relative pt-32 pb-20 w-full bg-[#000000] overflow-hidden border-b border-dark-border/20 flex items-center min-h-[300px]">
        {/* Glow blurs */}
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#b449f6]/10 glow-blur pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-dark-card/5 glow-blur pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb: Home > Portfolio */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark-muted mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-dark-border/40">/</span>
              <span className="text-[#b449f6]">Portfolio</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Our Portfolio
            </h1>
            <p className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Real campaigns. Real results. Here's what we've delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Filterable Portfolio Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-start sm:justify-center gap-3 mb-16">
          {portfolioCategories.map((category) => (
            <MagneticElement key={category} strength={15}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#b449f6] border-[#b449f6] text-white shadow-[0_0_15px_rgba(180,73,246,0.4)]'
                    : 'bg-dark-card/50 backdrop-blur-sm border-dark-border/60 text-dark-muted hover:text-white hover:border-[#b449f6]/50'
                }`}
              >
                {category}
              </motion.button>
            </MagneticElement>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          ref={gridRef}
          variants={gridContainerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-3xl border border-dark-border/40 overflow-hidden bg-dark-card/40 backdrop-blur-sm flex flex-col h-full hover:border-[#b449f6]/50 hover:shadow-[0_0_30px_rgba(180,73,246,0.15)] transition-all duration-500 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-video relative flex items-center justify-center p-6 text-center border-b border-dark-border/20 overflow-hidden bg-gradient-to-br from-[#b449f6]/10 via-neutral-900 to-black">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out" 
                        />
                      ) : (
                        <span className="font-display font-extrabold text-lg md:text-xl text-white/30 group-hover:text-white/70 transition-colors tracking-tight select-none z-0">
                          {project.title}
                        </span>
                      )}

                      {/* Category Badge (purple, top-left) */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#b449f6] text-white shadow-[0_0_10px_rgba(180,73,246,0.5)]">
                          {project.category}
                        </span>
                      </div>

                      {/* Hover dark overlay + "View Details" button */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <MagneticElement strength={30}>
                          <span className="px-6 py-2.5 rounded-full bg-[#b449f6] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(180,73,246,0.6)] transition-transform transform scale-90 group-hover:scale-100 duration-300">
                            View Details
                          </span>
                        </MagneticElement>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 text-left flex-grow flex flex-col justify-between z-20 bg-dark-bg/80 relative">
                      {/* Inner glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#b449f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#b449f6] transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#b449f6]/80 font-medium uppercase tracking-wider">
                          Client: <span className="text-dark-muted">{project.client}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            {/* Modal clickout overlay */}
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Contents */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#0a0a0a]/95 backdrop-blur-2xl border border-[#b449f6]/30 rounded-3xl p-6 md:p-10 max-w-lg w-full text-left shadow-[0_0_50px_rgba(180,73,246,0.2)] z-10 overflow-hidden"
            >
              {/* Decorative glow inside modal */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b449f6]/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Close Button X */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#b449f6]/20 border border-transparent hover:border-[#b449f6]/40 transition-all cursor-pointer z-20"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="space-y-6 relative z-10">
                {selectedProject.image && (
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-[#b449f6]/20 shadow-lg relative group">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                )}
                <div>
                  <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#b449f6] text-white shadow-md inline-block mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-dark-muted font-medium mt-1">
                    Client: {selectedProject.client}
                  </p>
                </div>

                <p className="text-dark-muted text-sm md:text-base leading-relaxed border-t border-dark-border/20 pt-5">
                  {selectedProject.desc || selectedProject.description}
                </p>

                {/* Results/Metrics Highlight */}
                <div className="bg-[#b449f6]/10 border border-[#b449f6]/20 rounded-2xl p-5 text-center shadow-inner">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-dark-muted block mb-1">Key Campaign Results</span>
                  <span className="text-base md:text-lg font-display font-extrabold text-[#b449f6] leading-tight block">
                    {selectedProject.results}
                  </span>
                </div>

                <div className="pt-2 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-full border border-dark-border/60 text-xs font-semibold text-white hover:border-[#b449f6] transition-all cursor-pointer"
                  >
                    Go Back to Gallery
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom CTA Banner */}
      <section className="py-20 border-t border-dark-border/20 bg-dark-card/25 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#b449f6]/5 glow-blur pointer-events-none"></div>

        <div className="max-w-xl mx-auto space-y-6 relative z-10 px-6">
          <h3 className="text-xl md:text-3xl font-display font-bold text-white tracking-tight">
            {content?.ctaBanner?.headline || 'Ready to achieve similar results?'}
          </h3>
          <p className="text-dark-muted text-sm md:text-base leading-relaxed">
            {content?.ctaBanner?.subtext || 'Let us build a customized marketing and advertising campaign tailored specifically for your target audience.'}
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-3.5 rounded-full border border-dark-border/80 text-white hover:border-[#b449f6] font-bold text-sm transition-all cursor-pointer"
              >
                {content?.ctaBanner?.buttonText || "Let's Talk"}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Portfolio;
