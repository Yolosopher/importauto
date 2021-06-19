let selectdivs = document.querySelectorAll('.selectdiv')
selectdivs = [...selectdivs]

let changeGoogleMapLocation, changeGoogleMapBagging, changeGoogleMapLanding
// start init map
function initMap() {
	let boundCoords = []

	// The location of location
	var location = { lat: 42.16062308578706, lng: 43.509062471747875 }
	// options
	const opts = {
		zoom: 7,
		zoomControl: false,
		// zoomControlOptions: {
		// 	position: google.maps.ControlPosition.LEFT_CENTER,
		// },
		mapTypeControl: false,
		controlSize: 36,
		streetViewControl: false,
		fullscreenControl: true,

		center: location,
	}
	// The map, centered at location
	var map = new google.maps.Map(document.getElementById('map'), opts)
	let locationMarker, baggingMarker, landingMarker

	// bounder
	let flightPathArr = []
	function bounder() {
		boundCoords = []
		if (!!locationMarker) boundCoords.push(locationMarker)
		if (!!baggingMarker) boundCoords.push(baggingMarker)
		if (!!landingMarker) boundCoords.push(landingMarker)

		flightPathArr[0] && flightPathArr[0].setMap(null)
		flightPathArr.pop()

		let bounds = new google.maps.LatLngBounds()
		let fligthPathCoords = []
		for (let i = 0; i < boundCoords.length; i++) {
			const boundCoord = boundCoords[i]
			let newFlightPathObj
			if (boundCoord.position.lat() !== undefined) {
				newFlightPathObj = {
					lat: boundCoord.position.lat(),
					lng: boundCoord.position.lng(),
				}
				fligthPathCoords.push(newFlightPathObj)
			}
			let myLatLng = new google.maps.LatLng(
				newFlightPathObj.lat,
				newFlightPathObj.lng
			)
			bounds.extend(myLatLng)
		}
		if (boundCoords[0]) {
			const lineSymbol = {
				path: 'M 0,-1 0,1',
				strokeOpacity: 1,
				scale: 4,
			}
			flightPathArr[0] = new google.maps.Polyline({
				path: fligthPathCoords,
				// geodesic: true,
				strokeColor: '#FFF',
				strokeOpacity: 0,
				strokeWeight: 2,
				icons: [
					{
						icon: lineSymbol,
						offset: '10%',
						repeat: '20px',
					},
				],
			})
			flightPathArr[0].setMap(map)
			map.fitBounds(bounds, {
				padding: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				},
			})
			if (!fligthPathCoords[1]) {
				map.setZoom(7)
			}
		} else {
			map.setZoom(7)
		}
	}

	changeGoogleMapLocation = (element = false, reset = false) => {
		if (reset) {
			locationMarker.setMap(null)
			locationMarker = null
		} else {
			let loc = {
				lat: +element.dataset.lat,
				lng: +element.dataset.lng,
			}
			console.log(`${window.location.origin}/importauto/assets/img/transport/baggingport.svg`)
			locationMarker = new google.maps.Marker({
				position: loc,
				icon: {
					// url: '/' + element.dataset.logo,
					url: `${window.location.origin}/importauto/assets/img/transport/baggingport.svg`,
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(20, 20),
				},
			})
			console.log(locationMarker)
		}
		bounder()
	}
	changeGoogleMapBagging = (element = false, reset = false) => {
		let loc = {
			lat: +element.dataset.lat,
			lng: +element.dataset.lng,
		}
		baggingMarker = new google.maps.Marker({
			position: loc,
			icon: {
				url: '/assets/img/transport/baggingport.svg',
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(20, 20),
			},
		})
		bounder()
	}
	changeGoogleMapLanding = (element = false, reset = false) => {
		let loc = {
			lat: +element.dataset.lat,
			lng: +element.dataset.lng,
		}
		landingMarker = new google.maps.Marker({
			position: loc,
			icon: {
				url: '/assets/img/transport/landingport.svg',
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(20, 20),
			},
		})
		bounder()
	}

	function priceUpdater() {
		// let counter = 0
		// if (+baggingportselect.value !== 0) {
		// 	let activeLiPrice =
		// 		+baggingportselect.nextElementSibling.querySelector('li.active')
		// 			.dataset.price
		// 	counter += activeLiPrice
		// }
		// if (+landingportselect.value !== 0) {
		// 	let activeLiPrice =
		// 		+landingportselect.nextElementSibling.querySelector('li.active')
		// 			.dataset.price
		// 	counter += activeLiPrice
		// }
		// wholePriceSpan.innerText = counter
	}
	// selectdivs.forEach((selectdiv, selectDivIndex) => {
	// 	let markers = []
	// 	let niceSelectUl = selectdiv.querySelector('.selectdiv__niceselect')
	// 	niceSelectUl.querySelectorAll('li').forEach((li) => {
	// 		google.maps.event.addDomListener(li, 'click', () => {
	// 			if (selectDivIndex > 0) {
	// 				let selectName =
	// 					li.parentElement.previousElementSibling.name
	// 				if (+li.dataset.lat !== 0) {
	// 					if (markers[0]) {
	// 						boundCoords = boundCoords.filter(
	// 							(crd) => crd !== markers[0]
	// 						)
	// 						markers[0].setMap(null)
	// 					}

	// 					markers.pop()
	// 					let loc = {
	// 						lat: +li.dataset.lat,
	// 						lng: +li.dataset.lng,
	// 					}
	// 					let marker
	// 					if (selectDivIndex !== 1) {
	// 						marker = new google.maps.Marker({
	// 							position: loc,
	// 							icon: {
	// 								url: `assets/img/transport/${selectName}.svg`,
	// 								origin: new google.maps.Point(0, 0),
	// 								anchor: new google.maps.Point(20, 20),
	// 							},
	// 						})
	// 					} else {
	// 						marker = new google.maps.Marker({
	// 							position: loc,
	// 							icon: {
	// 								url: li.dataset.logo,
	// 								origin: new google.maps.Point(0, 0),
	// 								anchor: new google.maps.Point(20, 20),
	// 							},
	// 						})
	// 					}
	// 					markers.push(marker)
	// 					boundCoords.push(marker)
	// 					markers[0].setMap(map)
	// 				} else {
	// 					if (markers[0]) markers[0].setMap(null)

	// 					boundCoords = boundCoords.filter(
	// 						(crd) => crd !== markers[0]
	// 					)
	// 					markers.pop()
	// 				}
	// 				bounder()
	// 				priceUpdater()
	// 			}
	// 		})
	// 	})
	// })
}
// end init map

