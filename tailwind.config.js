/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // Safelist dynamic classes that might be purged incorrectly
  safelist: [
    'text-terminal-green',
    'text-nord-8',
    'text-nord-9',
    'text-nord-10',
    'bg-nord-0',
    'bg-nord-1',
    'bg-nord-2',
    'bg-nord-3',
    // Add any dynamically generated classes here
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced Nord Color Palette
        nord: {
          0: 'rgb(var(--nord-0) / <alpha-value>)',   // Polar Night (darkest)
          1: 'rgb(var(--nord-1) / <alpha-value>)',
          2: 'rgb(var(--nord-2) / <alpha-value>)',
          3: 'rgb(var(--nord-3) / <alpha-value>)',
          4: 'rgb(var(--nord-4) / <alpha-value>)',   // Snow Storm (lightest)
          5: 'rgb(var(--nord-5) / <alpha-value>)',
          6: 'rgb(var(--nord-6) / <alpha-value>)',
          7: 'rgb(var(--nord-7) / <alpha-value>)',   // Frost (cyan)
          8: 'rgb(var(--nord-8) / <alpha-value>)',
          9: 'rgb(var(--nord-9) / <alpha-value>)',
          10: 'rgb(var(--nord-10) / <alpha-value>)',
          11: 'rgb(var(--nord-11) / <alpha-value>)',  // Aurora (red)
          12: 'rgb(var(--nord-12) / <alpha-value>)',  // Orange
          13: 'rgb(var(--nord-13) / <alpha-value>)',  // Yellow
          14: 'rgb(var(--nord-14) / <alpha-value>)',  // Green
          15: 'rgb(var(--nord-15) / <alpha-value>)',  // Purple
        },
        // Semantic Colors
        primary: {
          DEFAULT: '#88C0D0', // Nord 8
          hover: '#81A1C1',   // Nord 9
          active: '#5E81AC',  // Nord 10
        },
        secondary: {
          DEFAULT: '#4C566A', // Nord 3
          hover: '#434C5E',   // Nord 2
        },
        success: '#A3BE8C',   // Nord 14
        warning: '#EBCB8B',   // Nord 13
        error: '#BF616A',     // Nord 11
        info: '#81A1C1',      // Nord 9
        
        // Terminal colors
        terminal: {
          green: '#00FF00',
          amber: '#FFBF00',
          red: '#FF0000',
          cyan: '#00FFFF',
        },
        
        // Dark/Light mode semantic tokens
        background: {
          light: 'rgb(var(--nord-6) / <alpha-value>)',
          dark: 'rgb(var(--nord-0) / <alpha-value>)',
        },
        foreground: {
          light: 'rgb(var(--nord-0) / <alpha-value>)',
          dark: 'rgb(var(--nord-6) / <alpha-value>)',
        }
      },
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'terminal-blink': 'blink 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(136, 192, 208, 0.5)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(136, 192, 208, 0.8)',
            filter: 'brightness(1.2)'
          },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(136, 192, 208, 0.5)',
        'glow-md': '0 0 20px rgba(136, 192, 208, 0.6)',
        'glow-lg': '0 0 30px rgba(136, 192, 208, 0.7)',
        'glow-xl': '0 0 40px rgba(136, 192, 208, 0.8)',
        'terminal': '0 0 15px rgba(0, 255, 0, 0.5)',
        'terminal-strong': '0 0 25px rgba(0, 255, 0, 0.7)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'elevated-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(136, 192, 208, 0.3)',
        'colored-glow': '0 0 20px rgba(136, 192, 208, 0.5), 0 0 40px rgba(136, 192, 208, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
