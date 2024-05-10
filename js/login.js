
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

            // console.log(kq.tinhtrang);
            // Parse JSON response thành object
            var kq = JSON.parse(response);
            console.log(kq.tinhtrang);
            console.log("tk: " + kq.tentk);
            console.log("mk: " +kq.matkhau);
            console.log(kq.status);

            if(kq.tentk === "loi"){
                $('#messenger').text('Tài khoản sai!');
                var inputElement = document.querySelector('.input-u'); // Thay '.your-class' bằng lớp của phần tử bạn muốn tập trung vào
                if (inputElement) {
                   inputElement.focus(); // Tập trung vào phần tử
                   inputElement.select();
                }
                return;
            }
            if(kq.matkhau === "loi"){
                $('#messenger').text('Mật khẩu sai!');
                var inputElement = document.querySelector('.input-p'); // Thay '.your-class' bằng lớp của phần tử bạn muốn tập trung vào
                if (inputElement) {
                   inputElement.focus(); // Tập trung vào phần tử
                   inputElement.select();
                }
                return;
            }
            if(kq.tinhtrang === "no"){
                $('#messenger').text('Tài khoản đang bị khóa!');
            }
            // if (kq.status === "fail") {
            //     $('#messenger').text('Tài khoản hoặc mật khẩu sai!');
            // }
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