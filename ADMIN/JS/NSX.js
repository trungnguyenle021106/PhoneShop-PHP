// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "nha_sx";
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

            // Sau NSXi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLNSX_HT = document.querySelector('#SLNSX_HT span');
var rows = document.querySelectorAll('#table_NSX table tbody tr ');
SLNSX_HT.innerText = rows.length;
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
        <td id="NSX_Ma">${elementPage[i].MA_NSX}</td>
        <td id="Ten_NSX">${elementPage[i].TEN_NSX}</td>
        <td id="NSX_SDT">${elementPage[i].SO_DT}</td>
        <td id="NSX_Diachi">${elementPage[i].DIA_CHI}</td>
        <td id="NSX_Email">${elementPage[i].EMAIL}</td>
       <form action="" method="POST">
       <input type="hidden" name="MANSX" value="${elementPage[i].MA_NSX}">
       <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
      <td><input type="submit" value="xóa" class="thaotac" name="btn_xoa_NSX"></td>
      <td><input type="button" value="sửa" class="thaotac" id="NSX_sửa_btn" name="NSX_sửa_btn"></td>

       </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
    // chức năng tìm kiếm


document.getElementById('btn_timkiem_NSX').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_NSX').value;
 var txt = document.getElementById('txt_timkiem_NSX').value;
  var rows = document.querySelectorAll('#table_NSX table tbody tr');
 
 if(opt === 'MANSX'){
 
     for(var i = 0; i < rows.length; i++){
         var MANSX = rows[i].querySelector('#NSX_Ma').innerText;
         if(MANSX.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'Tên NSX'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#Ten_NSX').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'SDT'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_SDT').innerText;
     if(MaNSX.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Địa chỉ') {
     for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_Diachi').innerText;
     if(MaNSX.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Email') {
     for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_Email').innerText;
     if(MaNSX.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else{
     for(var i = 0; i < rows.length; i++) {
       rows[i].style.display = 'table-row';
     }
 }

 display_sort();
 })
 
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
        var table_NSX = document.querySelectorAll('#table_NSX tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_NSX.length; i++) {
            var MANSX = table_NSX[i].querySelector('#NSX_Ma').innerText;
            var TEN = table_NSX[i].querySelector('#Ten_NSX').innerText;
            var SDT = table_NSX[i].querySelector('#NSX_SDT').innerText;
            var DIACHI = table_NSX[i].querySelector('#NSX_Diachi').innerText;
            var EMAIL = table_NSX[i].querySelector('#NSX_Email').innerText;

            var object = { MA_NSX: MANSX, TEN_NSX: TEN, DIA_CHI: DIACHI, SO_DT: SDT, EMAIL: EMAIL };
            jsonArray.push(object);

            if(window.getComputedStyle(table_NSX[i]).display !== 'none'){
                var object2 = { MA_NSX: MANSX, TEN_NSX: TEN, DIA_CHI: DIACHI, SO_DT: SDT, EMAIL: EMAIL };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_NSX tbody');
            var key = document.querySelector('#opt_sapxep_NSX').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_NSX tbody');
            var key = document.querySelector('#opt_sapxep_NSX').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_NSX tbody');
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