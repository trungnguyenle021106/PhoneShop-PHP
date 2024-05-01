<?php
require('../AJAX_PHP/Current_Account.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/SP_admin.css">
<div  class="change_page_SP">
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

<div id="form_SP_admin">
<div id="table_SP">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLSP_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách sản phẩm</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã sản phẩm</td>
                <td>Loại</td>
                <td>Mã nhà sản xuất</td>
                <td>Tên sản phẩm</td>
                <td>Giá</td>
                <td>Hình ảnh</td>
                <td>Số lượng</td>
                <td colspan="3" id="thao_tac">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">
            
        </tbody>
    </table>
    </div>
</div>


<div id="chucnang_SP">


<form action="" method="POST" id="form_sapxep_SP">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_SP">
            <option value="MA_SP">MASP</option>
            <option value="MA_LOAI">loại</option>
            <option value="MA_NSX">MANSX</option>
            <option value="TEN_SP">Tên sản phẩm</option>
            <option value="GIA_BAN">Giá tiền</option>
            <option value="SO_LUONG">Số lượng</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>


<form action="" method="POST" id="form_timkiem_SP">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_SP">
                <option value="MASP">MASP</option>
                <option value="Loại">loại</option>
                <option value="MA_NSX">Mã NSX</option>
                <option value="Tên_SP">Tên sản phẩm</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_SP" style="width: 54%; margin-left: 20px;" placeholder="Nhập SP cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_SP">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>


    <form action="" method="POST" id="form_them_SP">
        <h2 style="text-align: center; ">Thêm Sản Phẩm</h2>
    
        <div style="margin-bottom: 10px;">
      <label for="">Mã nhà sản xuất: </label>
        <select name="" id="opt_MANSX" style="border: 2px solid black;">
        <?php
        foreach( $connect->read("nha_sx") as $row){
        ?>
            <option value="<?php echo $row['MA_NSX']; ?>"><?php echo $row['TEN_NSX']; ?></option>
            <?php } ?>
        </select>
      </div>

        <div>
            <label for="">Tên Sản phẩm: </label> 
            <input type="text" name="TenSP" id="TenSP_add"> <span style="color: red; ">(*)</span>
        </div>
        <div>
            <label for="">Giá: </label> 
            <input type="number" name="GIA_SP" id="GIA_SP_add"> <span style="color: red; ">(*)</span>
    </div>
    <div>
        <label for="">Hình ảnh: </label>
        <input type="file" name="ANH_SP" id="ANH_SP_add"> <span style="color: red; ">(*)</span>
</div>
      <div>
      <label for="">Loại: </label>
        <select name="Loai" id="opt_loai" style="border: 2px solid black;">
            <option value="1">Điện thoại</option>
            <option value="3">Tai nghe</option>
            <option value="4">Ốp lưng</option>
            <option value="5">Sạc</option>


        </select>
      </div>

      <div>
      </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themSP" name="btn_themSP" value="Thêm">
    </form>



    <div id="container_suaSP">
    <form action="" method="POST" id="form_sua_SP">
        <h2 style="text-align: center; ">Sửa sản phẩm</h2>
        <div>
            <label for="">Tên SP: </label> 
            <input type="text" name="TenSP" id="TenSP_sua"> 
        </div>
        <div>
            <label for="">Giá: </label> 
            <input type="number" name="Gia_SP" id="Gia_SP"> 
        </div>
    <div>
        <label for="">Hình ảnh: </label>
        <input type="file" name="AnhSP" id="AnhSP"> 
</div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MASP" value="" id="MASP_sua"> 
        <input type="hidden" name="anh_su" value="" id="anh_su"> 

        <input type="submit" class="btn_suaSP" name="btn_suaSP" value="sửa" onclick="update()">
    </form>
    </div>


</div>
</div>

<?php
require("form_themCHSP_admin.php");
?>
<script src="JS/SP.js"></script>

