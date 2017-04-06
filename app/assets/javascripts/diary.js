var comments = [new Comment({
  body: '',
})];

comments.forEach(function(comment) {

  // console.log(quote);
  var view = new CommentItemView({ model: comment });
  $('.diary').append(view.render().el);
});
