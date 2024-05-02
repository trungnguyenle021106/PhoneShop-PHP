<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();

$list_hoadon = $connect->read("hoa_don", " 1=1 ORDER BY NGAY_TAO ASC");
reset($list_hoadon);
$start = current($list_hoadon)["NGAY_TAO"];
end($list_hoadon);
$end = current($list_hoadon)["NGAY_TAO"];

?>
<link rel="stylesheet" href="CSS/HD_admin.css">
<div class="change_page_PN">
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
        <div id="top_contentHD" style="display: flex;">
            <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
            <h2 style="margin-left: 230px; ">Danh sách hóa đơn</h2>
        </div>
        <button id ="btn_back" style="display: none; cursor:pointer; font-size:20px ; margin:5px 0px; margin-left:10px; background-color:white">Trở về hóa đơn</button>
        <div id="scroll-container">
            <table>
                <thead id="head_table" style=" background-color: #746d6d11; font-weight: bold; ">
                    
                </thead>
                <tbody id="data">

                </tbody>
            </table>
        </div>
    </div>

    <div id="chucnang_HD">
    <button id="RESET" style="margin-left:50px; margin-bottom: 20px; font-size:20px; background-color:white; cursor:pointer">Reset tìm kiếm và sắp xếp</button>
        <form action="" method="POST" id="form_timkiem_HD">
            <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_HD">
                <option value="MA_HD">Mã hóa đơn</option>
                <option value="MA_KM">Mã khuyến mãi</option>
                <option value="MA_KH">Mã khách hàng</option>
                <option value="MA_NV">Mã nhân viên</option>
                <option value="TINH_TRANG">Tình trạng</option>
                <option value="NGAY_TAO">Ngày tạo</option>
                <option value="TONG_TIEN">Tổng tiền</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_HD" style="width: 54%; margin-left: 20px;" placeholder="Nhập hóa đơn cần tìm">
            <input type="submit" value="Tìm" id="btn_timkiem_HD">
        </form>

        <form action="" method="POST" id="form_timkiem_HD" style="border-top: none;">
            <h2 id="title">Tìm kiếm trong khoảng thời gian</h2>
            <div style="display: flex;">
                <div style="width: 30%">Ngày bắt đầu</div>
                <input type="date" value="<?php echo $start;?>" id="start" style="width: 60%; ">
            </div>

            <div style="display: flex;">
                <div style="width: 30%">Ngày kết thúc</div>
                <input type="date" value="<?php echo $end;?>" id="end" style="width: 60%;">
            </div>

            <input type="submit" value="Tìm"  id="btn_timTheoKhoangTG">
        </form>


        <form action="" method="POST" id="form_sapxep_HD">
            <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
            <select name="" id="opt_sapxep_HD">
                <option value="MA_HD">Mã hóa đơn</option>
                <option value="MA_KM">Mã khuyến mãi</option>
                <option value="MA_KH">Mã khách hàng</option>
                <option value="MA_NV">Mã nhân viên</option>
                <option value="STR_TINH_TRANG">Tình trạng</option>
                <option value="NGAY_TAO">Ngày tạo</option>
                <option value="TONG_TIEN">Tổng tiền</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" id="btn_tang" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
            <input type="submit" id="btn_giam" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
        </form>

    </div>
</div>

<script src="JS/HD.js"></script>
<script src="../js/XuLyTienVND.js"></script>