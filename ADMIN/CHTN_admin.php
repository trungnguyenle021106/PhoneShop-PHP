<?php
require_once('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/SP_admin.css">
<div  class="change_page_CHTN">
<form action="" method="POST">
   <input type="hidden" name="page" value="Sản Phẩm">
    <input type="submit" value="Sản phẩm" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CHTN">
    <input type="submit" value="Cấu hình tai nghe" id="btn2">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CHDT">
    <input type="submit" value="Cấu hình điện thoại" id="btn3">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CHOL">
    <input type="submit" value="Cấu hình ốp lưng" id="btn4">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CHS">
    <input type="submit" value="Cấu hình sạc" id="btn5">
    </form>
</div>

<div id="form_CHTN_admin">
<div id="table_CHTN">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLCHTN_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách tai nghe</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã sản phẩm</td>
                <td>Kết nối</td>
                <td>Tính năng</td>
                <td id="ThaoTac">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">

        </tbody>

    </table>
    </div>
</div>

<div id="chucnang_CHTN">
<form action="" method="POST" id="form_timkiem_CHTN">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CHTN">
\                <option value="MASP">MASP</option>
                <option value="KN">Kết nối</option>
                <option value="TN">Tính năng</option>
            </select>
            <input type="text" id="txt_timkiem_CHTN" style="width: 54%; margin-left: 20px;" placeholder="Nhập CHTN cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_CHTN">

    </form>  


    
    <div id="container_suaCHTN">
    <form action="" method="POST" id="form_sua_CHTN">
        <h2 style="text-align: center; ">Sửa chi tiết</h2>
        <div>
            <label for="">Kết nối </label> 
            <input type="text" name="KN_CHTN" id="KN_CHTN_sua"> 
        </div>
        <div>
            <label for="">Tính năng: </label> 
            <input type="text" name="TN_CHTN" id="TN_CHTN_sua"> 
        </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MACHTN" value="" id="MACHTN_sua"> 
        <input type="submit" class="btn_suaCHTN" name="btn_suaCHTN" value="sửa" onclick="update()">

    </form>
    </div>

    <form action="" method="POST" id="form_sapxep_TN">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_TN">
            <option value="MASP">MASP</option>
            <option value="KN">Kết nối</option>
            <option value="TN">Tính năng</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>


</div>
</div>

<script src="JS/CHTN.js"></script>
