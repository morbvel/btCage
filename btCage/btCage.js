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
              'http://traste.duckdns.org:5000/fbsharing/ckvp1ftP',
              'http://traste.duckdns.org:5000/fbsharing/qWRvwIrM',
              'http://traste.duckdns.org:5000/fbsharing/xDA2bEn9',
              'http://traste.duckdns.org:5000/fbsharing/91QHsKfq',
              'http://traste.duckdns.org:5000/fbsharing/479vDAwm',
              'http://traste.duckdns.org:5000/fbsharing/6DfdZ68E',
              'http://traste.duckdns.org:5000/fbsharing/YuNSvbjX',
              'http://traste.duckdns.org:5000/fbsharing/xdgPe9iN',
              'http://traste.duckdns.org:5000/fbsharing/4buErGAA',
              'http://traste.duckdns.org:5000/fbsharing/my2f107C',
              'http://traste.duckdns.org:5000/fbsharing/7yNQj2qO',
              'http://traste.duckdns.org:5000/fbsharing/59KQiQrC',
              'http://traste.duckdns.org:5000/fbsharing/yVHrgkQb',
              'http://traste.duckdns.org:5000/fbsharing/6JAH9WR3',
              'http://traste.duckdns.org:5000/fbsharing/liVgIWzk',
              'http://traste.duckdns.org:5000/fbsharing/HO5dlGoY',
              'http://traste.duckdns.org:5000/fbsharing/NZbpc8Kv',
              'http://traste.duckdns.org:5000/fbsharing/TasmUVcD',
              'http://traste.duckdns.org:5000/fbsharing/f2JvEV6L',
              'http://traste.duckdns.org:5000/fbsharing/QcrE4dpP',
              'http://traste.duckdns.org:5000/fbsharing/iq5xd97o',
              'http://traste.duckdns.org:5000/fbsharing/6qP3zNkW',
              'http://traste.duckdns.org:5000/fbsharing/P75xGgv1',
              'http://traste.duckdns.org:5000/fbsharing/VE7WqxMV',
              'http://traste.duckdns.org:5000/fbsharing/yAKeNrbD',
              'http://traste.duckdns.org:5000/fbsharing/0bGo5A4t',
              'http://traste.duckdns.org:5000/fbsharing/J0SuzIJf',
              'http://traste.duckdns.org:5000/fbsharing/qqTEjBjX',
              'http://traste.duckdns.org:5000/fbsharing/oMv4nZKT',
              'http://traste.duckdns.org:5000/fbsharing/bs5s9Fev',
              'http://traste.duckdns.org:5000/fbsharing/DPPmomjB',
              'http://traste.duckdns.org:5000/fbsharing/Kn1KkcLD',
              'http://traste.duckdns.org:5000/fbsharing/V2l20XtA',
              'http://traste.duckdns.org:5000/fbsharing/EtoR1bar',
              'http://traste.duckdns.org:5000/fbsharing/6tWQoKNt',
              'http://traste.duckdns.org:5000/fbsharing/yckiLSQG',
              'http://traste.duckdns.org:5000/fbsharing/GqzYoV95',
              'http://traste.duckdns.org:5000/fbsharing/dB3Q4Zrf',
              'http://traste.duckdns.org:5000/fbsharing/kamyxlCz'
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
