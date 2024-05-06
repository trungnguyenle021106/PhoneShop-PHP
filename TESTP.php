<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="button" onclick="add()" value="create">
    <input type="button" onclick="update()" value="update">
    <input type="button" onclick="Delete()" value="delete">
    <input type="button" onclick="read()" value="read">
    <div id="container">
        <ul id="elementPage">

        </ul>

        <?php
        require('Model/Database.php');
        $connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
        $connect->connectDB();
        $data = '[{"collumn1": "68"}, {"collumn1": "67"}]';  // Chuỗi JSON đại diện cho một mảng liên kết

        $dataArray = json_decode($data, true);  // Chuyển đổi chuỗi JSON thành mảng liên kết
        $connect->updateTINH_TRANG($dataArray, "phieu_bao_hanh", "'Hết hạn bảo hành'", "MA_PBH");
        $connect->closeConnection();
        ?>
        <div id="pageContainer"></div>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="./js/TEST_CRUD_AJAX_PHP.js"></script>

</html>