// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#mb-appointment-template').html()),

  initialize: function() {
    // console.log(this.model);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  }

});
