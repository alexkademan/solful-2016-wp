var Backbone = require ('backbone');
var WorkoutsCollection = require('./mb_trainer_workouts_collection');

module.exports = Backbone.Model.extend({

  defaults: {
    workoutCount: 0,
    Bio: false,
    ImageURL: ''
  },

  // initialize: function() {
  //   this.set('workouts', new WorkoutsCollection);
  // }

});
