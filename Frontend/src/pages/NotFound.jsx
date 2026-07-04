import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: '404 — Page Not Found',
    description: 'The page you are looking for does not exist.'
  });

  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 glow-blur pointer-events-none z-0" />

        <div className="text-center space-y-6 relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-8xl md:text-[150px] font-display font-extrabold text-primary/20 leading-none"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-dark-muted text-sm md:text-base max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default NotFound;
