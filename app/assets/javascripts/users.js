$(function() {
  $('.comment-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/api/comments/',
      method: 'post',
      data: { body: $('.comment-form textarea').val() }
    }).done(function(result) {
      $('.diary-left').append($('<span>').text(result.body));
    });
  });
});
