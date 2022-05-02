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

const header = document.querySelector(".xc-header");

window.addEventListener("scroll", function() {
  header.classList.toggle("stick", window.scrollY > 10);
})
