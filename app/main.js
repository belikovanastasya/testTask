/*IMPORTS*/
import $ from 'jquery';
import viewportChecker from 'jquery-viewport-checker';
import { TimelineMax } from 'gsap';
import { bootstrap } from 'bootstrap';
import './js/libs/slick.min.js';
import './sass/main.sass';
/*IMPORTS*/


const removeBtn = $('.btn_delete');
const deleteBtn = $('.delete');
const slider = $('.store_slider');
const input = $('#email');
const reg = /^\w+@\w+\.[a-z]{2,}$/;

const removeItem = function (elem) {
  let tl = new TimelineMax();
  tl.to(elem, 0.5, { scale: 0 })
    .to(elem, 0.1, { display: 'none' })
}
const findRemoveElem = function (e) {
  e.preventDefault();
  let removeElem = $(this).parents('.product_list__item')
  removeItem(removeElem);
}

removeBtn.click(findRemoveElem);
deleteBtn.click(findRemoveElem);

slider.slick({
  arrows: false,
  autoplay: true,
  infinite: true,
  slidesToShow: 4,
  speed: 500,
  dots: false,
  responsive: [{
    breakpoint: 769,
    settings: {
      slidesToShow: 1
    }
  },
  {
    breakpoint: 1025,
    settings: {
      slidesToShow: 2
    }
  }]
});

const formValidation = function (elem) {
  elem.blur(function (e) {
    if (reg.test($(this).val())) {
      elem.parent().removeClass('invalid').addClass('valid');
    }
    else {
      elem.parent().removeClass('valid').addClass('invalid');
    }
  })
}
formValidation(input);









