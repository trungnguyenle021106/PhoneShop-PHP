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
    else if(!isValidString(MAT_KHAU)){
        alert("Mật khẩu phải tối thiểu 6 kí tự và tối đa 11 kí tự không bao gồm kí tự đặc biệt");
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
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    }
   }
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        if(elementPage[i].MA_Q == 1){

        }
        html += `
        <tr>
        <td id="TK_MATK">${elementPage[i].MA_TK}</td>
        <td id="TK_TenTK">${elementPage[i].TEN_TK}</td>
        <td id="TK_MatTKau">${elementPage[i].MAT_KHAU}</td>
        <td id="TK_NgayTao">${elementPage[i].NGAY_TAO_TK}</td>
        <td id="TK_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="TK_Quyen">${elementPage[i].MA_Q}</td>
       <form action="" method="POST">
       <input type="hidden" name="MATK">
      <td><input type="button" value="xóa" class="thaotac"></td>
       </form>
           <form action="" method="POST">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
           <td><input type="submit" id="TK_sua_btn" class="thaotac" value="sửa"></td>
           </form>
           <form action="" method="POST">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
           <td><input type="submit" id="TK_sua_btn" class="thaotac" value="lịch sử"></td>
           </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }



    
    // chức năng tìm kiếm
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
 })
 
 //chức năng tìm kiếm

 
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