const auctionselect = document.getElementById('auctionselect')
const locationselect = document.getElementById('locationselect')
const baggingportselect = document.getElementById('baggingportselect')
const landingportselect = document.getElementById('landingportselect')

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
let locationCoords = {
	antananarivo: {
		lat: -18.8873012,
		lng: 47.3724261,
		logo: 'assets/img/transport/logos/1.svg',
	},
	nuuk: {
		lat: 64.1791647,
		lng: -51.7768494,
		logo: 'assets/img/transport/logos/4.svg',
	},
	canberra: {
		lat: -35.2812868,
		lng: 149.1204446,
		logo: 'assets/img/transport/logos/3.svg',
	},
}
let landingCoords = {
	batumi: {
		lat: 41.6027467,
		lng: 41.5590666,
	},
	poti: {
		lat: 42.16037914000806,
		lng: 41.6733452679018,
	},
}
let baggingCoords = {
	ny: {
		lat: 40.6976701,
		lng: -74.2598737,
	},
	brasilia: {
		lat: -15.7750655,
		lng: -48.0773182,
	},
}

let getLocationData = async (url, id) => {
	let token = document.querySelector('input[name="_token"]')
		? document.querySelector('input[name="_token"]').value
		: ''
	try {
		// let response = await axios.post(url, {
		// 	id: +id,
		// 	token,
		// })
		let response = {
			data: {
				locations: [
					{
						id: 1,
						location: 'location number 1',
						lat: '-25.151218302105477',
						lng: '45.65205300519016',
					},
					{
						id: 2,
						location: 'location number 2',
						lat: '-21.521489553555476',
						lng: '43.80438033847252',
					},
				],
			},
		}
		return response.data.locations
	} catch (error) {
		console.log(error)
	}
}

const createNiceSelect = (select) => {
	let selectDiv = select.parentElement
	let niceSelect = selectDiv.querySelector('ul')
	niceSelect.innerHTML = ''

	let activeText = selectDiv.querySelector('.selectdiv__activetext')

	let newActiveText = activeText.cloneNode(true)

	activeText.parentNode.replaceChild(newActiveText, activeText)
	activeText = newActiveText
	activeText.addEventListener('click', () => {
		selectDiv.classList.toggle('toggled')
	})

	selectDiv.querySelectorAll('option').forEach((option, index) => {
		let niceLi = document.createElement('li')
		niceLi.dataset.value = option.value
		if (index === 0) {
			niceLi.classList.add('active')
			actionForSelectedOption(option, niceLi, activeText, selectDiv)
		}
		if (option.dataset.lat) {
			niceLi.dataset.lat = option.dataset.lat
			niceLi.dataset.lng = option.dataset.lng
		}
		if (option.dataset.logo) {
			niceLi.dataset.logo = option.dataset.logo
		}
		if (option.dataset.inner) {
			niceLi.dataset.inner = option.dataset.inner
		}
		if (option.dataset.sea) {
			niceLi.dataset.sea = option.dataset.sea
		}
		niceLi.innerText = option.innerText
		niceSelect.appendChild(niceLi)

		niceLi.addEventListener('click', () => {
			select.value = niceLi.dataset.value
			niceSelect.querySelector('li.active').classList.remove('active')
			niceLi.classList.add('active')
			selectDiv.classList.remove('toggled')

			actionForSelectedOption(option, niceLi, activeText, selectDiv)
		})
	})
	niceSelect.style.setProperty('--heighttt', getUlHeight(niceSelect))
	return niceSelect
}

