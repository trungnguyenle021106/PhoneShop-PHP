<div class="content">
    <!-- <div style="width: 100%; height:1000px"></div> XOA DONG NAY DI -->
    <?php
    require("Login.php");
    if (isset($_GET['page'])) {
        if ($_GET['page'] == 'Promotion') {
            require("Promotion.php");
        } elseif ($_GET['page'] == 'Phones') {
            require("Phones.php");
        } elseif ($_GET['page'] == 'Accessories') {
            require("Accessories.php");
        } elseif ($_GET['page'] == 'ShoppingCart') {
            require("ShoppingCart.php");
        } elseif ($_GET['page'] == 'Home') {
            require("Home.php");
        } elseif ($_GET['page'] == 'Search') {
            require("Search.php");
        } elseif ($_GET['page'] == 'profileUser') {
            require("profileUser.php");
        }
        else if($_GET['page'] == 'DetailPhone') {
            require("DetailPhone.php");
        }
    }
    else {
        require("Home.php");
    }
    ?>
</div>