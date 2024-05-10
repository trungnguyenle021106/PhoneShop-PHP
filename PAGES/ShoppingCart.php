<link rel="stylesheet" href="./CSS/ShoppingCart.css">

<?php
$isKH = false;
$userID = "";
if (isset( $_SESSION['$isKH'])) {
    $isKH = $_SESSION['$isKH'];
}
if(isset($_SESSION['$userID']))
{
    $userID  = $_SESSION['$userID'];
}
?>
<form class="ShoppingCart_Page" method="POST" action="handleInvoice.php" >
    <div class="left">
        <!-- innerHTML -->
    </div>

    <div class="right">
        <input class="btn_DatHang" onclick="showAsk(<?php echo $isKH ;?>, <?php echo $userID  ;?>)" type="button" name="btn_dat_hang" id="" value="Mua Hàng">
    </div>
</form>
<div class="ask">
    <div class="ask-container">
        
    </div>
</div>

<script src="./js/XuLyTienVND.js"></script>
<script src="./js/shoppingCart.js"></script>