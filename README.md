Slayley.com
======
### Built using [Ghost CMS](https://ghost.org)

Front end built to serve media-focused, primarily original content made by creator and presented in two primary forms: a portfolio for aesthetic designs and artwork, and an integrated eCommerce platform for selling original creations and customized dropship items.

*Original front end theme for Ghost designed from the most basic elements of Ghost's Starter Template. Coded to integrate a unique blend of static as well as dynamically rendered content that enables the business owner to make changes to the site with autonomy and confidence.*

---
#### Tools & Packages Used:
* [Ghost CMS](https://ghost.org)
* [Handlebars.js](https://handlebarsjs.com)
* [Node.js](https://nodejs.org)
* [Sass](https://sass-lang.com) + [PostCSS](https://postcss.org)
* [Laravel Mix Webpack](https://github.com/laravel-mix/laravel-mix)
* [Gulp](https://gulpjs.com)

#### Libraries & Plugins:
* [Gerillass](https://gerillass.com) SCSS Toolkit
* [TailwindCSS](https://tailwindcss.com) v3
* [Accoutrement](https://github.com/oddbird/accoutrement)
* [Luge](https://github.com/AntoineW/luge)
* [Jarallax](https://github.com/nk-o/jarallax)
* [jQuery](https://jquery.com)
* [GSAP](https://greensock.com)
* [GLightbox](https://github.com/biati-digital/glightbox)
* [jQuery Swiper](https://swiper.js)
* [Isotope JS](https://isotope.metafizzy.co)
* [Bootstrap Icons](https://icons.getbootstrap.com)

Site Structure:
------
### Home Page
- Content slider/carousel displaying featured posts, shop items, etc. (new content tagged "Featured", either in CMS or in [Shopify](https://shopify.com))
---
### Art Page
- Original content displayed in responsive masonry grid using [Isotope JS](https://isotope.metafizzy.co/) library
- Grid items sortable based on categories with Isotope JS sorting filter function
- Images viewable using [GLightbox](https://github.com/biati-digital/glightbox)
---
### Shop Page
- Basic eCommerce integration with Shopify's [JS Buy SDK](https://github.com/shopify/jsbuysdk). Several categories of original products and drop ship items pulled from connected Shopify Admin through SDK, using data-attributes to pass identifiers such as Collection or Product ID. Fetch Queries written to pull newest products in descending order with additional sort/display options based on tags for items in Shopify.
- Shopping cart modal that directs to Shopify secured transaction cart in new tab upon checkout.
---
### About Page
- Basic page template reconfigured to accomodate a biographical info section for client
---
### Contact Page
- Basic page template reconfigured to display user controlled content alongside a basic email contact form.

## Deployment

This site is hosted on Digital Ocean using a Ghost CMS configured Droplet server, running Ubuntu 20.04 and Node.js.
All changes and updates to the theme are deployed using the handy Theme Deployment Action configured through this repo on Github.

