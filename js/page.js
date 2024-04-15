// Hàm này trả về mảng các phần tử cho trang
// Lần lượt các tham số được truyền vào hàm này là : mảng chứa các sản phẩm, số trang muốn hiển thị,
// số lượng sản phẩm 1 trang hiển thị
function GetDataForPage(dataArray, pageNumber, itemsPerPage) {
    var itemsArray = [];
    if (dataArray.length < pageNumber * itemsPerPage) {
        for (var i = pageNumber * itemsPerPage - itemsPerPage; i < dataArray.length; i++) {
            itemsArray.push(dataArray[i]);
        }
    }
    else {
        for (var i = pageNumber * itemsPerPage - itemsPerPage; i < pageNumber * itemsPerPage; i++) {
            itemsArray.push(dataArray[i]);
        }
    }
    return itemsArray;
}
// Hàm này trả về mảng số thứ tự các trang sẽ hiển thị
// Lần lượt các tham số được truyền vào hàm này là : mảng chứa các sản phẩm, số trang muốn hiển thị, 
// số lượng sản phẩm 1 trang hiển thị, số thứ tự trang tối đa hiển thị
function GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage) {
    var numberPages_Array = [];
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    var temp1 = 0;
    var temp2 = 0;

    for (i = 1; i < totalPage; i++) {
        temp2 = i * maxPage;
        temp1 = t2 - maxPage + 1;
        if (pageNumber > temp1 && pagpageNumber < temp2) {
            break;
        }
    }

    if(totalPage < t2)
    {
        for(var i = t1; i<=totalPage;i++)
        {
            numberPages_Array.push(i);
        }
    }
    else{
        for(var i = t1; i <= t2; i++)
        {
            numberPages_Array.push(i);
        }
    }
    return numberPages_Array;
}
// Hàm này sẽ trả về số trang tiếp theo khi bấm nút <<
//Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, số thứ tự trang tối đa hiển thị
function GetPageNumberForBack(numberPages_Array, maxPage)
{   
    if(numberPages_Array[0] != 1)
    {
        return numberPages_Array[0] - maxPage;
    }
    return 0;
}
// Hàm này sẽ trả về số trang tiếp theo khi bấm nút >>
// Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, mảng chứa các sản phẩm,
// số lượng sản phẩm 1 trang hiển thị, số thứ tự trang tối đa hiển thị
function GetPageNumberForNext(numberPages_Array, dataArray , itemsPerPage ,maxPage)
{
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    if(numberPages_Array[0] + maxPage <= totalPage)
    {
        return numberPages_Array[0] + maxPage
    }
    return 0;
}



function LoadDataForPage(page) {
    $.ajax({
        url: 'Model/LoadData.php',
        dataType: 'json',
        success: function (response) {
            console.log(response);

            var maxPage = 3;
            var maxElementPerPage = 1;
            var sanPham = response.san_pham;
            var elementPage = [];

            var curPage = 0;
            var element = 0;
            

            if (sanPham.length < page * maxElementPerPage) {
                for (var i = page * maxElementPerPage - maxElementPerPage; i < sanPham.length; i++) {
                    elementPage.push(sanPham[i]);
                }
            }
            else {
                for (var i = page * maxElementPerPage - maxElementPerPage; i < page * maxElementPerPage; i++) {
                    elementPage.push(sanPham[i]);
                }
            }
           
            //Lấy số trang có thể có
            for (var i = 0; i < sanPham.length; i++) {
                element++
                if (element == maxElementPerPage) {
                    curPage++;
                    element = 0;
                }
            }
            // tránh số trang bị thiếu do các phần tử không đủ
            if (element != 0) {
                curPage++;
            }
            DisplayElementPage(elementPage);
            DisplayPageNumber(getRangePage(curPage, page, maxPage), curPage, maxPage);
        },
        error: function (xhr, status, error) {
            console.log('Lỗi khi yêu cầu dữ liệu. Mã trạng thái: ' + xhr.status + ', Lỗi: ' + error);
        }
    });
}
function DisplayElementPage(elementPage) {
    var htmlElementPage = "";

    for (var i = 0; i < elementPage.length; i++) {
        htmlElementPage += '<li>' + elementPage[i].MA_SP + elementPage[i].TEN_SP +
            '<img src="' + 'Img/' + elementPage[i].HINH_ANH + '"></img>'
        '</li>'
    }

    var ulContainer = document.getElementById("elementPage");
    ulContainer.innerHTML = htmlElementPage;
}
// Lấy các trang mà trang hiển thị thuộc
function getRangePage(curPage, page, maxPage) {
    var pageNumber_Array = [];


    var t1 = 0;
    var t2 = 0;
    for (i = 1; i < curPage; i++) {
        t2 = i * maxPage;  // 1 * 4 = 4
        t1 = t2 - maxPage + 1; // 4 - 4 + 1 = 1
        if (page >= t1 && page <= t2) {
            break;
        }
    }

    if (curPage < t2) {
        for (var i = t1; i <= curPage; i++) {
            pageNumber_Array.push(i);
        }
    }
    else {
        for (var i = t1; i <= t2; i++) {
            pageNumber_Array.push(i);
        }
    }

    return pageNumber_Array;
}
// Hiển thị số trang 
function DisplayPageNumber(pageNumber_Array, curPage, maxPage) {
    var htmlPage = "";
    var htmlBackPage = "";
    var htmlNextPage = "";

    if (pageNumber_Array[0] != 1) {
        htmlBackPage += '<button onclick="LoadDataForPage(' + (pageNumber_Array[0] - maxPage) + ')">' + 'back' + '</button>'
    }
    else {
        htmlBackPage += '<button>' + 'không bấm được' + '</button>'
    }

    for (var i = 0; i < pageNumber_Array.length; i++) {
        htmlPage += '<button onclick="LoadDataForPage(' + pageNumber_Array[i] + ')">' + pageNumber_Array[i] + '</button>';
    }

    if (pageNumber_Array[0] + maxPage <= curPage) {
        htmlNextPage += '<button onclick="LoadDataForPage(' + (pageNumber_Array[0] + maxPage) + ')">' + 'next' + '</button>'
    }
    else {
        htmlNextPage += '<button>' + 'không bấm được' + '</button>'
    }

    var pageContainer = document.getElementById("pageContainer");
    pageContainer.innerHTML = htmlBackPage + htmlPage + htmlNextPage;
}
