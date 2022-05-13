let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('assets/js/app.js', 'js')
  //.js('assets/js/lib.js', 'js')
  .sass('assets/scss/main.scss', 'css')
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-import'),
      require('autoprefixer'),
      require('tailwindcss'),
      require('cssnano')({
        preset: ['default', {
            discardComments: {
                removeAll: true
            }
        }]
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
      'assets/dist/js/lib.js',
      'assets/dist/css/main.css'
    ]
  })
  .copy('assets/svg/bootstrap-icons.svg', 'assets/dist/svg')
;
