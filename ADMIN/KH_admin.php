<?php
require_once('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/KH_admin.CSS">
<div id="form_KH_admin">
<div id="table_KH">
<div style="display: flex;" id="SLKH_HT">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách khách hàng</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>MAKH</td>
                    <td>MATK</td>
                    <td>Họ Tên</td>
                    <td>Giới tính</td>
                    <td>Địa chỉ</td>
                    <td>SDT</td>
                    <td>CCCD</td>
                    <td colspan="2" id="ThaoTac">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">

            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_KH">


    <form action="" method="POST" id="form_timkiem_KH">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_KH">
                <option value="MAKH">MAKH</option>
                <option value="Tên khách hàng">Tên khách hàng</option>
                
                <option value="Địa chỉ">Địa chỉ</option>
                <option value="SDT">SDT</option>
                <option value="CCCD">CCCD</option>
                <option value="MATK">MATK</option>
            </select>
            <input type="text" id="txt_timkiem_KH" style="width: 54%; margin-left: 20px;" placeholder="Nhập khách hàng cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tìm" id="btn_timkiem_KH">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>

    

<div id="container_suaKH">
    <form action="" method="POST" id="form_sua_KH">
        <h2 style="text-align: center; ">Sửa thông tin khách hàng</h2>
        <div>
            <label for="">Tên KH: </label> 
            <input type="text" name="TenKH" id="TenKH_sua"> 
            </div>
        <div>
            <label for="">SDT: </label> 
            <input type="number" name="SDT_KH" id="SDT_KH"> 
            </div>
    <div>
        <label for="">Địa chỉ: </label>
        <input type="text" name="DiaChiKH" id="DiaChiKH"> 
    </div>
    <div style="display: flex">
        <label for="">Giới Tính: </label>
        <select name="" id="GT_KH">
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
        </select>
    </div>
    <div>
        <label for="">CCCD: </label>
        <input type="number" name="DiaChiKH" id="CCCD_KH"> 
    </div>
    <input type="hidden" id="MAKH_sua">
    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="button" id="suaKH_btn" onclick="update()" value="Sửa">
    </form>
    </div>

    <form action="" method="POST" id="form_sapxep_KH">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_KH">
            <option value="MA_KH">MAKH</option>
            <option value="MA_TK">MATK</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ_KH" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA_KH" class="btn_sortZA"></input>
    </form>
    </div>
    </div>


<script src="JS/KH.js"></script>