const fillSelect = (select, data, logo = false) => {
	select.innerHTML = ''

	data.forEach((dataItem) => {
		let option = document.createElement('option')
		option.value = dataItem.id

		if (dataItem.location) {
			option.innerText = dataItem.location
		}
		if (dataItem.port) {
			option.innerText = dataItem.port
		}

		if (dataItem.lat) {
			option.dataset.lat = dataItem.lat
		}
		if (dataItem.lng) {
			option.dataset.lng = dataItem.lng
		}
		if (logo) {
			option.dataset.logo =
				auctionselect.querySelector('option:checked').dataset.logo
		}
		select.appendChild(option)
	})
	let options = [...select.querySelectorAll('option')]
	return options
}
let auctionNiceSelect = createNiceSelect(auctionselect)

auctionNiceSelect.querySelectorAll('li').forEach((auctionNiceLi) => {
	auctionNiceLi.addEventListener('click', async () => {
		let locations = await getLocationData('', auctionNiceLi.dataset.value)
		console.log(auctionNiceLi.dataset.value)
		if (auctionNiceLi.dataset.value === '0') {
			locationselect.innerHTML = ''
			let locationSelectDiv = locationselect.parentElement
			let locationActiveText = locationSelectDiv.querySelector(
				'.selectdiv__activetext'
			)
			console.log(locationActiveText)
			locationActiveText.dataset.value = ''
			locationActiveText.dataset.text = ''

			locationSelectDiv.querySelector('ul').innerHTML = ''
			changeGoogleMapLocation(null, true)
		} else {
			fillSelect(locationselect, locations, true)
			let locationNiceSelect = createNiceSelect(locationselect)
			locationNiceSelect
				.querySelectorAll('li')
				.forEach((niceLocationLi) => {
					niceLocationLi.addEventListener('click', () => {
						changeGoogleMapLocation(niceLocationLi)
					})
				})
		}
	})
})

// const wholePriceSpan = document.querySelector(
// 	'.wholePrice .transportmain__calculator__calc__form__info__item__value span'
// )
// const wholePriceSpan = document.querySelector('.wholePrice transportmain__calculator__calc__form__info__item__value span')

// selectdivs.forEach((selectdiv, selDivIndex) => {
// 	let select = selectdiv.querySelector('select')
// 	let options = selectdiv.querySelectorAll('select option')

// 	// give options cords manually
// 	let cordsEntries = Object.entries(coords)
// 	cordsEntries = [...cordsEntries]
// 	for (let i = 0; i < cordsEntries.length; i++) {
// 		const entry = cordsEntries[i]
// 		if (selDivIndex > 0) {
// 			options[i + 1].dataset.place = entry[0]
// 			options[i + 1].dataset.lat = entry[1].lat
// 			options[i + 1].dataset.lng = entry[1].lng
// 		}
// 		if (selDivIndex === 1) {
// 			options[i + 1].dataset.logo = entry[1].logo
// 		}
// 		if (selDivIndex > 1) {
// 			options[i + 1].dataset.price = entry[1].price
// 		}
// 	}
// 	// give options cords manually END

// 	options = [...options]
// 	let niceSelectUl = selectdiv.querySelector('.selectdiv__niceselect')
// 	let activeText = selectdiv.querySelector('.selectdiv__activetext')
// 	activeText.addEventListener('click', () => {
// 		selectdiv.classList.toggle('toggled')
// 	})
// 	window.addEventListener(
// 		'click',
// 		(e) => {
// 			if (e.target.closest('.selectdiv') !== selectdiv) {
// 				selectdiv.classList.remove('toggled')
// 			}
// 		},
// 		true
// 	)
// 	options.forEach((option) => {
// 		let newLi = document.createElement('li')
// 		newLi.innerText = option.innerText
// 		newLi.dataset.value = option.value
// 		if (selDivIndex > 0) {
// 			if (option.dataset.lat && option.dataset.lng) {
// 				newLi.dataset.lat = option.dataset.lat
// 				newLi.dataset.lng = option.dataset.lng
// 			} else {
// 				newLi.dataset.lat = 0
// 				newLi.dataset.lng = 0
// 			}
// 		}
// 		if (selDivIndex === 1) {
// 			newLi.dataset.logo = option.dataset.logo
// 		}
// 		if (selDivIndex > 1) {
// 			newLi.dataset.price = option.dataset.price
// 		}
// 		if (option.selected) {
// 			actionForSelectedOption(option, newLi, activeText, selectdiv)
// 		}

// 		niceSelectUl.appendChild(newLi)

// 		newLi.addEventListener('click', () => {
// 			select.value = newLi.dataset.value
// 			niceSelectUl.querySelector('li.active').classList.remove('active')
// 			newLi.classList.add('active')
// 			selectdiv.classList.remove('toggled')
// 			actionForSelectedOption(option, newLi, activeText, selectdiv)
// 		})
// 	})
// 	niceSelectUl.style.setProperty('--heighttt', getUlHeight(niceSelectUl))
// })
