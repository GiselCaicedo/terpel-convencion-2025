'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const WhatsAppChatButton = () => {
  const phoneNumber = '+573123456789'; 
  const message = 'Hola, estoy interesado en obtener más información.';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Link 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex w-20 h-20 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center"
      >
        <motion.img 
          src='/recursos/whatsapp-icon-free-png.webp' 
          alt="WhatsApp Chat" 
          initial={{ rotate: 0 }}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.3 }}
          className="w-[4.5rem] h-[4.5rem] object-contain"
        />
      </Link>
    </motion.div>
  );
};

export default WhatsAppChatButton;