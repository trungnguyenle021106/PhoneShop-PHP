
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/index_admin.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>admin</title>
</head>
<body id="body_admin">
    <header id="header_admin">
    <div id="logo">
    <a href=""><image src="../Img/logo.png" style="width: 350px;"></image></a>
    </div>
    <div id="title">
        <?php
        if(isset($_POST['page'])){
            if($_POST['page'] == 'Khách hàng'){
                echo "Quản lý khách hàng";
            }
            else if($_POST['page'] == 'Nhân viên'){
                echo "Quản lý nhân viên";
            }
            else if($_POST['page'] == 'Tài khoản' || $_POST['page'] == 'Quyen'){
                echo "Quản lý tài khoản";
            }
            else if($_POST['page'] == 'Nhà sản xuất'){
                echo "Quản lý nhà sản xuất";
            }
            else if($_POST['page'] == 'Bảo hành'){
                echo "Quản lý phiếu bảo hành";
            }
            else if($_POST['page'] == 'Serial'){
                echo "Quản lý Serial";
            }
            else if($_POST['page'] == 'Nhập hàng' || $_POST['page'] == 'CTPN'){
                echo "Quản lý phiếu nhập";
            }
            else if($_POST['page'] == 'Bán hàng' || $_POST['page'] == 'CTHD'){
                echo "Quản lý bán hàng";
             }
             else if($_POST['page'] == 'Sản phẩm' || $_POST['page'] == 'CHTN' || $_POST['page'] == 'CHDT' || $_POST['page'] == 'CHS' || $_POST['page'] == 'CHOL'){
                echo "Quản lý sản phẩm";
             }
        }
        ?>
    </div>
    <div id="user">
    <div id="username" style="font-size: 20px; font-weight: bold;"></div>
    <image src="../Img/avatar.png" id="avatar"></image>
</div>
    </header>

<section id="section_admin">
<form id="left_content" method="POST">
    <table>
        <tr>
            <td><input type="submit" value="Sản phẩm" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Khách hàng" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Nhân viên" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Bán hàng" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Bảo hành" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Nhập hàng" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Nhà sản xuất" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Tài khoản" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Serial" name="page" class="items"></input></td>
            </tr>
        </th>
</table>
</form>

<div id="right_content">

    <?php
    if(isset($_POST['page'])){
        if($_POST['page'] == 'Khách hàng'){
            require("KH_admin.php");
        }
        else if($_POST['page'] == 'Nhân viên'){
            require("NV_admin.php");
        }
        else if($_POST['page'] == 'Tài khoản'){
            require('TK_admin.php');
        }
        else if($_POST['page'] == 'Nhà sản xuất'){
            require("NSX_admin.php");
        }
        else if($_POST['page'] == 'Bảo hành'){
            require("PBH_admin.php");
        }
        else if($_POST['page'] == 'Nhập hàng'){
           require("PNK_admin.php");
        }
        else if($_POST['page'] == 'CTPN'){
            require("CTPN_admin.php");
         }
        else if($_POST['page'] == 'Bán hàng'){
            require("HD_admin.php");
         }
        else if($_POST['page'] == 'CTHD'){
            require("CTHD_admin.php");
         }
         else if($_POST['page'] == 'Sản phẩm'){
            require("SP_admin.php");
         }
         else if($_POST['page'] == 'CHDT'){
            require("CHDT_admin.php");
         }
         else if($_POST['page'] == 'CHOL'){
            require("CHOL_admin.php");
         }
         else if($_POST['page'] == 'CHS'){
            require("CHS_admin.php");
         }
         else if($_POST['page'] == 'Serial'){
            require("Serial_admin.php");
         }
         else if($_POST['page'] == 'CHTN'){
            require("CHTN_admin.php");
         }
         else if($_POST['page'] == 'Quyen'){
            require("Quyen_admin.php");
         }
    }
    ?>
</div>
</section>
<script src="JS/index_admin.js"></script>
</body>
</html>
