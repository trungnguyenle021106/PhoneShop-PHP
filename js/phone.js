const phone = {
    list: document.querySelector('.phone-list'),
    nav: document.querySelector('.nav'),

    loadAjax: (pageCurrent,pagePerNumber,...cond) => {
        var operation = "Read";
        var tableName = "san_pham INNER JOIN loai ON san_pham.MA_LOAI = loai.MA_LOAI INNER JOIN nha_sx ON san_pham.MA_NSX = nha_sx.MA_NSX";
        var condition = "san_pham.MA_LOAI = 1";
        $.ajax({
            url: './AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                condition: condition
            },
            success: function (response) {
                dataArray = (response)
                dataArray = phone.loadDataCondition(dataArray,cond)
                datalist = phone.loadData(dataArray,pageCurrent,pagePerNumber)
                phone.loadItem(datalist)
                phone.loadNav(dataArray,pageCurrent,pagePerNumber,cond)
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        });
    },
    loadDataCondition: (dataArrays,cond) => {
        if(cond == '') {
            return dataArrays
        } else {
            if(cond[cond.length - 1] == 'Giá: nhỏ đến lớn') {
                dataArrays.sort(function(a, b) {
                    return Number(a.GIA_BAN) - Number(b.GIA_BAN);
                })
            } else if(cond[cond.length - 1] == 'Giá: lớn đến nhỏ') {
                dataArrays.sort(function(a, b) {
                    return Number(b.GIA_BAN) - Number(a.GIA_BAN);
                })
            }
            list = []
            for(dataArray of dataArrays) {
                for(idx of cond) {
                    if(dataArray.TEN_NSX === idx) {
                        list.push(dataArray)
                        break
                    }
                }
            }
            return list
        }
    },
    loadData: (dataArray,pageCurrent,pagePerNumber) => {
        var itemsArray = [];
        if (dataArray.length < pageCurrent * pagePerNumber) {
            for (var i = pageCurrent * pagePerNumber - pagePerNumber; i < dataArray.length; i++) {
                itemsArray.push(dataArray[i]);
            }
        }
        else {
            for (var i = pageCurrent * pagePerNumber - pagePerNumber; i < pageCurrent * pagePerNumber; i++) {
                itemsArray.push(dataArray[i]);
            }
        }
        
        return itemsArray;
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
                    <span style="font-size: 20px; font-weight:bold ">Giá : ${changePriceToString(item.GIA_BAN)}</span>
                    </div>
                        <a href="index.php?page=DetailPhone&MaSP=${item.MA_SP}" class="phone-detail">View details</a>
                    </div>
                  </div>`
        }).join("")
        phone.list.innerHTML = html
    },
    loadNav: (arrayList,pageCurrent,pagePerNumber,cond,maxPage = 4) => {
        stringCond =  "'" + cond.join("','") + "'"
        var html1 = ''
        var maxLength = Math.ceil(arrayList.length / pagePerNumber)
        var start = pageCurrent
        var end
        if (maxLength > 4) {
            if (start > 3) {
                if(start + 2 < maxLength) {
                    end = start + 2
                    start = start - 2
                } else {
                    end = maxLength
                    start = start - 2
                }
            } else {
                start = 1
                end = start + 4
            }
        } else {
            start = 1
            end = maxLength
        }

        for (i = start; i <= end; i++) {
            html1 += `<button class="${i == pageCurrent ? "cyan" : ''}" onclick="phone.loadAjax(${i},${pagePerNumber},${stringCond})">${i}</button>`
        }
        phone.nav.innerHTML = 
            `<div class="change_slide_content">
                <div class="change_slide" id="Pagination">
                        <button onclick="phone.prevPage(${pageCurrent},${pagePerNumber},${stringCond})"><<</button>
                        ${start > 1 ? `<button class="destroy-btn">...</button>`: ''}
                        ${html1}
                        ${end < maxLength ? `<button class="destroy-btn">...</button>`: ''}
                        <button onclick="phone.nextPage(${maxLength},${pageCurrent},${pagePerNumber},${stringCond})">>></button>
                </div>
            </div>`
    },
    nextPage: (lenght, pageCurrent, pagePerNumber,...cond) => {
        if (lenght == pageCurrent) {
            alert('het roi next cai j nua')
        } else {
            phone.loadAjax(pageCurrent + 1,pagePerNumber,...cond)
        }
    },
    prevPage: (pageCurrent, pagePerNumber,...cond) => {
        if (pageCurrent == 1) {
            alert('het roi previously cai j nua')
        } else {
            phone.loadAjax(pageCurrent - 1,pagePerNumber,...cond)
        }
    },
}

btnChecks = [...document.querySelectorAll('.content-item-check')]
btnTitles = [...document.querySelectorAll('.content-item-title')]

for(btnCheck of btnChecks) {
    btnCheck.addEventListener("change", function(event) {
        list = []
        for(btnCheck of btnChecks) {
            if(btnCheck.checked) {
                list.push(btnCheck.nextElementSibling.innerText)
            }
        }
        phone.loadAjax(1,6,...list)
    })
}

phone.loadAjax(1,6)