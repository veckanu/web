(function() {
    'use strict';
    
    function RandomMapillary(locations) {
        var mapillaryUrl = 'https://www.mapillary.com/map/im/',
            mapillaryImageUrl = 'https://d1cuyjsrcm0gby.cloudfront.net/',
            mapillaryProfileUrl = 'https://www.mapillary.com/profile/';
        
        this.getRandomLocation = function() {
            return locations[Math.floor(Math.random() * locations.length)];            
        }
        
        this.setBackgroundImage = function(location) {
            var self = this,
                backgroundImage = new Image(),
                imageUrl = mapillaryImageUrl + location.key + '/thumb-2048.jpg',
                background = document.getElementById('background');                

                backgroundImage.onload = function() {
                    background.style.backgroundImage = "url('" + backgroundImage.src + "')";
                    background.style.opacity = "1";
                    self.showLocationInfo(location);
                    self.showMap(location);
                };
                
                backgroundImage.src = imageUrl;        
        }

        this.showLocationInfo = function(data) {
            var user = document.getElementById('user');

            user.textContent = 'by ' + data.user;
            user.href = mapillaryProfileUrl + data.user;
        }
        
        this.showMap = function(location) {
            var map = L.map('map', {zoomControl: false}),
                osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',              
                osmAttrib = '© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                osm = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib}),
                marker = L.marker({
                    lat: location.lat,
                    lon: location.lon
                });
                
            map.addLayer(osm);
            map.setView([location.lat, location.lon], 1);
            marker.addTo(map);
            
            document.getElementById('map').href = mapillaryUrl + location.key;
        }
               
        var location = this.getRandomLocation();

        this.setBackgroundImage(location);
    }

    var randomMapillary = new RandomMapillary(window.locations);

})();
