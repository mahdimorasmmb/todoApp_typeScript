/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'PRIMARY_COLOR':"#2f80ed",
        'SECONDARY_COLOR':"#f2994a",
        'BG_COLOR':'#f2f2f2',
        'TEXT_COLOR':'#333333',
        'INVERSE_TEXT_COLOR':'#ffffff',
        'WHITE':'#ffffff'
      }
    },
  },
  plugins: [],
}