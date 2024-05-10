// Gọi hàm read để lấy dữ liệu 
read();

// Gọi hàm read để lấy dữ liệu 




    function add_CHSP()
{ 
    if (confirm("Bạn có chắc chắn muốn thêm không?")) {
    
//thêm sản phẩm trước
var loai = $("#opt_loai").val();
var MANSX = $("#opt_MANSX").val();
var Ten_SP = $("#TenSP_add").val();
var Gia = $("#GIA_SP_add").val();

var filePath = $('#ANH_SP_add').val();
var ANH = filePath.split('\\').pop();

var data = {
    MA_LOAI: loai,
    MA_NSX: MANSX,
    TEN_SP: Ten_SP,
    GIA_BAN: Gia,
    HINH_ANH: ANH,
    SO_LUONG: 1
  };
  var jsonData = JSON.stringify(data);
  console.log(jsonData);
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
var loai = $("#opt_loai").val();
if(loai === "1"){
    if($("#RAM_them").val() !== "" && $("#BNT_them").val() !== "" && $("#MH_them").val() !== "" && $("#MS_them").val() !== "" && $("#PIN_them").val() !== "" && $("#CAMTRC_them").val() !== "" && $("#CAMSAU_them").val() !== "" && $("#OS_them").val() !== ""){
    
        var data = {
            MA_SP: response[response.length-1].MA_SP,
            RAM: $("#RAM_them").val() + "GB",
            BO_NHO_TRONG: $("#BNT_them").val() + "GB",
            MAN_HINH: $("#MH_them").val(),
            MAU_SAC: $("#MS_them").val(),
            PIN: $("#PIN_them").val() + "Mah",
            CAMERA_TRUOC: $("#CAMTRC_them").val() + "px",
            CAMERA_SAU: $("#CAMSAU_them").val() + "px",
            OS: $("#OS_them").val()
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
        location.reload();   

    }
            else{
        alert("Hãy nhập đầy đủ thông tin !!");
    }
  
}

else if(loai === "3"){
    if($("#KNTN_them").val() !== "" && $("#TNTN_them").val() !== ""){

        var data = {
            MA_SP: response[response.length-1].MA_SP,
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
        location.reload();   

    }
    else{
        alert("Hãy nhập đầy đủ thông tin !!");
    }
}


else if(loai === "5"){
    if($("#CHSKN_them").val() !== "" && $("#CsS_them").val() !== "" && $("#CHSTN_them").val() !== ""){
      

        var data = {
            MA_SP: response[response.length-1].MA_SP,       
            KET_NOI: $("#CHSKN_them").val(),
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
        location.reload();   

    }
    else{
        alert("Hãy nhập đầy đủ thông tin !!");
    }
}

else if(loai === "4"){
    if($("#CLOL_them").val() !== "" && $("#TNOL_them").val() !== ""){

        var data = {
            MA_SP: response[response.length-1].MA_SP,
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
     location.reload();   
    }
    else{
        alert("Hãy nhập đầy đủ thông tin !!");
    }
}
},
error: function(xhr, status, error) {
console.log(error);
}
});
    } 
}
    
function update()
{

    if (confirm("Bạn có chắc chắn muốn sửa không?")) {
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
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }
}

function Delete(MASP) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        var operation = "Delete";
        var idName = "MA_SP";
        var idValue = MASP;
    
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
    
        // Xóa cấu hình tai nghe
        deleteFromTable("cau_hinh_tai_nghe", idName, idValue);
    
        // // Xóa cấu hình điện thoại
        deleteFromTable("cau_hinh_dien_thoai", idName, idValue);
    
        // // Xóa cấu hình sạc
        deleteFromTable("cau_hinh_sac", idName, idValue);
    
        // // Xóa cấu hình ốp lưng
        deleteFromTable("cau_hinh_oplung", idName, idValue);
    
        // // Xóa chi tiết hóa đơn
        deleteFromTable("chi_tiet_hoadon", idName, idValue);
    
        // // Xóa chi tiết nhập
        deleteFromTable("chi_tiet_nhap", idName, idValue);
    
        // Đọc mã serial và xóa phiếu bảo hành và mã serial
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: "Read",
                tableName: "serial",
                condition: "MA_SP=" + MASP,
            },
            success: function(response) {
                    // Xóa phiếu bảo hành
                    for(var i = 0; i < response.length; i++){
                        deleteFromTable("phieu_bao_hanh", "MA_SERIAL", response[i].MA_SERIAL);
                    }
                    // Xóa mã serial
                    deleteFromTable("serial", "MA_SP", MASP);
                
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    
        // Xóa sản phẩm
        deleteFromTable("san_pham", idName, idValue);
        location.reload();
    
    
    }
}

                
                
  
 //loadData
  function read() {
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

            // Sau khi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            PhanQuyen();
            //cập nhật lại số lượng sản phẩm
            var SLSP_HT = document.querySelector('#SLSP_HT span');
var rows = document.querySelectorAll('#table_SP table tbody tr ');
SLSP_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData



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
            
            if(!check_cn(arr_cn, "Xóa Sản Phẩm") && !check_cn(arr_cn, "Sửa Sản Phẩm")){
                document.querySelector("#ThaoTac").remove();
            }

            if(!check_cn(arr_cn, "Thêm Sản Phẩm")){
                document.querySelector("#form_them_SP").remove();
            }

            document.querySelectorAll('.SP_XOA_btn').forEach(function(xoa){
                if(!check_cn(arr_cn, "Xóa Sản Phẩm")){
                    xoa.remove();
                }
            })

            document.querySelectorAll('.SP_SUA_btn').forEach(function(nhap){
                if(!check_cn(arr_cn, "Sửa Sản Phẩm")){
                    nhap.remove();
                }
            })
            
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   
  //hàm hiển thị dữ liệu

  function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        var ten_loai;
        if(elementPage[i].MA_LOAI == 1){
            ten_loai = "Điện thoại";
        }
        else if(elementPage[i].MA_LOAI == 3){
            ten_loai = "Tai nghe";
        }
        else if(elementPage[i].MA_LOAI == 4){
            ten_loai = "Ốp lưng";
        }
        else if(elementPage[i].MA_LOAI == 5){
            ten_loai = "Sạc";
        }
        else{
            ten_loai = elementPage[i].MA_LOAI;
        }

        html += `<tr>
        <td id="SP_MASP">${elementPage[i].MA_SP}</td>
        <td id="SP_MALOAI">${ten_loai}</td>
        <td id="SP_MANSX">${elementPage[i].MA_NSX}</td>
        <td id="SP_TEN">${elementPage[i].TEN_SP}</td>
        <td id="SP_GIA">${changePriceToString(elementPage[i].GIA_BAN)}</td>
        <td id="SP_ANH"><img src="../Img/${elementPage[i].HINH_ANH}" alt="##" style="height: 50px;"></td>
        <td id="SP_SL">${elementPage[i].SO_LUONG}</td> 
        <form action="" method="POST" id="dieukien_xoa">
        <input type="hidden" name="page" value="page">
        <input type="hidden" name="MASP_xoa" value="${elementPage[i].MA_SP}">
        <td id="xxx" class="SP_XOA_btn"><input type="submit" class="thaotac" value="xóa" onclick="Delete(${elementPage[i].MA_SP})"></td></form>
        <form action="" method="POST" id="dieukien_sua"><td class="SP_SUA_btn"><input type="button" class="SP_sua_btn" id="thaotac_SP" value="sửa" data-index="${i}"></td></form></form>
        </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    

    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.SP_sua_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_SP = document.getElementById('container_suaSP');

            form_sua_SP.querySelector('#TenSP_sua').value = elementPage[index].TEN_SP;
            form_sua_SP.querySelector('#Gia_SP').value = changePriceToNormal(elementPage[index].GIA_BAN);
            form_sua_SP.querySelector('#MASP_sua').value = elementPage[index].MA_SP;
            form_sua_SP.querySelector('#anh_su').value = elementPage[index].HINH_ANH;

            form_sua_SP.style.display = 'block';
        });
    });
}


//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_SP = document.getElementById('container_suaSP');
    if(event.target === form_sua_SP){
        form_sua_SP.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa


    //chức năng của form thêm cấu hình
var opt = document.querySelector('#opt_loai');
var form = document.querySelector('#form_add_SP');

var section_CHDT =  document.querySelector('#CTN_CHDT');
var section_CHTN =  document.querySelector('#CTN_CHTN');
var section_CHS =  document.querySelector('#CTN_CHS');
var section_CHOL =  document.querySelector('#CTN_CHOL');
 

document.addEventListener('DOMContentLoaded', function(){
opt.addEventListener('change',function(){
    if(opt.value == '1'){
    section_CHDT.style.display = 'block';
    form.style.height = '660px';
    section_CHTN.style.display = 'none';
    section_CHS.style.display = 'none';
    section_CHOL.style.display = 'none';
}
else if(opt.value == '5'){
    section_CHDT.style.display = 'none';
    section_CHTN.style.display = 'none';
    form.style.height = '330px';
    section_CHS.style.display = 'block';
    section_CHOL.style.display = 'none';
}
else if(opt.value == '3'){
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


//chức năng ẩn form thêm cấu hình
document.addEventListener('DOMContentLoaded', function(event){
var container = document.getElementById('container_themSP');

container.addEventListener('click', function(event) {
    if (event.target === container) {
        container.style.display = "none";
    }
});
})
//chức năng ẩn form thêm cấu hình


//hiện form thêm cấu hình
document.querySelector('.btn_themSP').addEventListener('click', function(event){
    event.preventDefault();
    var Ten_SP = $("#TenSP_add").val();
    var Gia = $("#GIA_SP_add").val();
    var fileInput = $('#ANH_SP_add')[0]; 
    var files = fileInput.files;
        
if(files.length === 0 || Ten_SP === "" || Gia === ""){
    alert("Hãy nhập đầy đủ thông tin !!");
}
else{
    document.getElementById('container_themSP').style.display = "block";

}
})
//hiện form thêm cấu hình


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
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MA_NSX'){
 
 for(var i = 0; i < rows.length; i++){
     var MaSP = rows[i].querySelector('#SP_MANSX').innerText;
     if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
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
     if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
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
            if(checkType(x) == 1){ return x - y; }
            else{ 
                if (x > y) return -1;
                if (x < y) return 1;
                return 0;
            }
        });
    }

        // Hàm so sánh tăng dần
        function sortByKey_giam(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                if(checkType(x) == 1){ return y - x; }
                else{ 
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                }
            });
        }


    function display_sort() {
        var table_SP = document.querySelectorAll('#table_SP tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_SP.length; i++) {
            var MASP = table_SP[i].querySelector('#SP_MASP').innerText;
            var loai = table_SP[i].querySelector('#SP_MALOAI').innerText;
            var Ten = table_SP[i].querySelector('#SP_TEN').innerText;
            var GIA = changePriceToNormal(table_SP[i].querySelector('#SP_GIA').innerText);
            var SL = table_SP[i].querySelector('#SP_SL').innerText;
            var ANH = table_SP[i].querySelector('#SP_ANH img').src.split('http://localhost/PhoneShop/Img/')[1];
            var MANSX = table_SP[i].querySelector('#SP_MANSX').innerText;
    
            var object = { MA_SP: MASP, MA_LOAI: loai, TEN_SP: Ten, GIA_BAN: GIA, SO_LUONG: SL, HINH_ANH: ANH, MA_NSX: MANSX };
            if(window.getComputedStyle(table_SP[i]).display !== 'none'){
                var object2 = { MA_SP: MASP, MA_LOAI: loai, TEN_SP: Ten, GIA_BAN: GIA, SO_LUONG: SL, HINH_ANH: ANH, MA_NSX: MANSX };
                jsonArray2.push(object2);
            }
            jsonArray.push(object);
        }

    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_SP tbody');
            var key = document.querySelector('#opt_sapxep_SP').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_SP tbody');
            var key = document.querySelector('#opt_sapxep_SP').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_SP tbody');
            tbody.innerHTML = '';
         DisplayElementPage(jsonArray);
         jsonArray2 = [...jsonArray];
                });
    }

  //chức năng sắp xếp


//hàm kiểm tra xem chuỗi là số hay chuỗi kí tự
  function checkType(input) {
    if (!isNaN(input)) {
       return 1;
    } else {
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

//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}



