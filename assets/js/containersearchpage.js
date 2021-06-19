let selectOptions = document.querySelectorAll('#sealine option')
const select = document.getElementById('sealine')
const selectUl = document.querySelector('.mapsearch__form__sealine__selectUl')
const seaLineSelected = document.querySelector('.mapsearch__form__sealine__selected')

const getUlHeight = (ul) => {
    let counter = 0
    ul.querySelectorAll('li').forEach(each => {
        counter += each.offsetHeight
    })
    counter += 24
    counter += (ul.querySelectorAll('li').length - 1) * 6
    return counter + 'px'
}

selectOptions = [...selectOptions]
selectOptions.forEach(option => {
    let newLi = document.createElement('li')
    newLi.innerText = option.innerText
    newLi.dataset.val = option.value
    if (option.selected) {
        newLi.classList.add('active')
        seaLineSelected.dataset.selected = option.innerText
    }
    selectUl.appendChild(newLi)
    newLi.addEventListener('click', () => {
        selectUl.querySelector('li.active').classList.remove('active')
        newLi.classList.add('active')
        select.value = newLi.dataset.val
        seaLineSelected.dataset.selected = newLi.innerText
        selectUl.classList.toggle('toggled')
    })
    selectUl.style.setProperty('--heightt', getUlHeight(selectUl))
})
// seaLineSelected.addEventListener('click', () => {
//     selectUl.classList.toggle('toggled')
// })



let containerSearchForms = document.querySelectorAll('.containerssearchgrid__form')

containerSearchForms = [...containerSearchForms]

containerSearchForms.forEach(form => {
    let input = form.querySelector('input')
    let submitBtn = form.querySelector('button')
    let baseurl = submitBtn.dataset.href



    input.addEventListener('change', () => {
        if (input.value.length < 1) {
            form.classList.add('invalid')
            form.classList.add('invalid-shown')
        } else {
            form.classList.remove('invalid')
            form.classList.remove('invalid-shown')
        }

    })
    // console.log(baseurl)
    form.addEventListener('submit', e => {
        e.preventDefault()
        
        if (input.value.length < 1) {
            form.classList.add('invalid')
            form.classList.add('invalid-shown')
            return 
        } else {
            form.classList.remove('invalid')
            form.classList.remove('invalid-shown')
        }
        let stringInputValue = String(input.value)
        let completedLink = String(baseurl + stringInputValue)
        window.open(completedLink, '_blank')
        input.value = ''
    })
})