let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('assets/js/app.js', 'js')
  .js('assets/js/lib.js', 'js')
  .sass('assets/scss/main.scss', 'css')
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-import'),
      require('autoprefixer'),
      require('tailwindcss'),
      require('postcss-svgicon')({
        path: 'assets/svg/ion'
      }),
      tailwindcss('tailwind.config.js')
    ],
  })
  .setPublicPath('assets/dist')
  .browserSync({
    proxy: 'localhost:2368',
    port: 8080,
    files: [
      '**/*.hbs',
      'assets/dist/js/app.js',
      'assets/dist/css/main.css'
    ]
  })
  //.copy('assets/fonts', 'assets/dist/fonts')
  //.copy([
  //  'assets/svg/mandalas.svg',
  //  'assets/svg/utility.svg',
  //  'assets/svg/social.svg'
  //], 'assets/dist/svg')
  //.copy('assets/video/mk-lightwarp.mp4', 'assets/dist/video')
  //.copy('assets/video', 'assets/dist/video')
  //.autoload({
  //  jquery: ['$', 'window.jQuery']
  //})
;
