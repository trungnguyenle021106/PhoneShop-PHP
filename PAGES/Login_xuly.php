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
        'tentk' => 'null',
        'matkhau' => 'null',
        'name' => 'no name ',
        'avt' => 'no avt'
    ];

    $found = false;
    $temp_TK = "ok";
    $temp_MK = "ok";
    foreach ($lsTK as $TK) {
        if ($form_username === $TK["TEN_TK"] && $form_password === $TK["MAT_KHAU"]) {
            
            $temp_TK = 1;
            $temp_MK = 1;

            $tinhTrang = $TK["TINH_TRANG"];


            if( $tinhTrang === "không hoạt động"){
                $response = [
                    'status' => 'fail',
                    'tinhtrang' => 'no',
                    'tentk' => 'ok',
                    'matkhau' => 'ok',
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
                            'tentk' => 'ok',
                            'matkhau' => 'ok',
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
                            'tentk' => 'ok',
                            'matkhau' => 'ok',
                            'name' => $KH["HOTEN_KH"],
                            'avt' => 'no avt'
                        ];
                        break;
                    }
                
                }
            }

            break; // Thoát khỏi vòng lặp sau khi tìm thấy kết quả khớp
        }

        if ($form_username != $TK["TEN_TK"]) {
            $temp_TK = "no";
        }
        if ($form_password != $TK["MAT_KHAU"]) {
            $temp_MK = "no";
        }


        
    }

    if($temp_TK == "no" ){
        $response = [
            'status' => 'fail',
            'tinhtrang' => 'no name',
            'tentk' => 'loi',
            'matkhau' => 'null',
            'name' => 'no name ',
            'avt' => 'no avt'
        ];
    }

    if($temp_MK == "no" ){
        $response = [
            'status' => 'fail',
            'tinhtrang' => 'no name',
            'tentk' => 'null',
            'matkhau' => 'loi',
            'name' => 'no name ',
            'avt' => 'no avt'
        ];
    
    }
    

    // Chuyển mảng $response thành JSON và gửi lại cho client
    $kq = json_encode($response);
    echo $kq;

    exit;
}


$connect->closeConnection();
