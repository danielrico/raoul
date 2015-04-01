jQuery(document).ready(function ($) {

    $('body').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
          $("#bm").animate({
              top: "80%"
            }, "500" );
          $("#overlay")
            .removeClass("overlay_active")
            .fadeOut("slow");
          $("#time").delay(200).fadeTo( 100, 800);
        }
        else{
          $("#overlay")
            .fadeIn("slow")
            .addClass("overlay_active").click(function() {
              $("#time").fadeTo( 1000, 100);
              $("#bm").animate({
                  top: "80%"
                }, "500" );
              $(this)
                .removeClass("active")
                .fadeOut("slow");
            });
          $("#time").fadeTo( 400, 0.33);
          $("#bm").animate({
              top: "5%"
            }, "300" );
        }
    });
  

});