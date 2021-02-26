<?php
header('content-type:text/html;charset=utf-8');
//获取值
$u=$_GET['name'];
$p=$_GET['pass'];
echo '<script>console.log(1111)</script>';
//链接数据库
$link=mysqli_connect('localhost','root','','mysql');
mysqli_set_charset($link,'utf8');
//sql语句
$sql="select * from users where name='$u'";
//执行sql
$result=mysqli_query($link,$sql);
//判断数据是否存在
if($row=mysqli_fetch_row($result)){
    echo "<script>alert('该手机号已被注册,请重新注册');location.href = '../pages/register.html';</script>";
}else{
    //sql2
    $sql2="insert into users(name,pass) values('$u','$p')";
    //执行
    mysqli_query($link,$sql2);
    echo "<script>alert('注册成功您可以直接登录');location.href = '../pages/login.html';</script>";
}
?>
