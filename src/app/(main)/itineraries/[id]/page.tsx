'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types from the main itineraries page
type Interest = 'beach' | 'diving' | 'history' | 'nature' | 'food' | 'culture';

type ItineraryLocation = {
  id: string;
  name: string;
  image: string;
  timeSpent: string;
  category: string;
};

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  locations: ItineraryLocation[];
};

type Itinerary = {
  id: string;
  title: string;
  duration: number;
  interests: Interest[];
  description: string;
  days: ItineraryDay[];
  image: string;
};

// Predefined itineraries data (same as in the main itineraries page)
const predefinedItineraries: Itinerary[] = [
  {
    id: 'beach-lover',
    title: "Beach Lover's Paradise",
    duration: 3,
    interests: ['beach', 'diving', 'food'],
    description: 'The perfect itinerary for beach enthusiasts. Experience Tabarka\'s stunning beaches, crystal clear waters, and seaside culinary delights.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    days: [
      {
        day: 1,
        title: 'Golden Beach Relaxation',
        description: 'Start your beach vacation with a relaxing day at Tabarka\'s famous Golden Beach.',
        locations: [
          {
            id: '3',
            name: 'Golden Beach - Morning Swim',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '3 hours',
            category: 'beach'
          },
          {
            id: '7',
            name: 'Beachside Lunch',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          },
          {
            id: '3',
            name: 'Golden Beach - Afternoon Activities',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '3 hours',
            category: 'beach'
          }
        ]
      },
      {
        day: 2,
        title: 'Underwater Discovery',
        description: 'Explore the vibrant marine life in Tabarka\'s crystal-clear waters.',
        locations: [
          {
            id: '1',
            name: 'Coral Bay - Snorkeling/Diving',
            image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
            timeSpent: '4 hours',
            category: 'diving'
          },
          {
            id: '7',
            name: 'Fresh Seafood Lunch',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          },
          {
            id: '3',
            name: 'Beach Sunset Experience',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '2 hours',
            category: 'beach'
          }
        ]
      },
      {
        day: 3,
        title: 'Coastal Panorama',
        description: 'Experience the stunning coastal views and rock formations.',
        locations: [
          {
            id: '2',
            name: 'Needles Rock Formation',
            image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
            timeSpent: '3 hours',
            category: 'nature'
          },
          {
            id: '3',
            name: 'Sunset at Tabarka Beach',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '2 hours',
            category: 'beach'
          }
        ]
      }
    ]
  },
  {
    id: 'history-culture',
    title: 'Historical & Cultural Journey',
    duration: 4,
    interests: ['history', 'culture', 'food'],
    description: 'Immerse yourself in Tabarka\'s rich history and vibrant cultural heritage through ancient ruins, local traditions, and authentic cuisine.',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    days: [
      {
        day: 1,
        title: 'Ancient Exploration',
        description: 'Step back in time as you explore ancient Roman ruins.',
        locations: [
          {
            id: '4',
            name: 'Roman Ruins of Bulla Regia',
            image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
            timeSpent: '4 hours',
            category: 'history'
          },
          {
            id: '7',
            name: 'Traditional Lunch',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Fortress & Heritage',
        description: 'Discover Tabarka\'s strategic importance through its historic fortress.',
        locations: [
          {
            id: '6',
            name: 'Fort Tabarka',
            image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
            timeSpent: '3 hours',
            category: 'history'
          },
          {
            id: '7',
            name: 'Tabarka Marina & City Center',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '3 hours',
            category: 'culture'
          }
        ]
      },
      {
        day: 3,
        title: 'Cultural Rhythms',
        description: 'Experience Tabarka\'s musical heritage and cultural performances.',
        locations: [
          {
            id: '8',
            name: 'Jazz Festival Venue',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            timeSpent: '4 hours',
            category: 'culture'
          },
          {
            id: '7',
            name: 'Seaside Dinner',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Natural History',
        description: 'Explore the natural landscape that shaped Tabarka\'s history.',
        locations: [
          {
            id: '5',
            name: 'Feija National Park',
            image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
            timeSpent: '5 hours',
            category: 'nature'
          },
          {
            id: '2',
            name: 'Needles Rock Formation',
            image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
            timeSpent: '2 hours',
            category: 'nature'
          }
        ]
      }
    ]
  },
  {
    id: 'nature-adventure',
    title: 'Nature & Adventure Explorer',
    duration: 5,
    interests: ['nature', 'diving', 'beach'],
    description: 'A perfect blend of natural wonders and outdoor activities for adventure seekers and nature enthusiasts.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    days: [
      {
        day: 1,
        title: 'Forest Discovery',
        description: 'Begin your adventure in the lush forests of the Kroumirie Mountains.',
        locations: [
          {
            id: '5',
            name: 'Feija National Park - Hiking',
            image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
            timeSpent: '6 hours',
            category: 'nature'
          }
        ]
      },
      {
        day: 2,
        title: 'Coastal Wonders',
        description: 'Discover the unique rock formations and coastal landscapes.',
        locations: [
          {
            id: '2',
            name: 'Needles Rock Formation',
            image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
            timeSpent: '4 hours',
            category: 'nature'
          },
          {
            id: '3',
            name: 'Tabarka Beach - Afternoon Swim',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '3 hours',
            category: 'beach'
          }
        ]
      },
      {
        day: 3,
        title: 'Underwater Exploration - Day 1',
        description: 'Begin your underwater adventure exploring colorful coral reefs.',
        locations: [
          {
            id: '1',
            name: 'Coral Bay - Beginner Dive',
            image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
            timeSpent: '4 hours',
            category: 'diving'
          },
          {
            id: '7',
            name: 'Marina Relaxation',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '3 hours',
            category: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Underwater Exploration - Day 2',
        description: 'Continue your diving adventure with more advanced sites.',
        locations: [
          {
            id: '1',
            name: 'Coral Bay - Advanced Sites',
            image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
            timeSpent: '5 hours',
            category: 'diving'
          },
          {
            id: '8',
            name: 'Evening Entertainment',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            timeSpent: '3 hours',
            category: 'culture'
          }
        ]
      },
      {
        day: 5,
        title: 'Beach Relaxation',
        description: 'Unwind on your final day with beach relaxation and water activities.',
        locations: [
          {
            id: '3',
            name: 'Tabarka Beach - Water Sports',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '4 hours',
            category: 'beach'
          },
          {
            id: '7',
            name: 'Farewell Seafood Dinner',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          }
        ]
      }
    ]
  }
];

// Helper function to lookup interests with icons
const getInterestData = (interest: Interest) => {
  const interestData = [
    { value: 'beach', label: 'Beaches & Swimming', icon: '🏖️' },
    { value: 'diving', label: 'Diving & Snorkeling', icon: '🤿' },
    { value: 'history', label: 'Historical Sites', icon: '🏛️' },
    { value: 'nature', label: 'Nature & Hiking', icon: '🌳' },
    { value: 'food', label: 'Food & Culinary', icon: '🍽️' },
    { value: 'culture', label: 'Culture & Events', icon: '🎭' }
  ].find(i => i.value === interest);
  
  return interestData;
};

export default function ItineraryDetailPage() {
  const params = useParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    // In a real app, you'd fetch this from Supabase
    // For now, simulate a data fetch
    const itineraryId = params?.id as string;
    const foundItinerary = predefinedItineraries.find(i => i.id === itineraryId);
    
    if (foundItinerary) {
      setItinerary(foundItinerary);
    }
    
    setLoading(false);
  }, [params]);

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-200 dark:bg-gray-800 h-80 rounded-xl animate-pulse mb-8"></div>
          <div className="bg-gray-200 dark:bg-gray-800 h-12 rounded-lg animate-pulse mb-4 w-3/4"></div>
          <div className="bg-gray-200 dark:bg-gray-800 h-8 rounded-lg animate-pulse mb-8 w-1/2"></div>
          
          {[1, 2, 3].map(i => (
            <div key={i} className="mb-8">
              <div className="bg-gray-200 dark:bg-gray-800 h-10 rounded-lg animate-pulse mb-4 w-1/4"></div>
              <div className="bg-gray-200 dark:bg-gray-800 h-40 rounded-lg animate-pulse mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If itinerary not found
  if (!itinerary) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-80 rounded-xl overflow-hidden mb-8"
        >
          <Image
            src={itinerary.image}
            alt={itinerary.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{itinerary.title}</h1>
            <p className="text-white text-lg md:text-xl mb-4 max-w-3xl">{itinerary.description}</p>
            <div className="flex flex-wrap gap-2">
              {itinerary.interests.map((interest) => {
                const interestData = getInterestData(interest);
                return (
                  <span 
                    key={interest} 
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                  >
                    {interestData?.icon} {interestData?.label}
                  </span>
                );
              })}
              <span className="bg-tabarka-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Day-by-Day Itinerary</h2>
          
          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <motion.div key={day.day} variants={itemVariants} className="border-l-4 border-tabarka-blue-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Day {day.day}: {day.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{day.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.locations.map((location, idx) => (
                    <Link 
                      key={`${location.id}-${idx}`}
                      href={`/locations/${location.id}`}
                      className="flex bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={location.image}
                          alt={location.name}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-tabarka-blue-600 dark:group-hover:text-tabarka-blue-400 transition-colors">{location.name}</h5>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                          </span>
                          <span className="text-sm text-tabarka-blue-600 dark:text-tabarka-blue-400">{location.timeSpent}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link 
            href="/itineraries"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors text-center"
          >
            Back to All Itineraries
          </Link>
          <Link 
            href="/locations"
            className="px-6 py-3 bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white rounded-lg transition-colors text-center"
          >
            Explore Locations
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 