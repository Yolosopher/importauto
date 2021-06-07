let transportstatusSelectOptions1 = document.querySelectorAll(
	'#transportstatus1 option'
)
const transportstatusSelect1 = document.getElementById('transportstatus1')
const transportstatusSelectUl1 = document.querySelector(
	'.mapsearch__form__sealine__selectUl1'
)
const transportstatusSealineText1 = document.querySelector(
	'.mapsearch__form__sealine__selected1'
)

let transportstatusSelectOptions2 = document.querySelectorAll(
	'#transportstatus2 option'
)
const transportstatusSelect2 = document.getElementById('transportstatus2')
const transportstatusSelectUl2 = document.querySelector(
	'.mapsearch__form__sealine__selectUl2'
)
const transportstatusSealineText2 = document.querySelector(
	'.mapsearch__form__sealine__selected2'
)

// loader parent
const loaderParent = document.querySelector(
	'.profilemain__resultlist__cars__container'
)

const filterAction = (filterOpt, filterValue, items, reset = false) => {
	if (!reset) {
		loaderParent.classList.add('loaderon')
		items.forEach((itm) => itm.classList.add('vanished'))
		items.forEach((each) => {
			if (+each.dataset[filterOpt] === +filterValue)
				each.classList.remove('vanished')
		})
		setTimeout(() => {
			loaderParent.classList.remove('loaderon')
		}, 300)
	} else {
		loaderParent.classList.add('loaderon')
		setTimeout(() => {
			items.forEach((itm) => itm.classList.remove('vanished'))
			loaderParent.classList.remove('loaderon')
		}, 300)
	}
}

const getUlHeight = (ul) => {
	let counter = 0
	ul.querySelectorAll('li').forEach((each) => {
		counter += each.offsetHeight
	})
	counter += 24
	counter += (ul.querySelectorAll('li').length - 1) * 6
	return counter + 'px'
}

const makeNiceSelect = (
	opts,
	activeTextEl,
	slct,
	slct_ul,
	transportstatus = false
) => {
	let optss = [...opts]
	let paymentOrTransport = transportstatus ? 'transport' : 'payment'
	optss.forEach((option) => {
		let newLi = document.createElement('li')
		newLi.innerText = option.innerText
		newLi.dataset.val = option.value
		if (option.selected) {
			newLi.classList.add('active')
			activeTextEl.dataset.selected = option.innerText
		}
		slct_ul.appendChild(newLi)
		newLi.addEventListener('click', () => {
			slct_ul.querySelector('li.active').classList.remove('active')
			newLi.classList.add('active')
			slct.value = newLi.dataset.val
			activeTextEl.dataset.selected = newLi.innerText
			slct_ul.classList.toggle('toggled')
			if (newLi.dataset.val === '0') {
				filterAction(
					paymentOrTransport,
					newLi.dataset.val,
					document.querySelectorAll(
						'.profilemain__resultlist__cars li'
					),
					true
				)
			} else {
				filterAction(
					paymentOrTransport,
					newLi.dataset.val,
					document.querySelectorAll(
						'.profilemain__resultlist__cars li'
					)
				)
			}
		})
		slct_ul.style.setProperty('--heightt', getUlHeight(slct_ul))
	})
	activeTextEl.addEventListener('click', () => {
		slct_ul.classList.toggle('toggled')
	})
}

makeNiceSelect(
	transportstatusSelectOptions1,
	transportstatusSealineText1,
	transportstatusSelect1,
	transportstatusSelectUl1,
	true
)
makeNiceSelect(
	transportstatusSelectOptions2,
	transportstatusSealineText2,
	transportstatusSelect2,
	transportstatusSelectUl2
)

const formsInMain = document.querySelectorAll('main form')

formsInMain.forEach((form) => {
	form.addEventListener('submit', (e) => {
		if (form.querySelector('input').value.length < 1) {
			e.preventDefault()
		}
	})
})

// pagination
const pagActiveLiNum = +document.querySelector(
	'.profilemain__resultlist__pagination__ul li.active'
).dataset.num
const pagLastLiNum = +document.querySelector(
	'.profilemain__resultlist__pagination__ul li:last-child'
).dataset.num
console.log('pagActiveLiNum: ', pagActiveLiNum)
console.log('pagLastLiNum: ', pagLastLiNum)
let aroundActiveNum = window.innerWidth > 1024 ? 5 : 3

let ulll = document.querySelector('.profilemain__resultlist__pagination__ul')
if (pagActiveLiNum >= aroundActiveNum) {
	// less than lastPageNum + aroundActiveNum
	if (pagActiveLiNum + aroundActiveNum - 1 <= pagLastLiNum) {
		ulll.querySelectorAll('li').forEach((li) => {
			if (+li.dataset.num !== pagActiveLiNum) {
				if (
					+li.dataset.num <
						pagActiveLiNum - (aroundActiveNum - 1) / 2 ||
					+li.dataset.num > pagActiveLiNum + (aroundActiveNum - 1) / 2
				) {
					if (
						+li.dataset.num !== 1 &&
						+li.dataset.num !== ulll.querySelectorAll('li').length
					) {
						li.classList.add('disabled')
					}
					if (+li.dataset.num === 1) {
						li.classList.add('sidedots')
					}
					if (
						+li.dataset.num === ulll.querySelectorAll('li').length
					) {
						li.classList.add('sidedots')
					}
				}
			}
		})
	} else {
		ulll.querySelectorAll('li').forEach((li) => {
			li.classList.add('disabled')
			if (+li.dataset.num >= ulll.querySelectorAll('li').length - aroundActiveNum) {
				li.classList.remove('disabled')
			}
			if (+li.dataset.num === 1) {
				li.classList.add('sidedots')
				li.classList.remove('disabled')
			}
		})
	}
} else {
	let firstLiDots = false
	ulll.querySelectorAll('li').forEach((li) => {
		li.classList.add('disabled')
		if (+li.dataset.num <= pagActiveLiNum + (aroundActiveNum - 1) / 2
		) {
			li.classList.remove('disabled')
		}
		if (pagActiveLiNum === 5 && +li.dataset.num === 2) {
			li.classList.add('disabled')
			firstLiDots = true
		}
		if (+li.dataset.num === 1) {
			li.classList.remove('disabled')
		}
		if (+li.dataset.num === ulll.querySelectorAll('li').length) {
			li.classList.add('sidedots')
			li.classList.remove('disabled')
		}
	})
	if (firstLiDots)
		document.querySelector('li[data-num="1"').classList.add('sidedots')
}
