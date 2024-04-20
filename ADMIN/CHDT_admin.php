<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/SP_admin.css">
<div  class="change_page_CHDT">
<form action="" method="POST">
   <input type="hidden" name="page" value="Sản phẩm">
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

<div id="form_CHDT_admin">
<div id="table_CHDT">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLCHDT_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách điện thoại</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã sản phẩm</td>
                <td>RAM</td>
                <td>Bộ nhớ trong</td>
                <td>Màn hình</td>
                <td>Màu sắc</td>
                <td>Pin</td>
                <td>Camera trước</td>
                <td>Camera sau</td>
                <td>Thao tác</td>
            </tr>
        </thead>

        <tbody>
             <!-- nơi hiển thị sản phẩm -->
        </tbody>
    </table>
    </div>
</div>

<div id="chucnang_CHDT">
<form action="" method="POST" id="form_timkiem_CHDT">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CHDT">
                <option value="MASP">MASP</option>
                <option value="RAM">RAM</option>
                <option value="BNT">Bộ nhớ trong</option>
                <option value="MH">Màn hình</option>
                <option value="MS">Màu sắc</option>

            </select>
            <input type="text" id="txt_timkiem_CHDT" style="width: 54%; margin-left: 20px;" placeholder="Nhập CHDT cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_CHDT">
    </form> 
</div>
</div>

<div id="container_suaCHDT">
    <form action="" method="POST" id="form_sua_CHDT">
        <h2 style="text-align: center; ">Sửa sản phẩm</h2>
        <div>
            <label for="">RAM: </label> 
            <input type="number" name="RAM_CHDT_sua" id="RAM_CHDT_sua"> 
        <div>
            <label for="">Bộ nhớ trong: </label> 
            <input type="number" name="BNT_CHDT" id="BNT_CHDT_sua"> 
    <div>
        <label for="">Màn hình: </label>
        <input type="text" name="MH_CHDT" id="MH_CHDT_sua"> 
</div>
<div>
        <label for="">Màu sắc: </label>
        <input type="text" name="MS_CHDT" id="MS_CHDT_sua"> 
</div>
<div>
        <label for="">Pin: </label>
        <input type="number" name="PIN_CHDT" id="PIN_CHDT_sua"> 
</div>
<div>
        <label for="">Camera trước: </label>
        <input type="number" name="CAMTRC_CHDT" id="CAMTRC_CHDT_sua"> 
</div>
<div>
        <label for="">Camera sau: </label>
        <input type="number" name="CAMSAU_CHDT" id="CAMSAU_CHDT_sua"> 
</div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MACHDT" value="" id="MACHDT_sua"> 
        <input type="hidden" name="anh_su" value="" id="anh_su"> 

        <input type="submit" class="btn_suaCHDT" name="btn_suaCHDT" value="sửa" onclick="update()">

    </form>
    </div>
</div>
</div>
<script src="JS/CHDT.js"></script>
