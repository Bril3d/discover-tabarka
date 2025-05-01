'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon } from 'leaflet';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the props interface
interface LocationMapProps {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
}

// Map Center Controller Component
const CenterMapView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  
  return null;
};

// Create custom marker icon
const createMarkerIcon = (): Icon | DivIcon => {
  // Create a div icon with a pin style
  return new DivIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        background-color: white;
        border: 2px solid #0ea5e9;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transform-origin: center bottom;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.58 2 4 5.58 4 10c0 4.84 7.44 11.32 7.76 11.63a.3.3 0 0 0 .48 0C12.56 21.32 20 14.84 20 10c0-4.42-3.58-8-8-8Z" fill="#0ea5e9"/>
          <circle cx="12" cy="10" r="3" fill="white"/>
        </svg>
      </div>
      <div style="
        width: 32px;
        height: 8px;
        position: absolute;
        bottom: -8px;
        left: 0;
        background: radial-gradient(ellipse at top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
        transform-origin: center top;
      "></div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42]
  });
};

const LocationMap = ({ name, latitude, longitude, description, image }: LocationMapProps) => {
  // Fix issue with Leaflet markers in Next.js
  useEffect(() => {
    // Fix leaflet marker icon issue with webpack
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
    });
  }, []);

  const position: [number, number] = [latitude, longitude];
  const markerIcon = createMarkerIcon();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full rounded-xl overflow-hidden"
    >
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CenterMapView center={position} />
        <Marker position={position} icon={markerIcon}>
          <Popup minWidth={200} maxWidth={300}>
            <div className="p-1">
              {image && (
                <div className="relative w-full h-24 mb-2 overflow-hidden rounded">
                  <Image 
                    src={image} 
                    alt={name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              <h3 className="font-bold text-base">{name}</h3>
              {description && <p className="text-sm mt-1">{description}</p>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default LocationMap; 