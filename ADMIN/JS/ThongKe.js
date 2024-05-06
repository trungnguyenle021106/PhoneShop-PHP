
read();



function setDoanhThu(doanhthu) {
    var SLHD_HT = document.querySelector('#SLTK_HT span');
    SLHD_HT.innerText = changePriceToString(doanhthu.toString());
}

function getTopConition() {
    var valueLimit = document.getElementById("txt_timkiem_TK").value;
    if (valueLimit == "") {
      return "";
    } else if (isNaN(valueLimit)) {
      alert("Top chỉ bao gồm số");
      return false;
    } else if (valueLimit == 0) {
      alert("Hãy nhập top khác 0");
      return false;
    } else if (valueLimit < 0) {
      alert("Hãy nhập top lớn hơn 0");
      return false;
    } else {
      condition = "LIMIT " + valueLimit;
      return condition;
    }
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
    condition = " AND hoa_don.NGAY_TAO >= '" + start + "' AND hoa_don.NGAY_TAO <= '" + end + "' ";
    return condition;
}

function getLoaiSPCondition() {
    var opt_Loai = document.getElementById('opt_timkiem_TK').value;
    var condition = "";
    if (opt_Loai == "") {
        return ""
    }
    else {
        condition = "AND loai.MA_LOAI = " + opt_Loai + " ";
        return condition;
    }
}

function read() {

    var limitCondition = getTopConition();
    var dateCondition = getDateCondition();
    var loaiCondition = getLoaiSPCondition();

    if (limitCondition !== false && dateCondition !== false) {
        var operation = "Custom Read";
        var tableName = "san_pham JOIN chi_tiet_hoadon ON san_pham.MA_SP = chi_tiet_hoadon.MA_SP JOIN hoa_don ON chi_tiet_hoadon.MA_HD = hoa_don.MA_HD JOIN loai ON san_pham.MA_LOAI = loai.MA_LOAI ";
        var condition = " hoa_don.TINH_TRANG = 'Đã giao hàng'" + dateCondition + loaiCondition + " GROUP BY san_pham.MA_SP, loai.TEN_LOAI, san_pham.TEN_SP, san_pham.HINH_ANH ORDER BY SL_DA_BAN DESC " + limitCondition;

        var selectCondition = " san_pham.MA_SP, loai.TEN_LOAI, san_pham.TEN_SP, san_pham.HINH_ANH, SUM(chi_tiet_hoadon.SL_BAN) AS SL_DA_BAN, SUM(chi_tiet_hoadon.THANH_TIEN) AS DOANH_THU ";
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                selectCondition: selectCondition,
                tableName: tableName,
                condition: condition
            },
            success: function (response) {
                if (response !== 0) {
                    var listDataArray = response;
                    DisplayHDElement(listDataArray);
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
}


function DisplayHDElement(elementPage) {
    var html = "";
    var doanhthu = 0;
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
            <td>${i + 1}</td>
            <td>${elementPage[i].MA_SP}</td>
            <td style="height:80px; width:80px"><img style="object-fit: contain;   width: 100%; height: 90%;" src="../Img/${elementPage[i].HINH_ANH}" ></td>
            <td>${elementPage[i].TEN_LOAI}</td>
            <td style="width: 250px; word-wrap: break-word;">${elementPage[i].TEN_SP}</td>
            <td>${elementPage[i].SL_DA_BAN}</td>
            <td id="${elementPage[i].MA_SP}">${changePriceToString(elementPage[i].DOANH_THU)}</td>
        </tr>
        `;
        doanhthu += parseInt(elementPage[i].DOANH_THU);
    }

    setDoanhThu(doanhthu)
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;

}

document.getElementById("btn_timkiem_TK").addEventListener('click', function () {
    read()
})

document.getElementById("btn_timTheoKhoangTG").addEventListener('click', function () {
    read()
})

document.getElementById("opt_timkiem_TK").addEventListener('change', (event) => {
    read()
});

document.getElementById('RESET').addEventListener('click', function (event) {

    var operation = "Read";
    var tableName = "hoa_don";
    var condition = "TINH_TRANG = 'Đã giao hàng' ORDER BY NGAY_TAO ASC";
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
           
                var list_opts_search = document.getElementById('opt_timkiem_TK').options;
                list_opts_search[0].selected = true;

                document.getElementById('txt_timkiem_TK').value = "";

                var currentYear = new Date().getFullYear();
                var start = document.getElementById("start")
                var end = document.getElementById("end")
                end.value = currentYear+"-12-31"
                start.value = currentYear+"-01-01"
                read()
            
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
});