'use client';

import { motion } from 'framer-motion';
import TimelineComponent from '@/components/features/TimelineComponent';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function HistoryPage() {
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
            Discover <span className="text-primary">Tabarka's Rich History</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From ancient Phoenician roots to modern-day tourism destination, explore the fascinating journey of this coastal gem through the centuries.
          </p>
        </motion.div>
        
        {/* Introduction with image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card dark:bg-card rounded-xl shadow-md overflow-hidden mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                A Crossroads of Civilizations
              </h2>
              <p className="text-muted-foreground mb-4">
                Nestled between the Mediterranean Sea and the Kroumirie Mountains, Tabarka has been a strategic location and cultural melting pot for thousands of years. Its natural harbor and rich resources attracted settlers and traders from across the Mediterranean.
              </p>
              <p className="text-muted-foreground">
                From Phoenician traders to Roman settlers, from Genoese coral fishers to Ottoman rulers, each civilization has left its mark on this beautiful coastal town, creating a uniquely rich historical tapestry that continues to fascinate visitors today.
              </p>
            </div>
            <div className="relative h-64 md:h-auto overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552406612-3bfff359cd4e"
                alt="Historic Genoese Fort in Tabarka"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-l"></div>
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white z-10">
                <h3 className="text-xl font-semibold">Genoese Fort</h3>
                <p className="text-sm">16th Century landmark</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Explore Tabarka Through The Ages
            </h2>
            <div className="ml-4 h-px bg-border flex-grow hidden md:block"></div>
          </div>
          <TimelineComponent />
        </motion.div>
        
        {/* Historical Sites Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Visit Historical Sites
            </h2>
            <div className="ml-4 h-px bg-border flex-grow hidden md:block"></div>
          </div>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Experience Tabarka's history firsthand by visiting these remarkable historical landmarks, each telling a unique chapter of the region's story.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Genoese Fort',
                image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
                description: 'Iconic fortress built by Genoese in the 16th century to protect their coral fishing interests.',
                period: 'Colonial'
              },
              {
                title: 'Roman Ruins of Bulla Regia',
                image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
                description: 'Remarkable underground Roman villas with well-preserved mosaics from the 2nd century.',
                period: 'Ancient'
              },
              {
                title: 'Old Tabarka City Center',
                image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
                description: 'Historic district featuring traditional architecture and vibrant markets with centuries of history.',
                period: 'Various Eras'
              }
            ].map((site, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all h-full">
                  <div className="relative h-48">
                    <Image
                      src={site.image}
                      alt={site.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-primary text-primary-foreground">
                        {site.period}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-bold mb-1">{site.title}</h3>
                    </div>
                  </div>
                  <CardContent className="py-4">
                    <p className="text-muted-foreground text-sm">{site.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" asChild className="px-0 text-primary group">
                      <Link href={`/locations?category=historical`} className="flex items-center">
                        View Details
                        <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-muted rounded-xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Share Your Historical Discoveries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Have you visited a historical site in Tabarka or uncovered information about its past? Share your photos, stories, and findings with our community.
          </p>
          <Button
            size="lg"
            className="group"
            asChild
          >
            <Link href="/submit" className="inline-flex items-center">
              Submit Your Discovery
              <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 