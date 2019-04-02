$(function(){
  var classArr = ["b1","b2","b3","b4","b5"];
  var index = 0;

  $(".left-btn").click(function(){
    var tempArr = classArr.shift();
    classArr.push(tempArr);
    $(".banner li").each(function(liIndex){
      $(this).removeClass().addClass(classArr[liIndex])
    });

    index --;
    if(index < 0){
      index = 4;
    }
    $("ol li").removeClass().eq(index).addClass("active");
  });

  $(".right-btn").click(function(){
    var tempArr = classArr.pop();
    classArr.unshift(tempArr);
    $(".banner li").each(function(liIndex){
      $(this).removeClass().addClass(classArr[liIndex])
    });

    index ++;
    if(index > 4){
      index = 0;
    }
    $("ol li").removeClass().eq(index).addClass("active");

  });

  $("ol li").click(function(){
    var liIndex = $(this).index();
    // 由于我们需要对比当前index与期望的index的差距
    // 那么我们需要将其相减
    var chaIndex = liIndex - index;
    if(chaIndex == 0){
      // 如果点击的是当前激活的index 那么不执行
      return ;
    }else if(chaIndex > 0){
    
      console.log(chaIndex)
      var tempArr = classArr.splice(-chaIndex,chaIndex);
      console.log(tempArr)
      console.log(classArr)

      classArr = tempArr.concat(classArr);
      $(".banner li").each(function(liIndex){
        $(this).removeClass().addClass(classArr[liIndex])
      });
      index = liIndex;
      
      $("ol li").removeClass().eq(index).addClass("active");

    }else{
      var tempArr = classArr.splice(0,-chaIndex);
      classArr = classArr.concat(tempArr);
      $(".banner li").each(function(liIndex){
        $(this).removeClass().addClass(classArr[liIndex])
      });
      index = liIndex;

      $("ol li").removeClass().eq(index).addClass("active");
    }
  });
  // 对应索引   3  4  0  1  2
  // 不变的li   1  2  3  4  5
  // 变化的数组 b1 b2 b3 b4 b5

  // 现在的数组内容 b2 b3 b4 b5 b1


});
