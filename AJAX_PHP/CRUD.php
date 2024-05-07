<?php
require '../Model/Database.php';
$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();


$operation = $_POST['operation'];


$jsonResponse;

switch ($operation) {
    case "Create":
        $tableName = $_POST['tableName'];
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);

        $connect->create($tableName, $data);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Create Custom":
        $tableName = $_POST['tableName'];
        $jsonData = $_POST['jsonData'];
        $jsonColumn = $_POST['jsonColumn'];
        $data = json_decode($jsonData, true);
        $columns = json_decode($jsonColumn, true);

        $connect->createCustom($tableName, $data, $columns);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Update":
        $tableName = $_POST['tableName'];
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);
        $idName = $_POST['idName'];
        $idValue = $_POST['idValue'];

        $connect->update($tableName, $idName, $idValue, $data);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Update SL":
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);
        $operator = $_POST['operator'];

        $connect->updateSoLuong($data, $operator);
        $jsonResponse = $connect->read("san_pham");
        break;
    case "Update TinhTrang":
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);
        $tableName = $_POST['tableName'];
        $idName = $_POST['idName'];
        $tinhtrang = $_POST['tinhtrang'];

        $connect->updateTINH_TRANG($data, $tableName, $tinhtrang, $idName);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Delete":
        $tableName = $_POST['tableName'];
        $idName = $_POST['idName'];
        $idValue = $_POST['idValue'];

        $connect->delete($tableName, $idName, $idValue);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Read":
        $tableName = $_POST['tableName'];
        $condition = $_POST['condition'];

        $jsonResponse = $connect->read($tableName, $condition);
        break;
    case "Custom Read":
        $tableName = $_POST['tableName'];
        $selectCondition = $_POST['selectCondition'];
        $condition = $_POST['condition'];

        $jsonResponse = $connect->readCustom($selectCondition, $tableName, $condition);
        break;
    default:
        break;
}
echo json_encode($jsonResponse);
$connect->closeConnection();
?>
