$(function() {
    function lbt1() {
        //轮播图
        $(".l_dhl2 img").eq(0).css("opacity", "1"); //第一次遍历
        $(".l_sp1").eq(0).addClass("l_on");
        var i = 0;
        //图片轮播
        function lbt() {
            //		console.log(i);
            if (i > 7) {
                i = 0;
            }
            if (i < 0) {
                i = 7;
            }
            for (var j = 0; j < 8; j++) {
                $(".l_dhl2 img").css({
                    "opacity": "0",
                    "z-index": "0",
                });
            }
            $(".l_dhl2 img").stop().eq(i).animate({
                "opacity": "1",
                "z-index": "2",
            }, 1500);
            $(".l_sp1").eq(i).addClass("l_on").siblings().removeClass("l_on");
        }
        //左侧
        $(".l_lef").click(function() {
            i--;
            lbt();
        });
        //右侧
        $(".l_rig").click(function() {
            i++;
            lbt();
        });
        //自动轮播
        var zdlb = setInterval(function() {
            i++;
            lbt();
        }, 3000);
        //鼠标移入移出
        $(".l_dhl2").hover(function() {
                clearInterval(zdlb);
            }, function() {
                zdlb = setInterval(function() {
                    i++;
                    lbt();
                }, 2000);
            })
            //索引
        $(".l_sp1").click(function() {
            i = $(this).index()
            lbt();
        })
    }
    lbt1();

    function lbt2() {
        var size = $(".l_hmn_c1").length; //拿到图片数量	
        $(".l_hmn_cen").append($(".l_hmn_c1").eq(0).clone()); //克隆第一站图片放在最后
        $(".l_hmn_cen").prepend($(".l_hmn_c1").eq(size - 1).clone()); //克隆最后站图片放在最后
        $(".l_num i").eq(0).addClass("on").siblings().removeClass("on"); //遍历第一次原点
        var i = 1;
        //图片移动
        function lbt() {
            if (i == size + 1) {
                i = 1;
                $(".l_hmn_cen").css("left", 0);
            }
            if (i == -1) {
                i = size - 1;
                $(".l_hmn_cen").css("left", size * -350 + "px");
            }
            $(".l_hmn_cen").stop().animate({
                "left": -350 * i + "px"
            }, 500);
            $(".l_num i").eq(i - 1).addClass("on").siblings().removeClass("on");

        }
        var jsq = setInterval(function() {
            i++;
            lbt();
        }, 3000);
        $(".l_right").click(function() {
            i++;
            lbt();
        })
        $(".l_left").click(function() {
                i--;
                lbt();
            })
            //鼠标移入移出
        $(".l_hmn").hover(function() {
                clearInterval(jsq);
            }, function() {
                jsq = setInterval(function() {
                    i++;
                    lbt();
                }, 3000);
            })
            //索引
        $(".l_num i").click(function() {
            i = $(this).index() + 1;
            lbt();
        })
    }
    lbt2();
    //
    function lbt3() {
        var size = $(".l_u3cen ul").length;
        $(".l_u3cen").append($(".l_u3cen ul").eq(0).clone());
        $(".l_u3cen").prepend($(".l_u3cen ul").eq(size - 1).clone());
        var i = 1;

        function lbt() {
            if (i > size) {
                i = 1;
                $(".l_u3cen").css("left", "0");
            }
            if (i < 0) {
                i = size - 1;
                $(".l_u3cen").css("left", (i + 1) * -800 + "px");
            }
            $(".l_u3cen").stop().animate({
                "left": i * -800 + "px"
            }, 1000)
        }

        $(".l_left2").click(function() {
            i++;
            lbt();
        });
        $(".l_right2").click(function() {
            i--;
            lbt();
        });
    }
    lbt3();
})