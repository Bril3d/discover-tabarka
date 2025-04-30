'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/locations', label: 'Locations' },
    { href: '/itineraries', label: 'Itineraries' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-tabarka-blue-500">
            {/* Replace with actual logo when available */}
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">T</div>
          </div>
          <span className={`font-bold text-xl ${
            isScrolled 
              ? 'text-tabarka-blue-800 dark:text-tabarka-blue-300' 
              : 'text-white'
          }`}>
            Discover Tabarka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex space-x-6 items-center"
          variants={navVariants}
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link 
                href={link.href}
                className={`font-medium hover:text-tabarka-blue-500 transition-colors ${
                  isScrolled 
                    ? 'text-tabarka-blue-800 dark:text-tabarka-blue-300' 
                    : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Dark Mode Toggle */}
          <motion.div variants={itemVariants}>
            <DarkModeToggle />
          </motion.div>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className={`font-medium hover:text-tabarka-blue-500 transition-colors ${
                  isScrolled 
                    ? 'text-tabarka-blue-800 dark:text-tabarka-blue-300' 
                    : 'text-white'
                }`}
              >
                Profile
              </Link>
              <motion.button
                variants={itemVariants}
                onClick={signOut}
                className="px-4 py-2 rounded-full bg-tabarka-blue-500 text-white hover:bg-tabarka-blue-600 transition-colors"
              >
                Sign Out
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/login"
                  className={`font-medium hover:text-tabarka-blue-500 transition-colors ${
                    isScrolled 
                      ? 'text-tabarka-blue-800 dark:text-tabarka-blue-300' 
                      : 'text-white'
                  }`}
                >
                  Login
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-full bg-tabarka-blue-500 text-white hover:bg-tabarka-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <DarkModeToggle />
          <button 
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${
                isScrolled 
                  ? 'text-tabarka-blue-800 dark:text-tabarka-blue-300' 
                  : 'text-white'
              }`} 
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
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
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
                className="font-medium text-tabarka-blue-800 dark:text-tabarka-blue-300 hover:text-tabarka-blue-500 transition-colors"
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
                  className="font-medium text-tabarka-blue-800 dark:text-tabarka-blue-300 hover:text-tabarka-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-tabarka-blue-500 text-white hover:bg-tabarka-blue-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="font-medium text-tabarka-blue-800 dark:text-tabarka-blue-300 hover:text-tabarka-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-full bg-tabarka-blue-500 text-white hover:bg-tabarka-blue-600 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 