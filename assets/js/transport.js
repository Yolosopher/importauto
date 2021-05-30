let selectdivs = document.querySelectorAll('.selectdiv')

selectdivs = [...selectdivs]

const getUlHeight = (ul) => {
	let counter = 0
	ul.querySelectorAll('li').forEach((each) => {
		counter += each.offsetHeight
	})
	counter += 66
	counter += (ul.querySelectorAll('li').length - 1) * 12
	return counter + 'px'
}

const actionForSelectedOption = (option, newLi, activeText, selectdiv) => {
    newLi.classList.add('active')
    activeText.dataset.value = option.value
    activeText.dataset.text = option.innerText
    if (option.value !== '0') {
        if (selectdiv.previousElementSibling) {
            selectdiv.previousElementSibling.classList.add('active')
        }
    } else {
        if (selectdiv.previousElementSibling) {
            selectdiv.previousElementSibling.classList.remove('active')
        }
    }
}

selectdivs.forEach(selectdiv => {
    let select = selectdiv.querySelector('select')
    let options = selectdiv.querySelectorAll('select option')
    options = [...options]
    let niceSelectUl = selectdiv.querySelector('.selectdiv__niceselect')
    let activeText = selectdiv.querySelector('.selectdiv__activetext')
    activeText.addEventListener('click', () => {
        selectdiv.classList.toggle('toggled')
    })
    window.addEventListener('click', e => {
        if (e.target.closest('.selectdiv__niceselect') !== niceSelectUl) {
            selectdiv.classList.remove('toggled')
        }
    }, true)
    options.forEach(option => {
        let newLi = document.createElement('li')
        newLi.innerText = option.innerText
        newLi.dataset.value = option.value

        if (option.selected) {
            actionForSelectedOption(option, newLi, activeText, selectdiv)
        }

        niceSelectUl.appendChild(newLi)

        newLi.addEventListener('click', () => {
            select.value = newLi.dataset.value
            niceSelectUl.querySelector('li.active').classList.remove('active')
            newLi.classList.add('active')
            selectdiv.classList.remove('toggled')
            actionForSelectedOption(option, newLi, activeText, selectdiv)
        })
    })
    niceSelectUl.style.setProperty('--heighttt', getUlHeight(niceSelectUl))
})