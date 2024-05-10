<?php
require_once('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/TK_admin.css">
<script src="https://kit.fontawesome.com/3918fe69ba.js" crossorigin="anonymous"></script>

<div  class="change_page_TK">
<form action="" method="POST">
   <input type="hidden" name="page" value="Tài khoản">
    <input type="submit" value="Tài Khoản" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="Quyền">
    <input type="submit" value="Quyền" id="btn2">
    </form>
</div>

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
                    <td colspan="2" id="ThaoTac">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
            </tbody>
            <input type="hidden" id="MA_TK_btn_temp">
        </table>
    </div>
</div>

<div id="chucnang_TK">

<form action="" method="POST" id="form_sapxep_TK">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_TK">
            <option value="MA_TK">MATK</option>
            <option value="TEN_TK">Tài Khoản</option>
            <option value="MAT_KHAU">Mật Khẩu</option>
            <option value="NGAY_TAO_TK">Ngày tạo</option>
            <option value="TINH_TRANG">Tình Trạng</option>
            <option value="MA_Q">Mã Quyền</option>


        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
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
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>

    <form action="" method="POST" id="form_them_TK">
        <h2 style="text-align: center; ">Thêm Tài Khoản</h2>

        <div>
            <label for="">Tài Khoản: </label> 
            <input type="text" name="TenTK" id="TenTK_add"> <span style="color: red; ">(*)</span>
        </div>
        <div style="margin-bottom: 10px; position: relative;">
            <label for="">Mật Khẩu: </label> 
            <input type="password" name="MATKHAU" id="MATKHAU_add"> 
            <span id="togglePassword" onclick="togglePasswordVisibility()" style="position: absolute; right: 60px; top: 3px;">
            <i id="eyeIcon" class="fa fa-eye"></i> </span>
            <span style="color: red; ">(*)</span>
            
    </div>
    <div>
        <label for="">Cấp quyền: </label>
        <select name="" id="quyen">
            <?php
            foreach( $connect->read("quyen") as $row){
            ?>
            <option value="<?php echo $row["MA_Q"]; ?>"><?php echo $row["TEN_Q"]; ?></option>
            <?php } ?>
        </select>
    </div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themTK" name="btn_themTK" value="Thêm" onclick="add()">
    </form>

</div>
</div>

<div id="container_suaTK">
    <form action="" method="POST" id="form_sua_TK">
        <h2 style="text-align: center; ">Đổi mật khẩu</h2>
        <div>
            <label for="">Mật Khẩu mới: </label> 
            <input type="text" name="MKTK" id="MKTK_sua"> 
            </div>
    <input type="hidden" id="MATK_sua">
    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="button" id="suaTK_btn" onclick="update()" value="Xác nhận">
    </form>
</div>

<script src="JS/TK.js"></script>
