// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "nhan_vien";
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

            // Sau NVi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLNV_HT = document.querySelector('#SLNV_HT span');
var rows = document.querySelectorAll('#table_NV table tbody tr ');
SLNV_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData


   function update()
{

        var data = {
            DIA_CHI: $('#DIACHI_sua_NV').val(),
            HOTEN_NV: $('#TEN_sua_NV').val(),
            SO_DT: $('#SDT_sua_NV').val(),
            SO_CCCD: $('#CCCD_sua_NV').val(),
            G_TINH: $('#GT_sua_NV').val(),
            N_SINH: $('#NS_sua_NV').val(),
  
          };
          var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "nhan_vien";
    var idName = "MA_NV";
    var idValue = $('#MANV_sua_hidden').val();
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

function add()
{

    var data = {
       HOTEN_NV : $('#TenNV_add').val(),
        DIA_CHI: $('#DIACHI_add').val(),
        SO_DT: $('#SDT_add').val(),
        SO_CCCD: $('#CCCD_add').val(),
        G_TINH: $('[name="opt_gt"]:checked').val(),
        N_SINH: $('#ngaysinh_add').val(),
        MA_TK: $('#MA_TK_tam').val()
      };
      var MA_TK = $('#MA_TK_tam').val();
      var jsonData = JSON.stringify(data);
var operation = "Create";
var tableName = "nhan_vien";
        if(MA_TK === ""){
            alert("Hãy chọn tài khoản muốn cấp !!");
          }
          else{
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName,
                },
                success: function(response) {
                    //cập nhật lại trangj thái cho tài khoản
                    var data = {
                       TINH_TRANG: "hoạt động" 
                    }
                    var jsonData = JSON.stringify(data);
                    console.log(JSON.stringify(jsonData));
                    $.ajax({
                        url: '../AJAX_PHP/CRUD.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            jsonData : jsonData,
                            operation: "Update",
                            tableName: "tai_khoan",
                            idName : "MA_TK",
                            idValue : $('#MA_TK_tam').val()
                        },
                        success: function(response) {
                            location.reload();
                        },
                        error: function(xhr, status, error) {
                            console.log(error);
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
          }   
}



function Delete(MANV) {
    var operation = "Delete";
    var idName = "MA_NV";
    var idValue = MANV;

    // Hàm xóa từng bảng
    function deleteFromTable(tableName, idName, idValue) {
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                idName: idName,
                idValue: idValue
            },
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

    }

    // Đọc mã hóa đơn
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: "Read",
            tableName: "hoa_don",
            condition: "MA_NV=" + MANV,
        },
        success: function(response) {
                // Xóa các chi tiết hóa đơn
                for(var i = 0; i < response.length; i++){
                    deleteFromTable("chi_tiet_hoadon", "MA_HD", response[i].MA_HD);
                }
                // Xóa hóa đơn
                deleteFromTable("hoa_don", "MA_NV", MANV);
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });

        // Đọc mã phiếu nhập
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: "Read",
                tableName: "phieu_nhap",
                condition: "MA_NV=" + MANV,
            },
            success: function(response) {
                    // Xóa các chi tiết phiếu nhập
                    for(var i = 0; i < response.length; i++){
                        deleteFromTable("chi_tiet_nhap", "MA_PN", response[i].MA_PN);
                    }
                    // Xóa phiếu nhập
                    deleteFromTable("phieu_nhap", "MA_NV", MANV);
                
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

    // Xóa nhân viên
    deleteFromTable("nhan_vien", idName, idValue);
    location.reload();


}

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //

    function DisplayElementPage(elementPage) {
        var html = "";
        for (var i = 0; i < elementPage.length; i++) {
            html += `<tr>
            <td id="NV_MANV">${elementPage[i].MA_NV}</td>
            <td id="NV_HoTen">${elementPage[i].HOTEN_NV}</td>
            <td id="NV_diachi">${elementPage[i].DIA_CHI}</td>
            <td id="NV_SDT">${elementPage[i].SO_DT}</td>
            <td id="NV_CCCD">${elementPage[i].SO_CCCD}</td>
            <td id="NV_gioitinh">${elementPage[i].G_TINH}</td>
            <td id="NV_tuoi">${elementPage[i].N_SINH}</td>
            <td id="NV_MATK">${elementPage[i].MA_TK}</td>
            <form action="" method="POST"><input type="hidden" name="MANV">
            <td><input type="button" value="xóa" class="thaotac" onclick="Delete(${elementPage[i].MA_NV})"></td></form>
            <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?><td><input type="submit" class="NV_sua_btn" id="thaotac_NV" value="sửa" data-index="${i}"></td>
            </form></tr>
            `;
        }
        var tbody = document.getElementById("data");
        tbody.innerHTML = html;
        

        
// Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
var editButtons = document.querySelectorAll('.NV_sua_btn');
editButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var index = this.getAttribute('data-index');
        var form_sua_NV = document.getElementById('suaNV_container');

        form_sua_NV.querySelector('#TEN_sua_NV').value = elementPage[index].HOTEN_NV;
        form_sua_NV.querySelector('#DIACHI_sua_NV').value = elementPage[index].DIA_CHI;
        form_sua_NV.querySelector('#SDT_sua_NV').value = elementPage[index].SO_DT;
        form_sua_NV.querySelector('#MANV_sua_hidden').value = elementPage[index].MA_NV;
        form_sua_NV.querySelector('#CCCD_sua_NV').value = elementPage[index].SO_CCCD;
        form_sua_NV.querySelector('#GT_sua_NV').value = elementPage[index].G_TINH;
        form_sua_NV.querySelector('#NS_sua_NV').value = elementPage[index].N_SINH;



        form_sua_NV.style.display = 'block';
    });
});
    }

    //chức năng ẩn form sửa
