import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary
        primary: {
          DEFAULT: '#0D0D0D',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#0D0D0D',
        },
        
        // Brand Accents
        accent: {
          green: {
            DEFAULT: '#6EE7B7',
            50: '#f0fdf9',
            100: '#ccfbef',
            200: '#99f6e0',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#6EE7B7',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          blue: {
            DEFAULT: '#3B82F6',
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3B82F6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
        },

        // Soft Neutrals
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },

        // Keep existing coral colors for backward compatibility
        coral: {
          50: '#fef7f6',
          100: '#fde8e5',
          200: '#fbc4bc',
          300: '#f89d92',
          400: '#ff8a6a',
          500: '#ff6e5a',
          600: '#e55a47',
        },

        // Warm white
        'warm-white': '#faf9f7',
      },
      
      fontFamily: {
        'instrument': ['var(--font-philosopher)', 'serif'],
        'carlita': ['var(--font-mulish)', 'sans-serif'],
        'handwriting': ['var(--font-handwriting)', 'cursive'],
        'sans': ['var(--font-mulish)', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
        'philosopher': ['var(--font-philosopher)', 'serif'],
        'mulish': ['var(--font-mulish)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'orbit': ['var(--font-orbit)', 'sans-serif'],
      },

      animation: {
        'gradient-shift': 'gradient-shift 25s ease-in-out infinite',
        'handwriting-appear': 'handwriting-appear 0.8s ease-out forwards',
        'strikethrough': 'strikethrough 0.8s ease-in-out forwards',
      },

      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 
            'background-position': '20% 30%, 70% 60%, 40% 80%, 10% 10%' 
          },
          '25%': { 
            'background-position': '25% 35%, 75% 55%, 45% 75%, 15% 15%' 
          },
          '50%': { 
            'background-position': '30% 40%, 80% 50%, 50% 70%, 20% 20%' 
          },
          '75%': { 
            'background-position': '25% 35%, 75% 55%, 45% 75%, 15% 15%' 
          },
        },
        'handwriting-appear': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(10px) rotate(-2deg) scale(0.9)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) rotate(-2deg) scale(1)' 
          },
        },
        'strikethrough': {
          '0%': { 
            width: '0%' 
          },
          '100%': { 
            width: '100%' 
          },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
