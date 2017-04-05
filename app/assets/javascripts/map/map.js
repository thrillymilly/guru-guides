
var showMap = function(){

  for(var i = 0 ; i < bucketList.length ; i++){
    $.ajax({

      url:'https://maps.googleapis.com/maps/api/geocode/json',
      data : {
       address: bucketList[i],
       key: 'AIzaSyAVJjOAHWGEr2E1f5AMR2RZDoJ8maw41N4'}

    }).done(function(latLng){
      console.log(latLng);
      var result = latLng.results[0]
      var lat = result.geometry.location.lat;
      var lng = result.geometry.location.lng;
      var add = result.formatted_address;

      coords.lat.push(lat);
      coords.lng.push(lng);
      coords.add.push(add);

      if (result.formatted_address.toLowerCase().includes(mapCenter)) {
        mapCenter = {lat: lat , lng: lng}
      };
      if (coords.lat.length >= bucketList.length) {

        var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
          center: mapCenter,
          zoom: 11
        });

        for (var i = 0; i < coords.lat.length; i++) {
          var marker = new google.maps.Marker({
            position: {lat: coords.lat[i] , lng: coords.lng[i]},
            title: coords.add[i],
            map: map
          });
        }

        var eatsImage = { url: 'https://cdn2.iconfinder.com/data/icons/places-4/100/food_place_marker_location_restaurant_eat_fork_knife-512.png',
        scaledSize: new google.maps.Size(35, 35), // scaled size
        };

        var eventsImage = { url: 'https://lh3.googleusercontent.com/NU7oZ7XSozdZYdGnZs_64cn0U6hwrkKNfAr-cqFScO40nEgyIcRtvXuzSAZQn_9VqsY=w300',
        scaledSize: new google.maps.Size(50, 50), // scaled size
        };
          // for (var j = 0; j < eats.length; j++) {
        var eatsMarker = new google.maps.Marker({
          position: {lat: eats[0].lat , lng: eats[0].lng},
          title: eats[0].title,
          icon: eatsImage,
          map: map
        });
      // }

        var eventsMarker = new google.maps.Marker({
          position: {lat: events[0].lat , lng: events[0].lng},
          icon: eventsImage,
          title: events[0].title,
          map: map
        });
      };
    });
  };
}
