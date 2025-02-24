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
      },
      backgroundImage: {
        'gradient-border': 'linear-gradient(to right, #4ed9f0, #0d7bec)', 
        'gradient-check': 'linear-gradient(to right, #4ef0ee, #64ec0d)', 
        'gradient-mobile': 'linear-gradient(to bottom right, rgba(78, 217, 240, 0.2), rgba(13, 123, 236, 0.2))',
      },
      fontFamily: {
        gabarito: ["Gabarito", "sans-serif"],
      },
    },
  },
  plugins: [],
}

