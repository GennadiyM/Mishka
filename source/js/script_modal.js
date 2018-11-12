var link = document.querySelector(".button--top-product");
var modal = document.querySelector(".modal-basket");
var close = document.querySelector(".overlay");

link.addEventListener("click", function (evt) {
    evt.preventDefault();
  	modal.classList.add("modal-basket--show");
  	close.classList.add("overlay--show");
});
  
close.addEventListener("click", function (evt) {
    evt.preventDefault();
  	modal.classList.remove("modal-basket--show");
  	close.classList.remove("overlay--show");
});
   
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modal.classList.contains("modal-basket--show")) {
        	modal.classList.remove("modal-basket--show");
      }
    }
});
