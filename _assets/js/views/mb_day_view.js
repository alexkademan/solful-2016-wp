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

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.model.get('appointments').each( this.addAppointment, this);
    return this; // enable chained calls
  },

  addAppointment: function(info) {
    var appointment = new Appointment({model: info});

    appointment.model.on('change:toggleInfo', function(){
      appointment.toggleInfo();
    });
    appointment.model.on('change:toggleInstructor', function(){
      appointment.toggleInstructor();
    });

    // make the whole thing visible...
    this.$('ul.classes').append(appointment.render().el);

    appointment.renderClassInfo();
  }

});
