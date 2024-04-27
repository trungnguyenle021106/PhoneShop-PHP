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
            consTNe.log(error);
        }
    });
}
   //loadData


   function update()
{

        var data = {
            KET_NOI: $('#KN_CHTN_sua').val(),
            TINH_NANG: $('#TN_CHTN_sua').val(),
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "cau_hinh_tai_nghe";
    var idName = "MA_CHTN";
    var idValue = $('#MACHTN_sua').val();
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
        <td id="CHTN_MACHTN" style="display: none";>${elementPage[i].MA_CHTN}</td>
        <td id="CHTN_SP">${elementPage[i].MA_SP}</td>
        <td id="CHTN_KN">${elementPage[i].KET_NOI}</td>
        <td id="CHTN_TN">${elementPage[i].TINH_NANG}</td>
        <form action="" method="POST">
        <td><input type="button" class="CHTN_sua_btn" id="thaotac_CHTN" value="sửa" data-index="${i}"></td>
        </form></tr>
        `;
    }
        var tbody = document.getElementById("data");
        tbody.innerHTML = html;
    

        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.CHTN_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_CHTN = document.getElementById('container_suaCHTN');
    
                form_sua_CHTN.querySelector('#KN_CHTN_sua').value = elementPage[index].KET_NOI;
                form_sua_CHTN.querySelector('#TN_CHTN_sua').value = elementPage[index].TINH_NANG;
                form_sua_CHTN.querySelector('#MACHTN_sua').value = elementPage[index].MA_CHTN;
    
                form_sua_CHTN.style.display = 'block';
            });
        });
}        


//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_CHTN = document.getElementById('container_suaCHTN');
    if(event.target === form_sua_CHTN){
        form_sua_CHTN.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa




    // chức năng tìm kiếm
    document.getElementById('btn_timkiem_CHTN').addEventListener('click', function(event){
        event.preventDefault();
     var opt = document.getElementById('opt_timkiem_CHTN').value;
     var txt = document.getElementById('txt_timkiem_CHTN').value;
      var rows = document.querySelectorAll('#table_CHTN table tbody tr');
     
     if(opt === 'MACHTN'){
     
         for(var i = 0; i < rows.length; i++){
             var MACHTN = rows[i].querySelector('#CHTN_MACHTN').innerText;
             if(chuyenDoiChuoi(MACHTN).includes(chuyenDoiChuoi(txt))){
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
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
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
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
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
         if(chuyenDoiChuoi(MaCHTN).includes(chuyenDoiChuoi(txt))){
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

//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}



