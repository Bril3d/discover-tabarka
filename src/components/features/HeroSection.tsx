'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { fadeIn, slideUp, buttonHover } from '@/lib/animations';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-10"></div>
        
        {/* This would be replaced with actual video once available */}
        {/* For now using a placeholder video or we can use an image instead */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          poster="/images/tabarka-underwater-poster.jpg"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-coral-reef-in-the-blue-sea-6170-large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 text-center text-white">
          <AnimatedSection className="space-y-6" variants={fadeIn}>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold" 
              variants={fadeIn}
            >
              <span className="block">Discover The Beauty Of</span>
              <motion.span
                className="text-primary/90 block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Tabarka
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              variants={slideUp}
            >
              Explore pristine beaches, vibrant coral reefs, and rich history in Tunisia's coastal paradise
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={slideUp}
            >
              <AnimatedButton 
                size="lg"
                className="font-medium"
                asChild
              >
                <Link href="/explore">
                  Explore Tabarka
                </Link>
              </AnimatedButton>
              <AnimatedButton 
                variant="outline"
                size="lg"
                className="text-white border-white font-medium hover:bg-white/20"
                asChild
              >
                <Link href="/gallery">
                  View Gallery
                </Link>
              </AnimatedButton>
            </motion.div>
          </AnimatedSection>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.2
            }}
          >
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </div>

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