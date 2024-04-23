
// test keo trai phai
var slider = document.getElementById("slider-accessories");
var left = document.querySelector('.left1-accessories')
var right = document.querySelector('.right1-accessories')
var priceLeft = document.querySelector('.price-left-accessories')
var priceRight = document.querySelector('.price-right-accessories')
var btn_Price_Multi_Slider = document.getElementById("btn_Price_Multi_Slider");
var Price_Multi_Slider = document.getElementById("Price_Multi_Slider");
var btn_close_price_slider = document.getElementById("btn_close_price_slider");

Price_Multi_Slider.style.display = "none";
btn_Price_Multi_Slider.addEventListener("click", function () {
    Price_Multi_Slider.classList.add("dp-block")
});

btn_close_price_slider.addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.remove("dp-block")
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

function setConditionForFilter(selectedLoaiValue, loai, selectedNSXValue, nsx, selectedSXValue, sx) {
    var condition = "";
    if (selectedLoaiValue != "" && selectedNSXValue != "" && selectedSXValue != "") {
        condition = condition + loai + " AND " + nsx + " " + sx;
    }
    else if (selectedNSXValue != "" && selectedSXValue != "") {
        condition = condition + nsx + " " + sx;
    }
    else if (selectedLoaiValue != "" && selectedSXValue != "") {
        condition = condition + loai + " " + sx;
    }
    else if (selectedNSXValue != "") {
        condition = condition + nsx;
    }
    else if (selectedLoaiValue != "") {
        condition = condition + loai;
    }
    else if (selectedSXValue != "") {
        condition = condition + " 1=1 " + sx;
    }
    return condition;
}

function setDataForFilter() {
    var selectLoaiElement = document.getElementById("loai");
    var selectedLoaiValue = selectLoaiElement.value;
    var loai = " MA_LOAI =" + selectedLoaiValue;

    var selectNSXElement = document.getElementById("nsx");
    var selectedNSXValue = selectNSXElement.value;
    var nsx = " MA_NSX = " + selectedNSXValue;

    var selectSXElement = document.getElementById("sapxep");
    var selectedSXValue = selectSXElement.value;
    var sx = "";
    if (selectedSXValue == "GIA_TANG_DAN") {
        sx = "ORDER BY GIA_BAN ASC";
    }
    else if (selectedSXValue == "GIA_GIAM_DAN") {
        sx = "ORDER BY GIA_BAN DESC";
    }

    var operation = "Read";
    var tableName = "san_pham";
    var condition = setConditionForFilter(selectedLoaiValue, loai, selectedNSXValue, nsx, selectedSXValue, sx);

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
            loadData(1, 3, 3);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function setDataOnload() {
    var operation = "Read";
    var tableName = "san_pham";
    var condition = "";
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
            loadData(1, 8, 3);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function loadData(pageNumber, itemsPerPage, maxPage) {
    var dataForPage = GetDataForPage(dataArray, pageNumber, itemsPerPage);
    loadDataForPage(dataForPage);
    loadPagesNumber(dataArray, pageNumber, itemsPerPage, maxPage);
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

function loadPagesNumber(dataArray, pageNumber, itemsPerPage, maxPage) {
    var html = "";
    var numberPages_Array = GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage);
    var backPage = GetPageNumberForBack(numberPages_Array, maxPage);
    var nextPage = GetPageNumberForNext(numberPages_Array, dataArray, itemsPerPage, maxPage);

    if (backPage !== 0) {
        html += '<button id="backPage_Btn" onclick="loadData(' + backPage + ', ' + itemsPerPage + ', ' + maxPage + ')"><<</button>';
    }

    for (var i = 0; i < numberPages_Array.length; i++) {
        html += '<button onclick="loadData(' + numberPages_Array[i] + ', ' + itemsPerPage + ', ' + maxPage + ')">' + numberPages_Array[i] + '</button>';
    }

    if (nextPage !== 0) {
        html += '<button id="nextPage_Btn" onclick="loadData(' + nextPage + ', ' + itemsPerPage + ', ' + maxPage + ')">>></button>';
    }


    var Pagination = document.getElementById("Pagination");
    Pagination.innerHTML = html;
}

function changePriceToString(price) {
    var s = "";
    var temp = 0;
    var flag = 0;
    var amountDot = Math.round(price.length / 3);

    if (price.length % 3 == 0) {
        amountDot--;
    }
    for (var i = price.length - 1; i >= 0; i--) {
        temp++;
        if (temp == 3 && flag < amountDot) {
            s = s + price[i] + ".";
            flag++;
            temp = 0;
        }
        else {
            s = s + price[i];
        }
    }
    return s.split("").reverse().join("") + "đ";
}

function convert_JsonToArray(dataJsonArray) {
    var Array = [];
    for (var key in dataJsonArray) {
        if (dataJsonArray[key].MA_LOAI != 1) {
            Array.push(dataJsonArray[key]);
        }
    }
    return Array;
}

