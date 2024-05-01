// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "chi_tiet_hoadon";
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

            // Sau CTHDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLCTHD_HT = document.querySelector('#SLCTHD_HT span');
var rows = document.querySelectorAll('#table_CTHD table tbody tr ');
SLCTHD_HT.innerText = rows.length;
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
        <td id="MAHD">${elementPage[i].MA_HD}</td>
        <td id="MASP">${elementPage[i].MA_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien">${changePriceToString(elementPage[i].THANH_TIEN)}</td>
        <td id="ThueSuat"><span>${elementPage[i].THUE_SUAT}</span>%</td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_CTHD').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_CTHD').value;
        var txt = document.getElementById('txt_timkiem_CTHD').value;
        var rows = document.querySelectorAll('#table_CTHD table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MACTHD'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MACTHD = rows[i].querySelector('#MAHD').innerText;
        
                    if(MACTHD.includes(txt)){
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
                        var MaCTHD = rows[i].querySelector('#MASP').innerText;
                        if(MaCTHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'Số lượng'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaCTHD = rows[i].querySelector('#SL').innerText;
                        if(MaCTHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'Thành tiền'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaCTHD = rows[i].querySelector('#ThanhTien span').innerText;
        if(MaCTHD.includes(txt)){
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
        var table_CTHD = document.querySelectorAll('#table_CTHD tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_CTHD.length; i++) {
            var MAHD = table_CTHD[i].querySelector('#MAHD').innerText;
            var MASP = table_CTHD[i].querySelector('#MASP').innerText;
            var SL = table_CTHD[i].querySelector('#SL').innerText;
            var THANH_TIEN = changePriceToNormal(table_CTHD[i].querySelector('#ThanhTien').innerText);
            var THUESUAT = table_CTHD[i].querySelector('#ThueSuat').innerText.split('%')[0];

            var object = { MA_HD: MAHD, MA_SP: MASP, SL_BAN: SL, THUE_SUAT: THUESUAT, THANH_TIEN: THANH_TIEN };
            jsonArray.push(object);

            if(window.getComputedStyle(table_CTHD[i]).display !== 'none'){
                var object2 = { MA_HD: MAHD, MA_SP: MASP, SL_BAN: SL, THUE_SUAT: THUESUAT, THANH_TIEN: THANH_TIEN };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTHD tbody');
            var key = document.querySelector('#opt_sapxep_CTHD').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTHD tbody');
            var key = document.querySelector('#opt_sapxep_CTHD').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTHD tbody');
            tbody.innerHTML = '';
         DisplayElementPage(jsonArray);
         jsonArray2 = [...jsonArray];

        });

    }

  //chức năng sắp xếp


    
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