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
        brand: '#6c5ce7',
        brandLight: '#a66cff',
        brandDark: '#2f2e41',
        accent: '#00cec9',
        accentLight: '#81ecec',
        surface: '#080d1a',
        frosted: 'rgba(12,25,46,0.55)'
      },
      fontFamily: {
        display: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(166,108,255,0.32), transparent 55%), radial-gradient(circle at 20% 80%, rgba(0,206,201,0.22), transparent 60%)',
        'mesh-light': 'radial-gradient(ellipse at 15% 20%, rgba(166,108,255,0.18), transparent 50%), radial-gradient(circle at 80% 0%, rgba(129,236,236,0.16), transparent 40%), linear-gradient(145deg, #f5f7ff 0%, #fdfbff 60%, #eff7ff 100%)'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(76, 92, 239, 0.18)',
        glow: '0 18px 40px rgba(0, 206, 201, 0.18)',
        glass: '0 24px 60px rgba(24, 32, 87, 0.22)',
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
