$(function() {
  $('.plan').on('click', 'header', function() {
    $(this).closest('div').find('.items').slideToggle(500);
  });
});
