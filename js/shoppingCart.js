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
                            <div class="Ten_sp">Accessories</div>
                            <div class="thongtinsp" >
                                <div style="width: 50%;"><a class="thea"  href="#">${item.name}</a></div>
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
    addCart: (data = undefined) => {
        if(data != undefined) {
            cart.orders[0].order.push(data);
            cart.ordersApi.edit(cart.orders[0])
        }
    }
}
cart.loadDataIsEmpty()
cart.loadLayouts()

btnSubmit = document.querySelector('.btn_DatHang')
form = document.querySelector('.ShoppingCart_Page')

btnSubmit.onclick = e => {
    showAsk()
}

function showAsk() {
    document.querySelector('.ask').classList.add('ask--active')
    document.querySelector('.ask-container').innerHTML = `
    <p class="ask-content">Có muốn mua hàng</p>
    <div style="display: flex; width: 100%; justify-content: space-around; margin: 20px 0">
        <button class="yes">Mua</button>
        <button class="no">trở lại</button>
    </div>
    `
    document.querySelector('.no').onclick = () => {
        document.querySelector('.ask').classList.remove('ask--active')
    }

    document.querySelector('.yes').onclick = () => {
        form.submit()
    }
}