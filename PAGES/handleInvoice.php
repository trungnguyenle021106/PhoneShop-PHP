<?php
    require '../Model/Database.php';
    $conn = new MyConnection('localhost', 'root', '', 'qldienthoai');
    $conn->connectDB();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['product_id']) && isset($_POST['soluong']) && isset($_POST['price'])) {
            $sql1 = "hoa_don ORDER BY MA_HD DESC";
            $order = $conn->read($sql1);
            $listKm = $conn->read('khuyen_mai');
            if (empty($order)) {
                $mahd = 1;
            } else {
                $mahd = $order[0]["MA_HD"] + 1;
            }
            $makm = 1;
            $ngayTao = date("Y-m-d");
            $tinhTrang = "Chưa liên lạc";
            $manv = 1;
            $makh = 1;
            $tongTien = 0;

            $ids = $_POST['product_id'];
            $quantities = $_POST['soluong'];
            $prices = $_POST['price'];

            $sql2 = "INSERT INTO hoa_don (MA_HD,MA_KM,NGAY_TAO,TINH_TRANG,MA_NV,MA_KH,TONG_TIEN) VALUES ('$mahd','$makm','$ngayTao','$tinhTrang','$manv','$makh','$tongTien')";
            if ($conn->query($sql2) === TRUE) {
                for($i = 0; $i < count($ids); $i++) {
                    $thanhtien = (int)$quantities[$i] * (int)$prices[$i];   
                    $thue = $thanhtien / 100 * 10;
                    $tongTien += $thanhtien;
                    $sql = "INSERT INTO chi_tiet_hoadon (MA_SP,MA_HD,SL_BAN,THUE_SUAT,THANH_TIEN) VALUES ('$ids[$i]','$mahd','$quantities[$i]','$thue','$thanhtien')";

                    if ($conn->query($sql) === TRUE) {
                        $sqlQuantity = "UPDATE san_pham SET SO_LUONG = SO_LUONG - $quantities[$i] WHERE MA_SP = '$ids[$i]'";
                        if ($conn->query($sqlQuantity) === TRUE) {
                            
                        } else {
                            echo "Error: " . $sqlQuantity . "<br>" . $conn->error();
                        }

                        foreach ($listKm as $km) {
                            if((int)$km['DIEU_KIEN'] < (int)$tongTien) {
                                $makm = $km['MA_KM'];
                                $tongTien -= $km['SO_TIEN_GIAM'];
                            }
                        }
                        $total = (int)$tongTien + (int)$thue;
                        $sqlQuantity1 = "UPDATE hoa_don SET TONG_TIEN = $total, MA_KM = '$makm'  WHERE MA_HD = '$mahd'";
                        if ($conn->query($sqlQuantity1) === TRUE) {
                            
                        } else {
                            echo "Error: " . $sqlQuantity1 . "<br>" . $conn->error();
                        }
                    } else {
                        if (isset($_SERVER['HTTP_REFERER'])) {
                            header("Location: " . $_SERVER['HTTP_REFERER'] . "&&buy=false");
                            exit;
                        }
                    }
                }
            } else {
                if (isset($_SERVER['HTTP_REFERER'])) {
                    echo "Error: " . $sql2 . "<br>" . $conn->error();
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