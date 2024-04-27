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
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td><input type="submit" value="xóa" name="btn_xoa_PN" class="thaotac" onclick="Delete(${elementPage[i].MA_PN})"></td>
           </form>
           <form action="" method="POST">
           <input type="hidden" name="MAPNK_nhap" value="${elementPage[i].MA_PN}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td><input type="submit" value="nhập" name="btn_nhap_PN" id="btn_nhap_PN" class="thaotac" onclick="nhap(${elementPage[i].MA_PN})"></td>
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
           <input type="hidden" name="MAPNK_xoa" value="${elementPage[i].MA_PN}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td colspan="2"><input type="submit" value="xóa" name="btn_xoa_PN" class="thaotac" onclick="Delete(${elementPage[i].MA_PN})"></td>
           </form>
           </tr>
            `;
        }

    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
//chức năng tìm kiếm
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


 //Lê Ngọc Anh Huy -> lengocanhhuy
 function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}
