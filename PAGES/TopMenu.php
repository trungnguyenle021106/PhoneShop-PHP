<?php
session_start();
$userName = ""; // Giá trị mặc định nếu không tìm thấy tên trong session

if (isset($_SESSION['user_name'])) {
    $userName = $_SESSION['user_name']; // Lấy tên từ session nếu đã đăng nhập
} else {
    $_SESSION['user_name'] = $userName;
}
if (isset($_SESSION['Ma_KhachHang'])) {
    $Ma_KhachHang = $_SESSION['Ma_KhachHang']; 
}
?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script>
$(document).ready(function() {
    $(".Img_user").click(function(event) {
        //event.stopPropagation(); // Ngăn ngừa sự kiện nổi bọt
        $(".dropdown-content").toggle(); // Toggle hiển thị dropdown content
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.dropdown').length) {
            $('.dropdown-content').hide(); // Ẩn dropdown khi click ra ngoài
        }
    });
});
</script>

<div class="topMenu-wrap">
        <div class="topMenu">
            <div class="wraper">

                <!-- <div class="container_LogoShop"> -->
                    <a href="index.php?page=Home">
                    <img class="logo-img" src="https://www.themobileshop.ca/static/3bc89f0a05845489d58f7237b889329c/TMS-Logo_Black_New-Tagline_EN.svg" alt="">
                    </a>
                    <!-- </div> -->
                <ul class="container_Element_TopMenu">
                    <li class="element_TopMenu">
                        <a href="index.php?page=Phones">Điện thoại</a>
                    </li>
                    <li class="element_TopMenu">
                    <a href="index.php?page=Accessories">Phụ kiện</a>
                    </li>
                    <li class="element_TopMenu">
                    <a href="index.php?page=Promotion">Khuyến mãi</a>
                    </li>
                    <li class="element_TopMenu">
                    <a href="">About us</a>
                    </li>
                    <li class="element_TopMenu">
                    <a href="index.php?page=ShoppingCart">
                        <img src="https://www.themobileshop.ca/static/6de947887c9459c2df599f1231c7775b/04504/shopping-cart.webp" alt="">
                    </a>
                    </li>

                    <!-- Kiểm tra xem có username trong session không -->
                    <?php if(isset($_SESSION['user_name']) && !empty($_SESSION['user_name'])): ?>
                        <li style="display: flex; align-items: center;" class="element_TopMenu">
                            <div id="user_name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                            <!-- Dropdown để đăng xuất -->
                            <div class="dropdown">
                                <img class="Img_user" src="Img/ic_user.png" alt="User" style="cursor: pointer;">
                                <div class="dropdown-content">
                                    <p><a href="/PAGES/logout.php">Đăng xuất</a></p>
                                </div>
                            </div>
                        </li>
                    <?php else: ?>
                        <li style="display: flex; align-items: center;" class="element_TopMenu">
                            <div id="user_name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                            <a href="#" onclick="document.getElementById('id01').style.display='block'" style="width:auto;" >
                                <img class="Img_user" src="Img/ic_user.png" alt="Login" style="cursor: pointer;">
                            </a>
                        </li>
                    <?php endif; ?>

                </ul>
                <!-- <div class="container_IconCart"> -->
                
                

                
                <!-- </div> -->
            </div>
        </div>
</div>