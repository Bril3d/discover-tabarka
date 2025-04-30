'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Interest = 'beach' | 'diving' | 'history' | 'nature' | 'food' | 'culture';

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  locations: {
    id: string;
    name: string;
    image: string;
    timeSpent: string;
    category: string;
  }[];
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

// Mock data for pre-defined itineraries
const predefinedItineraries: Itinerary[] = [
  {
    id: 'beach-lovers',
    title: 'Beach Lover\'s Paradise',
    duration: 3,
    interests: ['beach', 'diving', 'food'],
    description: 'Perfect for sun seekers and water enthusiasts looking to experience Tabarka\'s beautiful coastline and underwater treasures.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    days: [
      {
        day: 1,
        title: 'Coastal Exploration',
        description: 'Begin your journey exploring the pristine beaches of Tabarka.',
        locations: [
          {
            id: '3',
            name: 'Tabarka Beach',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            timeSpent: '4 hours',
            category: 'beach'
          },
          {
            id: '7',
            name: 'Tabarka Marina',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Underwater Adventure',
        description: 'Discover the vibrant coral reefs and marine life of Tabarka.',
        locations: [
          {
            id: '1',
            name: 'Coral Bay',
            image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
            timeSpent: '5 hours',
            category: 'diving'
          },
          {
            id: '7',
            name: 'Seafood Dinner at Marina',
            image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
            timeSpent: '2 hours',
            category: 'food'
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

export default function ItinerariesPage() {
  const [duration, setDuration] = useState<number>(0);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [showPreDefined, setShowPreDefined] = useState(true);

  const interests: { value: Interest; label: string; icon: string }[] = [
    { value: 'beach', label: 'Beaches & Swimming', icon: '🏖️' },
    { value: 'diving', label: 'Diving & Snorkeling', icon: '🤿' },
    { value: 'history', label: 'Historical Sites', icon: '🏛️' },
    { value: 'nature', label: 'Nature & Hiking', icon: '🌳' },
    { value: 'food', label: 'Food & Culinary', icon: '🍽️' },
    { value: 'culture', label: 'Culture & Events', icon: '🎭' }
  ];

  const handleInterestToggle = (interest: Interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerateItinerary = () => {
    if (duration === 0 || selectedInterests.length === 0) {
      return;
    }
    
    // In a real app, this would call an API to generate a personalized itinerary
    // For now, we'll simply find the closest matching predefined itinerary

    let bestMatch: Itinerary | null = null;
    let highestScore = -1;

    for (const itinerary of predefinedItineraries) {
      // Calculate match score based on duration and interests
      const durationDiff = Math.abs(itinerary.duration - duration);
      const durationScore = 1 - (durationDiff / 5); // Normalize to [0,1]
      
      // Calculate interest overlap
      const interestOverlap = itinerary.interests.filter(i => selectedInterests.includes(i)).length;
      const interestScore = interestOverlap / Math.max(selectedInterests.length, itinerary.interests.length);
      
      // Combined score (weighted)
      const totalScore = (durationScore * 0.4) + (interestScore * 0.6);
      
      if (totalScore > highestScore) {
        highestScore = totalScore;
        bestMatch = itinerary;
      }
    }

    if (bestMatch) {
      // Adjust days based on selected duration if needed
      if (bestMatch.duration !== duration) {
        const adjustedItinerary = {...bestMatch};
        
        if (duration < bestMatch.duration) {
          // Truncate days
          adjustedItinerary.days = bestMatch.days.slice(0, duration);
          adjustedItinerary.duration = duration;
        } else if (duration > bestMatch.duration) {
          // Add extra days by repeating last day with modifications
          const extraDays = duration - bestMatch.duration;
          const newDays = [...bestMatch.days];
          
          for (let i = 1; i <= extraDays; i++) {
            const templateDay = bestMatch.days[bestMatch.days.length - 1];
            const newDay = {
              ...templateDay,
              day: bestMatch.duration + i,
              title: `Extra Day ${i}`,
              description: `Additional day based on your interests.`
            };
            newDays.push(newDay);
          }
          
          adjustedItinerary.days = newDays;
          adjustedItinerary.duration = duration;
        }
        
        setGeneratedItinerary(adjustedItinerary);
      } else {
        setGeneratedItinerary(bestMatch);
      }
    }
    
    setShowPreDefined(false);
  };

  const resetForm = () => {
    setDuration(0);
    setSelectedInterests([]);
    setGeneratedItinerary(null);
    setShowPreDefined(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Plan Your <span className="text-tabarka-blue-600 dark:text-tabarka-blue-400">Perfect Tabarka Itinerary</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover personalized day-by-day plans for your Tabarka adventure, tailored to your interests and schedule.
          </p>
        </motion.div>

        {/* Itinerary Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Create Your Custom Itinerary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">How many days will you stay?</h3>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => setDuration(days)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      duration === days
                        ? 'bg-tabarka-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {days} {days === 1 ? 'day' : 'days'}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">What are you interested in?</h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.value}
                    onClick={() => handleInterestToggle(interest.value)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      selectedInterests.includes(interest.value)
                        ? 'bg-tabarka-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{interest.icon}</span>
                    <span>{interest.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleGenerateItinerary}
              disabled={duration === 0 || selectedInterests.length === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                duration === 0 || selectedInterests.length === 0
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white'
              }`}
            >
              Generate My Itinerary
            </button>
            
            {(duration !== 0 || selectedInterests.length !== 0) && (
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* Generated Itinerary */}
        {generatedItinerary && !showPreDefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-80">
                <Image
                  src={generatedItinerary.image}
                  alt={generatedItinerary.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h2 className="text-3xl font-bold text-white dark:text-gray-100 mb-2">{generatedItinerary.title}</h2>
                  <p className="text-white dark:text-gray-300 text-lg mb-4">{generatedItinerary.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {generatedItinerary.interests.map((interest) => (
                      <span 
                        key={interest} 
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                      >
                        {interests.find(i => i.value === interest)?.icon} {interests.find(i => i.value === interest)?.label}
                      </span>
                    ))}
                    <span className="bg-tabarka-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {generatedItinerary.duration} {generatedItinerary.duration === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Personalized Itinerary</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Day by day guide to make the most of your Tabarka visit</p>
                </div>
                
                <div className="space-y-8">
                  {generatedItinerary.days.map((day) => (
                    <div key={day.day} className="border-l-4 border-tabarka-blue-500 pl-6 py-2">
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Day {day.day}: {day.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{day.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-tabarka-blue-600 transition-colors">{location.name}</h5>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                  {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                                </span>
                                <span className="text-sm text-tabarka-blue-600">{location.timeSpent}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setShowPreDefined(true)}
                    className="px-6 py-3 rounded-lg font-medium bg-tabarka-blue-50 dark:bg-tabarka-blue-900/30 text-tabarka-blue-600 dark:text-tabarka-blue-400 hover:bg-tabarka-blue-100 dark:hover:bg-tabarka-blue-900/50 transition-colors"
                  >
                    Browse Other Itineraries
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Predefined Itineraries */}
        {showPreDefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">Or Explore Our Recommended Itineraries</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {predefinedItineraries.map((itinerary) => (
                <motion.div
                  key={itinerary.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={itinerary.image}
                      alt={itinerary.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-bold text-white">{itinerary.title}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="bg-white/90 text-tabarka-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                          {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
                        </span>
                        {itinerary.interests.slice(0, 2).map((interest) => (
                          <span 
                            key={interest}
                            className="bg-tabarka-blue-500/90 text-white text-xs px-2 py-1 rounded-full"
                          >
                            {interests.find(i => i.value === interest)?.icon}
                          </span>
                        ))}
                        {itinerary.interests.length > 2 && (
                          <span className="bg-tabarka-blue-500/90 text-white text-xs px-2 py-1 rounded-full">
                            +{itinerary.interests.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{itinerary.description}</p>
                    <Link
                      href={`/itineraries/${itinerary.id}`}
                      className="w-full bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors block text-center"
                    >
                      View Itinerary
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-tabarka-blue-50 dark:bg-tabarka-blue-900/20 rounded-xl p-8 text-center shadow-sm"
        >
          <h2 className="text-2xl font-bold text-tabarka-blue-800 dark:text-tabarka-blue-300 mb-4">Ready to Explore Tabarka?</h2>
          <p className="text-tabarka-blue-600 dark:text-tabarka-blue-400 max-w-2xl mx-auto mb-6">
            Save your itinerary, book accommodations, or explore specific locations to make your Tabarka experience unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/locations" className="bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Explore Locations
            </Link>
            <Link href="/submit" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-tabarka-blue-600 dark:text-tabarka-blue-400 border border-tabarka-blue-200 dark:border-tabarka-blue-800 font-medium py-3 px-6 rounded-lg transition-colors">
              Share Your Experience
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 