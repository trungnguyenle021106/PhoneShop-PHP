//Xử lý MultiSlider giá
var slider = document.getElementById("slider-accessories");
var left = document.querySelector('.left1-accessories')
var right = document.querySelector('.right1-accessories')
var priceLeft = document.querySelector('.price-left-accessories')
var priceRight = document.querySelector('.price-right-accessories')
var btn_Price_Multi_Slider = document.getElementById("btn_Price_Multi_Slider");
var Price_Multi_Slider = document.getElementById("Price_Multi_Slider");


document.body.addEventListener('click', function (event) {
    Price_Multi_Slider.classList.add("dp-block-accessories")
});

btn_Price_Multi_Slider.addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.remove("dp-block-accessories")
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
//Xử lý MultiSlider giá

var dataArray = [];
var searchType = "";
var seachValue = ""

function setSearchValue(st, sv) {
    seachValue = sv;
    if (st == "TenSP") {
        searchType = "TEN_SP";
    }
    else if (st == "ThuongHieu") {
        searchType = "MA_NSX";
        setUINSX() ;
    }
    read()
}

//Xử lý khi trang tìm kiếm thương hiệu 
function setUINSX() {
    document.getElementById("MANSX_" + seachValue).selected = "true";
}
//Xử lý khi trang tìm kiếm thương hiệu 

// Xử lý đọc dữ liệu tại database 
function getConditionLoai() {
    var condition = ""
    var selectLoaiElement = document.getElementById("loai");
    var selectedLoaiValue = selectLoaiElement.value;
    if (selectedLoaiValue !== "") {
        condition = "MA_LOAI = " + selectedLoaiValue + " AND ";
    }
    return condition;
}

function getConditionBrand() {
    var condition = ""
    var selectNSXElement = document.getElementById("nsx");
    var selectedNSXValue = selectNSXElement.value;
    if (selectedNSXValue !== "") {
        condition = " MA_NSX =" + selectedNSXValue  + " AND ";
    }
    return condition;
}

function getConditionSort() {
    var condition = "";
    var selectSXElement = document.getElementById("sapxep");
    var selectedSXValue = selectSXElement.value;
    if (selectedSXValue == "GIA_TANG_DAN") {
        condition = "  ORDER BY GIA_BAN ASC";
    }
    else if (selectedSXValue == "GIA_GIAM_DAN") {
        condition = " ORDER BY GIA_BAN DESC"
    }

    return condition;
}

function getConditionInPrice() {
    var condition = ""
    priceLeftValue = changePriceToNormal(priceLeft.innerText);
    priceRightValue = changePriceToNormal(priceRight.innerText);
    condition = " GIA_BAN >= " + priceLeftValue + " AND GIA_BAN <= " + priceRightValue;
    return condition;
}

function getConditionSearchType() {
    var condition = ""
    if (searchType == "TEN_SP") {
        condition = "TEN_SP LIKE '%" + seachValue + "%' AND";
    }
    return condition;
}
function read() {
    var operation = "Read";
    var tableName = "san_pham";

    var condition = getConditionSearchType() + getConditionLoai() + getConditionBrand() + getConditionInPrice() + getConditionSort();
    console.log(condition)
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
//Xử lý đọc dữ liệu tại database


//Code xử lý phân trang
function convert_JsonToArray(dataJsonArray) {
    var Array = [];
    for (var key in dataJsonArray) {
        Array.push(dataJsonArray[key]);
    }
    return Array;
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
        html += '<button style="width:50px; height:50px; background-color:white; font-size:20px" id="backPage_Btn" onclick="loadData(' + backPage + ', ' + itemsPerPage + ', ' + maxPage + ')"><<</button>';
    }

    for (var i = 0; i < numberPages_Array.length; i++) {
        if (pageNumber == numberPages_Array[i]) {
            html += '<button style="width:50px; height:50px; background-color: black; color: white;" onclick="loadData(' + numberPages_Array[i] + ', ' + itemsPerPage + ', ' + maxPage + ')">' + numberPages_Array[i] + '</button>';
        }
        else {
            html += '<button style="width:50px; height:50px; background-color:white" onclick="loadData(' + numberPages_Array[i] + ', ' + itemsPerPage + ', ' + maxPage + ')">' + numberPages_Array[i] + '</button>';
        }
    }

    if (nextPage != 0) {
        html += '<button style="width:50px; height:50px; background-color:white; font-size:20px" id="nextPage_Btn" onclick="loadData(' + nextPage + ', ' + itemsPerPage + ', ' + maxPage + ')">>></button>';
    }


    var Pagination = document.getElementById("Pagination");
    Pagination.innerHTML = html;
}
//Code xử lý phân trang

//Code xử lý sự kiện cho các nút và select
document.getElementById("loai").addEventListener("change", function (e) {
    read();
});

document.getElementById("nsx").addEventListener("change", function (e) {
    read();
});

document.getElementById("sapxep").addEventListener("change", function (e) {
    read();
});


document.getElementById("btn_ClearAll").addEventListener("click", function () {

    var selectLoaiElement = document.getElementById("loai");
    var selectNSXElement = document.getElementById("nsx");
    var selectSXElement = document.getElementById("sapxep");
    
    selectLoaiElement.value = "";
    selectNSXElement.value = "";
    selectSXElement.value = "";
    left.style.left = "-3%"
    priceLeft.innerText = "0đ"
    right.style.left = "97%"
    priceRight.innerText = "100.000.000đ"
    read()
});


document.getElementById("btn_close_price_slider").addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.add("dp-block-accessories")
});

document.getElementById("btn_result_price_slider").addEventListener("click", function (e) {
    e.stopPropagation()
    Price_Multi_Slider.classList.add("dp-block-accessories")
    read();
});
//Code xử lý sự kiện cho các nút và select