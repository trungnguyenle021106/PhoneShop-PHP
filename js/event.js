window.addEventListener('scroll', function() {
    const header = document.querySelector('.topMenu-wrap');
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 100) {
      header.classList.add('shaw')
    } else {
        header.classList.remove('shaw')
    }
});