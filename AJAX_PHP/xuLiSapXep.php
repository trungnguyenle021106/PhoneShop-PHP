<?php 
require '../Model/Database.php';
$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();
        if (isset($_POST['thuTuSapXep'])) {
            $thuTuSapXep = $_POST['thuTuSapXep'];
            $cotSapXep = $_POST['cotSapXep'];
            $bangSapXep = $_POST['bangSapXep'];
            $sql = "select * from $bangSapXep order by $cotSapXep $thuTuSapXep";
            $result = $connect->query($sql);
            $data = array();

            // Lặp qua mỗi dòng kết quả và thêm nó vào mảng
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            // Chuyển đổi mảng thành chuỗi JSON
            $json_data = json_encode($data);

            // In ra chuỗi JSON
            echo $json_data;
        }
        

?>