import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import PageTransition from '../components/PageTransition';
import getServiceIcon from '../utils/getServiceIcon';
import usePageMeta from '../hooks/usePageMeta';


export const Services = () => {
  const content = useContent();
  usePageMeta({
    title: 'Our Services',
    description: 'Explore Digieonix services: Social Media Marketing, Web Development, SEO, PPC Ads, and Social Media Management for businesses worldwide.'
  });

  const servicesList = content?.services || [];

  // Scroll to hash anchor on page load (from navbar dropdown)
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      }
    }
  }, []);

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <PageTransition>
      {/* Page Hero Header */}
      <section className="relative pt-32 pb-20 w-full bg-[#000000] overflow-hidden border-b border-dark-border/20 flex items-center min-h-[300px]">
        {/* Purple Gradient Overlay on Left Edge */}
        <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-gradient-to-r from-[#b449f6]/10 to-transparent pointer-events-none z-0"></div>
        {/* Radial glow background details */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#b449f6]/5 glow-blur pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb: Home > Services */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark-muted mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-dark-border/40">/</span>
              <span className="text-[#b449f6]">Services</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Our Services
            </h1>
            <p className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Comprehensive digital marketing solutions for businesses that want to scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              id={service.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 35px -5px rgba(180, 73, 246, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="bg-[#111111] rounded-3xl p-8 md:p-10 flex flex-col items-start text-left border border-transparent hover:border-[#b449f6]/30 transition-all duration-300 relative overflow-hidden group h-full"
            >
              {/* Top border ambient indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#b449f6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Service Icon: Large (48px) */}
              <div className="mb-6 flex items-center justify-center p-3 rounded-2xl bg-[#b449f6]/10 border border-[#b449f6]/15 group-hover:scale-105 transition-transform duration-300 shrink-0">
                {getServiceIcon(service.icon, 'lg')}
              </div>

              {/* Service Name */}
              <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#b449f6] transition-colors">
                {service.title}
              </h2>

              {/* Full Description (3-4 lines) */}
              <p className="text-dark-muted text-sm md:text-base leading-relaxed mb-8 flex-grow">
                {service.fullDesc || service.description}
              </p>

              {/* List of 4 Features */}
              <div className="w-full border-t border-dark-border/20 pt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#b449f6]/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-[#b449f6]" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA: View Details */}
              <Link to={`/services/${service.title.toLowerCase().replace(/ /g, '-').replace(/\//g, '')}`} className="w-full mt-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-sm font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  View Details
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-dark-border/20 bg-dark-card/25 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#b449f6]/5 glow-blur pointer-events-none"></div>

        <div className="max-w-xl mx-auto space-y-6 relative z-10 px-6">
          <h3 className="text-xl md:text-3xl font-display font-bold text-white tracking-tight">
            {content?.ctaBanner?.headline || 'Not sure which service you need?'}
          </h3>
          <p className="text-dark-muted text-sm md:text-base leading-relaxed">
            {content?.ctaBanner?.subtext || "Let's have a quick discussion about your goals and build a custom package for you."}
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-3.5 rounded-full border border-dark-border/80 text-white hover:border-[#b449f6] font-bold text-sm transition-all cursor-pointer"
              >
                {content?.ctaBanner?.buttonText || 'Contact Us'}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
