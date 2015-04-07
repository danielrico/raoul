jQuery(document).ready(function ($) {

  
  // Slide bookmarks
  
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
  
  // Letter bookmarks
  
  var text = 0;
  
  $("#bm li").each(function() {
    text = $( this ).find("span").text();
    $( this ).find("em").text(text.slice(0,2));
  });
  
  // display time

  var displayArea = document.getElementById("time_wrapper");
  function format(num) {
      var numStr = num.toString();
      if (numStr.length === 1) {
          return "0" + numStr;
      } else {
          return numStr;
      }
  }
  function updateTimeDisplay() {
      var dd = new Date();
      var hh = dd.getHours();
      var mm = dd.getMinutes();
      displayArea.textContent = format(hh) + ":" + format(mm);
  }
  setInterval(updateTimeDisplay, 100);
  
  
//////////////////////////////////////////////////////////
/*printBookmarks('0');

function printBookmarks(id) {
 chrome.bookmarks.getChildren(id, function(children) {
    children.forEach(function(bookmark) { 
      console.debug(bookmark.title);
      printBookmarks(bookmark.id);
    });
 });
}*/
//if(!chrome.bookmarks.search('Raoul', function(cucu){return cucu.length>0?true:false;})){
chrome.bookmarks.create({'parentId': '1',
                               'title': 'Raoul'},
                              function(newFolder) {
        console.log("added folder: " + newFolder.title);
      });

//}  
  
  
});


