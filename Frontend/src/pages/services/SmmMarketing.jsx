import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Heart, Share2 } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import SectionTitle from '../../components/SectionTitle';
import ScrollFadeIn from '../../components/ScrollFadeIn';
import CTABanner from '../../components/CTABanner';
import usePageMeta from '../../hooks/usePageMeta';

export const SmmMarketing = () => {
  usePageMeta({
    title: 'Social Media Marketing',
    description: 'Data-driven social media campaigns that grow your audience and drive real engagement across Facebook, Instagram, and TikTok.'
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-6">
                <TrendingUp className="w-4 h-4" /> Explosive Growth
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight">
                Stop Scrolling. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Start Selling.</span>
              </h1>
              <p className="text-dark-muted text-lg max-w-xl leading-relaxed mb-8">
                We create thumb-stopping social media marketing campaigns that turn casual scrollers into loyal customers and brand advocates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button className="px-8 py-4 bg-gradient-to-r from-primary to-cyan-500 rounded-xl text-white font-bold hover:shadow-glowPrimary transition-all">
                    Launch Your Campaign
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Mockup Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full max-w-md mx-auto aspect-[4/5] bg-dark-card border border-dark-border/50 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-primary" />
                  <div>
                    <div className="w-24 h-3 bg-dark-border/50 rounded-full mb-2" />
                    <div className="w-16 h-2 bg-dark-border/30 rounded-full" />
                  </div>
                </div>
                {/* Image Placeholder */}
                <div className="w-full aspect-square rounded-2xl bg-[#1a1a1a] border border-dark-border/30 mb-4 overflow-hidden relative group">
                   <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop" alt="Social Media" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                </div>
                {/* Actions */}
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-6 h-6 text-primary fill-primary" />
                  <div className="w-6 h-6 rounded-full border-2 border-dark-border/50" />
                  <Share2 className="w-6 h-6 text-dark-muted" />
                </div>
                {/* Stats */}
                <div className="space-y-2">
                  <div className="w-3/4 h-2 bg-dark-border/50 rounded-full" />
                  <div className="w-1/2 h-2 bg-dark-border/30 rounded-full" />
                </div>

                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-1/3 bg-[#111] border border-primary/30 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-dark-muted">Engagement Rate</div>
                    <div className="font-bold text-white text-lg">+142%</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Grid */}
      <section className="py-24 px-6 border-y border-dark-border/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Where We Dominate"
            title="Mastering Every Platform"
            alignment="center"
          />
          
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <ScrollFadeIn delay={0.1}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 hover:border-blue-600/50 transition-colors h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Facebook & Instagram</h3>
                <p className="text-dark-muted">Hyper-targeted campaigns utilizing Meta's powerful algorithm to drive lead generation and e-commerce sales.</p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.2}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00f2fe]/10 to-transparent border border-[#00f2fe]/20 hover:border-[#00f2fe]/50 transition-colors h-full">
                <h3 className="text-2xl font-bold text-white mb-4">TikTok</h3>
                <p className="text-dark-muted">Viral-focused short-form content designed to capture Gen-Z and Millennial attention quickly and effectively.</p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.3}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent border border-blue-400/20 hover:border-blue-400/50 transition-colors h-full">
                <h3 className="text-2xl font-bold text-white mb-4">LinkedIn</h3>
                <p className="text-dark-muted">B2B lead generation through professional networking, thought leadership, and targeted InMail campaigns.</p>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  );
};

export default SmmMarketing;
