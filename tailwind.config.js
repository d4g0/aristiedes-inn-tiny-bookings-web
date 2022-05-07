const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');


module.exports = {
  content: [],
  // darkMode: 'false', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        brand: {
          DEFAULT: colors.blue['600'],
        },
      },
    },
  },
  plugins: [],
}
