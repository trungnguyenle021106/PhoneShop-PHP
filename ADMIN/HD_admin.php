<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/HD_admin.css">
<div  class="change_page_PN">
<form action="" method="POST">
   <input type="hidden" name="page" value="Bán hàng">
    <input type="submit" value="Hóa đơn" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTHD">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_HD_admin">
<div id="table_HD">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách hóa đơn</h2>
    </div>
    <div id="scroll-container">
        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã hóa đơn</td>
                    <td>Mã khuyến mãi</td>
                    <td>Mã khách hàng</td>
                    <td>Mã nhân viên</td>
                    <td>Tình trạng</td>
                    <td>Ngày tạo</td>
                    <td>Tổng tiền</td>
                    <td colspan="3">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
              
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_HD">
    
    <form action="" method="POST" id="form_timkiem_HD">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_HD">
                <option value="MAHD">MAHD</option>
                <option value="Ngày tạo">Ngày tạo</option>
                <option value="MaNV">MaNV</option>
                <option value="MaKH">MaKH</option>
                <option value="Tình trạng">Tình trạng</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_HD" style="width: 54%; margin-left: 20px;" placeholder="Nhập hóa đơn cần tìm">
            <input type="submit" value="Tìm" id="btn_timkiem_HD">
    </form>

    <form action="" method="POST" id="form_sapxep_HD">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_HD">
            <option value="MAHD">MAHD</option>
            <option value="MAKH">MAKH</option>
            <option value="MANV">MANV</option>
            <option value="Tình trạng">Tình trạng</option>
            <option value="Tổng tiền">Tổng tiền</option>
            <option value="Ngày tạo">Ngày tạo</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="submit" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>
</div>
</div>

<script src="JS/HD.js"></script>
