import { Splide } from '@splidejs/splide'
import { SlideTrans } from '../util/slidetrans'

function Slider() {
  const config = {
    type: 'loop',
    rewind: true,
    width: '100%',
    updateOnMove: true,
    autoplay: true,
    interval: 4000
  }

  let splide = new Splide('.splide', config);
  splide.mount({}, SlideTrans);

}

export { Slider }
