/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020818',
          900: '#0A0F1E',
          800: '#0D1529',
          700: '#121E3A',
          600: '#1A2B52',
        },
        sds: {
          orange: '#F97316',
          'orange-light': '#FB923C',
          'orange-dark': '#EA6C00',
          blue: '#2563EB',
          'blue-light': '#3B82F6',
          'blue-dark': '#1D4ED8',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'data-stream': 'dataStream 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    }
  },
  plugins: []
}
