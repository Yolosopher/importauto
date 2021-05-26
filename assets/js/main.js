const nav__langbar = document.querySelector('.nav__langbar')
const burger = document.querySelector('.burger')
const mobilenav = document.querySelector('.mobilenav')
const mobilenav__X = document.querySelector('.mobilenav__X')
const loginbtn__mobile = document.querySelector('.loginbtn__mobile')
const loginmodal = document.querySelector('.loginmodal')
const loginmodal__X = document.querySelector('.loginmodal__X')
const nav__loginbtn = document.querySelector('.nav__loginbtn')
const loginmodalbg = document.querySelector('.loginmodalbg')

nav__langbar.addEventListener('click', () => {
    nav__langbar.classList.add('toggled')
})

window.addEventListener('click', e => {
    if (e.target !== nav__langbar) {
        nav__langbar.classList.remove('toggled')
    }
}, true)


burger.addEventListener('click', () => {
    mobilenav.classList.add('toggled')
})
mobilenav__X.addEventListener('click', () => {
    mobilenav.classList.remove('toggled')
})


loginbtn__mobile.addEventListener('click', () => {
    loginmodal.classList.add('toggled')
})
nav__loginbtn.addEventListener('click', () => {
    loginmodal.classList.add('toggled')
    loginmodalbg.classList.add('toggled')
})

loginmodal__X.addEventListener('click', () => {
    loginmodal.classList.remove('toggled')
    loginmodalbg.classList.remove('toggled')
})
loginmodalbg.addEventListener('click', () => {
    loginmodal.classList.remove('toggled')
    loginmodalbg.classList.remove('toggled')
})

// loginvalidations
const loginemail = document.getElementById('loginemail')
const loginpass = document.getElementById('loginpass')
const loginform = document.getElementById('loginform')

const emailOrIdChecker = (el) => {
    let val = el.value
    let ifEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)
    let ifID = /^[0-9]*$/.test(val)
    if (val === '') {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.remove('invalid-shown')
    } else if (!ifEmail) {
        if (!ifID && val.length !== 11) {
            el.parentElement.classList.add('invalid')
            el.parentElement.classList.add('invalid-shown')
        } else {
            el.parentElement.classList.remove('invalid')
            el.parentElement.classList.remove('invalid-shown')
        }
    } else {
        el.parentElement.classList.remove('invalid')
        el.parentElement.classList.remove('invalid-shown')
    }
}
const nameChecker = (el) => {
    let val = el.value

    if (val === '') {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.remove('invalid-shown')
    } else if (val.length < 2) {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.add('invalid-shown')
    } else {
        el.parentElement.classList.remove('invalid')
        el.parentElement.classList.remove('invalid-shown')
    }
}

loginemail.addEventListener('change', () => {
    emailOrIdChecker(loginemail)
})

loginpass.addEventListener('change', () => {
    nameChecker(loginpass)
})

loginform.addEventListener('submit', e => {
    emailOrIdChecker(loginemail)
    nameChecker(loginpass)

    if (loginform.querySelectorAll('.invalid')[0]) {
        e.preventDefault()

        loginform.querySelectorAll('.invalid').forEach(each => {
            each.classList.add('invalid-shown')
        })
    }
})