<link rel="stylesheet" href="./CSS/detailPhone.css">
<div class="main">
    <div class="content-detail-phone">
        <a href="?page=Phones" class="link_back">Back to Phones</a>
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
        echo "<input type='hidden' class='id-km' value='$userID'/>";
        require_once("./Model/Database.php");
        require_once("XuLyTienVND.php");
        $server = "localhost";
        $username = "root";
        $password = "";
        $database = "qldienthoai";

        $connect = new MyConnection($server, $username, $password, $database);
        $connect->connectDB();

        $Masp;        
        if(isset($_GET['MaSP']))
        {
            $Masp = $_GET['MaSP'];
        }

        $products = $connect->read("san_pham", "MA_SP = ". $Masp);
        reset($products);
        $product = current($products);


        $producers =  $connect->read("nha_sx", "MA_NSX = " . $product["MA_NSX"]);
        reset($producers);
        $producer = current($producers);





        function setAttributeForOpLung($connect, $product)
        {
            $chols =  $connect->read("cau_hinh_oplung", "MA_SP= " . $product["MA_SP"]);
            reset($chols);
            $chol = current($chols);
            echo '<p class="main-title">CHI TIẾT VÀ THÔNG SỐ KỸ THUẬT</p>
            <p class="spec-section-title">THÔNG SỐ CHUNG:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">CHẤT LIỆU</p>
                    <p class="spec-section-detail">' . $chol["CHAT_LIEU"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">TÍNH NĂNG</p>
                    <p class="spec-section-detail">' . $chol["TINH_NANG"] . '</p>
                </div>
            </div>        
            ';
        }

        function setAttributeForSac($connect, $product)
        {
            $chss =  $connect->read("cau_hinh_sac", "MA_SP= " . $product["MA_SP"]);
            reset($chss);
            $chs = current($chss);
            echo '<p class="main-title">CHI TIẾT VÀ THÔNG SỐ KỸ THUẬT</p>
            <p class="spec-section-title">THÔNG SỐ CHUNG:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">KẾT NỐI</p>
                    <p class="spec-section-detail">' . $chs["KET_NOI"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">CÔNG SUẤT</p>
                    <p class="spec-section-detail">' . $chs["CONG_SUAT"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">TÍNH NĂNG</p>
                    <p class="spec-section-detail">' . $chs["TINH_NANG"] . '</p>
                </div>
            </div>
            ';
        }

        function setAttributeForTaiNghe($connect, $product)
        {
            $chtns =  $connect->read("cau_hinh_tai_nghe", "MA_SP= " . $product["MA_SP"]);
            reset($chtns);
            $chtn = current($chtns);
            echo '<p class="main-title">CHI TIẾT VÀ THÔNG SỐ KỸ THUẬT</p>
            <p class="spec-section-title">THÔNG SỐ CHUNG:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">KẾT NỐI</p>
                    <p class="spec-section-detail">' . $chtn["KET_NOI"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">TÍNH NĂNG</p>
                    <p class="spec-section-detail">' . $chtn["TINH_NANG"] . '</p>
                </div>
            </div>
            
            ';
        }

        function setAttributeForDienThoai($connect, $product)
        {
            $chdts =  $connect->read("cau_hinh_dien_thoai", "MA_SP= " . $product["MA_SP"]);
            reset($chdts);
            $chdt = current($chdts);
            echo '  <p class="main-title">CHI TIẾT VÀ THÔNG SỐ KỸ THUẬT</p>
            <p class="spec-section-title">THÔNG SỐ CHUNG:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">RAM</p>
                    <p class="spec-section-detail">' . $chdt["RAM"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">BỘ NHỚ TRONG</p>
                    <p class="spec-section-detail">' . $chdt["BO_NHO_TRONG"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">MÀU SẮC</p>
                    <p class="spec-section-detail">' . $chdt["MAU_SAC"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">HỆ ĐIỀU HÀNH</p>
                    <p class="spec-section-detail">' . $chdt["OS"] . '</p>
                </div>
            </div>
            <p class="spec-section-title">HIỂN THỊ:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">KÍCH THƯỚC MÀN HÌNH</p>
                    <p class="spec-section-detail">' . $chdt["MAN_HINH"] . '</p>
                </div>
            </div>
            <p class="spec-section-title">PIN:</p>
            <div class="spec-round-edge-box">
                <div class="spec-row">
                    <p class="spec-section-label">DUNG LƯỢNG</p>
                    <p class="spec-section-detail">' . $chdt["PIN"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>

            </div>
            <p class="spec-section-title">CAMERA AND VIDEO:</p>
            <div class="spec-round-edge-box">

                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">CAMERA TRƯỚC</p>
                    <p class="spec-section-detail">' . $chdt["CAMERA_TRUOC"] . '</p>
                </div>
                <div class="spec-bottom-line"></div>

                <div class="spec-bottom-line"></div>
                <div class="spec-row">
                    <p class="spec-section-label">CAMERA SAU</p>
                    <p class="spec-section-detail">' . $chdt["CAMERA_SAU"] . '</p>
                </div>
            </div>
            ';
        }

        function setSacByNSX($connect,  $product, $producer)
        {
            $s = "";
            $sacs = $connect->read("san_pham", "MA_NSX = " . $product["MA_NSX"] . " AND MA_LOAI = 5");
            if (!empty($sacs)) {
                $sac = end($sacs);
                
                $s  =  $s . ' 
            <div class="swiper-slide" style="margin-right: 20px;">
                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                    <div class="manufacturer">' . $producer["TEN_NSX"] . '</div>
                    <div class="product">' . $sac["TEN_SP"] . '</div>

                    <div class="image-wrapper">
                        <img class="image-main" src="../Img/' . $sac["HINH_ANH"] . '">
                    </div>
                    <div class="card-footer">
                        <div class="value-wrapper">
                            <div class="dollar">' .changePriceToString($sac["GIA_BAN"]). '</div>
                        </div>
                    </div>
                </a>
            </div>
            ';
            
            }
            return $s;
        }

        function setTaiNgheByNSX($connect,  $product, $producer)
        {
            $s = "";
            $tainghes = $connect->read("san_pham", "MA_NSX = " . $product["MA_NSX"] . " AND MA_LOAI = 3");
            if (!empty($tainghes)) {
                $tainghe = end($tainghes);
                $s  =  $s . ' 
            <div class="swiper-slide" style="margin-right: 20px;">
                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                    <div class="manufacturer">' . $producer["TEN_NSX"] . '</div>
                    <div class="product">' . $tainghe["TEN_SP"] . '</div>

                    <div class="image-wrapper">
                        <img class="image-main" src="../Img/' . $tainghe["HINH_ANH"] . '">
                    </div>
                    <div class="card-footer">
                        <div class="value-wrapper">
                            <div class="dollar">' . changePriceToString($tainghe["GIA_BAN"]) . '</div>
                        </div>
                    </div>
                </a>
            </div>
            ';
            }
            return $s;
        }

        function setOpLungByNSX($connect,  $product, $producer)
        {
            $s = "";
            $oplungs = $connect->read("san_pham", "MA_NSX = " . $product["MA_NSX"] . " AND MA_LOAI = 4");
            if (!empty($oplungs)) {
                $oplung = end($oplungs);
                $s  =  $s . ' 
            <div class="swiper-slide" style="margin-right: 20px;">
                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                    <div class="manufacturer">' . $producer["TEN_NSX"] . '</div>
                    <div class="product">' . $oplung["TEN_SP"] . '</div>

                    <div class="image-wrapper">
                        <img class="image-main" src="../Img/' . $oplung["HINH_ANH"] . '">
                    </div>
                    <div class="card-footer">
                        <div class="value-wrapper">
                            <div class="dollar">' . changePriceToString($oplung["GIA_BAN"]) . '</div>
                        </div>
                    </div>
                </a>
            </div>
            ';
            }
            return $s;
        }
        ?>
        <div class="img-detail">
            <div class="img-gallery">
               
                <div class="img-primary">
                    <img class="img-content" src="<?php
                                        echo "./Img/". $product["HINH_ANH"]
                                        ?>" alt="">
                </div>
            </div>
            <div class="device-info-wrapper">
                <h1 class="phone-title-de">
                    <span class="brand"><?php
                                        echo $producer["TEN_NSX"]
                                        ?></span>
                    <span class="model"><?php
                                        echo $product["TEN_SP"]
                                        ?></span>
                </h1>
                <!-- Có thời gian thì làm chọn màu -->
                <!-- <div class="colour-picker-container">
                                <p class="section-heading">Colours
                                </p>
                                <div class="colours selectable">
                                    <button class="colour-item black"></button>
                                    <button class="colour-item blue"></button>
                                    <button class="colour-item natural"></button>
                                </div>
                            </div> -->
                <!-- Có thời gian thì làm chọn màu -->

                <!-- Nếu là điện thoại thì echo ra -->
                <?php
                if ($product["MA_LOAI"] == 1) {
                    echo '<div class="memory-container">
                    <p class="section-heading">Memory</p>
                    <div class="storage-options memory-selector">
                        <button class="storage-selector">256GB</button>
                        <button class="storage">512GB</button>
                        <button class="storage">1TB</button>
                    </div>
                </div>';
                } ?>
                <!-- <div class="memory-container">
                    <p class="section-heading">Memory</p>
                    <div class="storage-options memory-selector">
                        <button class="storage-selector">256GB</button>
                        <button class="storage">512GB</button>
                        <button class="storage">1TB</button>
                    </div>
                </div> -->
                <!-- Nếu là điện thoại thì echo ra -->
                <div class="pricing-container">
                    <p class="section-heading pricing">GIÁ</p>
                    <div class="carrier-pricing-wrapper">

                        <span style="font-weight: bold; font-size:30px"> <?php
                                                                            echo changePriceToString($product["GIA_BAN"])
                                                                            ?></span>


                    </div>
                </div>

                <div class=compare-wrapper>
                    <button class="compare-phone-button">
                        <span aria-hidden="true">+&nbsp;</span>
                        <span>Thêm vào giỏ hàng</span>
                    </button>
                </div>
               
            </div>
            <div class="specs-wrapper">
                <?php
                if ($product["MA_LOAI"] == 1) {
                    setAttributeForDienThoai($connect, $product);
                } else if ($product["MA_LOAI"] == 3) {
                    setAttributeForTaiNghe($connect, $product);
                } else if ($product["MA_LOAI"] == 4) {
                    setAttributeForOpLung($connect, $product);
                } else if ($product["MA_LOAI"] == 5) {
                    setAttributeForSac($connect, $product);
                }
                ?>
            </div>
        </div>

    </div>
</div>
<script src="./js/detailPhone.js"></script>
<script src="./js/shoppingCart.js"></script>
<?php
$connect->closeConnection();
?>