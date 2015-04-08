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
  
  // Extension

  var raoulFolderId;
  function lookinForRaoul(bookmarks, title)
  {
    for(var i=0; i < bookmarks.length; i++)
    {
      if(bookmarks[i].url !== null && bookmarks[i].title == title)
      {
        // Totally found a folder that matches!
        return bookmarks[i].id;
      }
      else
      {
        if(bookmarks[i].children)
        {  
          // inception recursive stuff to get into the next layer of children
          var id = lookinForRaoul(bookmarks[i].children, title);
          if(id)
            return id;
        }
      }
    }
    // No results :C
    return false;
  }

  var BM = {
    theList : [],
    classes : "xl-12 l-20 m-25 s-33 xs-50",
    container : $('#bm'),
    affichage : function(){

      var liste = this.theList.map(function(bm){

        var block =  $('<li/>',{class : BM.classes}),
        link = $('<a/>',{href : bm.url}),
        icon = $('<em/>',{content : bm.initiales}),
        title = $('<span/>',{class : 'title', content : bm.titre});
        link.append(icon).append(title).appendTo(block);
        return block;
      });
      console.log(liste);
      this.container.html('<ul>'+liste.join()+'</ul>');
    }
  };

  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes)
      {
        raoulFolderId = lookinForRaoul( bookmarkTreeNodes,'Raoul');
        console.log(raoulFolderId);
        if(!raoulFolderId){

          chrome.bookmarks.create({
            'parentId': '1',
            'title': 'Raoul'
          },
          function(newFolder) {
            console.log("added folder: " + newFolder.title);
          });
        }else{

          chrome.bookmarks.getChildren(raoulFolderId, function(childrens){
            var bms=[];
            childrens.forEach(function(bookmark) {   // here i'm dwelling into sub folder to extract the content
              console.debug(bookmark.title);// these were the subfolder titles
              console.debug(bookmark.url);// these were the subfolder titles
              console.log(bookmark.id);// these were the subfolder ids
              bms.push({
                titre : bookmark.title, 
                initiales : bookmark.title.substr(0, 1),
                url : bookmark.url,
                id : bookmark.id
              });
              //BM.theList = bms;
              //BM.affichage();
            });
          })

        }
      });
  
}); // end jquery declaration
//le cucu

