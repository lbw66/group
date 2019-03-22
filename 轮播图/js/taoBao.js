function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 * 节流
 * @param fn
 * @param time
 * @returns {Function}
 */
function thorttol(fn, time) {
    var value = 0;

    return function () {
        var self = this;
        var ags = arguments;

        var date = +new Date();
        if (date - value >= time) {
            fn.apply(self, ags);
            value = date;
        }
    }
}

/**
 * 防抖
 * @param fn
 * @param dealy
 * @returns {Function}
 */
function decounce(fn, dealy) {
    var timer = null;
    return function () {
        var self = this;
        var ags = arguments;
        clearInterval(timer);
        timer = setInterval(function () {
            fn.apply(self, ags);
        }, dealy)
    }
}

/**
 *无缝轮播运动函数
 * @param obj
 * @param target
 * @param speed
 */
function ded(obj, target, speed) {
    //1.清楚定时器
    clearInterval(obj.timer);
    //判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;
    //设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';
        if (Math.abs(target - obj.offsetLeft) <= Math.abs(dir)) {
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
        }
    }, 20)
}

/**
 * 获取轮播图盒子宽度
 * @param obj
 * @param name
 * @returns {*}
 */
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        //正常浏览器的方式,具有getComputedStyle()方法
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8的方式
        return obj.currentStyle[name];
    }
}

window.onload = thorttol(function () {
    var uls = $('uls').children;
    var ols = $('ols').children;
    var box = document.querySelector('.box');
    var span = document.querySelectorAll('span');
    var timer = null;
    var indexImg = 1, indexLi = 0;
    var width = parseInt(getStyle($('uls'), 'width')) / 6;
    //在最后插入默认为1的图片
    $('uls').appendChild(uls[0].cloneNode(true));
    //元素第一位之前加一个图片
    var first = document.createElement('li');
    var firstImg = document.createElement('img');
    firstImg.src = "images/4.webp";
    $('uls').insertBefore(first, uls[0]);
    uls[0].insertBefore(firstImg, uls[0].children[0]);
    /**
     * 动态创建导航缩索引
     */
    for (let i = 0; i < uls.length - 2; i++) {
        var olLis = document.createElement('li');
        $('ols').appendChild(olLis);
    }
    $('ols').children[0].className = "red";
    for (let i = 0; i < ols.length; i++) {
        (function (i) {
            var index = ols[i];
            /**
             *鼠标移入时切换图片
             */
            index.onmouseover = function () {
                for (var j = 0; j < ols.length; j++) {
                    ols[j].className = "";
                }
                this.className = "red";
                ded($('uls'), -(width * (i + 1)), 50);
                indexImg = i + 1;
                indexLi = i;
            }
        })(i)
    }
    /**
     * 自动轮播
     * @type {number}
     */
    timer = setInterval(function () {
        haha()
    }, 2000);
    /**
     * 鼠标移入时
     */
    box.onmouseover = function () {
        clearInterval(timer);
        span[0].style.display = "block";
        span[1].style.display = "block";
        console.log(1);
    };
    /**
     * 鼠标移出时
     */
    box.onmouseout = function () {
        span[0].style.display = "none";
        span[1].style.display = "none";
        timer = setInterval(function () {
            haha();
        }, 2000);
    };
    //点击上一张图片
    $('prev').onclick = function () {
        indexImg--;
        if (indexImg === 0) {
            indexImg = uls.length - 2;
            $('uls').style.left = -(width * indexImg) + 'px';
        }

        indexLi--;
        if (indexLi < 0) {
            indexLi = ols.length - 1;
        }
        for (var i = 0; i < ols.length; i++) {
            ols[i].className = "";
        }
        ols[indexLi].className = "red";
        ded($('uls'), -(indexImg) * width, 30);
    };
    $('next').onclick = thorttol(function () {
        haha();
    }, 100);

    /**
     *轮播运动
     */
    function haha() {
        indexImg++;
        if (indexImg > uls.length - 1) {
            $('uls').style.left = -520 + 'px';
            indexImg = 2;
        }
        indexLi++;
        if (indexLi > ols.length - 1) {
            indexLi = 0;
        }
        for (var i = 0; i < ols.length; i++) {
            ols[i].className = "";
        }
        ols[indexLi].className = "red";
        ded($('uls'), -(indexImg) * width, 30);
    }
}, 200);

