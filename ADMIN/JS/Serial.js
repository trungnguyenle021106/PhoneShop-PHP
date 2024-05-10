// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "serial";
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
        success: function(responseSerial) {
            
            // Sau NVi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(responseSerial);
            PhanQuyen();
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
function readSapXep(t) {
    var thuTuSapXep = t;
    var cotSapXep = document.getElementById("opt_sapxep_Serial").value;
    var tbody = document.getElementById("data");
    tbody.innerHTML=''
    $.ajax({
        url: '../AJAX_PHP/xuLiSapXep.php',
        type: 'POST',
        dataType: 'json',
        data: {
            thuTuSapXep: thuTuSapXep,
            cotSapXep: cotSapXep,
            bangSapXep: "serial"
        },
        success: function(responseSerial) {
            
            // Sau NVi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(responseSerial);

            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData
    function check(){
        var operation = "Read";
        var tableName = "serial";
        var condition = "SERIAL_NUMBER = '" + $('#SO_SERIAL_sua_SERIAL').val() + "'";
        var hasResponse = false; // Biến cục bộ để lưu trạng thái
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                condition: condition
            },
            success: function(responseSerial) {
                if (responseSerial && responseSerial.length > 0) {
                    // Nếu có response trả về và có dữ liệu trong response
                    hasResponse = true;
                }
            },
           
            error: function(xhr, status, error) {
                console.log(error);
            },
            async: false // Đặt async thành false để chờ AJAX hoàn thành trước khi trả về giá trị từ hàm check()
        });
    
        return hasResponse; // Trả về giá trị của biến hasResponse
    }

   function update()
{   
    var divWarning = document.getElementById('warning');
    if(check()){
        
        divWarning.innerText = "Số serial đã tồn tại!"
    }
    else if($('#SO_SERIAL_sua_SERIAL').val().trim().length === 0){
        divWarning.innerText = "Vui lòng nhập đầy đủ thông tin!"
    }
    else if(confirm("Bạn chắc chắn muốn sửa không?") == true) {
        var serialNumber = loaiBoKhoangTrang($('#SO_SERIAL_sua_SERIAL').val())
        var data = {
            SERIAL_NUMBER: serialNumber,
            };
        var jsonData = JSON.stringify(data);
        console.log(jsonData)
        var operation = "Update";
        var tableName = "serial";
        var idName = "MA_SERIAL";
        var idValue = $('#MASERIAL_sua_hidden').val();
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



function Delete(maSerial) {
    if (confirm("Bạn chắc chắn muốn xóa không?") == true) {
        var operation = "Delete";
        var tableName = "serial";
        var idName = "MA_SERIAL";
        var idValue = maSerial;
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

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //

    // function DisplayElementPage(elementPage) {
        
    //     for (var i = 0; i < elementPage.length; i++) {
    //         let maSerial = elementPage[i].MA_SERIAL
    //         let soSerial = elementPage[i].SERIAL_NUMBER
    //         let maSP = elementPage[i].MA_SP
    //         let t = i;
            
    //         $.ajax({
    //             url: '../AJAX_PHP/CRUD.php',
    //             type: 'POST',
    //             dataType: 'json',
    //             data: {
    //                 operation: "Read",
    //                 tableName: "san_pham",
    //                 condition: "MA_SP=" + maSP,
    //             },
    //             success: function(response) {
    //                 console.log(response)
    //                 console.log(t)
    //                 addRowToTable(maSerial,soSerial,response,t);
    //             },
    //             error: function(xhr, status, error) {
    //                 console.log(error);
    //             }
    //         });
            
    //     }

        
    // }
    function DisplayElementPage(elementPage) {
        // Tạo một mảng các Promise cho từng yêu cầu AJAX
        let promises = elementPage.map(item => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '../AJAX_PHP/CRUD.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        operation: "Read",
                        tableName: "san_pham",
                        condition: "MA_SP=" + item.MA_SP,
                    },
                    success: function(response) {
                        resolve(response); // Giải quyết Promise khi AJAX thành công
                    },
                    error: function(xhr, status, error) {
                        reject(error); // Reject Promise nếu có lỗi AJAX
                    }
                });
            });
        });
    
        // Sử dụng Promise.all để chờ tất cả các yêu cầu AJAX hoàn thành
        Promise.all(promises)
        .then(results => {
            // Khi tất cả các yêu cầu AJAX đã hoàn thành
            results.forEach((response, index) => {
                let maSerial = elementPage[index].MA_SERIAL;
                let soSerial = elementPage[index].SERIAL_NUMBER;
                addRowToTable(maSerial, soSerial, response, index);
            });
        })
        .catch(error => {
            console.log(error); // Xử lý lỗi nếu có
        });
    }
    function addRowToTable(maSerial,soSerial,response,t) {
        console.log(maSerial)
        console.log(t)
        console.log(response)
        
        var html = "";
        var rowHtml = `<tr>
            <td id="Serial_MASERIAL">${maSerial}</td>
            <td id="Serial_SO_SERIAL">${soSerial}</td>
            <td id="Serial_TEN_SP">${response[0].TEN_SP}</td>
            <td id="Serial_HINH_ANH_SP"><img src="../Img/${response[0].HINH_ANH}" alt="##" style="height: 50px;"></td>
            <td><input type="button" value="xóa" class="thaotac" onclick="Delete(${maSerial})"></td>
            <td><input type="button" class="Serial_sua_btn" name="sua${t}" id="thaotac_Serial" value="sửa" data-index="${t}"></td>
        </tr>`;
        html += rowHtml;
        var tbody = document.getElementById("data");
        tbody.insertAdjacentHTML("beforeend", html);
        //cập nhật lại số lượng serial
        var SLSerial_HT = document.querySelector('#SLSerial_HT span');
            
        var rows = document.querySelectorAll('#table_Serial table tbody tr ');
        SLSerial_HT.innerText = rows.length;
        //cập nhật lại số lượng serial
        var editButton = document.querySelector(`input[name="sua${t}"]`);
        //gán sự kiện cho nút sửa
        editButton.addEventListener('click', function() {
                // var index = this.getAttribute('data-index');
                var form_sua_Serial = document.getElementById('suaSerial_container');
        
                form_sua_Serial.querySelector('#SO_SERIAL_sua_SERIAL').value = soSerial;
                form_sua_Serial.querySelector('#MASERIAL_sua_hidden').value = maSerial;
                form_sua_Serial.style.display = 'block';
            });
        //gán sự kiện cho nút sửa

    }
    //chức năng ẩn form sửa
