'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [expandedDay, setExpandedDay] = useState<string | null>('day1');

  const images = [
    "/recursos/planes.jpg",
    "/recursos/imagen_ejemplo.jpg",
    "/recursos/planes.jpg"
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Increased to 5 seconds for better user experience

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="flex flex-col items-center w-full bg-white font-sans">
      {/* Hero Carousel with enhanced transitions */}
      <div className="w-full relative overflow-hidden shadow-xl rounded-b-lg" style={{ height: "650px" }}>
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 z-10"></div>

        {images.map((src, index) => (
          <div
            key={index}
            className="absolute w-full h-full transition-all duration-1000 ease-in-out"
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              opacity: index === currentSlide ? 1 : 0
            }}
          >
            <Image
              src={src}
              alt={`Marrakech slide ${index + 1}`}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-center p-8 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-36 left-0 right-0 flex justify-center gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/60 hover:bg-white'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-5xl px-4 mt-12">
        {/* Enhanced Title Section */}
        <div className="w-full text-center mb-8">
          <h1 className="text-red-600 text-4xl font-light tracking-wider">MADRID - MARRAKECH</h1>
          <h2 className="text-red-600 text-xl font-light mt-2">8 DÍAS</h2>

          {/* Decorative element */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-16 bg-red-300"></div>
            <div className="mx-4">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM10 15a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
            </div>
            <div className="h-px w-16 bg-red-300"></div>
          </div>
        </div>

        {/* Enhanced Description Text */}
        <div className="w-full mb-10 text-center">
          <p className="font-light text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
            Marrakech es una ciudad que parece diseñada para el disfrute del viajero. Sus calles, plazas, edificios, jardines y monumentos parecen ideados para que cualquier persona que visite Marrakech desee volver.
          </p>
        </div>


        {/* Package Information Tabs with Enhanced Design */}
        <div className="w-full mb-16">
          <div className="rounded-xl overflow-hidden bg-white">
            {/* Enhanced Tab Navigation */}
            <div className="flex border-b">
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'info' ? 'text-red-600 border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('info')}
              >
                INFORMACIÓN GENERAL
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'itinerary' ? 'text-red-600 border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('itinerary')}
              >
                DETALLE ITINERARIO
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'requirements' ? 'text-red-600 border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('requirements')}
              >
                REQUISITOS
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* INFORMACIÓN GENERAL TAB - Enhanced but keeping structure */}
              {activeTab === 'info' && (
                <div>
                  <div className="mb-10">
                    <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      PAQUETE INCLUYE
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Traslados de llegada y salida del aeropuerto principal.</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Alojamiento 3 noches y 4 días</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Desayunos</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Tour Hop on Hop off, válido para 1 día en Marrakech.</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">El Tour Hop on Hop off; el bus se toma en la terminal desde la que salen para comenzar la visita.</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Asistencia médica; usd 60.00€ para mayores de 70 años pagan suplemento</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      PAQUETE NO INCLUYE
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Los vuelos internos</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Alimentación no especificada en el programa</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Gastos personales</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Propinas</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Servicios no descritos en el programa</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* DETALLE ITINERARIO TAB - Enhanced and Redesigned */}
              {activeTab === 'itinerary' && (
                <div className="bg-white rounded-xl">
                  <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    ITINERARIO DEL VIAJE
                  </h3>

                  <div className="space-y-6">
                    {/* Day 1 - Redesigned Accordion */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day1' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'
                          }`}
                        onClick={() => toggleDay('day1')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day1' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}>
                            <span className="text-lg font-bold">1</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day1' ? 'text-red-600' : 'text-gray-800'
                              }`}>
                              Llegada a Marrakech
                            </span>
                            <span className="text-sm text-gray-500">Aeropuerto. Traslado a hotel</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day1' ? 'text-red-500 transform rotate-180' : 'text-gray-400'
                          }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day1' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Columna izquierda - Actividades */}
                            <div>
                              <div className="flex items-center mb-4">
                                <h4 className="text-lg font-medium text-gray-800">Actividades del día</h4>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Llegada y asistencia por nuestro representante en el aeropuerto de Mohamed V en <a href="#" className="text-red-500 font-medium">Casablanca</a>.
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Luego traslado a Rabat y hacer el registro en el hotel.
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Alojamiento en <a href="#" className="text-red-500 font-medium">Rabat</a>.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Columna derecha - Alojamiento */}
                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <Image
                                  src="/recursos/hotel1.jpg"
                                  alt="Hotel room"
                                  className="rounded-lg shadow-sm w-full h-32 object-cover"
                                  width={300}
                                  height={200}
                                />
                                <Image
                                  src="/recursos/hotel2.jpg"
                                  alt="Hotel bathroom"
                                  className="rounded-lg shadow-sm w-full h-32 object-cover"
                                  width={300}
                                  height={200}
                                />
                                <Image
                                  src="/recursos/hotel3.jpg"
                                  alt="Hotel restaurant"
                                  className="rounded-lg shadow-sm w-full h-32 object-cover"
                                  width={300}
                                  height={200}
                                />
                                <Image
                                  src="/recursos/hotel4.png"
                                  alt="Hotel food"
                                  className="rounded-lg shadow-sm w-full h-32 object-cover"
                                  width={300}
                                  height={200}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day 2 - Redesigned Accordion */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day2' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'
                          }`}
                        onClick={() => toggleDay('day2')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day2' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}>
                            <span className="text-lg font-bold">2</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day2' ? 'text-red-600' : 'text-gray-800'
                              }`}>
                              Tour en Marrakech
                            </span>
                            <span className="text-sm text-gray-500">Visita guiada por la ciudad</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day2' ? 'text-red-500 transform rotate-180' : 'text-gray-400'
                          }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day2' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <p className="text-gray-600">Información detallada del tour en Marrakech.</p>
                        </div>
                      )}
                    </div>

                    {/* Day 3 - Redesigned Accordion */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day3' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'
                          }`}
                        onClick={() => toggleDay('day3')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day3' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}>
                            <span className="text-lg font-bold">3</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day3' ? 'text-red-600' : 'text-gray-800'
                              }`}>
                              Ifrane - Beni Mellal - Marrakech
                            </span>
                            <span className="text-sm text-gray-500">Recorrido por las ciudades</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day3' ? 'text-red-500 transform rotate-180' : 'text-gray-400'
                          }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day3' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <p className="text-gray-600">Información detallada del viaje de Ifrane a Marrakech.</p>
                        </div>
                      )}
                    </div>

                    {/* Day 4 - Redesigned Accordion */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day4' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'
                          }`}
                        onClick={() => toggleDay('day4')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day4' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}>
                            <span className="text-lg font-bold">4</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day4' ? 'text-red-600' : 'text-gray-800'
                              }`}>
                              Check out hotel y regreso
                            </span>
                            <span className="text-sm text-gray-500">Fin del viaje</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day4' ? 'text-red-500 transform rotate-180' : 'text-gray-400'
                          }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day4' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <p className="text-gray-600">Información detallada sobre el check-out y regreso.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* REQUISITOS TAB - Enhanced */}
              {activeTab === 'requirements' && (
                <div>
                  <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    REQUISITOS - DOCUMENTACIÓN
                  </h3>

                  <ul className="space-y-4">
                    <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                      <p className="font-medium text-gray-800 flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 text-xs">1</span>
                        Pasaporte:
                      </p>
                      <p className="text-gray-600 ml-9">Vigente durante al menos 3 meses después de la fecha prevista de salida del Espacio Schengen.</p>
                    </li>

                    <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                      <p className="font-medium text-gray-800 flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 text-xs">2</span>
                        Seguro de viaje:
                      </p>
                      <p className="text-gray-600 ml-9">Cobertura mínima de 30.000 euros para emergencias médicas, hospitalización y repatriación.</p>
                    </li>

                    <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                      <p className="font-medium text-gray-800 flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 text-xs">3</span>
                        Documento de identificación
                      </p>
                    </li>

                    <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                      <p className="font-medium text-gray-800 flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 text-xs">4</span>
                        Carta de invitación Terpel
                      </p>
                    </li>

                    <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                      <p className="font-medium text-gray-800 flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 text-xs">5</span>
                        Firmar carta de aceptación de Terpel
                      </p>
                    </li>
                  </ul>


                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}