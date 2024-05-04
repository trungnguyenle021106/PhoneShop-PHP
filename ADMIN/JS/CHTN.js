// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "cau_hinh_tai_nghe";
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

            // Sau khi nhận được dữ liệu, gọi hàm displayElementPage
            displayElementPage(response);
            display_sort_giam_dan();
            display_sort_tang_dan();
            PhanQuyen();

            //cập nhật lại số lượng sản phẩm
            var SLTN_HT = document.querySelector('#SLCHTN_HT span');
var rows = document.querySelectorAll('#table_CHTN table tbody tr ');
SLTN_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData


   function update()
{

        var data = {
            KET_NOI: $('#KN_CHTN_sua').val(),
            TINH_NANG: $('#TN_CHTN_sua').val(),
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "cau_hinh_tai_nghe";
    var idName = "MA_CHTN";
    var idValue = $('#MACHTN_sua').val();
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

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //

   function displayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="CHTN_MACHTN" style="display: none";>${elementPage[i].MA_CHTN}</td>
        <td id="CHTN_SP">${elementPage[i].MA_SP}</td>
        <td id="CHTN_KN">${elementPage[i].KET_NOI}</td>
        <td id="CHTN_TN">${elementPage[i].TINH_NANG}</td>
        <form action="" method="POST">
        <td class="CHTN_SUA_btn"><input type="button" class="CHTN_sua_btn" id="thaotac_CHTN" value="sửa" data-index="${i}"></td>
        </form></tr>
        `;
    }
        var tbody = document.getElementById("data");
        tbody.innerHTML = html;
    

        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.CHTN_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_CHTN = document.getElementById('container_suaCHTN');
    
                form_sua_CHTN.querySelector('#KN_CHTN_sua').value = elementPage[index].KET_NOI;
                form_sua_CHTN.querySelector('#TN_CHTN_sua').value = elementPage[index].TINH_NANG;
                form_sua_CHTN.querySelector('#MACHTN_sua').value = elementPage[index].MA_CHTN;
    
                form_sua_CHTN.style.display = 'block';
            });
        });
}        


//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_CHTN = document.getElementById('container_suaCHTN');
    if(event.target === form_sua_CHTN){
        form_sua_CHTN.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa




    // chức năng tìm kiếm
    document.getElementById('btn_timkiem_CHTN').addEventListener('click', function(event){
        event.preventDefault();
     var opt = document.getElementById('opt_timkiem_CHTN').value;
     var txt = document.getElementById('txt_timkiem_CHTN').value;
      var rows = document.querySelectorAll('#table_CHTN table tbody tr');
     
     if(opt === 'MACHTN'){
     
         for(var i = 0; i < rows.length; i++){
             var MACHTN = rows[i].querySelector('#CHTN_MACHTN').innerText;
             if(chuyenDoiChuoi(MACHTN).includes(chuyenDoiChuoi(txt))){
                rows[i].style.display = 'table-row';
             }
             else{ 
                 rows[i].style.display = 'none';
              }
         }
     }
     
     
     else if(opt === 'MACHTN'){
     
     for(var i = 0; i < rows.length; i++){
         var MaCHTN = rows[i].querySelector('#CHTN_CHTN').innerText;
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'KN') {
         for(var i = 0; i < rows.length; i++){
         var MaCHTN = rows[i].querySelector('#CHTN_KN').innerText;
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'TN') {
         for(var i = 0; i < rows.length; i++){
         var MaCHTN = rows[i].querySelector('#CHTN_TN').innerText;
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
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


    function display_sort_tang_dan() {
        var table_TN = document.querySelectorAll('#data tr');
        var jsonArray = [];
        for(var i = 0; i < table_TN.length; i++) {
            var MATN = table_TN[i].querySelector('#CHTN_MACHTN').innerText;
            var MASP = table_TN[i].querySelector('#CHTN_SP').innerText;
            var KN = table_TN[i].querySelector('#CHTN_KN').innerText;
            var TN = table_TN[i].querySelector('#CHTN_TN').innerText;
    
            var object = { MATN: MATN, MASP: MASP, KN: KN, TN: TN};
            jsonArray.push(object);

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHTN tbody');
            var key = document.querySelector('#opt_sapxep_TN').value;
            var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
            tbody.innerHTML = '';
            var html = '';
            for (var i = 0; i < array_sapxep.length; i++) {
                html += `
                <tr>
                <td id="CHTN_MACHTN" style="display: none";>${array_sapxep[i].MATN}</td>
                <td id="CHTN_SP">${array_sapxep[i].MASP}</td>
                <td id="CHTN_KN">${array_sapxep[i].KN}</td>
                <td id="CHTN_TN">${array_sapxep[i].TN}</td>
                <form action="" method="POST">
                <td><input type="button" class="CHTN_sua_btn" id="thaotac_CHTN" value="sửa" data-index="${i}"></td>
                </form></tr>
                `;
            }
            tbody.innerHTML = html;


        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.CHTN_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_CHTN = document.getElementById('container_suaCHTN');
    
                form_sua_CHTN.querySelector('#KN_CHTN_sua').value = array_sapxep[index].KN;
                form_sua_CHTN.querySelector('#TN_CHTN_sua').value = array_sapxep[index].TN;
                form_sua_CHTN.querySelector('#MACHTN_sua').value = array_sapxep[index].MATN;
    
                form_sua_CHTN.style.display = 'block';
            });
        });
        });
    }
    

    // Hàm so sánh giảm dần
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


    function display_sort_giam_dan() {
        var table_TN = document.querySelectorAll('#data tr');
        var jsonArray = [];
        for(var i = 0; i < table_TN.length; i++) {
            var MATN = table_TN[i].querySelector('#CHTN_MACHTN').innerText;
            var MASP = table_TN[i].querySelector('#CHTN_SP').innerText;
            var KN = table_TN[i].querySelector('#CHTN_KN').innerText;
            var TN = table_TN[i].querySelector('#CHTN_TN').innerText;
    
            var object = { MATN: MATN, MASP: MASP, KN: KN, TN: TN};
            jsonArray.push(object);

        }
    
        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHTN tbody');
            var key = document.querySelector('#opt_sapxep_TN').value;
            var array_sapxep = sortByKey_giam(jsonArray, key); // sắp xếp mảng
            tbody.innerHTML = '';
            var html = '';
            for (var i = 0; i < array_sapxep.length; i++) {
                html += `
                <tr>
                <td id="CHTN_MACHTN" style="display: none";>${array_sapxep[i].MATN}</td>
                <td id="CHTN_SP">${array_sapxep[i].MASP}</td>
                <td id="CHTN_KN">${array_sapxep[i].KN}</td>
                <td id="CHTN_TN">${array_sapxep[i].TN}</td>
                <form action="" method="POST">
                <td><input type="button" class="CHTN_sua_btn" id="thaotac_CHTN" value="sửa" data-index="${i}"></td>
                </form></tr>
                `;
            }
            tbody.innerHTML = html;


        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.CHTN_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_CHTN = document.getElementById('container_suaCHTN');
    
                form_sua_CHTN.querySelector('#KN_CHTN_sua').value = array_sapxep[index].KN;
                form_sua_CHTN.querySelector('#TN_CHTN_sua').value = array_sapxep[index].TN;
                form_sua_CHTN.querySelector('#MACHTN_sua').value = array_sapxep[index].MATN;
    
                form_sua_CHTN.style.display = 'block';
            });
        });
        });
    }

  //chức năng sắp xếp


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
            
            if(!check_cn(arr_cn, "Sửa Sản Phẩm")){
                document.querySelector("#ThaoTac").remove();
            }


            document.querySelectorAll('.CHTN_SUA_btn').forEach(function(sua){
                if(!check_cn(arr_cn, "Sửa Sản Phẩm")){
                    sua.remove();
                }
            })
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}


//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}

//hàm kiểm tra xem chuỗi là số hay chuỗi kí tự
function checkType(input) {
    if (!isNaN(input)) {
       return 1;
    } else {
        return 0;
    }
}



