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
            <input type="text" name="TenNSX"> <span style="color: red; ">(*)</span>
        </div>
        <div style="dispaly: flex;">
            <label for="">SDT: </label> 
            <input type="number" name="SDT_NSX"> <span style="color: red; ">(*)</span>
    </div>
    <div style="dispaly: flex;">
        <label for="">Địa chỉ: </label>
        <input type="text" name="DiaChiNSX"> <span style="color: red; ">(*)</span>
</div>
        <label for="">Email: </label>
        <input type="text" name="EmailNSX"> <span style="color: red; ">(*)</span>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" class="btn_themNSX" name="btn_themNSX" value="Thêm">

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
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MANSX" value="" id="MANSX_sua"> 
        <input type="submit" class="btn_suaNSX" name="btn_suaNSX" value="sửa">

    </form>
    </div>


    <script src="JS/NSX.js"></script>

