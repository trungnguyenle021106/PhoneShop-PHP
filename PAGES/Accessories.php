<?php
require_once './Model/Database.php';
require './PAGES/XuLyTienVND.php';

$server = "localhost";
$username = "root";
$password = "";
$database = "qldienthoai";

$connect = new MyConnection($server, $username, $password, $database);
$connect->connectDB();


?>
<link rel="stylesheet" href="./CSS/accessories.css">
<div class="accessories_content">

        <div class="filter">


                <select class="item-filter-accesories" id="loai">
                        <option value="">LOẠI</option>
                        <?php
                        $list_loai = $connect->read("loai", "MA_LOAI <> 1");
                        foreach ($list_loai as $loai) {
                                echo '<option value = "' . $loai["MA_LOAI"] . '">' . $loai["TEN_LOAI"] . '</option>';
                        }
                        ?>
                </select>

                <select class="item-filter-accesories" id="nsx">
                        <option value="">THƯƠNG HIỆU</option>
                        <?php
                        $list_nsx = $connect->read("nha_sx", "");
                        foreach ($list_nsx as $nsx) {
                                echo '<option value = "' . $nsx["MA_NSX"] . '">' . $nsx["TEN_NSX"] . '</option>';
                        }
                        ?>
                </select>
                <select class="item-filter-accesories" id="sapxep" >
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
        <div class="footer_content">
                <h2 style="text-align: center; font-size: 20px; margin-top:20px; font-weight:bold">PHỤ KIỆN MỚI NHẤT</h2>
                <div class="accessories_section">
                        <?php

                        $list_data = $connect->read('san_pham', "MA_LOAI <> 1 ORDER BY MA_SP DESC LIMIT 5");
                        foreach ($list_data as $data) {
                                echo '<a href="index.php?page=DetailPhone&MaSP=' . $data['MA_SP'].'" class="products" style="border: 1px solid black;">';
                                echo '<div class="name">' . $data['TEN_SP'] . '</div>';
                                echo '<div class="Img"><img src="Img/' . $data['HINH_ANH'] . '" alt="##"></div>';
                                echo '<div class="price">' . changePriceToString($data['GIA_BAN']) . '</div>';
                                echo '</a>';
                        }



                        $connect->closeConnection();
                        ?>
                        <!-- <a href="" class="products" style="border: 1px solid black;">
                                <div class="name">Zagg</div>
                                <div class="discrible">iPhone 15/14/13 ZAGG (GEAR4) Crystal Palace Case</div>

                                <div class="Img"><img src="Img/zagg.jpg" alt="##"></div>
                                <div class="price">$49.99</div>
                        </a> -->
                </div>
        </div>
</div>
<script src="./js/pageHandler.js"></script>
<script src="./js/XuLyTienVND.js"></script>
<script src="./js/accessoriesV2.js"></script>

