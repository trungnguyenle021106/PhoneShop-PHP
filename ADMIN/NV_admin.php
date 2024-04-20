<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/NV_admin.css">
<div id="form_NV_admin">
<div id="table_NV">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLNV_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách nhân viên</h2>
    </div>
    <div id="scroll-container">
        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>MANV</td>
                    <td>Họ Tên</td>
                    <td>Địa chỉ</td>
                    <td>SDT</td>
                    <td>CCCD</td>
                    <td>Giới tính</td>
                    <td>Tuổi</td>
                    <td>MATK</td>
                    <td colspan="3">Thao tác</td>
                </tr>
            </thead>
            <tbody>
             
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_NV">
    
    <form action="" method="POST" id="form_timkiem_NV">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_NV">
                <option value="MANV">MANV</option>
                <option value="Tên nhân viên">Tên nhân viên</option>
                <option value="Địa chỉ">Địa chỉ</option>
                <option value="SDT">SDT</option>
                <option value="CCCD">CCCD</option>
                <option value="MATK">MATK</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_NV" style="width: 54%; margin-left: 20px;" placeholder="Nhập nhân viên cần tìm">
            <input type="submit" value="Tìm" id="btn_timkiem_NV">
    </form>

  
</div>
</div>

<script src="JS/NV.js"></script>

