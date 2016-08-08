// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    // this.template = _.template($('#mb-trainer-template').html());
  },

  renderTrainer: function() {

    // console.log(app.mbDays);


    var template = _.template($('#mb-trainer-template').html());
    this.$el.html(template(this.model.toJSON()));

    // this.model.get('appointments').each( this.addAppointment, this);
    // this.renderTrainerWorkout();
    if( this.model.get('workoutCount') > 0 ){



    };

    return this; // enable chained calls

  },

  renderTrainerWorkout: function() {
    console.log( this );
    // console.log( day.get('Name') );

  }

});
