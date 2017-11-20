left_scroll();
function left_scroll() {
    var ul = document.querySelector(".left_menu");
    var startY ;
    var preDistance=0;

    //弹簧
    var springs = 50;

    //最大向上滑距离 - 方向
    var maxUp = -(ul.offsetHeight - ul.parentNode.offsetHeight);
    // console.log(maxUp);

    //获取所有li标签
    var lis = document.querySelectorAll(".left_menu>li");

    ul.addEventListener("touchstart",function (e) {
        if(e.targetTouches.length>1){
            return;
        }

        startY = e.targetTouches[0].clientY;

        //清除过渡
        ul.style.transition = "none";

    });

    ul.addEventListener("touchmove",function (e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        var moveY = e.targetTouches[0].clientY;

        var moveDistance = moveY - startY + preDistance;

        ul.style.transform = "translateY("+moveDistance+"px)";

        //判断下滑的距离
        if(moveDistance>springs){
            moveDistance = springs;
            console.log(moveDistance);
        }else if(moveDistance<maxUp-springs){
            //判断上滑的距离
            moveDistance = maxUp - springs;
            console.log(moveDistance);         
        }
        //设置位移 
        ul.style.transform = "translateY(" + moveDistance + "px)";
    });

    ul.addEventListener("touchend",function (e) {
        if (e.changedTouches.length > 1) {
            return;
        }

        //记录坐标
        var endY = e.changedTouches[0].clientY;
        
        preDistance = endY - startY + preDistance;

        // console.log(preDistance);
        //下滑反弹
        if (preDistance>0) {
            preDistance = 0;
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateY(" + preDistance + "px)";
        }else if(preDistance<maxUp){
            //上滑反弹
            preDistance = maxUp;
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateY(" + preDistance + "px)";
        }
    });

    itcast(ul).tap(function (e) {
        // console.log(e);
        var targetLi = e.target.parentNode;
        // console.log(targetLi)
        //给liIndex赋初值-1。
        var liIndex = -1;
        for(var i = 0; i<lis.length;i++){
            var element = lis[i];
            element.classList.remove("active");
            if(element==targetLi){
                liIndex = i;
                element.classList.add("active");
            }
        }

        //要上滚动的距离
        var totalUp = -liIndex * targetLi.offsetHeight;
         //判断最大上滚动的距离
         if(totalUp < maxUp){
             //反弹
             totalUp = maxUp;
         }
        //  preDistance = totalUp;
         ul.style.transition = "transform .5s";
         ul.style.transform = "translateY("+totalUp+"px)";
    })
}