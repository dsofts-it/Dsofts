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
        brand: '#2563eb',
        brandLight: '#60a5fa',
        brandDark: '#1e3a8a',
        accent: '#3b82f6',
        accentLight: '#93c5fd',
        surface: '#0b1220',
        frosted: 'rgba(30,64,175,0.45)'
      },
      fontFamily: {
        display: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(37,99,235,0.28), transparent 55%), radial-gradient(circle at 20% 80%, rgba(147,197,253,0.22), transparent 60%)',
        'mesh-light': 'radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.20), transparent 50%), radial-gradient(circle at 80% 0%, rgba(147,197,253,0.18), transparent 40%), linear-gradient(145deg, #f5f9ff 0%, #ffffff 60%, #eef6ff 100%)'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(37, 99, 235, 0.18)',
        glow: '0 18px 40px rgba(59, 130, 246, 0.18)',
        glass: '0 24px 60px rgba(15, 23, 42, 0.22)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.65)'
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        shine: 'shine 1.8s linear infinite'
      }
    },
  },
  plugins: [],
};
