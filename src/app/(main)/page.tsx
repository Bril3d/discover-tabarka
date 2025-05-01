'use client';

import { useState, useRef, ReactNode, useEffect } from 'react';
import HeroSection from '@/components/features/HeroSection';
import PostCard from '@/components/ui/PostCard';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { contentService } from '@/lib/services/contentService';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Types for the animated container
interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variants: Variants;
  delay?: number;
  threshold?: number;
}

// Animated section component that handles intersection observer
const AnimatedContainer = ({ 
  children, 
  className = "", 
  variants, 
  delay = 0, 
  threshold = 0.1 
}: AnimatedContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Type for formatted post data to use in PostCard
interface FormattedPost {
  id: string;
  title: string;
  excerpt: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'text';
  authorName: string;
  createdAt: string;
  category: string;
  locationName?: string;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [featuredPosts, setFeaturedPosts] = useState<FormattedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setIsLoading(true);
        // Get featured content from Supabase
        const { content } = await contentService.getContent(1, 3, {
          featured: true,
          status: 'published'
        });
        
        // Format the posts for display
        const formattedPosts = content.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || 'Experience Tabarka with this amazing activity',
          mediaUrl: post.media_url || 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
          mediaType: post.media_type,
          authorName: post.users?.full_name || 'Anonymous',
          createdAt: post.created_at,
          category: post.categories?.name || 'Uncategorized',
          locationName: post.location_id ? 'Tabarka' : undefined
        }));
        
        setFeaturedPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        // Set some fallback data if the fetch fails
        setFeaturedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedPosts();
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return (
    <>
      <HeroSection />
      
      {/* Featured Posts Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <AnimatedContainer 
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
            
            {/* Category filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['all', 'diving', 'history', 'beaches', 'food'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-card rounded-lg shadow-md p-4 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                  <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-5/6 mb-4"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-muted rounded-full mr-2"></div>
                    <div className="h-4 bg-muted rounded-md w-1/3"></div>
                  </div>
                </div>
              ))
            ) : featuredPosts.length > 0 ? (
              featuredPosts.map((post, index) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                  }}
                >
                  <PostCard {...post} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No featured content available at the moment.</p>
              </div>
            )}
          </div>
          
          <AnimatedContainer
            className="mt-12 text-center"
            variants={fadeIn}
            delay={0.4}
          >
            <Button
              size="lg"
              asChild
              className="group"
            >
              <Link href="/blog" className="inline-flex items-center">
                View All Experiences
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Map Exploration Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedContainer
              className="space-y-6"
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
              <Button asChild className="group">
                <Link href="/locations" className="inline-flex items-center">
                  Explore Map
                  <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
            </AnimatedContainer>
            
            <AnimatedContainer
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
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* History Timeline Preview */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <AnimatedContainer className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Discover <span className="text-primary">Tabarka's History</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ancient Phoenician outpost to modern tourist destination, explore the rich historical timeline of this Mediterranean jewel.
            </p>
          </AnimatedContainer>
          
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
              <AnimatedContainer
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                delay={0.2 * index}
              >
                <div className={`w-5/12 ${index % 2 === 1 ? "order-1" : ""}`}>
                  <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <span className="text-primary font-bold">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary z-10"></div>
                </div>
              </AnimatedContainer>
            ))}
          </div>
          
          <AnimatedContainer className="text-center mt-12" variants={fadeIn}>
            <Button asChild size="lg">
              <Link href="/history">
                Explore Full Timeline
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <AnimatedContainer className="max-w-3xl mx-auto text-center space-y-6" variants={fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Discover Tabarka?</h2>
            <p className="text-primary-foreground/90 text-lg">
              Plan your journey to one of Tunisia's most beautiful coastal destinations. Immerse yourself in culture, history, and natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button 
                variant="secondary" 
                size="lg"
                asChild
              >
                <Link href="/itineraries">
                  View Itineraries
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <AnimatedContainer className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Visitors <span className="text-primary">Say About Tabarka</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from travelers who have explored the wonders of Tabarka.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Laurent",
                location: "Paris, France",
                comment: "The diving experience in Tabarka was incredible! The coral reefs are so vibrant and the underwater caves are mysterious and beautiful.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5
              },
              {
                name: "Marco Rossi",
                location: "Rome, Italy",
                comment: "As a history enthusiast, I was fascinated by the Roman ruins and the Genoese fort. The guided tours were informative and engaging.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                rating: 4
              },
              {
                name: "Aisha Ahmed",
                location: "Cairo, Egypt",
                comment: "The beaches in Tabarka are pristine and not overcrowded. I enjoyed the local cuisine and the warm hospitality of the Tunisian people.",
                avatar: "https://randomuser.me/api/portraits/women/66.jpg",
                rating: 5
              }
            ].map((testimonial, index) => (
              <AnimatedContainer
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                variants={slideUp}
                delay={0.1 * index}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-foreground italic">"{testimonial.comment}"</p>
              </AnimatedContainer>
            ))}
          </div>
          
          <AnimatedContainer className="text-center mt-12" variants={fadeIn} delay={0.5}>
            <Button asChild variant="outline">
              <Link href="/testimonials">
                View All Testimonials
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>
    </>
  );
} 