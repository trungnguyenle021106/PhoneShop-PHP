<div class="container">
    <div class="container-left">
        <?php
            require 'Model/Database.php';
            $connection = new MyConnection('localhost', 'root', '', 'qldienthoai');
            $connection->connectDB();
            $category = $connection->read('loai');
            $made = $connection->read('nha_sx');
            
            echo '<div class="container-left-info">
                        <div class="header">
                            <span class="header-title">Danh mục</span>
                        </div>
                        <div class="content1">';

            foreach ($category as $item) {
                echo '
                    <div class="content-item">
                        <input type="checkbox" class="content-item-check" checked/>
                        <span class="content-item-title">'. $item["TEN_LOAI"] .'</span>
                    </div>';
                            
            }
            
            echo'</div>
            </div>
            <div class="container-left-info">
                <div class="header">
                    <span class="header-title">Hãng</span>
                </div>

                <div class="content1">';

            foreach ($made as $item) {
                echo '
                    <div class="content-item">
                        <input type="checkbox" class="content-item-check" checked/>
                        <span class="content-item-title">
                        '. $item["TEN_NSX"] .'</span>
                    </div>';
            }

            echo '</div>
            </div>';
            $connection->closeConnection();
        ?>
        <div class="container-left-info">
            <div class="header">
                <span class="header-title">Sắp xếp</span>
            </div>
            <div class="content1">
                <div class="content-item">
                    <input name="price" type="radio" class="content-item-check" checked/>
                    <span class="content-item-title">Giá: mặc định</span>
                </div>
                <div class="content-item">
                    <input name="price" type="radio" class="content-item-check"/>
                    <span class="content-item-title">Giá: nhỏ đến lớn</span>
                </div>
                <div class="content-item">
                    <input name="price" type="radio" class="content-item-check"/>
                    <span class="content-item-title">Giá: lớn đến nhỏ</span>
                </div>
            </div>
        </div>
        <h1 class="advanced">Advanced</h1>
        <div class="advanced-wrap">
            <div class="advanced-item">
                <div class="advanced-title">PIN</div>
                <button class="advanced-btn">
                    <i class="icon"></i>
                </button>
            </div>

            <div class="advanced-item">
                <div class="advanced-title">MÀN HÌNH</div>
                <button class="advanced-btn">
                    <i class="icon"></i>
                </button>
            </div>

            <div class="advanced-item">
                <div class="advanced-title">RAM</div>
                <button class="advanced-btn">
                    <i class="icon"></i>
                </button>
            </div>

            <div class="advanced-item">
                <div class="advanced-title">BỘ NHỚ TRONG</div>
                <button class="advanced-btn">
                    <i class="icon"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="container-right">
        <div class="right-content">
            <div class="content-container">
                <h1 class="container-title">Phones</h1>
                <div class="phone-list">
                    <!-- innerHTML page  -->
                </div>
                <div class="nav">
                    <!-- inner nav -->
                </div>
                <!-- test -->
                <!-- <div class="container-search-price">
                    <div class="content-price">
                        <p class="price-left">0đ</p>
                        <p class="price-right">100.000.000đ</p>
                    </div>
                    <div id="slider">                    
                        <div class="left1"></div>
                        <div class="right1"></div>
                    </div>
                    <div class="group-btn">
                        <div class="btn-close">đóng</div>
                        <div class="btn-search">xem kết quả</div>
                    </div>
                </div> -->
                <!-- test -->
            </div>
        </div>
    </div>
    <script src="/phoneShop/js/pageHandler.js"></script>
    <script src="/phoneShop/js/phone.js"></script>
</div>