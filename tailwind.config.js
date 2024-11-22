/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'maven-pro': ['Maven Pro', 'sans-serif'],
      },
      colors: {
        'custom-primary': '#FFFFFF',
        'custom-secondary': '#040F0F',
        'custom-tertiary': '#008005',
        'custom-quaternary': '#FFFFFF',
        'custom-quinary': '#008005',
      },
      boxShadow:{
        'custom-quas': '0px 3px 6px #4B9AB7, 0px 3px 6px #4B9AB7',
        'custom-dashboard' : '#FCFBFB 0px 1px 5px',
        'custom-option-dashboar' : '#313539 0px 1px 5px',
        'custom-inset': '#313539 1px 1px 1px 0px inset, #313539 -1px -1px 1px 0px inset',
      }
    },
  },
  plugins: [],
}

