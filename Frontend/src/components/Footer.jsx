import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

export const Footer = () => {
  const content = useContent();
  const contactInfo = content?.contactInfo || {};
  const socialLinksRaw = content?.socialLinks || {};
  const servicesList = content?.services?.map(s => s.title) || [
    'Social Media Marketing',
    'Social Media Management',
    'Web Development',
    'Search Engine Optimization',
    'PPC Expert'
  ];
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const socialLinks = [
    { icon: FaInstagram, url: socialLinksRaw.instagram || 'https://instagram.com/digieonix', label: 'Instagram' },
    { icon: FaFacebookF, url: socialLinksRaw.facebook || 'https://facebook.com/digieonix', label: 'Facebook' },
    { icon: FaLinkedinIn, url: socialLinksRaw.linkedin || 'https://linkedin.com/company/digieonix', label: 'LinkedIn' },
    { icon: FaYoutube, url: socialLinksRaw.youtube || 'https://youtube.com/digieonix', label: 'YouTube' },
    { icon: FaTiktok, url: socialLinksRaw.tiktok || 'https://tiktok.com/@digieonix', label: 'TikTok' }
  ].filter(link => link.url);

  return (
    <footer className="relative border-t border-[#b449f6] bg-[#000000] overflow-hidden mt-auto">
      {/* Subtle Mesh Background Overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#b449f6]/5 glow-blur z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-left">
          {/* Column 1: Logo + Tagline + Social Icons */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={content?.branding?.logo || '/logo.png'}
                alt="Digieonix Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-dark-muted text-sm leading-relaxed max-w-xs">
              We empower startups and enterprises with high-growth social media campaigns, custom web development, and search domination.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-dark-border/20 flex items-center justify-center text-dark-muted hover:text-[#b449f6] hover:border-[#b449f6]/40 transition-all hover:scale-105"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-muted text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-dark-muted text-sm hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-dark-muted tracking-wider">Email Address</span>
                <a
                  href={`mailto:${contactInfo.email || 'info@digieonix.com'}`}
                  className="font-semibold text-white hover:text-[#b449f6] transition-colors"
                >
                  {contactInfo.email || 'info@digieonix.com'}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-dark-muted tracking-wider">WhatsApp Helpline</span>
                <a
                  href={`https://wa.me/${(contactInfo.phone || '923044455618').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[#b449f6] transition-colors"
                >
                  {contactInfo.phone || '+92 304 4455618'}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-dark-muted tracking-wider">Our Location</span>
                <span className="font-semibold text-white">
                  {contactInfo.location || 'Lahore, Pakistan'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-dark-border/20 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-muted text-xs">
            © {new Date().getFullYear()} Digieonix. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-dark-muted">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