document.addEventListener('click', function(event){
    var form_sua_NV = document.getElementById('suaNV_container');
    if(event.target === form_sua_NV){
        form_sua_NV.style.display = 'none';
    }

})
//chức năng ẩn form sửa

//hàm tính tuổi
function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate.replace(/-/g, '/')); // Chuyển đổi định dạng 'yyyy-mm-dd' thành 'yyyy/mm/dd'
    const age = today.getFullYear() - birthDateObj.getFullYear();
    
    return age + " tuổi";
}

//hàm tính tuổi





     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_NV').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_NV').value;
        var txt = document.getElementById('txt_timkiem_NV').value;
        var rows = document.querySelectorAll('#table_NV table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MANV'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MANV = rows[i].querySelector('#NV_MANV').innerText;
        
                    if(MANV.includes(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'Tên nhân viên'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaNV = rows[i].querySelector('#NV_HoTen').innerText;
                        if(MaNV.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'Địa chỉ'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaNV = rows[i].querySelector('#NV_diachi').innerText;
                        if(MaNV.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'SDT'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_SDT').innerText;
        if(MaNV.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'CCCD'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_CCCD').innerText;
        if(MANV.includes(txt)){
            rows[i].style.display = 'table-row';
        }
    
        
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    
    
    else if(opt === 'MATK'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#NV_MATK').innerText;
        if(MaNV.includes(txt)){
            rows[i].style.display = 'table-row';
        }
    
        
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    }
    });
    //chức năng tìm kiếm


    //chức năng ẩn hiện form cấp tài khoản
        document.querySelector('.btn_themNV').addEventListener('click', function(event){
            event.preventDefault();

            var HOTEN_NV = $('#TenNV_add').val();
            var DIA_CHI = $('#DIACHI_add').val();
            var SO_DT = $('#SDT_add').val();
            var SO_CCCD = $('#CCCD_add').val();
            var G_TINH = $('[name="opt_gt"]').val();
            var N_SINH = $('#ngaysinh_add').val();
             
            if(HOTEN_NV !== "" && DIA_CHI !== "" && SO_DT !== "" && SO_CCCD !== "" && G_TINH !== "" && N_SINH !== ""){
            document.querySelector('#capTK_container').style.display = 'block';
            }
            else{
                alert("Hãy nhập đầy đủ thông tin !!");
            }
        })

        document.addEventListener('click', function(event){
            var container = document.querySelector('#capTK_container'); 
            if(event.target === container){
                document.querySelector('#capTK_container').style.display = 'none';
            }
        })

        //tạo hiệu ứng click chọn cho form
        var tr = document.querySelectorAll('#capTK_container table tbody tr');

        tr.forEach(function(tr){
            tr.addEventListener('click', function(){
                reset_color();
                tr.style.backgroundColor = "grey";
                document.querySelector('#MA_TK_tam').value = tr.querySelector('#MA_TK_hidden').value; //lưu trữ mã tài khoản vừa chọn
            })

        })

        //hàm reset màu
        function reset_color(){
            var tr = document.querySelectorAll('#capTK_container table tbody tr');
            tr.forEach(function(tr){
                tr.style.backgroundColor = "";
            });
        }
    //chức năng ẩn hiện form cấp tài khoản

    document.querySelector("#capTK_btn").addEventListener("click", function(event){
        event.preventDefault();
    })