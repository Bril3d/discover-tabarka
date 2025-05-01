'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon, Map as LeafletMap } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define a type for our map markers
type PointOfInterest = {
  id: string;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  category: 'beach' | 'diving' | 'history' | 'food' | 'activity';
  image?: string;
};

// Helper components for map functionality
const MapController = ({ 
  poi, 
  selectedId 
}: { 
  poi: PointOfInterest | null; 
  selectedId: string | null;
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (poi && selectedId) {
      map.flyTo(poi.position, 16, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [map, poi, selectedId]);
  
  return null;
};

// Create custom marker icons with SVG for better customization
const createCustomIcon = (category: string): Icon | DivIcon => {
  // Define colors for each category
  const colorMap = {
    beach: '#f59e0b', // amber-500
    diving: '#0ea5e9', // sky-500
    history: '#b45309', // amber-700
    food: '#ef4444', // red-500
    activity: '#8b5cf6', // violet-500
  };
  
  // Use type assertion to access the color
  const color = colorMap[category as keyof typeof colorMap] || '#6b7280';
  
  // Create a div icon for more styling flexibility
  return new DivIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        background-color: white;
        border: 2px solid ${color};
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
          <path d="M12 2C7.58 2 4 5.58 4 10c0 4.84 7.44 11.32 7.76 11.63a.3.3 0 0 0 .48 0C12.56 21.32 20 14.84 20 10c0-4.42-3.58-8-8-8Z" fill="${color}"/>
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

// Sample data for points of interest (in a real app, this would come from Supabase)
const samplePoints: PointOfInterest[] = [
  {
    id: '1',
    name: 'Tabarka Beach',
    description: 'Main beach with crystal clear waters and golden sand.',
    position: [36.9553, 8.7580],
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
  },
  {
    id: '2',
    name: 'Coral Reef Diving Spot',
    description: 'Popular diving location with vibrant marine life.',
    position: [36.9600, 8.7530],
    category: 'diving',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b'
  },
  {
    id: '3',
    name: 'Genoese Fort',
    description: 'Historic fortress built in the 16th century with stunning views of the Mediterranean.',
    position: [36.9570, 8.7610],
    category: 'history',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235'
  },
  {
    id: '4',
    name: 'Les Aiguilles Restaurant',
    description: 'Local seafood restaurant with stunning views and fresh Mediterranean cuisine.',
    position: [36.9540, 8.7550],
    category: 'food',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d'
  },
  {
    id: '5',
    name: 'Tabarka Jazz Festival Venue',
    description: 'Location of the famous annual jazz festival, a cultural highlight of the region.',
    position: [36.9560, 8.7590],
    category: 'activity',
    image: 'https://images.unsplash.com/photo-1529307474719-3d0a417aaf8a'
  },
  {
    id: '6',
    name: 'Needles Rock Formation',
    description: 'Iconic red sandstone cliffs and needle-like rock formations that jut out into the sea.',
    position: [36.9530, 8.7450],
    category: 'activity',
    image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43'
  },
  {
    id: '7',
    name: 'Roman Ruins of Bulla Regia',
    description: 'Ancient Roman city with well-preserved underground villas and mosaics.',
    position: [36.9590, 8.7650],
    category: 'history',
    image: 'https://images.unsplash.com/photo-1552320855-371b29f33dad'
  }
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
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  const [showList, setShowList] = useState<boolean>(true);
  
  // Filter points of interest based on selected category
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPoints(samplePoints);
    } else {
      const filtered = samplePoints.filter(point => point.category === activeFilter);
      setFilteredPoints(filtered);
    }
    
    // Reset selection when filter changes
    setSelectedPoint(null);
    setSelectedPOI(null);
  }, [activeFilter]);
  
  // Update selectedPOI when selectedPoint changes
  useEffect(() => {
    if (selectedPoint) {
      const poi = filteredPoints.find(p => p.id === selectedPoint) || null;
      setSelectedPOI(poi);
    } else {
      setSelectedPOI(null);
    }
  }, [selectedPoint, filteredPoints]);
  
  // Function to center map on a point
  const focusPoint = (id: string) => {
    setSelectedPoint(id);
  };
  
  // Theme-based styling for category badges
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'beach':
        return 'bg-amber-500 text-white';
      case 'diving':
        return 'bg-sky-500 text-white';
      case 'history':
        return 'bg-amber-700 text-white';
      case 'food':
        return 'bg-red-500 text-white';
      case 'activity':
        return 'bg-violet-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[700px] w-full relative rounded-xl overflow-hidden shadow-lg bg-gray-50"
    >
      {/* Filter Controls */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-1 flex flex-wrap justify-center gap-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === option.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-transparent text-foreground hover:bg-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Toggle List View Button (Mobile) */}
      <div className="absolute top-4 right-4 z-10 sm:hidden">
        <button
          onClick={() => setShowList(!showList)}
          className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
          aria-label={showList ? "Hide list" : "Show list"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            {showList ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[36.9550, 8.7600]} // Center on Tabarka
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // We'll add custom zoom controls later
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map Controller for programmatic map manipulation */}
        <MapController poi={selectedPOI} selectedId={selectedPoint} />
        
        {/* Animated Markers */}
        {filteredPoints.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: selectedPoint === point.id ? [0, -10, 0] : 0 
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              y: { repeat: selectedPoint === point.id ? Infinity : 0, duration: 1.5 }
            }}
          >
            <Marker
              position={point.position}
              icon={createCustomIcon(point.category)}
              eventHandlers={{
                click: () => {
                  focusPoint(point.id);
                },
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  {point.image && (
                    <div className="relative h-32 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src={point.image}
                        alt={point.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(point.category)}`}>
                          {point.category.charAt(0).toUpperCase() + point.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-foreground">{point.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{point.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      onClick={() => {
                        // In a real app, this would navigate to a detailed page
                        console.log(`View details for ${point.name}`);
                      }}
                    >
                      View Details
                    </button>
                    
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </motion.div>
        ))}
      </MapContainer>

      {/* Points List - Mobile Friendly Alternative */}
      <AnimatePresence>
        {(showList || window.innerWidth >= 640) && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-4 right-4 z-10 w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto sm:bottom-auto sm:top-20"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-foreground">Points of Interest</h3>
                <span className="text-xs text-muted-foreground">
                  {filteredPoints.length} location{filteredPoints.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <motion.ul 
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {filteredPoints.map((point) => (
                  <motion.li 
                    key={point.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${
                      selectedPoint === point.id 
                        ? 'bg-primary/10 border-l-4 border-primary' 
                        : 'hover:bg-muted border-l-4 border-transparent'
                    }`}
                    onClick={() => focusPoint(point.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        point.category === 'beach' ? 'bg-amber-500' :
                        point.category === 'diving' ? 'bg-sky-500' :
                        point.category === 'history' ? 'bg-amber-700' :
                        point.category === 'food' ? 'bg-red-500' :
                        'bg-violet-500'
                      }`}></div>
                      <span className="text-sm font-medium text-foreground">{point.name}</span>
                    </div>
                    {selectedPoint === point.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-muted-foreground mt-2 pl-6"
                      >
                        {point.description.slice(0, 60)}...
                      </motion.p>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
              
              {filteredPoints.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <p>No locations found. Try another filter.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom zoom controls */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col space-y-2">
        <button
          onClick={() => {
            const map = document.querySelector('.leaflet-container')?._leafletObject as LeafletMap;
            if (map) map.zoomIn();
          }}
          className="bg-white dark:bg-gray-800 w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => {
            const map = document.querySelector('.leaflet-container')?._leafletObject as LeafletMap;
            if (map) map.zoomOut();
          }}
          className="bg-white dark:bg-gray-800 w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default MapComponent; 