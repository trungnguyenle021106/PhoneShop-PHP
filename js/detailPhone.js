imgBtns = [...document.querySelectorAll('.img-style')]
imgContent = document.querySelector('.img-content')
for(imgBtn of imgBtns) {
    imgBtn.onclick = (e) => {
        imgContent.setAttribute("src", e.target.getAttribute("src"));
    }
}

var currentUrl = window.location.href;
currentUrl = currentUrl.split('&')[1]
currentUrl = currentUrl.split('=')[1]

img = document.querySelector('.img-content')
Name = document.querySelector('.model')
price = document.querySelector('.carrier-pricing-wrapper span')

infoItem = {
    MA_SP: currentUrl,
    name: Name.innerText,
    img: img.src,
    value: 1,
    price: price.innerText,
}

addCart = document.querySelector('.compare-phone-button')
addCart.onclick = () => {
    successToast("Thêm vào giở hàng thành công!")
    cart.addCart(infoItem)
}