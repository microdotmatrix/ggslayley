import { Splide } from '@splidejs/splide'
import { SlideTrans } from '../util/slidetrans'


export default class Slider {
  constructor() {
    const config = {
      type: 'loop',
      autoplay: true,
      interval: 4000,
      perPage: 1
    }
    document.addEventListener('DOMContentLoaded', function() {
      var splide = new Splide('.splide', config);
      splide.mount({}, SlideTrans);
    });
  }
}
