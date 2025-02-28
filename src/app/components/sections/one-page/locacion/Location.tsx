import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const LocationMaps = () => {
  const locations = [
    {
      city: "Madrid",
      country: "España",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.3837512083!2d-3.819621771484375!3d40.43813589999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Espa%C3%B1a!5e0!3m2!1ses!2s!4v1708746024967!5m2!1ses!2s"
    },
    {
      city: "Marrakech",
      country: "Marruecos",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108703.16923925976!2d-8.049734865225172!3d31.634851866276154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech%2C%20Marruecos!5e0!3m2!1ses!2s!4v1708746075425!5m2!1ses!2s"
    }
  ];

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fondo con opacidad */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: 'url(/recursos/back_blue.png)' }}
      />
      
      {/* Contenido sin opacidad */}
      <div className="relative z-10 py-24">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-5xl font-extrabold text-red-600">
                UBICACIÓN TURÍSTICA
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pendiente información
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {locations.map((location) => (
              <motion.div
                key={location.city}
                className="group"
                variants={itemVariants}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 transform transition-all duration-300 hover:shadow-sm hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 rounded-xl p-3">
                      <Building2 className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-1">
                        {location.city}
                      </h3>
                      <p className="text-xl text-gray-600 mb-2">
                        {location.country}
                      </p>
                     
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl shadow-sm overflow-hidden bg-white transform transition-all duration-300">
                  <div className="h-[550px] w-full">
                    <iframe
                      src={location.mapUrl}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa de ${location.city}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationMaps;