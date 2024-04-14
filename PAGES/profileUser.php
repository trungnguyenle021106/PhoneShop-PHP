<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/profileUser.css">
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
        $soCCCD ='';
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $hoTen=$_POST['name'];
            $diaChi=$_POST['address'];
            $soDT=$_POST['phone'];
            $soCCCD =$_POST['numberId'];
            $data = array(
                "HOTEN_KH" => "$hoTen",
                "DIA_CHI" => "$diaChi",
                "SO_DT" => "$soDT",
                "SO_CCCD" => "$soCCCD"
            );
            $conn->update("khach_hang","MA_KH","1",$data);
            
        }

        
        $tableName = "khach_hang";
        $condition = "MA_KH = 1";
        $result = $conn->read( $tableName ,$condition);
        $hoTen = $result[0]['HOTEN_KH'];
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
        <div class="profile_left">
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
                echo "<td><button type="."button"." class="."btn".">Xem</button></td>";
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
</script>
</html>