import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const FloatingWhatsApp = () => {
  // Format the number (remove leading 0 and add country code 92)
  const phoneNumber = "923429313239"; 
  const defaultMessage = "Hi Digieonix! I want to grow my business digitally.";
  
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] group hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 text-white relative z-10" />
      
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40 pointer-events-none"></span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
