$(document).ready(function(){
    $('.carousel').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: true
    });
  
    $('.carousel img').css({
      'display': 'block',
      'margin': '0 auto',
      'width': '100%',
      'max-width': '600px',
      'height': '400px',
      'object-fit': 'cover'
    });
  });
  