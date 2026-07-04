import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Smartphone, Zap, Search, ShieldCheck } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import SectionTitle from '../../components/SectionTitle';
import ScrollFadeIn from '../../components/ScrollFadeIn';
import CTABanner from '../../components/CTABanner';
import usePageMeta from '../../hooks/usePageMeta';

export const WebDevelopment = () => {
  usePageMeta({
    title: 'Web Development',
    description: 'We design and develop fast, mobile-optimized, and conversion-focused websites.'
  });

  const techStack = [
    { name: 'React', color: 'text-[#61DAFB]' },
    { name: 'Next.js', color: 'text-white' },
    { name: 'Tailwind CSS', color: 'text-[#38B2AC]' },
    { name: 'Node.js', color: 'text-[#339933]' },
    { name: 'Shopify', color: 'text-[#95BF47]' },
    { name: 'WordPress', color: 'text-[#21759B]' },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-dark-bg">
        {/* Wireframe Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-6">
              <Code2 className="w-4 h-4" /> Premium Web Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6">
              Websites Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Performance.</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto mb-10">
              We don't just build websites; we build digital experiences. From lightning-fast landing pages to complex e-commerce platforms, we deliver code that converts.
            </p>
          </motion.div>

          {/* Floating UI Elements Mockup */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-4xl mt-12"
          >
            <div className="rounded-xl border border-dark-border/50 bg-[#111] shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
              {/* Browser Bar */}
              <div className="h-8 bg-[#1a1a1a] border-b border-dark-border/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              {/* Fake Code / Content */}
              <div className="p-6 flex-1 bg-[#0a0a0a] text-left overflow-hidden relative">
                <div className="text-cyan-400 font-mono text-sm mb-4">{'<Header>'}</div>
                <div className="w-3/4 h-8 bg-dark-border/30 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-dark-border/20 rounded mb-8"></div>
                <div className="text-primary font-mono text-sm mb-4">{'<HeroSection>'}</div>
                <div className="w-full h-32 bg-gradient-to-r from-dark-border/20 to-transparent rounded border border-dark-border/30"></div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-dark-border/20 bg-[#0a0a0a] overflow-hidden">
        <div className="flex gap-12 items-center w-max animate-marquee">
          {[...techStack, ...techStack, ...techStack].map((tech, idx) => (
            <div key={idx} className={`text-2xl font-display font-bold ${tech.color} opacity-70`}>
              {tech.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Why Choose Us" title="The Digieonix Standard" alignment="center" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for core web vitals and sub-second load times." },
              { icon: Smartphone, title: "Mobile First", desc: "Pixel-perfect responsive design that looks great on any device." },
              { icon: Search, title: "SEO Ready", desc: "Clean semantic HTML and structured data for better rankings." },
              { icon: ShieldCheck, title: "Secure & Scalable", desc: "Built with modern security practices to protect your data." },
            ].map((feature, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-dark-card border border-dark-border/40 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors h-full">
                  <feature.icon className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-dark-muted text-sm">{feature.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  );
};

export default WebDevelopment;
