var dataAccount = [];
var idAccount = 1
var idNV = 1;
function readNV()
{
    var operation = "Read";
    var tableName = "nhan_vien";


    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition:"MA_TK ="+idAccount
        },
        success: function (response) {
            idNV = response[0].MA_NV;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function readAccount() {
    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            dataAccount = response.array_TenChucNang;
            idAccount = response.tai_khoan.MA_TK;
             readNV();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function searchChucNang(tenChucNang) {
    for (var i = 0; i < this.dataAccount.length; i++) {
        if(tenChucNang === this.dataAccount[i])
            {
                return true;
            }
    }
    return false;
}

readAccount();