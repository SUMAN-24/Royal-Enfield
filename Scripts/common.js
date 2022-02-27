var toggleBtn = document.querySelector("#dropdownMenu");
var menulist = document.querySelector(".menu");
var navbar = document.querySelector(".navbar");

toggleBtn.addEventListener("click", function(){
    menulist.classList.toggle('active');
    navbar.classList.toggle('navbar-active');
})