'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { AnimatedHeader } from '@/components/ui/animated-header';
import { AnimatedButton } from '@/components/ui/animated-button';
import { fadeIn, slideInLeft, slideInRight, slideUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/locations', label: 'Locations' },
    { href: '/itineraries', label: 'Itineraries' },
    { href: '/history', label: 'History' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        ease: "easeOut" 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatedHeader 
      withShadow={true} 
      transparentAtTop={true}
      shrinkOnScroll={true}
      scrollThreshold={50}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-primary">
            {/* Replace with actual logo when available */}
            <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-xl">T</div>
          </div>
          <span className="font-bold text-xl text-foreground">
            Discover Tabarka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex space-x-6 items-center"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link 
                href={link.href}
                className="font-medium hover:text-primary transition-colors text-foreground"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Theme Switcher */}
          <motion.div variants={itemVariants}>
            <ThemeSwitcher />
          </motion.div>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="font-medium hover:text-primary transition-colors text-foreground"
              >
                Profile
              </Link>
              <AnimatedButton
                variants={itemVariants}
                onClick={signOut}
                variant="default"
                size="sm"
              >
                Sign Out
              </AnimatedButton>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/login"
                  className="font-medium hover:text-primary transition-colors text-foreground"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <AnimatedButton
                  variant="default"
                  size="sm"
                  asChild
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/register">
                    Sign Up
                  </Link>
                </AnimatedButton>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeSwitcher />
          <button 
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-foreground" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-background border-t shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Buttons for mobile */}
            {user ? (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/profile"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <AnimatedButton
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  variant="default"
                  className="w-full justify-center"
                >
                  Sign Out
                </AnimatedButton>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <AnimatedButton
                  variant="default"
                  className="w-full justify-center"
                  asChild
                >
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </AnimatedButton>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatedHeader>
  );
};

export default Navbar; 