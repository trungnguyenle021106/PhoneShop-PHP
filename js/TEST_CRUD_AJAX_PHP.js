function add()
{
    var data = {
        MA_SP: "1",
        SERIAL_NUMBER:"CHƯA CÓ"
      };
      var ar =[];
      ar.push(data);
      var data1 = {
        MA_SP: "1",
        SERIAL_NUMBER:"CHƯA CÓ"
      };
      ar.push(data1);
    var jsonData = JSON.stringify(ar);
    var operation = "Create";
    var tableName = "loai";
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function update()
{
    var data = {
        TEN_LOAI: "Zed"
      };
    var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "loai";
    var idName = "MA_LOAI";
    var idValue = 15;
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function Delete()
{
    var operation = "Delete";
    var tableName = "loai";
    var idName = "MA_LOAI";
    var idValue = 15;
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function read()
{
    var operation = "Read";
    var tableName = "loai";
    var condition = "";
    $.ajax({
        url: 'AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition : condition
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}