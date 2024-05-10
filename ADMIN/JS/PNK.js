// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 




 //loadData
 function read() {
    var operation = "Read";
    var tableName = "phieu_nhap";
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
            PhanQuyen();
            //cập nhật lại số lượng sản phẩm
            var SLPN_HT = document.querySelector('.SLPN_HT span');
            var rows = document.querySelectorAll('#table_PNK table tbody tr ');
            SLPN_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData
   function add() {
    var currentDate = new Date();
    var NGAY_NHAP = currentDate;
    var MA_NV = $("#opt_MANV_themPNK").val();
    var MA_NSX = $("#opt_MANSX_themPNK").val();
    var TRANG_THAI = "CHƯA XỬ LÝ";
    var table_CTPN = document.querySelectorAll('#data_CTSP tr');
    if(table_CTPN.length == 0){
        alert('Phiếu nhập phải có ít nhất 1 chi tiết');
    }
    else{
        var check = true;
        for (var i = 0; i < table_CTPN.length; i++) {
            var THANHTIEN_CTPN = table_CTPN[i].querySelector('#THANHTIEN_CTPN input').value;
            if(THANHTIEN_CTPN == '0'){
                check = false; break;
            }
        }
    
        if(check){
            var data = {
                NGAY_NHAP: NGAY_NHAP,
                MA_NSX: MA_NSX,
                MA_NV: MA_NV,
                TRANG_THAI: TRANG_THAI
            };
        
            var jsonData = JSON.stringify(data);
        
            var operation = "Create";
            var tableName = "phieu_nhap";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function(response) {
                    //đọc ra phiếu nhập vừa thêm
                    var newMAPN = response[response.length - 1].MA_PN;
                    var table_CTPN = document.querySelectorAll('#data_CTSP tr');
                    for (var i = 0; i < table_CTPN.length; i++) {
                        var MASP_CTPN = table_CTPN[i].querySelector('#MASP_CTPN').innerText;
                        var DONGIA_CTPN = table_CTPN[i].querySelector('#DONGIA_CTPN input').value;
                        var SL_CTPN = table_CTPN[i].querySelector('#SL_CTPN input').value;
                        var THANHTIEN_CTPN = table_CTPN[i].querySelector('#THANHTIEN_CTPN input').value;
                        var data = {
                            MA_PN: newMAPN,
                            MA_SP: MASP_CTPN,
                            DON_GIA: DONGIA_CTPN,
                            SO_LUONG: SL_CTPN,
                            THANH_TIEN: THANHTIEN_CTPN
                        };
        
                        var jsonData = JSON.stringify(data);
        
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                jsonData: jsonData,
                                operation: "Create",
                                tableName: 'chi_tiet_nhap'
                            },
                            success: function(response) {
                                console.log(response);
                            },
                            error: function(xhr, status, error) {
                                console.log(error);
                            }
                        });
                    }
                       location.reload();
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
    
        else{
            alert("chi tiết phải có số lượng và đơn giá ít nhất 1 !!");
        }
    }

    
}



function Delete(MAPN) {
    var operation = "Delete";
    var idName = "MA_PN";
    var idValue = MAPN;

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

    // Xóa chi tiết phiếu nhập
    deleteFromTable("chi_tiet_nhap", idName, idValue);

   
    // Xóa sản phẩm
    deleteFromTable("phieu_nhap", idName, idValue);
    location.reload();

}


// update số lượng sản phẩm khi xác nhận nhập phiếu

