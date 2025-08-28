/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1.25rem',
      },
      colors: {
        // Aurora Hope Palette - Psychology-based colors for crisis resources
        aurora: {
          indigo700: '#1B2A5B', // Trust, primary brand
          indigo500: '#2B50E2', // Action buttons, CTAs
          azure400: '#3EC6FF',   // Focus states, hover effects
          emerald500: '#14B8A6', // Support actions, positive
          fuchsia500: '#A855F7', // Education highlights
          crimson600: '#E11D48', // EMERGENCY ONLY
        },
        ink900: '#0F172A',      // Deep text
        canvasTint: '#F6F8FF',  // Subtle backgrounds
        // Design Brief 2025 - Warm Brand Colors
        'compassion-coral': {
          50: '#fff1f4',
          100: '#ffe4e9', 
          200: '#ffcdd8',
          300: '#ff9bb8',
          400: '#ff6b9d', // Primary brand color
          500: '#ff4084',
          600: '#ed1565',
          700: '#c90646',
          800: '#a7083c',
          900: '#8c0a37',
        },
        'trust-teal': {
          50: '#edfffe',
          100: '#d2fffe',
          200: '#a9fffd',
          300: '#6cfffb',
          400: '#4ecdc4', // Primary brand color
          500: '#2dd4bf',
          600: '#14b8a6',
          700: '#0f9888',
          800: '#0d7568',
          900: '#0f5f56',
        },
        'hope-mint': {
          50: '#f0fdfd',
          100: '#ccfbf9',
          200: '#9af6f3',
          300: '#5eebe8',
          400: '#45b7b8', // Primary brand color
          500: '#26a69a',
          600: '#1f867f',
          700: '#1d6b66',
          800: '#1b5653',
          900: '#1a4846',
        },
        'warm-slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#6c7b7f', // Primary brand color
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'soft-cream': {
          50: '#fff8f0', // Primary brand color
          100: '#fef3e2',
          200: '#fce7c5',
          300: '#f9d49d',
          400: '#f5b968',
          500: '#f1a23f',
          600: '#e28c28',
          700: '#bc701e',
          800: '#975a1e',
          900: '#7c4a1d',
        },
        'success-sage': {
          50: '#f0f9f4',
          100: '#dcf3e5',
          200: '#bbe7cd',
          300: '#8cd4aa',
          400: '#69b578', // Primary brand color
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#14532d',
        },
        // Alert Colors
        'urgent-coral': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#ffced1',
          300: '#ffa6ad',
          400: '#ff5757', // Primary alert color
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        'warning-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#ffb347', // Primary warning color
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'success-forest': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#2ecc71', // Primary success color
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
    },
  },
  plugins: [],
}