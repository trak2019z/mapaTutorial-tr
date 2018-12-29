var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var ttt = L.layerGroup();
var arrayOfGroups = [];

$.getJSON('/route/all/json/', function (data) {
    $.each(data, function (i, item) {
        $.getJSON('https://api.opencagedata.com/geocode/v1/geojson?q=' + item.fields.first_address + '&key=7177ae8419054746b4c12ce2d2a2cc5d&language=pl&pretty=1&limit=1&countrycode=pl', function (geodata) {
            $.getJSON('https://api.opencagedata.com/geocode/v1/geojson?q=' + item.fields.second_address + '&key=7177ae8419054746b4c12ce2d2a2cc5d&language=pl&pretty=1&limit=1&countrycode=pl', function (geodata2) {
                console.log(geodata);

                var coord1 = geodata.features[0].geometry.coordinates;
                var coord2 = geodata2.features[0].geometry.coordinates;
                var P1 = L.latLng(coord1[1],coord1[0] );
                var P2 = L.latLng(coord2[1],coord2[0]);
                var distance  = P1.distanceTo(P2);

                var loadGeolocation = L.geoJson(geodata, {
                    style: function (feature) {
                        return {
                            color: "green"
                        };
                    }, pointToLayer: function (feature, latlng) {
                        return new L.Marker(latlng, {icon: greenIcon}).bindPopup(item.fields.first_address + '<br>Odleglosc: ' + Number(distance/1000).toFixed(0)+'km<br>');
                    }
                });

                var unloadGeolocation = L.geoJson(geodata2, {
                    style: function (feature) {
                        return {
                            color: "blue"
                        };
                    }, pointToLayer: function (feature, latlng) {
                        return new L.Marker(latlng, {icon: blueIcon}).bindPopup(item.fields.second_address + '<br> Odleglosc: ' + Number(distance/1000).toFixed(0)+'km<br>');
                    }
                });

                var group = L.layerGroup([loadGeolocation, unloadGeolocation]);
                group.addTo(mymap);
                arrayOfGroups.push(group);
                var latlngsLoad = L.GeoJSON.coordsToLatLng(geodata.features[0].geometry.coordinates);
                var latlngsUnLoad = L.GeoJSON.coordsToLatLng(geodata2.features[0].geometry.coordinates);
                var latlngs = [latlngsLoad, latlngsUnLoad];
                L.polyline(latlngs, {color: 'red'}).addTo(mymap);
            });
        });
    });
});


var mymap = L.map('mapid').setView([52, 19], 5);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);
ttt.addTo(mymap);


