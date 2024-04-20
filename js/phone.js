// var slider = document.getElementById("slider");
// var left = document.querySelector('.left1')
// var right = document.querySelector('.right1')
// test keo trai phai
// function moveSliderLeft(event) {
//     var rect = slider.getBoundingClientRect();
//     var pos = (event.clientX - rect.left) / rect.width;
//     pos = Math.min(1, Math.max(0, pos));
//     left.style.left = (pos * 100) - 3 + "%"
// }

// function moveSliderRight(event) {
//     var rect = slider.getBoundingClientRect();
//     var pos = (event.clientX - rect.left) / rect.width;
//     pos = Math.min(1, Math.max(0, pos));
//     right.style.left = (pos * 100) - 3 + "%"
// }

// left.addEventListener("mousedown", function(event) {
//     moveSliderLeft(event);
//     window.addEventListener("mousemove", moveSliderLeft);
//     window.addEventListener("mouseup", function() {
//         window.removeEventListener("mousemove", moveSliderLeft);
//     })
// })

// right.addEventListener("mousedown", function(event) {
//     moveSliderRight(event);
//     window.addEventListener("mousemove", moveSliderRight);
//     window.addEventListener("mouseup", function() {
//         window.removeEventListener("mousemove", moveSliderRight);
//     })
// })
// het test

const phone = {
    list: document.querySelector('.phone-list'),
    nav: document.querySelector('.nav'),

    loadData: (pageCurrent,pagePerNumber) => {
        var operation = "Read";
        var tableName = "san_pham";
        var condition = "MA_LOAI = 1";
        $.ajax({
            url: 'AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                condition: condition
            },
            success: function (response) {
                dataArray = JSON.parse(response)
                datalist = GetDataForPage(dataArray,pageCurrent,pagePerNumber)
                phone.loadItem(datalist)
                phone.loadNav(dataArray,pageCurrent,pagePerNumber)
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        });
    },
    loadItem: (arrayList) => {
        html = arrayList.map(item => {
            return `<div class="phone-item">
                    <img class="phone-img" src="/phoneShop/img/${item.HINH_ANH}" alt="chua co anh">
                    <div class="phone-wrap">
                        <a href="#" class="phone-link">
                            <p class="phone-producer">${item.TEN_SP}</p>
                        </a>
                    </div>
                
                    <div class="phone-footer">
                        <div class="phone-footer-wrap">
                    <span style="font-size: 20px; font-weight:bold ">Giá : ${item.GIA_BAN}đ</span>
                    </div>
                        <a href="?page=Phones&&id=${item.MA_SP}" class="phone-detail">View details</a>
                    </div>
                  </div>`
        }).join("")
        phone.list.innerHTML = html
    },
    loadNav: (arrayList,pageCurrent,pagePerNumber) => {
        var html1 = ''
        for (i = 1; i <= Math.ceil(arrayList.length / pagePerNumber); i++) {
            html1 += `<button class="${i == pageCurrent ? "cyan" : ''}" onclick="phone.loadData(${i},${pagePerNumber})">${i}</button>`
        }
        phone.nav.innerHTML = 
            `<div class="change_slide_content">
                <div class="change_slide" id="Pagination">
                        <button onclick="phone.prevPage(${pageCurrent},${pagePerNumber})"><<</button>
                        ${html1}
                        <button onclick="phone.nextPage(${Math.ceil(arrayList.length / pagePerNumber)},${pageCurrent},${pagePerNumber})">>></button>
                </div>
            </div>`
    },
    nextPage: (lenght, pageCurrent, pagePerNumber) => {
        if (lenght== pageCurrent) {
            console.log('chay if')
            alert('het roi next cai j nua')
        } else {
            console.log('chay else')
            phone.loadData(pageCurrent + 1,pagePerNumber)
        }
    },
    prevPage: (pageCurrent, pagePerNumber) => {
        if (pageCurrent == 1) {
            alert('het roi previously cai j nua')
        } else {
            phone.loadData(pageCurrent - 1,pagePerNumber)
        }
    },
}

phone.loadData(1,3)