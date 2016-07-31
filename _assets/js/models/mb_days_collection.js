var Backbone = require ('backbone');
var Day = require ('./mb_day_model');

module.exports = Backbone.Collection.extend({
  model: Day,

  modelId: function(attrs) {
    return attrs.date;
  }

});
