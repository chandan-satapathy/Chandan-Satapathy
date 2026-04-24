/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Geist', 'sans-serif'],
      },
      colors: {
        red: { DEFAULT: '#E5342A', dim: '#7A1B17', light: '#FCCAC8' },
        yellow: { DEFAULT: '#F5C842', dim: '#7A6420', light: '#FDF3CF' },
        surface: { DEFAULT: '#161616', 2: '#1E1E1E', light: '#FFFFFF', light2: '#F7F4F0' },
        border: { DEFAULT: '#2A2A2A', light: '#333', lm: '#E0DBD4', lm2: '#CCC' },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
