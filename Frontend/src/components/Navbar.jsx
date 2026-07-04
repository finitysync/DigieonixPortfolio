import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import MagneticElement from './MagneticElement';
import { useContent } from '../context/ContentContext';
import PageTransition from './PageTransition'; // Assuming PageTransition isn't needed here but added useContent

export const Navbar = () => {
  const content = useContent();
  const logo = content?.branding?.logo || '/logo.png';
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  // Scroll direction detection to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isCloseToTop = currentScrollPos < 50;

      // Only hide if the mobile menu is not open
      if (!isOpen) {
        setVisible(isScrollingUp || isCloseToTop);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isOpen]);

  // Close menus on path change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const servicesItems = [
    { name: 'Social Media Marketing', path: '/services/smm-marketing' },
    { name: 'Social Media Management', path: '/services/smm-management' },
    { name: 'Web Development', path: '/services/web-dev' },
    { name: 'Search Engine Optimization', path: '/services/seo' },
    { name: 'PPC Expert', path: '/services/ppc-expert' }
  ];

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Pricing', path: '/pricing' }
  ];

  const isServicesActive = location.pathname === '/services';

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-md border-b border-dark-border/20 transition-transform duration-300 ease ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Mobile Left CTA (Subtle Contact Icon) */}
        <div className="md:hidden flex-shrink-0 z-10 w-10 flex justify-start">
          <Link
            to="/contact"
            className="p-2 -ml-2 text-dark-muted hover:text-white transition-colors"
            aria-label="Contact Us"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>

        {/* Center/Left: Logo */}
        <Link to="/" className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10">
          <img
            src={logo}
            alt="Digieonix Logo"
            className="h-14 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home Link */}
          <MagneticElement strength={15}>
            <Link
              to="/"
              className={`font-semibold text-sm transition-all duration-300 relative py-2 animated-underline ${
                location.pathname === '/' ? 'text-[#b449f6] active' : 'text-dark-muted hover:text-white'
              }`}
            >
              Home
            </Link>
          </MagneticElement>

          {/* Services Dropdown Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <MagneticElement strength={10}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 font-semibold text-sm transition-all duration-300 focus:outline-none cursor-pointer animated-underline ${
                  isServicesActive ? 'text-[#b449f6] active' : 'text-dark-muted hover:text-white'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </MagneticElement>

            {isServicesActive && (
              <motion.span
                layoutId="activeUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b449f6] rounded-full shadow-[0_0_8px_#b449f6]"
              />
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#000000] border border-dark-border/40 rounded-2xl shadow-2xl p-2.5 z-50 text-left"
                >
                  {servicesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2.5 text-xs font-semibold text-dark-muted hover:text-white hover:bg-dark-cardHover/60 rounded-xl transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Portfolio, About Us, Pricing */}
          {mainLinks.slice(1).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <MagneticElement key={link.name} strength={15}>
                <Link
                  to={link.path}
                  className={`font-semibold text-sm transition-all duration-300 relative py-2 animated-underline ${
                    isActive ? 'text-[#b449f6] active' : 'text-dark-muted hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </MagneticElement>
            );
          })}

          {/* E-Com Calculator (External Link) */}
          <a
            href="https://calculator.digieonix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm text-dark-muted hover:text-white transition-all duration-300 py-2"
          >
            E-Com Calculator
          </a>
        </div>

        {/* Right Side: Desktop CTA */}
        <div className="hidden md:block">
          <MagneticElement strength={25}>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full border border-[#b449f6] text-white text-sm font-semibold hover:bg-[#b449f6] hover:shadow-glowPrimary transition-all duration-300"
            >
              Contact Us
            </Link>
          </MagneticElement>
        </div>

        {/* Mobile Hamburger menu toggle */}
        <div className="md:hidden z-10 w-10 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 -mr-2 rounded-lg text-dark-muted hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-dark-border/20 bg-[#000000] px-6 py-6 flex flex-col gap-6 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 text-left">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold pb-2 border-b border-dark-border/10 ${
                  location.pathname === '/' ? 'text-[#b449f6]' : 'text-dark-text'
                }`}
              >
                Home
              </Link>

              {/* Services Mobile Accordion */}
              <div className="border-b border-dark-border/10 pb-2">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex justify-between items-center text-lg font-bold text-dark-text focus:outline-none cursor-pointer"
                >
                  <span className={isServicesActive ? 'text-[#b449f6]' : ''}>Services</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 flex flex-col gap-3.5 pt-3"
                    >
                      {servicesItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-semibold text-dark-muted hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portfolio, About Us, Pricing */}
              {mainLinks.slice(1).map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold pb-2 border-b border-dark-border/10 ${
                      isActive ? 'text-[#b449f6]' : 'text-dark-text'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* E-Com Calculator */}
              <a
                href="https://calculator.digieonix.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold pb-2 border-b border-dark-border/10 text-dark-text"
              >
                E-Com Calculator
              </a>
            </div>

            {/* Mobile CTA */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-full border border-[#b449f6] text-white text-center font-bold hover:bg-[#b449f6] transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
