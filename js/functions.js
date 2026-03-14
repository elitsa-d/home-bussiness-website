(function ($, window, document, undefined) {
  var $win = $(window);
  var $doc = $(document);

  function initialize() {
    var mapCanvas = document.getElementById("map");
    var lat = mapCanvas.getAttribute("data-lat");
    var lng = mapCanvas.getAttribute("data-lng");

    var mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 16,
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
    });
  }

  $doc.ready(function () {
    //Expand section
    $(".link-more").on("click", function (event) {
      event.preventDefault();

      var $this = $(this);
      var $parent = $this.closest(".section");
      var $hidden = $parent.find(".hidden");
      var $visible = $parent.find(".visible");

      if ($this.hasClass("hidden")) {
        $hidden.fadeOut();

        setTimeout(function () {
          $parent.removeClass("active");
        }, 500);

        $visible.delay(1000).fadeIn();
      } else {
        setTimeout(function () {
          $parent.addClass("active");
        }, 500);

        $hidden.delay(1000).fadeIn();
        $visible.fadeOut();
      }
    });

    //Google map
    $win.on("load", function () {
      if ($(".gmap").length) {
        initialize();
      }
    });

    //Responsive navigation
    $(".nav-menu").on("click", function (event) {
      event.preventDefault();

      $(".nav").toggleClass("is-visible");
      $(this).toggleClass("opened");
    });

    // Gallery popup
    $(".js-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    //Dropdown
    $(".nav > ul > li > a").on("click", function (event) {
      var $dropdown = $(this).next(".dropdown");
      var $nav = $(this).closest(".nav");

      if ($dropdown.length) {
        event.preventDefault();

        if ($dropdown.length && $nav.hasClass("is-visible")) {
          $dropdown.animate({ height: "toggle", opacity: 1 }, 500);
        }
      }
    });
  });
})(jQuery, window, document);
