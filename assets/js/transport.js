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

let coords = {
	poti: {
		lat: 42.138998,
		lng: 41.6046802,
	},
	batumi: {
		lat: 41.6027467,
		lng: 41.5590666,
	},
	ny: {
		lat: 40.6976701,
		lng: -74.2598737,
	},
	brasilia: {
		lat: -15.7750655,
		lng: -48.0773182,
	},
	// nuuk: {
	//     lat: 64.1791647,
	//     lng: -51.7768494
	// },
	// canberra: {
	//     lat: -35.2812868,
	//     lng: 149.1204446
	// }
}
selectdivs.forEach((selectdiv, selDivIndex) => {
	let select = selectdiv.querySelector('select')
	let options = selectdiv.querySelectorAll('select option')

	// give options cords manually
	options.forEach((op) => {})
	let cordsEntries = Object.entries(coords)
	cordsEntries = [...cordsEntries]
	for (let i = 0; i < cordsEntries.length; i++) {
        if (selDivIndex > 1) {
            const entry = cordsEntries[i]
            options[i + 1].dataset.place = entry[0]
            options[i + 1].dataset.lat = entry[1].lat
            options[i + 1].dataset.lng = entry[1].lng
        }
	}
	// give options cords manually END

	options = [...options]
	let niceSelectUl = selectdiv.querySelector('.selectdiv__niceselect')
	let activeText = selectdiv.querySelector('.selectdiv__activetext')
	activeText.addEventListener('click', () => {
		selectdiv.classList.toggle('toggled')
	})
	window.addEventListener(
		'click',
		(e) => {
			if (e.target.closest('.selectdiv__niceselect') !== niceSelectUl) {
				selectdiv.classList.remove('toggled')
			}
		},
		true
	)
	options.forEach((option) => {
		let newLi = document.createElement('li')
		newLi.innerText = option.innerText
		newLi.dataset.value = option.value
        if (selDivIndex > 1) {
            if (option.dataset.lat && option.dataset.lng) {
                newLi.dataset.lat = option.dataset.lat
                newLi.dataset.lng = option.dataset.lng
            } else {
                newLi.dataset.lat = 0
                newLi.dataset.lng = 0
            }
        }

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

// start init map
function initMap() {
	let boundCoords = []

	// The location of location
	var location = { lat: 42.16062308578706, lng: 43.509062471747875 }
	// options
	const opts = {
		zoom: 6,
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
	// bounder
	let flightPathArr = []
	function bounder() {
		if (boundCoords.length > 0) {
			flightPathArr[0] && flightPathArr[0].setMap(null)
			flightPathArr.pop()

			let bounds = new google.maps.LatLngBounds()
			let fligthPathCoords = []
			for (let i = 0; i < boundCoords.length; i++) {
				const boundCoord = boundCoords[i]

				let newFlightPathObj = {
					lat: boundCoord.position.lat(),
					lng: boundCoord.position.lng(),
				}
				fligthPathCoords.push(newFlightPathObj)

				let myLatLng = new google.maps.LatLng(
					newFlightPathObj.lat,
					newFlightPathObj.lng
				)
				bounds.extend(myLatLng)
			}
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
			map.fitBounds(bounds)
		}
	}

	selectdivs.forEach((selectdiv, selectDivIndex) => {
		let markers = []
		let niceSelectUl = selectdiv.querySelector('.selectdiv__niceselect')
		niceSelectUl.querySelectorAll('li').forEach((li) => {
			google.maps.event.addDomListener(li, 'click', () => {
				if (selectDivIndex > 1) {
					let selectName =
						li.parentElement.previousElementSibling.name
					if (+li.dataset.lat !== 0) {
						if (markers[0]) {
							boundCoords = boundCoords.filter(
								(crd) => crd !== markers[0]
							)
							markers[0].setMap(null)
						}

						markers.pop()
						let loc = {
							lat: +li.dataset.lat,
							lng: +li.dataset.lng,
						}
						let marker = new google.maps.Marker({
							position: loc,
							icon: {
								url: `assets/img/transport/${selectName}.svg`,
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(20, 20),
							},
						})
						markers.push(marker)
						boundCoords.push(marker)
						markers[0].setMap(map)
					} else {
						if (markers[0]) markers[0].setMap(null)

						boundCoords = boundCoords.filter(
							(crd) => crd !== markers[0]
						)
						markers.pop()
					}
					bounder()
				}
			})
		})
	})
}
// end init map
