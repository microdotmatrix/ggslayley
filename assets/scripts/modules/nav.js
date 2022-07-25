import { gsap } from 'gsap'
import $ from 'jquery'
window.$ = $;

function Nav() {
  const navAni = gsap.timeline();

  navAni.fromTo('.xc-nav', {
    duration: 1,
    opacity: 0,
    delay: 0,
    yPercent: -100,
    transformOrigin: 'right',
    ease: 'expo.in'
  },
  {
    yPercent: 0,
    opacity: 1
  });

  $('.xc-nav__burger').on('click', function() {
    var that = $('.xc-nav');
    if (that.hasClass('expand')) {
      that.removeClass('expand');
    } else {
      that.addClass('expand');
    }
    navAni.restart();
  });

  $(".burger-box").on("click", function() {
    var that = $(this);
    if (that.hasClass("is-open")) {
      that.removeClass("is-open").addClass("is-closed");
    } else {
      that.removeClass("is-closed").addClass("is-open");
    }
  });

}

export { Nav }
