<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/NSX_admin.css">
<div id="form_NSX_admin">
<div id="table_NSX">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLNSX_HT"> Số lượng nhà sản xuất hiện có: <span style="font-weight: bold; ">0</span></div>
    <h2 style="margin-left: 120px; ">Danh sách nhà sản xuất</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã NSX</td>
                    <td>Tên NSX</td>
                    <td>SDT</td>
                    <td>Địa chỉ</td>
                    <td>Email</td>
                    <td colspan="2">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">

            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_NSX">

    <form action="" method="POST" id="form_sapxep_NSX">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_NSX">
            <option value="MA_NSX">Mã NSX</option>
            <option value="TEN_NSX">Tên NSX</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ" onclick="readSapXep('ASC')"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA" onclick="readSapXep('DESC')"></input>
    </form>
    <form action="" method="POST" id="form_timkiem_NSX">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_NSX">
                <option value="MANSX">MANSX</option>
                <option value="Tên NSX">Tên NSX</option>
                <option value="SDT">SDT</option>
                <option value="Địa chỉ">Địa chỉ</option>
                <option value="Email">Email</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_NSX" style="width: 54%; margin-left: 20px;" placeholder="Nhập NSX cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_NSX">
    </form>

    <form action="" method="POST" id="form_them_NSX">
        <h2 style="text-align: center; ">Thêm nhà sản xuất</h2>
        <div style="dispaly: flex;">
            <label for="">Tên NSX: </label> 
            <input type="text" name="TenNSX" id="TenNSX_add"> <span style="color: red; ">(*)</span>
        </div>
        <div style="dispaly: flex;">
            <label for="">SDT: </label> 
            <input type="number" name="SDT_NSX" id="SDT_NSX_add"> <span style="color: red; ">(*)</span>
    </div>
    <div style="dispaly: flex;">
        <label for="">Địa chỉ: </label>
        <input type="text" name="DiaChiNSX" id="DiaChiNSX_add"> <span style="color: red; ">(*)</span>
</div>
        <label for="">Email: </label>
        <input type="text" name="EmailNSX" id="EmailNSX_add"> <span style="color: red; ">(*)</span>
        <div id="warning_FormThem" style="text-align: center;color: red;margin-bottom:5px;"></div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themNSX" name="btn_themNSX" value="Thêm" onclick="add()">

    </form>

    
    <div id="container_suaNSX">
    <form action="" method="POST" id="form_sua_NSX">
        <h2 style="text-align: center; ">Sửa nhà sản xuất</h2>
        <div>
            <label for="">Tên NSX: </label> 
            <input type="text" name="TenNSX" id="TenNSX_sua"> 
        <div>
            <label for="">SDT: </label> 
            <input type="number" name="SDT_NSX" id="SDT_NSX"> 
    <div>
        <label for="">Địa chỉ: </label>
        <input type="text" name="DiaChiNSX" id="DiaChiNSX"> 
</div>
        <label for="">Email: </label>
        <input type="text" name="EmailNSX" id="EmailNSX"> 
        <div id="warning" style="text-align: center;color: red;margin-bottom:5px;"></div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MANSX" value="" id="MANSX_sua"> 
        <input type="button" class="btn_suaNSX" name="btn_suaNSX" value="Xác nhận" onclick="update()">

    </form>
    </div>


    <script src="JS/NSX.js"></script>

