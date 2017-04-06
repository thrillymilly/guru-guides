var DiaryItemView = Backbone.View.extend({

  className: 'comment',

  template: Handlebars.compile ( $('#diary-item-template').html() ),

  events: {
    'click': 'hardify',
    'keyup input': 'save',
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  save: function(event) {
    if (event.which === 13){
      this.model.set('diary', event.target.value);
    }
  },

  hardify: function() {
    this.$el.find('input').show();
  },

  render: function () {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    return this;
  }
});
