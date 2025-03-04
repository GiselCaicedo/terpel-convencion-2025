'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="min-h-screen overflow-hidden">
            <div
                className="relative min-h-screen flex flex-col bg-cover bg-center"
                style={{
                    backgroundImage: `url(${isMobile ? '/recursos/KV_backrojo_hor.png' : '/recursos/thankyouPage_back.png'})`
                }}
            >
               
                <main className={`flex-1 flex flex-col justify-center px-6 md:px-12 transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="max-w-xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Tu pre-registro se completó con éxito.
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8">
                            Pronto, un comercial se contactará contigo.
                        </p>
                        
                        <div className={`transition-all duration-700 delay-300 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Link href="/">
                                <button
                                    className="bg-terpel-yellow text-terpel-red font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                                    aria-label="Volver al inicio"
                                >
                                    Volver al inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
                        <path 
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                            fill="#ffffff" 
                            fillOpacity=".1"
                        />
                    </svg>
                </div>

        
            </div>
        </div>
    );
}