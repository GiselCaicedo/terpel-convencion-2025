// Add required brand colors to Tailwind config at project level
    // This is for reference only - these should be added to your tailwind.config.js
    /*
    module.exports = {
      theme: {
        extend: {
          colors: {
            'terpel-red': '#FF0000', // Replace with actual red color code
            'terpel-white': '#FFFFFF',
            'terpel-yellow': '#FFD100', // Replace with actual yellow color code
            'terpel-yellow-2': '#FFAA00', // Replace with actual secondary yellow color code
          },
        },
      },
    }
    */'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the interface for image data
interface ImageItem {
    id: number;
    src: string;
    alt: string;
    title: string;
    description: string;
}

export default function ImageGrid() {
    // State to track if we're on mobile
    const [isMobile, setIsMobile] = useState(false);
    // State for carousel
    const [currentSlide, setCurrentSlide] = useState(0);

    // Check window size on component mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Estructura de datos para las imágenes con sus títulos y descripciones
    const imageData: ImageItem[] = [
        {
            id: 1,
            src: "/galeria/Madrid.png",
            alt: "Madrid",
            title: "Madrid",
            description: "Madrid, la capital de España, es una ciudad vibrante donde la historia y la modernidad se encuentran. Sus plazas, museos y gastronomía la convierten en un destino inolvidable. Un lugar ideal para vivir experiencias únicas."
        },
        {
            id: 2,
            src: "/galeria/Hotel Princesa Plaza Madrid.png",
            alt: "Hotel Princesa Plaza - Madrid",
            title: "Hotel princesa plaza - Madrid",
            description: "Estadía en hoteles de alta categoría, ubicados en zonas estratégicas de la ciudad, con habitaciones cómodas y servicios de primera calidad."
        },
        {
            id: 3,
            src: "/galeria/Hotel Westin Cuzco Madrid.png",
            alt: "Westin Cuzco - Madrid",
            title: "Westin Cuzco​ - Madrid",
            description: ""
        },
        {
            id: 4,
            src: "/galeria/Hotel-Hilton-Canopy-Madrid.png",
            alt: "Hilton Canopy - Madrid",
            title: "Hilton Canopy​ - Madrid",
            description: ""
        },
        {
            id: 5,
            src: "/galeria/Cena Santiago Bernabeu.png",
            alt: "Cena Estadio Santiago Bernabéu",
            title: "Cena Estadio Santiago Bernabéu",
            description: "Cena de bienvenida con tour exclusivo por el mítico estadio del Real Madrid, que incluye acceso a vestuarios, sala de trofeos, campo de juego y museo.​"
        },
        {
            id: 6,
            src: "/galeria/Toledo_Jornada_Corporativa.png",
            alt: "Toledo Jornada corporativa",
            title: "Jornada Corporativa - Toledo",
            description: "Traslado a una de las ciudades más antiguas de España, donde visitaremos un parque temático y tendremos un viaje en el tiempo a otra época llena de magia, aventura y descubrimiento.​"
        },
        {
            id: 7,
            src: "/galeria/Artista-Internacional.png",
            alt: "Artista Internacional",
            title: "Artista Internacional",
            description: ""
        },
        {
            id: 8,
            src: "/galeria/Marrakech.png",
            alt: "Marrakech",
            title: "Marrakech​",
            description: "Marrakech, la joya de Marruecos, cautiva con su arquitectura, mercados y colores vibrantes. Su medina, palacios y la icónica Plaza Jamaa el Fna crean un ambiente mágico. Un destino lleno de cultura y tradición.​"
        },
        {
            id: 9,
            src: "/galeria/Hotel Savoy Marrakech.png",
            alt: "Savoy Le Grand Hotel",
            title: "Savoy Le Grand Hotel",
            description: "Instalación en hoteles exclusivos con servicios premium, ideales para relajarse y disfrutar de la hospitalidad marroquí.​"
        },
        {
            id: 10,
            src: "/galeria/Hotel Marriot Le Meridien Marrakech.png",
            alt: "Marriot Le Meriden N'FIS",
            title: "Marriot Le Meriden N´FIS",
            description: ""
        },
        {
            id: 11,
            src: "/galeria/Hotel-Jaal-Riad-Marrakech.png",
            alt: "Jaal Riad Resort",
            title: "Jaal Riad Resort",
            description: ""
        },
        {
            id: 12,
            src: "/galeria/Jardines-de-Majorelle.png",
            alt: "Jardínes de Majorelle",
            title: "Jardínes de Majorelle​",
            description: "Un paseo por estos icónicos jardines de estilo francés, conocidos por su vibrante color azul y su colección de plantas exóticas.​"
        },
        {
            id: 13,
            src: "/galeria/Globo Marrakech.png",
            alt: "Vuelo en globo",
            title: "Vuelo en globo",
            description: "Una aventura única sobre el paisaje marroquí, con vistas panorámicas del desierto y las montañas del Atlas al amanecer.​"
        },
        {
            id: 14,
            src: "/galeria/Zocos.png",
            alt: "Visita Zocos y compras",
            title: "Visita Zocos y compras",
            description: "Recorrido por los mercados tradicionales, donde los visitantes podrán adquirir artesanías locales, especias y productos típicos.​"
        },
        {
            id: 15,
            src: "/galeria/Desierto de Agafay.png",
            alt: "Desierto de Agafay",
            title: "Desierto de Agafay",
            description: "Exploración del paisaje desértico con posibilidad de disfrutar de actividades como paseos en camello, cenas al aire libre y espectáculos bajo las estrellas​"
        },
        {
            id: 16,
            src: "/galeria/Restaurante Adouar.png",
            alt: "Restaurante Adouar",
            title: "Restaurante Adouar​",
            description: "Disfruta de una experiencia gastronómica inolvidable, con platos típicos, música en vivo y espectáculos tradicionales.​"
        },
        {
            id: 17,
            src: "/galeria/Restaurante Nouba.png",
            alt: "Restaurante Nouba",
            title: "Restaurante Nouba",
            description: ""
        },
        {
            id: 18,
            src: "/galeria/Restaurante-Palais-Dar-Soukkar.png",
            alt: "Restaurante Palais Dar Soukkar",
            title: "Restaurante Palais Dar Soukkar​",
            description: ""
        },
        {
            id: 19,
            src: "/galeria/Wah Show Madrid.png",
            alt: "Show Wah",
            title: "Show Wah",
            description: "Un espectáculo inmersivo que fusiona música, teatro y gastronomía en una experiencia sensorial única. Un viaje vibrante lleno de emoción, ritmo y sabor.​"
        }
    ];

    const madridImages = imageData.slice(0, 7);
    const marrakechImages = imageData.slice(7, 19);

    const allImages = [...madridImages, ...marrakechImages];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    if (isMobile) {
        return (
            <div className="relative w-full bg-black pb-6">
                <div className="overflow-hidden shadow-xl">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {allImages.map((image) => (
                            <div key={image.id} className="w-full flex-shrink-0">
                                <div className="relative w-full aspect-square md:aspect-video">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                    />

                                    {(image.title || image.description) && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
                                            {image.title && (
                                                <h3 className="text-terpel-yellow text-lg font-terpel font-bold mb-2">
                                                    {image.title}
                                                </h3>
                                            )}
                                            {image.description && (
                                                <p className="text-terpel-white text-sm leading-snug">
                                                    {image.description}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-terpel-white w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-terpel-white w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg transition-all duration-300"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                <div className="mt-4 flex flex-col items-center">
                    <div className="text-terpel-white text-sm mb-2">
                        <span className="font-terpel font-bold text-terpel-yellow">{currentSlide + 1}</span> / {allImages.length}
                    </div>

                    <div className="flex justify-center items-center">
                        {currentSlide > 1 && (
                            <div className="mx-1 h-2 w-8 bg-terpel-white opacity-60"></div>
                        )}

                        {currentSlide > 0 && (
                            <button
                                onClick={() => setCurrentSlide(currentSlide - 1)}
                                className="h-2 w-8 mx-1 rounded-full bg-terpel-white opacity-60 hover:opacity-100 transition-all duration-300"
                                aria-label={`Go to slide ${currentSlide}`}
                            />
                        )}

                        <button
                            className="h-2 w-12 mx-1 rounded-full bg-terpel-yellow transition-all duration-300"
                            aria-label={`Current slide ${currentSlide + 1}`}
                            disabled
                        />

                        {currentSlide < allImages.length - 1 && (
                            <button
                                onClick={() => setCurrentSlide(currentSlide + 1)}
                                className="h-2 w-8 mx-1 rounded-full bg-terpel-white opacity-60 hover:opacity-100 transition-all duration-300"
                                aria-label={`Go to slide ${currentSlide + 2}`}
                            />
                        )}

                        {currentSlide < allImages.length - 2 && (
                            <div className="mx-1 h-2 w-8 bg-terpel-white opacity-60"></div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={madridImages[0]} />
                </div>
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={madridImages[1]} />
                </div>
            </div>

            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {madridImages.slice(2, 5).map((image) => (
                    <div key={image.id} className="aspect-square">
                        <ImageWithHover image={image} />
                    </div>
                ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={madridImages[5]} />
                </div>
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={madridImages[6]} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[0]} />
                </div>
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[1]} />
                </div>
            </div>

            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {marrakechImages.slice(2, 5).map((image) => (
                    <div key={image.id} className="aspect-square">
                        <ImageWithHover image={image} />
                    </div>
                ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[5]} />
                </div>
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[6]} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[7]} />
                </div>
                <div className="aspect-video">
                    <FeaturedImageWithDescription image={marrakechImages[8]} />
                </div>
            </div>

            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {marrakechImages.slice(9, 12).map((image) => (
                    <div key={image.id} className="aspect-square">
                        <ImageWithHover image={image} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

interface ImageComponentProps {
    image: ImageItem;
}

const ImageWithHover = ({ image }: ImageComponentProps) => {
    if (!image || !image.src) return null;

    return (
        <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
            />
            {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <h3 className="text-yellow-400 text-sm font-terpel font-bold">
                        {image.title}
                    </h3>
                </div>
            )}
        </motion.div>
    );
};

const FeaturedImageWithDescription = ({ image }: ImageComponentProps) => {
    if (!image || !image.src) return null;

    return (
        <div className="relative w-full h-full overflow-hidden shadow-lg">
            <motion.div
                className="w-full h-full relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                />
            </motion.div>
            {(image.title || image.description) && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {image.title && (
                        <h2 className="text-yellow-400 text-xl font-terpel font-bold mb-1">
                            {image.title}
                        </h2>
                    )}
                    {image.description && (
                        <p className="text-white text-sm">
                            {image.description}
                        </p>
                    )}
                </motion.div>
            )}
        </div>
    );
};