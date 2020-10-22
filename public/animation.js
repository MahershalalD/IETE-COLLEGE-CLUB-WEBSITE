const nav = document.querySelector(".navbar-items")
const bur = document.querySelector('.burger');
const links = document.querySelectorAll(".navbar-items li")
bur.addEventListener('click', () => {
    nav.classList.toggle('nav-active'),
        bur.classList.toggle('toggle')
},
    links.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    })
)
$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
    $("nav").addClass("nav-after");
});