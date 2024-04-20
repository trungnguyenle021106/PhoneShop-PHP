// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "nhan_vien";
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

            // Sau NVi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLNV_HT = document.querySelector('#SLNV_HT span');
var rows = document.querySelectorAll('#table_NV table tbody tr ');
SLNV_HT.innerText = rows.length;
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
    var ulContainer = document.querySelector("#table_NV table tbody");
    
    for (var i = 0; i < elementPage.length; i++) {
        var tr = document.createElement('tr');
        var content = '<tr><td id="NV_MANV">'+ elementPage[i].MA_NV + '</td><td id="NV_HoTen">'+ elementPage[i].HOTEN_NV + '</td><td id="NV_diachi">'+ elementPage[i].DIA_CHI + '</td><td id="NV_SDT">'+ elementPage[i].SO_DT + '</td><td id="NV_CCCD">'+ elementPage[i].SO_CCCD + '</td><td id="NV_gioitinh">'+ elementPage[i].G_TINH + '</td><td id="NV_tuoi">'+ calculateAge(elementPage[i].N_SINH) + '</td><td id="NV_MATK"> '+ elementPage[i].MA_TK + '</td><form action="" method="POST"><input type="hidden" name="MANV"><td><input type="button" value="xóa" class="thaotac"></td></form><form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" id="NV_sua_btn" class="thaotac" value="sửa"></td></form></tr>';
        
            tr.innerHTML = content;
            ulContainer.append(tr);   
    
             // Gán sự kiện cho nút thêm cấu hình mới tạo
        tr.querySelector('#NV_sua_btn').addEventListener('click', function(){   
        });
        
    }
    }



//hàm tính tuổi
function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate.replace(/-/g, '/')); // Chuyển đổi định dạng 'yyyy-mm-dd' thành 'yyyy/mm/dd'
    const age = today.getFullYear() - birthDateObj.getFullYear();
    
    return age + " tuổi";
}

//hàm tính tuổi





     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_NV').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_NV').value;
        var txt = document.getElementById('txt_timkiem_NV').value;
        var rows = document.querySelectorAll('#table_NV table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MANV'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MANV = rows[i].querySelector('#NV_MANV').innerText;
        
                    if(MANV.includes(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'Tên nhân viên'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaNV = rows[i].querySelector('#NV_HoTen').innerText;
                        if(MaNV.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'Địa chỉ'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaNV = rows[i].querySelector('#NV_diachi').innerText;
                        if(MaNV.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'SDT'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_SDT').innerText;
        if(MaNV.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'CCCD'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_CCCD').innerText;
        if(MANV.includes(txt)){
            rows[i].style.display = 'table-row';
        }
    
        
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    
    
    else if(opt === 'MATK'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_MATK').innerText;
        if(MaNV.includes(txt)){
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