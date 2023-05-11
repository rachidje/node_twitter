window.addEventListener('DOMContentLoaded', () => {
    const imageUploadIcon = document.getElementById('upload-image');
    const inputImage = document.getElementById('image');

    imageUploadIcon.addEventListener('click', () => {
        inputImage.click()
    })

    inputImage.addEventListener('change', (event) => {
        event.preventDefault();
        const filename = document.getElementById('filename-image');
        filename.textContent = `${inputImage.files[0].name.slice(0, 10)}...`;
    })
})