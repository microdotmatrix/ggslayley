import GLightbox from 'glightbox';

export default class Lightbox {
  constructor() {
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
  }
};
