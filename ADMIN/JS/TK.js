// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "tai_khoan";
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

            // Sau TKi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            PhanQuyen();
            //cập nhật lại số lượng sản phẩm
            var SLTK_HT = document.querySelector('#SLTK_HT span');
var rows = document.querySelectorAll('#table_TK table tbody tr ');
SLTK_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData
   function add()
{
    if (confirm("Bạn có chắc chắn muốn tạo tài khoản không?")) {

        var NGAY_TAO = new Date();
        var TEN_TK = $('#TenTK_add').val();
        var MAT_KHAU = $('#MATKHAU_add').val();
        var MA_Q = $('#quyen').val();
    
        var tr = document.querySelectorAll('#form_TK_admin table tbody tr');
        var check_TEN_TK = true;
        for(var i=0; i<tr.length; i++){
            if(tr[i].querySelector('#TK_TenTK').innerText === TEN_TK){
                check_TEN_TK = false;
            }
        }
    
        if(TEN_TK === "" || MAT_KHAU === ""){
            alert('Vui lòng nhập đầy đủ thông tin !!');
        }
    
        else if(!check_TEN_TK){
            alert("Tên tài khoản đã tồn tại !!")
        }
        else if(!isValidString(MAT_KHAU)  || !isValidString(TEN_TK)){
            alert("Mật khẩu hoặc tên tài khoản phải tối thiểu 6 kí tự và tối đa 11 kí tự không bao gồm kí tự đặc biệt");
        }
        else{
            var data = {
                TEN_TK: TEN_TK,
                MAT_KHAU: MAT_KHAU,
                MA_Q: MA_Q,
                TINH_TRANG: "không hoạt động",
                NGAY_TAO_TK: NGAY_TAO
            };
        
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "tai_khoan";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName
                }, 
                success: function(response){
                    console.log(response);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            })
        }
    }
   }


   
   function update()
{
    if (confirm("Bạn có chắc chắn muốn đổi mật khẩu tài khoản này không?")) {

        if(!isValidString($('#MKTK_sua').val())){
            alert("Mật khẩu cần tối thiểu 6 kí tự và tối đa 11 kí tự !!");
        }
        else{
            var data = {
                MAT_KHAU: $('#MKTK_sua').val(),
              };
              var jsonData = JSON.stringify(data);
    
        var operation = "Update";
        var tableName = "tai_khoan";
        var idName = "MA_TK";
        var idValue = $('#MATK_sua').val();
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
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }
    }
}

function vohieu(MATK)
{
    if (confirm("Bạn có chắc chắn muốn vô hiệu tài khoản này không?")) {
        var data = {
            TINH_TRANG: "không hoạt động"
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "tai_khoan";
    var idName = "MA_TK";
    var idValue = MATK;
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
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
    }
}


function mo(MATK)
{
    if (confirm("Bạn có chắc chắn muốn kích hoạt tài khoản này không?")) {
        var data = {
            TINH_TRANG: "hoạt động"
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "tai_khoan";
    var idName = "MA_TK";
    var idValue = MATK;
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
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
    }
}
 
// -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        if(elementPage[i].TINH_TRANG == "hoạt động"){
            html += `
            <tr>
            <td id="TK_MATK">${elementPage[i].MA_TK}</td>
            <td id="TK_TenTK">${elementPage[i].TEN_TK}</td>
            <td id="TK_MatKhau">${elementPage[i].MAT_KHAU}</td>
            <td id="TK_NgayTao">${elementPage[i].NGAY_TAO_TK}</td>
            <td id="TK_TinhTrang">${elementPage[i].TINH_TRANG}</td>
            <td id="TK_Quyen">${elementPage[i].MA_Q}</td>
           <form action="" method="POST">
           <input type="hidden" name="MATK">
          <td class="TK_kichhoat_btn" ><input type="submit" value="vô hiệu" onclick="vohieu(${elementPage[i].MA_TK})" class="thaotac"></td>
           </form>
               <form action="" method="POST">
               <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
               <td class="TK_SUA_btn"><input type="submit" class="TK_sua_btn" id="thaotac_TK" value="Đổi mật khẩu" data-index="${i}"></td>
               </form>
           </tr>
            `;
        }
        else{
            html += `
            <tr>
            <td id="TK_MATK">${elementPage[i].MA_TK}</td>
            <td id="TK_TenTK">${elementPage[i].TEN_TK}</td>
            <td id="TK_MatKhau">${elementPage[i].MAT_KHAU}</td>
            <td id="TK_NgayTao">${elementPage[i].NGAY_TAO_TK}</td>
            <td id="TK_TinhTrang">${elementPage[i].TINH_TRANG}</td>
            <td id="TK_Quyen">${elementPage[i].MA_Q}</td>
           <form action="" method="POST">
           <input type="hidden" name="MATK">
          <td class="TK_kichhoat_btn"><input  type="submit" value="mở" onclick="mo(${elementPage[i].MA_TK})" class="thaotac"></td>
           </form>
               <form action="" method="POST">
               <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
               <td class="TK_SUA_btn"><input type="submit" class="TK_sua_btn" id="thaotac_TK" value="Đổi mật khẩu" data-index="${i}"></td>
               </form>
           </tr>
            `;
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;

            // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
            var editButtons = document.querySelectorAll('.TK_sua_btn');
            editButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    var index = this.getAttribute('data-index');
                    var form_sua_KH = document.getElementById('container_suaTK');
        
                    form_sua_KH.querySelector('#MKTK_sua').value = elementPage[index].MAT_KHAU;
                    form_sua_KH.querySelector('#MATK_sua').value = elementPage[index].MA_TK;
    
                    form_sua_KH.style.display = 'block';
                });
            });
    }


    var form_sua_TK = document.getElementById('container_suaTK');
    form_sua_TK.addEventListener('click', function(event){
    if(event.target === form_sua_TK){
        form_sua_TK.style.display = 'none';

    }
})

