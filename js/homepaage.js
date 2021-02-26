

//photo轮播图
var mySwiper = new Swiper ('.swiper-container', {
    autoplay: true,//可选选项，自动滑动
    // direction: 'vertical', // 垂直切换选项
    speed:1000,
    loop: true, // 循环模式选项
    // effect :'cube',
    
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    //     hide: true,
    // },
})  
for(i=0;i<mySwiper.pagination.bullets.length;i++){
    mySwiper.pagination.bullets[i].onmouseover=function(){
      this.click();
    };
  } 


//slider1轮播图
var mySwiper = new Swiper ('.swiper-container1', {
    // autoplay: true,//可选选项，自动滑动
    // direction: 'vertical', // 垂直切换选项
    speed:1000,
    loop: true, // 循环模式选项
    // effect :'cube',
    
    // 如果需要分页器
    // pagination: {
    //     el: '.swiper-pagination',
    // },
    
    // 如果需要前进后退按钮
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
    
    // 如果需要滚动条
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    //     hide: true,
    // },
})

  

//lunbo轮播图
var mySwiper = new Swiper ('.swiper-container2', {
    // autoplay: true,//可选选项，自动滑动
    // direction: 'vertical', // 垂直切换选项
    speed:1000,
    loop: true, // 循环模式选项
    // effect :'cube',
    
    // 如果需要分页器
    // pagination: {
    //     el: '.swiper-pagination',
    // },
    
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    //     hide: true,
    // },
}) 


