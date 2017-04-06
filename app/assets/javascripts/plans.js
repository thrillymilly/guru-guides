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

var renderPlans = function($view, planTemplate) {
  $.ajax({
    url: '/api/plans'
  }).done(function(plans) {
    plans.forEach(function(plan) {
      $view.append(planTemplate(plan));
    });
  });
};

var renderEvents = function($view, eventTemplate) {
  $.ajax({
    url: '/api/events'
  }).done(function(events) {
    events.forEach(function(ev) {
      $view.append(eventTemplate(ev));
    });
  });
};

var renderEats = function($view, eatTemplate) {
  $.ajax({
    url: '/api/eats'
  }).done(function(eats) {
    eats.forEach(function(eat) {
      $view.append(eatTemplate(eat));
    });
  });
};

$(function() {
  var planTemplate = Handlebars.compile($('#plan-template').html());
  var eventTemplate = Handlebars.compile($('#event-template').html());
  var eatTemplate = Handlebars.compile($('#eat-template').html());

  var $suggestions = $('.suggestions');
  var $search = $('.search');
  var $addToPlanButton = $('.search-form button');
  var $selectedLocation = $('#selected-location');
  var $plansContents = $('.plans .contents');
  var $events = $('.events-eats .events');
  var $eats = $('.events-eats .eats');

  setDates();
  renderPlans($plansContents, planTemplate);
  renderEvents($events, eventTemplate);
  renderEats($eats, eatTemplate);

  $search.keyup(function() {
    $selectedLocation.val("");
    $addToPlanButton.prop('disabled', true);

    var input = $(this).val();

    if (input.length === 0) {
      $suggestions.empty();
    } else if (input.length > 4) {
      $.ajax({
        url: '/api/locations/suggestions',
        data: { input: input }
      }).done(function(results) {
        $suggestions.empty();

        if (results) {
          results.forEach(function(result) {
            $suggestions.append($('<li>').text(result.description).attr('data-id', result.place_id));
          });
        }
      });
    }
  });

  $suggestions.on('click', 'li', function() {
    $search.val($(this).text());
    $selectedLocation.val($(this).attr('data-id'));
    $selectedLocation[0].dispatchEvent(new Event('change'));
    $addToPlanButton.prop('disabled', false);
  });

  $('*').click(function() {
    $suggestions.empty();
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    var formData = new FormData($(this)[0]);

    $.ajax({
      url: '/api/plans',
      method: 'post',
      data: {
        place_id: formData.get('place_id'),
        place_name: formData.get('place_name'),
        arrival_date: formData.get('arrival_date'),
        departure_date: formData.get('departure_date')
      }
    }).done(function(result) {
      if (result.status === "OK") {
        $plansContents.append(planTemplate(result));
      } else {
        console.log(result);
      }
    });
  });

  $plansContents.on('click', '.plan header', function() {
    $(this).closest('div').find('.items').slideToggle(300);
  });
});
