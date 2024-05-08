<?php
    require '../Model/Database.php';
    $conn = new MyConnection('localhost', 'root', '', 'qldienthoai');
    $conn->connectDB();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['product_id']) && isset($_POST['soluong'])) {
            $sql1 = "hoa_don ORDER BY MA_HD DESC";
            $order = $conn->read($sql1);
            $mahd = $order[0]["MA_HD"] + 1;
            $makm = 1;
            $ngayTao = "2024-04-30";
            $tinhTrang = "đang";
            $manv = 1;
            $makh = 1;
            $tongTien = 5000000;
            $sql2 = "INSERT INTO hoa_don (MA_HD,MA_KM,NGAY_TAO,TINH_TRANG,MA_NV,MA_KH,TONG_TIEN) VALUES ('$mahd','$makm','$ngayTao','$tinhTrang','$manv','$makh','$tongTien')";
            if ($conn->query($sql2) === TRUE) {
            } else {
                if (isset($_SERVER['HTTP_REFERER'])) {
                    echo 'loi';
                }
            }


            $ids = $_POST['product_id'];
            $quantities = $_POST['soluong'];
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