'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';

// Define a type for our map markers
type PointOfInterest = {
  id: string;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  category: 'beach' | 'diving' | 'history' | 'food' | 'activity';
};

// Create custom marker icons
const createCustomIcon = (category: string) => {
  const iconUrl = `/markers/${category}.svg`;
  
  return new Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Sample data for points of interest (in a real app, this would come from Supabase)
const samplePoints: PointOfInterest[] = [
  {
    id: '1',
    name: 'Tabarka Beach',
    description: 'Main beach with crystal clear waters and golden sand.',
    position: [36.9553, 8.7580],
    category: 'beach',
  },
  {
    id: '2',
    name: 'Coral Reef Diving Spot',
    description: 'Popular diving location with vibrant marine life.',
    position: [36.9600, 8.7530],
    category: 'diving',
  },
  {
    id: '3',
    name: 'Genoese Fort',
    description: 'Historic fortress built in the 16th century.',
    position: [36.9570, 8.7610],
    category: 'history',
  },
  {
    id: '4',
    name: 'Les Aiguilles Restaurant',
    description: 'Local seafood restaurant with stunning views.',
    position: [36.9540, 8.7550],
    category: 'food',
  },
  {
    id: '5',
    name: 'Tabarka Jazz Festival Venue',
    description: 'Location of the famous annual jazz festival.',
    position: [36.9560, 8.7590],
    category: 'activity',
  },
];

// Filter options for the map
const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'beach', label: 'Beaches' },
  { value: 'diving', label: 'Diving Spots' },
  { value: 'history', label: 'Historical Sites' },
  { value: 'food', label: 'Restaurants' },
  { value: 'activity', label: 'Activities' },
];

const MapComponent = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredPoints, setFilteredPoints] = useState<PointOfInterest[]>(samplePoints);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  // Dynamic import for marker icons to prevent SSR issues
  useEffect(() => {
    import('leaflet').then((L) => {
      // Fix default marker icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/markers/default.svg',
        iconUrl: '/markers/default.svg',
        shadowUrl: '',
      });
    });
  }, []);

  // Filter points of interest based on selected category
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPoints(samplePoints);
    } else {
      const filtered = samplePoints.filter(point => point.category === activeFilter);
      setFilteredPoints(filtered);
    }
  }, [activeFilter]);

  // Function to center map on a point
  const focusPoint = (id: string, position: [number, number]) => {
    setSelectedPoint(id);
    if (mapRef.current) {
      mapRef.current.flyTo(position, 15, {
        duration: 1.5,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[600px] w-full relative rounded-xl overflow-hidden shadow-lg"
    >
      {/* Filter Controls */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
        <div className="bg-white rounded-full shadow-md p-1 flex space-x-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === option.value
                  ? 'bg-tabarka-blue-600 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[36.9550, 8.7600]} // Center on Tabarka
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredPoints.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            icon={createCustomIcon(point.category)}
            eventHandlers={{
              click: () => {
                setSelectedPoint(point.id);
              },
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-lg">{point.name}</h3>
                <p className="text-gray-600">{point.description}</p>
                <button
                  className="mt-2 text-tabarka-blue-600 text-sm font-medium hover:underline"
                  onClick={() => {
                    // In a real app, this would navigate to a detailed page
                    console.log(`View details for ${point.name}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Points List - Mobile Friendly Alternative */}
      <div className="absolute bottom-4 left-4 right-4 z-10 lg:left-auto lg:w-64 bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto">
        <div className="p-3">
          <h3 className="font-bold text-gray-900 mb-2">Points of Interest</h3>
          <ul className="space-y-2">
            {filteredPoints.map((point) => (
              <li 
                key={point.id}
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  selectedPoint === point.id 
                    ? 'bg-tabarka-blue-100' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => focusPoint(point.id, point.position)}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    point.category === 'beach' ? 'bg-yellow-500' :
                    point.category === 'diving' ? 'bg-blue-500' :
                    point.category === 'history' ? 'bg-amber-700' :
                    point.category === 'food' ? 'bg-red-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-medium">{point.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MapComponent; 