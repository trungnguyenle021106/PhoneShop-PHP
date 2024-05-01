<?php
require('../AJAX_PHP/Current_Account.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/PBH_admin.CSS">
<div id="form_PBH_admin">
<div id="table_PBH">
<div style="display: flex;" id="SLPBH_HT">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLPBH_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách phiếu bảo hành</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã PBH</td>
                    <td>Mã SERIAL</td>
                    <td>Mã KH</td>
                    <td>Ngày bắt đầu</td>
                    <td>Ngày kết thúc</td>
                    <td>Thời gian bảo hành</td>
                    <td>Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
    
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_PBH">

<form action="" method="POST" id="form_sapxep_PBH">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_PBH">
            <option value="MA_PBH">MAPBH</option>
            <option value="MA_KH">MAKH</option>
            <option value="MA_SERIAL">SERIAL</option>
            <option value="NGAY_BAT_DAU">Ngày bắt đầu</option>
            <option value="NGAY_HET_HAN">Ngày hết hạn</option>
            <option value="THOI_GIAN_BAOHANH">thời gian bảo hành</option>

        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_PBH">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_PBH">
            <option value="MAPBH">MAPBH</option>
            <option value="MAKH">MAKH</option>
            <option value="SERIAL">SERIAL</option>
            <!-- <option value="time">Thời hạn</option> -->
            <option value="time_start">Ngày bắt đầu</option>
            <option value="time_end">Ngày kết thúc</option>
            </select>
            <input type="text" id="txt_timkiem_PBH" style="width: 54%; margin-left: 20px;" placeholder="Nhập phiếu bảo hàng">
            <input type="button" value="Tìm" id="btn_timkiem_PBH">
            <input type="button" value="hoàn tác" name="btn_sortZA" class="hoantac"></input>

    </form>
</div>


</div> 




<script src="JS/PBH.js"></script>
