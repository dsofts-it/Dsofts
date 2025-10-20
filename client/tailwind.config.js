/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1d4ed8',
        brandLight: '#3b82f6',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(18,75,67,0.25)'
      }
    },
  },
  plugins: [],
};
