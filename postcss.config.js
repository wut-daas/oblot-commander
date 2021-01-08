/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.vue', './public/index.html'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
  ],
}
