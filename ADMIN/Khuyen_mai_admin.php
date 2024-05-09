<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/KM_admin.css">

<div id="form_KM_admin">
    <div id="table_KM">
        <div style="display: flex;">
        <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLKM">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
        <h2 style="margin-left: 230px; ">Danh sách sản phẩm</h2>
        </div>
        <div id="scroll-container">
            <table>
                <thead style=" background-color: #746d6d11; font-weight: bold;">
                    <tr>
                        <td>Mã khuyến mãi</td>
                        <td>Tên khuyến mãi</td>
                        <td>Điều kiện</td>
                        <td>Số tiền giảm</td>
                        <td>Ngày bắt đầu</td>
                        <td>Ngày kết thúc</td>
                        <td>Trạng thái</td>
                        <td colspan="3" id="thao_tac">Thao tác</td>
                    </tr>
                </thead>

                <tbody id="data">
                    
                </tbody>
            </table>
        </div>
    </div>


    <div id="chucnang_KM">

        <!-- <form action="" method="POST" id="form_sapxep_KM">
            <h2 id="title">Sắp xếp</h2>
            <select name="" id="opt_sapxep_KM">
                <option value="NBD">Ngày bắt đầu</option>
                <option value="NKT">Ngày kết thúc</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
            <input type="submit" value="Giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
        </form> -->

        <form action="" method="POST" id="form_timkiem_KM">
            <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_KM">
                <option value="MaKM_tim">Mã khuyến mãi</option>
                <option value="TenKM_tim">Tên khuyến mãi</option>
            </select>

            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_KM" style="width: 54%; margin-left: 20px;" placeholder="Nhập khuyến mãi cần tìm"> <br><br>
            
            <select name="" id="opt_timkiem_date">
                <option value="NBD">Ngày bắt đầu:</option>
                <option value="NKT">Ngày kết thúc:</option>
            </select>

            <input type="date" id="date_timkiem_KM" name="date_timkiem_KM">

            <input type="submit" value="Tìm" id="btn_timkiem_KM" onclick="timkiem()">
        </form>


        <form action="" method="POST" id="form_them_KM">
            <h2 style="text-align: center; ">Thêm khuyến mãi</h2>
        
            <div style="margin-bottom: 10px;">

            <div>
                <label for="">Tên khuyến mãi: </label> 
                <input type="text" name="TenKM_add" id="TenKM_add" required > 
            </div>

            <div>
                <label for="">Điều kiện: </label> 
                <input type="number" name="Dieu_kien_KM" id="Dieu_kien_KM" required>
            </div>

            <div>
                <label for="">Số tiền giảm: </label> 
                <input type="number" name="Tien_giam_KM" id="Tien_giam_KM" required>
            </div>

            <div>
                <label for="">Ngày bắt đầu:</label>
                <input type="date" id="startDate" name="startDate" required > 
            </div>

            <div>
                <label for="">Ngày kết thúc:</label>
                <input type="date" id="endDate" name="endDate" required>
            </div>


            </div>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" class="btn_them_KM" name="btn_them_KM" value="Thêm" onclick="xacnhan()">
        </form>



        <div id="container_sua_KM">
            <form action="" method="POST" id="form_sua_KM">
                <h2 style="text-align: center; ">Sửa khuyến mãi</h2>
                <!-- <div>
                    <label for="">Tên khuyến mãi: </label> 
                    <input type="text" name="TenKM_sua" id="TenKM_sua"> 
                </div>

                <div>
                    <label for="">Điều kiện: </label> 
                    <input type="number" name="Dieu_kien_sua" id="Dieu_kien_sua"> 
                </div>

                <div>
                    <label for="">Số tiền giảm: </label>
                    <input type="number" name="So_tien_giam_sua" id="So_tien_giam_sua"> 
                </div>

                <div>
                    <label for="">Ngày bắt đầu:</label>
                    <input type="date" id="startDate_sua" name="startDate_sua">
                </div>

                <div>
                    <label for="">Ngày kết thúc:</label>
                    <input type="date" id="endDate_sua" name="endDate_sua">
                </div> -->

                <div>
                    <label for="">Trạng thái: </label> 
                    <!-- <input type="text" value="" name="TrangThaiKM_sua" id="TrangThaiKM_sua"> -->
                    <select name="TrangThaiKM_sua" id="TrangThaiKM_sua" style="height: 35px; width: 400px; margin-bottom: 15px; ">
                        <!-- <option value="Có hiệu lực">Có hiệu lực</option> -->
                        <option value="Hết hiệu lực" selected >Hết hiệu lực</option> 
                    </select>
                </div>

                <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
                <input type="hidden" name="MA_KM" value="" id="MAKM_sua"> 
                <input type="submit" class="btn_suaKM" name="btn_suaKM" value="Sửa" onclick="update()">

            </form>
        </div>

        <div id="container_xac_nhan_them_KM">
            <form action="" method="POST" id="form_xac_nhan_them_KM">
                <h2 style="text-align: center; ">Bạn chắc chắn muốn thêm 1 khuyến mãi mới ?</h2>

                <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
                <input type="hidden" name="MA_KM" value="" id="MAKM_sua"> 

                <div class="towbtn">
                    <input type="button" class="btn_xac_nhan_them" name="btn_xac_nhan_them" value="OK" onclick="add()">
                    <input type="button" class="btn_xac_nhan_cancel" name="btn_xac_nhan_cancel" value="Cancel" onclick="tatform()">
                </div>
            </form>
        </div>
    </div>
</div>
<script src="JS/KM.js"></script>