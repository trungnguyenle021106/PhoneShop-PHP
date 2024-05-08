<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Đăng ký</title>
<link rel="stylesheet" href="../CSS/register.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$(document).ready(function() {
    $(".registerbtn").click(function() {
        // Lấy dữ liệu từ form
        var username = $("#username").val();
        var password = $("#psw").val();
        var passwordRepeat = $("#psw-repeat").val();
        
        // Gửi dữ liệu form đến máy chủ sử dụng AJAX
        $.ajax({
            type: "POST",
            url: "register_xuly.php", // Đường dẫn đến file xử lý dữ liệu đăng ký ở phía máy chủ
            data: {
                username: username,
                password: password,
                passwordRepeat: passwordRepeat
            },
            success: function(response) {
              console.log(response)
              // Parse JSON response thành object
              var errors = JSON.parse(response);
              console.log(errors.success)
              // Kiểm tra nếu có thông báo lỗi từ máy chủ
              if (errors) {
                  // Hiển thị thông báo lỗi lên giao diện
                  $("#usernameError").html(errors.usernameError || "");
                  $("#passwordError").html(errors.passwordError || "");
                  $("#passwordRepeatError").html(errors.passwordRepeatError || "");
                  if (errors.success !== null && errors.success === "true") {
                    // Nếu không có lỗi, hiển thị thông báo thành công và làm điều gì đó khác
                    console.log(errors.success);
                    // Ví dụ: chuyển hướng người dùng đến trang khác sau khi đăng ký thành công
                    window.location.href = "Login.php?show=true";
                  }
              } else {
                console.log("có lỗi xảy ra ");
              }
            }
        });
    });
});
</script>
</head>
<body>

<form id="registrationForm" method="post">
  <div class="container1">
    <h1>Đăng ký</h1>
    <hr>

    <label for="username"><b>Tài khoản</b></label>
    <input type="text" placeholder="Nhập tài khoản Ví dụ: nguyen001" name="username" id="username" required>
    <div id="usernameError" class="error-message"></div>

    <label for="psw"><b>Mật khẩu</b></label>
    <input type="password" placeholder="Nhập mật khẩu Ví dụ: Nguyen@1234" name="psw" id="psw" required>
    <div id="passwordError" class="error-message"></div>

    <label for="psw-repeat"><b>Nhập lại mật khẩu</b></label>
    <input type="password" placeholder="Nhập lại mật khẩu" name="psw-repeat" id="psw-repeat" required>
    <div id="passwordRepeatError" class="error-message"></div>
    <hr>

    <button type="button" class="registerbtn">Đăng ký</button>
  </div>

  <div class="container1 signin">
    <p>Bạn đã có tài khoản? <a href="../PAGES/Login.php?show=true">Đăng nhập</a>.</p>
  </div>

</form>



</body>



</html>
