'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

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
  switch (interest) {
    case 'beach':
      return { icon: '🏖️', color: 'bg-amber-500 text-white', light: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' };
    case 'diving':
      return { icon: '🤿', color: 'bg-sky-500 text-white', light: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' };
    case 'history':
      return { icon: '🏛️', color: 'bg-amber-700 text-white', light: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' };
    case 'nature':
      return { icon: '🌳', color: 'bg-green-600 text-white', light: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' };
    case 'food':
      return { icon: '🍽️', color: 'bg-red-500 text-white', light: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' };
    case 'culture':
      return { icon: '🎭', color: 'bg-purple-500 text-white', light: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' };
    default:
      return { icon: '✨', color: 'bg-primary text-primary-foreground', light: 'bg-primary/10 text-primary' };
  }
};

// Add a function to get category styling
const getCategoryStyle = (category: string) => {
  switch(category.toLowerCase()) {
    case 'beach':
      return 'bg-amber-500 text-white';
    case 'diving':
      return 'bg-sky-500 text-white';
    case 'history':
    case 'historical':
      return 'bg-amber-700 text-white';
    case 'nature':
      return 'bg-green-600 text-white';
    case 'food':
      return 'bg-red-500 text-white';
    case 'culture':
    case 'entertainment':
      return 'bg-purple-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function ItineraryDetailPage() {
  const params = useParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState<number>(1);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real app, this would fetch the itinerary from an API using the id param
    const foundItinerary = predefinedItineraries.find(i => i.id === params.id);
    
    if (foundItinerary) {
      setItinerary(foundItinerary);
      // Smooth scroll to top when itinerary loads
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      notFound();
    }
  }, [params.id]);
  
  if (!itinerary) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading itinerary...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        ref={heroRef}
        className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={itinerary.image}
            alt={itinerary.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </motion.div>
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:text-white group"
          >
            <Link href="/itineraries" className="flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </Button>
        </div>
        
        {/* Share button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:text-white rounded-full w-9 h-9"
            aria-label="Share itinerary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </Button>
        </div>
        
        {/* Itinerary Overview */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {itinerary.interests.map((interest, index) => {
                const interestData = getInterestData(interest);
                return (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  >
                    <Badge 
                      className={`${interestData.color} text-sm px-3 py-1`}
                    >
                      <span className="mr-1.5">{interestData.icon}</span>
                      <span>{interest.charAt(0).toUpperCase() + interest.slice(1)}</span>
                    </Badge>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (itinerary.interests.length * 0.1) }}
              >
                <Badge variant="outline" className="bg-black/40 backdrop-blur-sm text-white border-white/20 px-3 py-1">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
                </Badge>
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {itinerary.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {itinerary.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Days Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Day by Day Itinerary</h2>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {activeDay} of {itinerary.days.length}
                </span>
              </div>
            </div>
            
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-2">
                {itinerary.days.map((day) => (
                  <Button
                    key={day.day}
                    variant={activeDay === day.day ? "default" : "outline"}
                    onClick={() => setActiveDay(day.day)}
                    className={`flex-shrink-0 min-w-[130px] h-auto py-2 ${
                      activeDay === day.day ? 'shadow-md' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs uppercase font-medium">Day {day.day}</span>
                      <span className="font-medium line-clamp-1 text-sm">{day.title}</span>
                    </div>
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
          
          {/* Active Day Content */}
          <AnimatePresence mode="wait">
            {itinerary.days
              .filter(day => day.day === activeDay)
              .map(day => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg mb-16 bg-card dark:bg-card/95">
                    <CardHeader className="border-b border-border bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {day.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {day.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 md:p-8">
                      <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Places to Visit
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {day.locations.map((location, idx) => (
                          <motion.div
                            key={`${location.id}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                          >
                            <Card className="overflow-hidden group hover:shadow-md transition-shadow h-full flex flex-col">
                              <div className="relative h-48">
                                <Image
                                  src={location.image}
                                  alt={location.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-3 right-3 z-10">
                                  <Badge className={getCategoryStyle(location.category)}>
                                    {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                                  </Badge>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <h5 className="text-white font-semibold text-lg">{location.name}</h5>
                                </div>
                              </div>
                              <CardFooter className="flex justify-between items-center p-4 border-t border-border">
                                <div className="flex items-center space-x-1 text-muted-foreground">
                                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-sm">{location.timeSpent}</span>
                                </div>
                                
                                <Button variant="link" asChild className="p-0 h-auto text-sm text-primary">
                                  <Link href={`/locations/${location.id}`} className="group flex items-center">
                                    View Details
                                    <svg 
                                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </Link>
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
          
          {/* Suggested Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <Card className="overflow-hidden bg-card dark:bg-card/95 border-none shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col h-full">
                <div className="flex justify-center pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <CardHeader className="text-center pb-2">
                  <h3 className="text-lg font-semibold text-foreground">Save to Calendar</h3>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground flex-grow">
                  <p>Add this itinerary to your calendar for easy access during your trip.</p>
                </CardContent>
                <CardFooter className="pt-2 pb-6 flex justify-center">
                  <Button className="w-full max-w-[200px]">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Calendar
                  </Button>
                </CardFooter>
              </div>
            </Card>
            
            <Card className="overflow-hidden bg-card dark:bg-card/95 border-none shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col h-full">
                <div className="flex justify-center pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <CardHeader className="text-center pb-2">
                  <h3 className="text-lg font-semibold text-foreground">Budget Estimation</h3>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground flex-grow">
                  <p>Get an estimated budget for this entire itinerary based on current prices.</p>
                </CardContent>
                <CardFooter className="pt-2 pb-6 flex justify-center">
                  <Button variant="outline" className="w-full max-w-[200px]">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    View Estimates
                  </Button>
                </CardFooter>
              </div>
            </Card>
            
            <Card className="overflow-hidden bg-card dark:bg-card/95 border-none shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col h-full">
                <div className="flex justify-center pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                <CardHeader className="text-center pb-2">
                  <h3 className="text-lg font-semibold text-foreground">Customize Itinerary</h3>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground flex-grow">
                  <p>Want to modify this itinerary? Create your own custom version based on this template.</p>
                </CardContent>
                <CardFooter className="pt-2 pb-6 flex justify-center">
                  <Button variant="outline" asChild className="w-full max-w-[200px]">
                    <Link href="/itineraries?tab=custom" className="inline-flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Customize
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
          
          {/* Related Itineraries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">You Might Also Like</h2>
              <div className="ml-4 h-px bg-border flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {predefinedItineraries
                .filter(i => i.id !== itinerary.id)
                .slice(0, 3)
                .map((relatedItinerary, index) => (
                  <motion.div
                    key={relatedItinerary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.4 + (index * 0.1), duration: 0.5 }
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="relative h-40">
                        <Image
                          src={relatedItinerary.image}
                          alt={relatedItinerary.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-semibold text-white line-clamp-1">{relatedItinerary.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="bg-black/40 backdrop-blur-sm text-white border-white/20 text-xs">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {relatedItinerary.duration} {relatedItinerary.duration === 1 ? 'day' : 'days'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardContent className="py-4 flex-grow">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {relatedItinerary.interests.slice(0, 3).map((interest) => {
                            const interestData = getInterestData(interest);
                            return (
                              <Badge key={interest} variant="secondary" className={interestData.light}>
                                {interestData.icon} {interest}
                              </Badge>
                            );
                          })}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedItinerary.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="default" asChild className="w-full group">
                          <Link href={`/itineraries/${relatedItinerary.id}`} className="flex items-center justify-center">
                            View Itinerary
                            <svg 
                              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 