// Gọi hàm read để lấy dữ liệu 
readVer2("tăng dần")
// Gọi hàm read để lấy dữ liệu 


var MAHD = "";

//loadData
function getSearchNormalCondition() {
    var condition = "";
    var seacrhType = document.getElementById("opt_timkiem_HD").value;
    var searchValue = document.getElementById("txt_timkiem_HD").value;

    if (searchValue != "") {
        condition = seacrhType + " LIKE '%" + searchValue + "%' AND ";
    }
    else {
        condition = "1=1 AND "
    }
    return condition;
}

function getDateCondition() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;

    var condition = "";

    if (start == "" || end == "") {
        alert("Không bỏ trống ngày bắt đầu hoặc kết thúc")
        return false;
    }
    else if (start > end) {
        alert("Ngày bắt đầu không lớn hơn ngày kết thúc");
        return false;
    }
    condition = "hoa_don.NGAY_TAO >= '" + start + "' AND hoa_don.NGAY_TAO <= '" + end + "' ";
    return condition;

}

function getSortCondition(sortValue) {
    var typeSort = document.getElementById("opt_sapxep_HD").value;

    var condition = ""
    if (typeSort.includes("STR_")) {
        typeSort = typeSort.split("STR_")[1];
        typeSort = "LENGTH(" + typeSort + ")";
    }

    if (sortValue == "tăng dần") {
        condition += "ORDER BY " + typeSort + " ASC"
    }
    else {
        condition += " ORDER BY " + typeSort + " DESC"
    }
    return condition;

}

