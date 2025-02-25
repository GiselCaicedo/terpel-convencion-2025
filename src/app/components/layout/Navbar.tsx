'use client'
import React, { useState, useEffect, ReactNode } from 'react';
import { User, Menu, X } from 'lucide-react';
import Image from 'next/image';

// Define interface for NavLink props
interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('inicio');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            // Mostramos el navbar si el mouse está en la parte superior o si estamos al inicio de la página
            if (mouseAtTop || window.scrollY <= 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            
            // Determinamos si estamos en la parte superior de la página para el efecto de fondo
            setIsAtTop(window.scrollY <= 100);
            setLastScrollY(window.scrollY);
        };

        // Actualizar el link activo basado en la posición de scroll
        const updateActiveSection = () => {
            const sections = {
                'inicio': 0,
                'planes': document.getElementById('planes')?.offsetTop || 0,
                'galeria': document.getElementById('galeria')?.offsetTop || 0,
                'mapas': document.getElementById('mapas')?.offsetTop || 0,
            };

            const currentPosition = window.scrollY + 100; // Añadir offset para mejor detección

            // Encontrar la sección más cercana
            let activeSection = 'inicio';
            let minDistance = Infinity;

            for (const [section, position] of Object.entries(sections)) {
                const distance = Math.abs(currentPosition - position);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = section;
                }
            }

            setActiveLink(activeSection);
        };

        // Detectar cuando el mouse está en la parte superior de la página
        const handleMouseMove = (e: MouseEvent) => {
            // Consideramos "parte superior" los primeros 50px desde arriba
            setMouseAtTop(e.clientY <= 50);
            // Actualizamos la visibilidad del navbar inmediatamente
            controlNavbar();
        };

        window.addEventListener('scroll', controlNavbar);
        window.addEventListener('scroll', updateActiveSection);
        window.addEventListener('mousemove', handleMouseMove);

        // Ejecutar una vez al inicio para configurar el estado inicial
        updateActiveSection();

        return () => {
            window.removeEventListener('scroll', controlNavbar);
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lastScrollY, mouseAtTop, isAtTop]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Aumentamos el offset para asegurar que el contenido esté bien visible
            // Especialmente importante para la sección de galería
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        setActiveLink(sectionId);
        setMobileMenuOpen(false); // Cerrar menú móvil al hacer clic
    };

    const NavLink = ({ href, children }: NavLinkProps) => {
        const sectionId = href.replace('#', '');
        const isActive = activeLink === sectionId;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (sectionId === 'inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (href.startsWith('#')) {
                scrollToSection(sectionId);
            } else {
                // Para links externos o páginas separadas
                window.location.href = href;
            }
            setMobileMenuOpen(false); // Cerrar menú móvil al hacer clic
        };

        return (
            <a
                href={href}
                onClick={handleClick}
                className={`
                    text-white text-sm font-light tracking-[0.2em]
                    hover:text-gray-300 transition-all duration-300
                    relative pb-2
                    ${isActive ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-400' : ''}
                `}
            >
                {children}
            </a>
        );
    };

    return (
        <nav
            className={`
                w-full px-4 md:px-8 lg:px-20 xl:px-40 py-4 md:py-6 lg:py-8 
                flex items-center justify-between fixed top-0 left-0 z-50
                transition-all duration-300
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                ${isAtTop ? 'bg-transparent' : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'}
                ${mobileMenuOpen ? 'bg-black' : ''}
            `}
        >
            {/* Logo section */}
            <div className="flex items-center">
                <Image
                    src="/recursos/logo_terpel.png"
                    alt="Logo Terpel"
                    className="h-8 md:h-10 w-auto"
                />
            </div>

            {/* Hamburger Menu for Mobile */}
            <button 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-10">
                <NavLink href="/">INICIO</NavLink>
                <NavLink href="/planes">PLANES</NavLink>
                <NavLink href="#galeria">GALERÍA</NavLink>
                <NavLink href="#mapas">MAPAS</NavLink>
                <button
                    onClick={() => scrollToSection('formulario')}
                    className="bg-red-600 text-white px-4 lg:px-6 py-1 text-sm font-normal tracking-[0.2em] hover:bg-red-700 transition-colors rounded-3xl"
                >
                    REGISTRARME
                </button>
                <a
                    href="#perfil"
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    <User size={20} />
                </a>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/60 backdrop-blur-sm py-6 px-4 flex flex-col gap-6">
                    <NavLink href="/">INICIO</NavLink>
                    <NavLink href="/planes">PLANES</NavLink>
                    <NavLink href="#galeria">GALERÍA</NavLink>
                    <NavLink href="#mapas">MAPAS</NavLink>
                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={() => scrollToSection('formulario')}
                            className="bg-red-600 text-white px-6 py-2 text-sm font-normal tracking-[0.2em] hover:bg-red-700 transition-colors rounded-3xl"
                        >
                            REGISTRARME
                        </button>
                        <a
                            href="#perfil"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <User size={20} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}