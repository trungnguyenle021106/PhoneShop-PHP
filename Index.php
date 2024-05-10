<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/Template.css">
    <link rel="stylesheet" href="CSS/base.css">
    <link rel="stylesheet" href="CSS/register.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
<script src="js/toast.js"></script>
<script src="./js/UpdateTimeKM.js"></script>
</html>