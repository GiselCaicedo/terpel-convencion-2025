'use client'

import React, { useState, useEffect, JSX  } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Wind,
  Droplets,
  Wind as WindIcon
} from 'lucide-react';
import { getCitiesWeather } from '@/app/service/weatherService';

interface WeatherState {
  madrid: {
    temperature: number;
    condition: string;
    conditionCode: number;
    humidity: number;
    windSpeed: number;
  } | null;
  marrakech: {
    temperature: number;
    condition: string;
    conditionCode: number;
    humidity: number;
    windSpeed: number;
  } | null;
}

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherState>({
    madrid: null,
    marrakech: null
  });

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('lluvia') || conditionLower.includes('chubasco')) {
      return <CloudRain className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-blue-500" />;
    }
    if (conditionLower.includes('nieve') || conditionLower.includes('granizo')) {
      return <CloudSnow className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-gray-400" />;
    }
    if (conditionLower.includes('trueno') || conditionLower.includes('tormenta')) {
      return <CloudLightning className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-yellow-500" />;
    }
    if (conditionLower.includes('niebla') || conditionLower.includes('neblina')) {
      return <CloudFog className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-gray-400" />;
    }
    if (conditionLower.includes('llovizna')) {
      return <CloudDrizzle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-blue-400" />;
    }
    if (conditionLower.includes('nublado')) {
      return <Cloud className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-gray-500" />;
    }
    if (conditionLower.includes('ventisca')) {
      return <Wind className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-gray-500" />;
    }
    return <Sun className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-yellow-500" />;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getCitiesWeather();
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const WeatherCard = ({ city, data, defaultIcon }: { 
    city: string, 
    data: typeof weather.madrid | typeof weather.marrakech,
    defaultIcon: JSX.Element 
  }) => (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 group">
      <div className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-bold text-center">{city}</div>
      
      <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-4 sm:gap-8">
        <div className="flex flex-col items-center transform group-hover:scale-105 transition-transform duration-300">
          <div>
            {data ? getWeatherIcon(data.condition) : defaultIcon}
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-red-500 font-bold mt-2 sm:mt-4">
            {data ? `${data.temperature}°C` : 'Cargando...'}
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full sm:w-auto items-center sm:items-start">
          <div className="text-gray-800 text-xl sm:text-2xl font-medium text-center sm:text-left">
            {data?.condition || 'Cargando...'}
          </div>
          
          <div className="flex flex-col gap-2 sm:gap-4 w-full items-center sm:items-start">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-base sm:text-lg">
              <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              <span className="font-medium">Humedad:</span> 
              <span>{data?.humidity || '--'}%</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-base sm:text-lg">
              <WindIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              <span className="font-medium">Vientos:</span> 
              <span>{data?.windSpeed || '--'} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/recursos/back_blue.png)' }}
      />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-red-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-300">
            CLIMA ACTUAL
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <WeatherCard 
            city="Madrid" 
            data={weather.madrid}
            defaultIcon={<Cloud className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-gray-400 animate-pulse" />}
          />
          <WeatherCard 
            city="Marrakech" 
            data={weather.marrakech}
            defaultIcon={<Sun className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-yellow-400 animate-pulse" />}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;