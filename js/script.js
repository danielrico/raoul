jQuery(document).ready(function ($) {


    // Slide bookmarks

    $('body').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            $("#bm").animate({
                top: "80%"
            }, "500");
            $("#overlay")
                .removeClass("overlay_active")
                .fadeOut("slow");
            $("#time").delay(200).fadeTo(100, 800);
        } else {
            $("#overlay")
                .fadeIn("slow")
                .addClass("overlay_active").click(function () {
                    $("#time").fadeTo(1000, 100);
                    $("#bm").animate({
                        top: "80%"
                    }, "500");
                    $(this)
                        .removeClass("active")
                        .fadeOut("slow");
                });
            $("#time").fadeTo(400, 0.33);
            $("#bm").animate({
                top: "5%"
            }, "300");
        }
    });

    // Letter bookmarks

    var text = 0;

    $("#bm li").each(function () {
        text = $(this).find("span").text();
        $(this).find("em").text(text.slice(0, 2));
    });



    ///////////////////////////////////////////////////

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


    ///////////////////////////////////////////////////

    // recherche de BM par title

    var raoulFolderId;

    function lookinForRaoul(bookmarks, title) {
            for (var i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].url !== null && bookmarks[i].title == title) {
                    // Totally found a folder that matches!
                    return bookmarks[i].id;
                } else {
                    if (bookmarks[i].children) {
                        // inception recursive stuff to get into the next layer of children
                        var id = lookinForRaoul(bookmarks[i].children, title);
                        if (id)
                            return id;
                    }
                }
            }
            // No results :C
            return false;
        }
        ///////////////////////////////////////////////////
        //creation affichage
    var BM = {

        theList: [],
        classes: "xl-12 l-20 m-25 s-33 xs-50",
        container: $('#bm'),
        affichage: function () {
            console.log('---affichage BM---');
            console.log(BM.theList);
            var liste = [];
            BM.container.html('<ul/>');
            var elemList = BM.container.find('ul');

            // var liste = this.theList.forEach(function(bm){
            //var liste = this.theList.each(function(i,bm){
            $.each(BM.theList, function (i, bm) {
                
                var block = $('<li/>', {
                        class: BM.classes
                    }),
                    link = $('<a/>', {
                        href: bm.url
                    }),
                    icon = $('<em/>').text(bm.title.substring(0, 2)),
                    title = $('<span/>', {
                        class: 'title'
                    }).text(bm.title);
                link.append(icon).append(title).appendTo(block);
                //return block;
                elemList.append(block);
                console.log(block);
                //liste.push(block);
            });
            //console.log(liste);
            //BM.container.html('<ul>'+$(liste.join(''))+'</ul>');


        }


    };


    ///////////////////////////////////////////////////
    // récupération raoul folder & links
    chrome.bookmarks.getTree(
        function (bookmarkTreeNodes) {
            raoulFolderId = lookinForRaoul(bookmarkTreeNodes, 'Raoul');
            console.log(raoulFolderId);
            var bms = [];
            if (!raoulFolderId) {

                chrome.bookmarks.create({
                        'parentId': '1',
                        'title': 'Raoul'
                    },
                    function (newFolder) {
                        console.log("added folder: " + newFolder.title);
                    });



            } else {


                chrome.bookmarks.getChildren(raoulFolderId, function (childrens) {
                        console.log('childrens : '+childrens);
                        BM.theList = childrens;
                        BM.affichage();


                });

                
            }





        });



}); // end jquery declaration
