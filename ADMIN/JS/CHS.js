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
            console.log(error);
        }
    });
}
   //loadData


   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


function DisplayElementPage(elementPage) {
    var ulContainer = document.querySelector("#table_CHS table tbody");
    
    for (var i = 0; i < elementPage.length; i++) {
        var tr = document.createElement('tr');
        var content = '<tr><td id="CHS_MACHS">'+ elementPage[i].MA_CHS + '</td><td id="CHS_MASP">'+ elementPage[i].MA_SP + '</td><td id="CHS_KN">'+ elementPage[i].KET_NOI + '</td><td id="CHS_CS">'+ elementPage[i].CONG_SUAT + '</td><td id="CHS_TN">'+ elementPage[i].TINH_NANG + '</td><form action="" method="POST"><td><input type="button" id="CHS_sua_btn" class="thaotac" value="sửa"></td></form></tr>';
        
            tr.innerHTML = content;
            ulContainer.append(tr);   
    
             // Gán sự kiện cho nút thêm cấu hình mới tạo
        tr.querySelector('#CHS_sua_btn').addEventListener('click', function(){   
        });
        
    }
    }



    
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