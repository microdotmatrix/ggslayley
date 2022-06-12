let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

if (mix.inProduction()) {
  mix.js('assets/js/app.js', 'js').extract()
  mix.sass('assets/scss/main.scss', 'css')
  mix.options({
      terser: {},
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
      ]
    })
  mix.setPublicPath('assets/dist')
  mix.copy('assets/svg/bootstrap-icons.svg', 'assets/dist/svg');
  mix.version();
  mix.sourceMaps();
} else {
  mix.js('assets/js/app.js', 'js')
  mix.sass('assets/scss/main.scss', 'css')
  mix.options({
      processCssUrls: false,
      postCss: [
        require('postcss-import'),
        require('autoprefixer'),
        require('tailwindcss'),
        tailwindcss('tailwind.config.js')
      ]
    })
  mix.setPublicPath('assets/dist')
  mix.browserSync({
      proxy: 'localhost:2368',
      port: 8080,
      files: [
        '**/*.hbs',
        'assets/dist/js/app.js',
        'assets/dist/js/lib.js',
        'assets/dist/css/main.css'
      ]
    })
  mix.copy('assets/svg/bootstrap-icons.svg', 'assets/dist/svg');
}

