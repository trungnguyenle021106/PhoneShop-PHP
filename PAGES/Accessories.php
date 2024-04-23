<div class="accessories_content">

        <div class="filter">


                <select class="item-filter-accesories" id="loai" onchange="setDataForFilter()">
                        <option value="">LOẠI</option>
                        <option value="3">TAI NGHE</option>
                        <option value="5">SẠC</option>
                        <option value="4">ỐP LƯNG</option>
                </select>

                <select class="item-filter-accesories" id="nsx" onchange="setDataForFilter()">
                        <option value="">THƯƠNG HIỆU</option>
                        <option value="1">APPLE</option>
                        <option value="2">SAMSUNG</option>
                        <option value="Google">GOOGLE</option>
                        <option value="Oppo">OPPO</option>
                </select>
                <select class="item-filter-accesories" id="sapxep" onchange="setDataForFilter()">
                        <option value="">SẮP XẾP</option>
                        <option value="GIA_TANG_DAN">GIÁ TĂNG DẦN</option>
                        <option value="GIA_GIAM_DAN">GIÁ GIẢM DẦN</option>
                </select>
                <div style="position: relative;" id="btn_Price_Multi_Slider" class="item-filter-accesories">
                        <span>GIÁ KHOẢNG</span>
                        <!-- test -->
                        <div class="container-search-price-accessories" id="Price_Multi_Slider">
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
                                        <div class="btn-search-accessories">xem kết quả</div>
                                </div>
                        </div>
                        <!-- test -->
                </div>

                <div class="item-filter-accesories"> Clear ALL </div>
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
                        <button id="backPage_Btn">
                                << </button>
                                        <button>1</button>
                                        <button>2</button>
                                        <button>3</button>
                                        <button id="nextPage_Btn">>></button>
                </div>
        </div>
        <div class="footer_content">
                <h2 style="text-align: center; font-size: 20px; margin-top:20px; font-weight:bold">PHỤ KIỆN MỚI NHẤT</h2>
                <div class="accessories_section">
                        <?php
                        require './Model/Database.php';
                        $connection = new MyConnection('localhost', 'root', '', 'qldienthoai');
                        $connection->connectDB();
                        $list_data = $connection->read('san_pham', "MA_LOAI <> 1 ORDER BY MA_SP DESC LIMIT 5");
                        foreach ($list_data as $data) {
                                echo '<a href="" class="products" style="border: 1px solid black;">';
                                echo '<div class="name">' . $data['TEN_SP'] . '</div>';
                                echo '<div class="Img"><img src="Img/' . $data['HINH_ANH'] . '" alt="##"></div>';
                                echo '<div class="price">' . changePriceToString($data['GIA_BAN']) . '</div>';
                                echo '</a>';
                        }

                        function changePriceToString($price)
                        {
                                $s = "";
                                $temp = 0;
                                $flag = 0;
                                $amountDot = round(strlen($price) / 3);

                                if (strlen($price) % 3 == 0) {
                                        $amountDot--;
                                }
                                for ($i = strlen($price) - 1; $i >= 0; $i--) {
                                        $temp++;
                                        if ($temp == 3 && $flag < $amountDot) {
                                                $s = $s . $price[$i] . ".";
                                                $flag++;
                                                $temp = 0;
                                        } else {
                                                $s = $s . $price[$i];
                                        }
                                }
                                return strrev($s) . "đ";
                        }

                        $connection->closeConnection();
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

<script src="./js/accessories.js"></script>
<script src="./js/pageHandler.js"></script>

<script>
        window.onload = function() {
                setDataOnload();
        }
</script>
