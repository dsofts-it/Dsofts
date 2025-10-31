/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#6c5ce7',
        brandLight: '#a66cff',
        brandDark: '#1b1a2e',
        accent: '#00cec9',
        accentLight: '#81ecec',
        surface: '#0a0f1f'
      },
      fontFamily: {
        display: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(166,108,255,0.28), transparent 55%), radial-gradient(circle at 20% 80%, rgba(0,206,201,0.18), transparent 60%)'
      },
      boxShadow: {
        soft: '0 18px 40px rgba(76, 92, 239, 0.18)',
        glow: '0 16px 36px rgba(0, 206, 201, 0.18)'
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
