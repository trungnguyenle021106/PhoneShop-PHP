<?php
    require '../Model/Database.php';
    $conn = new MyConnection('localhost', 'root', '', 'qldienthoai');
    $conn->connectDB();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['product_id']) && isset($_POST['soluong'])) {
            $ids = $_POST['product_id'];
            $quantities = $_POST['soluong'];
            $mahd = 1;
            $thue = 100;
            $thanhtien = 500;
            for($i = 0; $i < count($ids); $i++) {
                $sql = "INSERT INTO chi_tiet_hoadon (MA_SP,MA_HD,SL_BAN,THUE_SUAT,THANH_TIEN) VALUES ('$ids[$i]','$mahd','$quantities[$i]','$thue','$thanhtien')";
                echo $sql . "<br>";
                if ($conn->query($sql) === TRUE) {
                    
                } else {
                    if (isset($_SERVER['HTTP_REFERER'])) {
                        header("Location: " . $_SERVER['HTTP_REFERER'] . "&&buy=false");
                        exit;
                    }
                }
            }
        }
        
        if (isset($_SERVER['HTTP_REFERER'])) {
            header("Location: " . $_SERVER['HTTP_REFERER'] . "&&buy=success");
            exit;
        }
    }
    $conn->closeConnection();
?>