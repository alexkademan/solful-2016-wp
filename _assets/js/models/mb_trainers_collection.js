var Backbone = require ('backbone');
var Trainer = require ('./mb_trainer_model');

module.exports = Backbone.Collection.extend({
  model: Trainer,

  // modelId: function(attrs) {
  //   return attrs.date;
  // }

});
