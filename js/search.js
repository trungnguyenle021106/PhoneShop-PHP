
// test keo trai phai
var slider = document.getElementById("slider-accessories");
var left = document.querySelector('.left1-accessories')
var right = document.querySelector('.right1-accessories')
var priceLeft = document.querySelector('.price-left-accessories')
var priceRight = document.querySelector('.price-right-accessories')
var btn_Price_Multi_Slider = document.getElementById("btn_Price_Multi_Slider");
var Price_Multi_Slider = document.getElementById("Price_Multi_Slider");
var btn_close_price_slider = document.getElementById("btn_close_price_slider");
var btn_result_price_slider = document.getElementById("btn_result_price_slider");
var btn_ClearAll = document.getElementById("btn_ClearAll");

var selectLoaiElement = document.getElementById("loai");
var selectNSXElement = document.getElementById("nsx");
var selectSXElement = document.getElementById("sapxep");


btn_ClearAll.addEventListener("click", function () {
    selectLoaiElement.value = "";
    selectNSXElement.value = "";
    selectSXElement.value = "";
    left.style.left = "-3%"
    priceLeft.innerText = "0đ"
    right.style.left = "97%"
    priceRight.innerText = "100.000.000đ"
    setDataForFilter()
});

document.body.addEventListener('click', function (event) {
    Price_Multi_Slider.classList.add("dp-block-accessories")
});

btn_Price_Multi_Slider.addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.remove("dp-block-accessories")
});

btn_close_price_slider.addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.add("dp-block-accessories")
});

btn_result_price_slider.addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.add("dp-block-accessories")
    setDataForFilter();
});

function formatCurrency(number) {
    let strNumber = Math.abs(number).toString();
    let parts = strNumber.split(".");
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? "." + parts[1] : "";
    let formattedInteger = "";

    for (let i = integerPart.length - 1; i >= 0; i--) {
        formattedInteger = integerPart[i] + formattedInteger;
        if ((integerPart.length - i) % 3 === 0 && i !== 0) {
            formattedInteger = "." + formattedInteger;
        }
    }

    let formattedNumber = formattedInteger + decimalPart;

    if (number < 0) {
        formattedNumber = "-" + formattedNumber;
    }
    return formattedNumber;
}

function moveSliderLeft(event) {
    var rect = slider.getBoundingClientRect();
    var pos = (event.clientX - rect.left) / rect.width;
    pos = Math.min(1, Math.max(0, pos));
    perRight = parseFloat(right.style.left.substring(0, right.style.left.length - 1))

    if ((pos * 100) - 3 < 97 && isNaN(perRight)) {
        left.style.left = (pos * 100) - 3 + "%"
        priceLeft.innerText = `${formatCurrency(Math.ceil((pos * 100) * 1000000))}đ`
    }
    else if ((pos * 100) - 3 < perRight) {
        left.style.left = (pos * 100) - 3 + "%"
        priceLeft.innerText = `${formatCurrency(Math.ceil((pos * 100) * 1000000))}đ`
    }
}

function moveSliderRight(event) {
    var rect = slider.getBoundingClientRect();
    var pos = (event.clientX - rect.left) / rect.width;
    pos = Math.min(1, Math.max(0, pos))
    perLeft = parseFloat(left.style.left.substring(0, left.style.left.length - 1))

    if ((pos * 100) - 3 > -3 && isNaN(perLeft)) {
        right.style.left = (pos * 100) - 3 + "%"
        priceRight.innerText = `${formatCurrency(Math.ceil((pos * 100) * 1000000))}đ`
    }
    else if ((pos * 100) - 3 > perLeft) {
        right.style.left = (pos * 100) - 3 + "%"
        priceRight.innerText = `${formatCurrency(Math.ceil((pos * 100) * 1000000))}đ`
    }
}

left.addEventListener("mousedown", function (event) {
    moveSliderLeft(event);
    window.addEventListener("mousemove", moveSliderLeft);
    window.addEventListener("mouseup", function () {
        window.removeEventListener("mousemove", moveSliderLeft);
    })
})

right.addEventListener("mousedown", function (event) {
    moveSliderRight(event);
    window.addEventListener("mousemove", moveSliderRight);
    window.addEventListener("mouseup", function () {
        window.removeEventListener("mousemove", moveSliderRight);
    })
})



var dataArray = [];
var searchType = "";
var seachValue = ""

function setConditionForFilterVER2(arrayConditionWhere, conditionOrderBy) {
    var s = "";
    var flag = false;
    for (var i = 0; i < arrayConditionWhere.length; i++) {

        if (flag == true) {
            s += " AND ";
            flag = false;
        }
        if (arrayConditionWhere[i].Value_ID != "") {
            s += arrayConditionWhere[i].Name_ID + " " + arrayConditionWhere[i].Operation + " " + arrayConditionWhere[i].Value_ID;
            flag = true;
        }
    }

    if (conditionOrderBy == "GIA_TANG_DAN") {
        s += " ORDER BY GIA_BAN ASC";
    }
    else if (conditionOrderBy == "GIA_GIAM_DAN") {
        s += " ORDER BY GIA_BAN DESC";
    }
    return s;
}

