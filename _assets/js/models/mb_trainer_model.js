var Backbone = require ('backbone');
var WorkoutsCollection = require('./mb_trainer_workouts_collection');

module.exports = Backbone.Model.extend({

  defaults: {
    workoutCount: 0,
    Bio: false,
    showFullBio: false, // status of showMore and showLess link.
    ImageURL: ''
  }

});
