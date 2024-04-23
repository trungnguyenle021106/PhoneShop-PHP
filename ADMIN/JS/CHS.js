// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "cau_hinh_sac";
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
            var SLCHS_HT = document.querySelector('#SLCHS_HT span');
            var rows = document.querySelectorAll('#table_CHS table tbody tr ');
            SLCHS_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            consSe.log(error);
        }
    });
}
   //loadData


   function update()
{

        var data = {
            KET_NOI: $('#KN_CHS_sua').val(),
            CONG_SUAT: $('#CS_CHS_sua').val() + " W",
            TINH_NANG: $('#TN_CHS_sua').val()
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "cau_hinh_sac";
    var idName = "MA_CHS";
    var idValue = $('#MACHS_sua').val();
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
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="CHS_MACHS" style="display: none; ">${elementPage[i].MA_CHS}</td>
        <td id="CHS_MASP">${elementPage[i].MA_SP}</td>
        <td id="CHS_KN">${elementPage[i].KET_NOI}</td>
        <td id="CHS_CS">${elementPage[i].CONG_SUAT}</td>
        <td id="CHS_TN">${elementPage[i].TINH_NANG}</td>
        <form action="" method="POST">
        <td><input type="button" id="CHS_sua_btn" class="thaotac" value="sửa"></td>
        </form></tr>
        `;

        var tbody = document.getElementById("data");
        tbody.innerHTML = html;

            
                // Gán sự kiện cho nút sửa mới tạo
    tbody.querySelector('#CHS_sua_btn').addEventListener('click', function(){   
        var form_sua_CHS = document.getElementById('container_suaCHS')
        var tr = this.parentElement.parentElement;
        
        form_sua_CHS.querySelector('#KN_CHS_sua').value = tbody.querySelector('#CHS_KN').innerText;
        form_sua_CHS.querySelector('#CS_CHS_sua').value = tbody.querySelector('#CHS_CS').innerText.split(" W")[0];
        form_sua_CHS.querySelector('#TN_CHS_sua').value = tbody.querySelector('#CHS_TN').innerText;
        form_sua_CHS.querySelector('#MACHS_sua').value = tbody.querySelector('#CHS_MACHS').innerText;

        form_sua_CHS.style.display = 'block';
    });
    
}
}        


//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_CHS = document.getElementById('container_suaCHS');
    if(event.target === form_sua_CHS){
        form_sua_CHS.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa


    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_CHS').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_CHS').value;
 var txt = document.getElementById('txt_timkiem_CHS').value;
  var rows = document.querySelectorAll('#table_CHS table tbody tr');
 
 if(opt === 'MACHS'){
 
     for(var i = 0; i < rows.length; i++){
         var MACHS = rows[i].querySelector('#CHS_MACHS').innerText;
         if(MACHS.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 
 else if(opt === 'MASP'){
 
 for(var i = 0; i < rows.length; i++){
     var MaCHS = rows[i].querySelector('#CHS_MASP').innerText;
     if(MaCHS.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 
 else if(opt === 'KN') {
     for(var i = 0; i < rows.length; i++){
     var MaCHS = rows[i].querySelector('#CHS_KN').innerText;
     if(MaCHS.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'TN') {
     for(var i = 0; i < rows.length; i++){
     var MaCHS = rows[i].querySelector('#CHS_TN').innerText;
     if(MaCHS.includes(txt)){
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