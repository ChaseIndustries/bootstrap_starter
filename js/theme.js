(function ($) {
  // set the default bootstrap breakpoints and variables
  var breakpoints = {
    xs : 768,
    sm : 992,
    md : 1200
  },
  winWidth,
  winHeight,
  docWidth,
  docHeight;
  
  function setVars(){ 
    docHeight = $(document).outerHeight(),
    docWidth  = $(document).outerWidth(),
    winHeight = $(window).height(),
    winWidth  = $(window).width();
  }
  
  function initCarousels(){
    /**
     * Set all carousel slides to be the same height
     * Prevents the page from 'jumping' on slide change
     * (thanks bootstrap :-P )
     */
    if($(".carousel").length){
      var maxHeight,items,numSlides;
      $(".carousel").each(function(){
        var self = this,
        $self = $(this),
        maxHeight = 0,
        items = $self.find(".item"),
        numSlides = items.length;
        items.height("auto");
        items.each(function(i){
          var h = $(this).height();
          if(h > maxHeight){
            maxHeight = h;
          }
          if(i == numSlides-1){
            items.height(maxHeight);
          }
        }); //end each
        //set the min height of the carousel to maxheight
        $self.css({'min-height':maxHeight});
        /**
         * Enable swipe support 
         */
        $self.swipe({
          swipe:function(event, direction, distance, duration, fingerCount) {
            if (direction == 'right') {
              $(this).carousel('prev');
            }
            else if (direction == 'left') {
              $(this).carousel('next');
            }
          }
        });
        /**
         * Allow carousel controls to choose the closest
         * carousel rather than relying on their href attribute
         */
         $self.find(".carousel-control").on("click",function(){
           if($(this).hasClass("left") || $(this).attr("data-slide") == "prev"){
             $self.carousel("prev"); 
           } else {
             $self.carousel("next");
           }
         })
         
      })

    }
  }
  
  /**
   * Swap out svg files for PNGs on unsupporting devices. Modrnizr determines
   * what an unsupporting device is by adding the .no-svg class to the html
   * tag.
   */
  function svgToPng() {
    $('.no-svg .js__svg-image').each(function() {
      var src = $(this).attr('src');
      src = src.replace("svg", "png");
      $(this).attr('src', src);
    });
  }
  
  /**
   * Gives each bootstrap tab a unique URL.
   */
  var url = document.location.toString();
  if (url.match('#')) {
    $('.nav-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
  }
  $('.nav-tabs a').on('shown.bs.tab', function(e) {
    window.location.hash = e.target.hash;
  })

  /**
   * Stuff to run immediately upon page load
   */
  svgToPng();
  setVars();
  initCarousels();

  /**
   * Stuff to run on resize.
   */
  $(window).resize(function() {
    setVars();
    waitForFinalEvent(function() {
      
      // Place functions here
    
    }, 500, "global");
  });

  /**
   * Stuff to run after page load is complete.
   */
  $(document).ready(function() {
    // Place functions here
  });

  /**
   * Helper function to delay firing resize events until the user actually
   * stops resizing their browser.
   */
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

}(jQuery));
