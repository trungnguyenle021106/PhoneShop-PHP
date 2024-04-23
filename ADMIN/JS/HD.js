// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "hoa_don";
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

            // Sau HDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLHD_HT = document.querySelector('#SLHD_HT span');
var rows = document.querySelectorAll('#table_HD table tbody tr ');
SLHD_HT.innerText = rows.length;
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
        <tr><td id="HD_Ma">${elementPage[i].MA_HD}</td>
        <td id="HD_MaKM">${elementPage[i].MA_KM}</td>
        <td id="HD_MaKH">${elementPage[i].MA_KH}</td>
        <td id="HD_MaHD">${elementPage[i].MA_HD}</td>
        <td id="HD_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="HD_NgayTao">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TongTien"><span>${elementPage[i].TONG_TIEN}</span>$</td>
        <form action="" method="POST"><input type="hidden" name="MAHD"><td><input type="button" value="xóa" class="thaotac"></td></form> 
        <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" id="HD_sua_btn" class="thaotac" value="sửa"></td></form>
        <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" id="HD_chitiet_btn" class="thaotac" value="chi tiết"></td></form>
        </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_HD').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_HD').value;
        var txt = document.getElementById('txt_timkiem_HD').value;
        var rows = document.querySelectorAll('#table_HD table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAHD'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MAHD = rows[i].querySelector('#HD_Ma').innerText;
        
                    if(MAHD.includes(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'Ngày tạo'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaHD = rows[i].querySelector('#HD_NgayTao').innerText;
                        if(MaHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'MaNV'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaHD = rows[i].querySelector('#HD_MaNV').innerText;
                        if(MaHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'MaKH'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaHD = rows[i].querySelector('#HD_MaKH').innerText;
        if(MaHD.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'Tình trạng'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaHD = rows[i].querySelector('#HD_TinhTrang').innerText;
        if(MAHD.includes(txt)){
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