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
          '50': '#eff5ff',
          '100': '#d9e9fd',
          '200': '#c3d6f3',
          '300': '#a9c0e6',
          '400': '#90aada',
          '500': '#7896cf',
          '600': '#6582ba',
          '700': '#5470a6',
          '800': '#405c90',
          '900': '#2e497e',
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
  plugins: [require('@tailwindcss/forms')],
}