function update(MASP, SL, callback) {
    var operation = "Read";
    var tableName = "san_pham";
    var condition = "MA_SP=" + MASP;
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
            var data = {
                SO_LUONG: parseFloat(response[0].SO_LUONG) + parseFloat(SL)
            };
            var jsonData = JSON.stringify(data);
            console.log(data);
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: "Update",
                    tableName: "san_pham",
                    idName: "MA_SP",
                    idValue: MASP
                },
                success: function(response) {
                    callback(); // Gọi hàm hoàn thành khi cập nhật thành công
                },
                error: function(xhr, status, error) {
                    console.log(error);
                    callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
                }
            })
        },
        error: function(xhr, status, error) {
            console.log(error);
            callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
        }
    });
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
            
            if(!check_cn(arr_cn, "Xóa Phiếu Nhập") && !check_cn(arr_cn, "Nhập Phiếu Nhập")){
                document.querySelector("#ThaoTac").remove();
            }

            if(!check_cn(arr_cn, "Thêm Phiếu Nhập")){
                document.querySelector("#form_them_PNK").remove();
            }

            document.querySelectorAll('.btn_xoa_PN').forEach(function(xoa){
                if(!check_cn(arr_cn, "Xóa Phiếu Nhập")){
                    xoa.remove();
                }
            })

            document.querySelectorAll('.btn_nhap_PN').forEach(function(nhap){
                if(!check_cn(arr_cn, "Nhập Phiếu Nhập")){
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


   function DisplayElementPage(elementPage) {


    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        
        if (elementPage[i].TRANG_THAI === "CHƯA XỬ LÝ"){
            html += `
            <tr>
            <td id="PNK_Ma">${elementPage[i].MA_PN}</td>
            <td id="PNK_NgayNhap">${elementPage[i].NGAY_NHAP}</td>
            <td id="PNK_MaNV">${elementPage[i].MA_NV}</td>
            <td id="PNK_MaNSX">${elementPage[i].MA_NSX}</td>
            <td id="PNK_trang_thai">${elementPage[i].TRANG_THAI}</td>
           <form action="" method="POST">
           <input type="hidden" name="MAPNK_xoa" value="${elementPage[i].MA_PN}">      
          <td class="btn_xoa_PN"><input type="submit"  value="xóa"  class="thaotac" onclick="Delete(${elementPage[i].MA_PN})"></td>
           </form>
           <form action="" method="POST">
           <input type="hidden" name="MAPNK_nhap" value="${elementPage[i].MA_PN}">
          <td class="btn_nhap_PN"><input type="button" value="nhập" id="btn_nhap_PN" class="thaotac" onclick="nhap(${elementPage[i].MA_PN})"></td>
           </form>
           </tr>
            `;
        }
        else{
            html += `
            <tr>
            <td id="PNK_Ma">${elementPage[i].MA_PN}</td>
            <td id="PNK_NgayNhap">${elementPage[i].NGAY_NHAP}</td>
            <td id="PNK_MaNV">${elementPage[i].MA_NV}</td>
            <td id="PNK_MaNSX">${elementPage[i].MA_NSX}</td>
            <td id="PNK_trang_thai">${elementPage[i].TRANG_THAI}</td>
           <form action="" method="POST">
           <input type="hidden" name="MAPNK_xoa"  value="${elementPage[i].MA_PN}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td class="btn_xoa_PN"><input type="submit"  value="xóa"  class="thaotac" onclick="Delete(${elementPage[i].MA_PN})"></td>
           </form>
           <form action="" method="POST">
          <td class="btn_nhap_PN"><input style="opacity: 0.5;" type="button" value="nhập" name="btn_nhap_PN"  class="thaotac"></td>
           </form>
           </tr>
            `;
        }

    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
//chức năng tìm kiếm

document.addEventListener('DOMContentLoaded', function(){
    var opt = document.getElementById('opt_timkiem_PNK'); // Lấy thẻ select
    var txt = document.getElementById('txt_timkiem_PNK'); // Lấy thẻ select

    function toggleDateInput() {
        if(opt.value === 'Ngày nhập'){
           txt.type = 'date';
        }
        else {
            txt.type = 'number';

        }
    }
    opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
});


document.getElementById('btn_timkiem_PNK').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_PNK').value;
 var txt = document.getElementById('txt_timkiem_PNK').value;
  var rows = document.querySelectorAll('#table_PNK table tbody tr');
 
 if(opt === 'MAPNK'){
 
     for(var i = 0; i < rows.length; i++){
         var MAPNK = rows[i].querySelector('#PNK_Ma').innerText;
         if(chuyenDoiChuoi(MAPNK).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'MaNV'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#PNK_MaNV').innerText;
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MaNSX'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#PNK_MaNSX').innerText;
     if(chuyenDoiChuoi(MaNSX).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Ngày nhập') {
     for(var i = 0; i < rows.length; i++) {
         var date = new Date(convertDateFormat(rows[i].querySelector('#PNK_NgayNhap').innerText));
         var txtDate = document.getElementById('txt_timkiem_PNK').value;
 
         // So sánh ngày nhập với khoảng thời gian đã chọn
         if (date.toISOString().includes(txtDate)) {
             rows[i].style.display = 'table-row';
         } else {
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
 
 function convertDateFormat(inputDate) {
     // Tách ngày thành mảng các phần tử: [yyyy, mm, dd]
     var parts = inputDate.split('-');
     
     // Trích xuất năm, tháng và ngày
     var year = parts[0];
     var month = parts[1];
     var day = parts[2];
 
     // Tạo ngày mới với định dạng "yyyy-mm-dd"
     var newDate = year + '-' + month + '-' + day;
 
     // Trả về ngày mới
     return newDate;
 }
 //chức năng tìm kiếm


//ẩn hiện form nhập
document.querySelector('.btn_themCTPN').addEventListener('click', function(){
    document.querySelector('#container_formthemPNK').style.display = 'block';
})

document.querySelector('#btn_an_formthemCTPN').addEventListener('click', function(){
    document.querySelector('#container_formthemPNK').style.display = 'none';

})
//ẩn hiện form nhập



//hàm cho nút nhập
function nhap(MAPN) {
    var data = {
        TRANG_THAI: "ĐÃ XỬ LÝ"
    };
    var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "phieu_nhap";
    var idName = "MA_PN";
    var idValue = MAPN;

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData: jsonData,
            operation: operation,
            tableName: tableName,
            idName: idName,
            idValue: idValue
        },
        success: function(response) {
            // đọc ra các chi tiết phiếu nhập
            var operation = "Read";
            var tableName = "chi_tiet_nhap";
            var condition = "MA_PN=" + MAPN;
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
                    var updateCounter = 0;
                    var totalUpdates = response.length;
                    for (var i = 0; i < response.length; i++) {
                        update(response[i].MA_SP, response[i].SO_LUONG, function() {
                            updateCounter++;
                            if (updateCounter === totalUpdates) {
                                console.log(updateCounter);
                                location.reload();
                            }
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
        
    });
}
//hàm cho nút nhập



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
        var table_PNK = document.querySelectorAll('#table_PNK tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_PNK.length; i++) {
            var MAPN = table_PNK[i].querySelector('#PNK_Ma').innerText;
            var NGAYNHAP = table_PNK[i].querySelector('#PNK_NgayNhap').innerText;
            var MANV = table_PNK[i].querySelector('#PNK_MaNV').innerText;
            var MANSX = table_PNK[i].querySelector('#PNK_MaNSX').innerText;
            var TRANG_THAI = table_PNK[i].querySelector('#PNK_trang_thai').innerText;

            var object = { MA_PN: MAPN, NGAY_NHAP: NGAYNHAP, MA_NV: MANV, TRANG_THAI: TRANG_THAI, MA_NSX: MANSX };
            jsonArray.push(object);

            if(window.getComputedStyle(table_PNK[i]).display !== 'none'){
                var object2 = { MA_PN: MAPN, NGAY_NHAP: NGAYNHAP, MA_NV: MANV, TRANG_THAI: TRANG_THAI, MA_NSX: MANSX };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PNK tbody');
            var key = document.querySelector('#opt_sapxep_PNK').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PNK tbody');
            var key = document.querySelector('#opt_sapxep_PNK').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PNK tbody');
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

  

 //Lê Ngọc Anh Huy -> lengocanhhuy
 function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}
