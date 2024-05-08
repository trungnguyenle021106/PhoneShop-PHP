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
                <!-- <li class="element_TopMenu">
                    <a href="">About us</a>
                </li> -->
                <li class="element_TopMenu">
                    <a href="index.php?page=ShoppingCart">
                        <img src="https://www.themobileshop.ca/static/6de947887c9459c2df599f1231c7775b/04504/shopping-cart.webp" alt="">
                    </a>
                </li>
                <li class="element_TopMenu">
                    <div class="wrap-search">
                        <input id="input-search" class="input-search" type="text" placeholder="Tim gi do">
                        <svg id="search_btn" height="15" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="search-icon">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </div>
                </li>
                <!-- Kiểm tra xem có username trong session không -->
                <?php if (isset($_SESSION['user_name']) && !empty($_SESSION['user_name'])) : ?>
                    <li style="display: flex; align-items: center;" class="element_TopMenu">
                        <div id="user_name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                        <!-- Dropdown để đăng xuất -->
                        <div class="dropdown">
                            <img class="Img_user" src="Img/ic_user.png" alt="User" style="cursor: pointer;">
                            <div class="dropdown-content">
                                <a  href="../PhoneShop/PAGES/logout.php">Đăng xuất</a>
                                <hr style="margin-bottom:10px">
                               <a href="index.php?page=profileUser">Thông tin tài khoản</a>
                            </div>
                        </div>
                    </li>
                <?php else : ?>
                    <li style="display: flex; align-items: center;" class="element_TopMenu">
                        <div id="user_name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                        <a href="#" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">
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