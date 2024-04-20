<?php
// Kiểm tra nếu có dữ liệu được gửi từ phía client
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ POST request
    $username = $_POST["username"];
    $password = $_POST["password"];
    $passwordRepeat = $_POST["passwordRepeat"];

    // Khởi tạo mảng để lưu các thông báo lỗi
    $errors = array();
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

    // Chuyển đổi mảng $errors sang JSON trước khi gửi
    $errorsJSON = json_encode($errors);

    // Gửi chuỗi JSON
    echo $errorsJSON;
}
?>
