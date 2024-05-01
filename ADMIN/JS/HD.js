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
            display_sort();
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
        <td id="HD_MaNV">${elementPage[i].MA_NV}</td>
        <td id="HD_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="HD_NgayTao">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TongTien">${changePriceToString(elementPage[i].TONG_TIEN)}</td>
        <form action="" method="POST"><input type="hidden" name="MAHD"><td><input type="button" value="xóa" class="thaotac"></td></form> 
        <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" id="HD_sua_btn" class="thaotac" value="sửa"></td></form>
        </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

     //chức năng tìm kiếm

     document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_HD'); // Lấy thẻ select
        var txt = document.getElementById('txt_timkiem_HD'); // Lấy thẻ select
    
        function toggleDateInput() {
            if(opt.value === 'Ngày tạo'){
               txt.type = 'date';
            }
            else {
                txt.type = 'text';
    
            }
        }
        opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
    });

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
        var table_HD = document.querySelectorAll('#table_HD tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_HD.length; i++) {
            var MAHD = table_HD[i].querySelector('#HD_Ma').innerText;
            var MAKM = table_HD[i].querySelector('#HD_MaKM').innerText;
            var MANV = table_HD[i].querySelector('#HD_MaNV').innerText;
            var MAKH = table_HD[i].querySelector('#HD_MaKH').innerText;
            var TINH_TRANG = table_HD[i].querySelector('#HD_TinhTrang').innerText;
            var NGAY_TAO = table_HD[i].querySelector('#HD_NgayTao').innerText;
            var TONG_TIEN = changePriceToNormal(table_HD[i].querySelector('#HD_TongTien').innerText);

            var object = { MA_HD: MAHD, MA_KM: MAKM, NGAY_TAO: NGAY_TAO, TINH_TRANG: TINH_TRANG, MA_NV: MANV, MA_KH: MAKH, TONG_TIEN: TONG_TIEN };
            jsonArray.push(object);

            if(window.getComputedStyle(table_HD[i]).display !== 'none'){
                var object2 = { MA_HD: MAHD, MA_KM: MAKM, NGAY_TAO: NGAY_TAO, TINH_TRANG: TINH_TRANG, MA_NV: MANV, MA_KH: MAKH, TONG_TIEN: TONG_TIEN };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_HD tbody');
            var key = document.querySelector('#opt_sapxep_HD').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_HD tbody');
            var key = document.querySelector('#opt_sapxep_HD').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_HD tbody');
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


     //hàm xử lí tiền
 //1000000  -> 1.000.000 đ
function changePriceToString(price) {
    var s = "";
    var temp = 0;
    var flag = 0;
    var amountDot = Math.round(price.length / 3);

    if (price.length % 3 == 0) {
        amountDot--;
    }
    for (var i = price.length - 1; i >= 0; i--) {
        temp++;
        if (temp == 3 && flag < amountDot) {
            s = s + price[i] + ".";
            flag++;
            temp = 0;
        }
        else {
            s = s + price[i];
        }
    }
    return s.split("").reverse().join("") + "đ";
}

//1.000.000 đ -> 1000000
function changePriceToNormal(price)
{
    return price.replace(/\D/g, "");
}