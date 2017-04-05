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
        data: { input: input }
      }).done(function(results) {
        $suggestions.empty();

        results.forEach(function(result) {
          $suggestions.append($('<li>').text(result.description).attr('data-id', result.place_id));
        });
      });
    }
  });

  $suggestions.on('click', 'li', function() {
    $search.val($(this).text());
    $selectedLocation.val($(this).attr('data-id')).change();
  });

  $('*').click(function() {
    $suggestions.empty();
  });

  $selectedLocation.change(function() {
    // update the map
  });

  $('.plan').on('click', 'header', function() {
    $(this).closest('div').find('.items').slideToggle(300);
  });
});
