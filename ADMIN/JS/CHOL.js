// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "cau_hinh_oplung";
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
            //cập nhật lại số lượng sản phẩm
            var SLCHOL_HT = document.querySelector('#SLCHOL_HT span');
            var rows = document.querySelectorAll('#table_CHOL table tbody tr ');
            SLCHOL_HT.innerText = rows.length;
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
            CHAT_LIEU: $('#CL_CHOL_sua').val(),
            TINH_NANG: $('#TN_CHOL_sua').val(),
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "cau_hinh_oplung";
    var idName = "MA_CHOL";
    var idValue = $('#MACHOL_sua').val();
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

   function DisplayElementPage(elementPage) {
    var tbody = document.getElementById("data");
    var html = "";

    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="CHOL_MACHOL" style="display: none;">${elementPage[i].MA_CHOL} </td>
        <td id="CHOL_MASP">${elementPage[i].MA_SP} </td>
        <td id="CHOL_CL">${elementPage[i].CHAT_LIEU} </td>
        <td id="CHOL_TN">${elementPage[i].TINH_NANG} </td>
        <td><input type="button" class="thaotac CHOL_sua_btn" value="sửa" data-index="${i}"></td>
        </tr>`;
    }

    tbody.innerHTML = html;

    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.CHOL_sua_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_CHOL = document.getElementById('container_suaCHOL');

            form_sua_CHOL.querySelector('#CL_CHOL_sua').value = elementPage[index].CHAT_LIEU;
            form_sua_CHOL.querySelector('#TN_CHOL_sua').value = elementPage[index].TINH_NANG;
            form_sua_CHOL.querySelector('#MACHOL_sua').value = elementPage[index].MA_CHOL;

            form_sua_CHOL.style.display = 'block';
        });
    });
}
    


//chức năng ẩn form sửa
document.addEventListener('click', function(event){
    var form_sua_CHOL = document.getElementById('container_suaCHOL');
    if(event.target === form_sua_CHOL){
        form_sua_CHOL.style.display = 'none';
    }

})
    //chức năng ẩn form sửa


    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_CHOL').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_CHOL').value;
 var txt = document.getElementById('txt_timkiem_CHOL').value;
  var rows = document.querySelectorAll('#table_CHOL table tbody tr');
 
 if(opt === 'MACHOL'){
 
     for(var i = 0; i < rows.length; i++){
         var MACHOL = rows[i].querySelector('#CHOL_MACHOL').innerText;
         if(chuyenDoiChuoi(MACHOL).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 
 else if(opt === 'MASP'){
 
 for(var i = 0; i < rows.length; i++){
     var MaCHOL = rows[i].querySelector('#CHOL_MASP').innerText;
     if(chuyenDoiChuoi(MaCHOL).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 
 else if(opt === 'CL') {
     for(var i = 0; i < rows.length; i++){
     var MaCHOL = rows[i].querySelector('#CHOL_CL').innerText;
     if(chuyenDoiChuoi(MaCHOL).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'TN') {
     for(var i = 0; i < rows.length; i++){
     var MaCHOL = rows[i].querySelector('#CHOL_TN').innerText;
     if(chuyenDoiChuoi(MaCHOL).includes(chuyenDoiChuoi(txt))){
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
        var table_CHOL = document.querySelectorAll('#table_CHOL tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_CHOL.length; i++) {
            var MASP = table_CHOL[i].querySelector('#CHOL_MASP').innerText;
            var CL = table_CHOL[i].querySelector('#CHOL_CL').innerText;
            var TN = table_CHOL[i].querySelector('#CHOL_TN').innerText;
    
            var object = { MA_SP: MASP, CHAT_LIEU: CL, TINH_NANG: TN};
            jsonArray.push(object);

            if(window.getComputedStyle(table_CHOL[i]).display !== 'none'){
                var object2 = { MA_SP: MASP, CHAT_LIEU: CL, TINH_NANG: TN};
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHOL tbody');
            var key = document.querySelector('#opt_sapxep_OL').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHOL tbody');
            var key = document.querySelector('#opt_sapxep_OL').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });


        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHOL tbody');
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
  
//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}




