'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase/client';

// Location interface
interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string | null;
  visits_count: number;
}

// Dynamically import the LocationMap component with no SSR
const LocationMap = dynamic(() => import('@/components/features/LocationMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-muted rounded-xl flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  ) 
});

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch location data from Supabase
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the location by ID
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          setError('Location not found');
          return;
        }
        
        // Format the location data
        const locationData: Location = {
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          visits_count: data.visits_count || 0
        };
        
        setLocation(locationData);
        
        // Increment the visit count for this location
        await incrementVisitCount(data.id);
        
      } catch (err: any) {
        console.error('Error fetching location:', err);
        setError(err.message || 'Failed to load location details');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchLocation();
    }
  }, [id]);
  
  // Increment the visit count for the location
  const incrementVisitCount = async (locationId: string) => {
    try {
      // Use RPC call or direct update to increment the counter
      const { error } = await supabase.rpc('increment_location_visits', {
        location_id: locationId
      });
      
      if (error) {
        // Don't throw, just log - visit counts aren't critical
        console.error('Error incrementing visit count:', error);
      }
    } catch (err) {
      console.error('Error incrementing visit count:', err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded-md mb-4 w-3/4"></div>
            <div className="h-80 bg-muted rounded-xl mb-6"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="h-4 bg-muted rounded-md w-2/3"></div>
            </div>
            <div className="h-[300px] bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !location) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error || "The location you're looking for doesn't exist or has been removed."}
          </p>
          <Link 
            href="/locations"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center text-sm text-muted-foreground mb-6"
        >
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/locations" className="hover:text-primary">Locations</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{location.name}</span>
        </motion.div>
        
        {/* Location Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6"
        >
          {location.name}
        </motion.h1>
        
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-8"
        >
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </motion.div>
        
        {/* Location Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <p>{location.description}</p>
          
          {location.address && (
            <div className="not-prose mt-4 flex items-center text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location.address}</span>
            </div>
          )}
          
          <div className="not-prose mt-2 flex items-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{location.visits_count} visits</span>
          </div>
        </motion.div>
        
        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Location Map</h2>
          <div className="h-[400px] rounded-xl overflow-hidden">
            <LocationMap 
              name={location.name}
              latitude={location.latitude}
              longitude={location.longitude}
              description={location.description}
              image={location.image}
            />
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link
            href="/locations"
            className="inline-flex items-center justify-center px-6 py-3 border border-muted rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Locations
          </Link>
          
          {/* Add more actions here like "Save to Favorites" or "Get Directions" */}
        </motion.div>
      </div>
    </div>
  );
} 