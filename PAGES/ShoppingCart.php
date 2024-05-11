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
if (isset($_SESSION['Ma_KhachHang'])) {
    $Ma_KhachHang = $_SESSION['Ma_KhachHang'];
}
echo "<input type='hidden' class='id-kh-cart' value='$userID'/>";
?>
<form class="ShoppingCart_Page" method="POST" action="./PAGES/handleInvoice.php" >
    <div class="left">
        <!-- innerHTML -->
    </div>

    <div class="right">
        <input class="btn_DatHang" onclick="showAsk(<?php echo $isKH . ','.$userID.',' . $Ma_KhachHang;?>)" type="button" name="btn_dat_hang" id="" value="Mua Hàng">
    </div>
</form>
<div class="ask">
    <div class="ask-container">
        
    </div>
</div>

<script src="./js/XuLyTienVND.js"></script>
<script src="./js/shoppingCart.js"></script>

<script>
    cart.loadLayouts()
</script>