window.addEventListener('scroll', function() {
    const header = document.querySelector('.topMenu-wrap');
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 100) {
      header.classList.add('shaw')
    } else {
        header.classList.remove('shaw')
    }
});

var search_btn = document.getElementById("search_btn")
var input_search = document.getElementById("input-search")

search_btn.addEventListener('click', function() {
  var s = input_search.value;
  window.location.href = "index.php?page=Search&TenSP="+s;
});