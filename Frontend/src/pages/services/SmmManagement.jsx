import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Calendar, Clock, MessageSquare, PieChart } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import SectionTitle from '../../components/SectionTitle';
import ScrollFadeIn from '../../components/ScrollFadeIn';
import CTABanner from '../../components/CTABanner';
import usePageMeta from '../../hooks/usePageMeta';

export const SmmManagement = () => {
  usePageMeta({
    title: 'Social Media Management',
    description: 'Consistent, high-quality content creation and community management to keep your brand active.'
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-dark-bg">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-1/4">
            <Calendar className="w-24 h-24 text-primary" />
          </motion.div>
          <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/3 right-1/4">
            <Clock className="w-32 h-32 text-cyan-400" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-1/4 left-1/3">
            <MessageSquare className="w-20 h-20 text-primary" />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6">
              Your Social Media,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Handled Completely.</span>
            </h1>
            <p className="text-dark-muted text-xl max-w-2xl mx-auto mb-10">
              Save 20+ hours a week. We handle the content creation, daily posting, and community moderation so you can focus on running your business.
            </p>
            
            <div className="bg-dark-card border border-dark-border/40 rounded-2xl p-6 md:p-8 flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">30+</div>
                <div className="text-sm text-dark-muted">Posts / Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-dark-muted">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-dark-muted">Done-for-You</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternating Features */}
      <section className="py-24 px-6 border-y border-dark-border/20">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn>
              <div className="aspect-square bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl border border-primary/20 flex items-center justify-center p-12">
                <img src="https://illustrations.popsy.co/amber/freelancer.svg" alt="Content Creation" className="w-full h-auto filter brightness-90 contrast-125" />
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.2}>
              <h3 className="text-3xl font-bold text-white mb-4">High-Quality Content Creation</h3>
              <p className="text-dark-muted text-lg mb-6">
                No more staring at a blank screen wondering what to post. Our team designs eye-catching graphics, writes engaging captions, and produces short-form video reels tailored to your brand voice.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-primary" /> Custom Branded Graphics</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-primary" /> Copywriting & Hashtag Strategy</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-primary" /> Reel & TikTok Editing</li>
              </ul>
            </ScrollFadeIn>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn delay={0.2} className="md:order-2">
              <div className="aspect-square bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl border border-cyan-500/20 flex items-center justify-center p-12">
                <img src="https://illustrations.popsy.co/amber/customer-support.svg" alt="Community Management" className="w-full h-auto filter brightness-90 contrast-125" />
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn className="md:order-1">
              <h3 className="text-3xl font-bold text-white mb-4">Active Community Management</h3>
              <p className="text-dark-muted text-lg mb-6">
                Social media is a two-way street. We don't just post; we engage. We reply to comments, answer DMs, and interact with your target audience's content to build organic relationships.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Daily DM Responses</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Proactive Comment Engagement</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Spam Monitoring</li>
              </ul>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  );
};

export default SmmManagement;
