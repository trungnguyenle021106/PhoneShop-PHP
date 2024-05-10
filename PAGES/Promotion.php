<link rel="stylesheet" href="CSS/a.css">
<div class="promotion_Page">
    <div class="element_Promotion">
        <img src="./Img/1.png">
        <input type="button" class="button_Promotion MuaHang" value="Mua hàng">
    </div>
    <div class="element_Promotion">
        <img src="./Img/2.png">
        <input type="button" class="button_Promotion MuaHang" value="Mua hàng">
    </div>
</div>

<script>
   // Lấy tất cả các phần tử có lớp là "MuaHang"
   var buttons = document.getElementsByClassName("MuaHang");

   // Gắn sự kiện click cho từng nút "Mua hàng"
   for (var i = 0; i < buttons.length; i++) {
       buttons[i].addEventListener('click', function() {
           window.location.href = "index.php?page=Search&TenSP=";
       });
   }
</script>