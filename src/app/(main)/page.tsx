'use client';

import HeroSection from '@/components/features/HeroSection';
import PostCard from '@/components/ui/PostCard';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedSection } from '@/components/ui/animated-section';

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Featured Posts Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <AnimatedSection 
            className="text-center mb-16"
            variants={fadeIn}
            threshold={0.1}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured <span className="text-primary">Experiences</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the best of what Tabarka has to offer through the eyes of travelers and locals alike.
            </p>
          </AnimatedSection>
          
          <AnimatedSection 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            threshold={0.1}
          >
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={index % 2 === 0 ? slideInLeft : slideUp}>
                <PostCard {...post} />
              </motion.div>
            ))}
          </AnimatedSection>
          
          <AnimatedSection
            className="mt-12 text-center"
            variants={fadeIn}
            delay={0.4}
          >
            <AnimatedButton
              asChild
              size="lg"
            >
              <Link href="/explore" className="inline-flex items-center">
                View All Experiences
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Map Exploration Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              variants={slideInLeft}
              threshold={0.1}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Explore Tabarka on the Map
              </h2>
              <p className="text-muted-foreground mb-6">
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
                    className="flex items-start text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <AnimatedButton asChild>
                <Link href="/locations" className="inline-flex items-center">
                  Explore Map
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimatedButton>
            </AnimatedSection>
            
            <AnimatedSection
              className="relative rounded-xl overflow-hidden shadow-lg h-96 lg:h-[500px]"
              variants={slideInRight}
              threshold={0.1}
              delay={0.2}
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* History Timeline Preview */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Discover <span className="text-primary">Tabarka's History</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ancient Phoenician outpost to modern tourist destination, explore the rich historical timeline of this Mediterranean jewel.
            </p>
          </AnimatedSection>
          
          {/* Timeline Items (simplified for this example) */}
          <div className="relative mt-12 max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* Timeline Items */}
            {[
              {
                year: "8th Century BC",
                title: "Phoenician Settlement",
                description: "Tabarka was first settled by Phoenicians who established it as a trading post."
              },
              {
                year: "146 BC",
                title: "Roman Conquest",
                description: "The region fell under Roman control following the destruction of Carthage."
              },
              {
                year: "1540 AD",
                title: "Genoese Colony",
                description: "Charles V of Spain granted the coral fishing rights to a Genoese family, leading to the construction of the iconic fort."
              },
              {
                year: "1741 AD",
                title: "Ottoman Rule",
                description: "Tabarka was conquered by the Bey of Tunis, ending the Genoese presence."
              }
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                delay={0.2 * index}
              >
                <div className={`w-5/12 ${index % 2 === 1 ? "order-1" : ""}`}>
                  <div className="bg-card p-6 rounded-lg shadow-md">
                    <span className="text-primary font-bold">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary z-10"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12" variants={fadeIn}>
            <AnimatedButton asChild size="lg">
              <Link href="/history">
                Explore Full Timeline
              </Link>
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <AnimatedSection className="max-w-3xl mx-auto text-center space-y-6" variants={fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Discover Tabarka?</h2>
            <p className="text-primary-foreground/90 text-lg">
              Plan your journey to one of Tunisia's most beautiful coastal destinations. Immerse yourself in culture, history, and natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <AnimatedButton 
                variant="secondary" 
                size="lg"
                asChild
              >
                <Link href="/itineraries">
                  View Itineraries
                </Link>
              </AnimatedButton>
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
} 