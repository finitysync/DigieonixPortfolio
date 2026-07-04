import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { FaBullhorn, FaUsers, FaCode, FaSearch, FaAd } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../context/ContentContext';

export const Pricing = () => {
  const content = useContent();
  usePageMeta({
    title: 'Pricing',
    description: 'Transparent pricing for Digieonix digital marketing services — Social Media, Web Development, SEO, and PPC Ads packages starting from PKR 40,000.'
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const pricingPackages = content?.pricing || [];
  const faqs = content?.faq || [];

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <PageTransition>
      {/* 1. Page Hero Header */}
      <section className="relative pt-32 pb-20 w-full bg-[#000000] overflow-hidden border-b border-dark-border/20 flex items-center min-h-[300px]">
        {/* Glow details */}
        <div className="absolute top-0 left-10 w-96 h-96 rounded-full bg-[#b449f6]/10 glow-blur pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-dark-card/5 glow-blur pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb: Home > Pricing */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark-muted mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-dark-border/40">/</span>
              <span className="text-[#b449f6]">Pricing</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Transparent Pricing
            </h1>
            <p className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Starting packages — final price depends on scope. No hidden fees, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Pricing Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
        >
          {pricingPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative overflow-hidden text-left h-full ${
                pkg.isFeatured
                  ? 'bg-[#0f0a14] border-[#b449f6] featured-pricing-card scale-105 md:scale-100 lg:scale-105 z-10 shadow-[0_0_25px_rgba(180,73,246,0.3)]'
                  : 'bg-[#111111] border-transparent hover:border-[#b449f6]/30 z-0'
              }`}
            >
              {pkg.isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#b449f6] text-white shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header Content */}
              <div className="space-y-6">
                {/* Icon wrapper (hardcoded fallback if dynamic icons aren't working yet) */}
                <div className="w-14 h-14 rounded-2xl bg-[#b449f6]/10 flex items-center justify-center p-3 border border-[#b449f6]/20">
                  <FaBullhorn className="w-8 h-8 text-[#b449f6]" />
                </div>

                {/* Title and pricing details */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <span className="text-[10px] text-dark-muted font-semibold uppercase tracking-wider block mb-1">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-display font-extrabold text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-bold text-[#b449f6] uppercase tracking-wider">
                      {pkg.period}
                    </span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="border-b border-[#b449f6]/20 w-full" />

                {/* Features Checklist */}
                <ul className="space-y-4 pt-2">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#b449f6]/10 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#b449f6]" />
                      </div>
                      <span className="text-xs font-semibold text-white/95">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Get Started */}
              <div className="pt-8 w-full mt-auto">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                      pkg.isFeatured
                        ? 'bg-[#b449f6] text-white hover:shadow-lg hover:shadow-[#b449f6]/20'
                        : 'bg-[#1a1a1a] border border-dark-border/40 text-white hover:bg-dark-cardHover hover:border-[#b449f6]/40'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. FAQ Accordion Section */}
      <section className="py-24 border-t border-dark-border/20 bg-dark-card/15">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle
            badge="Help Center"
            title="Frequently Asked Questions"
          />

          <div className="space-y-4 mt-16 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-dark-border/40 bg-dark-card/30 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left font-display font-semibold text-white hover:text-[#b449f6] transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base leading-tight pr-4">{faq.q || faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#b449f6] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-dark-muted shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-dark-muted leading-relaxed border-t border-dark-border/10">
                          {faq.a || faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-[#b449f6] to-[#7c3aed] text-center relative overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-xl mx-auto space-y-6 relative z-10 px-6">
          <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">
            {content?.ctaBanner?.headline || 'Not sure which plan fits you?'}
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {content?.ctaBanner?.subtext || 'Schedule a brief consultation with our marketing strategists to design a package unique to your business.'}
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-3.5 rounded-full bg-white text-[#b449f6] hover:bg-neutral-100 font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                {content?.ctaBanner?.buttonText || 'Book a Free Consultation'}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Pricing;
