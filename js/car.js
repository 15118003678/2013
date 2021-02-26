//获取账号cookie
var name1 = getCookie("user")
//获取大盒子对象
var box = document.querySelector(".car")
//获取地址栏中的地址
var url = location.href
//获取localStorage中的cartList3
var cartList = localStorage.getItem("cartList3")
//把当前cartList字符串转为数组对象
cartList = JSON.parse(cartList) || []
//判断当前cookie是否存在
if (name1) {
    show()
} else {
    alert("你还没登录，请登录在进入")
    location = "./login.html?pathUrl=" + url
}

function show() {
    //判断当前localStorage中是否有内容
    if (cartList.length > 0) {
        //获取全选框是否被选中
        var aa = cartList.every(item => {
            //判断当前商品是否被选中
            return item.is_select == 1
        })
        //获取当前被选中商品的种类和价格
        var sum = total()
        console.log(sum)
        var str2 = `
        <div class="car">
                <table width=1600 cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="quan" ${aa?"checked":''}>全选
                            </th>
                            <th>产品</th>
                            <th>描述</th>
                            <th>数量</th>
                            <th>价格</th>
                            <th>小计</th>
                        </tr>
                    </thead>
                    <tbody>
        `
        //遍历数组中所有商品
        cartList.forEach(item => {
            str2 += `
            <tr>
                            <td>
                                <input type="checkbox" ${item.is_select==1?"checked":''} name="xuan" data-id="${item.id}">
                            </td>
                            <td>
                                <img src="${item.imgUrl}" width="100">
                            </td>
                            <td>
                                <p>
                                    <b>款号：</b>
                                    MM8J004MWO019
                                </p>
                                <p>
                                    <b>商品：</b>
                                    ${item.name}
                                </p>
                                <p>
                                    <b>颜色：</b>
                                    浅灰色
                                </p>
                                <p>
                                    <b>尺寸：</b>
                                    S
                                </p>
                                <p>
                                    <button data-id="${item.id}">移除</button>
                                </p>
                            </td>
                            <td>
                                <button data-id="${item.id}" ${item.car_number<=1?"disabled":''}>-</button>
                                <button disabled>${item.car_number}</button>
                                <button data-id="${item.id}" ${item.numeber<=item.car_number?"disabled":''}>+</button>
                            </td>
                            <td>
                                <span>${item.message.split(' ')[24]}</span>
                            </td>
                            <td>
                                <span>${item.message.split(' ')[24].split('¥')[1]*item.car_number}</span>
                            </td>
                        </tr>
            `
            // console.log(item.message.split(' ')[24].split('¥')[1],item.car_number)
        })
        //给当前字符串拼接结束的标签
        str2 += '</tbody>'
        str2 += `
                <tfoot>
                    <tr>
                        <td colspan="6">
                            总计：￥<span>${sum[1]}</span><br/>
                            <button class="settlement">去结算</button>
                        </td>
                    </tr>
                </tfoot>
        `
        //最后把拼接好的内容添加到box大盒子中
        box.innerHTML = str2
    } else {
        var str1 = `
          <div class="jumbotron">
              <h1>您的购物车空空如也</h1>
              <p>点击下方按钮快去选购吧! ^_^</p>
              <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">赶紧去选吧</a></p>
          </div>
        `
        //把当前内容添加到box盒子中
        box.innerHTML = str1
    }
}
//给box大盒子对象绑定点击事件
box.onclick = function (e) {
    var e = e || window.event
    //获取点击对象
    var target = e.target || e.srcElement
    //判断当前点击的是否为+
    if (target.innerHTML == "+") {
        //获取当前对象中的id属性
        var id = target.getAttribute("data-id")
        //遍历cartList数组对象
        cartList.forEach(item => {
            //判断遍历出来的商品是否为当前操作商品
            if (item.id == id) {
                item.car_number++
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //判断当前点击的是否为减法按钮
    if (target.innerHTML == '-') {
        //获取当前对象中的id属性
        var id = target.getAttribute("data-id")
        //遍历cartList数组对象
        cartList.forEach(item => {
            //判断遍历出来的商品是否为当前操作商品
            if (item.id == id) {
                item.car_number--
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //删除
    if (target.innerHTML == "移除") {
        //获取当前点击对象的id
        var id = target.getAttribute("data-id")
        cartList = cartList.filter(item => {
            //过滤被删除的商品
            return item.id != id
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //全选
    if (target.name == "quan") {
        //遍历所有商品
        cartList.forEach(item => {
            //判断当前全选框是否被选中
            if (target.checked) {
                item.is_select = 1
            } else {
                item.is_select = 0
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //选中框
    if (target.name == "xuan") {
        //获取当前商品对应的id 
        var id = target.getAttribute("data-id")
        //遍历数组中所有的商品对象
        cartList.forEach(item => {
            if (item.id == id) {
                //   //判断当前选中框是否被选中
                //   if(item.is_select==1){
                //       item.is_select=0
                //   }else{
                //       item.is_select=1
                //   }
                item.is_select = item.is_select == 1 ? "0" : "1"
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //去结算
    if (target.innerHTML == "去结算") {
        //添加确认框
        if (confirm("你确定要购买吗？")) {
            alert("你需要支付：￥" + total()[1])
            cartList = cartList.filter(item => {
                return item.is_select != 1
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
    }
    //清空购物车
    if (target.innerHTML == "清空购物车") {
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList3", JSON.stringify([]))
        //调用show方法，重新把页面再次渲染
        show()
    }

}
//统计所选商品种类和价格
function total() {
    var num = 0 //所选商品种类
    var price = 0 //所选商品总价格
    //遍历cartList数组对象
    cartList.forEach(item => {
        //判断当前商品是否被选中
        if (item.is_select == 1) {
            num++
            price += item.car_number * item.message.split(' ')[24].split('¥')[1]
        }
    })
    return [num, price]
} 