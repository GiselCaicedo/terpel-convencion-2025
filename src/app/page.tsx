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

// Define the props interface for the FadeInSection component
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

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <motion.div
        className="grid grid-cols-3 gap-2 pt-2"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full relative aspect-square"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Imagen fila 1 izquierda"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="w-full relative aspect-square"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Imagen fila 1 centro"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="w-full relative aspect-square"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Imagen fila 1 derecha"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="relative w-full overflow-hidden shadow-lg aspect-video">
        <motion.div
          className="w-full h-full relative"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Edificio Metrópolis en Madrid"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-yellow-400 text-xl md:text-2xl font-bold mb-2">
            PUERTO DE ESAOUIRA
          </h2>
          <p className="text-white text-sm md:text-base">
            Esaouira es una bonita ciudad amurallada junto al mar que está a poco más de una
            hora de Marrakech. No dejes de recorrer sus calles en las que aún se deja ver la
            influencia portuguesa.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-2"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full relative aspect-video"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Imagen fila 3 izquierda"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="w-full relative aspect-video"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/recursos/imagen_ejemplo.jpg"
            alt="Imagen fila 3 derecha"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
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
          <div className="container mx-auto px-4">
            <div className="text-center">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 tracking-wide"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleVariants}
              >
                CONOCE LOS DESTINOS DE
              </motion.h2>
              <motion.div
                className="relative inline-block mt-3 md:mt-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtitleVariants}
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 tracking-wide">
                  &ldquo;ENERGÍA SIN LÍMITE&rdquo;
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

          <FadeInSection delay={0.6}>
            <div className="w-full mt-8 md:mt-12 overflow-hidden relative" style={{ height: '50vh' }}>
              <video
                src="/recursos/video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
              />
            </div>
          </FadeInSection>
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

        <FadeInSection delay={1} id="formulario">
          <Formulario />
        </FadeInSection>
      </main>
    </AnimatePresence>
  );
}