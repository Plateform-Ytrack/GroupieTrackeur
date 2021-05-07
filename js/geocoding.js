console.log("Script geocoding loaded")

if (lastLocation && preLocation) {
    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
            access_key: 'ef0c3d7cfb91fe850604598b5795defc',
            query: lastLocation,
            limit: 1
        }
    }).done(function(data) {
        loadCity(lastLocation, "lastLocation", data)
    });
    
    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
            access_key: 'ef0c3d7cfb91fe850604598b5795defc',
            query: preLocation,
            limit: 1
        }
    }).done(function(data) {
        loadCity(preLocation, "preLocation", data)
        console.log(villes)
        initMap()
    });
    
    // if (!(isVillesEmpty)) {
    //     centerMap(villes)
    // }
}

function loadCity(location, type, data) {
    let coord = {
        city: location,
        lat: data.data[0].latitude,
        lon: data.data[0].longitude
    }
    villes[type] = coord

    if (villes.lastLocation != undefined) {
        lati = villes.lastLocation.lat
        long = villes.lastLocation.lon
    }
}

// function centerMap(villes) {
//     let latMin
//     let latMax
//     let lonMin
//     let lonMax

//     if (villes.lastLocation.lat < villes.preLocation.lat) {
//         latMin = villes.lastLocation.lat
//         latMax = villes.preLocation.lat
//     } else {
//         latMin = villes.preLocation.lat
//         latMax = villes.lastLocation.lat
//     }
//     if (villes.lastLocation.lon < villes.preLocation.lon) {
//         lonMin = villes.lastLocation.lon
//         lonMax = villes.preLocation.lon
//     } else {
//         lonMin = villes.preLocation.lon
//         lonMax = villes.lastLocation.lon
//     }

//     map.setCenter(new google.maps.LatLng(
//     ((latMax + latMin) / 2.0),
//     ((lonMax + lonMin) / 2.0)
//     ));
//     map.fitBounds(new google.maps.LatLngBounds(
//     //bottom left
//     new google.maps.LatLng(latMin, lonMin),
//     //top right
//     new google.maps.LatLng(latMax, lonMax)
//     ));
// }