
//chức năng ẩn hiện form sửa


    document.addEventListener('click', function(){
        var form_sua_SP = document.getElementById('container_suaSP');
        if(event.target === form_sua_SP){
            form_sua_SP.style.display = 'none';
        }

    })
        //chức năng ẩn hiện form sửa


        //chức năng của form thêm
var opt = document.querySelector('#opt_themCH');
var form = document.querySelector('#form_add_SP');

var section_CHDT =  document.querySelector('#CTN_CHDT');
var section_CHTN =  document.querySelector('#CTN_CHTN');
var section_CHS =  document.querySelector('#CTN_CHS');
var section_CHOL =  document.querySelector('#CTN_CHOL');

document.addEventListener('DOMContentLoaded', function(){
    opt.addEventListener('change',function(){
        if(opt.value == '1'){
        section_CHDT.style.display = 'block';
        form.style.height = '590px';
        section_CHTN.style.display = 'none';
        section_CHS.style.display = 'none';
        section_CHOL.style.display = 'none';
    }
    else if(opt.value == '3'){
        section_CHDT.style.display = 'none';
        section_CHTN.style.display = 'none';
        form.style.height = '330px';
        section_CHS.style.display = 'block';
        section_CHOL.style.display = 'none';
    }
   else if(opt.value == '2'){
        section_CHDT.style.display = 'none';
        form.style.height = '260px';
        section_CHTN.style.display = 'block';
        section_CHS.style.display = 'none';
        section_CHOL.style.display = 'none';
    }
    else if(opt.value == '4'){
        section_CHDT.style.display = 'none';
        section_CHTN.style.display = 'none';
        section_CHS.style.display = 'none';
        form.style.height = '260px';
        section_CHOL.style.display = 'block';
    }
    });
});



document.addEventListener('DOMContentLoaded', function(event){
    var container = document.getElementById('container_themSP');

    container.addEventListener('click', function(event) {
        if (event.target === container) {
            container.style.display = "none";
        }
    });
})
//chức năng của form thêm

