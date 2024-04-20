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

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var ulContainer = document.querySelector("#table_CHOL table tbody");
    
    for (var i = 0; i < elementPage.length; i++) {
        var tr = document.createElement('tr');
        var content = '<tr><td id="CHOL_MACHOL">'+ elementPage[i].MA_CHOL + ' </td><td id="CHOL_MASP">'+ elementPage[i].MA_SP + ' </td><td id="CHOL_CL">'+ elementPage[i].CHAT_LIEU + ' </td><td id="CHOL_TN">'+ elementPage[i].TINH_NANG + ' </td><form action="" method="POST"><td><input type="button" id="CHOL_sua_btn" class="thaotac" value="sửa"></td></form></tr>';
        
            tr.innerHTML = content;
            ulContainer.append(tr);   
    
             // Gán sự kiện cho nút thêm cấu hình mới tạo
        tr.querySelector('#CHOL_sua_btn').addEventListener('click', function(){   
        });
        
    }
    }




    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_CHOL').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_CHOL').value;
 var txt = document.getElementById('txt_timkiem_CHOL').value;
  var rows = document.querySelectorAll('#table_CHOL table tbody tr');
 
 if(opt === 'MACHOL'){
 
     for(var i = 0; i < rows.length; i++){
         var MACHOL = rows[i].querySelector('#CHOL_MACHOL').innerText;
         if(MACHOL.indexOf(txt) !== -1){
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
     if(MaCHOL.includes(txt)){
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
     if(MaCHOL.includes(txt)){
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
     if(MaCHOL.includes(txt)){
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
