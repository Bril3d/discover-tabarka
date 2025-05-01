'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [duration, setDuration] = useState<number>(3);
  const [generatedItineraries, setGeneratedItineraries] = useState<Itinerary[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('predefined');

  const handleInterestToggle = (interest: Interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleDurationChange = (values: number[]) => {
    setDuration(values[0]);
  };

  const handleGenerateItinerary = () => {
    if (selectedInterests.length === 0) {
      // Show error or notification
      return;
    }

    setIsGenerating(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Filter itineraries by matching interests and duration
      const matchingItineraries = predefinedItineraries.filter(itinerary => {
        // Check if duration matches or is within +/- 1 day
        const durationMatch = Math.abs(itinerary.duration - duration) <= 1;
        
        // Check if at least one selected interest matches
        const interestsMatch = selectedInterests.some(interest => 
          itinerary.interests.includes(interest)
        );
        
        return durationMatch && interestsMatch;
      });

      // Sort by number of matching interests (most matches first)
      const sortedItineraries = [...matchingItineraries].sort((a, b) => {
        const aMatches = a.interests.filter(interest => selectedInterests.includes(interest)).length;
        const bMatches = b.interests.filter(interest => selectedInterests.includes(interest)).length;
        return bMatches - aMatches;
      });

      setGeneratedItineraries(sortedItineraries);
      setIsGenerating(false);
    }, 1500);
  };

  const resetForm = () => {
    setSelectedInterests([]);
    setDuration(3);
    setGeneratedItineraries([]);
  };

  const getInterestColor = (interest: Interest) => {
    switch (interest) {
      case 'beach':
        return 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600';
      case 'diving':
        return 'bg-sky-500 text-white border-sky-500 hover:bg-sky-600';
      case 'history':
        return 'bg-amber-700 text-white border-amber-700 hover:bg-amber-800';
      case 'nature':
        return 'bg-green-600 text-white border-green-600 hover:bg-green-700';
      case 'food':
        return 'bg-red-500 text-white border-red-500 hover:bg-red-600';
      case 'culture':
        return 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600';
      default:
        return 'bg-primary text-primary-foreground border-primary hover:bg-primary/90';
    }
  };

  const getInterestEmptyState = (interest: Interest) => {
    switch (interest) {
      case 'beach':
        return 'border-amber-500 text-amber-500 bg-amber-500/10 hover:bg-amber-500/20';
      case 'diving':
        return 'border-sky-500 text-sky-500 bg-sky-500/10 hover:bg-sky-500/20';
      case 'history':
        return 'border-amber-700 text-amber-700 bg-amber-700/10 hover:bg-amber-700/20';
      case 'nature':
        return 'border-green-600 text-green-600 bg-green-600/10 hover:bg-green-600/20';
      case 'food':
        return 'border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20';
      case 'culture':
        return 'border-purple-500 text-purple-500 bg-purple-500/10 hover:bg-purple-500/20';
      default:
        return 'border-muted-foreground text-muted-foreground bg-transparent hover:bg-muted/15';
    }
  };

  const interestIcons: Record<Interest, string> = {
    beach: '🏖️',
    diving: '🤿',
    history: '🏛️',
    nature: '🌳',
    food: '🍽️',
    culture: '🎭'
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Plan Your <span className="text-primary">Perfect Tabarka Trip</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover curated itineraries tailored to your interests or create a custom journey to experience Tabarka's natural beauty, rich history, and vibrant culture.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs 
          defaultValue="predefined" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger 
                value="predefined"
                className="relative data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Suggested Itineraries
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="custom"
                className="relative data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Create Custom
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="predefined" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {predefinedItineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-all bg-card dark:bg-card">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={itinerary.image}
                        alt={itinerary.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex gap-1.5 flex-wrap mb-2">
                        {itinerary.interests.map((interest) => (
                          <Badge 
                            key={interest} 
                            variant="secondary"
                            className={getInterestEmptyState(interest)}
                          >
                            {interestIcons[interest]} {interest}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">{itinerary.title}</h3>
                    </CardHeader>
                    
                    <CardContent className="py-2 flex-grow">
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {itinerary.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      <Button asChild className="w-full group">
                        <Link href={`/itineraries/${itinerary.id}`} className="flex items-center justify-center">
                          View Itinerary
                          <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden shadow-md bg-card dark:bg-card">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-foreground">Customize Your Itinerary</h2>
                  <p className="text-muted-foreground">
                    Tell us what you're interested in and how long you're staying, and we'll suggest the perfect itinerary.
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  {/* Interests Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">What are you interested in?</h3>
                    <div className="flex flex-wrap gap-3">
                      {['beach', 'diving', 'history', 'nature', 'food', 'culture'].map((interest) => (
                        <motion.button
                          key={interest}
                          onClick={() => handleInterestToggle(interest as Interest)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-3 rounded-full text-sm font-medium border-2 transition-all duration-200 flex items-center space-x-2 ${
                            selectedInterests.includes(interest as Interest)
                              ? getInterestColor(interest as Interest)
                              : getInterestEmptyState(interest as Interest)
                          }`}
                        >
                          <span className="text-lg">{interestIcons[interest as Interest]}</span>
                          <span>{interest.charAt(0).toUpperCase() + interest.slice(1)}</span>
                          
                          {selectedInterests.includes(interest as Interest) && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-1 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                            >
                              <svg className="w-3 h-3 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Select at least one interest to generate recommendations.
                    </p>
                  </div>
                  
                  {/* Duration Selection */}
                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Trip Duration</h3>
                      <motion.span 
                        key={duration}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {duration} {duration === 1 ? 'day' : 'days'}
                      </motion.span>
                    </div>
                    <div className="px-3 py-5">
                      <Slider
                        defaultValue={[duration]}
                        max={7}
                        min={1}
                        step={1}
                        onValueChange={handleDurationChange}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>1 day</span>
                        <span>7 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-4 border-t border-border pt-6">
                  <Button 
                    onClick={handleGenerateItinerary} 
                    disabled={selectedInterests.length === 0 || isGenerating}
                    className="flex-1 h-12"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Your Perfect Itinerary...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Generate Itinerary
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={resetForm} 
                    variant="outline"
                    disabled={selectedInterests.length === 0 && duration === 3}
                    className="sm:flex-none"
                  >
                    Reset
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Generated Itineraries */}
              <AnimatePresence>
                {generatedItineraries.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-10"
                  >
                    <div className="flex items-center mb-6 gap-3">
                      <div className="h-px flex-grow bg-border"></div>
                      <h3 className="text-xl font-bold text-foreground px-4">
                        Recommended For You
                      </h3>
                      <div className="h-px flex-grow bg-border"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {generatedItineraries.map((itinerary, index) => (
                        <motion.div
                          key={itinerary.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
                            <div className="flex md:flex-row flex-col h-full">
                              <div className="md:w-1/3 relative">
                                <Image
                                  src={itinerary.image}
                                  alt={itinerary.title}
                                  className="object-cover"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
                                  {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
                                </div>
                              </div>
                              
                              <div className="flex-1 p-5 flex flex-col">
                                <h4 className="text-lg font-semibold text-foreground mb-2">{itinerary.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{itinerary.description}</p>
                                
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {itinerary.interests.map((interest) => (
                                      <Badge 
                                        key={interest} 
                                        variant="outline"
                                        className={
                                          selectedInterests.includes(interest) 
                                            ? getInterestColor(interest) 
                                            : getInterestEmptyState(interest)
                                        }
                                      >
                                        {interestIcons[interest]}
                                        <span className="ml-1">{interest}</span>
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  <Button variant="default" asChild size="sm" className="w-full group">
                                    <Link href={`/itineraries/${itinerary.id}`}>
                                      View Details
                                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor"/>
                                      </svg>
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    
                    {generatedItineraries.length === 0 && (
                      <Card className="p-8 text-center">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-muted p-3 mb-4">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">No matching itineraries found</h4>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            Try selecting different interests or adjusting your trip duration to find the perfect itinerary.
                          </p>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 