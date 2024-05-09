
<link rel="stylesheet" href="CSS/HD_admin.CSS">
<div class="change_page_CTHD">
    <form action="" method="POST">
        <input type="hidden" name="page" value="Bán Hàng">
        <input type="submit" value="Hoá đơn" id="btn1">
    </form>
    <form action="" method="POST">
        <input type="hidden" name="page" value="CTHD">
        <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_CTHD_admin">
    <div id="table_CTHD">
        <div style="display: flex;">
            <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLCTHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
            <h2 style="margin-left: 200px; ">Danh sách chi tiết hóa đơn</h2>
        </div>
        <div id="scroll-container1">
            <table>
                <thead style=" background-color: #746d6d11; font-weight: bold;">
                    <tr>
                        <td>Mã hóa đơn</td>
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>Số lượng</td>
                        <td>Thành tiền</td>
                        <td>Thuế suất</td>
                    </tr>
                </thead>
                <tbody id="data">
                </tbody>
            </table>
        </div>
    </div>

    <div id="chucnang_CTHD">

        <div id="form_sapxep_CTHD">
            <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
            <select name="" id="opt_sapxep_CTHD">
                <option value="MA_HD">Mã hóa đơn</option>
                <option value="MA_SP">Mã sản phẩm</option>
                <option value="SL_BAN">Số lượng</option>
                <option value="THANH_TIEN">Thành tiền</option>
                <option value="THUE_SUAT">Thuế suất</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="button" id="btn_tang" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
            <input type="button" id="btn_giam" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
        </div>

        <div id="form_timkiem_CTHD">
            <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CTHD">
                <option value="chi_tiet_hoadon.MA_HD">Mã hóa đơn</option>
                <option value="chi_tiet_hoadon.MA_SP">Mã sản phẩm</option>
                <option value="san_pham.TEN_SP">Tên sản phẩm</option>
                <option value="chi_tiet_hoadon.SL_BAN">Số lượng</option>
                <option value="chi_tiet_hoadon.THANH_TIEN">Thành tiền</option>
                <option value="chi_tiet_hoadon.THUE_SUAT">Thuế suất</option>
            </select>
            <input type="text" id="txt_timkiem_CTHD" style="width: 54%; margin-left: 20px;" placeholder="Nhập CTHD cần tìm">
            
            <input type="button" value="Tìm" id="btn_timkiem_CTHD">
        </div>

        
    </div>
</div>

<script src="JS/CTHD.js"></script>
<script src="../js/XuLyTienVND.js"></script>
