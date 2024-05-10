function createStorage(key) {
    const store = JSON.parse(localStorage.getItem(key)) ?? [] // dich mã du lieu JOSN tu locastrorage về wed
    const save = () => {
        localStorage.setItem(key, JSON.stringify(store)) // phiên mã JOSN đẩy lên locastrorage
    }

    const storage = {
        // lay du lieu tu locastorage
        get() {
            return store
        },

        // them du lieu tu locastorage
        set(data = undefined) {
            if(data != undefined) {
                store.push(data)
                save()
            }
        },

        // chinh sua du lieu tu locastorage
        edit(data = undefined) {
            if(data != undefined) {
                store.forEach((item,idx) => {
                    if(item.id == data.id) {
                        store.splice(idx,1,data);
                    }
                })
            }
            save()
        },

        // xoa du lieu tu locastorage
        remove(id = undefined) {
            if(id != undefined) {
                store.forEach((item,idx) => {
                    if(item.id == id) {
                        store.splice(idx,1)
                    }
                })
                save()
            }
        },
    }
    return storage
}
function loadAjax(callback) {
    var operation = "Read";
    var tableName = "khuyen_mai";
    var condition = "";
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
            var dataArray = JSON.parse(response);
            if (typeof callback === 'function') {
                callback(dataArray);
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function loadAjax1(callback, id) {
    var operation = "Read";
    var tableName = "khach_hang";
    var condition = "MA_KH = " + id;
    console.log(condition)
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
            var dataArray = JSON.parse(response);
            if (typeof callback === 'function') {
                callback(dataArray);
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function formatCurrency(amount) {
    amount = parseFloat(amount);
    if (isNaN(amount)) {
        return "Số tiền không hợp lệ";
    }
    const formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedAmount;
}

const cart = {
    list: document.querySelector('.left'),
    ordersApi: createStorage('orders'),
    orders: createStorage('orders').get(),

    loadDataIsEmpty: () => {
        if(cart.ordersApi.get().length == 0) {
            cart.ordersApi.set({id: 0,order: [
                {   
                    MA_SP: 2,
                    name: 'Hypergear 20W White USB-C PD Wall Charger Hub',
                    img: 'https://amsprod.blob.core.windows.net/assets/e8ddb3b8-f0e6-43eb-a9af-0ec02d34e353.png',
                    value: 1,
                    price: '$24.95',
                },
                {   
                    MA_SP: 3,
                    name: 'Hypergear 20W White USB-C PD Wall Charger Hub',
                    img: 'https://amsprod.blob.core.windows.net/assets/e8ddb3b8-f0e6-43eb-a9af-0ec02d34e353.png',
                    value: 1,
                    price: '$24.95',
                },
            ]})
        }
    },
    loadLayouts: () => {
        listOrder = cart.orders[0].order
        html = listOrder.map((item,idx) => {
            return `
                    <div class="CartItem">
                        <div class="product_image">
                            <img src="${item.img}" alt="loi anh">
                        </div>
                        <div class="product_detail">
                            <input type="hidden" name="product_id[]" value="${item.MA_SP}">
                            <input type="hidden" name="price[]" value="${item.price.replace(/[.đĐ]/g, '')}">
                            <div class="thongtinsp" >
                                <div style="width: 50   %;"><a class="thea"  href="#">${item.name}</a></div>
                                <div style="font-weight: bold; font-size:16px; margin-left:24px;">${item.price}</div>
                            </div>

                            <div style="display: flex; width: 100%; margin-top: 30px; justify-content: space-between;;">
                                <div class="soluong">
                                    <button type="button" onclick="cart.minusOrder(${idx})" id="" >-</button>
                                    <input class="input-quantity" readonly type="text" name="soluong[]" id="" value="${item.value}">
                                    <button type="button" onclick="cart.plusOrder(${idx})" id="" >+</button>
                                </div>
                                <div style="display: block;">
                                    <div style="width: 100%; margin-top: 20px;">
                                        <button type="button" onclick="cart.deleteOrder(${idx})" class="btnXoa">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        }).join("")

        cart.list.innerHTML = `
            <input class="Makh" type="hidden" name="Makh"  value="">
            <input class="vat" type="hidden" name="vat"  value="">
            <input class="MaKm" type="hidden" name="km"  value="">
            <input class="total" type="hidden" name="total"  value="">
            <h1>Your reservation basket:</h1>
            ${html}
        `
    },
    plusOrder: (idx) => {
        const listValue = [...document.querySelectorAll('.input-quantity')]
        var inputCurrentValue = listValue[idx].value
        var currentValue = parseInt(inputCurrentValue);
        listValue[idx].value = currentValue + 1
        cart.orders[0].order[idx].value = currentValue + 1
        cart.ordersApi.edit(cart.orders[0])
    },
    minusOrder: (idx) => {
        const listValue = [...document.querySelectorAll('.input-quantity')]
        if(parseInt(listValue[idx].value) > 1) {
            var inputCurrentValue = listValue[idx].value
            var currentValue = parseInt(inputCurrentValue);
            listValue[idx].value = currentValue - 1
            cart.orders[0].order[idx].value = currentValue - 1
            cart.ordersApi.edit(cart.orders[0])
        } else {
            cart.deleteOrder(idx)
        }
    },
    deleteOrder: (idx) => {
        console.log(cart.orders[0].order)
        cart.orders[0].order.splice(idx, 1);
        cart.loadLayouts()
        cart.ordersApi.edit(cart.orders[0])
        if(cart.orders[0].order.length == 0) {
           localStorage.removeItem('orders');
        }
    },
    addCart: (data = undefined) => {
        if(data != undefined) {
            cart.orders[0].order.push(data);
            cart.ordersApi.edit(cart.orders[0])
        }
    }
}

cart.loadDataIsEmpty()
cart.loadLayouts()

form = document.querySelector('.ShoppingCart_Page')

function showAsk(dk = false, tk = 3) {
    loadAjax1(list => {
        console.log(list)
        if(list[0].DIA_CHI == '' || list[0].G_TINH == '' || list[0].SO_CCCD == '' || list[0].SO_DT == '') {
            errorToast("Vui lòng nhập thông tin trước khi thanh toán!")
        } else {
            showInvoice()
        }
    },tk)

    function showInvoice() {
        loadAjax(list => {
            listOrder = cart.orders[0].order
            const total = listOrder.reduce((acc, product) => {
                const totalPrice = product.price.replace(/[.đĐ]/g, '') * product.value;

                acc.totalPrice += totalPrice;
                
                return acc;
            }, { totalPrice: 0});
            var km = 0;
            var sotg = 0;
            for(var i = 0; i < list.length; i++) {
                if(total.totalPrice > Number(list[i].DIEU_KIEN)) {
                    if(sotg < Number(list[i].SO_TIEN_GIAM)) {
                        sotg = list[i].SO_TIEN_GIAM
                        km = list[i].MA_KM
                    }
                }
            } 

            document.querySelector('.Makh').value = tk
            document.querySelector('.vat').value = total.totalPrice/100*10
            document.querySelector('.MaKm').value = km
            document.querySelector('.total').value = total.totalPrice + total.totalPrice/100*10 - sotg
            document.querySelector('.total_price').innerText = formatCurrency(total.totalPrice)
            document.querySelector('.vat_price').innerText = formatCurrency(total.totalPrice/100*10)
            document.querySelector('.km_price').innerText = sotg == 0 ? 'không có' : formatCurrency(sotg)
            document.querySelector('.total_price_all').innerText = formatCurrency(total.totalPrice + total.totalPrice/100*10 - sotg)
        })

        if(dk == true) {
            document.querySelector('.ask').classList.add('ask--active')
        }

        listOrder = cart.orders[0].order
            html = listOrder.map((item,idx) => {
                return `
                        <div class="CartItem" style="display:flex; width:40%">
                            <div class="product_image" style="width: 40%">
                                <img src="${item.img}" alt="loi anh">
                            </div>
                            <div class="product_detail">
                                <input type="hidden" name="product_id[]" value="${item.MA_SP}">
                                <input type="hidden" name="price[]" value="${item.price.replace(/[.đĐ]/g, '')}">
                                <div class="thongtinsp" >
                                    <div style="width: 50   %;"><a class="thea"  href="#">${item.name}</a></div>
                                    <div style="font-weight: bold; font-size:16px; margin-left:24px;">${item.price}</div>
                                </div>

                                <div style="display: flex; width: 100%; margin-top: 30px; justify-content: space-between;;">
                                    <div class="soluong">
                                        <span style="font-size:16px;">số lượng</span>
                                        <input class="input-quantity" readonly type="text" name="soluong[]" id="" value="${item.value}">
                                    </div>
                                </div>
                            </div>
                        </div>`
            }).join("")

        document.querySelector('.ask-container').innerHTML = `
        <p class="ask-content">Bạn có muốn mua hàng</p>
        <div style="max-width: 60vw; display: flex; flex-wrap: wrap; width: 100%; justify-content: space-around; margin: 20px 0">
            <div style="display:flex; justify-content: space-between; flex-wrap:wrap; width: 100%; max-height: 50vh; overflow-y: scroll;box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);">
                ${html}
            </div>
            <div style="margin-top: 16px; width: 100%;">
                <p style="font-size:16px; text-align:center;">
                    Tổng tiền chưa bao gồm VAT và khuyến mãi:
                    <span class="total_price" style="color:#cb0707; font-size:18px"></span>
                </p>
                <p style="font-size:16px ;text-align:center;margin-top: 12px;">
                    Phí VAT 10%:
                    <span class="vat_price" style="color:#cb0707; font-size:18px"></span>
                </p>
                <p style="font-size:16px ;text-align:center;margin-top: 12px;">
                    Khuyến mãi:
                    <span class="km_price" style="color:#cb0707; font-size:18px"></span>
                    xem trong phần khuyến mãi để biết thêm
                </p>
                <p style="font-size:16px ;text-align:center;margin-top: 12px;">
                    Tổng tiền đã bao gồm VAT và khuyến mãi:
                    <span class="total_price_all" style="color:#cb0707; font-size:18px"></span>
                </p>
            </div>
            <div style="margin-top: 8px">
                <button class="yes" style="margin-right:30px">Mua</button>
                <button class="no">trở lại</button>
            </div>
        </div>
        `
        document.querySelector('.no').onclick = () => {
            document.querySelector('.ask').classList.remove('ask--active')
        }

        document.querySelector('.yes').onclick = () => {
            successToast('Thanh toán thành công!')
            form.submit()
        }
    }
}