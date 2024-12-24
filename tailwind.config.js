/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    container: {
      padding: '20px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors:{
        primary: '#a5f3fc',
        dark: '#0f172a',
      },
      screens:{
        '2xl': '1320px',
      }
    },
  },
  plugins: [],
}

