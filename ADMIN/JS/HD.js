// Gọi hàm read để lấy dữ liệu 
readVer2("tăng dần")
// Gọi hàm read để lấy dữ liệu 

// Biến toàn cục cho chi tiết hóa đơn xử lý
var MAHD = "";
var MAKH = "";
// Biến toàn cục cho chi tiết hóa đơn xử lý

//Xử lý đọc dữ liệu từ database
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
//Xử lý đọc dữ liệu từ database



// Xử lý giao diện cho chi tiết hóa đơn
function DisplayBackButton() {
    document.getElementById("btn_back").style.display = "block";
    document.getElementById("top_contentHD").style.display = "none";
    document.getElementById("btn_back").addEventListener('click', function (event) {
        ResetDate();
        readVer2("tăng dần");
    });
}

function setUIXuLyDonHangCTHD(flag) {
    if (flag == true) {
        document.getElementById("XuLyDonHang").style.display = "block"
    }
    else if (flag == false) {
        document.getElementById("XuLyDonHang").style.display = "none"
    }
}


function setUIKH_XULYHD() {
    document.getElementById("KH_XULYHD").style.display = "block"
    document.getElementById("scroll-container").classList.add("scroll-container-CTHD")
}

function setOptionXLDH(flag) {
    var selectElement = document.getElementById("opt_TT_HD");
    var options = selectElement.options;

    if (flag == true) {
        options[0].style.display = "none";
        options[1].selected = true;
    }
    else {
        options[0].style.display = "block";
        options[0].selected = true;
    }
}

