// $(function(){
//     // 点击关闭头部的广告
//     $(".top-img a").click(() => {
//         $(".top-img").fadeOut();
//     })
//     // 头部导航栏 hover 显示附加内容
//     $(".htr-on").mouseover(function(){
//         // console.log($(this).index())
//         console.log($(this).index());
//         $(".htr-n").eq($(this).index()).show();
//     })
//     $(".htr-on").mouseout(function(){
//         $(".htr-n").eq($(this).index()).hide();
//     })
    

// })

// 去抖
function debounce(func,time){
    var timer = null;
    return function(){
        clearInterval(timer);
        var context = this;
        var args = arguments;
        timer = setInterval(function(){
            func.apply(context,args);
        },time)
    }
}
// 节流
function throttle(func,time){
    var times = Date.now();
    return function(){
        var c = this;
        var a = arguments;
        var now = Date.now();
        if(now - times >=time){
            func.apply(c,a);
            times = Date.now();
        }
    }
}

var msc11Json = {
    title:["花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）",
    "京造 法国波尔多进口红葡萄酒 赤霞珠梅洛吕丽珠混酿 AOP/AOC 750ml 单支装","京造 法国波尔多进口红葡萄酒 赤霞珠梅洛吕丽珠混酿 AOP/AOC 750ml 单支装","京造 法国波尔多进口红葡萄酒 赤霞珠梅洛吕丽珠混酿 AOP/AOC 750ml 单支装","京造 法国波尔多进口红葡萄酒 赤霞珠梅洛吕丽珠混酿 AOP/AOC 750ml 单支装",
    "飞利浦 PHILIPS E256S 陨石黑 双屏翻盖 大屏大字 长待机 移动联通2G 双卡双待 老人手机 学生备用功能机","飞利浦 PHILIPS E256S 陨石黑 双屏翻盖 大屏大字 长待机 移动联通2G 双卡双待 老人手机 学生备用功能机","飞利浦 PHILIPS E256S 陨石黑 双屏翻盖 大屏大字 长待机 移动联通2G 双卡双待 老人手机 学生备用功能机","飞利浦 PHILIPS E256S 陨石黑 双屏翻盖 大屏大字 长待机 移动联通2G 双卡双待 老人手机 学生备用功能机",
    "花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）","花王（Merries）纸尿裤 L54片 大号尿不湿（9-14kg）（日本原装进口）"],
    img:[1,1,1,1,2,2,2,2,3,3,3,3,1,1,1,1],
    nowP:[99.00,99.00,99.00,99.00,115.00,115.00,115.00,115.00,200.00,200.00,200.00,200.00,99.00,99.00,99.00,99.00,],
    oldP:[160.00,160.00,160.00,160.00,200.00,200.00,200.00,200.00,500.00,500.00,500.00,500.00,160.00,160.00,160.00,160.00]
}

// 倒计时
function djs(){
    var date1 = new Date().getTime();
    var countDown = date1 + 90*60*1000;
    var h = 0;
    var m = 0;
    var s = 0;
    setInterval(function(){
        var now = new Date().getTime();
    // console.log(countDown)

        var cha = countDown - now;
         h = Math.round((cha % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         m = Math.floor((cha % (1000 * 60 * 60)) / (1000 * 60));
         s = Math.round((cha % (1000 * 60)) / 1000);
        // console.log(m,s)
        if( s < 10){
            s = "0" + s;
        }
        if( h < 10){
            h = "0" + h;
        }
        $("#ms_hour").text(h);
        $("#ms_min").text(m);
        $("#ms_sec").text(s);

    },1000)
};
djs();

// 京东秒杀 轮播图1号
    // 内容
for(let  i = 0;i<msc11Json.img.length;i++){
    $(".main-ms-cen1-2 ul").append(`<li><a href=""><img src="img/ms-1-${msc11Json.img[i]}.jpg" alt="">
    <p>${msc11Json.title[i]}</p><div><span>￥<em>${msc11Json.nowP[i]}</em></span><span>￥<em>
    ${msc11Json.oldP[i]}</em></span></div></a></li>`);
}
    // 轮播
(function ms1(){
    var ms1Index = 0;
    // 左右点击
    $(".ms-right").click(throttle(goLeft1,800))
    $(".ms-left").click(throttle(goRight,800))

        // 轮播图左移
    function goLeft1(){
        if(ms1Index == 3){
            ms1Index = 0;
            $(".main-ms-cen1-2 ul").css("left",0);
        }
        ms1Index ++;
        move1();
    }
        // 轮播图右移
    function goRight(){

        if(ms1Index == 0){
            ms1Index = 3;
            $(".main-ms-cen1-2 ul").css("left", -2400+"px");
        }
        ms1Index --;
        move1();
    }
        // 轮播图移动
    function move1(){
        $(".main-ms-cen1-2 ul").animate({
            "left":-800 * ms1Index + "px"
        },500);
    }
})();
