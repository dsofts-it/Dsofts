/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb',
        brandLight: '#60a5fa',
        brandDark: '#1e3a8a',
        accent: '#3b82f6',
        accentLight: '#93c5fd',
        surface: '#0b1220'
      },
      fontFamily: {
        display: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(37,99,235,0.28), transparent 55%), radial-gradient(circle at 20% 80%, rgba(147,197,253,0.18), transparent 60%)'
      },
      boxShadow: {
        soft: '0 18px 40px rgba(37, 99, 235, 0.18)',
        glow: '0 16px 36px rgba(59, 130, 246, 0.18)'
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
