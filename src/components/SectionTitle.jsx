import { motion } from 'framer-motion';

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-16 flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-gradient-premium bg-[#1c1c2b]/60 border border-[#EC4899]/30 mb-4 inline-block shadow-[0_0_15px_-3px_rgba(236,72,153,0.2)]"
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight max-w-3xl leading-tight text-glow"
      >
        {title}
      </motion.h2>

      {/* Decorative Gradient Accent bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: '80px' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-1 bg-gradient-premium rounded-full mt-4 mb-5"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
