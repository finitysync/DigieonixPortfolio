import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../context/ContentContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Social Media Marketing',
    budget: 'PKR 40,000 – 60,000',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  usePageMeta({
    title: 'Contact Us',
    description: 'Get in touch with Digieonix for digital marketing, web development, SEO, and social media services. We respond within 24 hours.'
  });

  const content = useContent();
  const contactInfo = content?.contactInfo || {};
  const socialLinks = content?.socialLinks || {};

  const servicesList = [
    'Social Media Marketing',
    'Social Media Management',
    'Web Development',
    'SEO',
    'PPC / Meta Ads',
    'Other'
  ];

  const budgetsList = [
    'PKR 40,000 – 60,000',
    'PKR 60,000 – 100,000',
    'PKR 100,000+',
    'Not sure yet'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Firebase Firestore
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'leads'), newLead);

      // 2. Send Email via mail.php
      const response = await fetch('/mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newLead)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        // Even if email fails, lead is saved to Firebase. Still, show success but log error
        console.error("Email failed:", data.message);
        setIsSubmitted(true); // Don't block UI if email fails but DB succeeds
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Network error. Please try again or WhatsApp us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Social Media Marketing',
      budget: 'PKR 40,000 – 60,000',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <PageTransition>
      {/* 1. Page Hero Header */}
      <section className="relative pt-32 pb-20 w-full bg-[#000000] overflow-hidden border-b border-dark-border/20 flex items-center min-h-[300px]">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#b449f6]/10 glow-blur pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-dark-card/5 glow-blur pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb: Home > Contact */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark-muted mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-dark-border/40">/</span>
              <span className="text-[#b449f6]">Contact</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Let's Work Together
            </h1>
            <p className="text-dark-muted text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Layout: Two-Column Form & Info */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          {/* Left Column (60%): Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#111111] rounded-3xl p-8 md:p-10 border border-dark-border/20 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullname" className="text-xs font-semibold text-white uppercase tracking-wider">
                        Full Name <span className="text-[#b449f6]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="fullname"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] transition-all ${
                          errors.name ? 'border-[#ec4899]' : 'border-dark-border/60'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-[#ec4899] flex items-center gap-1.5 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold text-white uppercase tracking-wider">
                          Email Address <span className="text-[#b449f6]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="johndoe@example.com"
                          className={`w-full bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] transition-all ${
                            errors.email ? 'border-[#ec4899]' : 'border-dark-border/60'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-[#ec4899] flex items-center gap-1.5 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-semibold text-white uppercase tracking-wider">
                          Phone Number <span className="text-dark-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+92 300 1234567"
                          className="w-full bg-black border border-dark-border/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] transition-all"
                        />
                      </div>
                    </div>

                    {/* Service & Budget Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-xs font-semibold text-white uppercase tracking-wider">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          id="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-dark-border/60 focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                        >
                          {servicesList.map((srv, idx) => (
                            <option key={idx} value={srv} className="bg-[#111111] text-white">
                              {srv}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-xs font-semibold text-white uppercase tracking-wider">
                          Project Budget
                        </label>
                        <select
                          name="budget"
                          id="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-dark-border/60 focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                        >
                          {budgetsList.map((bg, idx) => (
                            <option key={idx} value={bg} className="bg-[#111111] text-white">
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold text-white uppercase tracking-wider">
                        Message <span className="text-[#b449f6]">*</span>
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder="Describe your goals, requirements, or general questions..."
                        className={`w-full bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-[#b449f6] focus:ring-1 focus:ring-[#b449f6] transition-all resize-none ${
                          errors.message ? 'border-[#ec4899]' : 'border-dark-border/60'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-[#ec4899] flex items-center gap-1.5 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* General submission error */}
                    {errors.submit && (
                      <div className="bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-xl p-4 text-center">
                        <p className="text-xs text-[#ec4899] flex items-center justify-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.submit}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-[#b449f6] text-white font-bold text-sm uppercase tracking-wider cursor-pointer hover:shadow-lg hover:shadow-[#b449f6]/20 transition-all flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            {/* Loading spinner */}
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-extrabold text-white">Message Sent!</h3>
                      <p className="text-dark-muted text-sm max-w-sm mx-auto leading-relaxed">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl border border-dark-border/80 hover:border-[#b449f6]/40 text-xs font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (40%): Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Contact Details Card */}
            <div className="bg-[#111111] rounded-3xl p-8 border-l-4 border-[#b449f6] border-y border-r border-dark-border/20 text-left space-y-6 shadow-2xl relative">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b449f6]/10 flex items-center justify-center text-[#b449f6] shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block mb-1">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${contactInfo.email || 'info@digieonix.com'}`}
                      className="text-sm font-semibold text-white hover:text-[#b449f6] transition-colors"
                    >
                      {contactInfo.email || 'info@digieonix.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b449f6]/10 flex items-center justify-center text-[#b449f6] shrink-0 mt-1">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block mb-1">
                      WhatsApp Support
                    </span>
                    <a
                      href={`https://wa.me/${(contactInfo.phone || '').replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                    >
                      {contactInfo.phone ? `WhatsApp Us` : 'Chat on WhatsApp'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b449f6]/10 flex items-center justify-center text-[#b449f6] shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block mb-1">
                      Office Location
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {contactInfo.location || 'Lahore, Punjab, Pakistan'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b449f6]/10 flex items-center justify-center text-[#b449f6] shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block mb-1">
                      Response Time
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Within 24 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours Note */}
              <div className="border-t border-dark-border/20 pt-6">
                <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block mb-1">
                  Working Hours
                </span>
                <p className="text-sm font-semibold text-white">
                  Mon–Sat, 10am–8pm PKT
                </p>
              </div>

              {/* Social Icons row */}
              <div className="border-t border-dark-border/20 pt-6 space-y-3">
                <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block">
                  Follow Us
                </span>
                <div className="flex items-center gap-4">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border/40 text-[#b449f6] hover:bg-[#b449f6]/10 hover:border-[#b449f6]/50 flex items-center justify-center transition-all"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border/40 text-[#b449f6] hover:bg-[#b449f6]/10 hover:border-[#b449f6]/50 flex items-center justify-center transition-all"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border/40 text-[#b449f6] hover:bg-[#b449f6]/10 hover:border-[#b449f6]/50 flex items-center justify-center transition-all"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border/40 text-[#b449f6] hover:bg-[#b449f6]/10 hover:border-[#b449f6]/50 flex items-center justify-center transition-all"
                    >
                      <FaYoutube className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border/40 text-[#b449f6] hover:bg-[#b449f6]/10 hover:border-[#b449f6]/50 flex items-center justify-center transition-all"
                    >
                      <FaTiktok className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
