<!-- <h2>Modal Login Form</h2>

<button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button> -->
<link rel="stylesheet" href="../CSS/login.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="./js/login.js"></script>
<div id="id01" class="modal">
  
  <form style="font-size: 18px;" class="modal-content animate" action="" method="post">
    <div class="imgcontainer">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <img src="/PhoneShop/Img/ic_user.png" alt="Avatar" class="avatar">
    </div>

    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input id="input" type="text" placeholder="Nhập tài khoản" name="uname" required>

      <label for="psw"><b>Password</b></label>
      <input id="input" type="password" placeholder="Nhập mật khẩu" name="psw" required>
        
      <button type="button" class="btnLogin" onclick="checkLogin()" >Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Nhớ mật khẩu
      </label>
    </div>
    <p id="messenger"></p>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button"  onclick="window.location.href = '/PhoneShop/index.php?page=Home'" class="cancelbtn">Cancel</button>
      <span class="Register">Bạn chưa có tài khoản <a href="/PhoneShop/PAGES/Register.php" >Đăng ký ngay</a></span>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onload = function() {
  // Lấy tham số từ URL
  var urlParams = new URLSearchParams(window.location.search);
  // Kiểm tra nếu tham số "show_div" có tồn tại và có giá trị là "true"
  if (urlParams.has('show') && urlParams.get('show') === 'true') {
    // Lấy phần tử div bằng id và thay đổi thuộc tính display từ "none" thành "block" để hiển thị nó
    document.getElementById('id01').style.display = 'block';
  }
}

</script>