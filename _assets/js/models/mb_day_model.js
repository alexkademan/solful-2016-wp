var Backbone = require ('backbone');
var ClassesCollection = require('./mb_classes_collection');

module.exports = Backbone.Model.extend({

  defaults: {
    date: '', // date in format that MINDBODY returns YYYY-MM-DD
    dayOfWeek: '', // monday thru sunday.
    numericDate: '', // rearrangedDate MM/DD/YYYY
    unixTime: ''

  },

  initialize: function() {
    this.set('appointments', new ClassesCollection);
  }

});
