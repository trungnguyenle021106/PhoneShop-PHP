<?php
require_once('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "qldienthoai");
$connect->connectDB();

$condition = "MA_NSX=" . $_POST['id'];
foreach($connect->read("san_pham",$condition) as $row){
?>
    <tr>
                <td id="MASP_them"><?php echo $row['MA_SP']; ?></td>
                <td id="TENSP_them"><?php echo $row['TEN_SP']; ?></td>
                <td id="GIA_them"><?php echo $row['GIA_BAN']; ?></td>
                <td id="ANH_them"><img src="../Img/<?php echo $row['HINH_ANH']; ?>" alt="##" style="height: 50px; "></td>
                <td><?php echo $row['SO_LUONG']; ?></td>
    </tr>
                <?php
                }
                ?>


<!-- xóa từng chi tiết -->
<?php
$sql = "DELETE FROM `chi_tiet_nhap` WHERE MA_PN = '{$_POST['MAPN']}' AND MA_SP = '{$_POST['MASP']}'";
    $connect->query($sql);
?>

<!-- sửa từng chi tiết -->
<?php
$sql = "UPDATE `chi_tiet_nhap` 
        SET DON_GIA = '{$_POST['DONGIA_update']}', SO_LUONG = '{$_POST['SO_LUONG_update']}', THANH_TIEN = '{$_POST['THANHTIEN_update']}'
        WHERE MA_PN = '{$_POST['MAPN_update']}' AND MA_SP = '{$_POST['MASP_update']}' ";
    $connect->query($sql);
?>