// weatherService.ts

interface WeatherData {
    location: {
      name: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        code: number;
      };
      humidity: number;
      wind_kph: number;
    };
  }
  
  interface ProcessedWeatherData {
    city: string;
    temperature: number;
    condition: string;
    conditionCode: number;
    humidity: number;
    windSpeed: number;
  }
  
  const API_KEY = 'fab3ca1e526b447ab36222243252302';
  const BASE_URL = 'https://api.weatherapi.com/v1';
  
  // Mapeo de condiciones en inglés a español
  const weatherConditions: { [key: string]: string } = {
    'Sunny': 'Soleado',
    'Clear': 'Despejado',
    'Partly cloudy': 'Parcialmente nublado',
    'Cloudy': 'Nublado',
    'Overcast': 'Muy nublado',
    'Mist': 'Neblina',
    'Patchy rain possible': 'Posible lluvia dispersa',
    'Patchy snow possible': 'Posible nieve dispersa',
    'Patchy sleet possible': 'Posible aguanieve dispersa',
    'Patchy freezing drizzle possible': 'Posible llovizna helada dispersa',
    'Thundery outbreaks possible': 'Posibles tormentas',
    'Blowing snow': 'Ventisca',
    'Blizzard': 'Tormenta de nieve',
    'Fog': 'Niebla',
    'Freezing fog': 'Niebla helada',
    'Patchy light drizzle': 'Llovizna ligera dispersa',
    'Light drizzle': 'Llovizna ligera',
    'Freezing drizzle': 'Llovizna helada',
    'Heavy freezing drizzle': 'Llovizna helada intensa',
    'Patchy light rain': 'Lluvia ligera dispersa',
    'Light rain': 'Lluvia ligera',
    'Moderate rain at times': 'Lluvia moderada por momentos',
    'Moderate rain': 'Lluvia moderada',
    'Heavy rain at times': 'Lluvia intensa por momentos',
    'Heavy rain': 'Lluvia intensa',
    'Light freezing rain': 'Lluvia helada ligera',
    'Moderate or heavy freezing rain': 'Lluvia helada moderada a intensa',
    'Light sleet': 'Aguanieve ligera',
    'Moderate or heavy sleet': 'Aguanieve moderada a intensa',
    'Patchy light snow': 'Nieve ligera dispersa',
    'Light snow': 'Nieve ligera',
    'Patchy moderate snow': 'Nieve moderada dispersa',
    'Moderate snow': 'Nieve moderada',
    'Patchy heavy snow': 'Nieve intensa dispersa',
    'Heavy snow': 'Nieve intensa',
    'Ice pellets': 'Granizo',
    'Light rain shower': 'Chubasco ligero',
    'Moderate or heavy rain shower': 'Chubasco moderado a intenso',
    'Torrential rain shower': 'Chubasco torrencial',
    'Light sleet showers': 'Chubascos de aguanieve ligeros',
    'Moderate or heavy sleet showers': 'Chubascos de aguanieve moderados a intensos',
    'Light snow showers': 'Chubascos de nieve ligeros',
    'Moderate or heavy snow showers': 'Chubascos de nieve moderados a intensos',
    'Light showers of ice pellets': 'Chubascos ligeros de granizo',
    'Moderate or heavy showers of ice pellets': 'Chubascos moderados a intensos de granizo',
    'Patchy light rain with thunder': 'Lluvia ligera dispersa con truenos',
    'Moderate or heavy rain with thunder': 'Lluvia moderada a intensa con truenos',
    'Patchy light snow with thunder': 'Nieve ligera dispersa con truenos',
    'Moderate or heavy snow with thunder': 'Nieve moderada a intensa con truenos'
  };
  
  export async function getWeatherData(city: string): Promise<ProcessedWeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
      );
  
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
  
      const data: WeatherData = await response.json();
      
      return {
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: weatherConditions[data.current.condition.text] || data.current.condition.text,
        conditionCode: data.current.condition.code,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
      };
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
      throw error;
    }
  }
  
  export async function getCitiesWeather(): Promise<{
    madrid: ProcessedWeatherData;
    marrakech: ProcessedWeatherData;
  }> {
    try {
      const [madridWeather, marrakechWeather] = await Promise.all([
        getWeatherData('Madrid'),
        getWeatherData('Marrakech')
      ]);
  
      return {
        madrid: madridWeather,
        marrakech: marrakechWeather
      };
    } catch (error) {
      console.error('Error fetching cities weather:', error);
      throw error;
    }
  }