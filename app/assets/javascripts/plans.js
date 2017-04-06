var padLeft = function(str, paddedLength, prefixChar) {
  if (str.length < paddedLength) {
    str = prefixChar.repeat(paddedLength - str.length) + str;
  }

  return str;
};

var setDates = function() {
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1).toString();
  var date = date.getDate().toString();
  var dateString = year + '-' + padLeft(month, 2, '0') + '-' + padLeft(date, 2, '0');

  $('[name=arrival_date], [name=departure_date]').val(dateString).attr('min', dateString);
};

var renderPlans = function(planTemplate) {
  $.ajax({
    url: '/api/plans'
  }).done(function(plans) {
    var $contents = $('.plans .contents')

    plans.forEach(function(plan) {
      $contents.append(planTemplate(plan));
    });
  });
};

$(function() {
  var planTemplate = Handlebars.compile($('#plan-template').html());

  var $suggestions = $('.suggestions');
  var $search = $('.search');
  var $selectedLocation = $('#selected-location');

  setDates();
  renderPlans(planTemplate);

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
    $selectedLocation.val($(this).attr('data-id'));
    $selectedLocation[0].dispatchEvent(new Event('change'));
  });

  $('*').click(function() {
    $suggestions.empty();
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    var formData = new FormData($(this)[0]);

    $.ajax({}).done(function() {});
  });

  $('.contents').on('click', '.plan header', function() {
    $(this).closest('div').find('.items').slideToggle(300);
  });
});
