// Gọi hàm read để lấy dữ liệu 
readVer3("tăng dần");
// Gọi hàm read để lấy dữ liệu 



//loadData
function readVer3(sortValue) {
    var operation = "Custom Read";
    var tableName = " chi_tiet_hoadon JOIN san_pham ON chi_tiet_hoadon.MA_SP = san_pham.MA_SP ";

    var searchCondition = getSearchNormalCondition();
    var sortCondition = getSortCondition(sortValue);
    var condition = " " + searchCondition + sortCondition + " ";

    var selectCondition = " chi_tiet_hoadon.*, san_pham.TEN_SP "

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
            DisplayCTHDElement(response);
            setAmountCTHD();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}



//loadData

// -------------------------------------------formation-chức năng phụ------------------------------------------------ //

function setAmountCTHD() {
    var SLCTHD_HT = document.querySelector('#SLCTHD_HT span');
    var rows = document.querySelectorAll('#table_CTHD table tbody tr ');
    SLCTHD_HT.innerText = rows.length;
}


function getSearchNormalCondition() {
    var condition = "";
    var seacrhType = document.getElementById("opt_timkiem_CTHD").value;
    var searchValue = document.getElementById("txt_timkiem_CTHD").value;


    if (searchValue != "") {
        condition = seacrhType + " LIKE '%" + searchValue + "%'";
    }
    else {
        condition = "1=1 "
    }
    return condition;
}

function getSortCondition(sortValue) {
    var typeSort = document.getElementById("opt_sapxep_CTHD").value;

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

function DisplayCTHDElement(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="MAHD">${elementPage[i].MA_HD}</td>
        <td id="MASP">${elementPage[i].MA_SP}</td>
        <td style="width: 250px; word-wrap: break-word;">${elementPage[i].TEN_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien"><span>${changePriceToString(elementPage[i].THANH_TIEN)}</span></td>
        <td id="ThueSuat"><span>${changePriceToString(elementPage[i].THUE_SUAT)}</span></td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
}



//chức năng tìm kiếm
document.getElementById('btn_timkiem_CTHD').addEventListener('click', function (event) {

    readVer3("tăng dần")

});
//chức năng tìm kiếm

//chức năng sắp xếp 
document.getElementById('btn_tang').addEventListener('click', function (event) {
    readVer3("tăng dần")

});

document.getElementById('btn_giam').addEventListener('click', function (event) {

    readVer3("giảm dần")
});
//chức năng sắp xếp 