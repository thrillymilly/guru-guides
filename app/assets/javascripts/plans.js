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
    $view.empty();

    plans.forEach(function(plan) {
      $view.append(planTemplate(plan));
    });
  });
};

var renderEvents = function($view, eventTemplate) {
  var $selectedPlan = $('.plan.selected');

  $.ajax({
    url: '/api/events',
    data: { plan_id: $selectedPlan.attr('data-id') }
  }).done(function(events) {
    $view.empty();

    events["all_events"].forEach(function(ev) {
      var $ev = $(eventTemplate(ev));

      var isSavedEvent = !!events["saved_events"].find(function(saved_event) {
        return saved_event["event_id"] === ev["id"];
      });

      if (isSavedEvent) {
        $ev.find('.status-added').show();
      } else {
        $ev.find('.add-btn').show();
      }

      $view.append($ev);
    });
  });
};

var renderEats = function($view, eatTemplate) {
  var $selectedPlan = $('.plan.selected');

  $.ajax({
    url: '/api/eats',
    data: { plan_id: $selectedPlan.attr('data-id') }
  }).done(function(eats) {
    $view.empty();

    eats["all_eats"].forEach(function(eat) {
      var $eat = $(eatTemplate(eat));

      var isSavedEat = !!eats["saved_eats"].find(function(saved_eat) {
        return saved_eat["eat_id"] === eat["id"];
      });

      if (isSavedEat) {
        $eat.find('.status-added').show();
      } else {
        $eat.find('.add-btn').show();
      }

      $view.append($eat);
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
  var $eventsContents = $('.events .contents');
  var $eatsContents = $('.eats .contents');

  setDates();
  renderPlans($plansContents, planTemplate);

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
        arrival_date: formData.get('arrival_date'),
        departure_date: formData.get('departure_date')
      }
    }).done(function(result) {
      if (result.id) {
        renderPlans($plansContents, planTemplate);
      }
    });
  });

  $('.plans').on('click', '.plan', function() {
    $('.plan').removeClass('selected');
    $(this).addClass('selected');

    renderEvents($eventsContents, eventTemplate);
    renderEats($eatsContents, eatTemplate);
  });

  $('.plans').on('click', '.plan header', function() {
    $(this).siblings('.items').slideToggle(300);
  });

  $('.events-eats .events').on('click', '.add-btn', function() {
    $.ajax({
      url: '/api/saved_events',
      method: 'post',
      data: {
        event_id: $(this).closest('.event').attr('data-id'),
        plan_id: $('.plan.selected').attr('data-id')
      }
    }).done(function(result) {
      if (result.id) {
        renderEvents($eventsContents, eventTemplate);
        renderPlans($plansContents, planTemplate);
      }
    });
  });

  $('.events-eats .eats').on('click', '.add-btn', function() {
    $.ajax({
      url: '/api/saved_eats',
      method: 'post',
      data: {
        eat_id: $(this).closest('.eat').attr('data-id'),
        plan_id: $('.plan.selected').attr('data-id')
      }
    }).done(function(result) {
      if (result.id) {
        renderEats($eatsContents, eatTemplate);
        renderPlans($plansContents, planTemplate);
      }
    });
  });
});
