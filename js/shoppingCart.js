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

const cart = {
    list: document.querySelector('.left'),
    ordersApi: createStorage('orders'),
    orders: createStorage('orders').get(),

    loadDataIsEmpty: () => {
        if(cart.ordersApi.get().length == 0) {
            cart.ordersApi.set({id: 0,order: [
                {   
                    MA_SP: 1,
                    name: 'Hypergear 20W White USB-C PD Wall Charger Hub',
                    img: 'https://amsprod.blob.core.windows.net/assets/e8ddb3b8-f0e6-43eb-a9af-0ec02d34e353.png',
                    value: 1,
                    price: '$24.95',
                },
                {   
                    MA_SP: 1,
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
                            <input type="hidden" name="product_id" id="product_id" value="${item.MA_SP}">
                            <div class="Ten_sp">Accessories</div>
                            <div class="thongtinsp" >
                                <div style="width: 50%;"><a class="thea"  href="#">${item.name}</a></div>
                                <div style="font-weight: bold;">${item.price}</div>
                            </div>

                            <div style="display: inline-flex; width: 100%; margin-top: 30px;">
                                <div class="soluong">
                                    <button type="button" onclick="cart.minusOrder(${idx})" id="" >-</button>
                                    <input class="input-quantity" readonly type="text" name="soluong" id="" value="${item.value}">
                                    <button type="button" onclick="cart.plusOrder(${idx})" id="" >+</button>
                                </div>
                                <div style="display: block;">
                                    <div class="kiemtra">
                                        <img src="https://www.themobileshop.ca/static/bccef72a0d7554f6b1b5c608d4b4d5c3/icon_notification_available.svg" alt="">
                                        <div>Available to reserve in selected store</div>
                                    </div  >
                                    <div style="width: 100%; margin-top: 20px;">
                                        <button type="button" onclick="cart.deleteOrder(${idx})" class="btnXoa">Xoa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        }).join("")

        cart.list.innerHTML = `
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
}
cart.loadDataIsEmpty()
cart.loadLayouts()