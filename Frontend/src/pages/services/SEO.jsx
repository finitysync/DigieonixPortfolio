import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LineChart, Target, BarChart3, SearchCheck } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import SectionTitle from '../../components/SectionTitle';
import ScrollFadeIn from '../../components/ScrollFadeIn';
import CTABanner from '../../components/CTABanner';
import usePageMeta from '../../hooks/usePageMeta';

export const SEO = () => {
  usePageMeta({
    title: 'Search Engine Optimization',
    description: 'Rank higher on Google and attract organic traffic with our proven SEO strategies.'
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#0a0a0a]">
        {/* Abstract Glow */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              <SearchCheck className="w-4 h-4" /> Dominate Search
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6">
              Own the First Page of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Google.</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto mb-10">
              Stop relying entirely on paid ads. We build sustainable organic traffic engines that bring high-intent buyers directly to your website month after month.
            </p>
          </motion.div>

          {/* Animated Chart Graphic */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-3xl mt-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
            <svg className="w-full h-auto text-primary drop-shadow-glowPrimary" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M 0 250 Q 100 250, 200 200 T 400 150 T 600 80 T 800 20" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              />
              <motion.path 
                d="M 0 250 Q 100 250, 200 200 T 400 150 T 600 80 T 800 20 L 800 300 L 0 300 Z" 
                fill="url(#grad)" 
                opacity="0.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* The 3 Pillars */}
      <section className="py-24 px-6 border-t border-dark-border/20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Our Strategy" title="The 3 Pillars of SEO" alignment="center" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Pillar 1 */}
            <ScrollFadeIn delay={0.1}>
              <div className="bg-[#111] rounded-3xl p-8 border border-dark-border/40 relative overflow-hidden group h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <LineChart className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Technical SEO</h3>
                <p className="text-dark-muted">We fix site speed, mobile usability, and crawlability issues so search engines can read and index your site perfectly.</p>
              </div>
            </ScrollFadeIn>
            {/* Pillar 2 */}
            <ScrollFadeIn delay={0.2}>
              <div className="bg-[#111] rounded-3xl p-8 border border-dark-border/40 relative overflow-hidden group h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <Target className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">On-Page Content</h3>
                <p className="text-dark-muted">Optimizing your website copy, meta tags, and internal linking structure around high-converting keywords.</p>
              </div>
            </ScrollFadeIn>
            {/* Pillar 3 */}
            <ScrollFadeIn delay={0.3}>
              <div className="bg-[#111] rounded-3xl p-8 border border-dark-border/40 relative overflow-hidden group h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <BarChart3 className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Off-Page & Authority</h3>
                <p className="text-dark-muted">Building high-quality backlinks from reputable domains in your industry to increase your site's trust and authority.</p>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  );
};

export default SEO;
