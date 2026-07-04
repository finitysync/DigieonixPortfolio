import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

// Establish a single global socket connection for the entire app
export const socket = io('http://localhost:5000');

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ParallaxBackgrounds from './components/ParallaxBackgrounds';
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const SmmMarketing = lazy(() => import('./pages/services/SmmMarketing'));
const SmmManagement = lazy(() => import('./pages/services/SmmManagement'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const SEO = lazy(() => import('./pages/services/SEO'));
const PpcExpert = lazy(() => import('./pages/services/PpcExpert'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(() => {
    // Only show on first visit (sessionStorage flag)
    return !sessionStorage.getItem('digieonix-loader-shown');
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('digieonix-loader-shown', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-dark-text relative">
      <CustomCursor />
      
      {/* Ambient Parallax Backgrounds */}
      {!isAdminRoute && <ParallaxBackgrounds />}
      {/* First Visit Loader Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-4"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              src="/logo.png"
              alt="Digieonix Logo"
              className="h-16 md:h-20 w-auto object-contain"
            />
            {/* Ambient Purple Loader line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#b449f6] to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Grid Pattern Overlay */}
      {!isAdminRoute && <div className="absolute inset-0 bg-grid-pattern opacity-100 z-0 pointer-events-none"></div>}

      {!isAdminRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#b449f6]/20 border-t-[#b449f6] rounded-full animate-spin"></div>
          </div>
        }>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/smm-marketing" element={<SmmMarketing />} />
            <Route path="/services/smm-management" element={<SmmManagement />} />
            <Route path="/services/web-dev" element={<WebDevelopment />} />
            <Route path="/services/seo" element={<SEO />} />
            <Route path="/services/ppc-expert" element={<PpcExpert />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
      <ScrollToTop />
    </div>
  );
}

export default App;
