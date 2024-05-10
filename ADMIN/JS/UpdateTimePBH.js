function getPBH(callback) {
    var operation = "Read";
    var tableName = "phieu_bao_hanh";
    var condition = "NGAY_HET_HAN < CURRENT_DATE";
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
            if (response.length !== 0) {
                var data = {};

                for (var i = 0; i < response.length; i++) {
                    data[i] = [response[i].MA_PBH]
                }
                callback(data);
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}


function setTT_PBH() {
    getPBH(function (data) {

        var operation = "Update TinhTrang";
        var tableName = "phieu_bao_hanh";
        var tinhtrang = "'Hết hạn bảo hành'";
        var idName = "MA_PBH";
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                jsonData: jsonData,
                operation: operation,
                tableName: tableName,
                tinhtrang: tinhtrang,
                idName: idName
            },
            success: function (response) {

            },
            error: function (xhr, status, error) {
                console.log("lỗi " + error);
            }
        });
    })
}




function getTimeUntilTargetTime() {
    var now = new Date();
    var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);
    var timeUntilTargetTime = targetTime - now;

    if (timeUntilTargetTime < 0) {
        // Nếu thời gian đã quá thì tính lại cho ngày hôm sau
        targetTime.setDate(targetTime.getDate() + 1);
        timeUntilTargetTime = targetTime - now;
    }

    return timeUntilTargetTime;
}

var timeUntilTargetTime = getTimeUntilTargetTime();

// Đặt timeout để gọi hàm setTT_PBH() vào 16 giờ 55 phút mỗi ngày
setTimeout(function () {
    setTT_PBH();
    // Lặp lại việc đặt timeout hàng ngày
    setInterval(function () {
        setTT_PBH();
    }, 24 * 60 * 60 * 1000); // 24 giờ
}, timeUntilTargetTime);