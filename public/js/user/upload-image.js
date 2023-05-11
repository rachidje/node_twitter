window.addEventListener('DOMContentLoaded', () => {
    const imageProfile = document.getElementById('profile-image');
    const inputAvatar = document.getElementById('avatar');
    const formContainer = document.getElementById('form-container')

    imageProfile.addEventListener('click', (event) => {
        inputAvatar.click();
    })

    inputAvatar.addEventListener('change', (event) => {
        formContainer.submit();
    })
})