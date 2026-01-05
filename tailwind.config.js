/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'f-blue': '#2ecfff',
        'light-amber': '#f5deb3',
        'f-amber': '#ffa500',
        'f-green': '#1bff80',
        'f-white': '#c0ffff',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
        'slideIn': 'slideIn 0.5s ease-out',
        'scroll-left': 'scroll-left 30s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideIn: {
          'from': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'scroll-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'var(--f-amber)' }
        }
      }
    },
  },
  plugins: [],
}