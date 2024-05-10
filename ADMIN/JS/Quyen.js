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
            display_sort();
            PhanQuyen();
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
               <td class="SUA_Quyen_btn"><input type="submit" class="sua_Quyen_btn" id="thaotac_Quyen" value="sửa" data-index1="${i}"></td>
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

 display_sort();
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
            

            if(!check_cn(arr_cn, "Sửa Quyền")){
                document.querySelector("#ThaoTac").remove();
            }

            if(!check_cn(arr_cn, "Thêm Quyền")){
                document.querySelector("#form_them_Quyen").remove();
            }


            document.querySelectorAll('.SUA_Quyen_btn').forEach(function(sua){
                if(!check_cn(arr_cn, "Sửa Quyền")){
                    sua.remove();
                }
            })

        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}


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
        var table_Quyen = document.querySelectorAll('#table_Quyen tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_Quyen.length; i++) {
            var MA_Q = table_Quyen[i].querySelector('#Quyen_MAQuyen').innerText;
            var TEN_Q = table_Quyen[i].querySelector('#Quyen_TenQuyen').innerText;

            var object = { MA_Q: MA_Q, TEN_Q: TEN_Q };
            jsonArray.push(object);

            if(window.getComputedStyle(table_Quyen[i]).display !== 'none'){
                var object2 = { MA_Q: MA_Q, TEN_Q: TEN_Q };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_Quyen tbody');
            var key = document.querySelector('#opt_sapxep_Quyen').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_Quyen tbody');
            var key = document.querySelector('#opt_sapxep_Quyen').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_Quyen tbody');
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


// tìm khiếm chức năng trong form sửa
document.querySelector('#txt_chucnang').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là "Enter"
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
        searchCN_sua(); // Gọi hàm tìm kiếm
    }
});

document.querySelector('#txt_chucnang_right').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là "Enter"
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
        searchCN_sua(); // Gọi hàm tìm kiếm
    }
});

// Hàm tìm kiếm chức năng
function searchCN_sua() {
    var txt = document.querySelector('#container_suaCN #left-form #txt_chucnang').value.trim();
    var txt_right = document.querySelector('#container_suaCN #right-form #txt_chucnang_right').value.trim();

    var tr = document.querySelectorAll('#container_suaCN #left-form table tr');
    var tr_right = document.querySelectorAll('#container_suaCN #right-form table tr');

    if (txt === '') {
        for (var i = 0; i < tr.length; i++) {
            tr[i].style.display = 'table-row';
        }
    } else {
        for (var i = 0; i < tr.length; i++) {
            var tenCN = tr[i].querySelector('#Ten_CN_sua_left').textContent.trim();
            if (chuyenDoiChuoi(tenCN).includes(chuyenDoiChuoi(txt))) {
                tr[i].style.display = 'table-row';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }

    if (txt_right === '') {
        for (var i = 0; i < tr_right.length; i++) {
            tr_right[i].style.display = 'table-row';
        }
    } else {
        for (var i = 0; i < tr_right.length; i++) {
            var tenCN = tr_right[i].querySelector('#TEN_CN_da_sua').textContent.trim();
            if (chuyenDoiChuoi(tenCN).includes(chuyenDoiChuoi(txt_right))) {
                tr_right[i].style.display = 'table-row';
            } else {
                tr_right[i].style.display = 'none';
            }
        }
    }
}



// tìm khiếm chức năng trong form cấp
document.querySelector('#txt_chucnang_cap').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là "Enter"
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
        searchCN_cap(); // Gọi hàm tìm kiếm
    }
});
document.querySelector('#txt_chucnang_cap_right').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là "Enter"
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
        searchCN_cap(); // Gọi hàm tìm kiếm
    }
});

// Hàm tìm kiếm chức năng
function searchCN_cap() {
    var txt = document.querySelector('#container_capCN #left-form #txt_chucnang_cap').value.trim();
    var txt_right = document.querySelector('#container_capCN #right-form #txt_chucnang_cap_right').value.trim();

    var tr = document.querySelectorAll('#container_capCN #left-form table tr');
    var tr_right = document.querySelectorAll('#container_capCN #right-form table tr');

    if (txt === '') {
        for (var i = 0; i < tr.length; i++) {
            tr[i].style.display = 'table-row';
        }
    } else {
        for (var i = 0; i < tr.length; i++) {
            var tenCN = tr[i].querySelector('#Ten_CN').textContent.trim();
            if (chuyenDoiChuoi(tenCN).includes(chuyenDoiChuoi(txt))) {
                tr[i].style.display = 'table-row';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }

    if (txt_right === '') {
        for (var i = 0; i < tr_right.length; i++) {
            tr_right[i].style.display = 'table-row';
        }
    } else {
        for (var i = 0; i < tr_right.length; i++) {
            var tenCN = tr_right[i].querySelector('#TEN_CN_da_them').textContent.trim();
            if (chuyenDoiChuoi(tenCN).includes(chuyenDoiChuoi(txt_right))) {
                tr_right[i].style.display = 'table-row';
            } else {
                tr_right[i].style.display = 'none';
            }
        }
    }
}



//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}