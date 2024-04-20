<?php
require("Database.php");

$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();

// THÊM VÀO DATABASE
$data = array(
    "MA_SP" => "2",
    "MA_HD" => "1",
    "SL_BAN" => "1",
    "THUE_SUAT" => "100",
    "THANH_TIEN" => "35234"
);
// $connect->create("chi_tiet_hoadon", $data);
// THÊM VÀO DATABASE

// ĐỌC DỮ LIỆU TỪ DATABASE
$chi_tiet_hoadons = $connect->read("chi_tiet_hoadon");
foreach ($chi_tiet_hoadons as $chi_tiet_hoadon) {
    echo "Tên khách hàng: " . $chi_tiet_hoadon["MA_SP"] . "<br>";
}
// ĐỌC DỮ LIỆU TỪ DATABASE

//CẬP NHẬT DỮ LIỆU DATABASE
$MA_SP = 12;
$data = array(
    "TEN_SP" => "Jane Smith",
    "GIA_BAN" => 1
);
$connect->update("san_pham", "MA_SP", $MA_SP, $data);
//CẬP NHẬT DỮ LIỆU DATABASE

//XÓA 
$MA_LOAI = 3;
$connect->delete("loai", "MA_lOAI", $MA_LOAI);
//XÓA 
