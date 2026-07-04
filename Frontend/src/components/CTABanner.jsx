import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticElement from './MagneticElement';

export const CTABanner = ({
  title = 'Ready to elevate your digital product footprint?',
  subtitle = 'Get in touch with our team of engineers and designers today to build something spectacular.',
  primaryBtnText = 'Start Your Project',
  primaryBtnLink = '/contact',
  secondaryBtnText = 'View Our Pricing',
  secondaryBtnLink = '/pricing',
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-dark-bg z-0 bg-grid-pattern"></div>
      
      {/* Glow Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 glow-blur z-0 pointer-events-none"></div>
      <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-accent-cyan/5 glow-blur z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-10 md:p-16 border border-dark-border/40 overflow-hidden bg-gradient-to-br from-dark-card/90 to-dark-bg/95 shadow-[0_20px_50px_rgba(99,102,241,0.15)]"
        >
          {/* Internal Glowing Border Effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Content */}
            <div className="space-y-4 max-w-2xl text-left">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
                <span>Next-Gen Partnership</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                {title}
              </h3>
              <p className="text-dark-muted text-sm md:text-base leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <MagneticElement strength={30}>
                <Link
                  to={primaryBtnLink}
                  id="cta-primary-btn"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent-violet text-white text-center font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {primaryBtnText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Ripple overlay */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
              </MagneticElement>
              
              <Link
                to={secondaryBtnLink}
                id="cta-secondary-btn"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-cardHover/60 hover:bg-dark-cardHover border border-dark-border/60 text-white text-center font-semibold transition-all duration-300 flex items-center justify-center"
              >
                {secondaryBtnText}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
