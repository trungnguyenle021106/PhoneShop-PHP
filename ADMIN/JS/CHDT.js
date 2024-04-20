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
            CAMERA_SAU: $('#CAMSAU_CHDT_sua').val() + "px"
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
var ulContainer = document.querySelector("#table_CHDT table tbody");

for (var i = 0; i < elementPage.length; i++) {
    var tr = document.createElement('tr');
    var content = '<tr><td id="CHDT_MACHDT" style="display: none;">'+ elementPage[i].MA_CHĐT + ' </td><td id="CHDT_SP"> '+ elementPage[i].MA_SP + ' </td><td id="CHDT_RAM">'+ elementPage[i].RAM + '  </td><td id="CHDT_BNT">'+ elementPage[i].BO_NHO_TRONG + '  </td><td id="CHDT_MH">'+ elementPage[i].MAN_HINH + ' </td><td id="CHDT_MS">'+ elementPage[i].MAU_SAC + ' </td><td id="CHDT_PIN">'+ elementPage[i].PIN + ' </td> <td id="CHDT_CAMTRC">'+ elementPage[i].CAMERA_TRUOC + ' </td> <td id="CHDT_CAMSAU">'+ elementPage[i].CAMERA_SAU + ' </td><form action="" method="POST"><td><input type="submit" id="CHDT_sua_btn" class="thaotac" value="sửa"></td></form></tr>';
    
        tr.innerHTML = content;
        ulContainer.append(tr);   

         // Gán sự kiện cho nút sửa mới tạo
    tr.querySelector('#CHDT_sua_btn').addEventListener('click', function(){   
        var form_sua_CHDT = document.getElementById('container_suaCHDT')
        var tr = this.parentElement.parentElement;
        
        form_sua_CHDT.querySelector('#RAM_CHDT_sua').value = tr.querySelector('#CHDT_RAM').innerText.split("GB")[0];
        form_sua_CHDT.querySelector('#BNT_CHDT_sua').value = tr.querySelector('#CHDT_BNT').innerText.split("GB")[0];
        form_sua_CHDT.querySelector('#MH_CHDT_sua').value = tr.querySelector('#CHDT_MH').innerText;
        form_sua_CHDT.querySelector('#MS_CHDT_sua').value = tr.querySelector('#CHDT_MS').innerText;
        form_sua_CHDT.querySelector('#PIN_CHDT_sua').value = tr.querySelector('#CHDT_PIN').innerText.split("Mah")[0];
        form_sua_CHDT.querySelector('#CAMTRC_CHDT_sua').value = tr.querySelector('#CHDT_CAMTRC').innerText.split("px")[0];
        form_sua_CHDT.querySelector('#CAMSAU_CHDT_sua').value = tr.querySelector('#CHDT_CAMSAU').innerText.split("px")[0];
        form_sua_CHDT.querySelector('#MACHDT_sua').value = tr.querySelector('#CHDT_MACHDT').innerText;

        form_sua_CHDT.style.display = 'block';
    });
    
}
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
             if(MACHDT.indexOf(txt) !== -1){
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
         if(MaCHDT.includes(txt)){
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
         if(MaCHDT.includes(txt)){
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
         if(MaCHDT.includes(txt)){
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
         if(MaCHDT.includes(txt)){
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
         if(MaCHDT.includes(txt)){
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


   