function add()
{
        var loai = $("#opt_loai").val();
        var MANSX = $("#opt_MANSX").val();
        var Ten_SP = $("#TenSP_add").val();
        var Gia = $("#GIA_SP_add").val();
        var fileInput = $('#ANH_SP_add')[0]; 

    var filePath = $('#ANH_SP_add').val();
    var ANH = filePath.split('\\').pop();
    var files = fileInput.files;
            
    if(files.length === 0 || Ten_SP === "" || Gia === ""){
        alert("Hãy nhập đầy đủ thông tin !!");
    }
    else{
        var data = {
            MA_LOAI: loai,
            MA_NSX: MANSX,
            TEN_SP: Ten_SP,
            GIA_BAN: Gia + "$",
            HINH_ANH: ANH,
            SO_LUONG: 1
          };

          var jsonData = JSON.stringify(data);
    
var operation = "Create";
var tableName = "san_pham";
$.ajax({
    url: '../AJAX_PHP/CRUD.php',
    type: 'POST',
    dataType: 'json',
    data: {
        jsonData : jsonData,
        operation: operation,
        tableName: tableName
    },
    success: function(response) {
        console.log(response);
    },
    error: function(xhr, status, error) {
        console.log(error);
    }
});
}
    }


    function add_CHSP()
{ 
    
        var loai = $("#opt_themCH").val();

    if(loai === "1"){
        if($("#RAM_them").val() !== "" && $("#BNT_them").val() !== "" && $("#MH_them").val() !== "" && $("#MS_them").val() !== "" && $("#PIN_them").val() !== "" && $("#CAMTRC_them").val() !== "" && $("#CAMSAU_them").val() !== ""){
            var data = {
                MA_SP: $("#MaSP_them").val(),
                RAM: $("#RAM_them").val() + "gb",
                BO_NHO_TRONG: $("#BNT_them").val() + "gb",
                MAN_HINH: $("#MH_them").val(),
                MAU_SAC: $("#MS_them").val(),
                PIN: $("#PIN_them").val() + "Mah",
                CAMERA_TRUOC: $("#CAMTRC_them").val() + "px",
                CAMERA_SAU: $("#CAMSAU_them").val() + "px"
            };
            
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "cau_hinh_dien_thoai";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
                else{
            alert("Hãy nhập đầy đủ thông tin !!");
        }
      
    }

    else if(loai === "2"){
        if($("#KNTN_them").val() !== "" && $("#TNTN_them").val() !== ""){
            var data = {
                MA_SP: $("#MaSP_them").val(),
                KET_NOI: $("#KNTN_them").val(),
                TINH_NANG: $("#TNTN_them").val(),
            };
            
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "cau_hinh_tai_nghe";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
        else{
            alert("Hãy nhập đầy đủ thông tin !!");
        }
    }


    else if(loai === "3"){
        if($("#CHSKN_them").val() !== "" && $("#CsS_them").val() !== "" && $("#CHSTN_them").val() !== ""){
            var data = {
                MA_SP: $("#MaSP_them").val(),
                KET_NOI: $("#KNTN_them").val(),
                CONG_SUAT: $("#CsS_them").val() + "W",
                TINH_NANG: $("#CHSTN_them").val()
            };
            
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "cau_hinh_sac";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
        else{
            alert("Hãy nhập đầy đủ thông tin !!");
        }
    }

    else if(loai === "4"){
        if($("#CLOL_them").val() !== "" && $("#TNOL_them").val() !== ""){
            var data = {
                MA_SP: $("#MaSP_them").val(),
                CHAT_LIEU: $("#CLOL_them").val(),
                TINH_NANG: $("#TNOL_them").val()
            };
            
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "cau_hinh_oplung";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
        else{
            alert("Hãy nhập đầy đủ thông tin !!");
        }
    }
}
    

function update()
{
    var TenSP = $('#TenSP_sua').val();
    var Gia = $('#Gia_SP').val();
    var fileInput = $('#AnhSP')[0]; 
// Lấy giá trị của phần tử input loại file bằng jQuery
var filePath = $('#AnhSP').val();

// Tách phần cuối của đường dẫn file (tức là tên file) bằng cách chia chuỗi bằng dấu gạch chéo (/)
var file = filePath.split('\\').pop();
    var files = fileInput.files;
    var MASP = $('#MASP_sua').val();

    if (files.length !== 0) {
        var data = {
            TEN_SP: TenSP,
            GIA_BAN: Gia,
            HINH_ANH: file
          };
    }
    else{
        var data = {
            TEN_SP: TenSP,
            GIA_BAN: Gia,
            HINH_ANH: $('#anh_su').val()
          };
}
    var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "san_pham";
    var idName = "MA_SP";
    var idValue = MASP;
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

function Delete(MASP)
{
    location.reload();
    var operation = "Delete";
    var tableName = "san_pham";
    var idName = "MA_SP";
    var idValue = MASP;
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

}


  // chức năng tìm kiếm
  document.getElementById('btn_timkiem_SP').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_SP').value;
 var txt = document.getElementById('txt_timkiem_SP').value;
  var rows = document.querySelectorAll('#table_SP table tbody tr');
 
 if(opt === 'MASP'){
 
     for(var i = 0; i < rows.length; i++){
         var MASP = rows[i].querySelector('#SP_MASP').innerText;
         if(MASP.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'Loại'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#SP_MALOAI').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MA_SP'){
 
 for(var i = 0; i < rows.length; i++){
     var MaSP = rows[i].querySelector('#SP_MASP').innerText;
     if(MaSP.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Tên_SP') {
     for(var i = 0; i < rows.length; i++){
     var MaSP = rows[i].querySelector('#SP_TEN').innerText;
     if(MaSP.includes(txt)){
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


 //loadData
 var MASP_check = [];
 if(!localStorage.getItem('MASP_check')){
    var jsonMyArray = JSON.stringify(MASP_check);
    localStorage.setItem('MASP_check', jsonMyArray);
}
 function DisplayElementPage(elementPage) {
    var ulContainer = document.querySelector("#table_SP table tbody");

    for (var i = 0; i < elementPage.length; i++) {
        var tr = document.createElement('tr');
        var p = "<?php echo $_POST['page'];?>";
        var content = '<tr><td id="SP_MASP">'+ elementPage[i].MA_SP+'</td><td id="SP_MALOAI">'+elementPage[i].MA_LOAI+'</td><td id="SP_MANSX">'+elementPage[i].MA_NSX+'</td><td id="SP_TEN">'+elementPage[i].TEN_SP+'</td><td id="SP_GIA">'+elementPage[i].GIA_BAN+'</td><td id="SP_ANH"><img src="../Img/'+elementPage[i].HINH_ANH+'" alt="##" style="height: 50px;"></td><td id="SP_SL">'+elementPage[i].SO_LUONG +'</td> <form action="" method="POST" id="dieukien_xoa"><input type="hidden" name="page" value="'+p+'"><input type="hidden" name="MASP_xoa" value="'+elementPage[i].MA_SP+'"><td><input type="submit" name="SP_xoa_btn" class="thaotac SP_xoa_btn" value="xóa" onclick="Delete('+elementPage[i].MA_SP+')"></td></form><form action="" method="POST" id="dieukien_sua"><td><input type="button" id="SP_sua_btn" class="thaotac" value="sửa"></td></form></form> <form action="" method="POST" id="dieukien_themCH"><td><input type="button" id="SP_themCH_btn" class="thaotac" value="Thêm CH"></td></form></tr>';
        var content1 = '<tr><td id="SP_MASP">'+ elementPage[i].MA_SP+'</td><td id="SP_MALOAI">'+elementPage[i].MA_LOAI+'</td><td id="SP_MANSX">'+elementPage[i].MA_NSX+'</td><td id="SP_TEN">'+elementPage[i].TEN_SP+'</td><td id="SP_GIA">'+elementPage[i].GIA_BAN+'</td><td id="SP_ANH"><img src="../Img/'+elementPage[i].HINH_ANH+'" alt="##" style="height: 50px;"></td><td id="SP_SL">'+elementPage[i].SO_LUONG +'</td> <form action="" method="POST" id="dieukien_xoa"><input type="hidden" name="page" value="'+p+'"><input type="hidden" name="MASP_xoa" value="'+elementPage[i].MA_SP+'"><td id="xxx"><input type="submit" name="SP_xoa_btn" class="thaotac SP_xoa_btn" value="xóa" onclick="Delete('+elementPage[i].MA_SP+')"></td></form><form action="" method="POST" id="dieukien_sua"><td><input type="button" id="SP_sua_btn" class="thaotac" value="sửa"></td></form></form></tr>';

        var MASP_check = JSON.parse(localStorage.getItem('MASP_check'));
        var count = false;
        for(var j = 0; j < MASP_check.length; j++) {
            if(elementPage[i].MA_SP === MASP_check[j]){
                tr.innerHTML = content1;
                ulContainer.append(tr);
                tr.querySelector("#xxx").colSpan = "2";
                count = true;
                break;
            }
        }
        if(!count){
            tr.innerHTML = content;
            ulContainer.append(tr);   
             // Gán sự kiện cho nút thêm cấu hình mới tạo
        tr.querySelector('#SP_themCH_btn').addEventListener('click', function(){
            var form_them_SP = document.getElementById('container_themSP')
            var tr = this.parentElement.parentElement;
            var MASP_check = JSON.parse(localStorage.getItem('MASP_check'));
        

            MASP_check.push(tr.querySelector('#SP_MASP').innerText);
            var jsonMyArray = JSON.stringify(MASP_check);
            //lưu tất cả nút vào local
            localStorage.setItem('MASP_check', jsonMyArray);

            form_them_SP.style.display = 'block';
        });
        }

        // Gán sự kiện cho nút sửa mới tạo
        tr.querySelector('#SP_sua_btn').addEventListener('click', function(){
            var form_sua_SP = document.getElementById('container_suaSP')
            var tr = this.parentElement.parentElement;
            
            form_sua_SP.querySelector('#TenSP_sua').value = tr.querySelector('#SP_TEN').innerText;
            form_sua_SP.querySelector('#Gia_SP').value = tr.querySelector('#SP_GIA').innerText;
            form_sua_SP.querySelector('#MASP_sua').value = tr.querySelector('#SP_MASP').innerText;
            form_sua_SP.querySelector('#anh_su').value = tr.querySelector('#SP_ANH img').src.split("http://localhost/PhoneShop/Img/")[1];
            
            form_sua_SP.style.display = 'block';
        });


    }
 }

  

  function read(callback) {
    var operation = "Read";
    var tableName = "san_pham";
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
            // Gọi hàm callback với dữ liệu nhận được
            callback(response);
            // Sau khi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            var SLSP_HT = document.querySelector('#SLSP_HT span');
var rows = document.querySelectorAll('#table_SP table tbody tr ');
SLSP_HT.innerText = rows.length;

        },
        error: function(xhr, status, error) {
            console.log(error);
            // Gọi hàm callback với null để biểu thị lỗi
            callback(null);
        }
    });
}

// Gọi hàm read để lấy dữ liệu từ API
read(function(data) {
    if (data) {
        // Xử lý dữ liệu ở đây nếu có
        console.log(data);
        // Chuyển đổi dữ liệu JSON thành chuỗi JSON
        var jsonString = JSON.stringify(data);
        console.log(jsonString);
        // Trả về chuỗi JSON
        return jsonString;
    } else {
        // Xử lý lỗi nếu có
        console.log("Có lỗi xảy ra khi đọc dữ liệu từ API.");
        return null;
    }
});

   //loadData