// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({
  tagName: 'li',
  // template: _.template($('#mb-appointment-template').html()),

  initialize: function() {
    // have to call for the underscore template here. It's not on every other page...
    // Learning a new templating engine is on my to-do list.
    this.template = _.template($('#mb-appointment-template').html());
    // console.log(this.model);
  },

  render: function(){
    // console.log(this.model);
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  }

});
