var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    toggleInfo: false,
    toggleInstructor: false,
    unixStartTime: ''
  }

});
