var dataAccount = [];

function readAccount() {
    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            dataAccount = response.array_TenChucNang;
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