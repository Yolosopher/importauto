// start init map
function initMap() {
    // The location of location
    var location = { lat: lattt, lng: longgg }
    // options
    const opts = {
        zoom: 16,
        zoomControl: false,
        // zoomControlOptions: {
        //     position: google.maps.ControlPosition.LEFT_CENTER,
        // },
        mapTypeControl: false,
        // mapTypeControlOptions: {
        //     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        // },
        controlSize: 36,
        streetViewControl: false,
        fullscreenControl: true,

        center: location,
    }
    // The map, centered at location
    var map = new google.maps.Map(document.getElementById("map"), opts)
    var marker = new google.maps.Marker({ position: location, map: map })
}
// end init map
