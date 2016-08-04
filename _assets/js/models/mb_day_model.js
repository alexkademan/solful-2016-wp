var Backbone = require ('backbone');
var ClassesCollection = require('./mb_classes_collection');

module.exports = Backbone.Model.extend({

  defaults: {
    date: '', // date in format that MINDBODY returns YYYY-MM-DD
    info: '', // array that holds all the datat about today.
    totalWorkouts: 0,
    scheduledTrainers: [] // every trainer with the number of classes they're doing today.
  },

  initialize: function() {
    this.set('appointments', new ClassesCollection);
  }

});
