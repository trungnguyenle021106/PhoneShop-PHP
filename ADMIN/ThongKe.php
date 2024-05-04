<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();

$list_hoadon = $connect->read("hoa_don", " TINH_TRANG = 'Đã xử lý' ORDER BY NGAY_TAO ASC");
reset($list_hoadon);
$start = current($list_hoadon)["NGAY_TAO"];
end($list_hoadon);
$end = current($list_hoadon)["NGAY_TAO"];


$startFormart = DateTime::createFromFormat('Y-m-d', $start);
$endFormart = DateTime::createFromFormat('Y-m-d', $end);
?>
<link rel="stylesheet" href="CSS/ThongKe.css">


<div id="form_TK_admin">
    <div id="table_TK">
        <div id="top_contentTK" style="display: flex;">
            <div style="width: 60%; margin-top: 20px;  font-size: 25px;" id="SLTK_HT">Tổng doanh thu: <span style="font-weight: bold; "></span></div>
            <h2 id="startH2" style="width: 20%; ">Từ ngày : <?php echo $startFormart->format('d-m-Y'); ?></h2>
            <h2 id="endH2" style="width: 20%; ">Đến ngày : <?php echo $endFormart->format('d-m-Y'); ?></h2>
        </div>
        
        <button id="btn_back" style="display: none; cursor:pointer; font-size:20px ; margin:5px 0px; margin-left:10px; background-color:white">Trở về hóa đơn</button>
        <div id="scroll-container">
            <table>
                <thead id="head_table" style=" background-color: #746d6d11; font-weight: bold; ">
                    <tr>
                        <td>Top</td>
                        <td>Mã sản phẩm</td>
                        <td>Ảnh sản phẩm</td>
                        <td>Loại</td>
                        <td>Tên sản phẩm</td>
                        <td>Số lượng đã bán</td>
                        <td>Doanh thu</td>
                    </tr>
                </thead>
                <tbody id="data">

                </tbody>
            </table>
        </div>
    </div>

    <div id="chucnang_TK">
        <button id="RESET" style="margin-left:50px; margin-bottom: 20px; font-size:20px; background-color:white; cursor:pointer">Reset tìm kiếm và sắp xếp</button>
        <form action="" method="POST" id="form_timkiem_TK">
            <h2 id="title">Sản phẩm bán chạy theo top</h2>
            
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_TK" style="width: 50%; margin-left: 10px;" placeholder="Nhập top">
            <input type="button" value="Tìm" id="btn_timkiem_TK">
            
            <div><span style="margin-left: 10px;">Loại sản phẩm :</span>
            <select name="" id="opt_timkiem_TK">
            <option value="">Tất cả</option>
                <?php
                $list_loai = $connect->read("loai", "");
                foreach ($list_loai as $loai) {
                    echo '<option value="' . $loai["MA_LOAI"] . '">' . $loai["TEN_LOAI"] . '</option>';
                }
                ?>
                
            </select>
            </div>
        </form>

        <form action="" method="POST" id="form_timkiem_TK" style="border-top: none;">
            <h2 id="title">Tìm kiếm trong khoảng thời gian</h2>
            <div style="display: flex;">
                <div style="width: 30%">Ngày bắt đầu</div>
                <input type="date" value="<?php echo $start; ?>" id="start" style="width: 60%; ">
            </div>

            <div style="display: flex;">
                <div style="width: 30%">Ngày kết thúc</div>
                <input type="date" value="<?php echo $end; ?>" id="end" style="width: 60%;">
            </div>

            <input type="submit" value="Tìm" id="btn_timTheoKhoangTG">
        </form>


        <form action="" method="POST" id="form_sapxep_TK">
            <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
            <select name="" id="opt_sapxep_TK">
                <option value="MA_SP">Mã sản phẩm</option>
                <option value="SL_DA_BAN">Số lượng đã bán</option>
                <option value="DOANH_THU">Doanh thu</option>
               </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" id="btn_tang" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
            <input type="submit" id="btn_giam" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
        </form>

    </div>
</div>

<script src="../ADMIN/JS/ThongKe.js"></script>
<script src="../js/XuLyTienVND.js"></script>