<div class="container">
    <div class="container-left">
        <div class="container-left-info">
            <div class="header">
                <span class="header-title">Carriers</span>
                <span class="header-clear-all">Clear All</span>
            </div>

            <div class="content">
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Bell</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Rogers</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Telus</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Freedom Mobile</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Fido</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Koodo</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Virgin</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Chatr</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Lucky Moblie</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">PC Mobile</span>
                </div>
            </div>
        </div>

        <div class="container-left-info">
            <div class="header">
                <span class="header-title">Brand</span>
            </div>

            <div class="content">
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Apple</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Samsung</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Motorola</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Google</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">TCL</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">ALcatel</span>
                </div>
            </div>
        </div>

        <div class="container-left-info">
            <div class="header">
                <span class="header-title">Categories</span>
            </div>

            <div class="content">
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Phones</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Prepaid Phones</span>
                </div>
                <div class="content-item">
                    <input type="checkbox" class="content-item-check" />
                    <span class="conten-item-title">Tablets</span>
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
                    <?php
                        require("./Model/Database.php");

                        $server ="localhost";
                        $username = "root";
                        $password = "";
                        $database = "qldienthoai";

                        $connect = new MyConnection($server, $username, $password, $database);
                        $connect->connectDB();

                        $products = $connect->read("san_pham","MA_LOAI = 1");
                        foreach ($products as $product) {
                            echo '<div class="phone-item">
                                <img class="phone-img" src="/phoneShop/img/'. $product["HINH_ANH"] . '" alt="chua co anh">
                                <div class="phone-wrap">
                                    <a href="#" class="phone-link">
                                        <p class="phone-producer">'. $product["TEN_SP"] .'</p>
                                    </a>
                                </div>
                                
                                <div class="phone-footer">
                                    <div class="phone-footer-wrap">
                                    <span style="font-size: 20px; font-weight:bold ">Giá : '. $product["GIA_BAN"] . 'đ</span>
                                    </div>
                                    <a href="?page=Phones&&item=iphone" class="phone-detail">View details</a>
                                </div>
                            </div>';
                        }
                        $connect->closeConnection();
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
echo '';
?>