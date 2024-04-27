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
                    <td>Ngày sinh</td>
                    <td>MATK</td>
                    <td colspan="3">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
             
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

    <form action="" method="POST" id="form_them_NV">
        <h2 style="text-align: center; ">Thêm Nhân VIên</h2>

        <div>
            <label for="">Họ Tên: </label> 
            <input type="text" name="TenNV" id="TenNV_add"> <span style="color: red; ">(*)</span>
        </div>
        <div>
            <label for="">Địa Chỉ: </label> 
            <input type="text" name="DIACHI" id="DIACHI_add"> <span style="color: red; ">(*)</span>
    </div>
    <div>
        <label for="">SDT: </label>
        <input type="number" name="SDT" id="SDT_add"> <span style="color: red; ">(*)</span>
</div>
<div>
        <label for="">CCCD: </label>
        <input type="number" name="CCCD" id="CCCD_add"> <span style="color: red; ">(*)</span>
</div>
<div style="margin-bottom: 10px;">
        <label for="">Giới Tính: </label>
            <input type="radio" name="opt_gt" value="Nam">Nam</input>
            <input type="radio" name="opt_gt" value="Nữ">Nữ</input>
        </select> <span style="color: red; ">(*)</span>
</div>
<div>
        <label for="">Ngày Sinh: </label>
        <input type="date" name="ngaysinh" id="ngaysinh_add"> <span style="color: red; ">(*)</span>
</div>
 
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themNV" name="btn_themNV" value="Cáp tài khoản">
    </form>
    
</div>
</div>

<div id="suaNV_container">
<form action="" method="POST" id="form_sua_NV">
    <h2 style="text-align: center;">Sửa thông tin</h2>
    <div style="diNVlay: flex;">
        <label for="">Họ Tên: </label>
        <input type="text" id="TEN_sua_NV" name="SL_sua_NV">
    </div>
    <div style="diNVlay: flex;">
        <label for="">Địa Chỉ: </label>
        <input type="text" id="DIACHI_sua_NV" name="DONGIA_sua_NV">
    </div>
    <div style="diNVlay: flex;">
        <label for="">SDT: </label>
        <input type="number" id="SDT_sua_NV" name="DONGIA_sua_NV">
    </div>

    <input type="hidden" value="<?php echo $_POST['page']; ?>" name="page" >
    <input type="hidden" value="" name="MAPN" id="MANV_sua_hidden">
    <input type="submit" value="Xác nhận" name="btn_xacnhan_sua" id="btn_xacnhan_sua" onclick="update()">
</form>
</div>


<div id="capTK_container">
<form action="">
    <h2>Danh sách tài khoản</h2>
    <section>
        <table>
            <thead>
                <td>Tên tài khoản</td>
                <td>Mật khẩu</td>
                <td>Ngày tạo</td>
                <td>Quyền</td>
            </thead>
            <tbody>
                <?php
                $check = 0;
                foreach($connect->read("tai_khoan") as $row){
                    if($row['TINH_TRANG'] !== 'hoạt động' ){
                        $check++;
                ?>
                <tr>
                <input type="hidden" id="MA_TK_hidden" value="<?php echo $row['MA_TK']; ?>">
                <td><?php echo $row['TEN_TK']; ?></td>
                <td><?php echo $row['MAT_KHAU']; ?></td>
                <td><?php echo $row['NGAY_TAO_TK']; ?></td>
                <td><?php foreach($connect->read("quyen") as $row_Q){
                    if($row['MA_Q'] == $row_Q['MA_Q']){
                        echo $row_Q['TEN_Q']; break;
                    }
                }
            } ?>
            </td>
                </tr>
                <?php }
                if($check == 0){
                    echo "hiện tại không có tài khoản nào đang trống";
                } ?>
            </tbody>
            <input type="hidden" id="MA_TK_tam" value="">
            </table>
            </section>

    <button id="capTK_btn" onclick="add()">Cấp</button>
</form>
</div>

<script src="JS/NV.js"></script>

