// Jarallax
import { jarallax, jarallaxVideo } from "jarallax";

import Swiper, { Navigation, Pagination, Parallax, Autoplay, EffectFade, EffectCreative } from 'swiper';

import luge from "@waaark/luge";

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Parallax, Autoplay, EffectFade, EffectCreative],
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  parallax: true,
  effect: 'slide',
  fadeEffect: {
    crossFade: true
  },
  speed: 900,
  autoplay: {
    delay: 99000,
  },
  loop: true,
});


jarallaxVideo();

jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.2,
});

jarallax(document.querySelectorAll('.kg-header-card'), {
  speed: 0.6,
});

//document.getElementsByTagName('body')[0].className = 'js';

const lightbox = GLightbox({
  touchNavigation: true,
  descPosition: 'right',
  selector: 'data-gallery'
});

const images = document.querySelectorAll('.kg-image-card img, .kg-gallery-card img');

// Lightbox function
images.forEach(function (image) {
  var wrapper = document.createElement('a');
  wrapper.setAttribute('data-gallery', 'kg-lightbox');
  wrapper.setAttribute('href', image.src);
  wrapper.setAttribute('aria-label', 'Click for Lightbox');
  image.parentNode.insertBefore(wrapper, image.parentNode.firstChild);
  wrapper.appendChild(image);
});
