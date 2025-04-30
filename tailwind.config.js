/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sea-inspired colors
        'tabarka-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Coral reef-inspired colors
        'tabarka-coral': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Beach sand colors
        'tabarka-sand': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Mountain/landscape colors
        'tabarka-earth': {
          50: '#f6f7f1',
          100: '#e3e6d8',
          200: '#c7cdb4',
          300: '#a9b28c',
          400: '#8c976c',
          500: '#6f7c52',
          600: '#5a6542',
          700: '#454e33',
          800: '#2f3722',
          900: '#1a1f13',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.tabarka-blue.600'),
              '&:hover': {
                color: theme('colors.tabarka-blue.800'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.900'),
              fontWeight: theme('fontWeight.bold'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.tabarka-blue.400'),
              '&:hover': {
                color: theme('colors.tabarka-blue.300'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 