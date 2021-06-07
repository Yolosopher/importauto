let homemainslider = new Swiper('.homemainslider__swiper', {
    slidesPerView: 1,
    speed: 800,
    pagination: {
        el: '.homemainslider__pagination',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.homemainslider__nav__right',
        prevEl: '.homemainslider__nav__left',
    }
})
let homegalleryslider = new Swiper('.homegallery__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    
    pagination: {
        el: '.homegallery__pagination',
        type: 'bullets'
    },
    navigation: {
        nextEl: '.homegallery__nav__right',
        prevEl: '.homegallery__nav__left',
    },
    breakpoints: {
        1025: {
            slidesPerView: 4,
            spaceBetween: 25
        }
    }
})

if (window.matchMedia("(min-width: 1025px)").matches) {
    let homecompaniesslider = new Swiper('.homecompanies__swiper', {
        slidesPerView: 'auto',
        speed: 1500,
        spaceBetween: 10,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        loop: true

    })
}

const homeAboutUl = document.querySelector('.homeabout__content__textbox')
const homeAboutTogglerBtn = document.querySelector('.homeabout__content__link')

let firstPinHomeAboutUl = homeAboutUl.querySelector('p').offsetHeight
let secondPinHomeAboutUl = homeAboutUl.querySelector('p:nth-child(2)').offsetHeight

console.log('firstPinHomeAboutUl: ', firstPinHomeAboutUl)
console.log('secondPinHomeAboutUl: ', secondPinHomeAboutUl)
let res = firstPinHomeAboutUl + secondPinHomeAboutUl + 'px'


homeAboutUl.style.setProperty('--textdefaultheight', `calc(${res} + 1em)`)
homeAboutUl.style.setProperty('--texttoggledheight', homeAboutUl.scrollHeight + 'px')

homeAboutTogglerBtn.addEventListener('click', () => {
    homeAboutTogglerBtn.classList.toggle('toggled')
    homeAboutUl.classList.toggle('toggled')
})
setTimeout(() => {
    homeAboutUl.style.setProperty('--texttoggledheight', homeAboutUl.scrollHeight + 'px')
}, 100);