import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface LocationProps {
  position: [number, number];
  zoom: number;
  city: string;
  country: string;
  address: string;
}

interface MapComponentProps {
  location: LocationProps;
}

// Crear un ícono personalizado más moderno
const icon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="
      background-color: #ef4444;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const MapComponent = ({ location }: MapComponentProps) => {
  return (
    <MapContainer
      center={location.position}
      zoom={location.zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      />
      <ZoomControl position="bottomright" />
      <Marker position={location.position} icon={icon}>
        <Popup>
          <div className="text-sm font-medium">{location.city}, {location.country}</div>
          <div className="text-xs text-gray-500 mt-1">{location.address}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;