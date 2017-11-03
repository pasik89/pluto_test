$(document).ready(function() {
  $('[data-accordion]').foundation();
  $('[data-accordion-item]').foundation();
  $('[data-tab-content]').foundation();
    //initialize swiper when document ready

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        direction: 'horizontal',
        loop: true
    });

    function expandSearch() {
        const searchInput = $('.input-search'),
              expandBtn = $('.expand-input-btn'),
              searchBtn = $('.search-btn');

        expandBtn.on('click', function(e) {
            e.preventDefault();
            searchInput.addClass('search-input-expand');
            searchInput.css('display', 'block');
            $(this).css('display', 'none');
            searchBtn.css('display', 'inline-block');

            if (searchInput.hasClass('search-input-close')) {
                searchInput.removeClass('search-input-close');
            }
        });

        searchBtn.on('click', function(e) {
          e.preventDefault();
          searchInput.removeClass('search-input-expand');
          searchInput.addClass('search-input-close');
          setTimeout(function() {
            searchInput.css('display', 'none');
          }, 400);

          $(this).css('display', 'none');
          expandBtn.css('display', 'inline-block');
        });
    }

    expandSearch();

    /* Slide to section */

    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
                scrollTop: $('#' + id).offset().top
            },
            'slow');
    }

    $(".arrow-up-to-top").click(function(e) {
        // Prevent a page reload when a link is pressed
        e.preventDefault();
        // Call the scroll function
        goToByScroll(this.id);
    });

    $('.mobile-menu-btn').on('click', function() {
      $('.mobile-menu').slideToggle(200);
    });
    $(window).resize(function() {
      $('.mobile-menu').css('display', 'none');
    });

        // app.init();
});
