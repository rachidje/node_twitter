const avatar = document.querySelector('.topbar-avatar img');
const topbarMenu = document.querySelector('#topbar-menu');
const avatarMenu = document.querySelector('.topbar-menu-avatar img');

avatar.addEventListener('click', function(event) {
    topbarMenu.style.left = '0';
    event.stopPropagation();
})

avatarMenu.addEventListener('click', function(event) {
    topbarMenu.style.left = "-350px";
    event.stopPropagation();
})

document.addEventListener('click', function (event) {
    if(!topbarMenu.contains(event.target)) {
        topbarMenu.style.left = "-350px";
    }
})