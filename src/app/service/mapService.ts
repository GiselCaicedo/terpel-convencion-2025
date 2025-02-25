// MapService.ts
export interface Location {
    city: string;
    country: string;
    position: {
      lat: number;
      lng: number;
    };
    zoom: number;
  }
  
  export const getLocations = (): Location[] => {
    return [
      {
        city: "Madrid",
        country: "España",
        position: {
          lat: 40.4167754,
          lng: -3.7037902
        },
        zoom: 15
      },
      {
        city: "Marrakech",
        country: "Marruecos",
        position: {
          lat: 31.6295,
          lng: -7.9811
        },
        zoom: 15
      }
    ];
  };
  
  export const getMapOptions = () => {
    return {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    };
  };