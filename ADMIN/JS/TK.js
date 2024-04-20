// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "tai_khoan";
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

            // Sau TKi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLTK_HT = document.querySelector('#SLTK_HT span');
var rows = document.querySelectorAll('#table_TK table tbody tr ');
SLTK_HT.innerText = rows.length;
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
        if(elementPage[i].MA_Q == 1){

        }
        html += `
        <tr>
        <td id="TK_MATK">${elementPage[i].MA_TK}</td>
        <td id="TK_TenTK">${elementPage[i].TEN_TK}</td>
        <td id="TK_MatTKau">${elementPage[i].MAT_KHAU}</td>
        <td id="TK_NgayTao">${elementPage[i].NGAY_TAO_TK}</td>
        <td id="TK_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="TK_Quyen">${elementPage[i].MA_Q}</td>
       <form action="" method="POST">
       <input type="hidden" name="MATK">
      <td><input type="button" value="xóa" class="thaotac"></td>
       </form>
           <form action="" method="POST">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
           <td><input type="submit" id="TK_sua_btn" class="thaotac" value="sửa"></td>
           </form>
           <form action="" method="POST">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
           <td><input type="submit" id="TK_sua_btn" class="thaotac" value="lịch sử"></td>
           </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }



    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_TK').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_TK').value;
 var txt = document.getElementById('txt_timkiem_TK').value;
  var rows = document.querySelectorAll('#table_TK table tbody tr');
 
 if(opt === 'MATK'){
 
     for(var i = 0; i < rows.length; i++){
         var MATK = rows[i].querySelector('#TK_MATK').innerText;
         if(MATK.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'Tên TK'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#TK_TenTK').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Ngày tạo'){
 
 for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_NgayTao').innerText;
     if(MaTK.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Quyền') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_Quyen').innerText;
     if(MaTK.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'TinhTrang') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_TinhTrang').innerText;
     if(MaTK.includes(txt)){
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
