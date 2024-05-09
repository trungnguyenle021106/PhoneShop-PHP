<?php
require __DIR__ . '/../Model/Database.php';
session_start(); // Khởi động phiên


// Hàm kiểm tra tài khoản và mật khẩu
function validateRegistration($username, $password, $passwordRepeat) {
  $errors = [];

  // Kiểm tra các điều kiện và thêm thông báo lỗi nếu cần
  // Hàm kiểm tra ký tự đặc biệt
  function hasSpecialChars($str) {
    $regex = '/[\'^£$%&*()}{@#$~+=:;?.<>,\/\[\]|\-_ ]/';
    return preg_match($regex, $str);
  }

  // Kiểm tra username
  if (strlen($username) < 6) {
    $errors['usernameError'] = "Tên tài khoản ngắn hơn 6 ký tự.";
  } elseif (hasSpecialChars($username)) {
    $errors['usernameError'] = "Tên tài khoản không được có ký tự đặc biệt.";
  } elseif (ctype_digit($username[0])) {
    $errors['usernameError'] = "Tên tài khoản không được bắt đầu bằng số.";
  }

  // Hàm kiểm tra mật khẩu mạnh
  function isStrongPassword($password) {
    $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+\-=\[\]{};:\'"\\|,.<>\/?])(?=.{8,})/';
    return preg_match($regex, $password);
  }

  // Kiểm tra mật khẩu
  if (strlen($password) < 8) {
    $errors['passwordError'] = "Mật khẩu không được ngắn hơn 8 ký tự.";
  } elseif (!isStrongPassword($password)) {
    $errors['passwordError'] = "Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một chữ số và một ký tự đặc biệt.";
  }

  if ($password !== $passwordRepeat) {
    $errors['passwordRepeatError'] = "Mật khẩu không khớp.";
  }

  return $errors;
}

// Hàm lưu tài khoản vào cơ sở dữ liệu
function saveTK($username, $password) {
  $server = "localhost";
  $username1 = "root";
  $password1 = "";
  $database = "qldienthoai";

  $connect = new MyConnection($server, $username1, $password1, $database);
  $connect->connectDB();

  // Kiểm tra tài khoản đã tồn tại hay chưa
  $existing_accounts = $connect->read("tai_khoan", "TEN_TK = '$username'");
  reset($existing_accounts);
  $user = current($existing_accounts);
  $errors = [];
  
  if ( $user["TEN_TK"] === $username) {
      $connect->closeConnection();
      $errors['usernameError'] = "Tài khoản đã tồn tại.";
      return  $errors;
  } else {
      $currentDate = date("Y-m-d H:i:s"); // Lấy ngày và giờ hiện tại
      $data = [
          "TEN_TK" => $username,
          "MAT_KHAU" => $password,
          "NGAY_TAO_TK" => $currentDate,
          "TINH_TRANG" => "True",
          "MA_Q" => "2"
      ];

       $connect->create("tai_khoan", $data);
      $connect->closeConnection();
      TaoKhachHang($username, $password);
      $errors['success'] = 'true';
      return  $errors;
  }
}

//random ten khach hang
function generateRandomString($length = 8) {
  $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  $randomString = "";
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $chars[rand(0, strlen($chars) - 1)];
  }
  return $randomString;
}

//tụ tạo bang khach hang
function TaoKhachHang($username, $password){

  $server = "localhost";
  $username1 = "root";
  $password1 = "";
  $database = "qldienthoai";

  $connect = new MyConnection($server, $username1, $password1, $database);
  $connect->connectDB();

  $lsTK = $connect->read("tai_khoan");
  foreach ($lsTK as $TK) {
    if ($username === $TK["TEN_TK"] && $password === $TK["MAT_KHAU"]) {
        $id_tk = $TK["MA_TK"];
        $hotenKH = generateRandomString();

        $dataKH = [
          "MA_TK" =>  $id_tk,
          "HOTEN_KH" => $hotenKH,
          "G_TINH" => "",
          "DIA_CHI" => "",
          "SO_DT" => "",
          "SO_CCCD" => ""
        ];
      
        $connect->create("khach_hang", $dataKH);
        $connect->closeConnection();
    }
  }
}

// Xử lý yêu cầu đăng ký
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];
  $passwordRepeat = $_POST["passwordRepeat"];

  $errors = validateRegistration($username, $password, $passwordRepeat);

  if (!empty($errors)) {
      echo json_encode($errors);
  } else {
     $result = saveTK($username, $password);
     echo json_encode($result);
  }
}


?>
