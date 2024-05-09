<?php
require_once('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/Quyen.css">
<script src="https://kit.fontawesome.com/3918fe69ba.js" crossorigin="anonymous"></script>

<div  class="change_page_Quyen">
<form action="" method="POST">
   <input type="hidden" name="page" value="Tài Khoản">
    <input type="submit" value="Tài khoản" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="Quyền">
    <input type="submit" value="Quyền" id="btn2">
    </form>
</div>

<div id="form_Quyen_admin">
<div id="table_Quyen">
<div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLQuyen_HT" >Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách quyền</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã Quyền</td>
                    <td>Tên Quyền</td>
                    <td id="ThaoTac">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">

            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_Quyen">

<form action="" method="POST" id="form_sapxep_Quyen">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_Quyen">
            <option value="MA_Q">Mã Quyền</option>
            <option value="TEN_Q">Tên Quyền</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_Quyen">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_Quyen">
                <option value="Tên_Quyen">Tên quyền</option>
                <option value="MAQ">Mã quyền</option>
            </select>
            <input type="text" id="txt_timkiem_Quyen" style="width: 50%; margin-left: 20px;" placeholder="Nhập tài khoản cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="button" value="Tìm" id="btn_timkiem_Quyen">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>

    <form action="" method="POST" id="form_them_Quyen">
        <h2 style="text-align: center; ">Thêm Quyền</h2>

        <div>
            <label for="">Tên Quyền: </label> 
            <input type="text" name="TenQuyen" id="TenQuyen_add"> <span style="color: red; ">(*)</span>
        </div>
       
    <div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themQuyen" name="btn_themQuyen" value="Cấp chức năng">
    </form>

</div>


<div id="container_capCN">
    <form action="" method="POST" id="form_cap_CN">
        <h2 style="text-align: center; ">Cấp chức năng</h2>
      
        <section style="display: flex; height: 82%;">

        <div id="left-form">
           <h3>Danh sách chức năng</h3> 
           <input type="text" id="txt_chucnang_cap" placeholder="Tên chức năng cần tìm">

           <table>
            <?php
            foreach($connect->read('chuc_nang') as $row){
            ?>
            <tr>
                <td id="Ten_CN"><?php echo $row['TEN_CN']; ?></td>
                <input type="hidden" value="<?php echo $row['MA_CN']; ?>">
            </tr>
            <?php } ?>
           </table>
        </div>

        <div id="right-form">
            <h3>Chức năng hiện có</h3>
            <input type="text" id="txt_chucnang_cap_right" placeholder="Tên chức năng cần tìm">
             <table id="data_chucnang_them">

           </table>
        </div>
        </section>


    <input type="hidden" id="MACN_cap">
    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="button" id="capCN_btn" value="Xác nhận" onclick="add()">
    </form>
</div>


<div id="container_suaCN">
    <form action="" method="POST" id="form_sua_CN">
        <h2 style="text-align: center; ">Sửa chức năng</h2>

        <section style="display: flex; height: 82%;">

        <div id="left-form">    
           <h3>Danh sách chức năng</h3> 
           <input type="text" id="txt_chucnang" placeholder="Tên chức năng cần tìm">

           <table>
            <?php
            foreach($connect->read('chuc_nang') as $row){
            ?>
            <tr>
                <td id="Ten_CN_sua_left"><?php echo $row['TEN_CN']; ?></td>
                <input type="hidden" value="<?php echo $row['MA_CN']; ?>">
            </tr>
            <?php } ?>
           </table>
        </div>
        <div id="right-form">
            <h3>Chức năng hiện có</h3>
            <input type="text" id="txt_chucnang_right" placeholder="Tên chức năng cần tìm">
             <table id="data_chucnang_sua">

           </table>
        </div>
        </section>


    <input type="hidden" id="MAQ_sua">
    <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
    <input type="button"  value="Xác nhận" onclick="update()">
    </form>
</div>
</div>

<script src="JS/Quyen.js"></script>
