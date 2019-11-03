$(document).ready(function () {

   // The navigation background has to have a background on a page refresh if scrolled below 50px
   if ($(window).scrollTop() > 50) {
      $(".home.navbar").toggleClass("bg-mirage");
   }

   // The navigation background appears after scrolling down, otherwise it has to be transparent
   $(window).scroll(function () {
      if (!$(".nav-icon").hasClass("change")) {
         $(".home.navbar").toggleClass("bg-mirage", $(this).scrollTop() > 50);
      }
   });

   // This function will start progress bar animations when the user first scrolls to them
   function animateOnViewport(onElement, elements, offset, delay) {
      let viewport = false;
      $(window).on("scroll", function () {
         if ($(window).scrollTop() + $(window).height() - offset >= $(onElement).offset().top && viewport === false) {
            $(onElement + " " + elements).each(function (i) {
               $(this).delay(delay * i).animate({ width: $(this).attr("aria-valuenow") + "%" });
            });
            viewport = true;
         }
      });
   }

   // We also check if the elements exist before performing any actions, because some elements don't exist on all sites
   if ($("#coding-languages").length) {
      animateOnViewport("#coding-languages", ".progress-bar", 80, 500);
   }
   
   if ($("#languages").length) {
      animateOnViewport("#languages", ".progress-bar", 80, 800);
   }

   // This will start the software skills radial progress animations when the user first scrolls to them
   if ($("#software-skills").length) {
      let viewport = false;
      $(window).on("scroll", function () {
         if ($(window).scrollTop() + $(window).height() >= $("#software-skills").offset().top && viewport === false) {
            $(".progress-radial").each(function (i) {
               let radialObj = radialIndicator(this, {
                  barColor: $(this).attr("data-color"),
                  fontFamily: "Montserrat",
                  radius: 44,
                  barWidth: 9,
                  initValue: 0,
                  percentage: true,
                  frameTime: 25 + ((i++) * 6)
               });
               radialObj.animate($(this).attr("aria-valuenow"));
            });
            viewport = true;
         }
      });
   }

   // Navigation smooth scrolling to anchor links
   $(document).on("click", 'a[href^="#"]', function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: $($.attr(this, "href")).offset().top - 40 }, 500);
   });

   // Class toggle for navigation hamburger icon and navbar background
   $(".nav-icon").click(function () {
      $(this).toggleClass("change");
      if (!$(".navbar").hasClass("bg-mirage")) {
         $(".navbar").toggleClass("bg-mirage");
      }
   });

   // Setting the menu active link class
   $(".nav-item a").on("click", function () {
      $(".navbar-nav").find("a.active").removeClass("active");
      $(this).addClass("active");
   });

   // Activate scrollspy to add active class to navbar items on scroll
   $('body').scrollspy({
      target: '#main-nav',
      offset: 100
   });

   // Venobox initialization
   $('.venobox').venobox({
      titlePosition: 'bottom',
   });

   // Owl carousel initialization
   $('.owl-carousel').owlCarousel({
      dots: true,
      margin: 10,
      responsive: {
         0: {
            items: 2
         },
         768: {
            items: 3
         },
      }
   })

   // $("#submit-button").on("click", function (event) {
   //    event.preventDefault();
   // });
});
