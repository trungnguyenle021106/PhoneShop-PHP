<div class="accessories_content">

    <div class="filter">


        <select class="item-filter-accesories" id="loai" onchange="setDataForFilter()">
            <option value="">LOẠI</option>
        </select>

        <select class="item-filter-accesories" id="nsx" onchange="setDataForFilter()">
            <option value="">THƯƠNG HIỆU
            </option>
            <?php
            require './Model/Database.php';
            $connection = new MyConnection('localhost', 'root', '', 'qldienthoai');
            $connection->connectDB();
            $producers =  $connection->read("nha_sx");
            foreach ($producers as $producer) {
                echo '<option id="MANSX_' . $producer["MA_NSX"] . '" value="' . $producer["MA_NSX"] . '">' . $producer["TEN_NSX"] . '</option>';
            }
            ?>
        </select>
        <select class="item-filter-accesories" id="sapxep" onchange="setDataForFilter()">
            <option value="">SẮP XẾP</option>
            <option value="GIA_TANG_DAN">GIÁ TĂNG DẦN</option>
            <option value="GIA_GIAM_DAN">GIÁ GIẢM DẦN</option>
        </select>
        <div style="position: relative;" id="btn_Price_Multi_Slider" class="item-filter-accesories ">
            <span>GIÁ KHOẢNG</span>
            <!-- test -->
            <div class="container-search-price-accessories dp-block-accessories" id="Price_Multi_Slider">
                <div class="content-price-accessories">
                    <p class="price-left-accessories">0đ</p>
                    <p class="price-right-accessories">100.000.000đ</p>
                </div>
                <div id="slider-accessories">
                    <div class="left1-accessories"></div>
                    <div class="right1-accessories"></div>
                </div>
                <div class="group-btn-accessories">
                    <div class="btn-close-accessories" id="btn_close_price_slider">đóng</div>
                    <div class="btn-search-accessories" id="btn_result_price_slider">xem kết quả</div>
                </div>
            </div>
            <!-- test -->
        </div>

        <div class="item-filter-accesories" id="btn_ClearAll"> Clear ALL </div>
    </div>
    <div class="accessories_section" id="accessories_page">

        <!-- <a href="" class="products">
                        <div class="name">Hypergear</div>
                        <div class="discrible">Hypergear 20W White USB-C PD Wall Charger Hub</div>

                        <div class="Img"><img src="Img/hypergear.png" alt="##"></div>
                        <div class="price">$19.99</div>
                </a> -->
    </div>
    <div class="change_slide_content">
        <div class="change_slide" id="Pagination">
            <!-- <button id="backPage_Btn">
                                << </button>
                                        <button>1</button>
                                        <button>2</button>
                                        <button>3</button>
                                        <button id="nextPage_Btn">>></button> -->
        </div>
    </div>

</div>
<script src="../js/search.js"></script>
<script>
    <?php
    $searchType = "";
    $searchValue = "";


    if (isset($_GET['TenSP'])) {
        $searchType = "'TenSP'";
        $searchValue = "'" . $_GET['TenSP'] . "'";
    } else if (isset($_GET['ThuongHieu'])) {

        $list_data = $connection->read('nha_sx', "TEN_NSX = " . "'" . $_GET['ThuongHieu'] . "'");
        reset($list_data);
        $nsx = current($list_data);

        $searchType = "'ThuongHieu'";
        $searchValue = "'" . $nsx["MA_NSX"] . "'";

        $connection->closeConnection();
    }
    ?>

    setDataOnload(<?php echo $searchType; ?>, <?php echo $searchValue; ?>);
</script>

<script src="../js/pageHandler.js"></script>
<script src="../js/XuLyTienVND.js"></script>