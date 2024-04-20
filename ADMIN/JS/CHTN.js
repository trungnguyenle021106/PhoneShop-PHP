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

            // Sau khi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLSP_HT = document.querySelector('#SLCHTN_HT span');
var rows = document.querySelectorAll('#table_CHTN table tbody tr ');
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
var ulContainer = document.querySelector("#table_CHTN table tbody");

for (var i = 0; i < elementPage.length; i++) {
    var tr = document.createElement('tr');
    var content = '<tr><td id="CHTN_MACHTN">'+ elementPage[i].MA_CHTN + '</td><td id="CHTN_SP">'+ elementPage[i].MA_SP + '</td><td id="CHTN_KN">'+ elementPage[i].KET_NOI + '</td><td id="CHTN_TN">'+ elementPage[i].TINH_NANG + '</td><form action="" method="POST"><td><input type="button" id="CHTN_sua_btn" class="thaotac" value="sửa"></td></form></tr>  ';
    
        tr.innerHTML = content;
        ulContainer.append(tr);   

         // Gán sự kiện cho nút thêm cấu hình mới tạo
    tr.querySelector('#CHTN_sua_btn').addEventListener('click', function(){   
    });
    
}
}


    // chức năng tìm kiếm
    document.getElementById('btn_timkiem_CHTN').addEventListener('click', function(event){
        event.preventDefault();
     var opt = document.getElementById('opt_timkiem_CHTN').value;
     var txt = document.getElementById('txt_timkiem_CHTN').value;
      var rows = document.querySelectorAll('#table_CHTN table tbody tr');
     
     if(opt === 'MACHTN'){
     
         for(var i = 0; i < rows.length; i++){
             var MACHTN = rows[i].querySelector('#CHTN_MACHTN').innerText;
             if(MACHTN.indexOf(txt) !== -1){
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
         if(MaCHTN.includes(txt)){
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
         if(MaCHTN.includes(txt)){
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
         if(MaCHTN.includes(txt)){
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


