<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/Template.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/promotion.css">
    <link rel="stylesheet" href="css/phone.css">
    <link rel="stylesheet" href="css/detailPhone.css">
    <link rel="stylesheet" href="css/accessories.css">
    <link rel="stylesheet" href="css/Shoppingcart.css">
    <link rel="stylesheet" href="css/Home.css">

    <title>Document</title>
</head>

<body>
    <?php 
        require("PAGES/TopMenu.php");
    ?>
    <div class="page">
        <?php
        require("PAGES/Content.php");
        ?>
    </div>
    <?php
    require("PAGES/Footer.php");
    ?>
</body>
    <script src="./js/event.js"></script>

</html>