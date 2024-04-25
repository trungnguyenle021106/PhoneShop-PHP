<?php
session_start(); // Khởi động session
session_unset(); // Xóa tất cả biến trong session
session_destroy(); // Hủy session
header("Location: /PhoneShop/index.php"); // Chuyển hướng người dùng về trang chủ
exit();
?>