function setTTHD_KH(maHD) {
    var operation = "Custom Read";
    var tableName = " hoa_don JOIN khach_hang ON hoa_don.MA_KH = khach_hang.MA_KH ";
    var condition = " hoa_don.MA_HD =" + maHD;
    var selectCondition = "khach_hang.MA_KH, khach_hang.HOTEN_KH, khach_hang.SO_DT, hoa_don.TINH_TRANG "

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
            MAKH = response[0].MA_KH
            document.getElementById("tenKH").innerText = response[0].HOTEN_KH;
            document.getElementById("sdtKH").innerText = response[0].SO_DT;
            document.getElementById("TTDH").innerText = response[0].TINH_TRANG;


            if (searchChucNang("Sửa Hóa Đơn") == true) {
                if (response[0].TINH_TRANG == "Đã giao hàng" || response[0].TINH_TRANG == "Hủy đơn hàng") {
                    setUIXuLyDonHangCTHD(false);
                    setUIKH_XULYHD();
                }
                else if (response[0].TINH_TRANG == "Đã liên lạc") {
                    setUIXuLyDonHangCTHD(true);
                    setUIKH_XULYHD();
                    setOptionXLDH(true);
                }
                else {
                    setUIXuLyDonHangCTHD(true);
                    setOptionXLDH(false);
                }
            }
            else{
                setUIXuLyDonHangCTHD(false);
                setUIKH_XULYHD();
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
        <td >${elementPage[i].MA_HD}</td>
        <td >${elementPage[i].MA_SP}</td>
        <td style="width: 250px; word-wrap: break-word;" >${elementPage[i].TEN_SP}</td>
        <td >${elementPage[i].SL_BAN}</td>
        <td ><span>${changePriceToString(elementPage[i].THANH_TIEN)}</span></td>
        <td ><span>${changePriceToString(elementPage[i].THUE_SUAT)}</span></td>
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
// Xử lý giao diện cho chi tiết hóa đơn


// Xử lý giao diện cho hóa đơn
function setAmountHD() {
    var SLHD_HT = document.querySelector('#SLHD_HT span');
    var rows = document.querySelectorAll('#table_HD table tbody tr ');
    SLHD_HT.innerText = rows.length;
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
        <td >${elementPage[i].MA_KM}</td>
        <td >${elementPage[i].MA_KH}</td>
        <td >${elementPage[i].MA_NV}</td>
        <td >${elementPage[i].NGAY_TAO}</td>
        <td ><span> ${changePriceToString(elementPage[i].TONG_TIEN)}</span></td>
        <td >${elementPage[i].TINH_TRANG}</td>`
        html += `<td><button onclick=" DisplayCTHDElement(${elementPage[i].MA_HD})" class="thaotac">Xem chi tiết hóa đơn</button></td>`
        html += `</tr>`;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    setAmountHD();
}

function setUIElementHD() {
    document.getElementById("btn_back").style.display = "none";
    document.getElementById("top_contentHD").style.display = "flex";
    document.getElementById("KH_XULYHD").style.display = "none"
    document.getElementById("scroll-container").classList.remove("scroll-container-CTHD")
}
// Xử lý giao diện cho hóa đơn


//Xử lý tình trạng hóa đơn
function AddSerial(maHD) {
    GetChiTietHoaDon(maHD, function (list_cthd) {
        var data = {};
        var column = {
            column1: "MA_SP",
            column2: "SERIAL_NUMBER"
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
                AddPBH(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function AddPBH(response) {
    var data = {};
    var column = {
        column1: "MA_SERIAL",
        column2: "MA_KH",
        column3: "THOI_GIAN_BAOHANH",
        column4: "TINH_TRANG"
    };
    for (var i = 0; i < response.length; i++) {
        data[i] = [response[i].MA_SERIAL, MAKH, "0", "Chưa có hiệu lực"]
    }


    var jsonData = JSON.stringify(data);
    var jsonColumn = JSON.stringify(column);
    var operation = "Create Custom";
    var tableName = "phieu_bao_hanh";

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
            // console.log(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

}

function HuyDonHang(maHD) {
    GetChiTietHoaDon(maHD, function (list_cthd) {
        var operation = "Update SL";

        var data = {};
        for (var i = 0; i < list_cthd.length; i++) {
            data[list_cthd[i].MA_SP] = list_cthd[i].SL_BAN;
        }
        var jsonData = JSON.stringify(data);

        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                jsonData: jsonData,
                operation: operation,
                operator: "+"
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
    else if (tinhtrang == "Hủy đơn hàng") {
        HuyDonHang(maHD);
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
//Xử lý tình trạng hóa đơn


//Xử lý sự kiện nút cho hóa đơn
document.getElementById('btn_timkiem_HD').addEventListener('click', function (event) {
    event.preventDefault();

    readVer2("tăng dần")
});

document.getElementById('btn_tang').addEventListener('click', function (event) {
    event.preventDefault();

    readVer2("tăng dần")
});

document.getElementById('btn_giam').addEventListener('click', function (event) {
    event.preventDefault();
    readVer2("giảm dần")
});

document.getElementById('btn_timTheoKhoangTG').addEventListener('click', function (event) {
    event.preventDefault();
    readVer2("tăng dần")
});

document.getElementById('RESET').addEventListener('click', function (event) {
    ResetDate()
    var list_opts_search = document.getElementById('opt_timkiem_HD').options;
    list_opts_search[0].selected = true;
    var list_optsx = document.getElementById('opt_sapxep_HD').options;
    list_optsx[0].selected = true;
    document.getElementById('txt_timkiem_HD').value = "";

    readVer2("tăng dần");

});

//Xử lý sự kiện nút cho hóa đơn

//Xử lý sự kiện nút cho chi tiết hóa đơn
document.getElementById("UpdateDH").addEventListener('click', function (event) {
    var result = confirm("Bạn có chắc chắn muốn thay đổi tình trạng đơn hàng?");
    if (result === true) {
        XuLyDonHang();
    }
});
//Xử lý sự kiện nút cho chi tiết hóa đơn



//Thiết lập về ngày mặc định
function ResetDate() {
    var currentYear = new Date().getFullYear();
    var start = document.getElementById("start")
    var end = document.getElementById("end")
    end.value = currentYear + "-12-31"
    start.value = currentYear + "-01-01"
}
//Thiết lập về ngày mặc định