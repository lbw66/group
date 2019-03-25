window.onload = window.onscroll = decounse(function () {
    var img = document.querySelectorAll('img');
    // img[i].getBoundingClientRect寻找图片在页面中的位置
    // window.innerHeight当前窗口的高度
    for (let i = 0; i < img.length; i++) {
        if (img[i].getBoundingClientRect().top < window.innerHeight) {
            img[i].src = img[i].dataset.src;
        }
    }
}, 300);

/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {Function}
 */
function decounse(fn, delay) {
    var timer = null;
    return function () {
        var self = this;
        var ags = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, ags);
        }, delay)
    }
}

/**
 * 节流
 * @param fn
 * @param time
 * @returns {Function}
 */
function throttle(fn, time) {
    var value;
    return function () {
        var self = this;
        var args = arguments;
        var data = +new Date();
        if (data - value >= time) {
            fn.apply(self, args);
            value = date;
        }
    }
}