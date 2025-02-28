'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../../../styles/itinerario/itinerario.css';
import Image from 'next/image';

// Define interfaces for our props
interface ItineraryItem {
    day: number;
    title: string;
    description: string;
}

interface ItineraryCardProps {
    day: number;
    title: string;
    description: string;
    isReversed: boolean;
    index: number;
}

// Componente de tarjeta para vista de escritorio (original)
const DesktopItineraryCard: React.FC<ItineraryCardProps> = ({ day, title, description, isReversed, index }) => {
    const getPositionClasses = (): string => {
        switch (day) {
            case 2:
                return '-translate-y-12';
            case 3:
                return 'translate-y-4';
            case 5:
                return 'translate-y-4';
            default:
                return '';
        }
    };

    const imageClasses = `
        h-32 w-40 object-cover rounded-xl
        image-hover-effect
    `;

    // Modificamos los cardVariants para incluir la posición Y inicial
    const cardVariants = {
        hidden: (day: number) => ({
            opacity: 0,
            x: -50,
            y: day === 2 ? -48 : day === 3 || day === 5 ? 16 : 0 // Convertimos las clases translate a píxeles
        }),
        visible: (day: number) => ({
            opacity: 1,
            x: 0,
            y: day === 2 ? -48 : day === 3 || day === 5 ? 16 : 0,
            transition: {
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut"
            }
        })
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.2 + 0.3,
                duration: 0.5
            }
        }
    };

    if (isReversed) {
        return (
            <motion.div
                className={`flex flex-col w-40 justify-between relative ${getPositionClasses()}`}
                variants={cardVariants}
                custom={day}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div
                    className="text-center"
                    variants={contentVariants}
                >
                    <h3 className="text-red-600 text-sm font-light">Día {day}</h3>
                    <h4 className="font-light text-gray-700 text-sm">{title}</h4>
                    <p className="text-sm font-light text-gray-700">{description}</p>
                </motion.div>
                <motion.div
                    className="flex justify-center mt-5"
                    variants={contentVariants}
                >
                    <div className="relative">
                        <Image
                            src="/recursos/location_itinerario.svg"
                            alt="Location"
                            className="w-15 h-15 relative z-20 location-animation"
                            fill={true}
                        />
                    </div>
                </motion.div>
                <motion.div
                    className="mt-4"
                    variants={contentVariants}
                >
                    <Image
                        src="/recursos/imagen_ejemplo.jpg"
                        alt={`Day ${day}`}
                        className={imageClasses}
                        fill={true}
                    />
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={`flex flex-col w-40 justify-between relative ${getPositionClasses()}`}
            variants={cardVariants}
            custom={day}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div
                variants={contentVariants}
            >
                <Image
                    src="/recursos/imagen_ejemplo.jpg"
                    alt={`Day ${day}`}
                    className={imageClasses}
                    fill={true}
                />
            </motion.div>
            <motion.div
                className="flex justify-center mt-5"
                variants={contentVariants}
            >
                <div className="relative">
                    <Image
                        src="/recursos/location_itinerario.svg"
                        alt="Location"
                        className="w-15 h-15 relative z-20 location-animation"
                        fill={true}
                    />
                </div>
            </motion.div>
            <motion.div
                className="text-center mt-4"
                variants={contentVariants}
            >
                <h3 className="text-red-600 text-sm font-light">Día {day}</h3>
                <h4 className="font-light text-gray-700 text-sm">{title}</h4>
                <p className="text-sm font-light text-gray-700">{description}</p>
            </motion.div>
        </motion.div>
    );
};

