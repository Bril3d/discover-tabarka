'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with no SSR to avoid hydration issues
const MapComponent = dynamic(() => import('@/components/features/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="animate-pulse text-gray-500">Loading Map...</div>
    </div>
  )
});

// Mock data - would be fetched from Supabase in production
const locations = [
  {
    id: '1',
    name: 'Coral Bay',
    description: 'Experience some of the most vibrant coral reefs in the Mediterranean. Perfect for diving and snorkeling enthusiasts.',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
    category: 'diving',
    rating: 4.8,
    latitude: 36.964,
    longitude: 8.758
  },
  {
    id: '2',
    name: 'Needles Rock Formation',
    description: 'Iconic red sandstone cliffs and needle-like rock formations that jut out dramatically into the sea.',
    image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    category: 'landscapes',
    rating: 4.9,
    latitude: 36.968,
    longitude: 8.746
  },
  {
    id: '3',
    name: 'Tabarka Beach',
    description: 'A pristine stretch of golden sand with crystal clear waters. Ideal for swimming and sunbathing.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'beaches',
    rating: 4.7,
    latitude: 36.955,
    longitude: 8.761
  },
  {
    id: '4',
    name: 'Roman Ruins of Bulla Regia',
    description: 'Explore the ancient Roman underground villas with well-preserved mosaics dating back to the 2nd century.',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    category: 'historical',
    rating: 4.6,
    latitude: 36.561,
    longitude: 8.755
  },
  {
    id: '5',
    name: 'Feija National Park',
    description: 'Lush forests, diverse wildlife, and scenic hiking trails in the nearby Kroumirie Mountains.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    category: 'nature',
    rating: 4.5,
    latitude: 36.500,
    longitude: 8.600
  },
  {
    id: '6',
    name: 'Fort Tabarka',
    description: 'Historical Genoese fort offering panoramic views of the harbor and city. Great for history enthusiasts.',
    image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
    category: 'historical',
    rating: 4.4,
    latitude: 36.960,
    longitude: 8.758
  },
  {
    id: '7',
    name: 'Tabarka Marina',
    description: 'Picturesque marina with restaurants serving fresh seafood and stunning views of fishing boats.',
    image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
    category: 'food',
    rating: 4.3,
    latitude: 36.958,
    longitude: 8.763
  },
  {
    id: '8',
    name: 'Jazz Festival Venue',
    description: 'The location of the famous Tabarka Jazz Festival, hosting world-class musicians every summer.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    category: 'entertainment',
    rating: 4.7,
    latitude: 36.965,
    longitude: 8.755
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Locations', icon: '🌍' },
  { id: 'beaches', name: 'Beaches', icon: '🏖️' },
  { id: 'diving', name: 'Diving Spots', icon: '🤿' },
  { id: 'historical', name: 'Historical Sites', icon: '🏛️' },
  { id: 'food', name: 'Restaurants', icon: '🍽️' },
  { id: 'nature', name: 'Nature', icon: '🌳' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
  { id: 'landscapes', name: 'Landscapes', icon: '🏞️' }
];

export default function LocationsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Get initial category from URL if present
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.some(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Filter locations based on category and search query
  useEffect(() => {
    let filtered = locations;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(location => location.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        location => 
          location.name.toLowerCase().includes(query) || 
          location.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredLocations(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Explore <span className="text-tabarka-blue-600">Tabarka's Treasures</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover the hidden gems of Tabarka, from pristine beaches and vibrant coral reefs
            to historical landmarks and scenic viewpoints.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-tabarka-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'map'
                        ? 'bg-white text-tabarka-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                    aria-label="Map view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3l-6-3m12 6l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-tabarka-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* View Toggle Content */}
        {viewMode === 'map' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MapComponent />
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-gray-600"
            >
              Found <span className="font-semibold">{filteredLocations.length}</span> location{filteredLocations.length !== 1 ? 's' : ''}
            </motion.div>

            {/* Locations Grid */}
            {filteredLocations.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredLocations.map((location) => (
                  <motion.div key={location.id} variants={itemVariants}>
                    <Link href={`/locations/${location.id}`} className="block">
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group h-full">
                        <div className="relative h-48">
                          <Image
                            src={location.image}
                            alt={location.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                              <svg 
                                className="mr-1 h-4 w-4 text-yellow-500" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {location.rating}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="mb-1">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                              {location.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tabarka-blue-600 transition-colors">
                            {location.name}
                          </h3>
                          <p className="text-gray-600 line-clamp-3 mb-4">
                            {location.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 flex items-center">
                              <svg 
                                className="h-4 w-4 mr-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                                />
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                                />
                              </svg>
                              View on map
                            </div>
                            <span className="inline-flex items-center text-tabarka-blue-600 font-medium">
                              View details
                              <svg 
                                className="ml-1 h-4 w-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M9 5l7 7-7 7" 
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-500 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">No locations found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 