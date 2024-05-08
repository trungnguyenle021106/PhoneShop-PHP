
// kiểm tra login 
function checkLogin() {
    event.preventDefault();  // Ngăn không cho form gửi theo cách truyền thống



    $.ajax({
        url: '/PhoneShop/PAGES/Login_xuly.php',
        type: 'POST',
        data: {
            username: $('input[name="uname"]').val(), // Lấy giá trị từ input username
            password: $('input[name="psw"]').val() // Lấy giá trị từ input password
        },
        success: function(response) {

        
            // console.log(response);
            // Parse JSON response thành object
            var kq = JSON.parse(response);

            // Xử lý dựa trên kết quả trả về
            if (kq.status === "success") {
                $('#messenger').text('Đăng nhập thành công ...');
                $('#user_name').text(kq.name);
                if(kq.quyen === "1"){
                    window.location.href = '/PAGES/NhanVien.php';
                    //chuyen hướng trang
                }
                setTimeout(function() {
                    // document.getElementById('id01').style.display = 'none';
                    window.location.href = '/PhoneShop/index.php?page=Home';
                }, 1000);
            } else {
                $('#messenger').text(kq.message);
            }

        },
        error: function() {
            $('#messenger').text('Có lỗi xảy ra, vui lòng thử lại');

        }
    });
}