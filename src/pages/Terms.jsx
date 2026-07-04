import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../context/ContentContext';

export const Terms = () => {
  usePageMeta({
    title: 'Terms of Service',
    description: 'Read the terms and conditions for using Digieonix digital marketing and development services.'
  });

  const content = useContent();
  const termsData = content?.terms || [];

  return (
    <PageTransition>
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-dark-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-8">
            Terms of <span className="text-cyan-400">Service</span>
          </h1>
          
          <div className="space-y-8 text-sm md:text-base leading-relaxed">
            {termsData.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <div className="whitespace-pre-wrap">{section.content}</div>
              </section>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-border/30 text-xs">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Terms;
