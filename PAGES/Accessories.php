<div class="accessories_content">

        <div class="filter">


                <select class="item-filter" id="loai">
                        <option value="type">LOẠI</option>
                        <option value="Tai nghe">TAI NGHE</option>
                        <option value="Sac">SẠC</option>
                        <option value="Op lung">ỐP LƯNG</option>
                </select>

                <select class="item-filter" id="nsx">
                        <option value="producer">THƯƠNG HIỆU</option>
                        <option value="Apple">APPLE</option>
                        <option value="Samsung">SAMSUNG</option>
                        <option value="Google">GOOGLE</option>
                        <option value="Oppo">OPPO</option>
                </select>
                <select class="item-filter" id="sapxep">
                        <option value="sort">SẮP XẾP</option>
                        <option value="Apple">GIÁ TĂNG DẦN</option>
                        <option value="Samsung">GIÁ GIẢM DẦN</option>
                </select>
                <div id="sort-option" class="item-filter">
                        <i class="fa-solid fa-chevron-down" id="arrow"></i>
                </div>

                
                <button id="btn-clear" style=""><span>CLEAR</span></button>
        </div>
        <div class="accessories_section" id="accessories_page">
                <a href="" class="products">
                        <div class="name">Hypergear</div>
                        <div class="discrible">Hypergear 20W White USB-C PD Wall Charger Hub</div>

                        <div class="Img"><img src="Img/hypergear.png" alt="##"></div>
                        <div class="price">$19.99</div>
                </a>




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

                        function changePriceToString($price) {
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
                                    }
                                    else {
                                        $s = $s . $price[$i];
                                    }
                                }
                                return strrev($s)."đ";
                            }

                        $connection->closeConnection();
                        ?>
                        <a href="" class="products" style="border: 1px solid black;">
                                <div class="name">Zagg</div>
                                <div class="discrible">iPhone 15/14/13 ZAGG (GEAR4) Crystal Palace Case</div>

                                <div class="Img"><img src="Img/zagg.jpg" alt="##"></div>
                                <div class="price">$49.99</div>
                        </a>




                </div>


        </div>
</div>

<script src="/js/accessories.js"></script>
<script src="/js/pageHandler.js"></script>

<script>
        window.onload = function() {
                loadData(1, 3, 3)
        }
</script>
<!-- <div class="scroll_down_btn">
                <i class="fa-solid fa-arrow-down" style="color:white; margin-left: 20px; margin-top: 5px; border-radius: 50%; background-color: red; padding: 10px;"></i>
                <span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif; color: red">Back down</span>
        </div>
        <div class="scroll_up_btn">
                <i class="fa-solid fa-arrow-up" style="color:white; margin-left: 20px; margin-top: 5px; border-radius: 50%; background-color: red; padding: 10px;"></i>
                <span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif; color: red; margin-left: 10px;">Back up</span>
        </div>
        </div> -->