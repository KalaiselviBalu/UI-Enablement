var addCart = document.getElementById("addCart");
var selectedImage = document.querySelector(".selected-image");
addCart.addEventListener("click" , function(e) {
    e.preventDefault();
    selectedImage.classList.add("show-image");
});