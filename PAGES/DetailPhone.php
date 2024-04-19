<div class="main">
    <div class="content-detail-phone">
        <a href="?page=Phones" class="link_back">Back to Phones</a>
        <?php
            require("./Model/Database.php");

            $server ="localhost";
            $username = "root";
            $password = "";
            $database = "qldienthoai";

            $connect = new MyConnection($server, $username, $password, $database);
            $connect->connectDB();

            $product_details = $connect->read("san_pham JOIN cau_hinh_dien_thoai ON san_pham.MA_SP = cau_hinh_dien_thoai.MA_SP","MA_LOAI = 1");
            foreach ($product_details as $product_detail) {
                echo '<div class="img-detail">
                        <div class="img-gallery">
                            <div class="wrapper">
                                <div class="img-wrap">
                                    <img class="img-style" src="https://www.themobileshop.ca/static/bddcdbfa1520a5f0b0901cd536904f89/d0d6f/iPhone_15_Pro_Black_Titanium_Front.png" alt="">
                                </div>
                
                                <div class="img-wrap">
                                    <img class="img-style" src="https://www.themobileshop.ca/static/21805ce703cca9e5e82d9f8c05622c6c/94da9/iPhone_15_Pro_Black_Titanium_Double.webp" alt="">
                                </div>
                
                                <div class="img-wrap">
                                    <img class="img-style" src="https://www.themobileshop.ca/static/ee54043506cf9e57797093b817922c4e/bb4ed/iPhone_15_Pro_Black_Titanium_Side.webp" alt="">  
                                </div>
                            </div>
                            <div class="img-primary">
                                <img class="img-content" src="https://www.themobileshop.ca/static/bddcdbfa1520a5f0b0901cd536904f89/d0d6f/iPhone_15_Pro_Black_Titanium_Front.png" alt="">
                            </div>
                        </div>
                        <div class="device-info-wrapper">
                            <h1 class="phone-title-de">
                                <span class="brand">Apple</span>
                                <span class="model">'. $product_detail["TEN_SP"] .'</span>
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
                            <div class="memory-container">
                                <p class="section-heading">Memory</p>
                                <div class="storage-options memory-selector">
                                    <button class="storage-selector">256GB</button>
                                    <button class="storage">512GB</button>
                                    <button class="storage">1TB</button>
                                </div>
                            </div>
                            <div class="pricing-container">
                                <p class="section-heading pricing">GIÁ</p>
                                <div class="carrier-pricing-wrapper">

                                <span style="font-weight: bold; font-size:30px"> '. $product_detail["GIA_BAN"] .' VND</span>
                            
                
                                </div>
                            </div>
                            
                            <div class=compare-wrapper>
                                <button class="compare-phone-button">
                                    <span aria-hidden="true">+&nbsp;</span>
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                            </div>
                            <div class="compatible-accessories-wrapper">
                                <div class="copy-container">
                                    <p>Recommended accessories</p>
                                    <a class="styled-internal-link" href="?page=Phones&&item=iphone">See All</a>
                                </div>
                                <div class="carousel">
                                    <div class="swiper">
                                        <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
                                            <div class="swiper-slide" style="margin-right: 20px;">
                                                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                                                    <div class="manufacturer">Blu Element</div>
                                                    <div class="product">Blu Element DropZone Rugged w/MagSafe iPhone 15 Pro Max</div>
                                                
                                                    <div class="image-wrapper">
                                                        <img class="image-main" src="https://ams.iqmetrix.net/images/767f1498-fe0b-4af2-bd75-d88a22a9b651">
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="value-wrapper">
                                                            <div class="dollar">$39.99</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="swiper-slide" style="margin-right: 20px;">
                                                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                                                    <div class="manufacturer">Blu Element</div>
                                                    <div class="product">Blue Element Tempered Glass Pixel 7a</div>
                                                
                                                    <div class="image-wrapper">
                                                        <img class="image-main" src="https://ams.iqmetrix.net/images/343042a3-3db0-4b11-9d2a-d8fdb5245765">
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="value-wrapper">
                                                            <div class="dollar">$39.99</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="swiper-slide" style="margin-right: 20px;">
                                                <a class="card product-carousel" href="?page=Phones&&item=iphone">
                                                    <div class="manufacturer">Blu Element</div>
                                                    <div class="product">Blu Element Armour Rugged w/MagSafe iPhone 15 Pro Max</div>
                                                
                                                    <div class="image-wrapper">
                                                        <img class="image-main" src="https://ams.iqmetrix.net/images/68f7370b-27a4-45b6-bce0-675d6d700c41">
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="value-wrapper">
                                                            <div class="dollar">$34.99</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="specs-wrapper">
                            <p class="main-title">Details &amp; Specs</p>
                            <p class="spec-section-title">General Specs:</p>
                            <div class="spec-round-edge-box">
                                <div class="spec-row">
                                    <p class="spec-section-label">Dimensions</p>
                                    <p class="spec-section-detail">6.30in(H) x 3.02in(W) x 0.33in(D)</p>
                                </div>
                                <div class="spec-bottom-line"></div>
                                <div class="spec-row">
                                    <p class="spec-section-label">Weight</p>
                                    <p class="spec-section-detail">7.80 ounces</p>
                                </div>
                                <div class="spec-bottom-line"></div>
                                <div class="spec-row">
                                    <p class="spec-section-label">Operating System</p>
                                    <p class="spec-section-detail">iOS</p>
                                </div>
                            </div>
                            <p class="spec-section-title">Display and User Interface:</p>
                            <div class="spec-round-edge-box">
                                <div class="spec-row">
                                    <p class="spec-section-label">Display Size</p>
                                    <p class="spec-section-detail">6.7in</p>
                                </div>
                            </div>
                            <p class="spec-section-title">Battery:</p>
                            <div class="spec-round-edge-box">
                                <div class="spec-row">
                                    <p class="spec-section-label">Capacity</p>
                                    <p class="spec-section-detail">'. $product_detail["PIN"] .'</p>
                                </div>
                                <div class="spec-bottom-line"></div>
                            
                            </div>
                            <p class="spec-section-title">Camera and Video:</p>
                            <div class="spec-round-edge-box">
                                
                                <div class="spec-bottom-line"></div>
                                <div class="spec-row">
                                    <p class="spec-section-label">Rear Camera Features</p>
                                    <p class="spec-section-detail">
                                        '. $product_detail["CAMERA_SAU"] .'</p>
                                </div>
                                <div class="spec-bottom-line"></div>
                            
                                <div class="spec-bottom-line"></div>
                                <div class="spec-row">
                                    <p class="spec-section-label">Front Camera Features</p>
                                    <p class="spec-section-detail">
                                        '. $product_detail["CAMERA_TRUOC"] .'</p>
                                </div>
                            </div>
                        </div>
                    </div>';
            }
            $connect->closeConnection();
        ?>
    </div>
</div>
