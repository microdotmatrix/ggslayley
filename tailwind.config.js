module.exports = {
  content: require('fast-glob').sync([
    './**/*.hbs',
    './**/*.html',
    './js/**/*.js'
  ]),
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
