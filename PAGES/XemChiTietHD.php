<?php 
    require_once("./Model/Database.php");
    $server ="localhost";
    $username = "root";
    $password = "";
    $database = "qldienthoai";
    $conn = new MyConnection($server,$username,$password,$database);
    $conn->connectDB();
    if (isset($_REQUEST["maHoaDon"]) ) {
        $maHoaDon = $_REQUEST["maHoaDon"];
        $chiTietHoaDonData = $conn->read( "chi_tiet_hoadon" ,"MA_HD = $maHoaDon");

        $sqlProducts = "SELECT * FROM san_pham WHERE MA_SP IN (
            SELECT MA_SP FROM chi_tiet_hoadon WHERE MA_HD = '$maHoaDon'
        )";
        $resultProducts = $conn->query($sqlProducts);
        $data = array();
        $productsData = array();
        // Lặp qua mỗi dòng kết quả và thêm nó vào mảng
        while ($row = $resultProducts->fetch_assoc()) {
            $productsData[] = $row;
        }
        $data['invoiceDetails'] = $chiTietHoaDonData;
        $data['products'] = $productsData;
        // Chuyển đổi mảng thành chuỗi JSON
        $json_data = json_encode($data);

        // In ra chuỗi JSON
        echo $json_data;
    }

?>