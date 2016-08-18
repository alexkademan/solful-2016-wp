// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var Appointments = require ('../models/mb_classes_collection');
var Appointment = require ('./mb_appointment_view');

module.exports = Backbone.View.extend({

  tagName: 'li',

  initialize: function() {
    // have to call for the underscore template here. It's not on every other page...
    // Learning a new templating engine is on my to-do list.
    this.template = _.template($('#mb-day-template').html());
    // empty collection for every one of today's classes:
    var classesCollection = new Appointments();

  },

  renderDay: function(trainerName, pageName){
    this.$el.html(this.template(this.model.toJSON()));
    // this.model.get('appointments').each( this.addAppointment, this);
    this.model.get('appointments').each( function(workout){
      if(trainerName === 'all') {
        this.addAppointment(workout, pageName);
      }else if( trainerName === workout.get('Staff')['Name'] ){
        this.addAppointment(workout, pageName);
      }
    }, this);
    return this; // enable chained calls
  },

  addAppointment: function(info, pageName) {
    var appointment = new Appointment({model: info});
    // make the whole thing visible...
    this.$('ul.classes').append(appointment.render(pageName).el);
  }

});
