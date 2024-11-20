new Swiper('.swiper', {
    loop: true,
    spaceBetween: 15, // Reduced space between slides
    slidesPerView: 1, // Default for mobile
  
    breakpoints: {
      640: {
        slidesPerView: 2, // Two cards for small screens
      },
      768: {
        slidesPerView: 3, // Three cards for tablets
      },
      1024: {
        slidesPerView: 4, // Four cards for desktops
      },
    },
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  