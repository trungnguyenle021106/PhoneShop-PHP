// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "khach_hang";
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

            // Sau khi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLKH_HT = document.querySelector('#SLKH_HT span');
var rows = document.querySelectorAll('#table_KH table tbody tr ');
SLKH_HT.innerText = rows.length;
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
    var ulContainer = document.querySelector("#table_KH table tbody");
    
    for (var i = 0; i < elementPage.length; i++) {
        var tr = document.createElement('tr');
        var content = '<tr><td id="KH_MAKH">'+ elementPage[i].MA_KH + '</td><td id="KH_TK">'+ elementPage[i].MA_TK + '</td><td id="KH_ten">'+ elementPage[i].HOTEN_KH + '</td><td id="KH_gioitinh">'+ elementPage[i].G_TINH + '</td><td id="KH_diachi">'+ elementPage[i].DIA_CHI + '</td><td id="KH_SDT">'+ elementPage[i].SO_DT + '</td><td id="KH_CCCD">'+ elementPage[i].SO_CCCD + '</td><form action="" method="POST"><input type="hidden" name="MAKH_xoa" value = <?php echo $row["MA_KH"]; ?><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" value="xóa" class="thaotac"></td></form><form action="" method="POST"><td><input type="button" id="KH_sua_btn" class="thaotac" value="sửa"></td></form></tr>';
        
            tr.innerHTML = content;
            ulContainer.append(tr);   
    
             // Gán sự kiện cho nút thêm cấu hình mới tạo
        tr.querySelector('#KH_sua_btn').addEventListener('click', function(){   
        });
        
    }
    }




     //chức năng tìm kiếm
document.getElementById('btn_timkiem_KH').addEventListener('click', function(event){
    event.preventDefault();
    var opt = document.getElementById('opt_timkiem_KH').value;
    var txt = document.getElementById('txt_timkiem_KH').value;
    var rows = document.querySelectorAll('#table_KH table tbody tr');

        for(var i = 0; i < rows.length; i++){
            if(opt === 'MAKH'){
            if(txt === ''){
                for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
            }
            else{
                var MAKH = rows[i].querySelector('#KH_MAKH').innerText;
    
                if(MAKH === txt){
                    rows[i].style.display = 'table-row';
                }
                else{ 
                    rows[i].style.display = 'none';
                }
            }
            }

            else if(opt === 'Tên khách hàng'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
                }
                else{
                    var MaNV = rows[i].querySelector('#KH_ten').innerText;
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
                    var MaNV = rows[i].querySelector('#KH_diachi').innerText;
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
    var MaNV = rows[i].querySelector('#KH_SDT').innerText;
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
    var MaNV = rows[i].querySelector('#KH_CCCD').innerText;
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
    var MaNV = rows[i].querySelector('#KH_TK').innerText;
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
