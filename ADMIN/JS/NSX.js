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
   function add() {
        var divWarning = document.getElementById('warning_FormThem');
        var tenNSX = $('#TenNSX_add').val().trim()
        var diaChiNSX = $('#DiaChiNSX_add').val().trim()
        var SDTNSX = $('#SDT_NSX_add').val().trim()
        var emailNSX = $('#EmailNSX_add').val().trim()
        if (tenNSX.length === 0 || diaChiNSX.length === 0 ||SDTNSX.length === 0 ||emailNSX.length === 0 ){
            divWarning.innerText = "Vui lòng nhập đầy đủ thông tin!"
        }
        else if(validateEmail(emailNSX) == false){
            divWarning.innerText = "Vui lòng nhập đúng email!"
        }
        else if(validatePhoneNumber(SDTNSX) == false){
            divWarning.innerText = "Vui lòng nhập đúng số điện thoại có 10 số!"
        }
        else if(confirm("Bạn chắc chắn muốn thêm không?") == true) {
            var data = {
                TEN_NSX : tenNSX,
                DIA_CHI: diaChiNSX,
                SO_DT: SDTNSX,
                EMAIL:  emailNSX
            };
            var jsonData = JSON.stringify(data);
            var operation = "Create";
            var tableName = "nha_sx";
            var condition ="";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName,
                    condition: condition
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        location.reload();
        }

        
    }
    function Delete(maNSX) {
        if (confirm("Bạn chắc chắn muốn xóa không?") == true) {
            var operation = "Delete";
            var tableName = "nha_sx";
            var idName = "MA_NSX";
            var idValue = maNSX;
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
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
            location.reload();
          } 
       
    
    
    }
    function update(){
        var divWarning = document.getElementById('warning');

        var maNSX = $('#MANSX_sua').val().trim()
        var tenNSX = $('#TenNSX_sua').val().trim()
        var diaChiNSX = $('#DiaChiNSX').val().trim()
        var SDTNSX = $('#SDT_NSX').val().trim()
        var emailNSX = $('#EmailNSX').val().trim()
        if (tenNSX.length === 0 || diaChiNSX.length === 0 ||SDTNSX.length === 0 ||emailNSX.length === 0 ){
            divWarning.innerText = "Vui lòng nhập đầy đủ thông tin!"
        }
        else if(validateEmail(emailNSX) == false){
            divWarning.innerText = "Vui lòng nhập đúng email!"
        }
        else if(validatePhoneNumber(SDTNSX) == false){
            divWarning.innerText = "Vui lòng nhập đúng số điện thoại có 10 số!"
        }
        else if(confirm("Bạn chắc chắn muốn sửa không?") == true) {
            var data = {
                TEN_NSX: tenNSX,
                DIA_CHI: diaChiNSX,
                SO_DT: SDTNSX,
                EMAIL: emailNSX
                };
            var jsonData = JSON.stringify(data);
            var operation = "Update";
            var tableName = "nha_sx";
            var idName = "MA_NSX";
            var idValue = maNSX;
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
            location.reload();
        }
    }
    function validateEmail(email) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    function validatePhoneNumber(phoneNumber) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    }
    function readSapXep(t) {
        var thuTuSapXep = t;
        var cotSapXep = document.getElementById("opt_sapxep_NSX").value;
        var tbody = document.getElementById("data");
        tbody.innerHTML=''
        $.ajax({
            url: '../AJAX_PHP/xuLiSapXep.php',
            type: 'POST',
            dataType: 'json',
            data: {
                thuTuSapXep: thuTuSapXep,
                cotSapXep: cotSapXep,
                bangSapXep: "nha_sx"
            },
            success: function(responseSerial) {
                
                DisplayElementPage(responseSerial);
    
                
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

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
      
      <td><input type="button" value="sửa" class="thaotac thaotac_Sua" id="NSX_sua_btn" name="NSX_sua_btn" data-index="${i}"></td>

       </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.thaotac_Sua');
    editButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var index = this.getAttribute('data-index');
        var form_sua_NSX = document.getElementById('container_suaNSX');
        form_sua_NSX.querySelector('#TenNSX_sua').value = elementPage[index].TEN_NSX;
        form_sua_NSX.querySelector('#DiaChiNSX').value = elementPage[index].DIA_CHI;
        form_sua_NSX.querySelector('#SDT_NSX').value = elementPage[index].SO_DT;
        form_sua_NSX.querySelector('#EmailNSX').value = elementPage[index].EMAIL;
        form_sua_NSX.querySelector('#MANSX_sua').value = elementPage[index].MA_NSX;

        form_sua_NSX.style.display = 'block';
    });
    if (searchChucNang("Sửa Nhà Sản Xuất") == false){
        button.disabled = true;
    }
    
    var formThem = document.getElementById('form_them_NSX');
    if (searchChucNang("Thêm Nhà Sản Xuất") == false){
    formThem.style.display = 'none';
    
}
    
});
    // var deleteButtons = document.querySelectorAll('.thaotac_Xoa');
    // deleteButtons.forEach(function (btn) {
    //     if (searchChucNang("Xóa Nhà Sản Xuất") == false){
    //         btn.disabled = true;
    //     }
    // });
    }


        //chức năng ẩn form sửa
document.addEventListener('click', function(event){
    var form_sua_NSX = document.getElementById('container_suaNSX');
    if(event.target === form_sua_NSX){
        form_sua_NSX.style.display = 'none';
    }

})
//chức năng ẩn form sửa
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
     var tenNSX = rows[i].querySelector('#Ten_NSX').innerText;
     if(chuyenDoiChuoi(tenNSX).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'SDT'){
 
 for(var i = 0; i < rows.length; i++){
     var SDT = rows[i].querySelector('#NSX_SDT').innerText;
     if(chuyenDoiChuoi(SDT).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Địa chỉ') {
     for(var i = 0; i < rows.length; i++){
     var diaChi = rows[i].querySelector('#NSX_Diachi').innerText;
     if(chuyenDoiChuoi(diaChi).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Email') {
     for(var i = 0; i < rows.length; i++){
     var email = rows[i].querySelector('#NSX_Email').innerText;
     if(chuyenDoiChuoi(email).includes(chuyenDoiChuoi(txt))){
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
 function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}