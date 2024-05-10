<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="CSS/Home.css">
    <title>Document</title>
</head>

<body>
    <?php
    require_once './Model/Database.php';
    require 'XuLyTienVND.php';

    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "qldienthoai";

    $connect = new MyConnection($server, $username, $password, $database);
    $connect->connectDB();


    ?>
    <div>

        <div class="bannerWrapper">
            <div class="bannerWrapper__img">
                <div class="bannerWrapper__btn"><a href="index.php?page=Search&TenSP=">Mua ngay</a></div>
                <img src="./Img/4.png" alt="">
            </div>
            <div class="bannerWrapper__img">
                <div class="bannerWrapper__btn"><a href="index.php?page=Search&TenSP=">Mua ngay</a></div>
                <img src="./Img/5.png" alt="">
            </div>
            <div class="bannerWrapper__img">
                <div class="bannerWrapper__btn"><a href="index.php?page=Search&TenSP=">Mua ngay</a></div>
                <img src="./Img/7.png" alt="">
            </div>
        </div>

        <div class="bannerMain">
            <div class="bannerMain__img">
                <div class="bannerMain__btn"><a href="index.php?page=Search&TenSP=">Mua ngay</a></div>
                <img src="./Img/3.png" alt="">
            </div>
        </div>
    </div>

    <section>
        <div class="chooseByBrand">
            <h1>Choose By Brand</h1>
            <div class="listBrand">
                <div class="itemListBrand itemListBrand__Apple">
                    <a href="index.php?page=Search&ThuongHieu=Apple">
                        <img src="Img/iphone-12-pro_gold_front.png" alt="">
                        <p>Apple</p>
                    </a>


                </div>
                <div class="itemListBrand itemListBrand__Samsung">
                    <a href="index.php?page=Search&ThuongHieu=Samsung">
                        <img src="Img/sm-f926_zfold3_5g_front_phantomb.png" alt="">
                        <p>Samsung</p>
                    </a>


                </div>
                <div class="itemListBrand itemListBrand__Motorola">
                    <a href="index.php?page=Search&ThuongHieu=Motorola">
                        <img src="Img/moto-g-power_flash-gray_front.png" alt="">
                        <p>Motorola</p>
                    </a>


                </div>
                <div class="itemListBrand itemListBrand__Google">
                    <a href="index.php?page=Search&ThuongHieu=Google">
                        <img src="Img/google-pixel-6-pro-front.png" alt="">
                        <p>Google</p>
                    </a>


                </div>
                <div class="itemListBrand itemListBrand__TCL">
                    <a href="index.php?page=Search&ThuongHieu=TCL">
                        <img src="Img/tcl_20-s_milky-way-grey_front.png" alt="">
                        <p>TCL</p>
                    </a>


                </div>

            </div>
        </div>

        <div class="phoneSectionContainer">
            <h3 class="phoneSectionContainer__title">Các thương hiệu điện thoại bán chạy.</h3>
            <div class="phoneContainer">

                <div class="phone">
                    <a class="img_phone" href="index.php?page=Search&ThuongHieu=Google">
                        <div class="img_front"><img src="Img/Google-Pixel7a_Carbon_Front.png" alt=""></div>
                        <div class="img_back"><img src="Img/Google-Pixel7a_Carbon_Back.png" alt=""></div>
                    </a>
                    <div class="infor">
                        <a title="Google Pixel 7a"  href="index.php?page=Search&ThuongHieu=Google">
                            <h4>Google</h4>
                            <p class="title_phone">Pixel 7a</p>
                        </a>


                    </div>

                </div>

                <div class="phone">
                    <a class="img_phone" href="index.php?page=Search&ThuongHieu=Samsung">
                        <!-- <div class="img_front"><img src="Img/Google-Pixel7a_Carbon_Front.png" alt=""></div> -->
                        <div style="left:-10px" class="img_back"><img src="Img/samsung_galaxy_a55_didongviet_xanhden_8.webp" alt=""></div>
                    </a>
                    <div class="infor">
                        <a title="Samsung Galaxy"  href="index.php?page=Search&ThuongHieu=Samsung">
                            <h4>Samsung</h4>
                            <p class="title_phone">Samsung Galaxy</p>
                        </a>


                    </div>

                </div>
                <div class="phone">
                    <a class="img_phone" href="index.php?page=Search&ThuongHieu=Apple">
                        <div style="left:-10px" class="img_back"><img src="Img/iPhone_15_Pro_Black_Titanium_Double.png" alt=""></div>
                        <!-- <div class="img_front"><img src="Img/Google-Pixel7a_Carbon_Back.png" alt=""></div> -->
                    </a>
                    <div class="infor">
                        <a title="Iphone 15" href="index.php?page=Search&ThuongHieu=Apple">
                            <h4>Apple</h4>
                            <p class="title_phone">Iphone 15</p>
                        </a>


                    </div>

                </div>
                <div class="phone">
                    <a class="img_phone" href="index.php?page=Search&ThuongHieu=TCL">
                        <!-- <div class="img_front"><img src="Img/Google-Pixel7a_Carbon_Front.png" alt=""></div> -->
                        <div style="left:-50px"  class="img_back"><img src="Img/TCL6.jpg" alt=""></div>
                    </a>
                    <div class="infor" style="z-index: 1;">
                        <a title="TCL 30SE" href="index.php?page=Search&ThuongHieu=TCL">
                            <h4>TCL</h4>
                            <p class="title_phone">TCL 30SE</p>
                        </a>


                    </div>

                </div>
                <div class="phone">
                    <a class="img_phone" href="index.php?page=Search&ThuongHieu=Motorola">
                        <div class="img_front"><img src="Img/Google-Pixel7a_Carbon_Front.png" alt=""></div>
                        <div class="img_back"><img src="Img/Motorolaofi.png" alt=""></div>
                    </a>
                    <div class="infor">
                        <a title="Motorola Moto" href="index.php?page=Search&ThuongHieu=Motorola">
                            <h4>Motorola</h4>
                            <p class="title_phone">Motorola Moto</p>
                        </a>


                    </div>

                </div>


            </div>
            <div class="intro">
                <div class="title_intro">
                    <h5>
                        Mobilists
                        <sup>TM</sup>
                        can help.
                    </h5>
                    <p style="font-size: 20px;
                        line-height: 32px;
                        color: rgb(51, 51, 51);
                        font-family: sans-serif;
                        margin: 0px 0px 1.45rem;
                        padding: 0px;
                        font-weight: 400;">
                        Our Mobilists
                        <sup>TM</sup>
                        are here to help you find the best device and plan.
                    </p>
                </div>
                <img src="Img/Mobilst_Woman_home-page_desktop.png" alt="">
            </div>
            <a class="seeAllPhone" href="index.php?page=Phones">See all phones</a>
        </div>
        <div class="bannerMain">
            <div class="bannerMain__img">
                <div class="bannerMain__btn"><a href="index.php?page=Search&TenSP=">Mua ngay</a></div>
                <img src="./Img/2.png" alt="">
            </div>
        </div>
        </div>
    </section>
    </div>
</body>

</html>