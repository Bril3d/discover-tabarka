'use client';

import { useTheme } from 'next-themes';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/animated-button';
import { cn } from '@/lib/utils';
import { Sun, Moon, Laptop } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // After mounting, we can safely show the theme switcher
  useEffect(() => setMounted(true), []);

  const handleSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Determine current mode for the icon
  const isDarkMode = resolvedTheme === 'dark';

  // Skip rendering during SSR
  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder to avoid layout shift
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <AnimatedButton
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="icon"
        aria-label="Theme settings"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </AnimatedButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 py-2 rounded-md shadow-lg z-50 bg-card text-card-foreground border"
          >
            <p className="px-4 py-1 text-sm text-muted-foreground">Theme</p>
            <button
              onClick={() => handleSelect('light')}
              className={cn(
                "w-full text-left px-4 py-2 hover:bg-muted flex items-center space-x-2",
                theme === 'light' ? 'text-primary' : 'text-foreground'
              )}
              aria-label="Use light theme"
              tabIndex={0}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
              {theme === 'light' && (
                <svg className="h-4 w-4 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>
            
            <button
              onClick={() => handleSelect('dark')}
              className={cn(
                "w-full text-left px-4 py-2 hover:bg-muted flex items-center space-x-2",
                theme === 'dark' ? 'text-primary' : 'text-foreground'
              )}
              aria-label="Use dark theme"
              tabIndex={0}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
              {theme === 'dark' && (
                <svg className="h-4 w-4 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>
            
            <button
              onClick={() => handleSelect('system')}
              className={cn(
                "w-full text-left px-4 py-2 hover:bg-muted flex items-center space-x-2",
                theme === 'system' ? 'text-primary' : 'text-foreground'
              )}
              aria-label="Use system theme"
              tabIndex={0}
            >
              <Laptop className="h-4 w-4" />
              <span>System</span>
              {theme === 'system' && (
                <svg className="h-4 w-4 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher; 