function getDataFilterFromClient() {
    var arrayConditionWhere = []


    var selectedLoaiValue = selectLoaiElement.value;
    var dataLoai = {
        Name_ID: "MA_LOAI",
        Value_ID: selectedLoaiValue,
        Operation: "="
    }
    arrayConditionWhere.push(dataLoai);


    var selectedNSXValue = selectNSXElement.value;
    var dataNsx = {
        Name_ID: "MA_NSX",
        Value_ID: selectedNSXValue,
        Operation: "="
    }
    arrayConditionWhere.push(dataNsx);


    var dataLowPrice = {
        Name_ID: "GIA_BAN",
        Value_ID: changePriceToNormal(priceLeft.innerText),
        Operation: ">="
    }
    arrayConditionWhere.push(dataLowPrice);


    var dataHighPrice = {
        Name_ID: "GIA_BAN",
        Value_ID: changePriceToNormal(priceRight.innerText),
        Operation: "<="
    }
    arrayConditionWhere.push(dataHighPrice);


    var selectedSXValue = selectSXElement.value;

    return setConditionForFilterVER2(arrayConditionWhere, selectedSXValue);
}

function setDataForFilter() {

    var operation = "Read";
    var tableName = "san_pham";
    var condition = "";
    if (searchType == "TenSP") {
        condition = setConditionForSeach() + " AND " + getDataFilterFromClient();
    }
    else {
        condition = getDataFilterFromClient();
    }

    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function (response) {

            dataArray = convert_JsonToArray(response);
            loadData(1, 10, 5);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function setUI() {
    if (searchType == "ThuongHieu") {
        document.getElementById("MANSX_" + seachValue).selected = "true";
    }
}

function setConditionForSeach() {
    if (searchType == "TenSP") {
        return "TEN_SP LIKE '%" + seachValue + "%'";
    }
    else if (searchType == "ThuongHieu") {
        return "MA_NSX = " + seachValue;
    }
}

function setDataOnload(Type, Value) {
    searchType = Type;
    seachValue = Value;
    setUI();
    var operation = "Read";
    var tableName = "san_pham";
    var condition = setConditionForSeach();

    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function (response) {

            dataArray = convert_JsonToArray(response);
            loadData(1, 10, 5);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function loadData(pageNumber, itemsPerPage, maxPage) {
    var dataForPage = GetDataForPage(dataArray, pageNumber, itemsPerPage);
    loadDataForPage(dataForPage);
    loadPagesNumber(pageNumber, itemsPerPage, maxPage);
}

function loadDataForPage(dataForPage) {
    var html = ""
    for (var i = 0; i < dataForPage.length; i++) {
        html += '<a href="" class="products">';
        html += '<div class="name">' + dataForPage[i].TEN_SP + '</div>';
        html += '<div class="Img"><img src="Img/' + dataForPage[i].HINH_ANH + '"></div>';
        html += '<div class="price">' + changePriceToString(dataForPage[i].GIA_BAN) + '</div>';
        html += '</a>';
    }

    var accessories_page = document.getElementById("accessories_page");
    accessories_page.innerHTML = html;
}

function loadPagesNumber(pageNumber, itemsPerPage, maxPage) {
    var html = "";
    var numberPages_Array = GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage);

    var backPage = GetPageNumberForBack(numberPages_Array, maxPage);
    var nextPage = GetPageNumberForNext(numberPages_Array, dataArray, itemsPerPage, maxPage);

    if (backPage != 0) {
        html += '<button id="backPage_Btn" onclick="loadData(' + backPage + ', ' + itemsPerPage + ', ' + maxPage + ')"><<</button>';
    }

    for (var i = 0; i < numberPages_Array.length; i++) {
        if (pageNumber == numberPages_Array[i]) {
            html += '<button style=" background-color: black; color: white;" onclick="loadData(' + numberPages_Array[i] + ', ' + itemsPerPage + ', ' + maxPage + ')">' + numberPages_Array[i] + '</button>';
        }
        else {
            html += '<button onclick="loadData(' + numberPages_Array[i] + ', ' + itemsPerPage + ', ' + maxPage + ')">' + numberPages_Array[i] + '</button>';
        }
    }

    if (nextPage != 0) {
        html += '<button id="nextPage_Btn" onclick="loadData(' + nextPage + ', ' + itemsPerPage + ', ' + maxPage + ')">>></button>';
    }


    var Pagination = document.getElementById("Pagination");
    Pagination.innerHTML = html;
}



function convert_JsonToArray(dataJsonArray) {
    var Array = [];
    for (var key in dataJsonArray) {
        Array.push(dataJsonArray[key]);
    }
    return Array;
}

function setArrayValueSelect(tableName, condition, idSelect) {
    var operation = "Read";
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function (response) {
            var dataArrayValueSelect = convert_JsonToArray(response);
            loadValueForSelect(idSelect, dataArrayValueSelect)
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function loadValueForSelect(idSelect, arrayValueSelect) {

    var element = document.getElementById(idSelect);
    var html = element.innerHTML;
    for (var i = 0; i < arrayValueSelect.length; i++) {
        switch (idSelect) {
            case "loai":
                html += '<option value="' + arrayValueSelect[i].MA_LOAI + '">' + arrayValueSelect[i].TEN_LOAI + '</option>';
                break;
            case "nsx":
                html += '<option id="select' + arrayValueSelect[i].MA_NSX + '" value="' + arrayValueSelect[i].MA_NSX + '">' + arrayValueSelect[i].TEN_NSX + '</option>';
                break;
            default:
                break;
        }
    }
    element.innerHTML = html;
}


setArrayValueSelect("loai", "", "loai");
