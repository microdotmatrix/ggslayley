// Jarallax
import { jarallax, jarallaxVideo } from "jarallax";

import Swiper, { Navigation, Pagination, Parallax, Autoplay, EffectFade, EffectCreative, Manipulation } from 'swiper';

import luge from "@waaark/luge";

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Parallax, Autoplay, EffectFade, EffectCreative],
  slidesPerView: 1,
  navigation: {
    nextEl: '.slide__nav-next',
    prevEl: '.slide__nav-prev',
  },
  pagination: {
    el: '.slide__nav-pagination',
    type: 'bullets',
    clickable: true,
  },
  enabled: true,
  breakpoints: {
    768: {
      enabled: true,
      parallax: true,
      effect: 'slide',
      fadeEffect: {
        crossFade: true
      },
      speed: 900,
      autoplay: {
        delay: 5000,
      },
      rewind: true,
    }
  }
});


jarallaxVideo();

jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.2,
});

jarallax(document.querySelectorAll('.parallax-container'), {
  speed: -0.6,
});


jarallax(document.querySelectorAll('.xc-hero__feature-image'), {
  type: 'scroll-opacity',
  imgElement: 'img',
  speed: 0.4,
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

window.addEventListener("scroll", function () {
  header.classList.toggle("stick", window.scrollY > 10);
  $('.xc-body').toggleClass("adjust", window.scrollY > 10);
});

import lazySizes from 'lazysizes';

lazySizes.cfg.lazyClass = 'lethargy';

$('img').addClass('lethargy');
