'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LocationDetail, { Location } from '@/components/locations/LocationDetail';
import { motion } from 'framer-motion';

// Mock data for individual locations - this would typically come from Supabase
const mockLocationData: Record<string, Location> = {
  '1': {
    id: '1',
    name: 'Coral Bay',
    description: 'Experience some of the most vibrant coral reefs in the Mediterranean. Perfect for diving and snorkeling enthusiasts. The crystal clear waters offer visibility up to 30 meters, allowing you to observe a rich variety of marine life including colorful fish, octopuses, and stunning coral formations. The bay is protected from strong currents, making it ideal for beginners and experienced divers alike. Local diving schools offer equipment rental and guided tours for all levels.',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
    category: 'diving',
    rating: 4.8,
    latitude: 36.964,
    longitude: 8.758,
    features: [
      'Vibrant coral reefs',
      'Crystal clear water with high visibility',
      'Suitable for all experience levels',
      'Equipment rental available',
      'Guided tours available',
      'Marine life observation'
    ],
    openingHours: [
      { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { days: 'Saturday - Sunday', hours: '9:00 AM - 5:00 PM' }
    ],
    contactInfo: {
      phone: '+216 12 345 678',
      email: 'info@coralbay.tn',
      website: 'https://coralbay.example.com'
    }
  },
  '2': {
    id: '2',
    name: 'Needles Rock Formation',
    description: 'Iconic red sandstone cliffs and needle-like rock formations that jut out dramatically into the sea. These ancient geological wonders have been shaped by wind and water over millions of years, creating a unique landscape that attracts photographers and nature lovers from around the world. The area is particularly spectacular at sunset when the red rocks glow against the backdrop of the Mediterranean Sea. A walking path allows visitors to explore the area safely and enjoy panoramic views from various viewpoints.',
    image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    category: 'landscapes',
    rating: 4.9,
    latitude: 36.968,
    longitude: 8.746,
    features: [
      'Dramatic red sandstone formations',
      'Spectacular sunset views',
      'Walking paths with viewpoints',
      'Photography opportunities',
      'Historical significance',
      'Geological information displays'
    ],
    openingHours: [
      { days: 'Every day', hours: 'Sunrise to Sunset' }
    ],
    contactInfo: {
      phone: '+216 98 765 432',
      website: 'https://tabarka-tourism.example.com/needles'
    }
  },
  '3': {
    id: '3',
    name: 'Tabarka Beach',
    description: 'A pristine stretch of golden sand with crystal clear waters. Ideal for swimming and sunbathing. This family-friendly beach offers shallow waters near the shore, making it perfect for children. Sun loungers and umbrellas are available for rent, and the beach is regularly cleaned and maintained. Several beachside cafés and restaurants serve fresh seafood and refreshing drinks. Water sports activities including jet skiing, parasailing, and banana boat rides are available during the summer months.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'beaches',
    rating: 4.7,
    latitude: 36.955,
    longitude: 8.761,
    features: [
      'Golden sand beach',
      'Crystal clear waters',
      'Family-friendly with shallow areas',
      'Sun loungers and umbrellas for rent',
      'Beachside cafés and restaurants',
      'Water sports activities'
    ],
    openingHours: [
      { days: 'Every day', hours: '24 hours (lifeguards 8:00 AM - 7:00 PM in summer)' }
    ]
  },
  '4': {
    id: '4',
    name: 'Roman Ruins of Bulla Regia',
    description: 'Explore the ancient Roman underground villas with well-preserved mosaics dating back to the 2nd century. This unique archaeological site features houses that were built partially underground to escape the heat, a revolutionary architectural approach at the time. The intricate mosaics depicting mythological scenes and daily life are remarkably preserved and represent some of the finest examples of Roman art in North Africa. The site also includes a forum, theaters, and thermal baths that give visitors insight into ancient Roman life.',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    category: 'historical',
    rating: 4.6,
    latitude: 36.561,
    longitude: 8.755,
    features: [
      'Underground Roman villas',
      'Well-preserved ancient mosaics',
      'Archaeological museum',
      'Guided tours available',
      'Historical information displays',
      'Unique architectural features'
    ],
    openingHours: [
      { days: 'Tuesday - Sunday', hours: '9:00 AM - 5:00 PM' },
      { days: 'Monday', hours: 'Closed' }
    ],
    contactInfo: {
      phone: '+216 71 345 678',
      email: 'heritage@bullaregia.tn',
      website: 'https://bullaregia.heritage.tn'
    }
  },
  '5': {
    id: '5',
    name: 'Feija National Park',
    description: 'Lush forests, diverse wildlife, and scenic hiking trails in the nearby Kroumirie Mountains. This protected area spans over 2,600 hectares and is home to various species of flora and fauna, including rare oak trees, wild boars, and jackal. Bird watchers will appreciate the opportunity to spot eagles, partridges, and migratory birds. Several marked hiking trails of varying difficulty levels wind through the park, offering visitors the chance to explore its natural beauty. Park rangers provide guided tours that highlight the ecological importance of the area.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    category: 'nature',
    rating: 4.5,
    latitude: 36.500,
    longitude: 8.600,
    features: [
      'Diverse wildlife observation',
      'Marked hiking trails',
      'Picnic areas',
      'Guided nature tours',
      'Bird watching opportunities',
      'Educational environmental displays'
    ],
    openingHours: [
      { days: 'Every day', hours: '7:00 AM - 6:00 PM (April-October)' },
      { days: 'Every day', hours: '8:00 AM - 5:00 PM (November-March)' }
    ],
    contactInfo: {
      phone: '+216 78 123 456',
      email: 'info@feijanationalpark.tn',
      website: 'https://feijanationalpark.tn'
    }
  },
  '6': {
    id: '6',
    name: 'Fort Tabarka',
    description: 'Historical Genoese fort offering panoramic views of the harbor and city. Great for history enthusiasts. Built in the 16th century by the Republic of Genoa, this well-preserved fortress stands as a testament to Tabarka\'s strategic importance throughout the centuries. Visitors can explore the ancient walls, towers, and chambers while learning about the various civilizations that controlled this coastal region. The fort\'s elevated position provides spectacular views of the city, harbor, and Mediterranean Sea, making it a popular spot for photography.',
    image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
    category: 'historical',
    rating: 4.4,
    latitude: 36.960,
    longitude: 8.758,
    features: [
      'Panoramic views of the city and harbor',
      'Historical architecture',
      'Informative historical displays',
      'Photography opportunities',
      'Guided tours available',
      'Cultural events during summer'
    ],
    openingHours: [
      { days: 'Tuesday - Sunday', hours: '9:00 AM - 6:00 PM (Summer)' },
      { days: 'Tuesday - Sunday', hours: '9:00 AM - 5:00 PM (Winter)' },
      { days: 'Monday', hours: 'Closed' }
    ],
    contactInfo: {
      phone: '+216 71 987 654',
      website: 'https://tabarka-heritage.example.com/fort'
    }
  },
  '7': {
    id: '7',
    name: 'Tabarka Marina',
    description: 'Picturesque marina with restaurants serving fresh seafood and stunning views of fishing boats. The modern marina accommodates both local fishing vessels and visiting yachts, creating a charming maritime atmosphere. Waterfront restaurants offer a variety of culinary experiences, specializing in fresh-caught seafood prepared according to traditional Tunisian recipes. Visitors can stroll along the boardwalk, admire the boats, and enjoy the relaxed coastal vibe. The area is particularly vibrant in the evening when the lights reflect on the water and the restaurants come alive with music and conversation.',
    image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
    category: 'food',
    rating: 4.3,
    latitude: 36.958,
    longitude: 8.763,
    features: [
      'Waterfront restaurants and cafés',
      'Fresh seafood specialties',
      'Boat watching',
      'Evening entertainment',
      'Shopping opportunities',
      'Fishing trip bookings'
    ],
    openingHours: [
      { days: 'Restaurant hours vary', hours: 'Generally 11:00 AM - 11:00 PM' },
      { days: 'Marina', hours: 'Open 24 hours' }
    ],
    contactInfo: {
      phone: '+216 71 123 789',
      email: 'info@tabarka-marina.tn',
      website: 'https://tabarka-marina.tn'
    }
  },
  '8': {
    id: '8',
    name: 'Jazz Festival Venue',
    description: 'The location of the famous Tabarka Jazz Festival, hosting world-class musicians every summer. This open-air amphitheater combines modern acoustic design with beautiful natural surroundings, creating a unique concert experience. The annual jazz festival, held since 1973, has featured renowned international and regional artists and has become a cultural highlight of Tunisia. Even when not hosting the festival, the venue offers guided tours that explain its history and architectural features. The surrounding area features art installations and memorials dedicated to legendary jazz musicians who have performed here.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    category: 'entertainment',
    rating: 4.7,
    latitude: 36.965,
    longitude: 8.755,
    features: [
      'World-class acoustic design',
      'Annual jazz festival (July/August)',
      'Guided tours available',
      'Historical music memorabilia',
      'Spectacular natural setting',
      'Evening performances during summer'
    ],
    openingHours: [
      { days: 'Festival dates', hours: 'According to event schedule' },
      { days: 'Venue tours', hours: '10:00 AM - 4:00 PM (except during event preparations)' }
    ],
    contactInfo: {
      phone: '+216 71 456 789',
      email: 'contact@tabarkajazz.tn',
      website: 'https://tabarkajazzfestival.tn'
    },
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      'https://images.unsplash.com/photo-1488841714725-bb4c32d1ac94',
      'https://images.unsplash.com/photo-1497911270199-1c552ee64aa4',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629'
    ]
  }
};

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchLocation = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call to Supabase
        // const { data, error } = await supabase
        //   .from('locations')
        //   .select('*')
        //   .eq('id', id)
        //   .single();
        
        // For now, use our mock data
        setTimeout(() => {
          const locationId = Array.isArray(id) ? id[0] : id as string;
          const foundLocation = mockLocationData[locationId];
          
          if (foundLocation) {
            setLocation(foundLocation);
            setError(null);
          } else {
            setError('Location not found');
          }
          
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (err) {
        setError('Failed to load location details');
        setLoading(false);
      }
    };

    if (id) {
      fetchLocation();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-tabarka-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading location details...</p>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Location Not Found</h1>
          <p className="mt-2 text-gray-600">{error || "We couldn't find the location you're looking for."}</p>
          <div className="mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/locations"
                className="inline-block bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Browse All Locations
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return <LocationDetail location={location} />;
} 