function readVer2(sortValue) {
    var operation = "Read";
    var tableName = "hoa_don";

    var searchCondition = getSearchNormalCondition();
    var dateCondition = getDateCondition();
    var sortCondition = getSortCondition(sortValue);

    if (dateCondition !== false) {
        var condition = searchCondition + dateCondition + sortCondition;
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
                setUIElementHD()
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
}


//loadData

// -------------------------------------------formation-chức năng phụ------------------------------------------------ //

function setAmountHD() {
    var SLHD_HT = document.querySelector('#SLHD_HT span');
    var rows = document.querySelectorAll('#table_HD table tbody tr ');
    SLHD_HT.innerText = rows.length;
}

function DisplayBackButton() {
    document.getElementById("btn_back").style.display = "block";
    document.getElementById("top_contentHD").style.display = "none";
    document.getElementById("btn_back").addEventListener('click', function (event) {
        ResetDate();
        readVer2("tăng dần");
    });
}

function setUIElementHD() {
    document.getElementById("btn_back").style.display = "none";
    document.getElementById("top_contentHD").style.display = "flex";
    document.getElementById("KH_XULYHD").style.display = "none"
    document.getElementById("scroll-container").classList.remove("scroll-container-CTHD")
}

function setUIElementCTHD(flag) {
    if (flag == true) {
        document.getElementById("KH_XULYHD").style.display = "block"
        document.getElementById("XuLyDonHang").style.display = "block"
        document.getElementById("scroll-container").classList.add("scroll-container-CTHD")
    }
    else if (flag == false) {
        document.getElementById("KH_XULYHD").style.display = "block"
        document.getElementById("XuLyDonHang").style.display = "none"
        document.getElementById("scroll-container").classList.add("scroll-container-CTHD")
    }
}

function setTTHD_KH(maHD) {
    var operation = "Custom Read";
    var tableName = " hoa_don JOIN khach_hang ON hoa_don.MA_KH = khach_hang.MA_KH ";
    var condition = " hoa_don.MA_HD =" + maHD;
    var selectCondition = " khach_hang.HOTEN_KH, khach_hang.SO_DT, hoa_don.TINH_TRANG "

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition,
            selectCondition: selectCondition
        },
        success: function (response) {

            document.getElementById("tenKH").innerText = response[0].HOTEN_KH;
            document.getElementById("sdtKH").innerText = response[0].SO_DT;
            document.getElementById("TTDH").innerText = response[0].TINH_TRANG;

            if (response[0].TINH_TRANG == "Đã giao hàng" || response[0].TINH_TRANG == "Hủy đơn hàng") {
                setUIElementCTHD(false);
            }
            else {
                setUIElementCTHD(true);
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function DisplayHeadTableCTHD() {
    var html = "<tr>\
    <td>Mã hóa đơn</td>\
    <td>Mã sản phẩm</td>\
    <td>Tên sản phẩm</td>\
    <td>Số lượng</td>\
    <td>Thành tiền</td>\
    <td>Thuế suất</td>\
</tr>";

    var headTable = document.getElementById("head_table");
    headTable.innerHTML = html;
}

function DisplayCTHDElement(maHD) {

    setTTHD_KH(maHD)
    MAHD = maHD;
    var operation = "Custom Read";
    var tableName = "san_pham JOIN chi_tiet_hoadon ON san_pham.MA_SP = chi_tiet_hoadon.MA_SP";
    var condition = "MA_HD = " + maHD;

    var selectCondition = "chi_tiet_hoadon.*, san_pham.TEN_SP "
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition,
            selectCondition: selectCondition
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
        <td id="MASP">${elementPage[i].TEN_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien"><span>${changePriceToString(elementPage[i].THANH_TIEN)}</span></td>
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
    <td>Ngày tạo</td>\
    <td>Tổng tiền</td>\
    <td>Tình trạng</td>\
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
        <td id="HD_NgayTao">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TongTien"><span> ${changePriceToString(elementPage[i].TONG_TIEN)}</span></td>
        <td id="HD_TinhTrang">${elementPage[i].TINH_TRANG}</td>`
        html += `<td><button onclick=" DisplayCTHDElement(${elementPage[i].MA_HD})" class="thaotac">Xem chi tiết hóa đơn</button></td>`
        html += `</tr>`;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    setAmountHD();
}

function AddSerial(maHD) {
    GetChiTietHoaDon(maHD, function (list_cthd) {
        var data = {};
        var column = {
            "column1": "MA_SP",
            "column2": "SERIAL_NUMBER"
        };
        for (var i = 0; i < list_cthd.length; i++) {
            data[i] = [list_cthd[i].MA_SP, "CHƯA CÓ SERIAL"]
        }

        var jsonData = JSON.stringify(data);
        var jsonColumn = JSON.stringify(column);
        var operation = "Create Custom";
        var tableName = "serial";

        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                jsonData: jsonData,
                jsonColumn: jsonColumn,
                operation: operation,
                tableName: tableName
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function GetChiTietHoaDon(maHD, callback) {
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

function XuLyDonHang() {
    var maHD = MAHD;
    var tinhtrang = document.getElementById("opt_TT_HD").value;
    var data = {
        TINH_TRANG: tinhtrang
    };

    if (tinhtrang == "Đã giao hàng") {
        AddSerial(maHD);
    }

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
            setTTHD_KH(maHD)
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}



//chức năng tìm kiếm
document.getElementById('btn_timkiem_HD').addEventListener('click', function (event) {
    event.preventDefault();

    readVer2("tăng dần")
});
//chức năng tìm kiếm

//chức năng sắp xếp 
document.getElementById('btn_tang').addEventListener('click', function (event) {
    event.preventDefault();

    readVer2("tăng dần")
});


document.getElementById('btn_giam').addEventListener('click', function (event) {
    event.preventDefault();
    readVer2("giảm dần")
});
//chức năng sắp xếp


document.getElementById('btn_timTheoKhoangTG').addEventListener('click', function (event) {
    event.preventDefault();
    readVer2("tăng dần")
});

document.getElementById("UpdateDH").addEventListener('click', function (event) {
    var result = confirm("Bạn có chắc chắn muốn thay đổi tình trạng đơn hàng?");
    if (result === true) {
        XuLyDonHang();
    }
});

document.getElementById('RESET').addEventListener('click', function (event) {
    ResetDate(function () {
        var list_opts_search = document.getElementById('opt_timkiem_HD').options;
        list_opts_search[0].selected = true;
        var list_optsx = document.getElementById('opt_sapxep_HD').options;
        list_optsx[0].selected = true;
        document.getElementById('txt_timkiem_HD').value = "";

        readVer2("tăng dần");
    })
});




function ResetDate(callback) {
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
            var start = document.getElementById("start")
            var end = document.getElementById("end")
            end.value = response[response.length - 1].NGAY_TAO
            start.value = response[0].NGAY_TAO
            callback();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}