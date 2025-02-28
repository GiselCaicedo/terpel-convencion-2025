'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importa Link

export default function ThankYouPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="thank-you-page">
            <div
                className="background-container"
                style={{
                    backgroundImage: `url(${isMobile ? '/recursos/KV_backrojo_hor.png' : '/recursos/thankyouPage_back.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}
            >
                <main className="content" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2rem',
                    color: 'white',
                    maxWidth: isMobile ? '100%' : '50%',
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '1.8rem' : '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        Tu pre-registro se completó con éxito.
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        Pronto, un comercial se contactará contigo.
                    </p>

                    <div className="button-container" style={{ marginTop: '2rem' }}>
                        <Link href="/">
                            <span
                                className="return-button"
                                style={{
                                    backgroundColor: '#FFD700',
                                    color: '#8B0000',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Volver al inicio
                            </span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
