'use client'
import React, { useState, useEffect, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// Define interface for NavLink props
interface NavLinkProps {
    href: string;
    children: ReactNode;
}

// Export a variable to use for main content padding
export const NAVBAR_HEIGHT = {
    mobile: '64px',   // 4rem or 16*4
    tablet: '80px',   // 5rem or 16*5
    desktop: '96px',  // 6rem or 16*6
};

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('inicio');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Check if current path is /formulario or /formulario/thankfull
    const isFormularioPage = pathname === '/formulario';
    const isThankfullPage = pathname === '/formulario/thankyou';
    const isHomePage = pathname === '/';

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
            // Only update active section on home page
            if (!isHomePage) return;
            
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
    }, [lastScrollY, mouseAtTop, isAtTop, isHomePage]);

    const scrollToSection = (sectionId: string) => {
        if (isHomePage) {
            // If we're on home page, simply scroll to section
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            setActiveLink(sectionId);
        } else {
            // If we're not on home page, navigate to home page with hash
            router.push(`/#${sectionId}`);
        }
        setMobileMenuOpen(false);
    };

    const navigateToFormulario = () => {
        router.push('/formulario');
        setMobileMenuOpen(false); 
    };

    const NavLink = ({ href, children }: NavLinkProps) => {
        const sectionId = href.replace('#', '');
        const isActive = activeLink === sectionId;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (sectionId === 'inicio') {
                if (isHomePage) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    router.push('/');
                }
            } else if (href.startsWith('#')) {
                scrollToSection(sectionId);
            } else if (href === '/planes') {
                router.push('/planes');
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
                    ${isActive && isHomePage ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-400' : ''}
                `}
            >
                {children}
            </a>
        );
    };

    // Logo component for reuse
    const Logo = () => (
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <Image
                src="/recursos/logo_terpel.png"
                alt="Logo Terpel"
                className="h-8 md:h-10 w-auto"
                width={200} 
                height={100}
            />
        </div>
    );

    // Navigation links component for reuse
    const NavigationLinks = () => (
        <div className="hidden md:flex items-center gap-4 lg:gap-10">
            <NavLink href="/">INICIO</NavLink>
            <NavLink href="/planes">PLANES</NavLink>
            <NavLink href="#galeria">GALERÍA</NavLink>
            <NavLink href="#mapas">MAPAS</NavLink>
            <button
                onClick={navigateToFormulario}
                className="bg-terpel-red text-white px-4 lg:px-6 py-1 text-sm font-normal tracking-[0.2em] transition-colors rounded-3xl"
            >
                REGISTRARME
            </button>
        
        </div>
    );

    // Mobile menu button
    const MobileMenuButton = () => (
        <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );

    return (
        <nav
            className={`
                w-full px-4 md:px-8 lg:px-20 xl:px-40 py-4 md:py-6 lg:py-8 
                flex items-center justify-between fixed top-0 left-0 z-50
                transition-all duration-300
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                ${isFormularioPage ? 'bg-terpel-red' : 
                  isThankfullPage ? '' :
                  isAtTop ? 'bg-transparent' : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'}
                ${mobileMenuOpen ? 'bg-black' : ''}
            `}
        >
            {/* Conditionally render elements based on the path */}
            {isThankfullPage ? (
                <>
                    <NavigationLinks />
                    <MobileMenuButton />
                    <Logo />
                </>
            ) : (
                <>
                    <Logo />
                    <MobileMenuButton />
                    <NavigationLinks />
                </>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/60 backdrop-blur-sm py-6 px-4 flex flex-col gap-6">
                    <NavLink href="/">INICIO</NavLink>
                    <NavLink href="/planes">PLANES</NavLink>
                    <NavLink href="#galeria">GALERÍA</NavLink>
                    <NavLink href="#mapas">MAPAS</NavLink>  
                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={navigateToFormulario}
                            className="bg-terpel-red text-white px-6 py-2 text-sm font-normal tracking-[0.2em] transition-colors rounded-3xl"
                        >
                            REGISTRARME
                        </button>
                    
                    </div>
                </div>
            )}
        </nav>
    );
}