// Componente de tarjeta para vista de tablet
const TabletItineraryCard: React.FC<ItineraryCardProps> = ({ day, title, description, isReversed, index }) => {
    const imageClasses = `
        h-40 w-full object-cover rounded-xl
        image-hover-effect
    `;

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut"
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.2 + 0.2,
                duration: 0.4
            }
        }
    };

    // Para tablet alternamos la dirección de la tarjeta (imagen-texto / texto-imagen)
    return (
        <motion.div
            className="mb-8 w-full"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className=" bg-opacity-80 rounded-xl p-4 ">
                <div className={`flex flex-row ${isReversed ? 'flex-row-reverse' : ''} items-center gap-4`}>
                    <motion.div
                        className="w-1/2"
                        variants={contentVariants}
                    >
                        <Image
                            src="/recursos/imagen_ejemplo.jpg"
                            alt={`Day ${day}`}
                            className={imageClasses}
                            fill={true}
                        />
                    </motion.div>

                    <motion.div
                        className="w-1/2 flex flex-col items-center"
                        variants={contentVariants}
                    >
                        <div className="relative mb-4">
                            <Image
                                src="/recursos/location_itinerario.svg"
                                alt="Location"
                                className="w-12 h-12 relative z-20 location-animation"
                                fill={true}
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-red-600 text-lg font-medium">Día {day}</h3>
                            <h4 className="font-medium text-gray-700 text-lg">{title}</h4>
                            <p className="text-gray-700">{description}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

// Interface for the carousel props
interface MobileCarouselProps {
    itineraryData: ItineraryItem[];
}

// Componente para vista de carrusel en móvil
const MobileCarousel: React.FC<MobileCarouselProps> = ({ itineraryData }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? itineraryData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === itineraryData.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrev}
                    className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
                    aria-label="Anterior"
                >
                    &larr;
                </button>
                <span className="text-gray-700">
                    {activeIndex + 1} / {itineraryData.length}
                </span>
                <button
                    onClick={handleNext}
                    className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
                    aria-label="Siguiente"
                >
                    &rarr;
                </button>
            </div>

            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className=" bg-opacity-80 rounded-xl p-4 "
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full">
                        <Image
                            src="/recursos/imagen_ejemplo.jpg"
                            alt={`Day ${itineraryData[activeIndex].day}`}
                            className="h-40 w-full object-cover rounded-xl image-hover-effect"
                            fill={true}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <Image
                                src="/recursos/location_itinerario.svg"
                                alt="Location"
                                className="w-12 h-12 relative z-20 location-animation"
                                fill={true}
                            />
                        </div>
                    </div>

                    <div className="text-center w-full">
                        <h3 className="text-red-600 text-lg font-medium">
                            Día {itineraryData[activeIndex].day}
                        </h3>
                        <h4 className="font-medium text-gray-700 text-lg">
                            {itineraryData[activeIndex].title}
                        </h4>
                        <p className="text-gray-700">
                            {itineraryData[activeIndex].description}
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="flex justify-center mt-4">
                {itineraryData.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-3 h-3 mx-1 rounded-full ${idx === activeIndex ? 'bg-red-600' : 'bg-gray-300'
                            }`}
                        aria-label={`Ir al día ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Itinerary: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        // Establecer el ancho de la ventana inicialmente y en cada resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Llamar al handler ahora y configurar el listener
        handleResize();
        window.addEventListener('resize', handleResize);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const itineraryData: ItineraryItem[] = [
        {
            day: 1,
            title: "Vuelo y llegada a Madrid",
            description: "Aeropuerto, Traslado al hotel",
        },
        {
            day: 2,
            title: "Tour Madrid",
            description: "Tiempo libre",
        },
        {
            day: 3,
            title: "Vuelo y llegada a Marrakech",
            description: "Aeropuerto, Traslado al hotel",
        },
        {
            day: 4,
            title: "Tour Marrakech",
            description: "Tarde libre",
        },
        {
            day: 5,
            title: "Ifrane - Beni Mellal - Marrakech",
            description: "",
        }
    ];

    return (
        <div className="w-full relative bg-transparent">
            <div className="absolute inset-0">
                <motion.img
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    src="/recursos/back_blue.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 py-8">
                <div className="px-4 md:px-8 lg:px-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-4"
                    >
                        PLAN DE VIAJE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center text-gray-600 mb-8 md:mb-16 max-w-3xl mx-auto"
                    >
                        Descubre una experiencia única en dos destinos fascinantes. Durante 8 días, Madrid y Marrakech serán el escenario perfecto para conectar, inspirar y vivir experiencias inolvidables.
                    </motion.p>

                    {/* Vista móvil con carrusel (menos de 640px) */}
                    {windowWidth < 640 && (
                        <MobileCarousel itineraryData={itineraryData} />
                    )}

                    {/* Vista tablet (entre 640px y 1024px) */}
                    {windowWidth >= 640 && windowWidth < 1024 && (
                        <div className="max-w-4xl mx-auto">
                            {itineraryData.map((item, index) => (
                                <TabletItineraryCard
                                    key={item.day}
                                    {...item}
                                    isReversed={index % 2 !== 0}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {/* Vista desktop (más de 1024px) */}
                    {windowWidth >= 1024 && (
                        <div className="relative w-full">
                            <div className="absolute top-1/2 right-0 -translate-y-1/2">
                                <motion.img
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    src="/recursos/line.svg"
                                    alt="Path"
                                    className="w-full"
                                    style={{ transformOrigin: 'left' }}
                                />
                            </div>

                            <div className="flex justify-between items-center relative">
                                {itineraryData.map((item, index) => (
                                    <DesktopItineraryCard
                                        key={item.day}
                                        {...item}
                                        isReversed={index % 2 !== 0}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    className="text-center mt-8 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <a
                        href="/planes"
                        className="inline-block bg-red-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                        VER DETALLE
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Itinerary;