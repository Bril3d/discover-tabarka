# Dark Mode Implementation with next-themes

This document explains how dark mode is implemented in the Discover Tabarka project using the `next-themes` library.

## Overview

We use `next-themes` to handle theme switching between light, dark, and system preferences. The implementation provides:

- Automatic detection of system preferences
- Theme persistence between page loads
- No flash of unstyled content (FOUC) during page load
- Smooth transitions between themes
- Accessibility features for screen readers and keyboard navigation

## Components Structure

The dark mode implementation consists of several key components:

1. **ThemeProvider**: Wraps the application and manages theme state
2. **useTheme Hook**: Custom hook for convenient theme manipulation
3. **DarkModeToggle**: Simple toggle button for switching between light and dark modes
4. **ThemeSwitcher**: Advanced dropdown with options for light, dark, and system themes

## Usage

### Basic Theme Toggle

To use the basic dark mode toggle in a component:

```tsx
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <DarkModeToggle />
    </div>
  );
};
```

### Advanced Theme Switcher

For more options (light, dark, system), use the ThemeSwitcher:

```tsx
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <ThemeSwitcher />
    </div>
  );
};
```

### Using the useTheme Hook

For programmatic theme control:

```tsx
'use client';

import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const { 
    isDarkMode,
    toggleTheme, 
    setDarkTheme, 
    setLightTheme,
    setSystemTheme 
  } = useTheme();

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={setDarkTheme}>Dark Mode</button>
      <button onClick={setLightTheme}>Light Mode</button>
      <button onClick={setSystemTheme}>System Preference</button>
    </div>
  );
};
```

## Styling for Dark Mode

Use Tailwind's dark mode classes in your components:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode compatible content
</div>
```

## Customization

### Changing Default Theme

To change the default theme, modify the `ThemeProvider` component:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system" // Change to "dark" or "light"
  enableSystem
>
  {children}
</ThemeProvider>
```

### Adding Custom Themes

To add custom themes beyond light and dark:

1. Modify the `ThemeProvider` component:

```tsx
<ThemeProvider
  attribute="class" 
  defaultTheme="system"
  enableSystem
  themes={['light', 'dark', 'blue', 'pink']}
>
  {children}
</ThemeProvider>
```

2. Update your CSS classes to support the new themes.

## Troubleshooting

### Hydration Mismatch

If you see hydration mismatches in console, ensure all theme components are client-side with `'use client'` directive and use the `mounted` check before rendering theme UI.

### Flash of Unstyled Content

If you see a flash of the wrong theme on page load, make sure:

1. The ThemeProvider is properly configured in the root layout
2. You're not server-side rendering theme-specific UI without a mounted check 