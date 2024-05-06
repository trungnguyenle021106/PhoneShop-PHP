// Gọi hàm read để lấy dữ liệu 
readVer2()
// Gọi hàm read để lấy dữ liệu 

var NGAY_BAT_DAU = ""
var MA_PBH = "";
//loadData
function readVer2() {
    var operation = "Custom Read";
    var tableName = " serial JOIN phieu_bao_hanh ON serial.MA_SERIAL = phieu_bao_hanh.MA_SERIAL";
    var condition = getSearchNormalCondition();
    var selectCondition = " serial.SERIAL_NUMBER, phieu_bao_hanh.* "


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
            DisplayPBHElementPage(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

}
//loadData

// -------------------------------------------formation-chức năng phụ------------------------------------------------ //




function getSearchNormalCondition() {
    var condition = "";
    var seacrhType = document.getElementById("opt_timkiem_PBH").value;
    var searchValue = document.getElementById("txt_timkiem_PBH").value;

    if (searchValue != "") {
        condition = seacrhType + " LIKE '%" + searchValue + "%' ";
    }
    else {
        condition = "1=1 "
    }
    return condition;
}



function DisplayPBHElementPage(elementPage) {
    setUIPBH();
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="PBH_MAPBH">${elementPage[i].MA_PBH}</td>
        <td id="PBH_SERIAL">${elementPage[i].MA_SERIAL}</td>
        <td id="PBH_SERIAL">${elementPage[i].SERIAL_NUMBER}</td>
        <td id="PBH_MAKH">${elementPage[i].MA_KH}</td>
        <td id="PBH_start_day">${elementPage[i].NGAY_BAT_DAU}</td>
        <td id="PBH_end_day">${elementPage[i].NGAY_HET_HAN}</td>
        <td id="PBH_thoigian">${elementPage[i].THOI_GIAN_BAOHANH} tháng</td>
        <td id="PBH_thoigian">${elementPage[i].TINH_TRANG}</td>
           <td><input type="button" onclick="readCTBH(${elementPage[i].MA_KH},${elementPage[i].MA_SERIAL})" class="thaotac" value="xem chi tiết"></td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
}

function BackButton() {
    document.getElementById("btn_back").addEventListener('click', function (event) {
        readVer2()
    });
}

function setUIPBH() {

    var table = document.getElementById("table_PBH");
    table.innerHTML = getUIHeadPBH() + getUIContentPBH();

}

function setUICTPBH(data) {

    var tenKH = data[0].HOTEN_KH;
    var soDT = data[0].SO_DT;
    var soSerial = data[0].SERIAL_NUMBER;
    var tenSP = data[0].TEN_SP
    var TGBH = data[0].THOI_GIAN_BAOHANH;
    var TINH_TRANG = data[0].TINH_TRANG;



    var table = document.getElementById("table_PBH");
    table.innerHTML = getUIHeadCTPBH() + getUIContentCTPBH(tenKH, soDT, soSerial, tenSP, TGBH, TINH_TRANG);
    BackButton();
}

function getUIHeadPBH() {
    var html = ' <div style="display: flex;" id="SLPBH_HT"> <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLPBH_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>' +
        '<h2 style="margin-left: 230px;">Danh sách phiếu bảo hành</h2>   </div>';
    return html;
}

function getUIHeadCTPBH() {
    var html = '  <div style="display: flex;" id="SLPBH_HT"> <button id="btn_back" style=" cursor:pointer; font-size:20px ; margin:5px 0px; margin-left:10px; background-color:white">Trở về phiếu bảo hành</button>   </div>';
    return html;
}

function getUIContentPBH() {
    var html = '<div id="scroll-container">' +
        '<table>' +
        '<thead style="background-color: #746d6d11; font-weight: bold;">' +
        '<tr>' +
        '<td>Mã phiếu bảo hành</td>' +
        '<td>Mã Serial</td>' +
        '<td>Số Serial</td>' +
        '<td>Mã khách hàng</td>' +
        '<td>Ngày bắt đầu</td>' +
        '<td>Ngày kết thúc</td>' +
        '<td>Thời gian bảo hành</td>' +
        '<td>Tình trạng</td>' +
        '<td>Thao tác</td>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="data">' +
        '</tbody>' +
        '</table>' +
        '</div>';
    return html;
}

function getUIContentCTPBH(tenKH, SdtKH, soSerial, tenSP, TGBH, TT) {
    var html = '<div id="form_sapxep_PBH" style="margin:0px auto">' +
        '<h2 style="margin-top: 10px; text-align: center;">Chi tiết phiếu bảo hành</h2>' +
        '<div style="width: 100%; display:flex; font-size:20px">' +
        '<div style="width: 55%;">' +
        '<span>Tên khách hàng</span>' +
        '</div>' +
        '<div style="width: 45%;">' +
        '<span>' + tenKH + '</span>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%; display:flex; font-size:20px; margin-top:10px">' +
        '<div style="width: 55%;">' +
        '<span>Số điện thoại khách hàng</span>' +
        '</div>' +
        '<div style="width: 45%;">' +
        '<span>' + SdtKH + '</span>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%; display:flex; font-size:20px; margin-top:10px">' +
        '<div style="width: 55%;">' +
        '<span>Số serial</span>' +
        '</div>' +
        '<div style="width: 40%; word-wrap: break-word;">' +
        '<span>' + soSerial + '</span>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%; display:flex; font-size:20px; margin-top:10px">' +
        '<div style="width: 55%;">' +
        '<span>Tên sản phẩm</span>' +
        '</div>' +
        '<div style="width: 40%; word-wrap: break-word;">' +
        '<span>' + tenSP + '</span>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%; display:flex; font-size:20px; margin-top:10px">' +
        '<div style="width: 55%;">' +
        '<span>Thời gian bảo hành</span>' +
        '</div>' +
        '<div style="width: 45%;">'
    if (checkCTPBH(TGBH, TT) !== "btn_TL") {
        html += '<span>' + TGBH + ' tháng</span>';
    }
    else {
        html += '<select style="font-size:20px"  id="opt_thang">' +
            '<option value="1">1 tháng</option>' +
            '<option value="3">3 tháng</option>' +
            '<option value="6">6 tháng</option>' +
            '<option value="12">12 tháng</option>' +
            ' <option value="18">18 tháng</option>' +
            '<option value="24">24 tháng</option>' +
            '<option value="36">36 tháng</option>' +
            ' </select>'
    }
    html +=
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%; display:flex; font-size:20px; margin-top:10px">' +
        '<div style="width: 55%;">' +
        '<span>Tình trạng bảo hành</span>' +
        '</div>' +
        '<div style="width: 45%;">' +
        '<span>' + TT + '</span>' +
        '</div>' +
        '</div>'
    if (checkCTPBH(TGBH, TT) == "btn_TL") {
        html += '<hr>' +
            '<div style="width: 100%; height:40px; display:flex;margin-top:20px; ">' +
            '<div style="width: 50%; margin:0px auto">' +
            '<button id="btn_TL" style="width: 100%; height:100%; font-size:20px; cursor:pointer">Thiết lập bảo hành</button>' +
            '</div>' +
            '</div>' +
            '</div>';
            setBTN_TL();
    }
    else if (checkCTPBH(TGBH, TT) == "") {
        html += '<hr>' +
            '<div style="width: 100%; height:40px; display:flex;margin-top:20px; ">' +
            '<div style="width: 50%; margin:0px auto">' +
            '<button id="btn_GHBH" style="width: 100%; height:100%; font-size:20px; cursor:pointer">Gia hạn bảo hành</button>' +
            '</div>' +
            '<div style="width: 50%; margin:0px auto">' +
            '<button id="btn_KTBH" style="width: 100%; height:100%; font-size:20px; cursor:pointer">Kết thúc bảo hành</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    return html;
    // Thực hiện các thao tác tiếp theo với chuỗi HTML đã được tạo ra
}



function checkCTPBH(TGBH, TT) {
    if (TGBH == 0) {
        return "btn_TL";
    }
    else if (TT == "Hết hạn bảo hành") {
        return "btn_GH"
    }
    return "";
}

function readCTBH(maKH, maSerial) {
    var operation = "Custom Read";
    var tableName = "phieu_bao_hanh JOIN khach_hang ON phieu_bao_hanh.MA_KH = khach_hang.MA_KH JOIN serial ON phieu_bao_hanh.MA_SERIAL = serial.MA_SERIAL JOIN san_pham ON serial.MA_SP = san_pham.MA_SP ";
    var condition = "phieu_bao_hanh.MA_KH = " + maKH + " AND phieu_bao_hanh.MA_SERIAL = " + maSerial + " ";
    var selectCondition = " phieu_bao_hanh.NGAY_BAT_DAU,phieu_bao_hanh.THOI_GIAN_BAOHANH, phieu_bao_hanh.TINH_TRANG, san_pham.TEN_SP, khach_hang.HOTEN_KH, khach_hang.SO_DT, serial.SERIAL_NUMBER "

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
            setUICTPBH(response)
            NGAY_BAT_DAU = response[i].NGAY_BAT_DAU;
            MA_PBH = response[i].MA_PBH;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

}

//chức năng tìm kiếm
// var khoang = document.querySelector('.khoang');
function setBTN_TL()
{
    document.getElementById('btn_TL').addEventListener('click', function (event) {
        var result = confirm("Bạn có chắc chắn muốn lập phiếu bảo hành");
        if (result) {
            var TGBH = document.getElementById("opt_thang").value;
            var date = NGAY_BAT_DAU.split("-");
            var NGAY_HET_HAN = new Date(date[0], date[1] + TGBH, date[2]).toISOString().slice(0, 10);
    
            var data = {
                THOI_GIAN_BAOHANH: TGBH,
                NGAY_HET_HAN: NGAY_HET_HAN
            };
            var jsonData = JSON.stringify(data);
            var operation = "Update";
            var tableName = "phieu_bao_hanh";
            var idName = "MA_PBH";
            var idValue = MA_PBH;
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: operation,
                    tableName: tableName,
                    idName: idName,
                    idValue: idValue
                },
                success: function (response) {
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
    });
    
}


document.getElementById('btn_GHBH').addEventListener('click', function (event) {

});

document.getElementById('btn_KTBH').addEventListener('click', function (event) {

});

CapNhatTinhTrangBaoHanh();
function CapNhatTinhTrangBaoHanh() {
    var months = 3;
    var currentDate = new Date();
    var curday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString().slice(0, 10);
    var futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + months, currentDate.getDate()).toISOString().slice(0, 10);

    var data = {
        THOI_GIAN_BAOHANH: months,
        NGAY_BAT_DAU: curday,
        NGAY_HET_HAN: futureDate
    };


    var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "phieu_bao_hanh";
    var idName = "MA_PBH";
    var idValue = 1;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData: jsonData,
            operation: operation,
            tableName: tableName,
            idName: idName,
            idValue: idValue
        },
        success: function (response) {
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}


//chức năng tìm kiếm
