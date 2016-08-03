var Backbone = require ('backbone');
var Workout = require ('./mb_trainer_workout_model');

module.exports = Backbone.Collection.extend({
  model: Workout,

  modelId: function(attrs) {
    return attrs.date;
  }

});