document.addEventListener('click', function(event){
    var form_sua_Serial = document.getElementById('suaSerial_container');
    if(event.target === form_sua_Serial){
        form_sua_Serial.style.display = 'none';
    }

})
//chức năng ẩn form sửa

//chức năng tìm kiếm
document.getElementById('btn_timkiem_Serial').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_Serial').value;
 var txt = document.getElementById('txt_timkiem_Serial').value;
  var rows = document.querySelectorAll('#table_Serial table tbody tr');
 
 if(opt === 'MA_SERIAL'){
 
     for(var i = 0; i < rows.length; i++){
         var MA_SERIAL = rows[i].querySelector('#Serial_MASERIAL').innerText;
         if(MA_SERIAL.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'SERIAL_NUMBER'){
 
 for(var i = 0; i < rows.length; i++){
     var SERIAL_NUMBER = rows[i].querySelector('#Serial_SO_SERIAL').innerText;
     if(chuyenDoiChuoi(SERIAL_NUMBER).includes(chuyenDoiChuoi(txt))){
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
function loaiBoKhoangTrang(chuoi) {
    return chuoi.replace(/\s/g, '');
}


function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");


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
            if(!check_cn(arr_cn, "Sửa Serial")){
                document.querySelector("#ThaoTac").remove();
            }

            document.querySelectorAll('.Serial_sua_btn').forEach(function(sua){
                if(!check_cn(arr_cn, "Sửa Serial")){
                    sua.remove();
                }
            })
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}