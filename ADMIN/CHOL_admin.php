<?php
require('../AJAX_PHP/Current_Account.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/SP_admin.css">
<div  class="change_page_CHOL">
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

<div id="form_CHOL_admin">
<div id="table_CHOL">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLCHOL_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách ốp lưng</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã sản phẩm</td>
                <td>Chất liệu</td>
                <td>Tính năng</td>
                <td>Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">

        </tbody>
    </table>
    </div>
</div>

<div id="chucnang_CHOL">


<form action="" method="POST" id="form_timkiem_CHOL">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CHOL">
\                <option value="MASP">MASP</option>
                <option value="CL">Chất liệu</option>
                <option value="TN">Tính năng</option>
            </select>
            <input type="text" id="txt_timkiem_CHOL" style="width: 54%; margin-left: 20px;" placeholder="Nhập CHOL cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_CHOL">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form> 

    <div id="container_suaCHOL">
    <form action="" method="POST" id="form_sua_CHOL">
        <h2 style="text-align: center; ">Sửa chi tiết</h2>
        <div>
            <label for="">Chất liệu: </label> 
            <input type="text" name="CL_CHOL" id="CL_CHOL_sua"> 
        </div>
        <div>
            <label for="">Tính năng: </label> 
            <input type="text" name="TN_CHOL" id="TN_CHOL_sua">
        </div> 
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MACHOL" value="" id="MACHOL_sua"> 
        <input type="submit" class="btn_suaCHOL" name="btn_suaCHOL" value="sửa" onclick="update()">

    </form>
  
</div>


<form action="" method="POST" id="form_sapxep_CHOL">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_OL">
            <option value="MA_SP">Mã sản phẩm</option>
            <option value="CHAT_LIEU">Chất liệu</option>
            <option value="TINH_NANG">Tính năng</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

</div>
</div>



<script src="JS/CHOL.js"></script>
