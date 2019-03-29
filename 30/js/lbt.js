window.onload = function() {
    //获取值。。。
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons")
    var buttons = buttons.getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    //小圆点
    index = 1;
    var animated = false;
    var timer;





    //搞一个函数 下面调用
    function animate(offset) {
        var newleft = parseInt(list.style.left) + offset; //一个图片600px，  +off  这个参数
        var time = 300; //位移总时间
        var interval = 10; //位移间隔
        var speed = offset / (time / interval); //每次位移

        function go() {
            animated = true;
            if ((speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            } else {
                animated = false;
                list.style.left = newleft + 'px'; //让下面的数值加px
                if (newleft > -600) { //小于-600 就回去-3000 顺序5123451
                    list.style.left = -3000 + 'px';
                }
                if (newleft < -3000) { //小于-3000 就回去-600
                    list.style.left = -600 + 'px';
                }
            }
        }
        go();
    }

    function play() {
        timer = setInterval(function() {
            next.onclick();
        }, 3000)
    }

    function stop() {
        clearInterval(timer);
    }



    //在搞一个函数   --小圆点
    function showbutton() {
        //var 一个i 遍历 当buttons的on激活事件 吧class清空
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on'; //让index-1
    }




    //按钮调用
    next.onclick = function() {
        if (index == 5) { //函数showbutton进来判断>5 进让下标回去1
            index = 1;
        } else {
            index += 1;
        }
        showbutton();
        // animate(-600);
        if (!animated) {
            animate(-600);
        }

    };
    //按钮调用
    prev.onclick = function() {
        if (index == 1) { //同上
            index = 5;
        } else {
            index -= 1;
        }
        showbutton();
        // animate(600);
        if (!animated) {
            animate(600);
        }
    };
    //小圆点移动事件 遍历小圆点
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onmouseover = function() {
            if (this.className == 'on') { //如果第二次移动到小圆点上面会出现二次执行 return
                return;
            }

            var maxindex = parseInt(this.getAttribute('index')); //接受参数
            var offset = -600 * (maxindex - index); //用-600
            animate(offset); //调用上面的判断
            index = maxindex; //回去
            showbutton();
        }



    }


    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}