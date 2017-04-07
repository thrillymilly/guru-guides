
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
      animation: google.maps.Animation.DROP
    });

    var updateMapLocation = function(latitude, longitude, title) {
      var coords = { lat: latitude, lng: longitude }

      map.setCenter(coords);
      marker.setPosition(coords);
      marker.setTitle(title);
      marker.setAnimation(google.maps.Animation.DROP);
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
        var titles = planElement.querySelectorAll('.events .title')

        titles.forEach(function(title){
          events.forEach(function(event) {
            var coords = { lat: Number(event.dataset.lat), lng: Number(event.dataset.lng) }

            var otherMarker = new google.maps.Marker({
              position: coords,
              map: map,
              label: 'E',
              title: title.innerHTML,
              animation: google.maps.Animation.DROP
            })
              markers.push(otherMarker);
            });
          });

        //eats marker
        var eats = planElement.querySelectorAll('.eats .item');
        var titles = planElement.querySelectorAll('.eats .title');


        titles.forEach(function(title){
          eats.forEach(function(eat) {
            var coords = { lat: Number(eat.dataset.lat), lng: Number(eat.dataset.lng) }
            var otherMarker = new google.maps.Marker({
              position: coords,
              map: map,
              label: 'F',
              title: title.innerHTML,
              animation: google.maps.Animation.DROP
            });
            markers.push(otherMarker);
          });
        });
      }
    });
  });
};
