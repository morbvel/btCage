var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
        track(items.activate ? "true" : "false");
    });
} catch (e) {
    if (active) {
        main();
    }
    track("undefined");
}

function track(active) {
    //UA-9413471-3

    ga('create', 'UA-9413471-3', 'auto');
    ga('set', 'dimension1', active);
    ga('send', 'pageview');

    // //Analytics
    // var _gaq = window._gaq || [];
    // _gaq.push(['_setAccount', 'UA-9413471-3']);
    // _gaq.push(['_gat._forceSSL']);
    // _gaq.push(["_setCustomVar", 1, "Active", active, 3]);
    // _gaq.push(['_trackPageview']);
}

//Content script, image replacer
function main() {

    //rNet
    (function ($) {
        // https://cdn.rawgit.com/AaronLayton/btCage/master/images/
        var self = {
            rNetImgs: [
              'http://traste.duckdns.org/fotos/1.jpg',
              'http://traste.duckdns.org/fotos/2.jpg',
              'http://traste.duckdns.org/fotos/3.jpg',
              'http://traste.duckdns.org/fotos/4.jpg',
              'http://traste.duckdns.org/fotos/5.jpg',
              'http://traste.duckdns.org/fotos/6.jpg',
              'http://traste.duckdns.org/fotos/7.jpg',
              'http://traste.duckdns.org/fotos/8.jpg',
              'http://traste.duckdns.org/fotos/9.jpg',
              'http://traste.duckdns.org/fotos/10.jpg',
              'http://traste.duckdns.org/fotos/11.jpg',
              'http://traste.duckdns.org/fotos/12.jpg',
              'http://traste.duckdns.org/fotos/13.jpg',
              'http://traste.duckdns.org/fotos/14.jpg',
              'http://traste.duckdns.org/fotos/15.jpg',
              'http://traste.duckdns.org/fotos/16.jpg',
              'http://traste.duckdns.org/fotos/17.jpg',
              'http://traste.duckdns.org/fotos/18.jpg',
              'http://traste.duckdns.org/fotos/19.jpg',
              'http://traste.duckdns.org/fotos/20.jpg',
              'http://traste.duckdns.org/fotos/21.jpg',
              'http://traste.duckdns.org/fotos/22.jpg',
              'http://traste.duckdns.org/fotos/23.jpg',
              'http://traste.duckdns.org/fotos/24.jpg',
              'http://traste.duckdns.org/fotos/25.jpg',
              'http://traste.duckdns.org/fotos/26.jpg',
              'http://traste.duckdns.org/fotos/27.jpg',
              'http://traste.duckdns.org/fotos/28.jpg',
              'http://traste.duckdns.org/fotos/29.jpg',
              'http://traste.duckdns.org/fotos/30.jpg',
              'http://traste.duckdns.org/fotos/31.jpg',
              'http://traste.duckdns.org/fotos/32.jpg',
              'http://traste.duckdns.org/fotos/33.jpg',
              'http://traste.duckdns.org/fotos/34.jpg',
              'http://traste.duckdns.org/fotos/35.jpg',
              'http://traste.duckdns.org/fotos/36.jpg',
              'http://traste.duckdns.org/fotos/37.jpg',
              'http://traste.duckdns.org/fotos/38.jpg',
              'http://traste.duckdns.org/fotos/39.jpg',
              'http://traste.duckdns.org/fotos/40.jpg',
              'http://traste.duckdns.org/fotos/41.jpg'
            ],

            //Handles all images on page with an interval of time
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
                    //Skip if image is already replaced
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //If image loaded
                        if (h > 0 && w > 0) {

                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //Replace when loaded
                            $(item).load(function () {
                                //Prevent 'infinite' loop
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                //Keep replacing
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Replace one image
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //Handle broken imgs
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
            //Set a random image from lstImgs to item
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },
            //Removed broken image from lstImgs, run handleImg on item
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //Run on jQuery ready
        $(function () {

            self.handleImages(self.rNetImgs, 3000);

        });

        //Set global variable
        $.rNet = self;


    })(jQuery);
    //end rNet
}
