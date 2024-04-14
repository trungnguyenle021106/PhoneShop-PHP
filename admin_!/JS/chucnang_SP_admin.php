<script>
var SLSP_HT = document.querySelector('#SLSP_HT span');
var rows = document.querySelectorAll('#table_SP table tbody tr');

SLSP_HT.innerText = rows.length;
</script>


 
<?php
//chức năng sửa 
if(isset($_POST['btn_suaSP'])){
    $MASP = $_POST['MASP'];
    $Ten = $_POST['TenSP'];
    $GIA = $_POST['Gia_SP'];
    $ANH = $_POST['AnhSP'];

    $data = array(
        "TEN_SP" => $Ten,
        "HINH_ANH" => $ANH,
        "GIA_BAN" => $GIA,
    );
    $connect->update("san_pham", "MA_SP", $MASP, $data);
    }
    //chức năng sửa 
    ?>

<?php
// //chức năng xóa
if(isset($_POST['MASP_xoa'])){
$MASP = $_POST['MASP_xoa'];


$connect->delete("cau_hinh_dien_thoai", "MA_SP",$MASP);
$connect->delete("cau_hinh_tai_nghe", "MA_SP",$MASP);
$connect->delete("cau_hinh_sac", "MA_SP",$MASP);
$connect->delete("cau_hinh_oplung", "MA_SP",$MASP);
//xóa các phiếu bảo hành và mã serial

$rows = $connect->read("serial", "MA_SP = $MASP");
if (!empty($rows)) {
    foreach ($rows as $row) {
        $connect->delete("phieu_bao_hanh", "MA_SERIAL", $row['MA_SERIAL']);
    }
}

$connect->delete("serial", "MA_SP", $MASP);

$connect->delete("serial", "MA_SP", $MASP);
$connect->delete("chi_tiet_hoadon", "MA_SP",$MASP);
$connect->delete("chi_tiet_nhap", "MA_SP",$MASP);
    
$connect->delete("san_pham", "MA_SP",$MASP);
}
// //chức năng xóa
?>
 


<?php
if(isset($_POST['btn_themSP']) && !empty($_POST['TENSP']) && !empty($_POST['GIASP']) && !empty($_POST['MANSX']) && !empty($_POST['ANHSP']) && !empty($_POST['LOAISP'])) {

    $Ten = $_POST['TENSP'];
    $GIA = $_POST['GIASP'];
    $MANSX_SP = $_POST['MANSX'];
    $ANH = $_POST['ANHSP'];
    $LOAI = $_POST['LOAISP'];

    $MaLoai;
    if($LOAI == 'Điện thoại'){
        $MaLoai = '1';
    }
    else{
        $MaLoai = '2';
    }

    $data = array(
        "MA_LOAI" => $MaLoai,
        "MA_NSX" => $MANSX_SP,
        "TEN_SP" => $Ten,
        "GIA_BAN" => $GIA,
        "HINH_ANH" => $ANH,
        "SO_LUONG" => 1
    );
    $connect->create('san_pham',$data);

    // Lấy ID của dòng vừa thêm vào
    $MASP = $connect->getLastInsertedId();

    //thêm cấu hình
    if($LOAI == 'Điện thoại'){
    $data = array(
        "MA_SP" => $MASP,
        "RAM" => $_POST['RAM'],
        "BO_NHO_TRONG" => $_POST['BNT_them'],
        "MAN_HINH" => $_POST['MH_them'],
        "MAU_SAC" => $_POST['MS_them'],
        "PIN" => $_POST['PIN'],
        "CAMERA_TRUOC" => $_POST['CAMTRC'],
        "CAMERA_SAU" => $_POST['CAMSAU']
    );
    $connect->create('cau_hinh_dien_thoai',$data);

    }
    else if($LOAI == 'Sạc'){
        $data = array(
            "MA_SP" => $MASP,
            "CONG_SUAT" => $_POST['CsS_them'],
            "TINH_NANG" => $_POST['CHSTN_them'],
        );
        $connect->create('cau_hinh_sac',$data);
    
        }

     else if($LOAI == 'Tai nghe'){
            $data = array(
                "MA_SP" => $MASP,
                "KET_NOI" => $_POST['KNTN_them'],
                "TINH_NANG" => $_POST['TNTN_them'],
            );
            $connect->create('cau_hinh_tai_nghe',$data);
            }

      else if($LOAI == 'Ốp lưng'){
                $data = array(
                    "MA_SP" => $MASP,
                    "CHAT_LIEU" => $_POST['CLOL_them'],
                    "TINH_NANG" => $_POST['TNOL_them'],
                );
                $connect->create('cau_hinh_oplung',$data);
                }
    
            
        //thêm cấu hình
}
?>



<script>
    //chức năng ẩn hiện form sửa
    var btn_sua_SP = document.querySelectorAll('#SP_sua_btn');
    
    btn_sua_SP.forEach(button => {
        button.addEventListener('click', function(){
            var form_sua_SP = document.getElementById('container_suaSP')
            var tr = button.parentElement.parentElement;
          
            form_sua_SP.querySelector('#TenSP_sua').value = tr.querySelector('#SP_TEN').innerText;
            form_sua_SP.querySelector('#Gia_SP').value = tr.querySelector('#SP_GIA').innerText;
            form_sua_SP.querySelector('#AnhSP').value = tr.querySelector('#SP_ANH img').src.split("http://localhost/admin_!/image_admin/")[1];
            form_sua_SP.querySelector('#MASP_sua').value = tr.querySelector('#SP_MASP').innerText;

            form_sua_SP.style.display = 'block';
        });
    });


    document.addEventListener('click', function(){
        var form_sua_SP = document.getElementById('container_suaSP');
        if(event.target === form_sua_SP){
            form_sua_SP.style.display = 'none';
        }

    })
        //chức năng ẩn hiện form sửa

    </script>

