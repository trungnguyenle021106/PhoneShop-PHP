// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "nha_sx";
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

            // Sau NSXi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLNSX_HT = document.querySelector('#SLNSX_HT span');
var rows = document.querySelectorAll('#table_NSX table tbody tr ');
SLNSX_HT.innerText = rows.length;
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
        <td id="NSX_Ma">${elementPage[i].MA_NSX}</td>
        <td id="Ten_NSX">${elementPage[i].TEN_NSX}</td>
        <td id="NSX_SDT">${elementPage[i].SO_DT}</td>
        <td id="NSX_Diachi">${elementPage[i].DIA_CHI}</td>
        <td id="NSX_Email">${elementPage[i].EMAIL}</td>
       <form action="" method="POST">
       <input type="hidden" name="MANSX" value="${elementPage[i].MA_NSX}">
       <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
      <td><input type="submit" value="xóa" class="thaotac" name="btn_xoa_NSX"></td>
      <td><input type="button" value="sửa" class="thaotac" id="NSX_sửa_btn" name="NSX_sửa_btn"></td>

       </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_NSX').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_NSX').value;
 var txt = document.getElementById('txt_timkiem_NSX').value;
  var rows = document.querySelectorAll('#table_NSX table tbody tr');
 
 if(opt === 'MANSX'){
 
     for(var i = 0; i < rows.length; i++){
         var MANSX = rows[i].querySelector('#NSX_Ma').innerText;
         if(MANSX.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'Tên NSX'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#Ten_NSX').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'SDT'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_SDT').innerText;
     if(MaNSX.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Địa chỉ') {
     for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_Diachi').innerText;
     if(MaNSX.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Email') {
     for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#NSX_Email').innerText;
     if(MaNSX.includes(txt)){
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