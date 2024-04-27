<?php
    session_start(); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/profileUser.css">
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Document</title>
    
</head>
<?php 
        require_once("../Model/Database.php");
        $server ="localhost";
        $username = "root";
        $password = "";
        $database = "qldienthoai";
        $conn = new MyConnection($server,$username,$password,$database);
        $conn->connectDB();

        $hoTen='';
        $diaChi='';
        $soDT='';
        $gioiTinh='';
        $soCCCD ='';
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $hoTen=$_POST['name'];
            $diaChi=$_POST['address'];
            $soDT=$_POST['phone'];
            $gioiTinh=$_POST['sex'];
            $soCCCD =$_POST['numberId'];
            $data = array(
                "HOTEN_KH" => "$hoTen",
                "DIA_CHI" => "$diaChi",
                "SO_DT" => "$soDT",
                "G_TINH" => "$gioiTinh",
                "SO_CCCD" => "$soCCCD"
            );
            $conn->update("khach_hang","MA_KH","1",$data);
            $_SESSION['update_success'] = true;
            
        }

        
        $tableName = "khach_hang";
        $condition = "MA_KH = 1";
        $result = $conn->read( $tableName ,$condition);
        $hoTen = $result[0]['HOTEN_KH'];
        $gioiTinh = $result[0]['G_TINH'];
        $maTK = $result[0]['MA_TK'];
        $diaChi = $result[0]['DIA_CHI'];
        $soDT = $result[0]['SO_DT'];
        $soCCCD = $result[0]['SO_CCCD'];
        $tableName = "tai_khoan";
        $condition = "MA_TK = $maTK";
        $result = $conn->read( $tableName ,$condition);
        $tenTK = $result[0]['TEN_TK'];

        $dataLog = $conn->read( "hoa_don" ,"MA_KH = 1");

        
        $conn->closeConnection();
?>
<body>
    <div class="profile_content_container">
        <div class="profile_left" >
            <img src="../Img/avtUser.png" alt="" >
            <span style="display: block; text-align: center;font-size: 18px;
            font-weight: bold;
            color: rgb(87, 79, 79);
            font-family: sans-serif;"><?php echo $tenTK; ?></span>
            <hr>
            <div class="item_menu btn_infor"><p>Thông tin tài khoản</p></div>
            <div class="item_menu btn_log"><p>Đơn hàng</p></div>
        </div>
        <div class="profile_content">
            <form method="post"  action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" id="profile_form">
                <div class="input_field">
                    <div>
                        <label for="name">Họ tên:</label>
                        <input type="text" name="name" id="name" value="<?php echo $hoTen; ?>" required>
                    </div>
                    <div>
                        <label for="name">Giới tính:</label>
                        <input type="text" name="sex" id="sex" value="<?php echo $gioiTinh; ?>" required>
                    </div>
                    <div>
                        <label for="address">Địa chỉ:</label>
                        <input type="text" name="address" id="address" value="<?php echo $diaChi; ?>" required>
                    </div>
                    <div>
                        <label for="numberId">Số CCCD:</label>
                        <input type="text" name="numberId" id="numberId" minlength="12" maxlength="12 " value="<?php echo $soCCCD; ?>" required>
                    </div>
                    <div>
                        <label for="phone">Điện thoại:</label>
                        <input type="text" name="phone" id="phone" minlength="10" maxlength="10 " value="<?php echo $soDT; ?>" required>
                    </div>
                    
                </div>
                <div class="submit">
                    <button type="submit" form="profile_form" class="btn btn-danger submit">Cập nhật thông tin</button>
                </div>
            </form>
        </div>
    </div>
        <div id="popup" class="popup">
            <span class="popup-close" onclick="closePopup()">&times;</span>
            <h2>Chi Tiết Hóa Đơn</h2>
            <!-- Nội dung chi tiết hóa đơn -->
            <table id="table_cthd" class="table table-bordered ">
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thuế</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="popup-update" class="popup-update">
        <div class="popup-content">
            <p>Cập nhật thông tin thành công!</p>
        </div>
