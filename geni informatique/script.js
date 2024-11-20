new Swiper('.card-wrapper', {

    loop: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoint:{
        0:{
            slidesPreView: 1
        },
        768: {
            slidesPreView: 2
        },
        1024: {
            slidesPreView : 3
        },
    }
  
  });