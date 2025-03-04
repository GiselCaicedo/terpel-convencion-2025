'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Banner from './components/sections/one-page/home/portada/Banner';
import Detalles from './components/sections/one-page/home/detalles/Detalles';
import Itinerario from './components/sections/one-page/itinerario/Itinerario';
import Planes from './components/sections/one-page/planes/Planes';
import Location from './components/sections/one-page/locacion/Location';
import CurrencyConverter from './components/sections/one-page/locacion/Converter';
import WeatherDisplay from './components/sections/one-page/locacion/Clima';
import Formulario from './components/sections/one-page/form/Formulario';
import DetallesInicio from './components/sections/one-page/details/DetallesInicio';
import ImageGrid from './components/sections/one-page/galeria/Images';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  id?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, id }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};


export default function Page() {

  // Variantes de animación para los títulos
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Variante para la línea decorativa
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 0.7,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <main className="w-full">
        <div id="inicio">
          <Banner />
        </div>

        <div className="w-full relative" style={{ height: '50px' }}>
          <Image
            src="/recursos/franja_textura.png"
            alt="Franja textura"
            fill
            className="object-cover"
          />
        </div>

        <FadeInSection delay={0.3}>
          <DetallesInicio />
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <Detalles />
        </FadeInSection>

        <Itinerario />
        <div id="galeria" className="relative w-full pt-12 md:pt-24 bg-white">
          <div className="container mx-auto px-4 pb-20">
            <div className="text-center">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-terpel-red tracking-wide"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleVariants}
              >
                ASÍ VIVIRÁS
              </motion.h2>
              <motion.div
                className="relative inline-block mt-3 md:mt-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtitleVariants}
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-terpel-red tracking-wide">
                  &ldquo;LA ENERGÍA SIN LÍMITES&rdquo;
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-red-600"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={lineVariants}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <FadeInSection delay={0.7}>
          <ImageGrid />
        </FadeInSection>

        <FadeInSection delay={0.8} id="planes">
          <Planes />
        </FadeInSection>

        <FadeInSection delay={0.9} id="mapas">
          <Location />
        </FadeInSection>

        <FadeInSection delay={0.9}>
          <CurrencyConverter />
        </FadeInSection>

        <FadeInSection delay={0.9}>
          <WeatherDisplay />
        </FadeInSection>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}  // Use animate instead of whileInView
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Formulario />
        </motion.div>
      </main>
    </AnimatePresence>
  );
}