$(function() {
  var $suggestions = $('.suggestions');
  var $search = $('.search');
  var $selectedLocation = $('#selected-location');

  $('.search').keyup(function() {
    var input = $(this).val();

    if (input.length === 0) {
      $suggestions.empty();
    } else if (input.length > 4) {
      $.ajax({
        url: '/api/locations/suggestions',
        data: { input: $(this).val() }
      }).done(function(results) {
        $suggestions.empty();

        results.forEach(function(result) {
          $suggestions.append($('<li>').text(result.description).attr('data-id', result.place_id));
        });
      });
    }
  });

  $suggestions.on('click', 'li', function() {
    var location = $(this).text();

    $search.val(location);
    $selectedLocation.val(location);
    $suggestions.empty();
  });

  $('.plan').on('click', 'header', function() {
    $(this).closest('div').find('.items').slideToggle(300);
  });
});
