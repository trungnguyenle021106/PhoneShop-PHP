// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "chi_tiet_nhap";
    var condition = "";
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response) {

            // Sau CTPNi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLCTPN_HT = document.querySelector('#SLHT_CTPN span');
var rows = document.querySelectorAll('#table_CTPN table tbody tr ');
SLCTPN_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <form action="" method="POST">
        <tr>
         <td><input type="text" readonly value="${elementPage[i].MA_PN}" name="MAPN_CTPN" id="MAPN_CTPN"></td>
         <td><input type="text" readonly value="${elementPage[i].MA_SP}" name="MaSP_CTPN" id="MaSP_CTPN"></td>
         <td><input type="text" readonly value="${elementPage[i].DON_GIA}$" name="DON_GIA_CTPN"  id="DON_GIA_CTPN"></td>
         <td><input type="text" readonly value="${elementPage[i].SO_LUONG}" name="SL_CTPN" id="SL_CTPN"></td>
         <td><input type="text" readonly value="${elementPage[i].THANH_TIEN}" name="ThanhTien_CTPN" id="ThanhTien_CTPN"></td>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <td><input type="submit" id="CTPN_xoa_btn" name="CTPN_xoa_btn" class="thaotac" value="xóa"></td>
            <td><input type="button" id="CTPN_sửa_btn" class="thaotac" value="sửa"></td>
        </tr>
    </form>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }

     
    //chức năng tìm kiếm
    var khoang = document.querySelector('.khoang');
    var khoang1 = document.querySelector('.khoang1');
    var khoang2 = document.querySelector('.khoang2');
    document.addEventListener('DOMContentLoaded', function(){
    var opt = document.getElementById('opt_timkiem_CTPN'); // Lấy thẻ select

    function toggleDateInput() {
        if(opt.value === 'DON_GIA'){
            khoang.style.display = 'block';
            khoang1.style.display = 'none';
            khoang2.style.display = 'none';
        }
        else if(opt.value === 'Số lượng'){
            khoang.style.display = 'none';
            khoang1.style.display = 'block';
            khoang2.style.display = 'none';
        }
        else if(opt.value === 'Thành tiền'){
            khoang.style.display = 'none';
            khoang1.style.display = 'none';
            khoang2.style.display = 'block';
        }
        else {
            khoang.style.display = 'none';
            khoang1.style.display = 'none';
            khoang2.style.display = 'none';
        }
    }
    opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
});
document.getElementById('btn_timkiem_CTPN').addEventListener('click', function(event){
    event.preventDefault();
    var opt = document.getElementById('opt_timkiem_CTPN').value;
    var txt = document.getElementById('txt_timkiem_CTPN').value;
    var rows = document.querySelectorAll('#table_CTPN table tbody tr');

        for(var i = 0; i < rows.length; i++){
            if(opt === 'MACTPN'){
            if(txt === ''){
                for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
            }
            else{
                var MACTPN = rows[i].querySelector('#MAPN_CTPN').value;
                if(MACTPN === txt){
                    rows[i].style.display = 'table-row';
                }
                else{ 
                    rows[i].style.display = 'none';
                }
            }
            }

            else if(opt === 'MASP'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
                }
                else{
                    var MaNV = rows[i].querySelector('#MaSP_CTPN').value;
                    if(MaNV.indexOf(txt) !== -1){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }
            else if(opt === 'DON_GIA'){
                var khoang = document.querySelector('.khoang');
                var start = khoang.querySelector('#DONGIA_start_other').value;
                var end = khoang.querySelector('#DONGIA_end_other').value;

                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
         }
                else{
                    var MaNSX = rows[i].querySelector('#DON_GIA_CTPN').value;
                    MaNSX = MaNSX.split('$');
                    var giaTri = parseFloat(MaNSX[0]); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                    if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }
            else if(opt === 'Số lượng'){
                var khoang1 = document.querySelector('.khoang1');
                var start = khoang1.querySelector('#SL_start_other').value;
                var end = khoang1.querySelector('#SL_end_other').value;

                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }   
                }

                else{
                    var DG = rows[i].querySelector('#SL_CTPN').value;
                    var giaTri = parseFloat(DG); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                    if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }


            else if(opt === 'Thành tiền'){
                var khoang2 = document.querySelector('.khoang2');
                var start = khoang2.querySelector('#THANHTIEN_start_other').value;
                var end = khoang2.querySelector('#THANHTIEN_end_other').value;
                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
            }
            else{
                var DG = rows[i].querySelector('#ThanhTien_CTPN').value;
                DG = DG.split('$');
                var giaTri = parseFloat(DG[0]); // Chuyển đổi sang số để so sánh
                var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
                    rows[i].style.display = 'table-row';
                }
                else{ 
                    rows[i].style.display = 'none';
                }
            }
            }
        }
});

//chức năng tìm kiếm
