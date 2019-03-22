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
    var uls = $('uls').children;
    var ols = $('ols').children;
    var box = document.querySelector('.box');
    var indexImg = 0, indexLi = 0, timer = null;
    clearInterval(timer);
    box.onmouseover = function () {
        clearInterval(timer);
        $('prev').style.display = "block";
        $('next').style.display = "block";
    };
    timer = setInterval(function () {
        indexImg++;
        for (let i = 0; i < uls.length; i++) {
            uls[i].className = "hide";
            ols[i].className = "";
        }
        if (indexImg === uls.length) {
            indexImg = 0;
        }
        uls[indexImg].className = "show";
        ols[indexImg].className = "red";
    }, 2000);
    box.onmouseout = function () {
        $('prev').style.display = "none";
        $('next').style.display = "none";
        timer = setInterval(function () {
            indexImg++;
            for (let i = 0; i < uls.length; i++) {
                uls[i].className = "hide";
                ols[i].className = "";
            }
            if (indexImg === uls.length) {
                indexImg = 0;
            }
            uls[indexImg].className = "show";
            ols[indexImg].className = "red";
        }, 2000);
    };
    $('prev').onclick = thorttol(function () {
        indexImg--;
        if (indexImg < 0) {
            indexImg = uls.length - 1;
        }
        for (let i = 0; i < uls.length; i++) {
            uls[i].className = "hide";
            ols[i].className = "";
        }
        uls[indexImg].className = "show";
        ols[indexImg].className = "red";
    }, 80);
    $('next').onclick = thorttol(function () {
        indexImg++;
        for (let i = 0; i < uls.length; i++) {
            uls[i].className = "hide";
            ols[i].className = "";
        }
        if (indexImg === uls.length) {
            indexImg = 0;
        }
        uls[indexImg].className = "show";
        ols[indexImg].className = "red";
    }, 80);
    for (let j = 0; j < ols.length; j++) {
        ols[j].index = j;
        (function (j) {
            ols[j].onmouseover = thorttol(function () {
                    for (var i = 0; i < ols.length; i++) {
                        ols[i].className = "";
                        uls[i].className = "hide";
                    }
                    this.className = "red";
                    uls[this.index].className = "show";
                    indexImg = indexLi = j;
                }, 80
            )
        })(j)
    }
};