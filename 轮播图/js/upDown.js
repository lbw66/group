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

window.onload = function () {
    var box = document.querySelector('.box');
    var uls = $('uls').querySelectorAll('li');
    var ols = $('ols').querySelectorAll('li');
    var indexLi = 0, indexImg = 0;
    var listImg = ['li1', 'li2', 'li3', 'li4', 'li5'];
    var timer = null;
    clearInterval(timer);
    /*自动轮播*/
    timer = setInterval(function () {
        nexLunBo();
        setIndexLiColor();
    }, 2000);
    box.onmouseover = function () {
        clearInterval(timer);
    };
    box.onmouseout = function () {
        timer = setInterval(function () {
            nexLunBo();
            setIndexLiColor();
        }, 2000);
    };

    /**
     * 导航索引颜色设置
     */
    function setIndexLiColor() {
        for (var i = 0; i < ols.length; i++) {
            ols[i].style.background = "#ccc";
        }
        ols[indexLi].style.background = "red";
    }

    /**
     *向下一张滚动
     */
    function nexLunBo() {
        //复制最后一张图片并插入到数组第一位
        listImg.unshift(listImg[4]);
        //删除数组最后一位
        listImg.pop();
        for (var i = 0; i < uls.length; i++) {
            //给每个图片对映的标签索引添加类名
            uls[i].setAttribute('class', listImg[i]);
        }
        indexLi++;
        if (indexLi > ols.length - 1) {
            indexLi = 0;
        }
        setIndexLiColor();
    }

    /**
     *向上一张滚动
     */
    function prevLunBo() {
        //把第一张图片放在最后
        listImg.push(listImg[0]);
        //删除第一张
        listImg.shift();
        for (let i = 0; i < uls.length; i++) {
            //给每个图片对映的标签索引添加类名
            uls[i].setAttribute('class', listImg[i]);
        }
        indexLi--;
        if (indexLi < 0) {
            indexLi = ols.length - 1;
        }
        setIndexLiColor();
    }

    /**
     * 鼠标移入时
     */
    for (let j = 0; j < ols.length; j++) {
        ols[j].indxe = j;
        ols[j].onmouseover = thorttol(function () {
            for (var i = 0; i < ols.length; i++) {
                ols[i].style.background = "#ccc";
            }
            if (j - indexLi === 0) {
                return false;
            } else if (j - indexLi > 0) {
                //把第一张图片放在最后
                listImg.push(listImg[0]);
                //删除第一张
                listImg.shift();
                for (let i = 0; i < uls.length; i++) {
                    //给每个图片对映的标签索引添加类名
                    uls[i].setAttribute('class', listImg[i]);
                }
                indexLi = j;
            } else if (j - indexLi < 0) {
                listImg.unshift(listImg[4]);
                //删除数组最后一位
                listImg.pop();
                for (let i = 0; i < uls.length; i++) {
                    //给每个图片对映的标签索引添加类名
                    uls[i].setAttribute('class', listImg[i]);
                }
                indexLi = j;
            }
            ols[j].style.background = "red";
        }, 500)
    }
    /**
     * 上一张
     */
    $('prev').onclick = thorttol(function () {
        prevLunBo();
    }, 500);
    /**
     * 下一张
     */
    $('next').onclick = thorttol(function () {
        nexLunBo();
    }, 500);
};