</div>
</body>
<script>
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document);
        const ttkh = $(".btn_infor")
        const content = $(".profile_content")
        const donMua = $(".btn_log")
        ttkh.addEventListener('click', () => {
            render2();
        });
        donMua.addEventListener('click', () => {
            render1();
        });
        console.log(donMua)
        function render1() {
            content.innerHTML = `
  <h2>Lịch sử mua hàng</h2>          
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Mã đơn hàng</th>
        <th>Ngày ghi nhận</th>
        <th>Tổng tiền</th>
        <th>Trạng thái</th>
        <th>Xem chi tiết</th>
      </tr>
    </thead>
    <tbody>
      <?php 
            foreach ($dataLog as $row) {
                echo "<tr>";
                echo "<td>" . $row["MA_HD"] . "</td>";
                echo "<td>" . $row["NGAY_TAO"] . "</td>";
                echo "<td>" . $row["TONG_TIEN"] . "</td>";
                echo "<td>" . $row["TINH_TRANG"] . "</td>";
                echo "<td><button onclick="."openPopup(".$row["MA_HD"].")"." type="."button"." class="."btn".">Xem</button></td>";
                echo "</tr>";
              }
      ?>
    </tbody>
  </table>`
        }
        function render2() {
            content.innerHTML = `<form method="post"  action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" id="profile_form">
                <div class="input_field">
                    <div>
                        <label for="name">Họ tên:</label>
                        <input type="text" name="name" id="name" value="<?php echo $hoTen; ?>" required>
                    </div>
                    <div>
                        <label for="name">Giới tính:</label>
                        <input type="text" name="sex" id="sex" value="<?php echo $gioiTinh; ?>" required>
                    </div>
                    <div>
                        <label for="address">Địa chỉ:</label>
                        <input type="text" name="address" id="address" value="<?php echo $diaChi; ?>" required>
                    </div>
                    <div>
                        <label for="numberId">Số CCCD:</label>
                        <input type="text" name="numberId" id="numberId" minlength="12" maxlength="12 " value="<?php echo $soCCCD; ?>" required>
                    </div>
                    <div>
                        <label for="phone">Điện thoại:</label>
                        <input type="text" name="phone" id="phone" minlength="10" maxlength="10 " value="<?php echo $soDT; ?>" required>
                    </div>
                    
                </div>
                <div class="submit">
                    <button type="submit" form="profile_form" class="btn btn-danger submit">Cập nhật thông tin</button>
                </div>
            </form>`
        }
        async function openPopup(maHoaDon) {
            const response = await fetch("XemChiTietHD.php?maHoaDon="+maHoaDon);
            const cthd = await response.json();
            console.log(cthd)
            let htmlContent = ""
            
            cthd.invoiceDetails.forEach(detail  => {
            const product = cthd.products.find(p => p.MA_SP === detail.MA_SP);
            if (product) {
                htmlContent += `<tr>
                                <td>`+detail.MA_SP+`</td>
                                <td>`+product.TEN_SP+`</td>
                                <td><img src="../Img/`+product.HINH_ANH+`" alt="" width="100"></td>
                                <td>`+detail.SL_BAN+`</td>
                                <td>`+product.GIA_BAN+`</td>
                                <td>`+detail.THUE_SUAT+`</td>
                                <td>`+detail.THANH_TIEN+`</td>
                                </tr>`
            } else {
                console.log("Không tìm thấy sản phẩm tương ứng.");
            }
            });
            
            let tableContent = `<table id="table_cthd" class="table table-bordered ">
            <thead>
            <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thuế</th>
                <th>Thành tiền</th>
            </tr>
            </thead>
            <tbody>`
            + htmlContent +
            `</tbody>
        </table>`

            console.log(tableContent)
            document.getElementById("table_cthd").innerHTML = tableContent;
            document.getElementById('popup').style.display = 'block';
        }
        function closePopup() {
            document.getElementById('popup-update').style.display = 'none';
        }
        function openPopup2() {
        document.getElementById('popup-update').style.display = 'block';
        }

        function closePopup2() {
            document.getElementById('popup-update').style.display = 'none';
        }
        <?php
            if (isset($_SESSION['update_success']) && $_SESSION['update_success']) {
                echo 'let showPopup = true;';
                unset($_SESSION['update_success']);
            } else {
                echo 'let showPopup = false;';
            }
        ?>
        if (showPopup) {
            openPopup2();
            setTimeout(() => {
                closePopup2();
            }, 3000); // Ví dụ: tự đóng popup sau 3 giây
        }
</script>
</html>