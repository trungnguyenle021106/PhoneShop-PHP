 // Gọi hàm read để lấy dữ liệu 
read();

 //loadData
 function read() {
    var operation = "Read";
    var tableName = "khuyen_mai";
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

            //cập nhật lại số lượng khuyến mãi
            var SLSP_HT = document.querySelector('#SLKM span');
            var rows = document.querySelectorAll('#table_KM table tbody tr ');
            SLSP_HT.innerText = rows.length;
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function update()
{

    var data = {
        TINH_TRANG: $('#TrangThaiKM_sua').val()
    };
    var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "khuyen_mai";
    var idName = "MA_KM";
    var idValue = $('#MAKM_sua').val();
    console.log(idValue);
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

function timkiem(){
    // Prevent default form submission behavior
  event.preventDefault();
  // Get search criteria and value from the form
  const searchTxtCriterion = document.getElementById('opt_timkiem_KM').value;
  const searchTxtValue = document.getElementById('txt_timkiem_KM').value;

  const searchDateCriterion = document.getElementById('opt_timkiem_date').value;
  const searchDateValue = document.getElementById('date_timkiem_KM').value;

//   console.log( searchTxtCriterion);
//   console.log( searchTxtValue);
//   console.log( searchDateCriterion);
//   console.log( searchDateValue);

    //lưu table km 
    var tbkhuyenmai = null ;

    getKhuyenMaiData()
    .then(response => {
      tbkhuyenmai = response;
      
      if(searchTxtValue != null){
        if(searchTxtCriterion === "MaKM_tim"){
            for (var i = 0; i < tbkhuyenmai.length; i++) {
                if (tbkhuyenmai[i].MA_KM === searchTxtValue) {
                    // Đã tìm thấy ID khuyến mãi, xử lý tại đây (ví dụ: console.log hoặc lưu vào biến)
                    var foundKhuyenMai = [tbkhuyenmai[i]];
                    // console.log("Tìm thấy khuyến mãi có ID:", foundKhuyenMai.MA_KM);
                    // console.log("Chi tiết khuyến mãi:", foundKhuyenMai);
                    
                    // Thực hiện các hành động khác cần thiết ở đây
                    DisplayElementPage(foundKhuyenMai);

                    //cập nhật lại số lượng khuyến mãi
                    var SLSP_HT = document.querySelector('#SLKM span');
                    var rows = document.querySelectorAll('#table_KM table tbody tr ');
                    SLSP_HT.innerText = rows.length;
                }
            }
        } else {
            for (var i = 0; i < tbkhuyenmai.length; i++) {
                var foundKhuyenMai = [];
                var searchTextLower = searchTxtValue.toLowerCase(); // Chuyển đổi tất cả thành chữ thường để tìm kiếm không phân biệt hoa thường
                for (var i = 0; i < tbkhuyenmai.length; i++) {
                    if (tbkhuyenmai[i].TEN_KM.toLowerCase().includes(searchTextLower)) {
                        // Tìm thấy khuyến mãi với phần của tên khuyến mãi khớp
                        foundKhuyenMai.push(tbkhuyenmai[i]);
                    }
                }
                
                    DisplayElementPage(foundKhuyenMai);

                    //cập nhật lại số lượng khuyến mãi
                    var SLSP_HT = document.querySelector('#SLKM span');
                    var rows = document.querySelectorAll('#table_KM table tbody tr ');
                    SLSP_HT.innerText = rows.length;
                    // Các hành động khác
            }
        }
      } 

      if (date_timkiem_KM != null && searchDateCriterion === "NBD") {
            //console.log("da vao 001");
            var foundKhuyenMai = [];

            for (var i = 0; i < tbkhuyenmai.length; i++) {
                // console.log(tbkhuyenmai[i].NGAY_BĐ);
                // console.log(searchDateValue);

                if(tbkhuyenmai[i].NGAY_BĐ === searchDateValue) {
                    // console.log("da vao 003");
                    foundKhuyenMai.push(tbkhuyenmai[i]);
                }
            }
        
            DisplayElementPage(foundKhuyenMai);
            var SLSP_HT = document.querySelector('#SLKM span');
            SLSP_HT.innerText = foundKhuyenMai.length;
        }

        if (date_timkiem_KM != null && searchDateCriterion === "NKT") {
            //console.log("da vao 001");
            var foundKhuyenMai = [];
    
            for (var i = 0; i < tbkhuyenmai.length; i++) {
                // console.log(tbkhuyenmai[i].NGAY_BĐ);
                // console.log(searchDateValue);
    
                if(tbkhuyenmai[i].NGAY_KT === searchDateValue) {
                    // console.log("da vao 003");
                    foundKhuyenMai.push(tbkhuyenmai[i]);
                }
            }
        
            DisplayElementPage(foundKhuyenMai);
            var SLSP_HT = document.querySelector('#SLKM span');
            SLSP_HT.innerText = foundKhuyenMai.length;
        }

    })
    .catch(error => {
      //console.error("Error getting data:", error);
    });
    
}

function add(){

    // Kiểm tra các trường dữ liệu bắt buộc
    var tenKM = $('#TenKM_add').val();
    var dieuKien = $('#Dieu_kien_KM').val();
    var soTienGiam = $('#Tien_giam_KM').val();
    var ngayBD = $('#startDate').val();
    var ngayKT = $('#endDate').val();

    if (tenKM === '' || dieuKien === '' || soTienGiam === '' || ngayBD === '' || ngayKT === '') {
        return;
    }

    // Tiếp tục xử lý logic khi các trường dữ liệu đã được điền đầy đủ
    var data = {
        TEN_KM: tenKM,
        DIEU_KIEN: dieuKien,
        SO_TIEN_GIAM: soTienGiam,
        NGAY_BĐ: ngayBD,
        NGAY_KT: ngayKT,
        TINH_TRANG: "Có hiệu lực"
    };

    var jsonData = JSON.stringify(data);
    var operation = "Create";
    var tableName = "khuyen_mai";
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
            console.log(response);
            location.reload();

        },
        error: function( error) {
            console.log(error);
        }
    });  
}


