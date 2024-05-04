<?php
require('../Model/Database.php');
?>  
<link rel="stylesheet" href="CSS/Serial_admin.css">
<div id="form_Serial_admin">
    <div id="table_Serial">
        <div style="display: flex;">
            <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLSerial_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
            <h2 style="margin-left: 230px; ">Danh sách serial</h2>
        </div>
        <div id="scroll-container">
            <table>
                <thead style=" background-color: #746d6d11; font-weight: bold;">
                    <tr>
                        <td>Mã Serial</td>
                        <td>Số Serial</td>
                        <td>Tên sản phẩm</td>
                        <td>Hình ảnh</td>
                        <td colspan="2">Thao tác</td>
                    </tr>
                </thead>
                <tbody id="data">
                
                </tbody>
            </table>
        </div>
        <div id="suaSerial_container">
            <form action="" method="POST" id="form_sua_Serial">
                <h2 style="text-align: center;">Sửa thông tin Serial</h2>
                <div style="display: flex; align-items: baseline; margin-bottom:5px">
                    <label for="">Số Serial: </label>
                    <input type="text" id="SO_SERIAL_sua_SERIAL" name="SO_SERIAL_sua_SERIAL">
                </div>
                <div id="warning" style="text-align: center;color: red;margin-bottom:5px;"></div>
                <!-- dòng này có hoặc không cũng được -->
                <input type="hidden" value="<?php echo $_POST['page']; ?>" name="page" > 
                
                <input type="hidden" value="" name="MASERIAL" id="MASERIAL_sua_hidden">
                
                <input type="button" value="Xác nhận" name="btn_xacnhan_sua" id="btn_xacnhan_sua" onclick="update()">
            </form>
        </div>
    </div>
    
    
    <div id="chucnang_Serial">
        <form action="" method="POST" id="form_sapxep_Serial">
            <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
            <select name="" id="opt_sapxep_Serial">
                <option value="SERIAL_NUMBER">Số Serial</option>
                <option value="MA_SERIAL">Mã Serial</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="button" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ" onclick="readSapXep('ASC')"></input>
            <input type="button" value="giảm dần" name="btn_sortZA" class="btn_sortZA" onclick="readSapXep('DESC')"></input>
        </form>
        <form action="" method="POST" id="form_timkiem_Serial">
            <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_Serial">
            <option value="MA_SERIAL">Mã Serial</option>
            <option value="SERIAL_NUMBER">Số Serial</option>
            </select>
            <input type="text" id="txt_timkiem_Serial" style="width: 54%; margin-left: 20px;padding: 3px;">

            <input type="button" value="Tìm" id="btn_timkiem_Serial">
        </form>
    </div>
</div>

    
<script src="JS/Serial.js"></script>