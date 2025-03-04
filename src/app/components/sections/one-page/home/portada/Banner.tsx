'use client'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const Banner = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024 || window.innerHeight > window.innerWidth);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const openVideo = () => setShowVideo(true);
    const closeVideo = () => setShowVideo(false);
    if (isMobile) {
        return (
            <div className="relative w-full h-screen flex flex-col justify-between">                <div className="absolute inset-0">
                <div className="relative w-full h-full">
                    <Image
                        src="/recursos/KV_backrojo_hor.png"
                        alt="Energía Sin Límites background"
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                        style={{
                            objectPosition: 'center center'
                        }}
                    />
                </div>
            </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-16 pt-4 space-y-0">                    <div className="w-full max-w-xs sm:max-w-sm mx-auto mb-0">
                    <Image
                        src="/recursos/Kv_transp.png"
                        alt="Energía Sin Límites logo"
                        className="w-full h-auto"
                        width={500}
                        height={300}
                    />
                </div>
                    <div className="mt-6">
                        <button
                            onClick={openVideo}
                            className="w-12 h-12 rounded-full flex items-center justify-center 
                                    bg-terpel-red border-2 border-white
                                    transition-all duration-300"
                            aria-label="Play video"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                            >
                                <polygon points="10,8 16,12 10,16" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center">
                    <div className="mx-auto max-w-xs">
                        <h1 className="text-terpel-yellow text-3xl font-terpel font-bold leading-none">
                            Convención
                            <br />
                            de Aliados 2025
                        </h1>
                        <div className="text-white mt-1">
                            <h2 className="text-sm tracking-wide font-terpel font-normal mb-0 leading-tight">
                                MADRID - MARRAKECH
                            </h2>
                            <p className="text-xs font-light leading-tight">
                                Del 6 al 13 de septiembre
                            </p>
                        </div>
                    </div>
                </div>
                {showVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl aspect-video mx-auto">
                            <button
                                onClick={closeVideo}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-terpel-red rounded-full p-1"
                                aria-label="Close video"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                src="https://www.youtube.com/embed/0LSnleZIGXM?autoplay=1"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Desktop Version
    return (
        <div className="relative w-full h-screen">
            {/* Background container */}
            <div className="absolute inset-0">
                <div className="relative w-full h-full">
                    <Image
                        src="/recursos/banner.png"
                        alt="Hot air balloon landscape"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                        style={{
                            objectPosition: '50% 17%'
                        }}
                    />
                </div>
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <button
                    onClick={openVideo}
                    className="w-24 h-24 rounded-full flex items-center justify-center 
                            bg-black/30 border-2 border-white
                            transition-all duration-300 hover:bg-black/40"
                    aria-label="Play video"
                >
                    <svg
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    >
                        <polygon points="10,8 16,12 10,16" fill="white" />
                    </svg>
                </button>
            </div>

            {/* Text overlay - Desktop */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
                <div className="mx-auto md:pl-16">
                    <h1 className="text-terpel-yellow text-3xl md:text-5xl leading-tight tracking-[0.5rem]">
                        <span className="font-terpel font-normal bold">Convención</span>
                        <br />
                        <span className="font-terpel font-normal">de Aliados</span>
                        <span className="font-extrabold"> 2025</span>
                    </h1>
                    <div className="text-white mt-4">
                        <h2 className="text-base md:text-3xl tracking-[0.2em] font-light mb-2">
                            MADRID - MARRAKECH
                        </h2>
                        <p className="text-2xl md:text-lg font-light tracking-[0.2rem]">
                            Desde el 6-13 de septiembre
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-6xl aspect-video mx-auto">
                        <button
                            onClick={closeVideo}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300"
                            aria-label="Close video"
                        >
                            <X size={24} />
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/0LSnleZIGXM?autoplay=1"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;