// import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
// import { jarallax, jarallaxVideo } from "jarallax";

// import Lightbox from './modules/lightbox';
import Header from './modules/header';
// import Slider from './modules/slider';

import { Splide } from '@splidejs/splide'
// import { SlideTrans } from './util/slidetrans'

const config = {
  type: 'loop',
  height     : '9rem',
}

document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', config);
  splide.mount();
});
// new Lightbox();
new Header();
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
