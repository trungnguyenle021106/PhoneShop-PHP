// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



//loadData
function read() {
    var operation = "Read";
    var tableName = "chi_tiet_hoadon";
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
        success: function (response) {

            // Sau CTHDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLCTHD_HT = document.querySelector('#SLCTHD_HT span');
            var rows = document.querySelectorAll('#table_CTHD table tbody tr ');
            SLCTHD_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function (xhr, status, error) {
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
        <td id="MAHD">${elementPage[i].MA_HD}</td>
        <td id="MASP">${elementPage[i].MA_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien"><span>${elementPage[i].THANH_TIEN}</span>$</td>
        <td id="ThueSuat"><span>${elementPage[i].THUE_SUAT}</span>%</td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
}




//chức năng tìm kiếm
document.getElementById('btn_timkiem_CTHD').addEventListener('click', function (event) {
    event.preventDefault();
    var opt = document.getElementById('opt_timkiem_CTHD').value;
    var txt = document.getElementById('txt_timkiem_CTHD').value;
    var rows = document.querySelectorAll('#table_CTHD table tbody tr');

    for (var i = 0; i < rows.length; i++) {
        if (opt === 'MACTHD') {
            if (txt === '') {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
                }
            }
            else {
                var MACTHD = rows[i].querySelector('#MAHD').innerText;

                if (MACTHD.includes(txt)) {
                    rows[i].style.display = 'table-row';
                }
                else {
                    rows[i].style.display = 'none';
                }
            }
        }

        else if (opt === 'MASP') {
            if (txt === '') {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
                }
            }
            else {
                var MaCTHD = rows[i].querySelector('#MASP').innerText;
                if (MaCTHD.includes(txt)) {
                    rows[i].style.display = 'table-row';
                }
                else {
                    rows[i].style.display = 'none';
                }
            }
        }
        else if (opt === 'Số lượng') {

            if (txt === '') {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
                }
            }
            else {
                var MaCTHD = rows[i].querySelector('#SL').innerText;
                if (MaCTHD.includes(txt)) {
                    rows[i].style.display = 'table-row';
                }
                else {
                    rows[i].style.display = 'none';
                }
            }
        }

        else if (opt === 'Thành tiền') {

            if (txt === '') {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
                }
            }
            else {
                var MaCTHD = rows[i].querySelector('#ThanhTien span').innerText;
                if (MaCTHD.includes(txt)) {
                    rows[i].style.display = 'table-row';
                }
                else {
                    rows[i].style.display = 'none';
                }
            }
        }



    }
});
//chức năng tìm kiếm