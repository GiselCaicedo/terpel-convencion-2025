'use client';
import React from 'react';
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
            title: "Toledo Jornada corporativa",
            description: "Traslado a una de las ciudades más antiguas de España, donde visitaremos un parque temático y tendremos un viaje en el tiempo a otra época llena de magia, aventura y descubrimiento.​"
        },
        {
            id: 7,
            src: "/galeria/Artista-Internacional.png",
            alt: "Artista Internacional",
            title: "",
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

    // Agrupamos las imágenes para la disposición en la cuadrícula
    const madridImages = imageData.slice(0, 7);
    const marrakechImages = imageData.slice(7, 19);

    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Sección de Madrid */}
            <FeaturedImageWithDescription image={madridImages[0]} />
            
            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {madridImages.slice(1, 4).map((image) => (
                    <ImageWithHover key={image.id} image={image} />
                ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
                {madridImages.slice(4, 6).map((image) => (
                    <FeaturedImageWithDescription key={image.id} image={image} />
                ))}
            </div>

            {/* Imagen 7 si está disponible */}
            {madridImages[6] && madridImages[6].src && (
                <ImageWithHover image={madridImages[6]} />
            )}

            {/* Sección de Marrakech */}
            <FeaturedImageWithDescription image={marrakechImages[0]} />
            
            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {marrakechImages.slice(1, 4).map((image) => (
                    <ImageWithHover key={image.id} image={image} />
                ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
                {marrakechImages.slice(4, 6).map((image) => (
                    <FeaturedImageWithDescription key={image.id} image={image} />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
                {marrakechImages.slice(6, 8).map((image) => (
                    <FeaturedImageWithDescription key={image.id} image={image} />
                ))}
            </div>

            <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {marrakechImages.slice(8, 11).map((image) => (
                    <ImageWithHover key={image.id} image={image} />
                ))}
            </motion.div>

            <FeaturedImageWithDescription image={marrakechImages[11]} />
        </div>
    );
}

// Props interface for components
interface ImageComponentProps {
    image: ImageItem;
}

// Componente para imagen con efecto hover
const ImageWithHover = ({ image }: ImageComponentProps) => {
    if (!image || !image.src) return null;
    
    return (
        <motion.div
            className="w-full relative aspect-square"
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
                    <h3 className="text-yellow-400 text-sm font-bold">
                        {image.title}
                    </h3>
                </div>
            )}
        </motion.div>
    );
};

// Componente para imagen destacada con descripción
const FeaturedImageWithDescription = ({ image }: ImageComponentProps) => {
    if (!image || !image.src) return null;
    
    return (
        <div className="relative w-full overflow-hidden shadow-lg aspect-video">
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
                        <h2 className="text-yellow-400 text-xl font-bold mb-1">
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