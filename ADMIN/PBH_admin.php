<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/PBH_admin.CSS">
<div id="form_PBH_admin">
    <div id="table_PBH">
        <div style="display: flex;" id="SLPBH_HT">
        
        </div>


    </div>

    <div id="chucnang_PBH">
        <form action="" method="POST" id="form_timkiem_PBH">
            <h2 id="title">Tìm kiếm</h2>
            <select  id="opt_timkiem_PBH">
                <option value="MA_PBH">Mã phiếu bảo hành</option>
                <option value="MA_KH">Mã khách hàng</option>
                <option value="SERIAL_NUMBER">Số serial</option>
                <option value="MA_SERIAL">Mã serial</option>
                <option value="THOI_GIAN_BAOHANH">Thời gian bảo hành</option>
                <option value="NGAY_BAT_DAU">Ngày bắt đầu</option>
                <option value="NGAY_KET_THUC">Ngày kết thúc</option>
            </select>
            <input type="text" id="txt_timkiem_PBH" style="width: 54%; margin-left: 20px;" placeholder="Nhập phiếu bảo hàng">
            <input type="button" value="Tìm" id="btn_timkiem_PBH">
        </form>


    </div>


</div>




<script src="JS/PBH.js"></script>