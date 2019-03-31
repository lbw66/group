(function () {
    var element = [];
 
    function paging(obj) {
        this.Box = document.querySelector(obj.boxName);
        this.init();
        this.firstPage = document.querySelector('.firstPage');
        this.lastPage = document.querySelector('.lastPage');
        this.Previous = document.querySelector('.Previous');
        this.Next = document.querySelector('.Next');
        this.pageAll = obj.pageAll;//总页数
        if (obj.pageAll < obj.showPage) {//显示多少
            this.showPage = obj.pageAll;
        } else {
            this.showPage = obj.showPage;
        }
        this.boxName = document.querySelector('.pageList');//页码容器
        this.startPage = obj.startPage;//默认页
        this.cut = Math.floor(this.showPage / 2);//中间页码
        this.callback = obj.callback;
        this.begin(this.startPage, this.startPage - 1);//初始化
    }
    paging.prototype.init = function () {//创建元素
        var arr = [];
        var page1 = document.createElement("div");
        var node1 = document.createTextNode("首页");
        page1.appendChild(node1);
        arr[0] = page1;
        var page2 = document.createElement("div");
        arr[1] = page2;
        var page3 = document.createElement("ul");
        arr[2] = page3;
        var page4 = document.createElement("div");
        arr[3] = page4;
        var page5 = document.createElement("div");
        var node5 = document.createTextNode("尾页");
        page5.appendChild(node5);
        arr[4] = page5;
        for (var i = 0; i < arr.length; i++) {
            this.Box.appendChild(arr[i]);
        }
        this.Box.children[0].className = 'firstPage';
        this.Box.children[1].className = 'size Previous';
        this.Box.children[2].className = 'pageList';
        this.Box.children[3].className = 'size Next';
        this.Box.children[4].className = 'lastPage';
    }
    paging.prototype.begin = function (start, index) {
        remove(this.boxName);//调用先清理
        if (index <= this.cut) {//下标小于中间位置
            for (var i = 0; i < this.showPage; i++) {//添加页码节点,长度为showPage
                var page = document.createElement("li");
                if (start <= this.cut) {//页码值小于中间值
                    var node = document.createTextNode(1 + i); //页码从1开始
                } else {
                    var node = document.createTextNode(start - this.cut + i);//页码从页码值减去中间值开始
                }
                page.appendChild(node);
                element.push(page);
            }
            if (start + this.cut <= this.pageAll && this.pageAll > this.showPage) {//页码加上中间数小于总页数给后面加...
                var page = document.createElement("li");
                var node = document.createTextNode('...');
                page.appendChild(node);
                element.push(page);
            }
            var top = Number(element[0].innerText);//第一个的值
            if (top > 1) {//判断是否给前面加...
                var page = document.createElement("li");
                var node = document.createTextNode('...');
                page.appendChild(node);
                element.unshift(page);
                for (var i = 0; i < element.length; i++) {
                    this.boxName.appendChild(element[i]);
                }
                this.boxName.children[this.cut+1].className = 'active';//前面有省略号的时候,下标为中间数加1的那个选中
                this.index = this.cut+1;
            } else {//小于等于1
                for (var i = 0; i < element.length; i++) {
                    this.boxName.appendChild(element[i]);
                }
                this.boxName.children[start - 1].className = 'active';//前面没有省略号,下标为页码减一的那个选中 
                this.index = start - 1;
            }
        } else {//下标大于中间位置
            for (var i = 0; i < this.showPage; i++) {//创建节点
                var m = this.pageAll - start;//总页码-页码 = 尾部距离
                var page = document.createElement("li");
                if (m <= this.cut) {//判断是否到最后几个显示长度不变
                    var node = document.createTextNode(this.pageAll - this.showPage + 1 + i);//始终从最后几个开始添加页码
                } else {
                    var node = document.createTextNode(start - this.cut + i);//从页码减去中间数开始渲染
                }
                page.appendChild(node);//创建页码节点
                element.push(page);//放入数组
            }
            if (start + this.cut < this.pageAll) {//加上中间数小于总页数给后面加...
                var page = document.createElement("li");
                var node = document.createTextNode('...');
                page.appendChild(node);
                element.push(page);
            }
            var first = Number(element[0].innerText);//第一个的值
            if (first > 1) {//第一个页码大于1给前面加...
                var page = document.createElement("li");
                var node = document.createTextNode('...');
                page.appendChild(node);
                element.unshift(page);
                for (var i = 0; i < element.length; i++) {
                    this.boxName.appendChild(element[i]);
                }
                if (m <= this.cut) {//判断是否到最后几个页码了
                    var o = this.showPage - m;//下标
                    this.boxName.children[o].className = 'active';
                    this.index = o;
                } else {
                    this.boxName.children[this.cut + 1].className = 'active';
                    this.index = this.cut + 1;
                }
            } else {//要显示的页面大于总页面的情况
                for (var i = 0; i < element.length; i++) {
                    this.boxName.appendChild(element[i]);
                }
                this.boxName.children[index-1].className = 'active';
                this.index = index-1;
            }
        }
        var that = this;
        this.startPage = start;
        this.Previous.onclick = function (start, index) {//左移
            that.Left(that.startPage, that.index);
        };
        this.Next.onclick = function (start, index) {//右移
            that.Right(that.startPage, that.index);
        };
        this.run();
        this.Jump();
    }
    paging.prototype.run = function () {//点击事件
        for (var i = 0; i < element.length; i++) {
            var n = this.boxName.children[i];
            n.index = i;
            var that = this;
            n.onclick = function () {
                var now = Number(element[this.index].innerText);
                if (now) {//判断是不是省略号
                    that.callback(now);
                    that.begin(now, this.index);
                }
            };
        }
    }
    paging.prototype.Left = function (start, index) {
        if (index) {
            start = start - 1;
            index = index - 1;
            this.begin(start, index);
            this.callback(start);
        }
    }
    paging.prototype.Right = function (start, index) {
        if (index < this.showPage) {
            start = start + 1;
            index = index + 1;
            this.begin(start, index);
            this.callback(start);
        }
    }
    paging.prototype.Jump = function () {//首页尾页
        this.firstPage.onclick = function () {
            this.begin(1, 0);
            this.callback(1);
        }.bind(this);
        this.lastPage.onclick = function () {
            this.begin(this.pageAll, this.pageAll - 1);
            this.callback(this.pageAll);
        }.bind(this);
    }
 
    function remove(map) {//清除所有
        for (var i = 0; i < element.length; i++) {
            map.removeChild(element[i]);
        }
        element = [];
    }
 
    window.paging = paging;
}());
