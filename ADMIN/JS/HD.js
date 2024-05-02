// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 


listHoaDonJson = [];

//loadData
function read() {
    var operation = "Read";
    var tableName = "hoa_don";
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
            // Sau HDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLHD_HT = document.querySelector('#SLHD_HT span');
            var rows = document.querySelectorAll('#table_HD table tbody tr ');
            SLHD_HT.innerText = rows.length;
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
        <tr><td id="HD_Ma">${elementPage[i].MA_HD}</td>
        <td id="HD_MaKM">${elementPage[i].MA_KM}</td>
        <td id="HD_MaKH">${elementPage[i].MA_KH}</td>
        <td id="HD_MaHD">${elementPage[i].MA_NV}</td>
        <td id="HD_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="HD_NgayTao">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TongTien"><span>${elementPage[i].TONG_TIEN}</span>$</td>`
        if (1 < 2) {
            html += ` <td><button  onclick="XoaHoaDon(${elementPage[i].MA_HD})" class="thaotac">Xóa hóa đơn</button></td>`
        }
        if (elementPage[i].TINH_TRANG != "Đã xử lý") {
            html += `<td><button onclick="XuLyDonHang(${elementPage[i].MA_HD})" class="thaotac">Xử lý hóa đơn</button></td>`
        }
        else {
            html += `<td><button disabled style="cursor: initial; background-color: initial;"  onclick="XuLyDonHang(${elementPage[i].MA_HD})" class="thaotac">Xử lý hóa đơn</button></td>`
        }
        html += `</tr>`;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
}

function AddSerial(maHD) {
    GetChiTietHoaDonForAddSerial(maHD, function (list_cthd) {
        for (var i = 0; i < list_cthd.length; i++) {
            var data = {
                MA_SP: list_cthd[i].MA_SP,
                SERIAL_NUMBER: "CHƯA CÓ SERIAL"
            };

            var jsonData = JSON.stringify(data);
            var operation = "Create";
            var tableName = "serial";
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function (response) {
                    console.log(response)
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
    });
}

function GetChiTietHoaDonForAddSerial(maHD, callback) {
    var operation = "Read";
    var tableName = "chi_tiet_hoadon";
    var condition = "MA_HD =" + maHD;
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
            callback(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function XuLyDonHang(maHD) {
    var data = {
        TINH_TRANG: "Đã xử lý"
    };
    var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "hoa_don";
    var idName = "MA_HD";

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData: jsonData,
            operation: operation,
            tableName: tableName,
            idName: idName,
            idValue: maHD
        },
        success: function (response) {
            AddSerial(maHD);
            read();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function XoaHoaDon(maHD) {
    XoaChiTietDonHangForXoaHoaDon(maHD, function () {
        var operation = "Delete";
        var tableName = "hoa_don";
        var idName = "MA_HD";
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                idName: idName,
                idValue: maHD
            },
            success: function (response) {
                read();
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function XoaChiTietDonHangForXoaHoaDon(maHD, callback) {
    var operation = "Delete";
    var tableName = "chi_tiet_hoadon";
    var idName = "MA_HD";
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            idName: idName,
            idValue: maHD
        },
        success: function (response) {
            callback()
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function getConditionSort(typeSort, valueSort) {
    var condition = ""
    if(typeSort.includes("STR_"))
    {
        typeSort = typeSort.split("STR_")[1];
        typeSort = "LENGTH(" + typeSort + ")";
    }

    if (valueSort == "tăng dần") {
        condition += "ORDER BY " + typeSort + " ASC"
    }
    else {
        condition += "ORDER BY " + typeSort + " DESC"
    }
    return condition;
}

function getCondition(typeSearch, valueSearch, typeSort, valueSort) {
    var condition = ""
    if (valueSearch == "") {
        condition += "1 = 1 ";
        condition += getConditionSort(typeSort, valueSort);
    }
    else {
        condition += typeSearch + " LIKE '%" + valueSearch + "%'";
        condition += getConditionSort(typeSort, valueSort);
    }

    return condition;
}

function Filter(typeSearch, valueSearch, typeSort, valueSort) {
    var operation = "Read";
    var tableName = "hoa_don";
    var condition = getCondition(typeSearch, valueSearch, typeSort, valueSort);
    console.log(condition);
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
            DisplayElementPage(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

//chức năng tìm kiếm
document.getElementById('btn_timkiem_HD').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_HD').value;
    var txt_search = document.getElementById('txt_timkiem_HD').value;
    var opt = document.getElementById('opt_sapxep_HD').value;

    Filter(opt_search, txt_search, opt, "tăng dần");
});
//chức năng tìm kiếm

//chức năng sắp xếp 
document.getElementById('btn_tang').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_HD').value;
    var txt_search = document.getElementById('txt_timkiem_HD').value;
    var opt = document.getElementById('opt_sapxep_HD').value;

    Filter(opt_search, txt_search, opt, "tăng dần");
});


document.getElementById('btn_giam').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_HD').value;
    var txt_search = document.getElementById('txt_timkiem_HD').value;
    var opt = document.getElementById('opt_sapxep_HD').value;

    Filter(opt_search, txt_search, opt, "giảm dần");
});
//chức năng sắp xếp