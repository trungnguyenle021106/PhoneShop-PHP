<?php
session_start();
// $userID = $_SESSION['ID_ACCOUNT'];
$userID = 9;
require '../Model/Database.php';
$connect = new MyConnection('localhost', 'root', '', 'qldienthoai');
$connect->connectDB();


$users = $connect->read("tai_khoan", "MA_TK = ". $userID);
reset($users);
$user = current($users);


$list_ctq_cn = $connect->read("ctq_chuc_nang", "MA_Q = ". $user["MA_Q"]);
$list_chuc_nang = $connect->read("chuc_nang");

$array_TenChucNang =[];
foreach ($list_ctq_cn as $ctq_cn) {
    foreach ($list_chuc_nang as $chuc_nang) {
        if($ctq_cn["MA_CN"] == $chuc_nang["MA_CN"])
        {
            array_push($array_TenChucNang,$chuc_nang["TEN_CN"]);
        }
    }
}


$data = array(
    'tai_khoan' => $user ,
    'array_TenChucNang' => $array_TenChucNang
);

echo json_encode($data);
