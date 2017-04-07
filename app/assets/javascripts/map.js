
var showMap = function() {
  var $selectedLocation = $('#selected-location');
  var apiUrl = '/api/locations/search'


  var getSelectedLocationDetails = function(callback) {
    $.ajax({
      url: apiUrl,
      data: { place_id: $selectedLocation.val() }
    }).done(callback);
  };

  getSelectedLocationDetails(function(result) {
    var coords = { lat: result.geometry.location.lat, lng: result.geometry.location.lng }

    var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: coords,
      zoom: 11
    });

    var marker = new google.maps.Marker({
      position: coords,
      title: result.formatted_address,
      map: map,
    });

    var updateMapLocation = function(latitude, longitude, title) {
      var coords = { lat: latitude, lng: longitude }

      map.setCenter(coords);
      marker.setPosition(coords);
      marker.setTitle(title);
    };

    google.maps.event.addDomListener($selectedLocation[0], 'change', function() {
      getSelectedLocationDetails(function(result) {
        updateMapLocation(result.geometry.location.lat, result.geometry.location.lng, result.formatted_address);
      });
    });
    var markers= []; // to store markers beside main marker

    google.maps.event.addDomListener($('.plans')[0], 'click', function(e) {

      if(markers.length > 0){
        // marker.setMap(null);
        markers.forEach(function (marker){
          marker.setMap(null);
        })
        markers= [];
      }

      var planElement = e.target.closest('.plan');

      if (planElement) {
        updateMapLocation(Number(planElement.dataset.lat), Number(planElement.dataset.lng), planElement.querySelector('.address').textContent);

        // create other markers
        // events marker
        var events = planElement.querySelectorAll('.events .item');

        var eventImage = { url: 'https://lh3.googleusercontent.com/NU7oZ7XSozdZYdGnZs_64cn0U6hwrkKNfAr-cqFScO40nEgyIcRtvXuzSAZQn_9VqsY=w300',
        scaledSize: new google.maps.Size(30, 30), // scaled size
        };
          events.forEach(function(event) {
            var coords = { lat: Number(event.dataset.lat), lng: Number(event.dataset.lng) }

            var otherMarker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: eventImage
            })
            markers.push(otherMarker);
          });

        //eats marker
        eats = planElement.querySelectorAll('.eats .item');

        var eatsImage = { url: 'https://cdn2.iconfinder.com/data/icons/places-4/100/food_place_marker_location_restaurant_eat_fork_knife-512.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
        };
        eats.forEach(function(eat) {
          var coords = { lat: Number(eat.dataset.lat), lng: Number(eat.dataset.lng) }
          var otherMarker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: eatsImage
          });
          markers.push(otherMarker);
        });
      }
    });
  });
};
