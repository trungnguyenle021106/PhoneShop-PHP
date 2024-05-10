<?php
require_once  '../Model/Database.php';
session_start(); // Khởi động phiên

$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ các trường của form
    $form_username = isset($_POST['username']) ? $_POST['username'] : '';
    $form_password = isset($_POST['password']) ? $_POST['password'] : '';

    //tai_khoan
    $lsTK = $connect->read("tai_khoan");
    $lsKH = $connect->read("khach_hang");
    $lsNV = $connect->read("nhan_vien");

    $response = [
        'status' => 'fail',
        'tinhtrang' => 'no name',
        'name' => 'no name ',
        'avt' => 'no avt'
    ];

    $found = false;
    foreach ($lsTK as $TK) {
        if ($form_username === $TK["TEN_TK"] && $form_password === $TK["MAT_KHAU"]) {
            
            $tinhTrang = $TK["TINH_TRANG"];

            if( $tinhTrang === "không hoạt động"){
                $response = [
                    'status' => 'fail',
                    'tinhtrang' => 'no',
                    'name' => 'no name ',
                    'avt' => 'no avt'
                ];
            }

            if( $tinhTrang === "hoạt động") {
                $id_tk = $TK["MA_TK"];
                $_SESSION['$userID'] = $TK["MA_TK"];
                $_SESSION['$isKH'] = false;
                foreach ($lsNV as $NV) {
                    if ($id_tk === $NV["MA_TK"]) {
                        $_SESSION['$isKH'] = false;
                        $_SESSION['user_name'] = $NV["HOTEN_NV"]; // Tên khách hàng
                        // $_SESSION['Ma_KhachHang'] = $NV["MA_NV"]; // Mã khách hàng

                        // $_SESSION['avatar'] = $KH["AVATAR"]; // Ảnh đại diện

                        //set name và avt để gửi đi 
                        $response = [
                            'status' => 'success',
                            'tinhtrang' => $tinhTrang,
                            'name' => $NV["HOTEN_NV"],
                            'avt' => 'no avt'
                        ];
                        break;
                    }
                }

                foreach ($lsKH as $KH) {
                    if ($id_tk === $KH["MA_TK"]) {
                        $_SESSION['$isKH'] = true;
                        $_SESSION['user_name'] = $KH["HOTEN_KH"]; // Tên khách hàng
                        $_SESSION['Ma_KhachHang'] = $KH["MA_KH"]; // Mã khách hàng

                        // $_SESSION['avatar'] = $KH["AVATAR"]; // Ảnh đại diện

                        //set name và avt để gửi đi 
                        $response = [
                            'status' => 'success',
                            'tinhtrang' => $tinhTrang,
                            'name' => $KH["HOTEN_KH"],
                            'avt' => 'no avt'
                        ];
                        break;
                    }
                
                }
            }

            
        }
    }

    // Chuyển mảng $response thành JSON và gửi lại cho client
    $kq = json_encode($response);
    echo $kq;

    exit;
}


$connect->closeConnection();
