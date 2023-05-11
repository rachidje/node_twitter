const allOptionBtns = document.querySelectorAll('.fa-solid.fa-ellipsis-vertical');
const allOptionMenu = document.querySelectorAll('.tweet-options');
const allCancelBtns = document.querySelectorAll('.fa-solid.fa-ban');

allOptionBtns.forEach(optionBtn => {
    optionBtn.addEventListener('click', function () {
        const id = optionBtn.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id;
        allOptionMenu.forEach((optionMenu) => {
            if(optionMenu.dataset.id === id) {
                optionMenu.style.bottom = '0';
            }
        })
    })
})


allCancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener('click', function() {
        const id = cancelBtn.parentNode.dataset.id
        allOptionMenu.forEach((optionMenu) => {
            if(optionMenu.dataset.id === id) {
                optionMenu.style.bottom = '-350px';
            }
        })
    })
})