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
            DisplayHDElement(response);

            //cập nhật lại số lượng sản phẩm
            setAmountCTHD()
            //cập nhật lại số lượng sản phẩm
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}
//loadData

// -------------------------------------------formation-chức năng phụ------------------------------------------------ //

function setAmountCTHD()
{
    var SLCTHD_HT = document.querySelector('#SLCTHD_HT span');
    var rows = document.querySelectorAll('#table_CTHD table tbody tr ');
    SLCTHD_HT.innerText = rows.length;
}

function DisplayHDElement(elementPage) {
    var html = "";
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="MAHD">${elementPage[i].MA_HD}</td>
        <td id="MASP">${elementPage[i].MA_SP}</td>
        <td id="SL">${elementPage[i].SL_BAN}</td>
        <td id="ThanhTien"><span>${changePriceToString(elementPage[i].THANH_TIEN)}</span></td>
        <td id="ThueSuat"><span>${changePriceToString(elementPage[i].THUE_SUAT)}</span></td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    setAmountCTHD();
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
    var tableName = "chi_tiet_hoadon";
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
            DisplayHDElement(response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}


//chức năng tìm kiếm
document.getElementById('btn_timkiem_CTHD').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_CTHD').value;
    var txt_search = document.getElementById('txt_timkiem_CTHD').value;
    var opt = document.getElementById('opt_sapxep_CTHD').value;
    Filter(opt_search, txt_search, opt, "tăng dần");
    
});
//chức năng tìm kiếm

//chức năng sắp xếp 
document.getElementById('btn_tang').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_CTHD').value;
    var txt_search = document.getElementById('txt_timkiem_CTHD').value;
    var opt = document.getElementById('opt_sapxep_CTHD').value;
        
    Filter(opt_search, txt_search, opt, "tăng dần");
    
});

document.getElementById('btn_giam').addEventListener('click', function (event) {
    event.preventDefault();
    var opt_search = document.getElementById('opt_timkiem_CTHD').value;
    var txt_search = document.getElementById('txt_timkiem_CTHD').value;
    var opt = document.getElementById('opt_sapxep_CTHD').value;
        
    Filter(opt_search, txt_search, opt, "giảm dần");
    
});
//chức năng sắp xếp 