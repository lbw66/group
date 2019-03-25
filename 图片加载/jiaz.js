function imgonload() {
    let img = document.querySelectorAll('img');
    console.log(img);

    for (let i = 0; i < img.length; i++) {
        if (img[i].getBoundingClientRect().top < window.innerHeight) {
            img[i].src = img[i].dataset.src
        }
    }
}

function scoImg(fn) {
    let timer = null
    let context = this
    let args = arguments
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, 500);
    }
}
// getBoundingClientRect().top 获取到图片在页面的位置
//img[i].dataset.src  获取图片地址
// window.innerHeight屏幕长度