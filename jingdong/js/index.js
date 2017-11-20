headerOpa();
jd_carouse();
timeouGo();
/**
 * 1 初始化的时候背景完全透明 
 * 2 页面往下拖动的时候 颜色逐渐变深  opacity 改变 0->0.9  
 * 3 header标签最大的透明度就是 0.9 
 * 4 往下滚动的时候 值需要和轮播图的高度 做对比! 
 */
function headerOpa(){
    var header = document.querySelector("header");
    //获取轮播图的高度
    var carousel_height = document.querySelector(".carousel").offsetHeight;
    // console.log(carousel_height);
    window.onscroll = function(){
        //页面往下拖动的值 页面被卷去的高度
        var scrollTop = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
        var tomOpa = scrollTop/carousel_height;
        if(tomOpa > 0.9){
            tmpOpa = 0.9;
        }
        header.style.backgroundColor = "rgba(201,21,35," + tomOpa +")";
    }
}

/* 
1 到计的总时间
2 每秒都在减少  -  开启定时器  
3 到了之后 清除定时器  
 */

 function timeouGo() {
     //总时间
     var time = 5 * 60 * 60;
    //  var time = 3;

    // spanSet();

     var spans = document.querySelectorAll(".timer>span");

     spanSet();

     var timeId = setInterval(function(){
         time--;
         spanSet();

         //判断倒计时
         if(time == 0){
            clearInterval(timeId);
            console.log("已经抢购结束");
         }
     },1000);

     function spanSet() {
         var hour = parseInt(time/60/60);
         var minutes = parseInt(time / 60-hour*60);
         var seconds = time - hour * 60 * 60 -minutes * 60;

         var hour0 = parseInt(hour/10);
         var hour1 = hour%10;

         var minutes0 = parseInt(minutes / 10);
         var minutes1 = minutes % 10;


         var seconds0 = parseInt(seconds / 10);
         var seconds1 = seconds % 10;

         spans[0].innerHTML = hour0
         spans[1].innerHTML = hour1;
         spans[3].innerHTML = minutes0;
         spans[4].innerHTML = minutes1;
         spans[6].innerHTML = seconds0;
         spans[7].innerHTML = seconds1;
     }
 }

//轮播图
function jd_carouse(){
    var carousel_list = document.querySelector(".carousel_list");
    var index = 1;
    carousel_list.style.transform = "translateX(-" + index + "0%)";
    var timeId = timeGo();
    function timeGo() {
        return setInterval(function(){
        index++;
        carousel_list.style.transition = "transform .3s";
        carousel_list.style.transform = "translateX(-"+index+"0%)";
    },1000);
    }
    carousel_list.addEventListener("transitionend",function(){
        if(index>=9){
            index=1;
            carousel_list.style.transition = "none";
            carousel_list.style.transform = "translateX(-"+index+"0%)";
        }else if(index<=0){
            index=8;
            carousel_list.style.transition = "none";
            carousel_list.style.transform = "translateX(-"+index+"0%)"
        }
        //索引器的索引
        var liIndex = index -1;
        activeLi(liIndex);
    });

    

    //索引器排他
    function activeLi(tmpIndex) {
        //获取所有的li标签
        var lis = document.querySelectorAll(".indexer>li");
        for(var i =0;i<lis.length;i++){
            var element = lis[i];
            element.classList.remove("active");
        }
        lis[tmpIndex].classList.add("active");
    }

    //滑动事件
    itcast(carousel_list).swipe(function (d) {
        clearInterval(timeId);
        switch (d) {
            case "left":
                index++;
                break;
            case "right":
                index--;
                break;
            default:
                break;
        }
        carousel_list.style.transition="transform .3s";
        carousel_list.style.transform="translateX(-"+index+"0%)";

        //重新开始定时器
        timeId = timeGo();
    });
}