var form_sua_KH = document.getElementById('LS_container');
form_sua_KH.addEventListener('click', function(event){
if(event.target === form_sua_KH){
    form_sua_KH.style.display = 'none';

}
})
    
    // chức năng tìm kiếm


    document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_TK'); 
        var txt = document.getElementById('txt_timkiem_TK'); 
    
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

document.getElementById('btn_timkiem_TK').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_TK').value;
 var txt = document.getElementById('txt_timkiem_TK').value;
  var rows = document.querySelectorAll('#table_TK table tbody tr');
 
 if(opt === 'MATK'){
 
     for(var i = 0; i < rows.length; i++){
         var MATK = rows[i].querySelector('#TK_MATK').innerText;
         if(MATK.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'Tên TK'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#TK_TenTK').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Ngày tạo'){
 
 for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_NgayTao').innerText;
     if(MaTK.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Quyền') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_Quyen').innerText;
     if(MaTK.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'TinhTrang') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_TinhTrang').innerText;
     if(MaTK.includes(txt)){
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
        var table_TK = document.querySelectorAll('#table_TK tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_TK.length; i++) {
            var MATK = table_TK[i].querySelector('#TK_MATK').innerText;
            var TENTK = table_TK[i].querySelector('#TK_TenTK').innerText;
            var MK = table_TK[i].querySelector('#TK_MatKhau').innerText;
            var NGAY = table_TK[i].querySelector('#TK_NgayTao').innerText;
            var TINHTRANG = table_TK[i].querySelector('#TK_TinhTrang').innerText;
            var QUYEN = table_TK[i].querySelector('#TK_Quyen').innerText;


            var object = { MA_TK: MATK, TEN_TK: TENTK, MAT_KHAU: MK, NGAY_TAO_TK: NGAY, TINH_TRANG: TINHTRANG, MA_Q: QUYEN };
            jsonArray.push(object);

            if(window.getComputedStyle(table_TK[i]).display !== 'none'){
                var object2 = { MA_TK: MATK, TEN_TK: TENTK, MAT_KHAU: MK, NGAY_TAO_TK: NGAY, TINH_TRANG: TINHTRANG, MA_Q: QUYEN };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_TK tbody');
            var key = document.querySelector('#opt_sapxep_TK').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_TK tbody');
            var key = document.querySelector('#opt_sapxep_TK').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_TK tbody');
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
 
 //chức năng hiện thị mật khẩu
 function togglePasswordVisibility() {
    var passwordField = document.getElementById("MATKHAU_add");
    var eyeIcon = document.getElementById("eyeIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
}


function PhanQuyen(){

    function check_cn(arr_cn, chuc_nang) {
        return arr_cn.includes(chuc_nang);
    }
    

    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function(response){

            
            var arr_cn = response.array_TenChucNang;
            
            if(!check_cn(arr_cn, "Thêm Tài Khoản")){
                document.querySelector("#form_them_TK").remove();
            }


            document.querySelectorAll('.TK_SUA_btn').forEach(function(sua){
                if(!check_cn(arr_cn, "Sửa Tài Khoản")){
                    sua.remove();
                }
            })

            if(!check_cn(arr_cn, "Sửa Tài Khoản") && !check_cn(arr_cn, "Kích Hoạt Tài Khoản")){
                document.getElementById("ThaoTac").style.display = "none";
            }

            
            document.querySelectorAll('.TK_kichhoat_btn').forEach(function(xoa){
                if(!check_cn(arr_cn, "Kích Hoạt Tài Khoản")){
                    xoa.remove();
                }
            })
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}


function isValidString(input) {
    // Kiểm tra độ dài chuỗi
    if (input.length < 6 || input.length > 11) {
        return false;
    }

    // Kiểm tra ký tự đặc biệt
    var regex = /^[a-zA-Z0-9]+$/; // Chỉ chấp nhận chữ cái và số
    if (!regex.test(input)) {
        return false;
    }

    return true;
}