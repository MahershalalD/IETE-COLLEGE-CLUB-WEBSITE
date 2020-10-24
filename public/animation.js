
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
    $(".notice-manage").addClass("notice-manage-i");
});


const el = document.querySelector('.counter')

$('.count').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
