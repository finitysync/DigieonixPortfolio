import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, BarChart, Crosshair, DollarSign } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import SectionTitle from '../../components/SectionTitle';
import ScrollFadeIn from '../../components/ScrollFadeIn';
import CTABanner from '../../components/CTABanner';
import usePageMeta from '../../hooks/usePageMeta';

export const PpcExpert = () => {
  usePageMeta({
    title: 'PPC & Meta Ads Expert',
    description: 'ROI-focused paid advertising on Facebook, Instagram, and Google to bring in leads and sales at the lowest possible cost.'
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-dark-bg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-cyan-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-6">
              <DollarSign className="w-4 h-4" /> Maximum ROAS
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6">
              Turn Clicks Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Customers.</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-3xl mx-auto mb-12">
              Stop burning money on ineffective ads. We engineer high-converting PPC and Meta Ad campaigns designed to maximize your Return on Ad Spend (ROAS) and scale your revenue predictably.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Cost Per Acquisition", value: "Lower CPA" },
                { label: "Return on Ad Spend", value: "Higher ROAS" },
                { label: "Click-Through Rate", value: "Optimized CTR" },
                { label: "Conversion Rate", value: "Maximized CVR" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-gradient-to-b from-[#111] to-dark-bg border border-dark-border/40 rounded-2xl p-4 text-center hover:border-primary/30 transition-colors">
                  <div className="text-cyan-400 font-bold mb-1">{metric.value}</div>
                  <div className="text-xs text-dark-muted uppercase tracking-wider">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Funnel Layout */}
      <section className="py-24 px-6 border-y border-dark-border/20">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Our Methodology" title="The Conversion Funnel" alignment="center" />
          
          <div className="mt-16 space-y-6 max-w-3xl mx-auto">
            {/* Top of Funnel */}
            <ScrollFadeIn delay={0.1}>
              <div className="w-full bg-[#111] border-l-4 border-l-cyan-400 rounded-r-3xl p-8 relative overflow-hidden group hover:bg-[#1a1a1a] transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">1. Awareness (Cold Traffic)</h3>
                    <p className="text-dark-muted">We target broad but highly relevant audiences using lookalike models and interest-based targeting to introduce your brand to potential buyers.</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
            
            {/* Middle of Funnel */}
            <ScrollFadeIn delay={0.2}>
              <div className="w-[90%] mx-auto bg-[#111] border-l-4 border-l-primary rounded-r-3xl p-8 relative overflow-hidden group hover:bg-[#1a1a1a] transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Crosshair className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">2. Consideration (Warm Traffic)</h3>
                    <p className="text-dark-muted">Retargeting users who engaged with your ads or visited your site with specific product offers, lead magnets, and testimonials.</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Bottom of Funnel */}
            <ScrollFadeIn delay={0.3}>
              <div className="w-[80%] mx-auto bg-[#111] border-l-4 border-l-purple-400 rounded-r-3xl p-8 relative overflow-hidden group hover:bg-[#1a1a1a] transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b449f6]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#b449f6]/10 flex items-center justify-center shrink-0">
                    <BarChart className="w-6 h-6 text-[#b449f6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">3. Conversion (Hot Traffic)</h3>
                    <p className="text-dark-muted">Aggressive urgency-based retargeting for abandoned carts and highly intentful users to secure the final sale.</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  );
};

export default PpcExpert;
