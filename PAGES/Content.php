<div class="content">
    <!-- <div style="width: 100%; height:1000px"></div> XOA DONG NAY DI -->
    <?php
        if(isset($_GET['page']))
        {
            if($_GET['page']=='Promotion')
            {
                require("Promotion.php");
            }
        }
    ?>
</div>