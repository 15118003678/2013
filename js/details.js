
//获取当前地址栏中的参数信息
var search=location.search
//获取大盒子对象
var box=document.querySelector(".details")
var dt;
//判断当前search对象中是否有值
if(search){
    //分割search字符串
    var id=search.split('=')[1];

    (async function(){
         dt=await promiseAjax({
            url:'../php/details.php',
            data:'id='+id,
            datatype:'json'
        })     
        //创建拼接所有内容的字符串
        var str=`
                        <div class="details-left">
                        <div class="exzoom" id="exzoom">
                            <div class="exzoom_img_box" style="width: 486px;height: 720px;">
                                <ul class='exzoom_img_ul'>
                                    <li><img src="${dt.imgUrl}" /></li>
                                    <li><img src="${dt.imgUr2}" /></li>
                                    <li><img src="${dt.imgUr3}" /></li>
                                    <li><img src="${dt.imgUr4}" /></li>
                                </ul>
                            </div>
                            <div class="exzoom_nav"></div>
                            <p class="exzoom_btn">
                                <a href="javascript:void(0);" class="exzoom_prev_btn"> &lt; </a>
                                <a href="javascript:void(0);" class="exzoom_next_btn"> &gt; </a>
                            </p>
                        </div>
                    </div>
                    <div class="details-right">
                        <h3>${dt.message.split(' ')[0]}</h3>
                        <h4>${dt.message.split(' ')[24]} &nbsp;&nbsp;&nbsp;&nbsp; </h4>
                        <div class="dec"><b>款号：</b>MM8J004MWO019</div>
                        <div id="yanse" class="dec"><b>颜色：</b> <div title="浅灰色" data-colorcode="LT GREY" class="color_box current"><img src="../img/BZ39.jpg"></div></div>
                        <div id="chima" class="dec"><b>尺码：</b> <div data-size="S" data-low="1" class="size_box">S</div><div data-size="M" data-low="0" class="size_box">M</div><div data-size="L" data-low="0" class="size_box">L</div><div data-size="XL" data-low="1" class="size_box">XL</div> </div>
                        <div class="dec"><b>数量：</b> <select class="num_box"><option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option></select></div><br>
                        <button type="button" class="btnstyle_xxl_b" style="width: 100%;">加入购物车</button>
                        <button type="button" class="btnstyle_xxl_w" style="width: 100%;"><a href="./car.html">点击直接购买</a></button>
                        <button type="button" class="btnstyle_xxl_w" style="width: 100%;">添加到心愿单 </button>
                        <p>
                            <b>商品描述：</b>
                        </p>
                        <p>
                            <b>尺码表：</b>
                            <table class="measurement"><tbody><tr><th>尺寸</th><th>胸围</th><th>下摆</th><th>衣长</th><th>袖口宽</th></tr><tr class="hui"><td>S</td><td>117</td><td>109</td><td>66</td><td>23</td></tr><tr><td>M</td><td>122</td><td>114</td><td>68</td><td>24</td></tr><tr class="hui"><td>L</td><td>127</td><td>119</td><td>70</td><td>25</td></tr><tr><td>XL</td><td>135</td><td>127</td><td>72</td><td>26</td></tr></tbody></table>
                        </p>
                        <p>
                            <b>面料说明：</b><br>
                            <small>复合面布:100% 锦纶; 复合底布:100% 锦纶;</small>
                        </p>
                    </div>
        
        `
        //把当前内容添加到大盒子中
        box.innerHTML=str;
                    $("#exzoom").exzoom({
                        autoPlay: false,
                    });//方法调用，务必在加载完后执行
                    // defaults = {
                    //     "navWidth":20,//列表每个宽度,该版本中请把宽高填写成一样
                    //     "navHeight":,//列表每个高度,该版本中请把宽高填写成一样
                    //     "navItemNum": 5,//列表显示个数
                    //     "navItemMargin": 20,//列表间隔
                    //     "navBorder": 1,//列表边框，没有边框填写0，边框在css中修改
                    //     "autoPlay": true,//是否自动播放
                    //     "autoPlayTimeout": 2000,//播放间隔时间
                    // };
    })()
}else{
    alert("你还没选中商品")
    location="./list.html"
}


//给大盒子对象绑定点击事件
box.onclick=function(e){
    var e = e || window.event
    //获取点击对象
    var target=e.target || e.srcElement
    //判断点击的对象是否为加入购物车按钮
    if(target.innerHTML=="加入购物车"){
        console.log(dt)
        //获取localStorage中的cartList3
        var cartList=localStorage.getItem("cartList3")
        console.log(cartList)
        //判断当前获取的cartList是否存在
        if(cartList){
            //把localStorage中获取的内容转为数组对象
            cartList=JSON.parse(cartList)
            var a=0 //判断当前添加的商品是否在localStorage中存在
            //遍历数组中所有元素啊
            cartList.forEach(item=>{
                //判断当前遍历的商品是否等于要添加的商品
                if(item.id==dt.id){
                    a++
                    item.car_number++
                }
            })
            //判断a变量是否等于0
            if(a==0){
                //修改商品数量
                dt.car_number=1
                //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3",JSON.stringify(cartList))
        }else{
            dt['car_number']=1
            localStorage.setItem("cartList3",JSON.stringify([dt]))
        }

    }  
}