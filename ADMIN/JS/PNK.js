// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "phieu_nhap";
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

            // Sau HDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLPN_HT = document.querySelector('.SLPN_HT span');
            var rows = document.querySelectorAll('#table_PNK table tbody tr ');
            SLPN_HT.innerText = rows.length;
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
        <td id="PNK_Ma">${elementPage[i].MA_PN}</td>
        <td id="PNK_NgayNhap">${elementPage[i].NGAY_NHAP}</td>
        <td id="PNK_MaNV">${elementPage[i].MA_NV}</td>
        <td id="PNK_MaNSX">${elementPage[i].MA_NSX}</td>
        <td id="PNK_trang_thai">${elementPage[i].TRANG_THAI}</td>
       <form action="" method="POST">
       <input type="hidden" name="MAPNK_xoa" value="${elementPage[i].MA_PN}">
       <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
      <td><input type="submit" value="xóa" name="btn_xoa_PN" class="thaotac"></td>
       </form>
       <form action="" method="POST">
       <input type="hidden" name="MAPNK_nhap" value="${elementPage[i].MA_PN}">
       <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
      <td><input type="submit" value="nhập" name="btn_nhap_PN"  class="thaotac"></td>
       </form>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
//chức năng tìm kiếm
document.getElementById('btn_timkiem_PNK').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_PNK').value;
 var txt = document.getElementById('txt_timkiem_PNK').value;
  var rows = document.querySelectorAll('#table_PNK table tbody tr');
 
 if(opt === 'MAPNK'){
 
     for(var i = 0; i < rows.length; i++){
         var MAPNK = rows[i].querySelector('#PNK_Ma').innerText;
         console.log(MAPNK);
         if(MAPNK.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'MaNV'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#PNK_MaNV').innerText;
     if(MaNV.indexOf(txt) !== -1){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MaNSX'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#PNK_MaNSX').innerText;
     if(MaNSX.indexOf(txt) !== -1){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Ngày nhập') {
     for(var i = 0; i < rows.length; i++) {
         var date = new Date(convertDateFormat(rows[i].querySelector('#PNK_NgayNhap').innerText));
         var txtDate = document.getElementById('txt_timkiem_PNK').value;
 
         // So sánh ngày nhập với khoảng thời gian đã chọn
         if (date.toISOString().includes(txtDate)) {
             rows[i].style.display = 'table-row';
         } else {
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
 
 function convertDateFormat(inputDate) {
     // Tách ngày thành mảng các phần tử: [yyyy, mm, dd]
     var parts = inputDate.split('-');
     
     // Trích xuất năm, tháng và ngày
     var year = parts[0];
     var month = parts[1];
     var day = parts[2];
 
     // Tạo ngày mới với định dạng "yyyy-mm-dd"
     var newDate = year + '-' + month + '-' + day;
 
     // Trả về ngày mới
     return newDate;
 }
 //chức năng tìm kiếm