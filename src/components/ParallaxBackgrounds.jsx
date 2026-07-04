import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackgrounds() {
  const { scrollYProgress } = useScroll();
  
  // Pink orb moves down as you scroll down
  const yPink = useTransform(scrollYProgress, [0, 1], ['-10%', '50%']);
  // Cyan orb moves up as you scroll down
  const yCyan = useTransform(scrollYProgress, [0, 1], ['10%', '-40%']);
  // Purple orb moves diagonally
  const xPurple = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);
  const yPurple = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="bg-grain" />
      
      <motion.div 
        style={{ y: yPink, backgroundColor: 'var(--theme-accent2, #EC4899)' }}
        className="ambient-orb w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] top-[-10%] left-[-10%]" 
      />
      <motion.div 
        style={{ y: yCyan, backgroundColor: 'var(--theme-accent1, #06B6D4)' }}
        className="ambient-orb w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bottom-[-20%] right-[-10%] [animation-delay:-5s]" 
      />
      <motion.div 
        style={{ x: xPurple, y: yPurple, backgroundColor: 'var(--theme-primary, #b449f6)' }}
        className="ambient-orb w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-[40%] left-[20%] [animation-delay:-2s]" 
      />
    </div>
  );
}
