module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // colors specified as objects to allow for defining variants
        'wut-yellow': {
          DEFAULT: '#fed542',
        },
        'wut-orange': {
          DEFAULT: '#ea7c5a',
        },
        'wut-purple': {
          DEFAULT: '#965f77',
        },
        'wut-green': {
          DEFAULT: '#6aba9c',
        },
        'wut-blue': {
          DEFAULT: '#7896cf',
        },
        'wut-gray': {
          DEFAULT: '#b4a0aa',
        },
        'wut-black': {
          DEFAULT: '#3c3c4c',
        },
        'wut-brown': {
          DEFAULT: '#645a5a',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
