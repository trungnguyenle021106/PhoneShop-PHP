function add()
{
    var data = {
        "row1": ["1", "CHƯA CÓ"],
        "row2": ["1", "CHƯA CÓ"]
    };
    
    var column = {
        "column1": "MA_SP",
        "column2": "SERIAL_NUMBER"
    };



    var jsonData = JSON.stringify(data);
    var jsonColumn = JSON.stringify(column);
    console.log(jsonData)
    console.log(jsonColumn)
    var operation = "Create Custom";
    var tableName = "serial";
    $.ajax({
        url: './AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            jsonColumn : jsonColumn,
            operation: operation,
            tableName: tableName
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(xhr+status+error);
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