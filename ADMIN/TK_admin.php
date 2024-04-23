<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/TK_admin.css">
<div id="form_TK_admin">
<div id="table_TK">
<div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLTK_HT" >Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách tài khoản</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>MATK</td>
                    <td>Tên Tài Khoản</td>
                    <td>Mật Khẩu</td>
                    <td>Ngày tạo</td>
                    <td>Tình trạng</td>
                    <td>Mã Quyền</td>
                    <td colspan="3">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_TK">

<form action="" method="POST" id="form_sapxep_TK">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_TK">
            <option value="MATK">MATK</option>
            <option value="Quyền">Quyền</option>
            <option value="Tình trạng">Tình trạng</option>
            <option value="Ngày tạo">Ngày tạo</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="submit" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_TK">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_TK">
                <option value="MATK">MATK</option>
                <option value="Tên TK">Tên tài khoản</option>
                <option value="Ngày tạo">Ngày tạo</option>
                <option value="Quyền">Quyền</option>
                <option value="TinhTrang">Tình Trạng</option>
            </select>
            <input type="text" id="txt_timkiem_TK" style="width: 50%; margin-left: 20px;" placeholder="Nhập tài khoản cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tìm" id="btn_timkiem_TK">
    </form>


</div>
</div>

<script src="JS/TK.js"></script>
