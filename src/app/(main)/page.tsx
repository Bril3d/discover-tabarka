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
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured <span className="text-tabarka-blue-600 dark:text-tabarka-blue-400">Experiences</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/explore"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium transition-colors"
            >
              View All Experiences
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Map Exploration Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Explore Tabarka on the Map
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discover Tabarka's diverse attractions from pristine beaches and diving spots to historical landmarks and local restaurants, all accessible with our interactive map.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Find the best diving spots with rich coral reefs',
                  'Locate historical sites including the Genoese Fort',
                  'Discover local restaurants serving authentic Tunisian cuisine',
                  'Plan your beach day with detailed information on each location'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <svg className="h-6 w-6 text-tabarka-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium transition-colors"
              >
                Explore Map
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg h-96 lg:h-[500px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce"
                alt="Interactive map of Tabarka"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-6">
                  <Link
                    href="/locations"
                    className="text-white font-medium hover:underline"
                  >
                    Open Interactive Map
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline Preview */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Journey Through <span className="text-tabarka-blue-600 dark:text-tabarka-blue-400">Time</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore Tabarka's rich history from ancient Phoenician settlements to modern-day cultural hub.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-tabarka-blue-100 dark:bg-tabarka-blue-900/30 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {[
                {
                  era: 'Ancient Times',
                  year: '1100 BCE',
                  title: 'Phoenician Settlement',
                  description: 'Established as "Thabraca", a trading post for precious purple dye.',
                  image: 'https://images.unsplash.com/photo-1555993539-1732b0258235'
                },
                {
                  era: 'Roman Period',
                  year: '146 BCE - 439 CE',
                  title: 'Roman Expansion',
                  description: 'Flourished as a Roman colony with significant infrastructure development.',
                  image: 'https://images.unsplash.com/photo-1548812966-9a9983d5e309'
                },
                {
                  era: 'Genoese Era',
                  year: '1540 - 1741',
                  title: 'Coral Trade Dominance',
                  description: 'Genoese established a coral fishing settlement, building the iconic fortress.',
                  image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e'
                },
                {
                  era: 'Modern Era',
                  year: '1973 - Present',
                  title: 'Cultural Renaissance',
                  description: 'Launch of the Tabarka Jazz Festival puts the town on the global cultural map.',
                  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
                }
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className={`relative pb-12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12 md:ml-auto'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className={`hidden md:block absolute top-0 h-6 w-6 rounded-full bg-tabarka-blue-500 ${
                    index % 2 === 0 ? 'right-0 -translate-x-1/2' : 'left-0 translate-x-1/2'
                  } -translate-y-1/2`}></div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {event.year}
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-tabarka-blue-100 dark:bg-tabarka-blue-900/30 text-tabarka-blue-800 dark:text-tabarka-blue-300 mb-2">
                        {event.era}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/history"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium transition-colors"
            >
              Explore Full Timeline
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
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