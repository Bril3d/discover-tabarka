'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { fadeIn, slideUp, buttonHover } from '@/lib/animations';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure the animation looks smooth
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-tabarka-blue-900 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-70"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/tabarka-underwater.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-tabarka-blue-950/90 via-tabarka-blue-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 lg:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isVideoLoaded ? "visible" : "hidden"}
          className="max-w-4xl"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            variants={slideUp}
            initial="hidden"
            animate={isVideoLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Discover the Hidden Treasures of{' '}
            <span className="text-tabarka-coral-400">Tabarka</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
            variants={slideUp}
            initial="hidden"
            animate={isVideoLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            Explore the breathtaking underwater world, historical sites, and natural beauty 
            of Tunisia's coastal gem.
          </motion.p>
          
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={isVideoLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <AnimatedButton 
              size="lg" 
              withGlow 
              glowColor="coral"
              glowIntensity={0.7}
              className="bg-tabarka-coral-500 hover:bg-tabarka-coral-600 text-white"
            >
              Explore Destinations
            </AnimatedButton>
            
            <AnimatedButton 
              size="lg"
              variant="outline"
              withGlow
              glowColor="blue"
              className="border-white text-white hover:bg-tabarka-blue-900/30"
            >
              Plan Your Visit
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVideoLoaded ? 1 : 0, 
          y: 0,
          transition: { 
            delay: 1,
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
          <svg 
            className="w-6 h-6 text-white/80" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </motion.div>

      {/* Wave overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            fill="currentColor"
            className="text-background" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,256C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection; 