class PageHandler{
    GetDataForPage(dataArray, pageNumber, itemsPerPage) {
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

    GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage) {
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

    GetPageNumberForBack(numberPages_Array, maxPage) {
        //Kiểm tra nếu mảng có tồn tại thì mới xét phần tử đầu tiên
        if ( numberPages_Array[0] && numberPages_Array[0] != 1) {
            return numberPages_Array[0] - maxPage;
        }
        return 0;
    }

    GetPageNumberForNext(numberPages_Array, dataArray, itemsPerPage, maxPage) {
        var totalPage = Math.ceil(dataArray.length / itemsPerPage);
        if (numberPages_Array[0] + maxPage <= totalPage) {
            return numberPages_Array[0] + maxPage
        }
        return 0;
    }
}