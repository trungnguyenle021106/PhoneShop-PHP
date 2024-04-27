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


   function update()
{

        var data = {
            HOTEN_KH: $('#TenKH_sua').val(),
            SO_DT: $('#SDT_KH').val(),
            DIA_CHI: $('#DiaChiKH').val()
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "khach_hang";
    var idName = "MA_KH";
    var idValue = $('#MAKH_sua').val();
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}



function Delete(MAKH) {
    var operation = "Delete";
    var idName = "MA_KH";
    var idValue = MAKH;

    // Hàm xóa từng bảng
    function deleteFromTable(tableName, idName, idValue) {
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                idName: idName,
                idValue: idValue
            },
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

    }


    // Đọc mã hóa đơn và xóa hóa đơn
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: "Read",
            tableName: "hoa_don",
            condition: "MA_KH=" + MAKH,
        },
        success: function(response) {
                // Xóa chi tiết hóa đơn
                for(var i = 0; i < response.length; i++){
                    deleteFromTable("chi_tiet_hoadon", "MA_HD", response[i].MA_HD);
                }
                // Xóa hóa đơn
                deleteFromTable("hoa_don", "MA_KH", MAKH);
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });

    // Xóa sản phẩm
    deleteFromTable("khach_hang", idName, idValue);
    location.reload();


}
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //

    function DisplayElementPage(elementPage) {
        var html = "";
        for (var i = 0; i < elementPage.length; i++) {
            html += `
            <tr><td id="KH_MAKH">${elementPage[i].MA_KH}</td>
            <td id="KH_TK">${elementPage[i].MA_TK}</td>
            <td id="KH_ten">${elementPage[i].HOTEN_KH}</td>
            <td id="KH_gioitinh">${elementPage[i].G_TINH}</td>
            <td id="KH_diachi">${elementPage[i].DIA_CHI}</td>
            <td id="KH_SDT">${elementPage[i].SO_DT}</td>
            <td id="KH_CCCD">${elementPage[i].SO_CCCD}</td>
            <form action="" method="POST">
            <input type="hidden" name="MAKH_xoa" value = <?php echo $row["MA_KH"]; ?>
            <input type="hidden" name="page" value="<?php echo $_POST["page"]; ?>
            <td><input type="submit" value="xóa" class="thaotac_xoa" onclick="Delete(${elementPage[i].MA_KH})"></td></form>
            <form action="" method="POST"><td><input type="button" class="KH_sua_btn" id="thaotac_KH" value="sửa" data-index="${i}"></td>
            </form></tr>
            `;
        }
        var tbody = document.getElementById("data");
        tbody.innerHTML = html;
        
    
        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.KH_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_KH = document.getElementById('container_suaKH');
    
                form_sua_KH.querySelector('#TenKH_sua').value = elementPage[index].HOTEN_KH;
                form_sua_KH.querySelector('#SDT_KH').value = elementPage[index].SO_DT;
                form_sua_KH.querySelector('#DiaChiKH').value = elementPage[index].DIA_CHI;
                form_sua_KH.querySelector('#MAKH_sua').value = elementPage[index].MA_KH;

                form_sua_KH.style.display = 'block';
            });
        });
    }

    var form_sua_KH = document.getElementById('container_suaKH');
    form_sua_KH.addEventListener('click', function(event){
    if(event.target === form_sua_KH){
        form_sua_KH.style.display = 'none';

    }
})

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
