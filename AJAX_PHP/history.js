function addHistory(mota_HD) {

    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'GET',
        dataType: 'json',
        success: function (MA_TK) {
            var data = {
                MOTA_HĐ: mota_HD,
                MA_TK: MA_TK
            };

            var jsonData = JSON.stringify(data);
            var operation = "Create";
            var tableName = "lichsu_hd";

            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: operation,
                    tableName: tableName
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

}

addHistory("Vừa làm xong con iphone 15 blu pacific");