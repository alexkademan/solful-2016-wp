// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  tagName: 'li',

  renderTrainer: function() {
    var template = _.template($('#mb-trainer-template').html());
    this.$el.html(template(this.model.toJSON()));

    return this; // enable chained calls

  },

  renderTrainerWorkout: function() {
    console.log( this );
    // console.log( day.get('Name') );

  }

});
