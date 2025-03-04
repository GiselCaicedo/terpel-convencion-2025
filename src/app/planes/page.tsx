'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import Banner from '../components/sections/one-page/home/portada/Banner';

export default function Page() {
  const [activeTab, setActiveTab] = useState('info');
  const [expandedDay, setExpandedDay] = useState<string | null>('day1');


  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };
  return (
    <div className="flex flex-col items-center w-full bg-white font-terpel font-normal">
      {/* Remove overflow-hidden and adjust the positioning */}
      <div className="w-full relative">
        <Banner />
      </div>
      {/* Remove marginTop and add a negative position in the layout */}
      <div className="w-full relative" style={{ height: '50px', marginTop: '-4px' }}>
        <Image
          src="/recursos/franja_textura.png"
          alt="Franja textura"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full max-w-5xl px-4 mt-12">
        <div className="w-full text-center mb-8">
          <h1 className="text-terpel-red text-4xl font-light tracking-wider">MADRID - MARRAKECH</h1>
          <h2 className="text-terpel-red text-xl font-light mt-2">8 DÍAS</h2>

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

        <div className="w-full mb-10 text-center">
          <p className="font-light text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
            Marrakech es una ciudad que parece diseñada para el disfrute del viajero. Sus calles, plazas, edificios, jardines y monumentos parecen ideados para que cualquier persona que visite Marrakech desee volver.
          </p>
        </div>


        <div className="w-full mb-16">
          <div className="rounded-xl overflow-hidden bg-white">
            <div className="flex border-b">
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'info' ? 'text-terpel-red border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('info')}
              >
                INFORMACIÓN GENERAL
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'itinerary' ? 'text-terpel-red border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('itinerary')}
              >
                DETALLE ITINERARIO
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex-1 ${activeTab === 'requirements' ? 'text-terpel-red border-b-2 border-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('requirements')}
              >
                REQUISITOS
              </button>
            </div>

            <div className="p-6">
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
                        <span className="text-gray-600">Tiquete aéreo Bogotá- Madrid- Bogotá</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Tiquete aéreo Madrid- Marrakech- Madrid</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Dos traslados aeropuerto- hotel-aeropuerto en Madrid</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Traslado aeropuerto- hotel- aeropuerto en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">3 noches de alojamiento con desayuno en Madrid</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">3 noches de alojamiento con desayuno en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Cena de Bienvenida en el Estadio Santiago Bernabeu en Madrid</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Jornada académica en Toledo en Puy du Fou con coffee break, almuerzo y show</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">City Tour en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Visita al Zoco en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Visita a los Jardines Majorelles en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Paseo en Globo</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Almuerzo en Adouar en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Cena en el Restaurante Nouba en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Cena en el Restaurante Dar Zouccar en Marrakech</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Cena de clausura en el desierto de Agafay</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Cena Show en WAH en Madrid</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-green-500 text-lg mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600">Tarjeta de asistencia médica</span>
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
                        <span className="text-gray-600">Cena en Madrid el 08 de septiembre</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Almuerzo el día 09 de septiembre</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Almuerzo el día 12 de septiembre</span>
                      </li>
                      <li className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-red-500 text-lg mr-3 mt-0.5">✕</span>
                        <span className="text-gray-600">Gastos no especificados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="bg-white rounded-xl">
                  <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <svg className="w-6 h-6 text-terpel-red mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    ITINERARIO DEL VIAJE
                  </h3>

                  <div className="space-y-6">
                    {/* Day 1 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day1' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day1')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day1' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">1</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day1' ? 'text-red-500' : 'text-gray-800'}`}>
                              Salida desde Bogotá hacia Madrid
                            </span>
                            <span className="text-sm text-gray-500">06 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day1' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day1' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    Salida desde Bogotá hacia Madrid.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                <Image
                                  src="/itinerario/Salida_bogota.png"
                                  alt="Salida_bogota.png"
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  quality={75} // Ajusta la calidad de compresión (0-100)
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day 2 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day2' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day2')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day2' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">2</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day2' ? 'text-red-500' : 'text-gray-800'}`}>
                              Llegada a Madrid
                            </span>
                            <span className="text-sm text-gray-500">07 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day2' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day2' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    Llegada a Madrid y recepción por parte de guías.
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Alojamiento: <span className="text-red-500 font-medium">Hotel Princesa Plaza / Hotel Westin Cuzco / Hilton Canopy</span>
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Cena estadio Santiago Bernabéu
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Llegada a madrid guias.png"
                                    alt="Llegada a Madrid guias"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Hotel Princesa Plaza Madrid.png"
                                    alt="Hotel Princesa Plaza Madrid"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Hotel Westin Cuzco Madrid.png"
                                    alt="Hotel Westin Cuzco Madrid"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Hotel-Hilton-Canopy-Madrid.png"
                                    alt="Hotel Hilton Canopy Madrid"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Cena Santiago Bernabeu.png"
                                    alt="Cena Santiago Bernabeu"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day 3 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day3' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day3')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day3' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">3</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day3' ? 'text-red-500' : 'text-gray-800'}`}>
                              Jornada corporativa Toledo
                            </span>
                            <span className="text-sm text-gray-500">08 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day3' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day3' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    Desayuno en el hotel
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Jornada corporativa Toledo
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Retorno a Madrid y noche libre
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Desayuno hotel.png"
                                    alt="Desayuno hotel"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Toledo_Jornada_Corporativa.png"
                                    alt="Toledo Jornada Corporativa"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Noche libre madrid.png"
                                    alt="Noche libre Madrid"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Days 4-6 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day4' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day4')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day4' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">4-6</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day4' ? 'text-red-500' : 'text-gray-800'}`}>
                              Marrakech
                            </span>
                            <span className="text-sm text-gray-500">9-11 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day4' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day4' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                              <div className="flex items-center mb-4">
                                <h4 className="text-lg font-medium text-gray-800">Actividades</h4>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Desayuno en el hotel Madrid
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Vuelo a Marrakech
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Alojamiento: <span className="text-red-500 font-medium">Savoy Le Grand Hotel / Marriott Le Meridien N&apos;FIS / Jaal Riad Resort</span>
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Excursión Marrakech
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Visita a los jardínes de Majorelle
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Vuelo en globo
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Visita Zocos y compras
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Cena de premiación desierto de Agafay
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Restaurantes: <span className="text-red-500 font-medium">Adouar / Nouba / Palais Dar Soukkar</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Desayuno hotel.png" alt="Desayuno hotel" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Zocos.png" alt="Zocos" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Hotel Savoy Marrakech.png" alt="Hotel Savoy Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Hotel Marriot Le Meridien Marrakech.png" alt="Hotel Marriot Le Meridien Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Hotel-Jaal-Riad-Marrakech.png" alt="Hotel Jaal Riad Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Excursion Marrakech.png" alt="Excursion Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Jardines-de-Majorelle.png" alt="Jardines de Majorelle" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Globo Marrakech.png" alt="Globo Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Marrakech.png" alt="Marrakech" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Desierto de Agafay.png" alt="Desierto de Agafay" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Restaurante Adouar.png" alt="Restaurante Adouar" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Restaurante Nouba.png" alt="Restaurante Nouba" fill style={{ objectFit: 'cover' }} />
                                </div>

                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Restaurante-Palais-Dar-Soukkar.png" alt="Restaurante Palais Dar Soukkar" fill style={{ objectFit: 'cover' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day 7 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day7' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day7')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day7' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">7</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day7' ? 'text-red-500' : 'text-gray-800'}`}>
                              Regreso a Madrid
                            </span>
                            <span className="text-sm text-gray-500">12 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day7' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day7' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    Desayuno en el Hotel Marrakech
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Vuelo hacia Madrid
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Llegada al hotel: <span className="text-red-500 font-medium">Hotel Meliá Castilla / Hotel Hilton Canopy</span>
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Almuerzo libre
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Show Wah
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Desayuno hotel.png" alt="Desayuno hotel" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Vuelo hacia madrid.png" alt="Vuelo hacia Madrid" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Hotel-Melia-Castilla-Madrid.png" alt="Hotel Meliá Castilla Madrid" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Hotel-Hilton-Canopy-Madrid.png" alt="Hotel Hilton Canopy Madrid" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Almuerzo libre.png" alt="Almuerzo libre" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image src="/galeria/Wah Show Madrid.png" alt="Wah Show Madrid" fill style={{ objectFit: 'cover' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day 8 */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200">
                      <button
                        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${expandedDay === 'day8' ? 'bg-gradient-to-r from-red-50 to-white' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleDay('day8')}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-300 ${expandedDay === 'day8' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <span className="text-lg font-bold">8</span>
                          </div>
                          <div>
                            <span className={`font-semibold text-lg block ${expandedDay === 'day8' ? 'text-red-500' : 'text-gray-800'}`}>
                              Regreso a Bogotá
                            </span>
                            <span className="text-sm text-gray-500">13 de septiembre</span>
                          </div>
                        </div>
                        <span className={`transition-transform duration-300 ${expandedDay === 'day8' ? 'text-red-500 transform rotate-180' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {expandedDay === 'day8' && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    Desayuno en el hotel Madrid
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-700">
                                    Salida desde Madrid hacia Bogotá
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Desayuno hotel.png"
                                    alt="Desayuno hotel"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className="rounded-lg shadow-sm w-full h-32 relative overflow-hidden">
                                  <Image
                                    src="/galeria/Salida_Madrid.png"
                                    alt="Salida Madrid"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div>
                  <h3 className="text-gray-800 font-medium mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    REQUISITOS - DOCUMENTACIÓN
                  </h3>

                  <div className="mb-8">
                    <h4 className="text-gray-800 font-medium mb-4 pb-2 border-b border-gray-100 text-lg">
                      REQUISITOS PARA SALIR DEL PAÍS
                    </h4>
                    <ul className="space-y-4">
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Pasaporte:
                        </p>
                        <p className="text-gray-600 ml-9">Es el documento que identifica a los colombianos en el exterior y debe tener un mínimo de vigencia de 6 meses posterior a la fecha de viaje.</p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Voucher de alojamiento.
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Tiquete de salida y regreso al país.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-gray-800 font-medium mb-4 pb-2 border-b border-gray-100 text-lg">
                      REQUISITOS INGRESAR A ESPAÑA Y MARRUECOS
                    </h4>
                    <ul className="space-y-4">
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Pasaporte electrónico o de lectura mecánica con vigencia mínima de 6 meses a partir de la fecha de ingreso.
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Tiquete aéreo de ida y regreso.
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Seguro médico de viaje internacional (Lo entrega la agencia).
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Acreditar solvencia económica que le permita viajar y financiar estadía (Dinero en efectivo, tarjeta de crédito).
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Voucher de alojamiento (Lo entrega la agencia).
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Actualmente no hay vacunas obligatorias.
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">✓</span>
                          Lo anterior está sujeto a requisitos adicionales por parte de las entidades gubernamentales.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-gray-800 font-medium mb-4 pb-2 border-b border-gray-100 text-lg">
                      OTROS REQUISITOS - TERPEL
                    </h4>
                    <ul className="space-y-4">
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">1</span>
                          Documento de identificación
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">2</span>
                          Carta de invitación Terpel
                        </p>
                      </li>
                      <li className="p-4 bg-white shadow-sm rounded-lg hover:bg-red-50 transition-all">
                        <p className="font-medium text-gray-800 flex items-center">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-terpel-red mr-3 text-xs">3</span>
                          Firmar carta de aceptación de Terpel
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}