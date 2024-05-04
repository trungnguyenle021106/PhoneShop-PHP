// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "phieu_bao_hanh";
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

            // Sau PBHi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLPBH_HT = document.querySelector('#SLPBH_HT span');
var rows = document.querySelectorAll('#table_PBH table tbody tr ');
SLPBH_HT.innerText = rows.length;
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
        <tr>
        <td id="PBH_MAPBH">${elementPage[i].MA_PBH}</td>
        <td id="PBH_SERIAL">${elementPage[i].MA_SERIAL}</td>
        <td id="PBH_MAKH">${elementPage[i].MA_KH}</td>
        <td id="PBH_start_day">${elementPage[i].NGAY_BAT_DAU}</td>
        <td id="PBH_end_day">${elementPage[i].NGAY_HET_HAN}</td>
        <td id="PBH_thoigian">${elementPage[i].THOI_GIAN_BAOHANH}</td>
           <form action="" method="POST">
           <td><input type="button" id="PBH_sua_btn" class="thaotac" value="sửa"></td>
           </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

 //chức năng tìm kiếm
    // var khoang = document.querySelector('.khoang');
    document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_PBH'); // Lấy thẻ select
    
        function toggleDateInput() {
            if(opt.value === 'time_start' || opt.value === 'time_end'){
                // khoang.style.display = 'block';
                // document.getElementById('txt_timkiem_PBH').style.display = 'none';
                document.getElementById('txt_timkiem_PBH').type = 'date';
            }
            else {
                // khoang.style.display = 'none';
                // document.getElementById('txt_timkiem_PBH').style.display = 'block';
                document.getElementById('txt_timkiem_PBH').type = 'number';
            }
        }
        opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
    });
    document.getElementById('btn_timkiem_PBH').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_PBH').value;
        var txt = document.getElementById('txt_timkiem_PBH').value;
        var rows = document.querySelectorAll('#table_PBH table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAPBH'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MAPBH = rows[i].querySelector('#PBH_MAPBH').innerText;
        
                    if(MAPBH === txt){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'MAKH'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaNV = rows[i].querySelector('#PBH_MAKH').innerText;
                        if(MaNV.indexOf(txt) !== -1){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'SERIAL'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaNV = rows[i].querySelector('#PBH_SERIAL').innerText;
                        if(MaNV.indexOf(txt) !== -1){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'time_start'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#PBH_start_day').innerText;
        if(MaNV.indexOf(txt) !== -1){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'time_end'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#PBH_end_day').innerText;
        if(MaNV.indexOf(txt) !== -1){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
}
display_sort();
    });
    //chức năng tìm kiếm

    
  //chức năng sắp xếp

    // Hàm so sánh tăng dần
    function sortByKey_tang(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            
            // Kiểm tra xem x có phải là một số hoặc có đúng định dạng yyyy-mm-dd không
            var xType = checkType(x);
            var yType = checkType(y);
            
            if (xType === 1 && yType === 1) {
                return x - y; // Sắp xếp theo số
            } else if (xType === 2 && yType === 2) {
                // Chuyển đổi x và y thành đối tượng Date để so sánh
                var dateX = new Date(x);
                var dateY = new Date(y);
                return dateX - dateY; // Sắp xếp theo thời gian
            } else {
                // So sánh bình thường
                if (x < y) return -1;
                if (x > y) return 1;
                return 0;
            }
        });
    }
    

        // Hàm so sánh giảm dần
        function sortByKey_giam(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                
                // Kiểm tra xem x có phải là một số hoặc có đúng định dạng yyyy-mm-dd không
                var xType = checkType(x);
                var yType = checkType(y);
                
                if (xType === 1 && yType === 1) {
                    return y - x; // Sắp xếp số giảm dần
                } else if (xType === 2 && yType === 2) {
                    // Chuyển đổi x và y thành đối tượng Date để so sánh
                    var dateX = new Date(x);
                    var dateY = new Date(y);
                    return dateY - dateX; // Sắp xếp thời gian giảm dần
                } else {
                    // So sánh chuỗi giảm dần
                    if (x > y) return -1;
                    if (x < y) return 1;
                    return 0;
                }
            });
        }
        


    function display_sort() {
        var table_PBH = document.querySelectorAll('#table_PBH tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_PBH.length; i++) {
            var MAPBH = table_PBH[i].querySelector('#PBH_MAPBH').innerText;
            var SERIAL = table_PBH[i].querySelector('#PBH_SERIAL').innerText;
            var MAKH = table_PBH[i].querySelector('#PBH_MAKH').innerText;
            var start_day = table_PBH[i].querySelector('#PBH_start_day').innerText;
            var end_day = table_PBH[i].querySelector('#PBH_end_day').innerText;
            var time = table_PBH[i].querySelector('#PBH_thoigian').innerText;

            var object = { MA_PBH: MAPBH, MA_KH: MAKH, MA_SERIAL: SERIAL, NGAY_BAT_DAU: start_day, NGAY_HET_HAN: end_day, THOI_GIAN_BAOHANH: time };
            jsonArray.push(object);

            if(window.getComputedStyle(table_PBH[i]).display !== 'none'){
                var object2 = { MA_PBH: MAPBH, MA_KH: MAKH, MA_SERIAL: SERIAL, NGAY_BAT_DAU: start_day, NGAY_HET_HAN: end_day, THOI_GIAN_BAOHANH: time };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PBH tbody');
            var key = document.querySelector('#opt_sapxep_PBH').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PBH tbody');
            var key = document.querySelector('#opt_sapxep_PBH').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PBH tbody');
            tbody.innerHTML = '';
         DisplayElementPage(jsonArray);
         jsonArray2 = [...jsonArray];

        });

    }

  //chức năng sắp xếp
    

    //hàm kiểm tra xem chuỗi là số hay chuỗi kí tự
    function checkType(input) {
        // Kiểm tra xem input có phải là số không
        if (!isNaN(input)) {
            return 1;
        }
        // Kiểm tra xem input có đúng định dạng yyyy-mm-dd không
        else if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
            return 2; // Trả về 2 để phân biệt với trường hợp là số
        }
        // Trường hợp còn lại
        else {
            return 0;
        }
    }