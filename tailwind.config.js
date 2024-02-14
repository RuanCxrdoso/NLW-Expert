/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        TITAN500: '#F2A900',
        TITAN700: '#F28900',
      }
    },
  },
  plugins: [],
}
