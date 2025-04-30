'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Only use after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;
  const isLightMode = mounted ? resolvedTheme === 'light' : true;
  const isSystemTheme = theme === 'system';

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const setDarkTheme = () => {
    if (!mounted) return;
    setTheme('dark');
  };

  const setLightTheme = () => {
    if (!mounted) return;
    setTheme('light');
  };

  const setSystemTheme = () => {
    if (!mounted) return;
    setTheme('system');
  };

  return {
    theme,
    setTheme,
    isDarkMode,
    isLightMode,
    isSystemTheme,
    systemTheme,
    mounted,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    setSystemTheme,
  };
}; 