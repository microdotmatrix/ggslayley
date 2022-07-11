import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { jarallax, jarallaxVideo } from "jarallax";

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay, EffectFade],
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
  disableVideo: /iPad|iPhone|iPod|Android/
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

function onScroll() {
  var lazyEls = document.querySelectorAll('img.lazy');
  for (var i = 0; i < laxyEls.length; i++) {
    var el = lazyEls[i];
    var pos = el.getBoundingClientRect();
    if (inViewport(pos)) {
      //
    }
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
document.querySelectorAll('img.lazy');

var pos = el.getBoundingClientRect();
if (pos.top <= window.innerHeight) {
   //
}

function inViewport(pos) {
  return (pos.top <= window.innerHeight && pos.top > 0)
    || (pos.bottom >= 0 && pos.bottom <= window.innerHeight);
}
