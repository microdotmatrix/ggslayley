// import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
// import { jarallax, jarallaxVideo } from "jarallax";
import './modules/shop/v1'

import { Nav } from './modules/nav';
import { Slider } from './modules/slider';
Nav();
Slider();

// import { Shop } from './modules/shop/featured';
// Shop();

import Header from './modules/header';
import Lightbox from './modules/lightbox';
// import Slider from './modules/slider';
// import { SlideTrans } from './util/slidetrans'

//Lightbox();
//Header();
// new Slider();


// jarallaxVideo();
// jarallax(document.querySelectorAll('.jarallax'), {
//   speed: 0.2,
// });
// jarallax(document.querySelectorAll('.parallax-container'), {
//   speed: -0.6,
//   disableVideo: /iPad|iPhone|iPod|Android/
// });
// jarallax(document.querySelectorAll('.xc-hero__feature-image'), {
//   type: 'scroll-opacity',
//   imgElement: 'img',
//   speed: 0.4,
// });


// function onScroll() {
//   var lazyEls = document.querySelectorAll('img.lazy');
//   for (var i = 0; i < lazyEls.length; i++) {
//     var el = lazyEls[i];
//     var pos = el.getBoundingClientRect();
//     if (inViewport(pos)) {
//       //
//     }
//   }
// }
//
// window.addEventListener('scroll', onScroll, { passive: true });
// document.querySelectorAll('img.lazy');
//
// function inViewport(pos) {
//   return (pos.top <= window.innerHeight && pos.top > 0)
//     || (pos.bottom >= 0 && pos.bottom <= window.innerHeight);
// }
