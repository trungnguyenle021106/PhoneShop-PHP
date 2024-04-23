
<section id="container_formthemPNK">
    <div id="content_thmPNK">
    <h2>Thêm phiếu nhập</h2>
<label for="">Mã nhân viên nhập phiếu: </label>
<select name="" id="opt_MANV_themPNK">
    <option value="">1</option>
    <option value="">2</option>
    <option value="">3</option>
    <option value="">4</option>
</select>
<label for="">Mã nhà sản xuất phiếu nhập: </label>
<select name="" id="opt_MANSX_themPNK">
    <option value="">1</option>
    <option value="">2</option>
    <option value="">3</option>
    <option value="">4</option>
</select>

<div id="container_content_themPNK">

<div id="left_container_themPNK">
    <div id="scroll_themPNK">
        <table>
            <thead>
                    <td>Mã sản phẩm</td>
                    <td>Tên sản phẩm</td>
                    <td>Giá bán</td>
                    <td>Hình ảnh</td>
                    <td>Số lượng</td>
            </thead>
            <tbody>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tbody>
        </table>
    </div>
    <div id="search_PNK_them">
        <input type="text" placeholder="Nhập mã sản phẩm cần tìm">
        <button><img src="../Img/search (1).png" alt="##"></button>
    </div>
</div>

<div id="right_container_themPNK">
<h3>Chi tiết phiếu nhập</h3>

<div id="scroll_themCTPN">
    <table>
        <thead>
            <td>Mã sản phẩm</td>
            <td style="width: 100px; ">Hình ảnh</td>
            <td>Đơn giá</td>
            <td>Số lượng</td>
            <td>Thành tiền</td>
            <td>Thoa tác</td>
        </thead>
        <tbody>
            <td>1</td>
            <td>2</td>
            <td><input type="number"></td>
            <td><input type="number"></td>
            <td><input type="number" readonly></td>
            <td><button id="xoa_CTPN">Xóa</button></td>
        </tbody>
    </table>
</div>
</div>
</div>
<button id="them_CTPN">Thêm</button>
    </div>
</section>



<style>
    /* CSS cho container chính */
#container_formthemPNK{
    height: 100%;
    /* display: none; */
    border: 1px solid black;
    position: absolute;
    background-color: rgba(204, 204, 204, 0.8); 
    top: 0px;
    right: 5px;
  
}

#content_thmPNK{
    margin-top: 50px;
    border: 1px solid black;
    background-color: #FFFFFF;
    height: 90%;
}


/* CSS cho nút Thêm */
#container_formthemPNK #them_CTPN {
    margin-left: 1460px;
    margin-top: 46px;
    padding: 6px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
    
/* CSS cho tiêu đề */
#container_formthemPNK h2 {
    text-align: center;
}

/* CSS cho các label */
#container_formthemPNK label {
    
    margin-bottom: 10px;
    font-weight: bold;
}

/* CSS cho select box */
#container_formthemPNK select {

    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;

}

#scroll_themPNK{
    overflow-y: scroll;
    height: 100%;
}
#scroll_themCTPN{
    overflow-y: scroll;
    height: 75%;
}

/* CSS cho container content */
#container_content_themPNK {
    display: flex;
    height: 70%;
}

/* CSS cho left container */
#left_container_themPNK {
    width: 50%;
    margin-right: 20px;
    height: 479px;
}


/* CSS cho right container */
#right_container_themPNK {
    width: 50%;
    height: 559px;
}

#left_container_themPNK table thead td{
    text-align: center;
    background-color: grey;
    font-weight: bold;
}

#left_container_themPNK table tbody td{
    text-align: center;
}

/* CSS cho input trong left container */
#left_container_themPNK input[type="text"]{
    width: 96%;
    padding: 8px;
    margin-bottom: 15px;
}


#left_container_themPNK button img {
    width: 30px;
    height: 27px;
    margin-top: 3px;

    }

#left_container_themPNK button{
    border: none;
    border-radius: 5px;
    width: 8%;
    height: 33px;
    
}


#search_PNK_them{
display: flex;
height: 50px;
margin-top: 1px;


}


/* CSS cho table */
#scroll_themPNK table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themPNK table, #scroll_themPNK th, #scroll_themPNK td {
    border: 1px solid #ddd;
}

#scroll_themPNK th, #scroll_themPNK td {
    padding: 8px;
    text-align: left;
}

#scroll_themPNK th {
    background-color: #f2f2f2;
}

#right_container_themPNK{
    border: 1px solid black;
    border-bottom: none;
    border-left: none;
}
#right_container_themPNK h3{
text-align: center;
}

#scroll_themCTPN table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themCTPN table, #scroll_themCTPN th, #scroll_themCTPN thead {
    border: 1px solid #ddd;
    padding: 0px;
}

#scroll_themCTPN th, #scroll_themCTPN td {

    text-align: center;
}

#scroll_themCTPN table thead{
background-color: #f2f2f2;
font-weight: bold;
}

#xoa_CTPN{
    background-color: red;
    border: 1px solid red;
    color: white;
}
</style>