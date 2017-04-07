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

var renderPlans = function() {
  var $view = $('.plans .contents');
  var template = Handlebars.compile($('#plan-template').html());

  $.ajax({
    url: '/api/plans'
  }).done(function(plans) {
    $view.empty();

    plans.forEach(function(plan) {
      $view.append(template(plan));
    });
  });
};

var renderEvents = function() {
  var $view = $('.events .contents');
  var template = Handlebars.compile($('#event-template').html());
  var $selectedPlan = $('.plan.selected');

  $.ajax({
    url: '/api/events',
    data: { plan_id: $selectedPlan.attr('data-id') }
  }).done(function(events) {
    $view.empty();

    events["all_events"].forEach(function(ev) {
      var $ev = $(template(ev));

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

var renderEats = function() {
  var $view = $('.eats .contents');
  var template = Handlebars.compile($('#eat-template').html());
  var $selectedPlan = $('.plan.selected');

  $.ajax({
    url: '/api/eats',
    data: { plan_id: $selectedPlan.attr('data-id') }
  }).done(function(eats) {
    $view.empty();

    eats["all_eats"].forEach(function(eat) {
      var $eat = $(template(eat));

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
  var $suggestions = $('.suggestions');
  var $search = $('.search');
  var $addToPlanButton = $('.search-form button');
  var $selectedLocation = $('#selected-location');
  var searchThrottle = false;

  setDates();
  renderPlans();

  $search.keyup(function() {
    $selectedLocation.val("");
    $addToPlanButton.prop('disabled', true);

    var input = $(this).val();

    if (input.length === 0) {
      $suggestions.empty();
    } else if (input.length > 4 && !searchThrottle) {
      searchThrottle = true;

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

        setTimeout(function() { searchThrottle = false; }, 1500);
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
        renderPlans();
        $('.events .contents').empty();
        $('.eats .contents').empty();
        $('.plans .contents').scrollTop(1E10);
      }
    });
  });

  $('.plans').on('click', '.plan', function(e) {
    if (!$(e.target).hasClass('delete-btn')) {
      $('.plan').removeClass('selected');
      $(this).addClass('selected');

      renderEvents();
      renderEats();
    }
  });

  $('.plans').on('click', '.plan header', function() {
    $(this).siblings('.items').slideToggle(300);
  });

  $('.plans').on('click', 'button', function() {
    var $dates = $(this).closest('.dates');
    $dates.slideToggle(300);
    $dates.siblings('.dates-form').slideToggle(300);
  });

  $('.plans').on('click', '.cancel-btn', function() {
    var $datesForm = $(this).closest('.dates-form');
    $datesForm.slideToggle(300);
    $datesForm.siblings('.dates').slideToggle(300);
  });

  $('.plans').on('submit', '.dates-form', function(e) {
    e.preventDefault();

    var $plan = $(this).closest('.plan');
    var formData = new FormData($(this)[0]);

    $.ajax({
      url: '/api/plans/' + $plan.attr('data-id'),
      method: 'put',
      data: {
        lat: $plan.attr('data-lat'),
        lng: $plan.attr('data-lng'),
        arrival_date: formData.get('arrival_date'),
        departure_date: formData.get('departure_date')
      }
    }).done(function(result) {
      if (result.id) {
        renderPlans();
      }
    });
  });

  $('.plans').on('click', '.delete-btn', function() {
    $.ajax({
      url: '/api/plans/' + $(this).closest('.plan').attr('data-id'),
      method: 'delete'
    }).done(function(result) {
      if (result.id) {
        renderPlans();
        $('.events .contents').empty();
        $('.eats .contents').empty();
      }
    });
  })

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
        renderEvents();
        renderPlans();
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
        renderEats();
        renderPlans();
      }
    });
  });
});
