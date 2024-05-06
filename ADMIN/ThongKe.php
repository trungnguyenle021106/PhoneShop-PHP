<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();

$currentYear = date('Y');


?>
<link rel="stylesheet" href="CSS/ThongKe.css">


<div id="form_TK_admin">
    <div id="table_TK">
        <div id="top_contentTK" style="display: flex;">
            <div style="width: 60%; margin-top: 20px; margin-bottom:10px; font-size: 25px;" id="SLTK_HT">Tổng doanh thu: <span style="font-weight: bold; "></span></div>
        </div>
        
        <div id="scroll-container"  >
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
        <button id="RESET" style="margin-left:50px; margin-bottom: 20px; margin-top:10px ;font-size:20px; background-color:white; cursor:pointer">Reset tìm kiếm</button>
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
                <input type="date" value="<?php echo $currentYear."-01-01"; ?>" id="start" style="width: 60%; ">
            </div>

            <div style="display: flex;">
                <div style="width: 30%">Ngày kết thúc</div>
                <input type="date" value="<?php echo $currentYear."-12-31"; ?>" id="end" style="width: 60%;">
            </div>

            <input type="button" value="Tìm" id="btn_timTheoKhoangTG">
        </form>


       

    </div>
</div>

<script src="../ADMIN/JS/ThongKe.js"></script>
<script src="../js/XuLyTienVND.js"></script>