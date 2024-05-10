<div class="content">
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

    if (isset($_GET['page'])) {
        if ($_GET['page'] == 'Promotion') {
            require("Promotion.php");
        } elseif ($_GET['page'] == 'Phones') {
            require("Phones.php");
        } elseif ($_GET['page'] == 'Accessories') {
            require("Accessories.php");
        } elseif ($_GET['page'] == 'ShoppingCart') {
            if($userID != '') {
                require("ShoppingCart.php");
            } else {
                header("Location: ./index.php?page=Home&&show=true");
                exit;
            }
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
    require("Login.php");
    ?>
</div>