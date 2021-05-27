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
seaLineSelected.addEventListener('click', () => {
    selectUl.classList.toggle('toggled')
})


const formsInMain = document.querySelectorAll('main form')

formsInMain.forEach(form => {
    form.addEventListener('submit', e => {
        if(form.querySelector('input').value.length < 1) {
            e.preventDefault()
        }
    })
})