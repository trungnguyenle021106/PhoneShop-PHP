function getKM(callback) {
    var operation = "Read";
    var tableName = "khuyen_mai";
    var condition = "NGAY_KT < CURRENT_DATE";
    $.ajax({
        url: './AJAX_PHP/CRUD.php',
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


function setTT_KM() {
    getKM(function (data) {

        var operation = "Update TinhTrang";
        var tableName = "khuyen_mai";
        var tinhtrang = "'Hết hiệu lực'";
        var idName = "MA_KM";
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: './AJAX_PHP/CRUD.php',
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
    console.log(timeUntilTargetTime)
    return timeUntilTargetTime;
  }
 
  var timeUntilTargetTime = getTimeUntilTargetTime();
  
  // Đặt timeout để gọi hàm setTT_PBH() vào 16 giờ 55 phút mỗi ngày
  setTimeout(function () {
    setTT_KM();
    // Lặp lại việc đặt timeout hàng ngày
    setInterval(function() {
      setTT_KM();
    }, 24 * 60 * 60 * 1000); // 24 giờ
  }, timeUntilTargetTime);