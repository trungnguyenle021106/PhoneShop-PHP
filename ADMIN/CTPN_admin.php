<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/PNK_admin.CSS">

<div  class="change_page_CTPN">
<form action="" method="POST">
   <input type="hidden" name="page" value="Nhập hàng">
    <input type="submit" value="Phiếu nhập" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTPN">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_CTPN_admin">
    
<div id="table_CTPN">
<div style="display: flex;">
    <div id="SLHT_CTPN" style="margin-top: 20px; margin-left: 20px; font-size: 25px;">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 200px; ">Danh sách chi tiết phiếu nhập</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã phiếu nhập</td>
                <td>Mã sản phẩm</td>
                <td>Đơn giá</td>
                <td>Số lượng</td>
                <td>Thành tiền</td>
                <td colspan="2" id="ThaoTac">Thao tác</td>
            </tr>
        </thead>
        <tbody id="data">

        </tbody>
    </table>
        </div>
 
</div>

<div id="chucnang_CTPN">
<form action="" method="POST" id="form_sapxep_CTPN">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_CTPN">
            <option value="MA_PN">MAPN</option>
            <option value="MA_SP">MASP</option>
            <option value="DON_GIA">Đơn Giá</option>
            <option value="SO_LUONG">Số lượng</option>
            <option value="THANH_TIEN">Thành tiền</option>

        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" value="tăng dần" name="btn_sortAZ_CTPN" class="btn_sortAZ"></input>
        <input type="submit" value="giảm dần" name="btn_sortZA_CTPN" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_CTPN">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CTPN">
                <option value="MACTPN">MAPN</option>
                <option value="MASP">MASP</option>
                <option value="DON_GIA">Đơn Giá</option>
                <option value="Số lượng">Số lượng</option>
                <option value="Thành tiền">Thành tiền</option>
            </select>
            <input type="number" id="txt_timkiem_CTPN" style="width: 54%; margin-left: 20px;" placeholder="Nhập CTPN cần tìm">
            <div class="khoang" style="display: flex; margin-top: 10px; display: none;">
            <input id="DONGIA_start_other" type="number" style="height: 20px; width: 50px; margin-left: 100px;  margin-right: 10px; text-align: center; " placeholder="Start"> -> 
            <input id="DONGIA_end_other" type="number" style="height: 20px; width: 50px;  margin-left: 10px; text-align: center;" placeholder="End">
            </div>
            <div class="khoang1" style="display: flex; margin-top: 10px; display: none;">
            <input id="SL_start_other" type="number" style="height: 20px; width: 50px; margin-left: 100px;  margin-right: 10px; text-align: center; " placeholder="Start"> -> 
            <input id="SL_end_other" type="number" style="height: 20px; width: 50px;  margin-left: 10px; text-align: center;" placeholder="End">
            </div>
            <div class="khoang2" style="display: flex; margin-top: 10px; display: none;">
            <input id="THANHTIEN_start_other" type="number" style="height: 20px; width: 50px; margin-left: 100px;  margin-right: 10px; text-align: center; " placeholder="Start"> -> 
            <input id="THANHTIEN_end_other" type="number" style="height: 20px; width: 50px;  margin-left: 10px; text-align: center;" placeholder="End">
            </div>
            <input type="button" value="Tìm" id="btn_timkiem_CTPN">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>

<div id="suaCTPN_container">
    <form action="" method="POST" id="form_suaCTSP">
        <h2 style="text-align: center;">Sửa chi tiết</h2>
        <div style="display: flex;">
            <label for="">Số Lượng: </label>
            <input type="number" id="SL_sua_CTSP" name="SL_sua_CTSP">
        </div>
        <div style="display: flex;">
            <label for="">Đơn giá: </label>
            <input type="number" id="DONGIA_sua_CTSP" name="DONGIA_sua_CTSP">
        </div>
            <input type="hidden" id="THANHTIEN_sua_CTSP" name="THANHTIEN_sua_CTSP">

        <input type="hidden" value="<?php echo $_POST['page']; ?>" name="page" >
        <input type="hidden" value="" name="MAPN" id="MAPN_sua_hidden">
        <input type="hidden" value="" name="MASP" id="MASP_sua_hidden">
        <input type="submit" value="Xác nhận" name="btn_xacnhan_sua" id="btn_xacnhan_sua">
    </form>
</div>

</div>
</div>


<script src="JS/CTPN.js"></script>

