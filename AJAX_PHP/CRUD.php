<?php
require '../Model/Database.php';
$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();


$operation = $_POST['operation'];
$tableName = $_POST['tableName'];



$jsonResponse;

switch ($operation) {
    case "Create":
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);

        $connect->create($tableName, $data);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Create Custom":
        $jsonData = $_POST['jsonData'];
        $jsonColumn = $_POST['jsonColumn'];
        $data = json_decode($jsonData, true);
        $columns = json_decode($jsonColumn, true);

        $connect->createCustom($tableName, $data, $columns);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Update":
        $jsonData = $_POST['jsonData'];
        $data = json_decode($jsonData, true);
        $idName = $_POST['idName'];
        $idValue = $_POST['idValue'];

        $connect->update($tableName, $idName, $idValue, $data);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Delete":
        $idName = $_POST['idName'];
        $idValue = $_POST['idValue'];

        $connect->delete($tableName, $idName, $idValue);
        $jsonResponse = $connect->read($tableName);
        break;
    case "Read":
        $condition = $_POST['condition'];

        $jsonResponse = $connect->read($tableName, $condition);
        break;
    case "Custom Read":
        $selectCondition = $_POST['selectCondition'];
        $condition = $_POST['condition'];

        $jsonResponse = $connect->readCustom($selectCondition, $tableName, $condition);
        break;
    default:
        break;
}
echo json_encode($jsonResponse);
$connect->closeConnection();
