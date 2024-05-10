<?php
require_once '../Model/Database.php';
$connect = new MyConnection('localhost', 'root', '', 'qldienthoai');
$connect->connectDB();

$list_CN_UI = array(
    'Khách Hàng' => 1,
    'Nhân Viên' => 1,
    'Tài Khoản' => 1,
    'Nhà Sản Xuất' => 1,
    'Bảo Hành' => 1,
    'Nhập Hàng' => 1,
    'Bán Hàng' => 1,
    'Sản Phẩm' => 1,
    'Serial' => 1,
    'Khuyến Mãi' => 1,
    'Thống Kê' => 1
);

session_start();
// $ID = $_SESSION['$AccountID'];

$ID =  $_SESSION['$userID'];
$userName =  $_SESSION['user_name'];
$listTK = $connect->read("tai_khoan", "MA_TK =" . $ID);
reset($listTK);
$account = current($listTK);

$list_cn = $connect->readCustom("chuc_nang.TEN_CN ", "chuc_nang JOIN ctq_chuc_nang ON chuc_nang.MA_CN = ctq_chuc_nang.MA_CN
JOIN tai_khoan ON ctq_chuc_nang.MA_Q = tai_khoan.MA_Q", " tai_khoan.MA_Q = " . $account["MA_Q"]);

$connect->closeConnection();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/index_admin.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="JS/AccountCurrent.js"></script>
    <title>admin</title>
</head>

<body id="body_admin">
    <header id="header_admin">
        <div id="logo">
            <a href="/PhoneShop/index.php">
                <image src="../Img/logo.png" style="width: 350px;"></image>
            </a>
        </div>
        <div id="title">
            <?php

            if (isset($_POST['page'])) {
                if ($_POST['page'] == 'Khách Hàng') {
                    echo "Quản lý khách hàng";
                } else if ($_POST['page'] == 'Nhân Viên') {
                    echo "Quản lý nhân viên";
                } else if ($_POST['page'] == 'Tài Khoản'  || $_POST['page'] == 'Quyen') {
                    echo "Quản lý tài khoản";
                } else if ($_POST['page'] == 'Nhà Sản Xuất') {
                    echo "Quản lý nhà sản xuất";
                } else if ($_POST['page'] == 'Serial') {
                    echo "Quản lý Serial";
                } else if ($_POST['page'] == 'Bảo Hành') {
                    echo "Quản lý phiếu bảo hành";
                } else if ($_POST['page'] == 'Khuyến Mãi') {
                    echo "Quản lý khuyến mãi";
                } else if ($_POST['page'] == 'Nhập Hàng' || $_POST['page'] == 'CTPN') {
                    echo "Quản lý phiếu nhập";
                } else if ($_POST['page'] == 'Bán Hàng' || $_POST['page'] == 'CTHD') {
                    echo "Quản lý bán hàng";
                } else if ($_POST['page'] == 'Sản Phẩm' || $_POST['page'] == 'CHTN' || $_POST['page'] == 'CHDT' || $_POST['page'] == 'CHS' || $_POST['page'] == 'CHOL') {
                    echo "Quản lý sản phẩm";
                } elseif ($_POST['page'] == 'Thống Kê') {
                    echo "Thống kê";
                }
            }
            ?>
        </div>
        <div id="user">
            <div id="username"><?php
            echo $userName;
            ?></div>
            <image src="../Img/avatar.png" id="avatar"></image>
        </div>
    </header>

    <section id="section_admin">
        <form id="left_content" method="POST">
            <table id="MYtableTab">
                <?php
                foreach ($list_cn as $cn) {
                    $result = $cn["TEN_CN"];

                    if (strpos($result, "Xóa ") !== false) {
                        $result = str_replace("Xóa ", "", $result);
                    } elseif (strpos($result, "Thêm ") !== false) {
                        $result = str_replace("Thêm ", "", $result);
                    } elseif (strpos($result, "Sửa ") !== false) {
                        $result = str_replace("Sửa ", "", $result);
                    }

                    if (strpos($result, "Nhập") !== false) {
                        $result = "Nhập Hàng";
                    } else if (strpos($result, "Hóa Đơn") !== false) {
                        $result = "Bán Hàng";
                    } else if (strpos($result, "Chức Năng") !== false || strpos($result, "Quyền") !== false) {
                        $result = "Tài Khoản";
                    } else if (strpos($result, "Bảo Hành") !== false) {
                        $result = "Bảo Hành";
                    }

                    if ($list_CN_UI[$result] == 1) {
                        $list_CN_UI[$result] = 0;
                        echo '<tr>
                        <td><input type="submit"  value="' . $result . '" name="page" class="items"></input></td>
                    </tr>';
                    }
                }
                ?>

                </th>
            </table>
        </form>

        <div id="right_content">

            <?php
            if (isset($_POST['page'])) {
                if ($_POST['page'] == 'Khách Hàng') {
                    require("KH_admin.php");
                } else if ($_POST['page'] == 'Nhân Viên') {
                    require("NV_admin.php");
                } else if ($_POST['page'] == 'Tài Khoản') {
                    require('TK_admin.php');
                } else if ($_POST['page'] == 'Nhà Sản Xuất') {
                    require("NSX_admin.php");
                } else if ($_POST['page'] == 'Bảo Hành') {
                    require("PBH_admin.php");
                } else if ($_POST['page'] == 'Nhập Hàng') {
                    require("PNK_admin.php");
                } else if ($_POST['page'] == 'CTPN') {
                    require("CTPN_admin.php");
                } else if ($_POST['page'] == 'Bán Hàng') {
                    require("HD_admin.php");
                } else if ($_POST['page'] == 'CTHD') {
                    require("CTHD_admin.php");
                } else if ($_POST['page'] == 'Sản Phẩm') {
                    require("SP_admin.php");
                } else if ($_POST['page'] == 'CHDT') {
                    require("CHDT_admin.php");
                } else if ($_POST['page'] == 'CHOL') {
                    require("CHOL_admin.php");
                } else if ($_POST['page'] == 'CHS') {
                    require("CHS_admin.php");
                } else if ($_POST['page'] == 'CHTN') {
                    require("CHTN_admin.php");
                } else if ($_POST['page'] == 'Quyền') {
                    require("Quyen_admin.php");
                } else if ($_POST['page'] == 'Serial') {
                    require("Serial_admin.php");
                } else if ($_POST['page'] == 'Khuyến Mãi') {
                    require("Khuyen_mai_admin.php");
                } else if ($_POST['page'] == 'Thống Kê') {
                    require("ThongKe.php");
                }
            }
            ?>
        </div>

        <div id="form_TK_nguoidung">
    <div id="form_TK">
        <div id="infor_KH">
            <h2 style="text-align: center;">Thông tin người dùng</h2>
            <div>Tên tài khoản: <span id="ten_user"></span></div>
            <div>Password: <span id="pass_user"></span></div>
            <div>Ngày tạo: <span id="NT_user"></span></div>
            <button id="logout_btn"><i class="fas fa-sign-out-alt"></i> Đăng xuất</button>
        </div>
    </div>
</div>
    </section>
</body>



<script>
    var table = document.getElementById('MYtableTab');
    var rows = table.getElementsByTagName('tr');
    var fontSize = 31;

    for (var i = 0; i < rows.length; i++) {
        fontSize -= 1;
    }

    for (var i = 0; i < rows.length; i++) {
        var input = rows[i].querySelector('input');
        if (input) {
            input.style.fontSize = fontSize + 'px';
        }
    }

    


document.addEventListener('DOMContentLoaded', function(){
    var username = document.getElementById('ten_user');
    var CCCD = document.getElementById('CCCD_user');
    var PASS = document.getElementById('pass_user');
    var NT = document.getElementById('NT_user');

    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function(response0){
            $condition = "Read"
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + response0.tai_khoan['MA_TK'];
    
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response){
            username.innerText = response[0].TEN_TK;
            PASS.innerText = response[0].MAT_KHAU;
            NT.innerText = response[0].NGAY_TAO_TK;
            },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
});


document.getElementById("form_TK_nguoidung").addEventListener("click", function(event){
    if(event.target == document.getElementById("form_TK_nguoidung")){
        document.getElementById("form_TK_nguoidung").style.display = "none";
    }
});


var logo = document.querySelector('#avatar');

logo.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("form_TK_nguoidung").style.display = "block";
});


document.getElementById("logout_btn").addEventListener("click", function(){
    window.location.href = '../PAGES/logout.php';
});
</script>

</html>