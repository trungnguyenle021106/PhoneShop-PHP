// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 




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

            DisplayHDElement(response);

            setAmountHD();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}
//loadData

// -------------------------------------------formation-chức năng phụ------------------------------------------------ //

function setAmountHD()
{
    var SLHD_HT = document.querySelector('#SLHD_HT span');
    var rows = document.querySelectorAll('#table_HD table tbody tr ');
    SLHD_HT.innerText = rows.length;
}

function DisplayBackButton()
{
    document.getElementById("btn_back").style.display  = "block";
    document.getElementById("top_contentHD").style.display  = "none";
    document.getElementById("btn_back").addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById("btn_back").style.display  = "none";
        document.getElementById("top_contentHD").style.display  = "flex";
        Filter("tăng dần");
    });
}

function DisplayHeadTableCTHD() {
    var html = "<tr>\
    <td>Mã hóa đơn</td>\
    <td>Mã sản phẩm</td>\
    <td>Số lượng</td>\
    <td>Thành tiền</td>\
    <td>Thuế suất</td>\
</tr>";

    var headTable = document.getElementById("head_table");
    headTable.innerHTML = html;
}


function DisplayCTHDElement(maHD) {
    var operation = "Read";
    var tableName = "chi_tiet_hoadon";
    var condition = "MA_HD = " + maHD;
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
            DisplayBackButton()
            DisplayHeadTableCTHD()
            elementPage = response;
            var html = "";
            for (var i = 0; i < elementPage.length; i++) {
                html += `
        <tr>
        <td id="MAHD">${elementPage[i].MA_HD}</td>
        <td id="MASP">${elementPage[i].MA_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien"><span>${ changePriceToString(elementPage[i].THANH_TIEN)}</span></td>
        <td id="ThueSuat"><span>${changePriceToString(elementPage[i].THUE_SUAT)}</span></td>
       </tr>
        `;
            }

            var tbody = document.getElementById("data");
            tbody.innerHTML = html;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function DisplayHeadTableHD() {
    var html = "<tr>\
    <td>Mã hóa đơn</td>\
    <td>Mã khuyến mãi</td>\
    <td>Mã khách hàng</td>\
    <td>Mã nhân viên</td>\
    <td>Tình trạng</td>\
    <td>Ngày tạo</td>\
    <td>Tổng tiền</td>\
    <td colspan=\"3\">Thao tác</td>\
    </tr>";

    var headTable = document.getElementById("head_table");
    headTable.innerHTML = html;
}

function DisplayHDElement(elementPage) {
    DisplayHeadTableHD();

    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr><td id="HD_Ma">${elementPage[i].MA_HD}</td>
        <td id="HD_MaKM">${elementPage[i].MA_KM}</td>
        <td id="HD_MaKH">${elementPage[i].MA_KH}</td>
        <td id="HD_MaHD">${elementPage[i].MA_NV}</td>
        <td id="HD_TinhTrang">${elementPage[i].TINH_TRANG}</td>
        <td id="HD_NgayTao">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TongTien"><span> ${changePriceToString(elementPage[i].TONG_TIEN)}</span></td>`
        if (1 < 2) {
            html += ` <td><button  onclick="XoaHoaDon(${elementPage[i].MA_HD})" class="thaotac">Xóa hóa đơn</button></td>`
        }
        if (elementPage[i].TINH_TRANG != "Đã xử lý") {
            html += `<td><button onclick="XuLyDonHang(${elementPage[i].MA_HD})" class="thaotac">Xử lý hóa đơn</button></td>`
        }
        else {
            html += `<td><button disabled style="cursor: initial; background-color: initial;"  onclick="XuLyDonHang(${elementPage[i].MA_HD})" class="thaotac">Xử lý hóa đơn</button></td>`
        }
        html += `<td><button onclick=" DisplayCTHDElement(${elementPage[i].MA_HD})" class="thaotac">Xem chi tiết hóa đơn</button></td>`
        html += `</tr>`;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    setAmountHD();
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
    if (typeSort.includes("STR_")) {
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

function getConditionInTime(startDay, endDay) {
    var condition = "AND NGAY_TAO >= '" + startDay + "' ";
    condition += " AND NGAY_TAO <= '" + endDay + "' ";
    return condition;
}

function getCondition(typeSearch, valueSearch, typeSort, valueSort, startDay, endDay) {
    var condition = ""
    if (valueSearch == "") {
        condition += "1 = 1 ";
        condition += getConditionInTime(startDay, endDay) + getConditionSort(typeSort, valueSort);
    }
    else {
        condition += typeSearch + " LIKE '%" + valueSearch + "%'";
        condition += getConditionInTime(startDay, endDay) + getConditionSort(typeSort, valueSort);
    }

    return condition;
}

function Filter(valueSort) {

    var opt_search = document.getElementById('opt_timkiem_HD').value;
    var txt_search = document.getElementById('txt_timkiem_HD').value;
    var optsx = document.getElementById('opt_sapxep_HD').value;
    var start = document.getElementById("start").value
    var end = document.getElementById("end").value

    if(document.getElementById("btn_back").style.display  != "none");
    {
        document.getElementById("btn_back").style.display  = "none";
        document.getElementById("top_contentHD").style.display  = "flex";
    }
    

    if (compareDay(start, end) == false) {
        return;
    }
    var operation = "Read";
    var tableName = "hoa_don";
    var condition = getCondition(opt_search, txt_search, optsx, valueSort, start, end);
    console.log(condition)
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
            DisplayHDElement(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

//chức năng tìm kiếm
document.getElementById('btn_timkiem_HD').addEventListener('click', function (event) {
    event.preventDefault();

    Filter("tăng dần")
});
//chức năng tìm kiếm

//chức năng sắp xếp 
document.getElementById('btn_tang').addEventListener('click', function (event) {
    event.preventDefault();

    Filter("tăng dần")
});


document.getElementById('btn_giam').addEventListener('click', function (event) {
    event.preventDefault();
    Filter("giảm dần")
});
//chức năng sắp xếp

function compareDay(startDay, endDay) {
    var start = new Date(startDay);
    var end = new Date(endDay);

    if (start == "Invalid Date" || end == "Invalid Date") {
        alert("Không bỏ trống ngày bắt đầu hoặc kết thúc")
        return false;
    }

    if (start > end) {

        alert("Ngày bắt đầu không lớn hơn ngày kết thúc")
        return false;
    }
    return true;
}

document.getElementById('btn_timTheoKhoangTG').addEventListener('click', function (event) {
    event.preventDefault();
    Filter("tăng dần")
});

document.getElementById('RESET').addEventListener('click', function (event) {
    event.preventDefault();

    var operation = "Read";
    var tableName = "hoa_don";
    var condition = "1=1 ORDER BY NGAY_TAO ASC";
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
            var list_opts_search = document.getElementById('opt_timkiem_HD').options;
            list_opts_search[0].selected = true;
            var list_optsx = document.getElementById('opt_sapxep_HD').options;
            list_optsx[0].selected = true;
        
            document.getElementById('txt_timkiem_HD').value = "";
        
            var start = document.getElementById("start")
            var end = document.getElementById("end")
            end.value = response[response.length - 1].NGAY_TAO
            start.value = response[0].NGAY_TAO

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
});