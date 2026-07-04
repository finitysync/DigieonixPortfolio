import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import getServiceIcon from '../utils/getServiceIcon';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ScrollFadeIn from '../components/ScrollFadeIn';
import CountUp from '../components/CountUp';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../context/ContentContext';


export const About = () => {
  const content = useContent();
  usePageMeta({
    title: 'About Us',
    description: 'Learn about Digieonix — a performance-driven digital marketing agency based in Lahore, Pakistan, serving clients across the UK, USA, and beyond.'
  });

  const stats = content?.stats || [];
  const values = content?.about?.values || [];
  const checklist = content?.about?.checklist || [];
  const narrative = content?.about?.narrative || { title: '', paragraphs: [] };

  // Framer Motion container variants for staggered values list
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

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
            {/* Breadcrumb: Home > About Us */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark-muted mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-dark-border/40">/</span>
              <span className="text-[#b449f6]">About Us</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              About Digieonix
            </h1>
            <p className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Built in Pakistan. Built for the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Block: Narrative */}
          <ScrollFadeIn className="space-y-6 text-left">
            <span className="text-[10px] font-extrabold tracking-widest text-[#b449f6] uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {narrative.title}
            </h2>
            <div className="space-y-4 text-dark-muted text-sm md:text-base leading-relaxed">
              {narrative.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </ScrollFadeIn>

          {/* Right Block: Image card with gradient border and centered logo */}
          <ScrollFadeIn>
            <div className="relative aspect-[4/3] rounded-3xl p-[1px] bg-gradient-to-tr from-[#b449f6] via-transparent to-[#7c3aed]/50 shadow-2xl overflow-hidden group">
              {/* Glow accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#b449f6]/20 via-transparent to-[#7c3aed]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-full h-full bg-[#0a0a0a] rounded-[23px] flex items-center justify-center p-8 relative overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Digieonix Logo"
                  className="h-16 object-contain group-hover:scale-105 transition-transform duration-500 z-10"
                />
                {/* background ambient blur circle */}
                <div className="absolute w-48 h-48 bg-[#b449f6]/10 blur-3xl rounded-full z-0"></div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section className="w-full bg-[#111111] py-16 border-y border-dark-border/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-display font-extrabold text-[#b449f6] mb-2">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm text-white uppercase font-bold tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Our Values Section */}
      <section className="py-24 bg-[#080808]/40 border-b border-dark-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollFadeIn>
            <SectionTitle
              badge="Values"
              title="What We Stand For"
            />
          </ScrollFadeIn>

          <motion.div
            ref={valuesRef}
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-[#111111] rounded-3xl p-8 text-left border border-transparent hover:border-[#b449f6]/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#b449f6]/10 border border-[#b449f6]/15 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {getServiceIcon(value.icon)}
                </div>
                <h4 className="font-display font-bold text-white text-lg mb-3">
                  {value.title}
                </h4>
                <p className="text-dark-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Heading */}
          <ScrollFadeIn className="text-left space-y-4 lg:sticky lg:top-32">
            <span className="text-[10px] font-extrabold tracking-widest text-[#b449f6] uppercase">
              Advantage
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Why Businesses Choose Digieonix
            </h2>
            <p className="text-dark-muted text-sm md:text-base leading-relaxed">
              We align our campaigns directly with your business goals, offering custom design systems and growth structures that convert.
            </p>
          </ScrollFadeIn>

          {/* Right Checklist */}
          <ScrollFadeIn className="bg-[#111111]/45 border border-dark-border/20 rounded-3xl p-8 md:p-10 text-left space-y-6">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#b449f6]/10 flex items-center justify-center mt-1 shrink-0">
                  <Check className="w-3 h-3 text-[#b449f6]" />
                </div>
                <span className="text-sm md:text-base font-semibold text-white/95 leading-normal">
                  {item}
                </span>
              </div>
            ))}
          </ScrollFadeIn>
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="py-20 border-t border-dark-border/20 bg-dark-card/25 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#b449f6]/5 glow-blur pointer-events-none"></div>

        <ScrollFadeIn className="max-w-xl mx-auto space-y-6 relative z-10 px-6">
          <h3 className="text-xl md:text-3xl font-display font-bold text-white tracking-tight">
            {content?.ctaBanner?.headline || 'Ready to work with us?'}
          </h3>
          <p className="text-dark-muted text-sm md:text-base leading-relaxed">
            {content?.ctaBanner?.subtext || "Get in touch today for a free consultation call. Let's build your brand and scale your campaigns."}
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-3.5 rounded-full bg-[#b449f6] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#b449f6]/25 transition-all cursor-pointer"
              >
                {content?.ctaBanner?.buttonText || 'Get in Touch'}
              </motion.button>
            </Link>
          </div>
        </ScrollFadeIn>
      </section>
    </PageTransition>
  );
};

export default About;
