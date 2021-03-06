var floorResetColor = {
    color: $.extend(["green", "#14fbf3", "#0099d9", "#a64a97", "#14fbf3", "#ffaa16"], $("#hidStoreyColors").val() ? $("#hidStoreyColors").val().split(",") : []),
    init: function() {
        this.title();
        this.fixedNav();
        this.borderColor()
    },
    title: function() {
        var c = this.color;
        $(".main2 .main2_top").each(function(i, e) {
            $(e).find(".main2_top_li.active").css({
                color: c[i],
                borderColor: c[i]
            }).siblings(".main2_top_li").css({
                color: "#666",
                borderColor: "#f3f3f3"
            });
            $(e).find(".icon-youbian").css("color", c[i])
        })
    },
    fixedNav: function() {
        var c = this.color;
        $(".fiexd_nav .li").each(function(i, e) {
            if ($(".fiexd_nav .li").eq(i).hasClass("active")) {
                $(".fiexd_nav .li").eq(i).css("color", c[i])
            } else {
                $(".fiexd_nav .li").eq(i).css("color", "#b5b5b5")
            }
        })
    },
    borderColor: function() {
        var c = this.color;
        $(".main2_m").each(function(i, e) {
            $(e).find(".main2_m_left dd").hover(function() {
                $(this).css({
                    borderColor: c[i]
                })
            }, function() {
                $(this).css({
                    borderColor: "#e8e8e8"
                })
            })
        })
    }
};
(function($) {
    $.fn.kxbdMarquee = function(options) {
        var opts = $.extend({}, $.fn.kxbdMarquee.defaults, options);
        return this.each(function() {
            var $marquee = $(this);
            var _scrollObj = $marquee.get(0);
            var scrollW = $marquee.width();
            var scrollH = $marquee.height();
            var $element = $marquee.children();
            var $kids = $element.children();
            var scrollSize = 0;
            var _type = opts.direction == "left" || opts.direction == "right" ? 1 : 0;
            $element.css(_type ? "width" : "height", 1e4);
            if (opts.isEqual) {
                scrollSize = $kids[_type ? "outerWidth" : "outerHeight"]() * $kids.length
            } else {
                $kids.each(function() {
                    scrollSize += $(this)[_type ? "outerWidth" : "outerHeight"]()
                })
            }
            if (scrollSize < (_type ? scrollW : scrollH)) {
                return
            }
            $element.append($kids.clone()).css(_type ? "width" : "height", scrollSize * 2 + 10);
            var numMoved = 0;
            function scrollFunc() {
                var _dir = opts.direction == "left" || opts.direction == "right" ? "scrollLeft" : "scrollTop";
                if (opts.loop > 0) {
                    numMoved += opts.scrollAmount;
                    if (numMoved > scrollSize * opts.loop) {
                        _scrollObj[_dir] = 0;
                        return clearInterval(moveId)
                    }
                }
                if (opts.direction == "left" || opts.direction == "up") {
                    var newPos = _scrollObj[_dir] + opts.scrollAmount;
                    if (newPos >= scrollSize) {
                        newPos -= scrollSize
                    }
                    _scrollObj[_dir] = newPos
                } else {
                    var newPos = _scrollObj[_dir] - opts.scrollAmount;
                    if (newPos <= 0) {
                        newPos += scrollSize
                    }
                    _scrollObj[_dir] = newPos
                }
            }
            var moveId = setInterval(scrollFunc, opts.scrollDelay);
            $marquee.hover(function() {
                clearInterval(moveId)
            }, function() {
                clearInterval(moveId);
                moveId = setInterval(scrollFunc, opts.scrollDelay)
            })
        })
    }
    ;
    $.fn.kxbdMarquee.defaults = {
        isEqual: true,
        loop: 0,
        direction: "left",
        scrollAmount: 1,
        scrollDelay: 20
    };
    $.fn.kxbdMarquee.setDefaults = function(settings) {
        $.extend($.fn.kxbdMarquee.defaults, settings)
    }
})(jQuery);
$(function() {
    $("img.lazy").lazyload({
        container: ".main"
    });
    floorResetColor.init();
    index_banner($(".banner_wrap"), $(".banner_wrap .content_list li"), $(".banner_wrap .pagination span"), 4e3);
    for (var i = 1; i <= $(".banner_slide").length; i++) {
        index_banner($(".swiper-container" + i + ""), $(".swiper-container" + i + " .swiper-slide"), $(".swiper-container" + i + " .swiper-pagination-switch"), 3e3)
    }
    setTimeout(function() {
        $("#scroll_begin").kxbdMarquee({
            isEqual: false,
            scrollDelay: 30
        })
    }, 1e3);
    $(".main1_top li").click(function() {
        $(this).addClass("active").siblings("li").removeClass("active");
        var i = $(this).index(".main1_top li");
        $(".main1_m").eq(i).show().siblings(".main1_m").hide();
        $(".main").trigger("scroll")
    });
    $(".main2 .main2_top_nav .main2_top_li").click(function() {
        $(this).addClass("active").siblings(".main2_top_li").removeClass("active");
        var href = $(this).attr("attr-href");
        $(this).parent().prev().attr("href", href);
        var i = $(this).index();
        $(this).parents(".main2").find(".main2_m_right .main2_m_right_list").eq(i).show().siblings().hide();
        if (!href) {
            $(this).parent().prev().css("visibility", "hidden")
        } else {
            $(this).parent().prev().css("visibility", "visible")
        }
        floorResetColor.title();
        $(".main").trigger("scroll")
    });
    var first_main2 = $(".main .main2").eq(0).offset().top;
    var index_left_bar = 0;
    
    $(".fiexd_nav .li").on("click", function() {
        var index = $(this).index();
        $(this).eq(index).addClass("active").siblings().removeClass("active");
        var scrolltop = $(".main2").eq(index).offset().top;
        $("html,body").animate({
            scrollTop: scrolltop + 2
        })
    });
    $(".position .icon-guanbi").on("click", function() {
        $(".position").hide();
        $(".bg_000").hide()
    });
    var pagination_w = 880 / $(".pagination span").length;
    $(".pagination span").css("width", pagination_w);
    $(".main2_m_left dd").click(function(event) {
        window.open($(this).attr("attr-href"));
        return false
    });
});
