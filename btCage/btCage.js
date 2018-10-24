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
              'http://traste.duckdns.org/fotos/1.png',
              'http://traste.duckdns.org/fotos/2.png',
              'http://traste.duckdns.org/fotos/3.png',
              'http://traste.duckdns.org/fotos/4.png',
              'http://traste.duckdns.org/fotos/5.png',
              'http://traste.duckdns.org/fotos/6.png',
              'http://traste.duckdns.org/fotos/7.png',
              'http://traste.duckdns.org/fotos/8.png',
              'http://traste.duckdns.org/fotos/9.png',
              'http://traste.duckdns.org/fotos/10.png',
              'http://traste.duckdns.org/fotos/11.png',
              'http://traste.duckdns.org/fotos/12.png',
              'http://traste.duckdns.org/fotos/13.png',
              'http://traste.duckdns.org/fotos/14.png',
              'http://traste.duckdns.org/fotos/15.png',
              'http://traste.duckdns.org/fotos/16.png',
              'http://traste.duckdns.org/fotos/17.png',
              'http://traste.duckdns.org/fotos/18.png',
              'http://traste.duckdns.org/fotos/19.png',
              'http://traste.duckdns.org/fotos/20.png',
              'http://traste.duckdns.org/fotos/21.png',
              'http://traste.duckdns.org/fotos/22.png',
              'http://traste.duckdns.org/fotos/23.png',
              'http://traste.duckdns.org/fotos/24.png',
              'http://traste.duckdns.org/fotos/25.png',
              'http://traste.duckdns.org/fotos/26.png',
              'http://traste.duckdns.org/fotos/27.png',
              'http://traste.duckdns.org/fotos/28.png',
              'http://traste.duckdns.org/fotos/29.png',
              'http://traste.duckdns.org/fotos/30.png',
              'http://traste.duckdns.org/fotos/31.png',
              'http://traste.duckdns.org/fotos/32.png',
              'http://traste.duckdns.org/fotos/33.png',
              'http://traste.duckdns.org/fotos/34.png',
              'http://traste.duckdns.org/fotos/35.png',
              'http://traste.duckdns.org/fotos/36.png',
              'http://traste.duckdns.org/fotos/37.png',
              'http://traste.duckdns.org/fotos/38.png',
              'http://traste.duckdns.org/fotos/39.png',
              'http://traste.duckdns.org/fotos/40.png'
              'http://traste.duckdns.org/fotos/41.png'
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
