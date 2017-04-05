$(function() {
  var $countries = $('#countries');
  var $states = $('#states');

  var populateStatesList = function() {
    var countryCode = $countries.find(':selected').val();

    $.ajax({
      url: '/api/locations/countries/' + countryCode
    }).done(function(states) {
      $states.empty();

      Object.keys(states).forEach(function(key) {
        var $option = $('<option>').val(key).text(states[key]);
        $states.append($option);
      });
    });
  };

  populateStatesList();

  $countries.change(populateStatesList);
});
