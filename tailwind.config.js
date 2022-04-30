module.exports = {
  content: require('fast-glob').sync([
    './**/*.hbs',
    './**/*.html',
    './assets/js/**/*.js'
  ]),
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
