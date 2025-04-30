'use client';

import HeroSection from '@/components/features/HeroSection';
import PostCard from '@/components/ui/PostCard';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock data for featured posts - would be fetched from Supabase in production
const featuredPosts = [
  {
    id: '1',
    title: `Exploring Tabarka's Vibrant Coral Reefs`,
    excerpt: `Dive into the mesmerizing underwater world of Tabarka, home to some of the Mediterranean's most colorful coral reefs and marine life.`,
    mediaUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
    mediaType: 'image' as const,
    authorName: 'Marine Explorer',
    createdAt: '2023-05-15T09:00:00Z',
    category: 'Diving',
    locationName: 'Coral Bay'
  },
  {
    id: '2',
    title: 'The Ancient Roman Ruins of Tabarka',
    excerpt: `Walk through history as you explore the well-preserved Roman ruins that tell the story of Tabarka's rich historical past.`,
    mediaUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    mediaType: 'image' as const,
    authorName: 'History Buff',
    createdAt: '2023-06-22T14:30:00Z',
    category: 'History',
    locationName: 'Ruins of Bulla Regia'
  },
  {
    id: '3',
    title: "A Local's Guide to Tabarka's Best Beaches",
    excerpt: "Discover the hidden gems of Tabarka's coastline with insider tips on the most beautiful and secluded beaches to visit.",
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    mediaType: 'image' as const,
    authorName: 'Beach Lover',
    createdAt: '2023-07-10T11:15:00Z',
    category: 'Beaches',
    locationName: 'Golden Beach'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Featured Posts Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-tabarka-blue-600">Experiences</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the best of what Tabarka has to offer through the eyes of travelers and locals alike.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/explore"
              className="px-6 py-3 bg-tabarka-blue-600 text-white rounded-full font-medium hover:bg-tabarka-blue-700 transition-colors inline-flex items-center"
            >
              View All Experiences
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Tabarka Section with Parallax Effect */}
      <section className="relative py-20 bg-tabarka-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div 
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1566409358502-1fe56a505a43)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Discover the Magic of <span className="text-tabarka-blue-600">Tabarka</span>
              </h2>
              <p className="text-gray-700 mb-6">
                Tabarka is a coastal city located in northwestern Tunisia, known for its stunning beaches, vibrant coral reefs, and rich cultural heritage. Nestled between the Mediterranean Sea and the Kroumirie Mountains, this hidden gem offers a perfect blend of natural beauty and historical significance.
              </p>
              <p className="text-gray-700 mb-6">
                From diving in crystal-clear waters to exploring ancient Roman ruins, Tabarka provides a diverse range of experiences for every type of traveler. The city is also famous for its annual jazz festival, which attracts music lovers from around the world.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center text-tabarka-blue-600 font-medium hover:text-tabarka-blue-800 transition-colors"
              >
                Learn more about Tabarka
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1566409358502-1fe56a505a43"
                  alt="Tabarka Coastal View"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="text-2xl font-bold">Tabarka's Coastline</h3>
                  <p>A perfect harmony of mountains meeting the sea</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Activities/Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore <span className="text-tabarka-blue-600">Tabarka</span> By Activity
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From underwater adventures to cultural explorations, find the perfect activities for your visit.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Diving & Snorkeling', icon: '🤿', color: 'bg-tabarka-blue-500', href: '/explore?category=diving' },
              { title: 'Beach Relaxation', icon: '🏖️', color: 'bg-tabarka-sand-500', href: '/explore?category=beaches' },
              { title: 'Historical Sites', icon: '🏛️', color: 'bg-tabarka-earth-500', href: '/explore?category=history' },
              { title: 'Local Cuisine', icon: '🍽️', color: 'bg-tabarka-coral-500', href: '/explore?category=food' },
            ].map((activity, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={activity.href}>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow h-full flex flex-col items-center justify-center group">
                    <div className={`w-16 h-16 ${activity.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {activity.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-tabarka-blue-600 transition-colors">
                      {activity.title}
                    </h3>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm text-white bg-tabarka-blue-600 px-3 py-1 rounded-full">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Itineraries Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Curated <span className="text-tabarka-blue-600">Itineraries</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make the most of your visit with our custom-tailored travel plans for every type of traveler.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                id: 'beach-lover',
                title: "Beach Lover's Paradise",
                days: 3,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                interests: ["Beach", "Diving", "Food"]
              },
              {
                id: 'history-culture',
                title: "Historical & Cultural Journey",
                days: 4,
                image: "https://images.unsplash.com/photo-1555993539-1732b0258235",
                interests: ["History", "Culture", "Food"]
              },
              {
                id: 'nature-adventure',
                title: "Nature & Adventure Explorer",
                days: 5,
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
                interests: ["Nature", "Diving", "Beach"]
              }
            ].map((itinerary) => (
              <motion.div key={itinerary.id} variants={itemVariants}>
                <Link href={`/itineraries/${itinerary.id}`} className="block h-full group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={itinerary.image}
                        alt={itinerary.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-tabarka-blue-600 transition-colors">
                        {itinerary.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {itinerary.interests.map((interest, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-tabarka-blue-600 font-medium group-hover:underline flex items-center">
                          View Itinerary
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                        <span className="text-sm text-gray-500">
                          {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="/itineraries"
              className="px-6 py-3 bg-tabarka-blue-600 text-white rounded-full font-medium hover:bg-tabarka-blue-700 transition-colors inline-flex items-center"
            >
              Plan Your Perfect Trip
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-tabarka-blue-600 to-tabarka-blue-800 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Tabarka?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
              Join our community and share your own Tabarka adventures or find inspiration for your next visit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register"
                className="px-8 py-3 bg-white text-tabarka-blue-600 rounded-full font-medium hover:bg-tabarka-blue-50 transition-colors"
              >
                Sign Up Today
              </Link>
              <Link 
                href="/gallery"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Browse Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 