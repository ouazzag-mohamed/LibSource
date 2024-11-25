new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 15, // l'espace bin les slide
    slidesPerView: 1, // pour le mobil
  
    breakpoints: {
      640: {
        slidesPerView: 2, // tele 2 cards
      },
      768: {
        slidesPerView: 3, // 3 l tablet
      },
      1024: {
        slidesPerView: 4, // 4 l pc o desktop
      },
    },
    autoplay: {
      delay: 3000, // lw9t hh (3 seconds)
      disableOnInteraction: false, // wakh t9ishom ghayb9aw khdamin
    },
    speed:1000,
    
  });

  document.getElementById("semester-select").addEventListener("change", function () {
    const selectedValue = this.value;
  
    // Hide all semester sections
    document.querySelectorAll(".semester").forEach(section => {
      section.classList.remove("active");
    });
  
    // Show the selected semester section
    document.getElementById(selectedValue).classList.add("active");
  });
  
  