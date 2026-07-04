import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowDown, Zap, ShieldCheck, TrendingUp, Headset, Search, Target, Rocket } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ScrollFadeIn from '../components/ScrollFadeIn';
import CountUp from '../components/CountUp';
import getServiceIcon from '../utils/getServiceIcon';
import usePageMeta from '../hooks/usePageMeta';
import MagneticElement from '../components/MagneticElement';
import TiltCard from '../components/TiltCard';
import HeroBackground from '../components/HeroBackground';



// Typewriter Component
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <span className="text-primary">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-primary font-light ml-0.5`}>|</span>
    </span>
  );
};

export const Home = () => {
  const content = useContent();
  usePageMeta({
    title: 'Home',
    description: 'Digieonix is a performance-driven digital marketing agency offering Meta Ads, SEO, Web Development, and Social Media services to UK, USA and international clients.'
  });

  // Fallbacks if context fails to load
  const hero = content?.hero || { headlines: [], subtext: '', cta1Text: 'Get Started', cta2Text: 'View Our Work' };
  const stats = content?.stats || [];
  const servicesPreview = (content?.services || []).slice(0, 3);
  const testimonialsPreview = (content?.testimonials || []).slice(0, 2);
  const layout = content?.layout || ['hero', 'servicesPreview', 'ourProcess', 'whyChooseUs', 'statsBar', 'testimonialsPreview'];

  // Framer Motion staggered animations for Hero
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'hero':
        return (
          <section key="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            <HeroBackground />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8 w-full">
              <motion.div
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center space-y-8"
              >
                {/* Tagline Badge */}
                <motion.div
                  variants={heroItemVariants}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#EC4899]/40 text-sm text-[#EC4899]"
                >
                  <span className="font-semibold text-xs tracking-wider uppercase text-gradient-premium">Engineering Digital Domination</span>
                </motion.div>

                {/* Typewriter Title */}
                <motion.h1
                  variants={heroItemVariants}
                  className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.15] max-w-5xl mx-auto min-h-[140px] sm:min-h-[180px] md:min-h-[220px]"
                >
                  <div className="text-white mb-2 drop-shadow-lg">Grow Digitally.</div>
                  {hero.headlines.length > 0 && <Typewriter words={hero.headlines} />}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  variants={heroItemVariants}
                  className="text-dark-muted text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                  {hero.subtext}
                </motion.p>

                {/* Two CTAs */}
                <motion.div
                  variants={heroItemVariants}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 w-full sm:w-auto"
                >
                  <MagneticElement strength={30}>
                    <Link to="/contact" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-premium text-white font-bold shadow-glowPrimary transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                      >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      </motion.button>
                    </Link>
                  </MagneticElement>
                  
                  <MagneticElement strength={20}>
                    <Link to="/portfolio" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full sm:w-auto px-8 py-4 rounded-full border border-dark-border/80 text-white font-semibold hover:border-[#b449f6] transition-all flex items-center justify-center cursor-pointer"
                      >
                        {hero.cta2Text}
                      </motion.button>
                    </Link>
                  </MagneticElement>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator Arrow */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-dark-muted animate-bounce pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
              <ArrowDown className="w-5 h-5 text-[#b449f6]" />
            </div>
          </section>
        );

      case 'servicesPreview':
        return (
          <section key="servicesPreview" className="py-28 max-w-7xl mx-auto px-6 text-center">
            <ScrollFadeIn>
              <SectionTitle
                badge="Services"
                title="What We Do"
                subtitle="Core services that grow your business."
              />
            </ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {servicesPreview.map((service, index) => (
                <ScrollFadeIn key={service.id} delay={index * 0.1}>
                  <TiltCard>
                    <div className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col items-start text-left relative overflow-hidden group h-full">
                      <div className="w-12 h-12 rounded-2xl bg-[#b449f6]/10 border border-[#b449f6]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {getServiceIcon(service.icon)}
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-3" style={{ transform: "translateZ(20px)" }}>
                        {service.title}
                      </h3>
                      <p className="text-dark-muted text-sm leading-relaxed mb-6" style={{ transform: "translateZ(10px)" }}>
                        {service.shortDesc || service.description}
                      </p>
                      
                      <Link
                        to={`/services/${service.title.toLowerCase().replace(/ /g, '-').replace(/\//g, '')}`}
                        className="inline-flex items-center gap-2 text-sm text-[#b449f6] font-semibold mt-auto group-hover:text-white transition-colors"
                      >
                        Learn More
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </Link>
                    </div>
                  </TiltCard>
                </ScrollFadeIn>
              ))}
            </div>

            <ScrollFadeIn className="text-center">
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-8 py-3.5 rounded-full border border-dark-border/80 text-white hover:border-[#b449f6] font-semibold text-sm transition-all cursor-pointer"
                >
                  View All Services
                </motion.button>
              </Link>
            </ScrollFadeIn>
          </section>
        );

      case 'ourProcess':
        return (
          <section key="ourProcess" className="py-28 max-w-7xl mx-auto px-6 overflow-hidden">
            <ScrollFadeIn>
              <SectionTitle
                badge="Our Process"
                title="How We Work"
                subtitle="A proven framework for digital domination."
              />
            </ScrollFadeIn>
            <div className="relative mt-20 max-w-7xl mx-auto">
              {/* Horizontal Background Line (Desktop only) */}
              <div className="hidden md:block absolute top-[24px] left-0 right-0 h-px bg-dark-border/40"></div>
              
              {/* Animated Glowing Horizontal Line (Desktop only) */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block absolute top-[24px] left-0 h-[2px] bg-gradient-to-r from-[#b449f6] via-[#EC4899] to-transparent shadow-[0_0_15px_rgba(180,73,246,0.8)]"
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: "01", icon: <Search className="w-6 h-6" />, title: "Discovery & Audit", desc: "We deep-dive into your business, analyze competitors, and uncover hidden digital opportunities." },
                  { step: "02", icon: <Target className="w-6 h-6" />, title: "Custom Strategy", desc: "A tailored, data-backed roadmap is formulated to maximize your Return on Investment (ROI)." },
                  { step: "03", icon: <Rocket className="w-6 h-6" />, title: "Rapid Execution", desc: "Our experts deploy high-converting campaigns, build assets, and launch precisely on time." },
                  { step: "04", icon: <TrendingUp className="w-6 h-6" />, title: "Scale & Dominate", desc: "We continuously monitor analytics, optimize performance, and aggressively scale the winners." }
                ].map((item, index) => (
                  <ScrollFadeIn key={index} delay={index * 0.15}>
                    <div className="relative flex flex-col items-center md:items-start group pt-8 md:pt-0">
                      {/* Number Circle (Sits on the line for desktop) */}
                      <div className="relative md:absolute md:top-[24px] md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-[#111111] border-2 border-[#b449f6] flex items-center justify-center shadow-[0_0_20px_rgba(180,73,246,0.6)] z-20 group-hover:scale-110 group-hover:bg-[#b449f6] transition-all duration-300 mb-6 md:mb-0">
                        <span className="text-sm font-black text-white group-hover:text-black transition-colors">{item.step}</span>
                      </div>
                      
                      {/* Mobile Vertical Line Connecting Steps */}
                      <div className="md:hidden absolute top-14 bottom-[-32px] left-1/2 w-[2px] bg-gradient-to-b from-[#b449f6] to-transparent transform -translate-x-1/2 z-0"></div>

                      {/* Card Content */}
                      <div className="w-full mt-0 md:mt-16">
                        <TiltCard>
                          <div className="glass-panel glass-panel-hover p-6 lg:p-8 rounded-[2rem] text-center md:text-left h-full relative overflow-hidden group-hover:border-[#b449f6]/40 transition-colors">
                            {/* Subtle background glow on hover */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b449f6]/10 rounded-full blur-2xl group-hover:bg-[#b449f6]/20 transition-all duration-500"></div>
                            
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 relative z-10">
                              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#111111] border border-[#b449f6]/30 flex items-center justify-center text-[#b449f6] shadow-glowPrimary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                {item.icon}
                              </div>
                              <h4 className="text-xl md:text-2xl font-display font-bold text-white">{item.title}</h4>
                            </div>
                            <p className="text-dark-muted text-sm leading-relaxed relative z-10">{item.desc}</p>
                          </div>
                        </TiltCard>
                      </div>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
            </div>
          </section>
        );

      case 'whyChooseUs':
        return (
          <section key="whyChooseUs" className="py-28 max-w-7xl mx-auto px-6">
            <ScrollFadeIn>
              <SectionTitle
                badge="Why Us"
                title="The Digieonix Edge"
                subtitle="Why top brands trust us with their growth."
              />
            </ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {/* Large Bento Box */}
              <ScrollFadeIn delay={0.1} className="md:col-span-2">
                <TiltCard>
                  <div className="glass-panel glass-panel-hover p-8 md:p-12 rounded-3xl relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#b449f6]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col justify-center h-full">
                      <TrendingUp className="w-12 h-12 text-[#b449f6] mb-6" />
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Data-Driven ROI</h3>
                      <p className="text-dark-muted leading-relaxed max-w-md">We don't guess. Every decision we make—from ad copy to website architecture—is backed by hard data to ensure maximum return on investment.</p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollFadeIn>

              {/* Smaller Bento Box */}
              <ScrollFadeIn delay={0.2} className="h-full">
                <TiltCard>
                  <div className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-center items-start h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] flex items-center justify-center mb-6">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Fast Execution</h3>
                    <p className="text-sm text-dark-muted">Time is money. We move fast and launch campaigns quickly.</p>
                  </div>
                </TiltCard>
              </ScrollFadeIn>

              {/* Smaller Bento Box */}
              <ScrollFadeIn delay={0.3} className="h-full">
                <TiltCard>
                  <div className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-center items-start h-full">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Full Transparency</h3>
                    <p className="text-sm text-dark-muted">Clear communication and honest reporting, always.</p>
                  </div>
                </TiltCard>
              </ScrollFadeIn>

              {/* Large Bento Box */}
              <ScrollFadeIn delay={0.4} className="md:col-span-2">
                <TiltCard>
                  <div className="glass-panel glass-panel-hover p-8 md:p-12 rounded-3xl relative overflow-hidden h-full">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EC4899]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                      <div className="flex-1">
                        <Headset className="w-12 h-12 text-[#EC4899] mb-6" />
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Dedicated Support</h3>
                        <p className="text-dark-muted leading-relaxed">You get a dedicated account manager who understands your business inside out, available whenever you need them.</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollFadeIn>
            </div>
          </section>
        );

      case 'statsBar':
        return (
          <section key="statsBar" className="w-full bg-[#111111] py-16 border-y border-dark-border/20">
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
        );

      case 'testimonialsPreview':
        return (
          <section key="testimonialsPreview" className="py-28 max-w-7xl mx-auto px-6">
            <ScrollFadeIn>
              <SectionTitle
                badge="Reviews"
                title="What Clients Say"
              />
            </ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {testimonialsPreview.map((item, index) => (
                <ScrollFadeIn key={item.id} delay={index * 0.1}>
                  <div className="glass-panel glass-panel-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between text-left h-full relative">
                    <div className="flex items-center gap-1 text-amber-400 mb-6">
                      {[...Array(item.stars || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-white italic text-base md:text-lg leading-relaxed mb-8 flex-grow">
                      "{item.text || item.quote}"
                    </p>

                    <div className="flex items-center gap-4 border-t border-dark-border/20 pt-6">
                      {item.avatar ? (
                        <div className="w-12 h-12 rounded-full border border-[#b449f6]/20 bg-[#111111] overflow-hidden shrink-0">
                          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full border border-[#b449f6]/20 bg-[#111111] flex items-center justify-center text-white font-bold text-lg shrink-0">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-bold text-white text-sm">{item.name}</h4>
                        <p className="text-xs text-dark-muted">{item.role}, {item.company}</p>
                      </div>
                    </div>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>

            <ScrollFadeIn className="text-center">
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-8 py-3.5 rounded-full border border-dark-border/85 text-white hover:border-[#b449f6] font-semibold text-sm transition-all cursor-pointer"
                >
                  Read More Reviews
                </motion.button>
              </Link>
            </ScrollFadeIn>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <PageTransition>
      {layout.map((sectionId) => renderSection(sectionId))}

      {/* 5. CTA Banner */}
      <section className="relative w-full py-24 px-6 bg-gradient-to-r from-[#b449f6] to-[#7c3aed] text-center overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_55%)] pointer-events-none"></div>

        <ScrollFadeIn className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {content?.ctaBanner?.headline || 'Ready to Grow Your Business Digitally?'}
          </h2>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {content?.ctaBanner?.subtext || "Let's talk about how Digieonix can help you dominate online."}
          </p>
          <div className="pt-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-4 bg-white text-black font-extrabold rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                {content?.ctaBanner?.buttonText || 'Book a Free Consultation'}
              </motion.button>
            </Link>
          </div>
        </ScrollFadeIn>
      </section>
    </PageTransition>
  );
};

export default Home;
