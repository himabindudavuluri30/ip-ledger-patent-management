/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4fb',
          100: '#d9e6f5',
          200: '#bcd6ee',
          300: '#8fbce2',
          400: '#5e98d2',
          500: '#3d7cc0',
          600: '#2f64a3',
          700: '#285188',
          800: '#1f3f6b',
          900: '#152a47',
          950: '#0d1a2e',
        },
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
