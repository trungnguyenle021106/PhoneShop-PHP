function setusername(){
    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function(response){
            document.getElementById('username').innerText = response.tai_khoan.TEN_TK;
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}

setusername();