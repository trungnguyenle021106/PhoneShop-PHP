<?php
require_once 'Database.php';
$connection = new MyConnection('localhost', 'root', '', 'qldienthoai');
$connection->connectDB();

$data = array(
        'san_pham' => $connection->read('san_pham'),
        'cau_hinh_dien_thoai' => $connection->read('cau_hinh_dien_thoai')
);

echo json_encode($data);
$connection->closeConnection();
?>