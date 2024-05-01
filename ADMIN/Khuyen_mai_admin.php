<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/KM_admin.css">

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
                <td>Mã khuyến mãi</td>
                <td>Tên khuyến mãi</td>
                <td>Điều kiện</td>
                <td>Số tiền giảm</td>
                <td>Ngày bắt đầu</td>
                <td>Ngày kết thúc</td>
                <td colspan="3" id="thao_tac">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">
            
        </tbody>
    </table>
    </div>
</div>


<div id="chucnang_SP">

<form action="" method="POST" id="form_sapxep_KM">
    <h2 id="title">Sắp xếp</h2>
    <select name="" id="opt_sapxep_KM">
        <option value="NBD">Ngày bắt đầu</option>
        <option value="NKT">Ngày kết thúc</option>
    </select>
    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="submit" value="Tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
    <input type="submit" value="Giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
</form>

<form action="" method="POST" id="form_timkiem_KM">
    <h2 id="title">Tìm kiếm</h2>
    <select name="" id="opt_timkiem_SP">
        <option value="MaKM">Mã Khuyến mãi</option>
        <option value="TenKM">Tên khuyến mãi</option>
    </select>

    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="text" id="txt_timkiem_SP" style="width: 54%; margin-left: 20px;" placeholder="Nhập khuyến mãi cần tìm"> <br><br>
    
    <label for="startDate">Ngày bắt đầu:</label>
    <input type="date" id="startDate" name="startDate"> <br><br>

    <label for="endDate">Ngày kết thúc:</label>
    <input type="date" id="endDate" name="endDate"> <br>

    <input type="button" value="Tìm" id="btn_timkiem_SP">
</form>


    <form action="" method="POST" id="form_them_KM">
        <h2 style="text-align: center; ">Thêm khuyến mãi</h2>
    
        <div style="margin-bottom: 10px;">

        <div>
            <label for="">Tên khuyến mãi: </label> 
            <input type="text" name="TenSP" id="TenSP_add"> <span style="color: red; ">(*)</span>
        </div>

        <div>
            <label for="">Điều kiện: </label> 
            <input type="number" name="Dieu_kien" id="Dieu_kien"> <span style="color: red; ">(*)</span>
        </div>
        <div>
            <label for="">Số tiền giảm: </label> 
            <input type="number" name="Tien_giam" id="Tien_giam"> <span style="color: red; ">(*)</span>
        </div>

        <div>
            <label for="">Ngày bắt đầu:</label>
            <input type="date" id="startDate" name="startDate"> <span style="color: red; ">(*)</span>
        </div>

        <div>
            <label for="">Ngày kết thúc:</label>
            <input type="date" id="endDate" name="endDate"> <span style="color: red; ">(*)</span>
        </div>

      <div>
      </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_them_KM" name="btn_them_KM" value="Thêm">
    </form>



    <div id="container_suaSP">
    <form action="" method="POST" id="form_sua_SP">
        <h2 style="text-align: center; ">Sửa sản phẩm</h2>
        <div>
            <label for="">Tên SP: </label> 
            <input type="text" name="TenSP" id="TenSP_sua"> 
        <div>
            <label for="">Giá: </label> 
            <input type="number" name="Gia_SP" id="Gia_SP"> 
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
</div>
<script src="JS/KM.js"></script>
</div>