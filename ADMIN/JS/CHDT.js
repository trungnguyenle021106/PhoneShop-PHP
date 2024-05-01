// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 


function update()
{

        var data = {
            RAM: $('#RAM_CHDT_sua').val() + "GB",
            BO_NHO_TRONG: $('#BNT_CHDT_sua').val() + "GB",
            MAN_HINH: $('#MH_CHDT_sua').val(),
            MAU_SAC: $('#MS_CHDT_sua').val(),
            PIN: $('#PIN_CHDT_sua').val() + "Mah",
            CAMERA_TRUOC: $('#CAMTRC_CHDT_sua').val() + "px",
            CAMERA_SAU: $('#CAMSAU_CHDT_sua').val() + "px",
            OS: $('#OS_CHDT_sua').val()
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "cau_hinh_dien_thoai";
    var idName = "MA_CHĐT";
    var idValue = $('#MACHDT_sua').val();
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


 //loadData
 function read() {
    var operation = "Read";
    var tableName = "cau_hinh_dien_thoai";
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
            var SLSP_HT = document.querySelector('#SLCHDT_HT span');
var rows = document.querySelectorAll('#table_CHDT table tbody tr ');
SLSP_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //




function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="CHDT_MACHDT" style="display: none;">${elementPage[i].MA_CHĐT}</td>
        <td id="CHDT_SP">${elementPage[i].MA_SP}</td>
        <td id="CHDT_RAM">${elementPage[i].RAM}</td>
        <td id="CHDT_BNT">${elementPage[i].BO_NHO_TRONG}</td>
        <td id="CHDT_MH">${elementPage[i].MAN_HINH}</td>
        <td id="CHDT_MS">${elementPage[i].MAU_SAC}</td>
        <td id="CHDT_PIN">${elementPage[i].PIN}</td> 
        <td id="CHDT_CAMTRC">${elementPage[i].CAMERA_TRUOC}</td> 
        <td id="CHDT_CAMSAU">${elementPage[i].CAMERA_SAU}</td>
        <td id="CHDT_OS" >${elementPage[i].OS}</td>
        <form action="" method="POST"><td><input type="submit" class="CHDT_sua_btn" id="thaotac_CHDT" value="sửa" data-index="${i}"></td>
        </form></tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    

    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.CHDT_sua_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_CHDT = document.getElementById('container_suaCHDT');

            form_sua_CHDT.querySelector('#RAM_CHDT_sua').value = elementPage[index].RAM.split("GB")[0];
            form_sua_CHDT.querySelector('#BNT_CHDT_sua').value = elementPage[index].BO_NHO_TRONG.split("GB")[0];
            form_sua_CHDT.querySelector('#MH_CHDT_sua').value = elementPage[index].MAN_HINH;
            form_sua_CHDT.querySelector('#MS_CHDT_sua').value = elementPage[index].MAU_SAC;
            form_sua_CHDT.querySelector('#PIN_CHDT_sua').value = elementPage[index].PIN.split("Mah")[0];
            form_sua_CHDT.querySelector('#CAMSAU_CHDT_sua').value = elementPage[index].CAMERA_SAU.split("px")[0];
            form_sua_CHDT.querySelector('#CAMTRC_CHDT_sua').value = elementPage[index].CAMERA_TRUOC.split("px")[0];
            form_sua_CHDT.querySelector('#OS_CHDT_sua').value = elementPage[index].OS;
            form_sua_CHDT.querySelector('#MACHDT_sua').value = elementPage[index].MA_CHĐT;

            form_sua_CHDT.style.display = 'block';
        });
    });
}