// -------------------------------------------formation-chức năng phụ------------------------------------------------ //

function getKhuyenMaiData() {
    var operation = "Read";
    var tableName = "khuyen_mai";
    var condition = "";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
          operation: operation,
          tableName: tableName,
          condition: condition,
        },
        success: function (response) {
            //console.log(response);
          resolve(response); // Resolve the promise with the response data
        },
        error: function (error) {
          reject(error); // Reject the promise with the error object
        },
      });
    });
  }
  

function DisplayElementPage(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {

        html += `<tr>
        <td id="KM_MA">${elementPage[i].MA_KM}</td>
        <td id="KM_TEN">${elementPage[i].TEN_KM}</td>
        <td id="KM_DIEU_KIEN">${changePriceToString(elementPage[i].DIEU_KIEN)}</td>
        <td id="KM_SO_TIEN_GIAM">${changePriceToString(elementPage[i].SO_TIEN_GIAM)}</td>
        <td id="KM_NGAY_BAT_DAU">${elementPage[i].NGAY_BĐ}</td>
        <td id="KM_NGAY_KET_THUC">${elementPage[i].NGAY_KT}</td>
        <td id="TRANG_THAI">${elementPage[i].TINH_TRANG}</td>
        <form action="" method="POST" id="dieukien_sua">
            <input type="hidden" name="page" value="page">
            <input type="hidden" name="MAKM_sua" value="${elementPage[i].MA_KM}">
            <td><input type="button" class="KM_sua_btn" id="thaotac_KM" value="sửa" data-index="${i}"></td>
        </form>
        </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    

    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.KM_sua_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_KM = document.getElementById('container_sua_KM');

            // form_sua_KM.querySelector('#TenKM_sua').value = elementPage[index].TEN_KM;
            // form_sua_KM.querySelector('#Dieu_kien_sua').value = changePriceToNormal(elementPage[index].DIEU_KIEN);
            // form_sua_KM.querySelector('#So_tien_giam_sua').value = changePriceToNormal(elementPage[index].SO_TIEN_GIAM);
            // form_sua_KM.querySelector('#startDate_sua').value = elementPage[index].NGAY_BĐ;
            // form_sua_KM.querySelector('#endDate_sua').value = elementPage[index].NGAY_KT;
            // form_sua_KM.querySelector('#TrangThaiKM_sua').value = elementPage[index].TINH_TRANG;
            form_sua_KM.querySelector('#MAKM_sua').value = elementPage[index].MA_KM;
            form_sua_KM.style.display = 'block';
        });
    });
}



//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_SP = document.getElementById('container_sua_KM');
    if(event.target === form_sua_SP){
        form_sua_SP.style.display = 'none';
    }

})

function xacnhan(){

    // Kiểm tra các trường dữ liệu bắt buộc
    var tenKM = $('#TenKM_add').val();
    var dieuKien = $('#Dieu_kien_KM').val();
    var soTienGiam = $('#Tien_giam_KM').val();
    var ngayBD = $('#startDate').val();
    var ngayKT = $('#endDate').val();

    if (tenKM === '' || dieuKien === '' || soTienGiam === '' || ngayBD === '' || ngayKT === '') {
        return;
    }

    // Lấy phần tử chứa form xác nhận
    var container = document.getElementById("container_xac_nhan_them_KM");

    // Lấy nút "Thêm" và gán sự kiện onclick
    var btnThem = document.querySelector(".btn_them_KM");
    btnThem.onclick = function (event) {
        event.preventDefault(); // Ngăn chặn form gửi đi

        // Hiển thị phần tử chứa form xác nhận
        container.style.display = "block";
    };
}

function tatform(){
    // Lấy phần tử chứa form xác nhận
    var container = document.getElementById("container_xac_nhan_them_KM");

    // Lấy nút "cancel" và gán sự kiện onclick
    var btnThem = document.querySelector(".btn_xac_nhan_cancel");
    btnThem.onclick = function (event) {
        event.preventDefault(); // Ngăn chặn form gửi đi

        // ẩn phần tử chứa form xác nhận
        container.style.display = "none";
    };
}

//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_xac_nhan_KM = document.getElementById('container_xac_nhan_them_KM');
    if(event.target === form_xac_nhan_KM){
        form_xac_nhan_KM.style.display = 'none';
    }

})


function changePriceToString(price) {
    var s = "";
    var temp = 0;
    var flag = 0;
    var amountDot = Math.round(price.length / 3);

    if (price.length % 3 == 0) {
        amountDot--;
    }
    for (var i = price.length - 1; i >= 0; i--) {
        temp++;
        if (temp == 3 && flag < amountDot) {
            s = s + price[i] + ".";
            flag++;
            temp = 0;
        }
        else {
            s = s + price[i];
        }
    }
    return s.split("").reverse().join("") + "đ";
}