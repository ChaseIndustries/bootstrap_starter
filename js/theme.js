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
        $self = $(this);
        
        self.maxHeight = 0,
        self.items = $self.find(".item"),
        self.numSlides = self.items.length;
        
        /**
         * Enable swipe support 
         */
        $self.swipe({
          swipeRight:function(event, direction, distance, duration, fingerCount) {
              $self.carousel('prev');
          },
          swipeLeft : function(event, direction, distance, duration, fingerCount) {
              $self.carousel('next');
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
         });
         self.setPositions = function(){
           self.maxHeight = 0;
           $self.css({"min-height":""});
           self.items.css({"height":""});
           self.items.each(function(i){
              var hidden = false;
              if($(this).is(":hidden")){
                hidden = true;
                $(this).css({"opacity":0,"display":"block"});
              }
              var h = $(this).height();
              if(h > self.maxHeight){
                self.maxHeight = h;
              }
              if(i == self.numSlides-1){
                self.items.height(self.maxHeight);
              }
              if(hidden){
                $(this).css({"opacity":"","display":""});
              }
            });
            //set the min height of the carousel to self.maxHeight
            $self.css({'min-height':self.maxHeight});
         }
         self.setPositions();
         $(window).resize(function() {
            self.setPositions();
          });
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