//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_CHDT = document.getElementById('container_suaCHDT');
    if(event.target === form_sua_CHDT){
        form_sua_CHDT.style.display = 'none';
    }
})
    //chức năng ẩn hiện form sửa

    // chức năng tìm kiếm
    document.getElementById('btn_timkiem_CHDT').addEventListener('click', function(event){
        event.preventDefault();
     var opt = document.getElementById('opt_timkiem_CHDT').value;
     var txt = document.getElementById('txt_timkiem_CHDT').value;
      var rows = document.querySelectorAll('#table_CHDT table tbody tr');
     
     if(opt === 'MACHDT'){
     
         for(var i = 0; i < rows.length; i++){
             var MACHDT = rows[i].querySelector('#CHDT_MACHDT').innerText;
             if(chuyenDoiChuoi(MACHDT).includes(chuyenDoiChuoi(txt))){
                rows[i].style.display = 'table-row';
             }
             else{ 
                 rows[i].style.display = 'none';
              }
         }
     }
     
     
     else if(opt === 'MASP'){
     
     for(var i = 0; i < rows.length; i++){
         var MaCHDT = rows[i].querySelector('#CHDT_SP').innerText;
         if(chuyenDoiChuoi(MaCHDT).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'RAM') {
         for(var i = 0; i < rows.length; i++){
         var MaCHDT = rows[i].querySelector('#CHDT_RAM').innerText;
         if(chuyenDoiChuoi(MaCHDT).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'BNT') {
         for(var i = 0; i < rows.length; i++){
         var MaCHDT = rows[i].querySelector('#CHDT_BNT').innerText;
         if(chuyenDoiChuoi(MaCHDT).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'MH') {
         for(var i = 0; i < rows.length; i++){
         var MaCHDT = rows[i].querySelector('#CHDT_MH').innerText;
         if(chuyenDoiChuoi(MaCHDT).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
     }
     
     else if(opt === 'MS') {
         for(var i = 0; i < rows.length; i++){
         var MaCHDT = rows[i].querySelector('#CHDT_MS').innerText;
         if(chuyenDoiChuoi(MaCHDT).includes(chuyenDoiChuoi(txt))){
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
        var table_CHDT = document.querySelectorAll('#table_CHDT tbody tr');
        var jsonArray = [];
        var jsonArray2 = [];

        for (var i = 0; i < table_CHDT.length; i++) {
            var MASP = table_CHDT[i].querySelector('#CHDT_SP').innerText;
            var RAM = table_CHDT[i].querySelector('#CHDT_RAM').innerText;
            var BNT = table_CHDT[i].querySelector('#CHDT_BNT').innerText;
            var MH = table_CHDT[i].querySelector('#CHDT_MH').innerText;
            var MS = table_CHDT[i].querySelector('#CHDT_MS').innerText;
            var PIN = table_CHDT[i].querySelector('#CHDT_PIN').innerText;
            var CAM_TRC = table_CHDT[i].querySelector('#CHDT_CAMTRC').innerText;
            var CAM_SAU = table_CHDT[i].querySelector('#CHDT_CAMSAU').innerText;
            var OS = table_CHDT[i].querySelector('#CHDT_OS').innerText;
    
            var object = { MA_SP: MASP, RAM: RAM, BO_NHO_TRONG: BNT, MAN_HINH: MH, MAU_SAC: MS, PIN: PIN,CAMERA_TRUOC: CAM_TRC, CAMERA_SAU: CAM_SAU, OS: OS };
            jsonArray.push(object);

            if(window.getComputedStyle(table_CHDT[i]).display !== 'none'){
                var object2 = { MA_SP: MASP, RAM: RAM, BO_NHO_TRONG: BNT, MAN_HINH: MH, MAU_SAC: MS, PIN: PIN,CAMERA_TRUOC: CAM_TRC, CAMERA_SAU: CAM_SAU, OS: OS };
                jsonArray2.push(object2);
            }

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHDT tbody');
            var key = document.querySelector('#opt_sapxep_DT').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHDT tbody');
            var key = document.querySelector('#opt_sapxep_DT').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray2, key); // sắp xếp mảng
            console.log(array_sapxep);
         DisplayElementPage(array_sapxep);
        });

        
        document.querySelector('.hoantac').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CHDT tbody');
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

