function toast ({
    title = '',
    message = '' ,
    type = 'info',
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div')

        const autoRemoveId = setTimeout(function() {
                main.removeChild(toast);
            }, duration + 1000);
        
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            } 
        }

        const icons = {
            success: './img/success.png',
            error: './img/error.png',
            infor: './img/cart.jpg'
        };


        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        
        toast.innerHTML = `
            <div class="toast__icon">
            <img class="toast__icon--img" src="${icon}">
            </div>
            <div class="toast__body">
            <p class="toast__msg">${message}</p>
            </div>
        `;
            main.appendChild(toast);
}}

function errorToast(mess) {
    toast({
        message: mess,
        type: 'error',
        duration: 10000
    });
}

function successToast(mess) {
    toast({
        message: mess,
        type: 'success',
        duration: 10000
    });
}