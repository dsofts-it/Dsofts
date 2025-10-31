/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb',
        brandLight: '#60a5fa'
      }
    }
  },
  plugins: []
}

