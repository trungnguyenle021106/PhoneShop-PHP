// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "quyen";
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

            // Sau Quyeni nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLQuyen_HT = document.querySelector('#SLQuyen_HT span');
var rows = document.querySelectorAll('#table_Quyen table tbody tr ');
SLQuyen_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData


   function add() {
    // Tạo quyền trước
    var data = { TEN_Q: $('#TenQuyen_add').val() };
    var jsonData = JSON.stringify(data);
    var operation = "Create";
    var tableName = "quyen";
    var tr_right = document.querySelectorAll('#form_cap_CN #right-form table tr');
    if (tr_right.length === 0) {
        alert("Hãy chọn chức năng của quyền");
    }
    else {
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
            // Tạo chức năng cho quyền
                for (var i = 0; i < tr_right.length; i++) {
                    var data = {
                        MA_Q: response[response.length - 1].MA_Q,
                        MA_CN: tr_right[i].querySelector("input").value
                    };
                    var jsonData = JSON.stringify(data);
                    var operation = "Create";
                    var tableName = "ctq_chuc_nang";
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
                            location.reload();                        
                        },
                        error: function(xhr, status, error) {
                            console.log(error);
                        }
                    });
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
    var operation = "Delete";
    var idName = "MA_Q";
    var idValue = $('#MAQ_sua').val();

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: 'ctq_chuc_nang',
            idName: idName,
            idValue: idValue
        },
        success: function(response) {
           
            var tbody_right = document.querySelectorAll('#data_chucnang_sua tr');
            if(tbody_right.length == 0) {
                alert('Hãy chọn chức năng cho quyền này !!');
            }
            else{
                for(var i=0; i<tbody_right.length; i++) {

                    var data = {
                         MA_Q: $('#MAQ_sua').val(),
                         MA_CN:  tbody_right[i].querySelector('input').value
                        };
                    var jsonData = JSON.stringify(data);
                    var operation = "Create";
                    var tableName = "ctq_chuc_nang";  
                    $.ajax({
                        url: '../AJAX_PHP/CRUD.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            jsonData: jsonData,
                            operation: operation,
                            tableName: tableName
                        },
                        success: function(data) {
                           location.reload();
                        },
                        error: function(xhr, status, error) {
                            console.log(error);
                        }                    
                    })
                }
            }
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
            <td id="Quyen_MAQuyen">${elementPage[i].MA_Q}</td>
            <td id="Quyen_TenQuyen">${elementPage[i].TEN_Q}</td>
               <form action="" method="POST">
               <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
               <td><input type="submit" class="sua_Quyen_btn" id="thaotac_Quyen" value="sửa" data-index1="${i}"></td>
               </form>
           </tr>
            `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;


// Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
var editButtons = document.querySelectorAll('.sua_Quyen_btn');
editButtons.forEach(function(button) {

    button.addEventListener('click', function() {
        //reset lại dữ liệu ở cột right
        var tbody_right = document.querySelector('#data_chucnang_sua');
        tbody_right.innerHTML = "";
        // Lấy giá trị của thuộc tính data-ma-tk từ nút được nhấn
        var index = this.getAttribute('data-index1');
       var MA_Q_btn_temp = elementPage[index].MA_Q;

       //lấy thông tin mã quyền cần sửa
       document.querySelector('#MAQ_sua').value = MA_Q_btn_temp;
                 
               var operation = "Read";
               var tableName = "ctq_chuc_nang";

               $.ajax({
                   url: '../AJAX_PHP/CRUD.php',
                   type: 'POST',
                   dataType: 'json',
                   data: {
            operation: operation,
            tableName: tableName,
            condition: "MA_Q=" + MA_Q_btn_temp
                   }, 
                   success: function(response){

                 for(var i=0; i<response.length; i++){
                    var operation = "Read";
                    var tableName = "chuc_nang";

                    $.ajax({
                        url: '../AJAX_PHP/CRUD.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                 operation: operation,
                 tableName: tableName,
                 condition: "MA_CN=" + response[i].MA_CN
                        },
                        
                        success: function(response){
                            var newRow = document.createElement('tr');
                            newRow.innerHTML = `
                                <td id="TEN_CN_da_sua" style="padding: 3px; width: 80%;">${response[0].TEN_CN}</td>
                                <td style="border: none;"><button class="xoa_CN_sua">Xóa</button></td>
                                <input type="hidden" value="${response[0].MA_CN}">
                            `;
                            var tbody_right = document.querySelector('#data_chucnang_sua');
                            tbody_right.appendChild(newRow);
                
                            // Thêm sự kiện cho nút xóa vừa thêm
                            var xoa_btn = newRow.querySelector('.xoa_CN_sua');
                            xoa_btn.addEventListener('click', function(event) {
                                event.preventDefault();
                                newRow.remove();
                            });
                        },
                        error: function(xhr, status, error) {
                            console.log(error);
                        }
                    })
                }
                    },
                   error: function(xhr, status, error) {
                       console.log(error);
                   }
               })
           
          
        document.querySelector('#container_suaCN').style.display = 'block';
    });
});

//ẩn hiện form sửa chức năng
    }

    document.addEventListener('click', function(event){
        if(event.target === document.querySelector('#container_suaCN')){
            document.querySelector('#container_suaCN').style.display = "none";
        }
    })
    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_Quyen').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_Quyen').value;
 var txt = document.getElementById('txt_timkiem_Quyen').value;
  var rows = document.querySelectorAll('#table_Quyen table tbody tr');
 
 if(opt === 'Tên_Quyen'){
 
     for(var i = 0; i < rows.length; i++){
         var MAQuyen = rows[i].querySelector('#Quyen_TenQuyen').innerText;
         if(chuyenDoiChuoi(MAQuyen).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'MAQ'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#Quyen_MAQuyen').innerText;
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
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

//ẩn hiện form cấp chức năng
document.querySelector('.btn_themQuyen').addEventListener('click', function(event){
    event.preventDefault();
    var ten = document.querySelector('#TenQuyen_add').value;
    if(ten === ''){
        alert("Hãy nhập tên của quyền");
    }
    else{
        document.querySelector('#container_capCN').style.display = 'block';
    }
})

document.addEventListener('click', function(event){
    if(event.target === document.querySelector('#container_capCN')){
        document.querySelector('#container_capCN').style.display = "none";
    }
})
//ẩn hiện form cấp chức năng
 

//hiệu ứng của form cấp chức năng

var tr_left = document.querySelectorAll('#form_cap_CN #left-form table tr');

tr_left.forEach(function(tr) {
    tr.addEventListener('click', function() {
        var tr_right = document.querySelectorAll('#form_cap_CN #right-form table tr');
        var check = true;
        for (var i = 0; i < tr_right.length; i++) {
            if (tr_right[i].querySelector('#TEN_CN_da_them').innerText === tr.querySelector('#Ten_CN').innerText) {
                check = false;
                break;
            }
        }

        if (check) {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td id="TEN_CN_da_them" style="padding: 3px; width: 80%;">${tr.querySelector('#Ten_CN').innerText}</td>
                <td style="border: none;"><button class="xoa_CN">Xóa</button></td>
                <input type="hidden" value="${tr.querySelector('input').value}">
            `;
            var tbody_right = document.querySelector('#data_chucnang_them');
            tbody_right.appendChild(newRow);

            // Thêm sự kiện cho nút xóa vừa thêm
            var xoa_btn = newRow.querySelector('.xoa_CN');
            xoa_btn.addEventListener('click', function(event) {
                event.preventDefault();
                newRow.remove();
            });
        } else {
            alert('Bạn đã chọn chức năng này rồi !!');
        }
    });
});


