'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase/client';

// Location interface
interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
}

// Dynamically import the MapComponent with no SSR to avoid hydration issues
const MapComponent = dynamic(() => import('@/components/features/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="h-[700px] w-full flex items-center justify-center bg-muted rounded-xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-muted-foreground">Loading interactive map...</div>
      </div>
    </div>
  )
});

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
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get initial category from URL if present
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.some(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch locations from the database
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        // Format locations for use in the component
        const formattedLocations: Location[] = data.map((location) => ({
          id: location.id,
          name: location.name,
          description: location.description,
          image: location.image_url || 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
          category: getCategoryForLocation(location),
          rating: calculateRating(location.visits_count || 0),
          latitude: location.latitude,
          longitude: location.longitude
        }));
        
        setLocations(formattedLocations);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to load locations');
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  // Get a category based on location properties
  const getCategoryForLocation = (location: any): string => {
    // In a real app, this would be based on actual data
    const nameLower = location.name.toLowerCase();
    if (nameLower.includes('beach')) return 'beaches';
    if (nameLower.includes('coral') || nameLower.includes('dive')) return 'diving';
    if (nameLower.includes('ruins') || nameLower.includes('fort')) return 'historical';
    if (nameLower.includes('restaurant') || nameLower.includes('café')) return 'food';
    if (nameLower.includes('park') || nameLower.includes('forest')) return 'nature';
    if (nameLower.includes('festival') || nameLower.includes('theater')) return 'entertainment';
    if (nameLower.includes('rock') || nameLower.includes('mountain')) return 'landscapes';
    
    // Default category based on description
    const descLower = location.description.toLowerCase();
    if (descLower.includes('beach') || descLower.includes('sand')) return 'beaches';
    if (descLower.includes('dive') || descLower.includes('coral')) return 'diving';
    if (descLower.includes('history') || descLower.includes('ancient')) return 'historical';
    if (descLower.includes('food') || descLower.includes('restaurant')) return 'food';
    if (descLower.includes('nature') || descLower.includes('tree')) return 'nature';
    if (descLower.includes('entertain') || descLower.includes('music')) return 'entertainment';
    if (descLower.includes('view') || descLower.includes('landscape')) return 'landscapes';
    
    return 'landscapes'; // default category
  };

  // Calculate a rating based on visits 
  const calculateRating = (visits: number): number => {
    // Simple algorithm to generate a rating between 4.0 and 5.0 based on visit count
    // Higher visit counts lead to higher ratings
    const baseRating = 4.0;
    const visitModifier = Math.min(1.0, visits / 100); // Max out at 100 visits
    return parseFloat((baseRating + visitModifier).toFixed(1));
  };

  // Filter locations based on category and search query
  useEffect(() => {
    if (locations.length === 0) {
      setFilteredLocations([]);
      return;
    }
    
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
  }, [selectedCategory, searchQuery, locations]);

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

  // Loading UI
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 max-w-2xl mx-auto"></div>
          </div>
          
          <div className="flex justify-between items-center mb-8 animate-pulse">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
              ))}
            </div>
            
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Something Went Wrong</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Explore <span className="text-primary">Tabarka's Treasures</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Discover incredible locations, from pristine beaches to historic ruins, all across the beautiful region of Tabarka.
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
                    className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-center">
                <div className="bg-muted p-1 rounded-lg flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-background text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
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
                        ? 'bg-background text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label="Map view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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