<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();

$currentYear = date('Y');

?>
<link rel="stylesheet" href="CSS/HD_admin.css">
<div class="change_page_PN">
    <form action="" method="POST">
        <input type="hidden" name="page" value="Bán hàng">
        <input type="submit" value="Hóa đơn" id="btn1">
    </form>
    <form action="" method="POST">
        <input type="hidden" name="page" value="CTHD">
        <input type="submit" value="Chi tiết" id="btn2">
    </form>
</div>

<div id="form_HD_admin">
    <div id="table_HD">
        <div id="top_contentHD" style="display: flex;">
            <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
            <h2 style="margin-left: 230px; ">Danh sách hóa đơn</h2>
        </div>
        <button id="btn_back" style="display: none; cursor:pointer; font-size:20px ; margin:5px 0px; margin-left:10px; background-color:white">Trở về hóa đơn</button>
        <div id="KH_XULYHD" style="width: 98%;margin:10px auto; border:solid 1px black; display:none">
            <div style="width: 100%;margin:10px; display:flex">
                <div style="width: 50%;">
                    <span style="font-size:20px">Tên khách hàng :</span>
                    <span id="tenKH" style="font-size:20px">Tên khách hàng</span>
                </div>
                <div style="width: 50%;">
                    <span style="font-size:20px;">Số điện thoại :</span>
                    <span id="sdtKH" style="font-size:20px;">Số điện thoại</span>
                </div>
            </div>
            <hr>
            <div style="width: 100%;margin:10px; display:flex">
                <div style="width: 50%;">
                    <span style="font-size:20px">Tình trạng đơn hàng :</span>
                    <span id="TTDH" style="font-size:20px">Chưa liên lạc</span>
                </div>
                <div id="XuLyDonHang" style="width: 50%;">
                    <select style="font-size:20px; width:200px;" name="" id="opt_TT_HD">
                        <option value="Đã liên lạc">Đã liên lạc</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                        <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                    </select>
                    <button id="UpdateDH" style="font-size:20px; cursor:pointer; background-color:white; margin-left:10px">Cập nhật đơn hàng</button>
                </div>
            </div>
        </div>
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
        <div id="form_timkiem_HD">
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
            <input type="text" id="txt_timkiem_HD" style="width: 54%; margin-left: 20px;" placeholder="Nhập từ khóa">
            <input type="button" value="Tìm" id="btn_timkiem_HD">
        </div>

        <div id="form_timkiem_HD" style="border-top: none;">
            <h2 id="title">Tìm kiếm trong khoảng thời gian</h2>
            <div style="display: flex;">
                <div style="width: 30%">Ngày bắt đầu</div>
                <input type="date" value="<?php echo $currentYear . "-01-01"; ?>" id="start" style="width: 60%; ">
            </div>

            <div style="display: flex;">
                <div style="width: 30%">Ngày kết thúc</div>
                <input type="date" value="<?php echo $currentYear . "-12-31"; ?>" id="end" style="width: 60%;">
            </div>

            <input type="button" value="Tìm" id="btn_timTheoKhoangTG">
        </div>


        <div  id="form_sapxep_HD">
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
            <input type="button" id="btn_tang" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
            <input type="button" id="btn_giam" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
        </div>

    </div>
</div>

<script src="JS/HD.js"></script>
<script src="../js/XuLyTienVND.js"></script>