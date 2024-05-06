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
        $data = [
            "1" => "5",   // MA_SP = 1, cộng 5 vào SO_LUONG
        ];
        $data1 = json_encode($data);
        echo $data1;
        var_dump(json_decode($data1));
        
        $operator = "+";
        $connect->updateSoLuong($data, $operator);
        ?>
        <div id="pageContainer"></div>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="./js/TEST_CRUD_AJAX_PHP.js"></script>

</html>