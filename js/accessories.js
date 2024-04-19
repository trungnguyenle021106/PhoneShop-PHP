
// // //tạo hiệu ứng trượt slide
// const slider = document.querySelector('.slide-container');
// const slides = document.querySelector('.slides');
// let currentSlide = 0;
// const totalSlides = 2; // Số lượng tổng ảnh trong container (trong trường hợp này là 3)

// function updateSliderPosition() {
//     const offset = -currentSlide * 736; // 736 là image width
//     slides.style.transform = `translateX(${offset}px)`;
// }


// updateSliderPosition();
// //tự động trượt slide 
// let autoslide;

// function changeslide() {
//     if (currentSlide < totalSlides) {
//         currentSlide++;
//     } else {
//         currentSlide = 0 // trượt về slide đầu
//     }
//     updateSliderPosition();
// }

// function startAutoSlide() {
//     autoslide = setInterval(() => { changeslide(); }, 1500);//hàm tạo sự kiện tự động sau 1 khoảng thời gian  sau 2s
// }

// function stopAutoSlide() {
//     clearInterval(autoslide);
// }

// //bắt đầu tự động trượt slide khi vào wed
// startAutoSlide();

// //tạm dựng khi hover chuột vào slider
// slider.addEventListener('mouseenter', stopAutoSlide);

// //tiếp tục khỉ rẻ chuột ra khỏi slider
// slider.addEventListener('mouseleave', startAutoSlide);

// //--------------------------------------------------------//


// //-------------------------------------------------------//
// //tạo hiệu ứng scroll lên xuống

// //nut lên
// document.addEventListener('DOMContentLoaded', function () {
//     var scroll_btn = document.querySelector('.scroll_up_btn');
//     var isScrolling = false; // Biến để xác định trạng thái cuộn

//     scroll_btn.addEventListener('click', function () {
//         // Cuộn lên trên
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });

//     window.addEventListener('scroll', function () {
//         if (document.documentElement.scrollTop > 10) {
//             if (!isScrolling) { // Nếu đang ngừng cuộn
//                 isScrolling = true; // Đặt trạng thái cuộn
//                 scroll_btn.style.right = "0px"; // Hiển thị nút khi cuộn trang xuống
//             }
//         } else {
//             isScrolling = false; // Đặt trạng thái cuộn
//             scroll_btn.style.right = "-100px"; // Ẩn nút khi cuộn lên đầu
//         }
//     });
// });

// //nút xuống
// document.addEventListener('DOMContentLoaded', function () {
//     var scroll_btn1 = document.querySelector('.scroll_down_btn');
//     var isScrolling1 = false; // Biến để xác định trạng thái cuộn

//     scroll_btn1.addEventListener('click', function () {
//         // Cuộn  xuống
//         window.scrollTo({
//             top: document.body.scrollHeight, // Cuộn đến cuối trang
//             behavior: 'smooth'
//         });
//     });

//     window.addEventListener('scroll', function () {
//         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             if (!isScrolling1) { // Nếu đang ngừng cuộn
//                 scroll_btn1.style.left = "-100px";
//                 isScrolling1 = true; // Đặt trạng thái cuộn
//             }
//         } else {
//             scroll_btn1.style.left = "0px";
//             isScrolling1 = false; // Đặt trạng thái cuộn
//         }
//     });
// });
//-------------------------------------------------------//



function loadData(pageNumber, itemsPerPage, maxPage) {
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
            var dataArray = convert_JsonToArray(response);
            var dataForPage = GetDataForPage(dataArray, pageNumber, itemsPerPage);
            var html = "";
            for (var i = 0; i < dataForPage.length; i++) {
                html += '<a href="" class="products">';
                html += '<div class="name">' + dataForPage[i].TEN_SP + '</div>';
                html += '<div class="Img"><img src="Img/' + dataForPage[i].HINH_ANH + '"></div>';
                html += '<div class="price">' + changePriceToString(dataForPage[i].GIA_BAN) + '</div>';
                html += '</a>';
            }

            var accessories_page = document.getElementById("accessories_page");
            accessories_page.innerHTML = html;

            loadPagesNumber(dataArray, pageNumber, itemsPerPage, maxPage)
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

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
    var s = "đ";
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
    return s.split("").reverse().join("");
}

function convert_JsonToArray(dataJsonArray) {
    var dataArray = [];
    for (var key in dataJsonArray) {
        if(dataJsonArray[key].MA_LOAI == 2)
        {
            dataArray.push(dataJsonArray[key]);
        }
    }
    return dataArray;
}   