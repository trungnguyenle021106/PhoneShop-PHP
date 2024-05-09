

// Hàm này trả về mảng các phần tử cho , ví dụ trang 1 có các sản phẩm nào thì nó sẽ trả về các sản phẩm của trang 1

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

// Ví dụ trang được truyền vào là trang 3 và ta muốn hiển thị tối đa là 4 trang 1 lúc thì mảng sẽ trả lại từ 1 tới 4 
function GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage) {
    // console.log(pageNumber+", "+itemsPerPage+", "+maxPage)
    var numberPages_Array = [];
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    var t1 = 0;
    var t2 = 0;

    if (dataArray.length == 0) {
        return -1;
    }
    else {
        // Lấy khoảng trang
        for (var i = 1; i <= totalPage; i++) {
            t2 = i * maxPage;
            t1 = t2 - maxPage + 1;
            if (pageNumber >= t1 && pageNumber <= t2) {
                break;
            }
        }
        // console.log(t1+", "+t2)
        //Lấy các giá trị trong khoảng trang 
        if (totalPage < t2) {
            for (var i = t1; i <= totalPage; i++) {
                numberPages_Array.push(i);
            }
        }
        else {
            for (var i = t1; i <= t2; i++) {
                numberPages_Array.push(i);
            }
        }
        return numberPages_Array;
    }
    // console.log(dataArray);
    // console.log(numberPages_Array)
}

// Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, số thứ tự trang tối đa hiển thị

// Hàm này sẽ trả về số trang tiếp theo khi bấm nút <<
// Hàm sẽ trả về số trang trở về sẽ load tại nút <<, ví dụ đã hiển thị 4 trang từ 5 tới 8 trả về trang 4
function GetPageNumberForBack(numberPages_Array, maxPage) {
    //Kiểm tra nếu mảng có tồn tại thì mới xét phần tử đầu tiên
    if ( numberPages_Array[0] && numberPages_Array[0] != 1) {
        return numberPages_Array[0] - maxPage;
    }
    return 0;
}


// Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, mảng chứa các sản phẩm,
// số lượng sản phẩm 1 trang hiển thị, số thứ tự trang tối đa hiển 

// Hàm này sẽ trả về số trang tiếp theo khi bấm nút >>
// Hàm sẽ trả về số trang tiếp theo sẽ load tại nút >>, ví dụ đã hiển thị 4 trang 1 tới 4 sẽ trả về trang 5
function GetPageNumberForNext(numberPages_Array, dataArray, itemsPerPage, maxPage) {
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    if (numberPages_Array[0] + maxPage <= totalPage) {
        return numberPages_Array[0] + maxPage
    }
    return 0;
}

