function getPBH(callback)
{
    var operation = "Read";
    var tableName = "phieu_bao_hanh";
    var condition = "NGAY_HET_HAN < CURRENT_DATE";
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
            if(response.length !== 0){
            var data = {};

            for (var i = 0; i < response.length; i++) {
                data[i] = [response[i].MA_pbh]
            }

            callback(data);
        }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}


function setTT_PBH()
{
    getPBH(function(data){
    var operation = "Update TinhTrang";
    var tableName = "phieu_bao_hanh";
    var tinhtrang = "Hêt hạn bảo hành";
    var idName = "MA_PBH";
    var jsonData = JSON.stringify(data);
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData:jsonData,
            operation: operation,
            tableName: tableName,
            tinhtrang: tinhtrang,
            idName:idName
        },
        success: function (response) {

        },
        error: function (xhr, status, error) {
            console.log("lỗi "+error);
        }
    });
    })
}

setTT_PBH();