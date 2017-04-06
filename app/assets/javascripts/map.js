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
      map: map
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

    google.maps.event.addDomListener($('.plans')[0], 'click', function(e) {
      var planElement = e.target.closest('.plan');

      if (planElement) {
        updateMapLocation(Number(planElement.dataset.lat), Number(planElement.dataset.lng), planElement.querySelector('.address').textContent);
      }
    });
  });
};
