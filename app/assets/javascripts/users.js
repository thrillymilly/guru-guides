$(document).ready(function(){
  $(function() {
    $('.comment-form').submit(function(e) {
      e.preventDefault();

      $.ajax({
        url: '/api/comments/',
        method: 'post',
        data: { body: $('.comment-form textarea').val() }
      }).done(function(result) {
        $comment = $('<div>').addClass('diary-entry comment').attr('data-id', result.id).text(result.body).append($('<button>').addClass('delete-action').text('delete'));
        $('.diary-entries').append($comment);
      });
    });
  });

  $('.diary-left').on('click', '.delete-action', deleteComment);

  function deleteComment(event) {
    var id = $(this).closest('.diary-entry').data('id');

    $.ajax({
      url: '/api/comments/',
      method: 'delete',
      data: {id: id}
    }).done(function() {
      $(event.target).closest('.comment').fadeOut(500, function() {
        $(this).remove();
      });
    });
  };
});