//hiệu ứng của form cấp chức năng




 

//hiệu ứng của form sửa chức năng

var tr_left = document.querySelectorAll('#form_sua_CN #left-form table tr');

tr_left.forEach(function(tr) {
    tr.addEventListener('click', function() {
        var tr_right = document.querySelectorAll('#form_sua_CN #right-form table tr');
        var check = true;
        for (var i = 0; i < tr_right.length; i++) {
            if (tr_right[i].querySelector('#TEN_CN_da_sua').innerText === tr.querySelector('#Ten_CN_sua_left').innerText) {
                check = false;
                break;
            }
        }

        if (check) {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td id="TEN_CN_da_sua" style="padding: 3px; width: 80%;">${tr.querySelector('#Ten_CN_sua_left').innerText}</td>
                <td style="border: none;"><button class="xoa_CN_sua">Xóa</button></td>
                <input type="hidden" value="${tr.querySelector('input').value}">
            `;
            var tbody_right = document.querySelector('#data_chucnang_sua');
            tbody_right.appendChild(newRow);

                          // Thêm sự kiện cho nút xóa vừa thêm
                          var xoa_btn = newRow.querySelector('.xoa_CN_sua');
                          xoa_btn.addEventListener('click', function(event) {
                              event.preventDefault();
                              newRow.remove();
                          });
        } else {
            alert('Bạn đã chọn chức năng này rồi !!');
        }
    });
});


//hiệu ứng của form sửa chức năng



//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}