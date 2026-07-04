import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollFadeIn = ({ children, className, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay }}
      style={{ perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;
