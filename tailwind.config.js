const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');


module.exports = {
  content: [
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        brand: {
          DEFAULT: colors.blue['600'],
        },
        type: {
          'on-light': '#24292f',
          'on-dark': '#adbac7'
        },
        surface: {
          light: '#fff',
          'light-dim': '#adbac7',
          dark: '#1c2128'
        }
      },

      fontFamily: {
        // Satoshi
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
